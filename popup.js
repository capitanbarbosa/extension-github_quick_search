document.addEventListener("DOMContentLoaded", function () {
  var usernameInput = document.getElementById("usernameInput");
  var saveButton = document.getElementById("saveButton");

  // Load the saved username
  chrome.storage.sync.get("githubUsername", function (data) {
    if (data.githubUsername) {
      usernameInput.value = data.githubUsername;
    }
  });

  saveButton.addEventListener("click", function () {
    var username = usernameInput.value.trim();
    if (username) {
      chrome.storage.sync.set({ githubUsername: username }, function () {
        alert("Username saved!");
      });
    }
  });
});
