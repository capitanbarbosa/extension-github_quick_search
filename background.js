chrome.commands.onCommand.addListener(function (command) {
  if (command === "searchRepos") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: "https://github.com/capitanbarbosa?tab=repositories&q=",
      });
    });
  }
});
