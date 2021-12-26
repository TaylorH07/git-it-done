var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            // pass response data to dom function
            displayIssues(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
  
var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      } 

    for (var i = 0; i < issues.length; i++) {
  // create a link element to take users to the issue on github
  var issueEl = document.createElement("a");
  issueEl.classList = "list-item flex-row justify-space-between align-center";
  issueEl.setAttribute("href", issues[i].html_url);
  issueEl.setAttribute("target", "_blank");

  
};

};