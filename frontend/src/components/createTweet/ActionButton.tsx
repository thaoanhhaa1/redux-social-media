import Button from '../Button';
import Image from '../Image';

const ActionButton = ({ src }: { src: string }) => {
    return (
        <Button
            rounded
            className='w-9 h-9 group-hover:bg-white-1 transition-all'
        >
            <Image className='w-6 h-6' alt='' src={src} />
        </Button>
    );
};

export default ActionButton;
