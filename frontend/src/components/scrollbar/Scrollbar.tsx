import { ReactNode } from 'react';
import { ScrollProvider } from '../../contexts/ScrollContext';

const Scrollbar = ({ children }: { children: ReactNode }) => {
    return <ScrollProvider>{children}</ScrollProvider>;
};

export default Scrollbar;
