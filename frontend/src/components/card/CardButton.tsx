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
                'bg-opacity-5',
                active
                    ? 'bg-red-white-2 dark:bg-red-white-2'
                    : 'bg-black dark:bg-dark-black-3',
            )}
        />
    );
};

export default CardButton;
