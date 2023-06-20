import { ReactNode } from 'react';
import { classNames } from '../../../utils';
import Button from '../../Button';

const ChatButton = ({
    children,
    isActive = false,
}: {
    children: ReactNode;
    isActive?: boolean;
}) => {
    return (
        <Button
            className={classNames(
                'w-7.5 h-7.5',
                isActive
                    ? 'bg-blue-white-2 dark:bg-blue text-white-1 dark:text-white'
                    : 'bg-white-1 dark:bg-dark-black-3 text-black-8 dark:text-white',
            )}
        >
            {children}
        </Button>
    );
};

export default ChatButton;
