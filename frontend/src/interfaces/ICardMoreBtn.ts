import { IconType } from '../types';

interface ICardMoreBtn {
    icon: IconType;
    activeIcon?: IconType;
    title: string;
    active?: boolean;
    onClick?: () => void;
}

export default ICardMoreBtn;
