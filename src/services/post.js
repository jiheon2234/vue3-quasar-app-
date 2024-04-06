import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  getDocs,
} from 'firebase/firestore';

export async function createPost(data) {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentcount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
  // await setDoc(doc(db, 'posts', '[pstOd]'), {
  //   ...data,
  //   readCount: 0,
  //   likeCount: 0,
  //   commentcount: 0,
  //   bookmarkCount: 0,
  //   createdAt: serverTimestamp(),
  // });
}

export async function getPosts(params) {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const posts = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data, createdAt: data.createdAt.toDate() };
  });
  console.log(posts);
  return posts;
}
