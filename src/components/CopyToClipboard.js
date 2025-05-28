import React, { useState, useEffect } from 'react';

export default function CopyButton({ title, description, text, filePath }) {
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

  return (
    <div>
      <span style={{ position: 'relative', display: 'inline-block' }}>
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
        <p
          onClick={copyText}
          style={{
            margin: 0,
            padding: 0,
            display: 'inline-block',
            borderRadius: 4,
            fontWeight: 'bold',
            marginLeft: 5
          }}
        >
          {title}{' '}
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
            style={{ marginLeft: '4px', cursor: 'pointer', verticalAlign: 'middle', transition: 'stroke 0.3s' }}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </p>
      </span>
      <p style={{ marginLeft: 5, marginBottom: 10, marginTop: 0 }}>{description}</p>
    </div>
  );
}