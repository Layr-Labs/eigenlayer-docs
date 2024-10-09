(function() {
    const avsBaseURL = '/eigenlayer/avs-guides';
    const currentPath = window.location.pathname;
    
    if (currentPath.includes(avsBaseURL)) {
      const newPath = currentPath.replace(avsBaseURL, '/developers');
      window.location.href = window.location.origin + newPath;
    }
  })();