import { editPosts, deletePosts } from '../firebase/firestore.js';

export function modalEditPost(item, postContainer) {
  const modalContainer = document.createElement('div');
  const template = `
  <div id=modal-container class="modal-container">
    <div id=modalContent class="modal-content">
      <div class="message-typing-container">
        <textarea name="textarea" maxlength='300' id="message" class="message message-typing" placeholder="Compartilhe sua experiência aqui">${item.message}</textarea>
      </div>
      <div class="button-submit-container">
        <button id="buttonSubmit" class="button-submit-feed button">Salvar</button>
<button  type='submit' id="btn-cancel" class="btn-cancel button-confirm-delete button">Cancelar</button>

      </div>
    </div>
  </div>
    `;

  modalContainer.innerHTML = template;

  const modal = modalContainer.querySelector('#modal');
  const savePost = modalContainer.querySelector('#buttonSubmit');
  const message = modalContainer.querySelector('#message');
  const buttonNo = modalContainer.querySelector('#btn-cancel');

  savePost.addEventListener('click', () => {
    editPosts(item.id, message.value);
    const newMessage = postContainer.querySelector('#message');
    modalContainer.remove();
    newMessage.innerHTML = message.value;
  });

  buttonNo.addEventListener('click', () => {
    modalContainer.remove();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modalContainer.remove();
    }
  });
  return modalContainer;
}

export function modalDeletePost(post, postContainer) {
  const modalContainer = document.createElement('div');

  const template = `
  <div id=modal-container class="modal-container">
    <div class="modal-content">
      <div class="modal-delete-container" >
      <h2 class="text-modal">Apagar postagem?</h2>
        <p class="text-modal">Você tem certeza que deseja excluir a postagem? Essa ação não poderá ser desfeita.</p>
        <div>
          <button id="button-yes" class="button">Sim</button>
          <button id="button-no" class="button-confirm-delete button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  `;

  modalContainer.innerHTML = template;

  const modal = modalContainer.querySelector('#modal-container');
  const buttonYes = modalContainer.querySelector('#button-yes');
  const buttonNo = modalContainer.querySelector('#button-no');

  buttonYes.addEventListener('click', () => {
    deletePosts(post.id);
    postContainer.remove();
  });

  buttonNo.addEventListener('click', () => {
    modalContainer.remove();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modalContainer.remove();
    }
  });

  return modalContainer;
}
