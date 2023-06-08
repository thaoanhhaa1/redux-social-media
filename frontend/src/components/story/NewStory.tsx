import { AddStoryIcon } from '../Icons';
import StoryWrapper from './StoryWrapper';

const NewStory = () => {
    return (
        <StoryWrapper className="flex justify-center items-center border border-dashed border-white-9">
            <AddStoryIcon />
        </StoryWrapper>
    );
};

export default NewStory;
