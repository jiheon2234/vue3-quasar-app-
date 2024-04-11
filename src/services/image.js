import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/boot/firebase';
import { v4 as uuidv4 } from 'uuid';
import { readAndCompressImage } from 'browser-image-resizer';

export async function uploadImage(file) {
  const filename = `images/${uuidv4()}.${getExtension(file.name)}`;
  const storageref = ref(storage, filename);
  const thumbnail = await compressImage(file);
  const uploadResult = await uploadBytes(storageref, thumbnail);
  const downLoadURL = getDownloadURL(uploadResult.ref);
  //   const downLoadURL = await getDownloadURL(storageref);

  return downLoadURL;
}

function getExtension(filename) {
  return filename.split('.').pop();
}

async function compressImage(file) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
