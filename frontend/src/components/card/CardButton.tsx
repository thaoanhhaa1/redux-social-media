import { ReactElement } from 'react';
import { classNames } from '../../utils';
import Button from '../Button';

const CardButton = ({
    icon,
    active = false,
}: {
    icon: ReactElement;
    active?: boolean;
}) => {
    return (
        <Button
            rounded
            small
            icon={icon}
            className={classNames(
                '',
                active
                    ? 'bg-red-white-2 bg-opacity-30 dark:bg-red-white-2'
                    : 'bg-white-1 dark:bg-dark-black-3',
            )}
        />
    );
};

export default CardButton;
