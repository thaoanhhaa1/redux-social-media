import { ReactNode, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/TopBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const isDarkTheme = useSelector((state: RootState) => state.theme.isDark);

    useEffect(() => {
        document
            .getElementsByTagName('html')[0]
            .classList[isDarkTheme ? 'add' : 'remove']('dark');
    }, [isDarkTheme]);

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
