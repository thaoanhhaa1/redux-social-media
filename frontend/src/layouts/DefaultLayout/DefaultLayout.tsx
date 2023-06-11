import { ReactNode } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex relative">
            <Sidebar />
            <div className="overflow-x-auto flex-1 relative">
                <TopBar />
                <div>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
