import '../firebase/firebase.js';
import { userLogin, googleLogin } from '../firebase/auth-firebase.js';

export const login = () => {
  const loginCreate = document.createElement('div');
  loginCreate.setAttribute('class', 'container');
  const templateLogin = `
    <main class="home-container">
    <form id="loginForm" class="loginForm">
      <h2 class="subtitle">Login</h2>
      <input
        class="loginEmail inputNames"
        type="email"
        id="loginEmail"
        placeholder="Digite seu e-mail" autocomplet
        required
      />
      <input
        class="loginPassword inputNames"
        type="password"
        id="loginPassword"
        placeholder="Digite uma senha"
        minlength="6" required
      />
      <div class="button-container  serão">
      <button id="loginEnter" class="button loginEnter" type="submit" role="link">
        Entrar
      </button>
      </div>
      <span id="feedback"></span>
      <div class="text-content">
      <p class="textForgot">
      Esqueci a <a class="links" href="#reset">Senha</a>
      </p>
      <div class="social-media google-container">
      <p>Ou entrar com o Google</p>
      <button class="buttonGoogle" type="button" id="buttonGoogle">
      <img class="buttonGoogleImg" src="img/icone-google.png" alt="Logo de Google" />
      </button>
      </div>
      </div>
    </form>
    <div class="social-media">
    <p class="textRegister" >Ainda não tem conta? 
    <a href="#register" class="links">Cadastre-se</a>
    </p>
    </div>
    <div class="backContainer">
    <a href="#home" class="backHome">Voltar a tela inicial</a>
    </div>
  </main>
  `;

  loginCreate.innerHTML = templateLogin;

  const email = loginCreate.querySelector('.loginEmail');
  const password = loginCreate.querySelector('.loginPassword');
  const googleButton = loginCreate.querySelector('.buttonGoogle');
  const feedback = loginCreate.querySelector('#feedback');
  loginCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    if (email.value && password.value) {
      userLogin(email.value, password.value)
        .then(() => {
          window.location.hash = '#timeline';
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            feedback.classList.add('error');
            feedback.innerHTML = 'Senha incorreta';
          } else if (error.code === 'auth/invalid-email') {
            feedback.classList.add('error');
            feedback.innerHTML = 'E-mail inválido';
          } else if (error.code === 'auth/user-not-found') {
            feedback.classList.add('error');
            feedback.innerHTML = 'Usuário não encontrado';
          } else {
            feedback.classList.add('error');
            feedback.innerHTML = 'Opsss!ocorreu um erro Tente novamente.';
          }
          const errorMessage = error.message;
          return errorMessage;
        });
    }
  });

  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch((error) => {
        const errorMessage = error.message;
        return errorMessage;
      });
  });

  return loginCreate;
};
