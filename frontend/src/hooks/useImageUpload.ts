import { useEffect, useRef, useState } from 'react';
import images from '../config/images';
import uploadImage from '../firebase/uploadImage';
import { IImageUpload } from '../interfaces';
import deleteImage from '../firebase/deleteImage';
import getNameStorage from '../utils/getNameStorage';

function useImageUpload(avatarName: string): IImageUpload {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [file, setFile] = useState<File | undefined>();
    const [image, setImage] = useState('');
    const [tempImage, setTempImage] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const handleLoading = () => setLoading(false);
        image && deleteImage(getNameStorage(image));

        (async function () {
            if (!file || !imageRef.current) return;
            setLoading(true);
            setTempImage(URL.createObjectURL(file));
            const name = images.getName(avatarName, file.type.substring(6));

            try {
                const image = await uploadImage(name, file);

                setImage(image as string);
                imageRef.current.addEventListener('load', handleLoading);
            } catch (error) {
                console.error('🚀 ~ error:', error);
                setLoading(false);
            } finally {
                URL.revokeObjectURL(tempImage);
            }
        })();

        return () => {
            URL.revokeObjectURL(tempImage);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            imageRef.current?.removeEventListener('load', handleLoading);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return {
        imageRef,
        image,
        tempImage,
        isLoading,
        setFile,
        setImage,
    };
}

export default useImageUpload;
