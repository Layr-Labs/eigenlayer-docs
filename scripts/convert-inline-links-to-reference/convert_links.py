import sys
import re

def convert_links(content):
    # Regular expression pattern to match inline links
    inline_link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'

    # Dictionary to store the reference links
    reference_links = {}

    def replace_link(match):
        text = match.group(1)
        url = match.group(2)

        # Generate a unique reference key
        key = f"ref{len(reference_links) + 1}"

        # Store the reference link
        reference_links[key] = f"[{key}]: {url}"

        # Replace the inline link with the reference link
        return f"[{text}][{key}]"

    # Replace inline links with reference links
    content = re.sub(inline_link_pattern, replace_link, content)

    # Append the reference links to the end of the content
    for ref in reference_links.values():
        content += f"\n{ref}"

    return content

# Check if the input file name is provided as a command-line argument
if len(sys.argv) < 2:
    print("Please provide the input file name as a command-line argument.")
    sys.exit(1)

input_file = sys.argv[1]
output_file = input_file

# Read the Markdown file
try:
    with open(input_file, "r") as file:
        content = file.read()
except FileNotFoundError:
    print(f"File '{input_file}' not found.")
    sys.exit(1)

# Convert inline links to reference links
updated_content = convert_links(content)

# Write the updated content back to the file
with open(output_file, "w") as file:
    file.write(updated_content)

print(f"Converted links in '{input_file}' and saved the result to '{output_file}'.")
