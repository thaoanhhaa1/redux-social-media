import Button from '../Button';
import Image from '../Image';

const ActionButton = ({
    src,
    onClick,
}: {
    src: string;
    onClick: () => void;
}) => {
    return (
        <Button
            onClick={onClick}
            rounded
            className='w-9 h-9 group-hover:bg-white-1 dark:group-hover:bg-white-opacity-10 transition-all'
        >
            <Image className='w-6 h-6' alt='' src={src} />
        </Button>
    );
};

export default ActionButton;
