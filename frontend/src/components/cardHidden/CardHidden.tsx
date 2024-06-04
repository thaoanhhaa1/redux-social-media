import { ReactNode } from 'react';
import Button from '../Button';
import Image from '../Image';

const CardHidden = ({
    headerImage,
    description,
    title,
    children,
    loading,
    onUndo,
}: {
    headerImage: string;
    title: string;
    description: string;
    children?: ReactNode;
    loading?: boolean;
    onUndo?: () => void;
}) => {
    if (loading)
        return (
            <div className='flex items-center justify-center gap-1'>
                <div className='w-2 h-2 bg-[#65676B] animate-dot-spin rounded'></div>
                <div className='w-2 h-2 bg-[#65676B] animate-dot-spin rounded animation-delay-300'></div>
                <div className='w-2 h-2 bg-[#65676B] animate-dot-spin rounded animation-delay-600'></div>
            </div>
        );

    return (
        <div>
            <div className='flex gap-3 pb-2'>
                <Image
                    className='w-5 h-5 invert-icon'
                    src={headerImage}
                    alt=''
                />
                <div className='flex-1'>
                    <div className='text-sm leading-sm font-semibold'>
                        {title}
                    </div>
                    <p className='text-xs leading-xs mt-1'>{description}</p>
                </div>
                {onUndo ? (
                    <Button
                        onClick={onUndo}
                        className='bg-[#E4E6EB] dark:bg-dark-black-3 text-sm leading-sm font-semibold'
                    >
                        Undo
                    </Button>
                ) : null}
            </div>
            {children ? (
                <div className='border-t border-white-4'>
                    <div className='-mx-3 -mb-2 pt-2'>{children}</div>
                </div>
            ) : null}
        </div>
    );
};

export default CardHidden;
