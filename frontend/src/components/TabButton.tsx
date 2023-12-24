import { ReactNode } from 'react';
import { classNames } from '../utils';

type Props = {
    active: boolean;
    children: ReactNode;
    onClick: () => void;
};

const TabButton = ({ active, children, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'flex-1 font-bold border-b pb-2',
                active
                    ? 'text-blue dark:text-blue-black-1 border-blue-white-1'
                    : 'text-black-5 dark:text-white border-base-black dark:border-dark-black-1',
            )}
        >
            {children}
        </button>
    );
};

export default TabButton;
