// TEMPLATE DOS POSTS (NO FEED/ DEPOIS DE POSTADO)
export function templatePostFeed(item) {
  const container = document.createElement('section');

  const postCreate = `
    <div class="post-div">
      <div class="items-organization">
        <img src="./img/perfil.png"/>
          <p>${item.userEmail}</p>
      </div>
        <div class="items-organization">
          <p>${item.date}</p>
        </div>
          <p>${item.message}</p>
            <div class="like-container">
              <img class="like-icon" src="./img/icon-pipoca-normal.png"/>
            </div>
    </div>`;

  container.innerHTML = postCreate;

  return container;
}
