import React, { useState, useEffect } from 'react';

export default function CopyButton({ title, description, text, filePath, isLastRow }) {
  const [showToast, setShowToast] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefetch file content when component mounts
  useEffect(() => {
    if (filePath) {
      setIsLoading(true);
      fetch(filePath)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            console.error('Failed to prefetch file contents.');
            return null;
          }
        })
        .then(content => {
          if (content) {
            setFileContent(content);
          }
          setIsLoading(false);
        })
        .catch(e => {
          console.error('Error prefetching file contents:', e);
          setIsLoading(false);
        });
    }
  }, [filePath]);

  const copyText = async () => {
    let contentToCopy = text;
    
    if (filePath) {
      // If we already have the file content, use it
      if (fileContent) {
        contentToCopy = fileContent;
      } else if (!isLoading) {
        // If we don't have it and it's not currently loading, fetch it
        try {
          const response = await fetch(filePath);
          if (response.ok) {
            contentToCopy = await response.text();
            setFileContent(contentToCopy); // Save for future use
          } else {
            alert('Failed to fetch file contents.');
            return;
          }
        } catch (e) {
          alert('Error fetching file contents.');
          return;
        }
      } else {
        // If it's still loading, inform the user
        alert('File content is still loading. Please try again in a moment.');
        return;
      }
    }
    
    await navigator.clipboard.writeText(contentToCopy);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const downloadFile = async () => {
    let contentToDownload = text;
    
    if (filePath) {
      // If we already have the file content, use it
      if (fileContent) {
        contentToDownload = fileContent;
      } else if (!isLoading) {
        // If we don't have it and it's not currently loading, fetch it
        try {
          const response = await fetch(filePath);
          if (response.ok) {
            contentToDownload = await response.text();
            setFileContent(contentToDownload); // Save for future use
          } else {
            alert('Failed to fetch file contents.');
            return;
          }
        } catch (e) {
          alert('Error fetching file contents.');
          return;
        }
      } else {
        // If it's still loading, inform the user
        alert('File content is still loading. Please try again in a moment.');
        return;
      }
    }
    
    // Create a blob and download it
    const blob = new Blob([contentToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title || 'download.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to render the copy icon
  const CopyIcon = () => (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
      {showToast && (
        <span
          style={{
            position: 'absolute',
            top: '-2em',
            right: '0px',
            background: 'rgba(60, 60, 60, 0.95)',
            color: '#fff',
            fontSize: '0.92em',
            padding: '3px 12px',
            borderRadius: 6,
            opacity: showToast ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.4s',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          Copied!
        </span>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#346ddb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: 'pointer', verticalAlign: 'middle', transition: 'stroke 0.3s' }}
        onClick={copyText}
        title="Copy to clipboard"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </span>
  );

  // Function to render the download icon
  const DownloadIcon = () => (
    <span style={{ marginRight: '10px' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#346ddb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: 'pointer', verticalAlign: 'middle', transition: 'stroke 0.3s' }}
        onClick={downloadFile}
        title="Download file"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </span>
  );

  // Function to render the link icon
  const LinkIcon = () => (
    <span>
      <a href={filePath} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#346ddb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ cursor: 'pointer', verticalAlign: 'middle', transition: 'stroke 0.3s' }}
          title="Open in new window"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </span>
  );

  return (
    <tr>
      <td>{description}</td>
      <td>{title}</td>
      <td style={{ 
        border: 'none', 
        borderRight: '1px solid #ddd', 
        borderBottom: isLastRow ? '1px solid #ddd' : 'none',
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <CopyIcon />
        <DownloadIcon />
        <LinkIcon />
      </td>
    </tr>
  );
}