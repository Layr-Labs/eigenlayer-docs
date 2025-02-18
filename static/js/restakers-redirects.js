(function() {
    const avsBaseURL = '/eigenlayer/restaking-guides';
    const currentPath = window.location.pathname;

    if (currentPath.includes(avsBaseURL)) {
      const newPath = currentPath.replace(avsBaseURL, '/restakers/restaking-guides');
      window.location.href = window.location.origin + newPath;
    }
  })();