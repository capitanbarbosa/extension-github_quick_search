chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleSearchBox") {
    var searchBox = document.getElementById("ghRepoSearchBox");
    if (searchBox) {
      searchBox.remove();
    } else {
      showSearchBox();
    }
  } else if (request.action === "searchRepos") {
    var term = request.term;
    searchRepos(term);
  }
});

function showSearchBox() {
  var searchBox = document.createElement("div");
  searchBox.setAttribute("id", "ghRepoSearchBox");
  searchBox.innerHTML = `
      <input type="text" id="ghRepoSearchInput" placeholder="Search GitHub Repositories">
      <ul id="ghRepoSearchResults"></ul>
    `;

  document.body.appendChild(searchBox);
  var searchInput = document.getElementById("ghRepoSearchInput");
  searchInput.addEventListener("input", searchRepos);
}

function searchRepos(term) {
  var resultsList = document.getElementById("ghRepoSearchResults");
  resultsList.innerHTML = "";

  if (term.length > 0) {
    var repos = Array.from(
      document.querySelectorAll('a[itemprop="name codeRepository"]')
    );
    var filteredRepos = repos.filter(function (repo) {
      return repo.textContent.toLowerCase().includes(term.toLowerCase());
    });

    filteredRepos.forEach(function (repo) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.setAttribute("href", repo.href);
      link.setAttribute("target", "_blank");
      link.textContent = repo.textContent;
      li.appendChild(link);
      resultsList.appendChild(li);
    });
  }
}
