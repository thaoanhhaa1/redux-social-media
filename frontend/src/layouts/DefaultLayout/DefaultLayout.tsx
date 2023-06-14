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
        <div className="flex relative">
            <Sidebar />
            <div className="overflow-x-auto flex-1 relative">
                <TopBar />
                <div className="pt-[calc(var(--top-bar-height)+20px)] bg-white-1 dark:bg-dark-black-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
