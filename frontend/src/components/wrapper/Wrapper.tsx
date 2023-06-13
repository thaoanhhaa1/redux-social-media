import { ReactNode } from 'react';
import { classNames } from '../../utils';

const Wrapper = ({
    className = '',
    children,
    gap = '5',
}: {
    className?: string;
    children: ReactNode;
    gap?: string;
}) => {
    return (
        <div
            className={classNames(
                'bg-white dark:bg-dark-black-2 rounded-2.5 flex flex-col',
                `gap-${gap}`,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Wrapper;
