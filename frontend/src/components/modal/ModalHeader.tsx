import { ReactNode } from 'react';
import { useModel } from '../../contexts/ModalContext';
import Button from '../Button';
import { CloseIcon } from '../Icons';

const ModalHeader = ({ children }: { children: ReactNode }) => {
    const { handleClose } = useModel();

    return (
        <header className='relative flex items-center justify-center h-15 text-xl leading-xl border-b border-[#CED0D4] dark:border-dark-black-3 rounded-t-lg'>
            <strong>{children}</strong>
            <Button
                onClick={handleClose}
                className='absolute right-2 xxs:right-3.75 transition-colors duration-300 text-stroke-icon hover:text-red dark:hover:text-red dark:text-white'
                icon={<CloseIcon />}
            />
        </header>
    );
};

export default ModalHeader;
