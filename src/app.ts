/* eslint-disable @typescript-eslint/no-non-null-assertion */
import IUser from './interfaces/IUser';

const app = (): void => {
  const formSearch = document.querySelector('#form') as HTMLFormElement;
  const inputSearch = formSearch.querySelector('input') as HTMLInputElement;
  const userPanel = document.querySelector('#userPanel') as HTMLElement;
  const loading = document.querySelector(
    '#loadingIconContainer',
  ) as HTMLElement;
  const status = document.querySelector('#statusContainer') as HTMLElement;

  const handleUserDetails = (user: IUser) => {
    userPanel.querySelector('#userLogin')!.innerHTML = user.login;

    userPanel.querySelector('#userFollowers span')!.innerHTML = String(
      user.followers,
    );

    userPanel.querySelector('#userFollowing span')!.innerHTML = String(
      user.following,
    );

    const userAvatar = userPanel.querySelector(
      '#userAvatar img',
    ) as HTMLImageElement;

    userAvatar.setAttribute('src', user.avatar_url);
    userAvatar.setAttribute('alt', `Foto de usuário do ${user.login}`);

    const userBio = userPanel.querySelector('#userBio') as HTMLParagraphElement;

    if (user.bio) {
      userBio.style.display = 'block';
      userBio.innerText = user.bio;
    } else {
      userBio.style.display = 'none';
    }

    const userLocation = userPanel.querySelector(
      '#userLocation',
    ) as HTMLSpanElement;

    if (user.location) {
      userLocation.style.display = 'flex';
      userLocation.querySelector('span')!.innerText = user.location;
    } else {
      userLocation.style.display = 'none';
    }
  };

  const handleGetDatas = async (value: string) => {
    loading.classList.add('active');
    status.classList.remove('active');
    userPanel.classList.remove('active');

    const res = await fetch(`https://api.github.com/users/${value}`);
    const json = await res.json();

    if (res.status === 200) {
      loading.classList.remove('active');
      status.classList.remove('active');
      handleUserDetails(json);
      userPanel.classList.add('active');
      return;
    }

    loading.classList.remove('active');
    status.classList.add('active');
    userPanel.classList.remove('active');
  };

  const handleSearchFormSubmit = async (e: Event) => {
    e.preventDefault();
    inputSearch.focus();

    if (inputSearch.value.length > 0) {
      await handleGetDatas(inputSearch.value);
      inputSearch.value = '';
    }
  };

  if (formSearch) {
    formSearch.addEventListener('submit', handleSearchFormSubmit);
  }
};

export default app;
