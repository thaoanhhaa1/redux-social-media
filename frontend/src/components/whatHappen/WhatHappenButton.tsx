import { ReactNode } from 'react';
import { classNames } from '../../utils';
import Button from '../Button';

const WhatHappenButton = ({
    icon,
    children,
    backgroundColor,
    backgroundColorIcon,
    className = '',
}: {
    icon: ReactNode;
    children: ReactNode;
    backgroundColor: string;
    backgroundColorIcon: string;
    className?: string;
}) => {
    return (
        <Button
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
