(function() {
    const avsBaseURL = '/eigenlayer/operator-guides';
    const currentPath = window.location.pathname;

    if (currentPath.includes(avsBaseURL)) {
      const newPath = currentPath.replace(avsBaseURL, '/operators/operator-guides');
      window.location.href = window.location.origin + newPath;
    }
  })();