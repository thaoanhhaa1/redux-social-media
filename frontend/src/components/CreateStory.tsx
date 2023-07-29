import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { createStory } from '../features/stories';
import deleteImage from '../firebase/deleteImage';
import { useImageUpload } from '../hooks';
import { classNames, getNameStorage } from '../utils';
import Button from './Button';
import { CloseIcon, ImageVideoUploadIcon } from './Icons';
import Modal from './Modal';
import ImageUpload from './imageUpload';

const CreateStory = ({
    isShowModal,
    setShowModal,
}: {
    isShowModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const { user, stories } = useSelector((state: RootState) => state);
    const story = useImageUpload(`${user._id}_${new Date().getTime()}`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isShowModal) return;
        story.setImage('');
        story.setFile(undefined);
        story.image && deleteImage(getNameStorage(story.image));

        return () => {
            if (!isShowModal && story.image)
                deleteImage(getNameStorage(story.image));
        };
    }, [isShowModal, story]);

    const handleCreateStory = async () => {
        try {
            await dispatch(createStory(story.image)).unwrap();
            story.setImage('');
            setShowModal(false);
        } catch (error) {
            console.error('🚀 ~ handleCreateStory ~ error:', error);
        }
    };

    return (
        <Modal
            isShowModal={isShowModal}
            handleCloseModal={() => setShowModal(false)}
        >
            <div
                className={classNames(
                    'max-w-[555px] w-[calc(100vw-16px)] xxs:w-[80vw] cursor-default ease-out duration-300 rounded-2.5 overflow-hidden bg-white dark:bg-[#242526]',
                    true ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <div className='relative flex justify-between items-center gap-5 px-2 xxs:px-5 py-2 xxs:py-3.75 border-b border-black-opacity-10'>
                    <Button
                        onClick={() => setShowModal(false)}
                        className='z-1 w-8.5 h-8.5 text-stroke-icon dark:text-white hover:text-red dark:hover:text-red transition-all'
                    >
                        <CloseIcon />
                    </Button>
                    <div className='absolute left-0 right-0 -ml-[6px] flex-1 font-semibold text-xl leading-xl text-black text-center dark:text-white'>
                        Create story
                    </div>
                    <Button
                        isLoading={stories.isLoading}
                        onClick={handleCreateStory}
                        disabled={story.isLoading || !story.image}
                        type='submit'
                        className='z-1 w-[80px] xxs:w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        save
                    </Button>
                </div>
                <div className='flex justify-center items-center w-full aspect-square'>
                    <ImageUpload
                        image={story}
                        src=''
                        wrapperClassName='w-full h-full'
                    >
                        <ImageVideoUploadIcon className='text-stroke-icon' />
                    </ImageUpload>
                </div>
            </div>
        </Modal>
    );
};

export default CreateStory;
