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
import Model from './Model';
import ImageUpload from './imageUpload';

const CreateStory = ({
    isShowModel,
    setShowModel,
}: {
    isShowModel: boolean;
    setShowModel: Dispatch<SetStateAction<boolean>>;
}) => {
    const { user, stories } = useSelector((state: RootState) => state);
    const story = useImageUpload(`${user._id}_${new Date().getTime()}`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isShowModel) return;
        story.setImage('');
        story.setFile(undefined);
        story.image && deleteImage(getNameStorage(story.image));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowModel]);

    const handleCreateStory = async () => {
        try {
            await dispatch(createStory(story.image)).unwrap();
            story.setImage('');
            setShowModel(false);
        } catch (error) {
            console.error('🚀 ~ handleCreateStory ~ error:', error);
        }
    };

    return (
        <Model
            isShowModel={isShowModel}
            handleCloseModel={() => setShowModel(false)}
        >
            <div
                className={classNames(
                    'max-w-[555px] w-[80vw] cursor-default ease-out duration-300',
                    true ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <div className='flex items-center gap-5 px-5 py-3.75 bg-black-1 dark:bg-dark-black-2'>
                    <Button
                        onClick={() => setShowModel(false)}
                        className='w-8.5 h-8.5 text-white-3 hover:text-red transition-all'
                    >
                        <CloseIcon />
                    </Button>
                    <div className='-ml-[6px] flex-1 font-semibold text-xl leading-xl text-white'>
                        Create story
                    </div>
                    <Button
                        isLoading={stories.isLoading}
                        onClick={handleCreateStory}
                        disabled={story.isLoading || !story.image}
                        type='submit'
                        className='w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        save
                    </Button>
                </div>
                <div className='flex justify-center items-center w-full aspect-square bg-white'>
                    <ImageUpload
                        image={story}
                        src=''
                        wrapperClassName='w-full h-full'
                    >
                        <ImageVideoUploadIcon className='text-stroke-icon' />
                    </ImageUpload>
                </div>
            </div>
        </Model>
    );
};

export default CreateStory;
