import { editPosts, deletePosts } from '../firebase/firestore.js';

export function showEdit(item, container) {
  const modalContainer = document.createElement('div');

  const templateEdit = `
  <div class="modal-container">
<textarea id="post-text" class="message-typing" maxlength='300' rows='10'placeholder="Edite sua publicação">${item.message}</textarea>

<button  type='submit' id="btn-save" class="button-save button">Salvar</button>
<button  type='submit' id="btn-cancel" class="btn-cancel button">Cancelar</button>
</div>
`;

  modalContainer.innerHTML = templateEdit;

  const modal = modalContainer.querySelector('.modal-container');
  const btnSave = modalContainer.querySelector('#btn-save');
  const btnCancel = modalContainer.querySelector('.btn-cancel');
  const message = modalContainer.querySelector('#post-text');

  btnSave.addEventListener('click', () => {
    editPosts(item.id, message.value);
    const newMessage = container.querySelector('#post-text');

    newMessage.innerHTML = message.value;

    modalContainer.remove();
  });

  btnCancel.addEventListener('click', () => {
    modal.classList.add('close-modal');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('close-modal');
    }
  });
  return modalContainer;
}

export function modalEditPost(item, postContainer) {
  const modalContainer = document.createElement('div');
  const template = `
  <div id=modal class="modal">
    <div id=modalContent class="modal-content">
      <div class="message-typing-container">
        <textarea name="textarea" maxlength='300' id="message" class="message message-typing" placeholder="Compartilhe sua experiência aqui">${item.message}</textarea>
      </div>
      <div class="button-submit-container">
        <button id="buttonSubmit" class="button-submit-feed">Salvar</button>
      </div>
    </div>
  </div>
    `;

  modalContainer.innerHTML = template;

  const modal = modalContainer.querySelector('#modal');
  const savePost = modalContainer.querySelector('#buttonSubmit');
  const message = modalContainer.querySelector('#message');

  savePost.addEventListener('click', () => {
    editPosts(item.id, message.value);
    const newMessage = postContainer.querySelector('#message');
    modalContainer.remove();
    newMessage.innerHTML = message.value;
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
  <div id=modal class="modal">
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

  const modal = modalContainer.querySelector('#modal');
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
