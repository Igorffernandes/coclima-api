(function () {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://api.coclima.com/script';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
}());
