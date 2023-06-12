import Image from '../Image';
import StoryWrapper from './StoryWrapper';

const Story = ({ url }: { url: string }) => {
    return (
        <StoryWrapper>
            <Image
                className="select-none group-hover:scale-110 transition-all ease-linear"
                src={url}
                alt=""
            />
        </StoryWrapper>
    );
};

export default Story;
