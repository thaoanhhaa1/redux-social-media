import { ReactNode, useState } from 'react';
import { classNames } from '../utils';
import Portal from './Portal';
import { FocusOn } from 'react-focus-on';

const Modal = ({
    isShowModal,
    children,
    className = '',
    handleCloseModal,
}: {
    isShowModal: boolean;
    children: ReactNode;
    className?: string;
    handleCloseModal: () => void;
}) => {
    const [isMouseDown, setMouseDown] = useState<boolean>(false);

    const handleMouseDown = () => {
        setMouseDown(true);
    };
    const handleMouseUp = () => {
        if (isMouseDown) handleCloseModal();
        setMouseDown(false);
    };

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
                <div className={classNames('mx-2 w-fit', className)}>
                    <div
                        className='flex items-center justify-center w-fit'
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {isShowModal && (
                            <FocusOn className='w-fit'>{children}</FocusOn>
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
