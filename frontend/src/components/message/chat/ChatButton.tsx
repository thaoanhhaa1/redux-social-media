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
                'w-[30px] h-[30px]',
                isActive
                    ? 'bg-blue-white-2 text-white-1'
                    : 'bg-white-1 text-black-8',
            )}
        >
            {children}
        </Button>
    );
};

export default ChatButton;
