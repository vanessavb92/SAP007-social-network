import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  orderBy,
  query,
  // doc,
  // deleteDoc,
  // eslint-disable-next-line
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

const db = getFirestore();

// AWAIT (ASYNC/ ASSINCRONA)
export async function addPosts(message, userEmail) {
  try {
    // DOCREF - DOCUMENTO DE REFERENCIA (NO CASO A ESTA FAZENDO O 'CAMINHO' PARA A COLEÇÃO > POSTS)
    // ADDDOC ADICIONA UM NOVO DOCUMENTO A COLEÇÃO
    const docRef = await addDoc(collection(db, 'posts'), {
      message,
      userEmail,
      date: new Date().toLocaleString('pt-br'),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}
// eslint-disable-next-line
// FUNÇÃO CRIANDO UM ARRAY DAS INFOS, ORDENANDO POR DATA (USANDO A FUNÇÃO ORDERBY) E JOGANDO NA TIMELINE
export const orderPosts = async () => {
  const arrPosts = [];
  const orderFirestore = query(collection(db, 'posts'), orderBy('date'));
  const querySnapshot = await getDocs(orderFirestore);
  querySnapshot.forEach((item) => {
    const timeline = item.data();
    timeline.id = item.id;
    arrPosts.push(timeline);
  });

  return arrPosts;
};
