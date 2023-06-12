import { ReactNode } from 'react';
import Button from '../Button';
import { classNames } from '../../utils';

const WhatHappenButton = ({
    icon,
    children,
    backgroundColor,
    className = '',
}: {
    icon: ReactNode;
    children: ReactNode;
    backgroundColor: string;
    className?: string;
}) => {
    return (
        <Button
            icon={
                <span
                    className={classNames(
                        'flex justify-center items-center w-[22px] h-[22px] rounded-full',
                        backgroundColor,
                    )}
                >
                    {icon}
                </span>
            }
            className={classNames(
                'bg-opacity-20 text-[#000] font-medium text-xs leading-xs',
                backgroundColor,
                className,
            )}
        >
            {children}
        </Button>
    );
};

export default WhatHappenButton;
