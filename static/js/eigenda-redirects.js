(function() {
    const eigendaBaseURL = '/eigenda';
    const eigendaGuidesBaseURL = '/eigenda-guides';
    const newBaseUrl = 'http://docs.eigenda.xyz';
    const currentPath = window.location.pathname;
  

    if (currentPath.includes(eigendaGuidesBaseURL)) {
      window.location.href = newBaseUrl + currentPath;
    } else if (currentPath.includes(eigendaBaseURL)) {
      const newPath = currentPath.replace(eigendaBaseURL, '');
      window.location.href = newBaseUrl + newPath;
    } 
  })();
