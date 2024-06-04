import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className='p-5 rounded-lg bg-white dark:bg-dark-black-2'>
            {children}
        </div>
    );
};

export default Wrapper;
