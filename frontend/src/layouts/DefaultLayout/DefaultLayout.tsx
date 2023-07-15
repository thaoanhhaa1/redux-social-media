import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { Loading, Sidebar, TopBar } from '../../components';
import config from '../../config';
import { connect, disconnect } from '../../features/socket';
import { fetchUser } from '../../features/user';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchUser()).unwrap();
            } catch (error) {
                navigate(config.routes.signIn);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!user._id) return;

        dispatch(connect(user._id));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch, user._id]);

    if (!user._id) return <Loading />;

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 w-[calc(100vw_-_var(--home-sidebar-width))]'>
                <TopBar />
                <div className='w-full min-h-screen pt-[calc(var(--top-bar-height)+20px)] bg-white-1 dark:bg-dark-black-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
