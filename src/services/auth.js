// 구글 로그인

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'src/boot/firebase';

const DEFAULT_PHOTO_URL =
  'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function logout() {
  await signOut(auth);
}

export async function signUpWithEmail({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  console.log('user', user);
}

export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}

export async function signInWithEmail({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
