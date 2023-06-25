document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", searchRepos);

  function searchRepos() {
    var searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "searchRepos",
          term: searchTerm,
        });
      });
    }
  }
});
