import { ReactNode } from 'react';
import { classNames } from '../../utils';
import Button from '../Button';

const WhatHappenButton = ({
    icon,
    children,
    backgroundColor,
    backgroundColorIcon,
    className = '',
    onClick,
}: {
    icon: ReactNode;
    children: ReactNode;
    backgroundColor: string;
    backgroundColorIcon: string;
    className?: string;
    onClick: () => void;
}) => {
    return (
        <Button
            onClick={onClick}
            icon={
                <span
                    className={classNames(
                        'flex justify-center items-center w-[22px] h-[22px] rounded-full',
                        backgroundColorIcon,
                    )}
                >
                    {icon}
                </span>
            }
            className={classNames(
                'text-black dark:text-white font-medium text-xs leading-xs',
                backgroundColor,
                className,
            )}
        >
            {children}
        </Button>
    );
};

export default WhatHappenButton;
