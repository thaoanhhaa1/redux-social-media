import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { Loading, Sidebar, TopBar } from '../../components';
import config from '../../config';
import { setLoading } from '../../features/page';
import { fetchUser } from '../../features/user';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: RootState) => state.page);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        (async () => {
            try {
                if (user._id) return dispatch(setLoading(false));
                await dispatch(fetchUser()).unwrap();
            } catch (error) {
                navigate(config.routes.signIn);
            }
        })();
    }, [dispatch, navigate, user._id]);

    return (
        <div className='flex'>
            {isLoading && (
                <div className='fixed inset-0 bg-white dark:bg-dark-black-3 z-50'>
                    <Loading />
                </div>
            )}
            <Sidebar />
            <div className='flex-1 w-[calc(100vw_-_var(--home-sidebar-width))]'>
                <TopBar />
                <div className='w-full min-h-[calc(100vh_-_var(--top-bar-height))] pt-2 xxs:pt-5 bg-white-1 dark:bg-dark-black-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
