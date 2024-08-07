(function() {
    const oldBaseUrl = '/eigenda'; // Replace with your old base URL
    const newBaseUrl = 'http://docs.eigenda.xyz'; // Replace with your new site URL
  
    const currentPath = window.location.pathname;
  
    if (currentPath.includes(oldBaseUrl)) {
      const newPath = currentPath.replace(oldBaseUrl, '');
      window.location.href = newBaseUrl + newPath;
    }
  })();