import { LegacyRef } from 'react';

interface IImageUpload {
    imageRef: LegacyRef<HTMLImageElement> | undefined;
    image: string;
    tempImage: string;
    isLoading: boolean;
    setFile: (file: File | undefined) => void;
    setImage: (image: string) => void;
}

export default IImageUpload;
