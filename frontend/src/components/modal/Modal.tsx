import { ReactNode, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { ModalProvider } from '../../contexts/ModalContext';
import { classNames } from '../../utils';
import Portal from '../Portal';

const Modal = ({
    isShowModal,
    children,
    className = '',
    containerClassName = '',
    handleCloseModal,
}: {
    isShowModal: boolean;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
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
            <ModalProvider
                value={{
                    handleClose: handleCloseModal,
                }}
            >
                <div
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    className={classNames(
                        'fixed inset-0 flex items-center justify-center bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer transition-opacity ease-linear duration-150',
                        isShowModal
                            ? 'visible opacity-100'
                            : 'invisible opacity-0',
                        containerClassName,
                    )}
                >
                    <div className={classNames('mx-2 w-fit', className)}>
                        <div
                            className='flex items-center justify-center w-fit'
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {isShowModal && (
                                <FocusOn className='w-fit bg-white dark:bg-[#242526] rounded-lg'>
                                    {children}
                                </FocusOn>
                            )}
                        </div>
                    </div>
                </div>
            </ModalProvider>
        </Portal>
    );
};

export default Modal;
