import { useMemo } from 'react';
import { ICardMoreBtn } from '../../interfaces';
import Button from '../Button';

const CardMoreBtn = ({ cardMore }: { cardMore: ICardMoreBtn }) => {
    const { icon, title, active, activeIcon, onClick = () => {} } = cardMore;
    const Icon = useMemo(
        () => (active && activeIcon) || icon,
        [active, activeIcon, icon],
    );

    return (
        <Button
            onClick={onClick}
            align='left'
            gap='4'
            className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
            icon={<Icon className='fill-black dark:fill-white-1' />}
        >
            {title}
        </Button>
    );
};

export default CardMoreBtn;
