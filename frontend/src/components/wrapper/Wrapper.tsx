import { CSSProperties, ReactNode } from 'react';
import { classNames } from '../../utils';

const Wrapper = ({
    className = '',
    children,
    gap = '5',
    ...props
}: {
    className?: string;
    children: ReactNode;
    gap?: string;
    style?: CSSProperties;
}) => {
    return (
        <div
            className={classNames(
                'bg-white dark:bg-dark-black-2 rounded-2.5 flex flex-col',
                `gap-${gap}`,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Wrapper;
