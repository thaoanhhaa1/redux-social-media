import { ReactNode } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-screen flex">
            <Sidebar />
            <div className="overflow-auto flex-1">
                <TopBar />
                <div className="p-5 bg-white-white-1">{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
