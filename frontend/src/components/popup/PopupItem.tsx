import { ReactNode } from 'react';

export interface IPopupItemProps {
    children: ReactNode;
    onClick?: () => void;
}

export default function PopupItem({
    children,
    onClick = () => {},
}: IPopupItemProps) {
    return (
        <div
            onClick={onClick}
            className='p-2 font-medium text-sm leading-sm hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded transition-all ease-in'
        >
            {children}
        </div>
    );
}
