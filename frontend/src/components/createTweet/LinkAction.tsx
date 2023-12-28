import { useAppDispatch } from '../../app/hooks';
import { addSub } from '../../features/popupMultiLevel';
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
    const dispatch = useAppDispatch();
    const handleAddSub = () => dispatch(addSub(sub));

    return (
        <>
            {image && <Image alt='' src={image} className='w-4 h-4 mx-1' />}
            &nbsp;
            {tag}
            <span
                onClick={handleAddSub}
                className='ml-1 cursor-pointer hover:underline'
            >
                {title}
            </span>
        </>
    );
};

export default LinkAction;
