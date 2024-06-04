import { ReactNode } from 'react';

const ModalFooterButton = ({ children }: { children: ReactNode }) => {
    return (
        <footer className='px-[15px] flex items-center justify-end gap-3 h-15 border-t border-[#CED0D4] dark:border-dark-black-3 rounded-b-lg'>
            {children}
        </footer>
    );
};

export default ModalFooterButton;
