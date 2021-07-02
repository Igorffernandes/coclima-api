function addScript(src) {
  // eslint-disable-next-line no-var
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('async', true);
  s.setAttribute('src', src);
  document.head.appendChild(s);
}

addScript('https://api.coclima.com/script');
