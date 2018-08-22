/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'exponea-console', // Vue Extension
  description: 'Exponea tool used for debugging', // Vue.js Webpack Chrome Extension Template
  author: 'Exponea',
  version: '0.0.1',
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48_rounded.png',
    '128': 'icons/128_rounded.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'background',
    'debugger',
    'webRequest',
    'unlimitedStorage',
    'storage'
  ],
  browser_action: {
    default_title: 'Exponea console',
    default_popup: 'pages/popup.html',
    default_icon: {
      '16': 'icons/16.png',
      '48': 'icons/48_rounded.png'
    }
  },
  background: {
    persistent: true,
    page: 'pages/background.html'
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/content.js'
    ],
    run_at: 'document_start',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  default_locale: 'en',
  manifest_version: 2,
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: [
    'panel.html',
    'js/content.js'
  ]
}
