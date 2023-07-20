import { ReactNode } from 'react';
import { DropdownIcon, LockCloseIcon } from '../Icons';

const AudienceTag = ({
    src,
    children,
}: {
    src: string;
    children: ReactNode;
}) => {
    return (
        <div className='w-fit cursor-pointer px-2 py-1 bg-[#E4E6EB] dark:bg-[rgba(255,255,255,0.1)] rounded-[6px] flex gap-1 items-center'>
            <LockCloseIcon className='flex-shrink-0 text-[#1d1f23] dark:text-[#e4e6ea]' />
            <span className='font-semibold text-xs leading-xs text-base-black dark:text-white'>
                {children}
            </span>
            <DropdownIcon />
        </div>
    );
};

export default AudienceTag;
