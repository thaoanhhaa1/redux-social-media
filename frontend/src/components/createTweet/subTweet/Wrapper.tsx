import { ReactElement } from 'react';

const Wrapper = ({ children }: { children: ReactElement }) => {
    return (
        <div className='h-3/4 max-h-[500px] overflow-y-auto'>{children}</div>
    );
};

export default Wrapper;
