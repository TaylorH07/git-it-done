var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl);
  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);
    
        // check if api has paginated issues
        if (response.headers.get("Link")) {
          console.log("repo has more than 30 issues");
        }
      });
    }
    else {
      alert("There was a problem with your request!");
    }
  })
    .catch(function(error) {
      alert('Unable to connect to GitHub');
    });
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);
    // create span to hold issue title
  var titleEl = document.createElement("span");
  titleEl.textContent = issues[i].title;

  // append to container
  issueEl.appendChild(titleEl);

  // create a type element
  var typeEl = document.createElement("span");

  // check if issue is an actual issue or a pull request
  if (issues[i].pull_request) {
    typeEl.textContent = "(Pull request)";
  } else {
    typeEl.textContent = "(Issue)";
  }

// append to container
issueEl.appendChild(typeEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);