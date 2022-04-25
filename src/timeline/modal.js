import { editPosts } from '../firebase/firestore.js';

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
