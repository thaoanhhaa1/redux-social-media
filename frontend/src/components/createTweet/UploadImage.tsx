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
        dispatch(setImage(''));
    };

    useEffect(() => {
        dispatch(setImage(image.image));
    }, [dispatch, image.image]);

    return (
        <div className='relative mt-8 h-[25vh] max-h-[221px] p-2 rounded-lg border border-[#CED0D4]'>
            <ImageUpload
                image={image}
                src=''
                wrapperClassName='h-full rounded-lg'
            >
                <ImageVideoUploadIcon className='w-10 h-10' />
            </ImageUpload>
            <div
                onClick={handleClick}
                className='cursor-pointer absolute top-3 right-2.5 w-8 h-8 rounded-full overflow-hidden border border-black-opacity-05'
            >
                <div className='flex justify-center items-center w-full h-full bg-white hover:bg-black-opacity-05 transition-all'>
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
