import { ReactNode, useEffect } from 'react';
import { classNames } from '../utils';
import Portal from './Portal';

const Model = ({
    isShowModel,
    handleCloseModel,
    children,
    className = '',
}: {
    isShowModel: boolean;
    handleCloseModel: () => void;
    children: ReactNode;
    className?: string;
}) => {
    useEffect(() => {
        document.body.classList[isShowModel ? 'add' : 'remove']('scroll');
    }, [isShowModel]);

    return (
        <Portal>
            <div
                onClick={handleCloseModel}
                className={classNames(
                    'fixed inset-0 flex place-content-center bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer transition-opacity ease-linear duration-150',
                    isShowModel ? 'visible opacity-100' : 'invisible opacity-0',
                )}
            >
                <div className={className}>
                    <div className='mx-2 min-h-screen flex items-center'>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Model;
