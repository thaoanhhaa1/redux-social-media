import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    onClick?: () => void;
};

const Action = ({ children, onClick = () => {} }: Props) => {
    return (
        <div
            onClick={onClick}
            className='w-8 h-6 flex justify-center items-center cursor-pointer'
        >
            {children}
        </div>
    );
};

export default Action;
