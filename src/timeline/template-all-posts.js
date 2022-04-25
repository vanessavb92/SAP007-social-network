import { auth } from '../firebase/auth-firebase.js';
import { showEdit } from './modal.js';
// TEMPLATE DOS POSTS (NO FEED/ DEPOIS DE POSTADO)
export function templatePostFeed(item) {
  // const isPostOwner = verificando se o usuário logado é o mesmo que fez o post
  const isPostOwner = item.userEmail === auth.currentUser.email;
  const container = document.createElement('section');

  const postCreate = `
    <div class="post-div">
      <div>
      ${isPostOwner ? `
      <div class="icons-container">
      <button class="modal-buttons" id="modal-btn-edit"><img class="icon-img" src="./img/icon-lapis.png">Editar</button>
      <button class="modal-buttons"  id="modal-btn-delete"><img class="icon-img" src="./img/icon-lixo.png">Excluir</button>
      </div>` : ''}
      <div class="user-info">
        <img class="user-img icon-img" src="./img/perfil.png"/>
          <p class="user-email">${item.userEmail}</p>
          </div>
        <div class="items-organization">
          <p>${item.date}</p>
        </div>
          <div class="message-feed">${item.message}</div>
            <div class="like-container">
            <button id="button-like" class="button-like"><img class="like-icon" src="./img/icon-pipoca-normal.png"/> 2
            </button>
            </div>
    </div>`;

  container.innerHTML = postCreate;

  if (isPostOwner) {
    const btnEditPost = container.querySelector('#modal-btn-edit');

    btnEditPost.addEventListener('click', (e) => {
      e.preventDefault();
      container.appendChild(showEdit(item, container));
    });
  }

  return container;
}
