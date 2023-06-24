import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import TopBar from '../../components/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';
import config from '../../config';
import { fetchUser } from '../../features/user/userSlice';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                await dispatch(fetchUser()).unwrap();
            } catch (error) {
                navigate(config.routes.signIn);
            }
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
