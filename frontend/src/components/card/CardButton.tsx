import { ReactElement } from 'react';
import { classNames } from '../../utils';
import Button from '../Button';

const CardButton = ({
    icon,
    active = false,
    className = 'text-black dark:text-white',
    number,
    onClick = () => {},
}: {
    icon: ReactElement;
    active?: boolean;
    className?: string;
    number: number;
    onClick?: () => void;
}) => {
    return (
        <div className='flex items-center gap-[6px]'>
            <Button
                onClick={onClick}
                rounded
                small
                icon={icon}
                className={classNames(
                    '',
                    active
                        ? 'bg-red-white-2 bg-opacity-30 dark:bg-red-white-2'
                        : 'bg-white-1 dark:bg-dark-black-3',
                    className,
                )}
            />
            <span className='text-xs leading-3.75 text-black-8 dark:text-white-9'>
                {number}
            </span>
        </div>
    );
};

export default CardButton;
