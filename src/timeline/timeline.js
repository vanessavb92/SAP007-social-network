import { addPosts, getPosts } from './export-firestore.js';
import { auth, userLogout } from '../firebase/auth-firebase.js';
import { gettingPosts } from './post-template.js';

export const timeline = () => {
  const feedCreate = document.createElement('div');
  const templateFeed = `
      <main class="home-container">

      <div class="container-perfil">
      <img src="./img/perfil.png" class="img-perfil"> 
      <h2>João Carlos</h2>
      </div>

      <button id="button-getout" class="button">Sair</button>

      <input id="post-text" class="message-typing" placeholder="Compartilhe sua experiência com filmes e séries aqui"></input>

      <button id="btn-post" class="button-post button">Publicar</button>
    
      <div class="posts-container">
        <section id="new-post-user" class="all-post"></section>
      <section id="all-post" class="all-post"></section>
    </div>

      </main>
    `;

  feedCreate.innerHTML = templateFeed;

  const logout = feedCreate.querySelector('#button-getout');
  const message = feedCreate.querySelector('.message-typing');
  const buttonPost = feedCreate.querySelector('.button-post');
  const feed = feedCreate.querySelector('#new-post-user');

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    addPosts(
      message.value,
      auth.currentUser.email,
    ).then((id) => {
      const date = new Date().toLocaleString('pt-br');
      const item = {
        userEmail: auth.currentUser.email,
        message: message.value,
        date,
        id,
      };
      feed.prepend(gettingPosts(item));
      message.value = '';
    });
  });

  const sectionPost = feedCreate.querySelector('#all-post');

  const showAllPosts = async () => {
    const allPosts = await getPosts();
    allPosts.forEach((item) => {
      const postElement = gettingPosts(item);
      sectionPost.prepend(postElement);
    });
  };

  logout.addEventListener('click', (e) => {
    e.preventDefault();
    userLogout().then(() => {
      window.location.hash = '';
    });
  });

  showAllPosts();
  return feedCreate;
};
