import IRepo from './interfaces/IRepo';

const userRepos = () => {
  const searchPanel = document.querySelector('#searchPanel') as HTMLElement;
  const redirectButton = document.querySelector(
    '#redirectButton',
  ) as HTMLElement;
  const repoPanel = document.querySelector('#repoPanel') as HTMLElement;
  const loading = document.querySelector(
    '#loadingIconContainer',
  ) as HTMLElement;
  const status = document.querySelector('#statusContainer') as HTMLElement;

  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');

  const handleGetDatas = async () => {
    if (!q) {
      searchPanel.classList.remove('hidden');
      redirectButton.classList.remove('active');
      return;
    }

    searchPanel.classList.add('hidden');
    redirectButton.classList.add('active');
    loading.classList.add('active');
    repoPanel.classList.remove('active');
    status.classList.remove('active');

    const res = await fetch(`https://api.github.com/users/${q}/repos`);
    const json = await res.json();

    if (res.status === 200 && json.length === 0) {
      loading.classList.remove('active');
      repoPanel.classList.remove('active');
      status.classList.add('active');
      status.querySelector('p')!.innerText = 'Não há repositórios disponíveis!';
      return;
    }

    if (res.status === 200) {
      loading.classList.remove('active');
      repoPanel.classList.add('active');
      status.classList.remove('active');

      let orderedRepos = json.sort(
        (a: IRepo, b: IRepo) => b.stargazers_count - a.stargazers_count,
      );

      orderedRepos = orderedRepos.slice(0, 5);
      handleRepoList(orderedRepos);
      return;
    }

    loading.classList.remove('active');
    repoPanel.classList.remove('active');
    status.classList.remove('active');
  };

  const handleRepoList = (repos: IRepo[]) => {
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
  };

  handleGetDatas();
};

export default userRepos;
