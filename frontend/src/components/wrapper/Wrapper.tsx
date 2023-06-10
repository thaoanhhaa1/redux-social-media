import { ReactNode } from 'react';
import { classNames } from '../../utils';

const Wrapper = ({
    className = '',
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={classNames(
                'bg-white dark:bg-dark-black-2 rounded-[10px] flex flex-col gap-5',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Wrapper;
