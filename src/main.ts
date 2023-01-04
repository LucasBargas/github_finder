import githubSearch from './githubSearch';
import userRepos from './userRepos';

const formSearch = document.querySelector('#form') as HTMLFormElement;

if (formSearch) {
  githubSearch(formSearch);
}

userRepos();
