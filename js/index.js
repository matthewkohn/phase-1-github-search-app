// Search GET request
document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');


  // When user submits the form
  const form = document.querySelector('#github-form'); 
  form.addEventListener('submit', handleSubmit);
  
  // User info is requested from GitHub
  function handleSubmit(event) {
    event.preventDefault();
    const user = event.target.search.value;
    const USER_URL = 'https://api.github.com/search/users?q=';
    const REPOS_URL = 'https://api.github.com/users/';

    // Fetch user info
    fetch((USER_URL + user), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(res => res.json())
      .then(data => createUserCard(data))
      .catch(error => console.log(error));

    // Fetch repos  
    fetch(`${REPOS_URL}${user}/repos`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(res => res.json())
      .then(data => addRepos(data))
      .catch(error => console.log(error));
  }

  // User info is displayed
  function createUserCard(user) {
    const userInfo = user.items[0];
    const li = document.createElement('li');

    const cardHTML = `    
    <div class="card">
      <div>
        <img src="${userInfo.avatar_url}" alt="${userInfo.name}">
      </div>
      <div>
        <h2>User Name:  ${userInfo.login}  </h2>
        <a href="${userInfo.html_url}">${userInfo.html_url}</a>
      </div>
    </div>`;
  
    li.innerHTML = cardHTML;
    userList.append(li);
  }

  // Repos are displayed as links
  function addRepos(repos) {
    repos.map(repo => {
      const li = document.createElement('li');
      const repoCard = `
        <a href="${repo.url}">${repo.name}</a>
      `;
      li.innerHTML = repoCard;
      reposList.append(li);
    })
  }
});