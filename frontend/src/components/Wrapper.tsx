import { ReactNode } from 'react';
import { classNames } from '../utils';

const Wrapper = ({
    className = '',
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div className={classNames('bg-white rounded-[10px]', className)}>
            {children}
        </div>
    );
};

export default Wrapper;
