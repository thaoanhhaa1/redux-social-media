import { ReactNode } from 'react';
import Image from '../Image';
import { DropdownIcon } from '../Icons';

const AudienceTag = ({
    src,
    children,
}: {
    src: string;
    children: ReactNode;
}) => {
    return (
        <div className='cursor-pointer px-2 py-1 bg-[#E4E6EB] rounded-[6px] flex gap-1 items-center'>
            <Image alt='' src={src} className='w-3 h-3' />
            <span className='font-semibold text-xs leading-xs text-base-black'>
                {children}
            </span>
            <DropdownIcon />
        </div>
    );
};

export default AudienceTag;
