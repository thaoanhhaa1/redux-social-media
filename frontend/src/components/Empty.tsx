import { ReactNode } from 'react';

const Empty = ({ children }: { children: ReactNode }) => {
    return (
        <div className='font-semibold text-xl text-center leading-xl text-black-8 dark:text-white'>
            {children}
        </div>
    );
};

export default Empty;
