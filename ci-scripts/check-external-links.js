const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, 'broken-links-report.csv');

/**
 * Recursively get all markdown files in a directory
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of absolute file paths
 */
function getAllMarkdownFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

/**
 * Extracts all external links from a markdown file
 * @param {string} content - The content of the markdown file
 * @returns {string[]} Array of URLs found in the content
 */
function extractLinks(content) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const url = match[2];
        // Only include external links (starting with http:// or https://)
        if (url.startsWith('http://') || url.startsWith('https://')) {
            links.push(url);
        }
    }

    return links;
}

/**
 * Checks if a URL returns a 404 error
 * @param {string} url - The URL to check
 * @returns {Promise<{isBroken: boolean, status: number}>} Promise that resolves to status info
 */
async function isBrokenLink(url) {
    try {
        const response = await axios.head(url, {
            maxRedirects: 5,
            timeout: 10000,
            validateStatus: (status) => status < 400
        });
        return { isBroken: false, status: response.status };
    } catch (error) {
        const status = error.response?.status || 'ERROR';
        return { isBroken: true, status };
    }
}

/**
 * Main function to check all markdown files for broken links
 */
async function checkBrokenLinks() {
    const brokenLinks = [];
    const files = getAllMarkdownFiles(DOCS_DIR);

    if (files.length === 0) {
        console.log('No markdown files found in docs directory.');
        return;
    }

    for (const filePath of files) {
        const file = path.relative(DOCS_DIR, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const links = extractLinks(content);

        console.log(`\nChecking links in file: ${file}`);
        console.log('----------------------------------------');

        for (const url of links) {
            console.log(`Testing link: ${url}`);
            const { isBroken, status } = await isBrokenLink(url);
            console.log(`Status: ${status} (${isBroken ? 'BROKEN' : 'OK'})\n`);

            if (isBroken) {
                brokenLinks.push({
                    url,
                    file,
                    status
                });
            }
        }
    }

    if (brokenLinks.length > 0) {
        // Write results to CSV only if broken links are found
        const csvWriter = createObjectCsvWriter({
            path: OUTPUT_FILE,
            header: [
                { id: 'url', title: 'Broken URL' },
                { id: 'file', title: 'File Path' },
                { id: 'status', title: 'Status Code' }
            ]
        });

        await csvWriter.writeRecords(brokenLinks);
        console.log(`\nFound ${brokenLinks.length} broken links. Report written to ${OUTPUT_FILE}`);
    } else {
        console.log('\nNo broken links found.');
    }
}

// Run the script
checkBrokenLinks().catch(console.error); 