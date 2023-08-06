import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setImage, setShowUploadImage } from '../../features/myTweet';
import deleteImage from '../../firebase/deleteImage';
import { useImageUpload } from '../../hooks';
import { getNameStorage } from '../../utils';
import { ImageVideoUploadIcon, XMarkIcon } from '../Icons';
import ImageUpload from '../imageUpload/ImageUpload';

const UploadImage = () => {
    const image = useImageUpload(`${new Date().getTime()}`);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setShowUploadImage());
        if (image.image) deleteImage(getNameStorage(image.image));
        image.setImage('');
        dispatch(setImage());
    };

    useEffect(() => {
        dispatch(setImage(image.image));
    }, [dispatch, image.image]);

    return (
        <div className='relative mt-8 min-h-[166px] h-[25vh] max-h-[221px] p-2 rounded-lg border border-[#CED0D4] dark:border-[#3E4042]'>
            <ImageUpload
                image={image}
                src=''
                cameraClassName='inset-0 flex justify-center items-center'
                wrapperClassName='cursor-pointer h-full rounded-lg bg-[#F7F8FA] dark:bg-[#323436] hover:bg-black-opacity-05 hover:dark:bg-white-opacity-10 transition-all'
            >
                <ImageVideoUploadIcon className='w-10 h-10' />
            </ImageUpload>
            <div
                onClick={handleClick}
                className='cursor-pointer absolute top-3 right-2.5 w-8 h-8 rounded-full overflow-hidden border border-black-opacity-05'
            >
                <div className='flex justify-center items-center w-full h-full dark:text-[#B0B3B8] bg-white dark:bg-[#3E4042] hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10 transition-all dark:shadow-[0_0_0_1px_rgba(0,_0,_0,_0.1)]'>
                    <XMarkIcon
                        width={16}
                        height={16}
                        className='text-stroke-icon'
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadImage;
