import { ReactNode, useEffect } from 'react';
import { classNames } from '../utils';
import Portal from './Portal';

const Modal = ({
    isShowModal,
    handleCloseModal,
    children,
    className = '',
}: {
    isShowModal: boolean;
    handleCloseModal: () => void;
    children: ReactNode;
    className?: string;
}) => {
    useEffect(() => {
        document.body.classList[isShowModal ? 'add' : 'remove']('scroll');
    }, [isShowModal]);

    return (
        <Portal>
            <div
                onClick={handleCloseModal}
                className={classNames(
                    'fixed inset-0 flex items-center justify-center bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer transition-opacity ease-linear duration-150',
                    isShowModal ? 'visible opacity-100' : 'invisible opacity-0',
                )}
            >
                <div className={classNames('mx-2', className)}>
                    <div
                        className='flex items-center justify-center'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
