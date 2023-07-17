import { AddStoryIcon } from '../Icons';
import StoryWrapper from './StoryWrapper';

const NewStory = ({ onClick }: { onClick: () => void }) => {
    return (
        <StoryWrapper
            onClick={onClick}
            className='flex justify-center items-center border border-dashed border-white-9 dark:border-black-8'
        >
            <AddStoryIcon className='fill-[rgba(0,0,0,0.1)] dark:fill-black-8' />
        </StoryWrapper>
    );
};

export default NewStory;
