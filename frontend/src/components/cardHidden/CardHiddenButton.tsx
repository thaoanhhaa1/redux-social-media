import Image from '../Image';

const CardHiddenButton = ({
    image,
    title,
    description,
    onClick = () => {},
}: {
    image: string;
    title: string;
    description?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className='cursor-pointer flex items-center gap-3 p-3 hover:bg-black-opacity-05 dark:hover:bg-white-opacity-05 transition-all rounded-md'
        >
            <Image className='w-5 h-5 invert-icon' src={image} alt='' />
            <div className='flex-1'>
                <div className='text-sm leading-sm font-semibold'>{title}</div>
                {description ? (
                    <p className='text-xs leading-xs mt-1'>{description}</p>
                ) : null}
            </div>
        </div>
    );
};

export default CardHiddenButton;
