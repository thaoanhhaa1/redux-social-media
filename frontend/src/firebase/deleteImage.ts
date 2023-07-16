import { deleteObject, getStorage, ref } from 'firebase/storage';
import app from './config';

const storage = getStorage(app);

function deleteImage(name: string) {
    const desertRef = ref(storage, `images/${name}`);

    return deleteObject(desertRef);
}

export default deleteImage;
