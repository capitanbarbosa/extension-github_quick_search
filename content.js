chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "focus_element") {
    document.querySelector("#your-repos-filter").focus();
  }
});
