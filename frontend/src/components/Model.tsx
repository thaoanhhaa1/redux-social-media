import { ReactElement, useEffect } from 'react';
import { classNames } from '../utils';
import Portal from './Portal';

const Model = ({
    isShowModel,
    handleShowModel,
    children,
}: {
    isShowModel: boolean;
    handleShowModel: () => void;
    children: ReactElement;
}) => {
    useEffect(() => {
        document.body.classList[isShowModel ? 'add' : 'remove']('scroll');
    }, [isShowModel]);

    return (
        <Portal>
            <div
                onClick={handleShowModel}
                className={classNames(
                    'fixed inset-0 flex justify-center bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer transition-opacity ease-linear duration-150',
                    isShowModel ? 'visible opacity-100' : 'opacity-0 invisible',
                )}
            >
                <div>
                    <div className="mx-2 min-h-screen flex items-center">
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Model;
