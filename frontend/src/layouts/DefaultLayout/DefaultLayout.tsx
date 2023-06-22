import { ReactNode } from 'react';
import TopBar from '../../components/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 w-[calc(100vw_-_var(--home-sidebar-width))]">
                <TopBar />
                <div className="w-full min-h-screen pt-[calc(var(--top-bar-height)+20px)] bg-white-1 dark:bg-dark-black-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
