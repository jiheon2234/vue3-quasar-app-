import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  startAfter,
  limit,
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
}

export async function getPosts(params) {
  const conditions = [];
  if (params?.category) {
    conditions.push(where('category', '==', params.category));
  }
  if (params?.tags && params.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params.tags));
  }

  if (params?.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }
  if (params?.start) {
    conditions.push(startAfter(params.start));
  }
  if (params?.limit) {
    conditions.push(limit(params.limit));
  }

  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { items: posts, lastItem: lastDoc };
}

export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) {
    throw new Error('No such document!');
  }

  const data = docSnap.data();

  return {
    ...data,
    createdAt: data.createdAt?.toDate(),
  };
}

export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}
