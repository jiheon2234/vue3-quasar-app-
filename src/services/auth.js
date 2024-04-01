// 구글 로그인

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log('user:', result.user);
}

export async function logout() {
  await signOut(auth);
}
