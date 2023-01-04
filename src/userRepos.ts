import IRepo from './interfaces/IRepo';

const userRepos = () => {
  const repoPanel = document.querySelector('#repoPanel') as HTMLUListElement;
  const loading = document.querySelector(
    '#loadingIconContainer',
  ) as HTMLElement;

  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');

  const handleGetDatas = async () => {
    if (!q) return;

    loading.classList.add('active');
    repoPanel.classList.remove('active');

    const res = await fetch(`https://api.github.com/users/${q}/repos`);
    const json = await res.json();

    if (res.status === 200) {
      loading.classList.remove('active');
      repoPanel.classList.add('active');

      let orderedRepos = json.sort(
        (a: IRepo, b: IRepo) => b.stargazers_count - a.stargazers_count,
      );

      orderedRepos = orderedRepos.slice(0, 5);
      handleRepoList(orderedRepos);
      return;
    }

    loading.classList.remove('active');
    repoPanel.classList.remove('active');
  };

  const handleRepoList = (repos: IRepo[]) => {
    console.log(repos);

    repos.forEach((repo) => {
      repoPanel.querySelector('ul')!.innerHTML += `<li>
        <a href=${repo.html_url} target="_blank">${repo.name}</a>

        <span>
          <i class="fa-solid fa-code"></i>
          ${repo.language}
        </span>

        <ul>
          <li>
            <i class="fa-regular fa-star"></i>
            <span>${repo.stargazers_count}</span>
          </li>

          <li>
            <i class="fa-solid fa-code-fork"></i>
            <span>${repo.forks_count}</span>
          </li>
        </ul>

        <a href=${repo.html_url} target="_blank">
          Ver código
          <i class="fa-solid fa-code-branch"></i>
        </a>
      </li>`;
    });

    console.log(repoPanel);
  };

  handleGetDatas();
};

export default userRepos;