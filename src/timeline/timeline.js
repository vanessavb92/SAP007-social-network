import '../firebase/firebase.js';
import { auth, userLogout } from '../firebase/auth-firebase.js';
import { templatePostFeed } from './template-all-posts.js';
import { addPosts, orderPosts } from '../firebase/firestore.js';
// TIMELINE - TEXTAREA PARA O USUARIO LOGADO ESCREVER E 2 BOTÕES (SAIR E POSTAR)
export const timeline = () => {
  const feedCreate = document.createElement('div');
  const templateFeed = `
      <main class="home-container">

      <div class="getout-container"><button id="button-getout" class="button btn-getout">Sair</button>
      </div>

      <span id="feedback"></span>

      <div class="text-container">
      <textarea id="post-text" class="message-typing" maxlength='300' placeholder="Compartilhe sua experiência com filmes e séries aqui"></textarea>
      </div>

      <div class="post-container getout-container">
      <button  type='submit' id="btn-post" class="button-post button">Publicar</button>
      </div>
    
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
  const feedback = feedCreate.querySelector('#feedback');
  const sectionPost = feedCreate.querySelector('#all-post');

  const showAllPosts = async () => {
    // mostrar posts na tela (do banco)
    const allPosts = await orderPosts();
    allPosts.forEach((item) => { // passando pelos elementos do posts
      const postElement = templatePostFeed(item);
      sectionPost.prepend(postElement);// incluindo um filho na lista
    });
  };

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const valueMessage = message.value;
    if (valueMessage === '' || !valueMessage) {
      feedback.classList.add('error');
      feedback.innerHTML = 'Erro! Post vazio. Tente novamente.';
    } else {
      addPosts(valueMessage, auth.currentUser.email).then((id) => {
        const date = new Date().toLocaleString('pt-br');
        const item = {
          userEmail: auth.currentUser.email,
          message: message.value,
          date,
          id,
          like: [],
        };
        feed.prepend(templatePostFeed(item));
        message.value = '';
        feedback.innerHTML = '';
      });
    }
  });

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
