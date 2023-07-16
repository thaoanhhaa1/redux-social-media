import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import app from './config';

function uploadImage(name: string, file: File) {
    const storage = getStorage(app);
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((res, rej) => {
        uploadTask.on(
            'state_changed',
            () => {},
            rej,
            () => getDownloadURL(uploadTask.snapshot.ref).then(res),
        );
    });
}

export default uploadImage;
