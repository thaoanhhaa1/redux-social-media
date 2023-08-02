import useCreateTweet from '../../contexts/CreateTweetContext';
import SubProps from '../../types/SubProps';
import Image from '../Image';

const LinkAction = ({
    image,
    tag,
    title,
    sub,
}: {
    image?: string;
    tag: string;
    title: string;
    sub: SubProps;
}) => {
    const { setSub } = useCreateTweet();

    const handleClick = () => {
        setSub(sub);
    };

    return (
        <>
            {image && <Image alt='' src={image} className='w-4 h-4 mx-1' />}
            &nbsp;
            {tag}
            <span
                onClick={handleClick}
                className='ml-1 cursor-pointer hover:underline'
            >
                {title}
            </span>
        </>
    );
};

export default LinkAction;
