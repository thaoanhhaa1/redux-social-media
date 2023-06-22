import { ReactNode } from 'react';
import { classNames } from '../../utils';

const FormGroup = ({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={classNames('flex flex-col items-start gap-3', className)}
        >
            {children}
        </div>
    );
};

export default FormGroup;
