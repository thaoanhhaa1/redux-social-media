import { ReactNode, useEffect, useState } from 'react';
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
    const [isMouseDown, setMouseDown] = useState<boolean>(false);

    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => {
        if (isMouseDown) handleCloseModal();
        setMouseDown(false);
    };

    useEffect(() => {
        document.body.classList[isShowModal ? 'add' : 'remove']('scroll');
    }, [isShowModal]);

    return (
        <Portal>
            <div
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className={classNames(
                    'fixed inset-0 flex items-center justify-center bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer transition-opacity ease-linear duration-150',
                    isShowModal ? 'visible opacity-100' : 'invisible opacity-0',
                )}
            >
                <div className={classNames('mx-2', className)}>
                    <div
                        className='flex items-center justify-center'
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
