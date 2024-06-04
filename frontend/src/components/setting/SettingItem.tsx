import { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../Icons';

const SettingItem = ({
    title,
    description,
    icon,
    to,
}: {
    title: string;
    description?: string;
    icon: ReactNode;
    to?: string;
}) => {
    const Wrapper: ElementType = to ? Link : 'div';
    const passProps = to ? { to } : {};

    return (
        <Wrapper
            {...passProps}
            className='bg-white dark:bg-dark-black-2 rounded-2.5 p-3 flex items-center gap-4'
        >
            <span className='flex justify-center items-center w-6 h-6 text-black-8 dark:text-white'>
                {icon}
            </span>
            <div className='flex-1 font-semibold'>
                <div className='mb-1.25 text-black dark:text-white'>
                    {title}
                </div>
                <p className='text-sm leading-sm text-black-8 dark:text-white line-clamp-1'>
                    {description}
                </p>
            </div>
            <span className='w-6 h-6'>
                <ArrowRightIcon className='text-black-8 dark:text-white' />
            </span>
        </Wrapper>
    );
};

export default SettingItem;
