import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
      like: [],
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

// FUNÇÃO DE EDITAR (FIRESTORE)
export function editPosts(itemId, message) {
  const editPost = doc(db, 'posts', itemId);
  return updateDoc(editPost, {
    message,
  });
}

// FUNÇÃO DE DELETAR (FIRESTORE)
export function deletePosts(itemId) {
  return deleteDoc(doc(db, 'posts', itemId));
}

// FUNÇÃO DE LIKE (FIRESTORE) - ARRAYUNION (https://cloud.google.com/firestore/docs/manage-data/add-data?hl=pt-br)
export async function like(itemId, userEmail) {
  try {
    const postId = doc(db, 'posts', itemId);
    return await updateDoc(postId, {
      likes: arrayUnion(userEmail),
    });
  } catch (e) {
    return console.log('Não deu certo o like', e);
  }
}

// FUNÇÃO DE DESLIKE (FIRESTORE) - ARRAYREMOVE
export async function dislike(itemId, userEmail) {
  try {
    const postId = doc(db, 'posts', itemId);
    return await updateDoc(postId, {
      likes: arrayRemove(userEmail),
    });
  } catch (e) {
    return console.log('Não deu certo o like', e);
  }
}
