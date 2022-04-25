import { auth } from '../firebase/auth-firebase.js';
import { showEdit } from './modal.js';
// TEMPLATE DOS POSTS (NO FEED/ DEPOIS DE POSTADO)
export function templatePostFeed(item) {
  // const isPostOwner = verificando se o usuário logado é o mesmo que fez o post
  const isPostOwner = item.userEmail === auth.currentUser.email;
  const container = document.createElement('section');

  const postCreate = `
    <div class="post-div">
      <div class="items-organization">
        <img src="./img/perfil.png"/>
          <p>${item.userEmail}</p>
          ${isPostOwner ? `
          <div>
          <button id="modal-btn-edit"><img src="./img/icon-lapis.png">Editar</button>
          <button id="modal-btn-delete"><img src="./img/icon-lixo.png">Excluir</button>
          </div>` : ''}
          </div>
        <div class="items-organization">
          <p>${item.date}</p>
        </div>
          <p>${item.message}</p>
            <div class="like-container">
            <button id="button-like" class="button-like"><img class="like-icon" src="./img/icon-pipoca-normal.png"/>
            </button>
            </div>
    </div>`;

  container.innerHTML = postCreate;

  if (isPostOwner) {
    const editPost = container.querySelector('#modal-btn-edit');

    editPost.addEventListener('click', () => container.appendChild(showEdit(item)));
  }

  return container;
}
