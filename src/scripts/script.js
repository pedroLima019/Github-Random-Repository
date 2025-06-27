document.addEventListener("DOMContentLoaded", () => {
  const language = document.getElementById("language");
  const status = document.getElementById("status");
  const retryBtn = document.getElementById("retry-btn");
  const refreshBtn = document.getElementById("refresh-btn");

  refreshBtn.textContent = "Refresh";
  retryBtn.textContent = "Click to retry";
  retryBtn.style.display = "none";

  async function searchLanguage() {
    const selectedLanguage = language.value;

    if (!selectedLanguage) {
      status.innerHTML = `<div>
           <p>Please select a language</p>
         </div>`;
      return;
    }

    status.innerHTML = `<div>
           <p>Loading, please wait...</p>
         </div>`;

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc&per_page=100`
      );
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        status.innerHTML = `<div>
           <p>Error fetching repositories</p>
         </div>`;
        return;
      }

      const randomRep =
        data.items[Math.floor(Math.random() * data.items.length)];

      status.innerHTML = `
    <div class="repository">
         <h2><a href= "${randomRep.html_url}" target="_blank">${
        randomRep.full_name
      }</a></h2>
         <p>${randomRep.description || "sem descrição."}</p>

         <ul>
        <li>Stars: ${randomRep.stargazers_count}</li>
        <li>Forks: ${randomRep.forks_count}</li>
        <li>Issues abertas: ${randomRep.open_issues_count}</li>
        </ul>
            
    </div>`;

      retryBtn.style.display = "inline-block";
    } catch (error) {
      console.error(error);
      status.innerHTML = `<div>
           <p>Error a search datas</p>
         </div>`;
    }
  }

  refreshBtn.addEventListener("click", searchLanguage);
  retryBtn.addEventListener("click", searchLanguage);
});
