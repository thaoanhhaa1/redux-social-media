import { ReactElement } from 'react';
import { classNames } from '../../utils';
import Button from '../Button';

const CardButton = ({
    icon,
    active = false,
    className = '',
    onClick = () => {},
}: {
    icon: ReactElement;
    active?: boolean;
    className?: string;
    onClick?: () => void;
}) => {
    return (
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
    );
};

export default CardButton;
