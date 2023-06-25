chrome.commands.onCommand.addListener(function (command) {
  if (command === "searchRepos") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.create(
        {
          url: "https://github.com/capitanbarbosa?tab=repositories&q=",
        },
        function (newTab) {
          // Listen for the tab to be fully loaded
          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === "complete" && tabId === newTab.id) {
              chrome.tabs.sendMessage(newTab.id, {
                message: "focus_element",
              });
              chrome.tabs.onUpdated.removeListener(listener); // remove the listener now that we've found our tab
            }
          });
        }
      );
    });
  }
});
