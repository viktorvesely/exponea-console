chrome.devtools.panels.create('Exp', 'img/logo.png', 'pages/panel.html', function (panel) {
  const __ = chrome.i18n.getMessage
  console.log(__('devtools'))
})
