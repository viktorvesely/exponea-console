export default function Log (prefix, msg) {
  let backPage = chrome.extension.getBackgroundPage()
  backPage.console.log(prefix)
  backPage.console.log(msg)
  console.log(msg)
}
