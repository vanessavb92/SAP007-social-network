import '../firebase/firebase.js';
import { auth, userLogout } from '../firebase/auth-firebase.js';
import { templatePostFeed } from './template-all-posts.js';
import { addPosts, orderPosts } from '../firebase/firestore.js';
// TIMELINE - TEXTAREA PARA O USUARIO LOGADO ESCREVER E 2 BOTÕES (SAIR E POSTAR)
export const timeline = () => {
  const feedCreate = document.createElement('div');
  const templateFeed = `
      <main class="home-container">

      <button id="button-getout" class="button">Sair</button>

      <textarea id="post-text" class="message-typing" maxlength='300' rows='10'placeholder="Compartilhe sua experiência com filmes e séries aqui"></textarea>

      <button  type='submit' id="btn-post" class="button-post button">Publicar</button>
    
      <div class="posts-container">
        <section id="new-post-user" class="all-post"></section>
      <section id="all-post" class="all-post"></section>
    </div>

      </main>
    `;

  feedCreate.innerHTML = templateFeed;

  const logout = feedCreate.querySelector('#button-getout');
  const message = feedCreate.querySelector('#post-text');
  const buttonPost = feedCreate.querySelector('.button-post');
  const feed = feedCreate.querySelector('#new-post-user');

  /* buttonPost.addEventListener('click', (e) => {
    e.preventDefault();
    message.value;
    if (message == null && value == null) {
      alert('NÃO');
    }
  });
   */
  // pegar o click para printar o post na tela
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    /*  addPosts veio das config firestore (addDoc), pega a menssagem do usuário (recebe parâmetro de message, userEmail, ID do post) */
    addPosts(
      message.value,
      auth.currentUser.email,
    ).then((id) => {
      // FUNÇÃO PRONTA DE DATE
      const date = new Date().toLocaleString('pt-br');
      const item = {
        userEmail: auth.currentUser.email,
        message: message.value,
        date,
        id,
      };
      feed.prepend(templatePostFeed(item));
      message.value = '';
    });
  });

  const sectionPost = feedCreate.querySelector('#all-post'); // section guardar todos os posts

  const showAllPosts = async () => {
    // mostrar posts na tela (do banco)
    const allPosts = await orderPosts();
    allPosts.forEach((item) => { // passando pelos elementos do posts
      const postElement = templatePostFeed(item);
      sectionPost.prepend(postElement);// incluindo um filho na lista
    });
  };
  // função para sair
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    userLogout().then(() => {
      window.location.hash = '';
    });
  });

  showAllPosts();
  return feedCreate;
};
