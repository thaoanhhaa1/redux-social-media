import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { createStory } from '../features/stories';
import deleteImage from '../firebase/deleteImage';
import { useImageUpload } from '../hooks';
import { classNames, getNameStorage } from '../utils';
import Button from './Button';
import { ImageVideoUploadIcon } from './Icons';
import ImageUpload from './imageUpload';
import { ModalFooterButton, ModalHeader } from './modal';
import Modal from './modal/Modal';

const CreateStory = ({
    isShowModal,
    setShowModal,
}: {
    isShowModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const stories = useSelector((state: RootState) => state.stories);
    const user = useSelector((state: RootState) => state.user);
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
                    'max-w-[555px] w-[calc(100vw-16px)] xxs:w-[80vw] cursor-default ease-out duration-300 rounded-2.5 overflow-hidden',
                    true ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <ModalHeader>Create story</ModalHeader>
                <div className='flex justify-center items-center w-full aspect-square'>
                    <ImageUpload
                        image={story}
                        src=''
                        wrapperClassName='w-full h-full'
                        fallback=''
                    >
                        <ImageVideoUploadIcon className='text-stroke-icon' />
                    </ImageUpload>
                </div>
                <ModalFooterButton>
                    <Button
                        isLoading={stories.isLoading}
                        onClick={handleCreateStory}
                        disabled={story.isLoading || !story.image}
                        type='submit'
                        className='z-1 w-[80px] xxs:w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        save
                    </Button>
                </ModalFooterButton>
            </div>
        </Modal>
    );
};

export default CreateStory;
