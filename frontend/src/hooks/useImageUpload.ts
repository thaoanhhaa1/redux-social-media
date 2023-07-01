import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import images from '../config/images';
import app from '../firebase/config';
import { IImageUpload } from '../interfaces';

function useImageUpload(avatarName: string): IImageUpload {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const [image, setImage] = useState('');
    const [tempImage, setTempImage] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async function () {
            if (!file || !imageRef.current) return;
            setLoading(true);
            setTempImage(URL.createObjectURL(file));

            const storage = getStorage(app);
            const storageRef = ref(
                storage,
                images.getName(avatarName, file.type.substring(6)),
            );

            const uploadTask = uploadBytesResumable(storageRef, file);

            try {
                const image = await new Promise((res, rej) => {
                    uploadTask.on(
                        'state_changed',
                        () => {
                            // const progress =
                            //     (snapshot.bytesTransferred /
                            //         snapshot.totalBytes) *
                            //     100;
                            // console.log('Upload is ' + progress + '% done');
                            // switch (snapshot.state) {
                            //     case 'paused':
                            //         console.log('Upload is paused');
                            //         break;
                            //     case 'running':
                            //         console.log('Upload is running');
                            //         break;
                            // }
                        },
                        rej,
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(res);
                        },
                    );
                });

                setImage(image as string);
                imageRef.current.addEventListener('load', () =>
                    setLoading(false),
                );
            } catch (error) {
                console.error('🚀 ~ error:', error);
                setLoading(false);
            } finally {
                URL.revokeObjectURL(tempImage);
            }
        })();

        return () => URL.revokeObjectURL(tempImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return {
        imageRef,
        image,
        tempImage,
        isLoading,
        setFile,
    };
}

export default useImageUpload;
