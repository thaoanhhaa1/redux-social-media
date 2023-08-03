import { ReactNode } from 'react';
import { DropdownIcon } from '../Icons';

const AudienceTag = ({
    src,
    children,
}: {
    src: string;
    children: ReactNode;
}) => {
    return (
        <div className='w-fit cursor-pointer px-2 py-1 bg-[#E4E6EB] dark:bg-[rgba(255,255,255,0.1)] rounded-[6px] flex gap-1 items-center'>
            <img alt='' src={src} className='w-3 h-3 invert-icon' />
            <span className='font-semibold text-xs leading-xs text-base-black dark:text-white'>
                {children}
            </span>
            <DropdownIcon />
        </div>
    );
};

export default AudienceTag;
