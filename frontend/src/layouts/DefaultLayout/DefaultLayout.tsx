import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { Loading, Sidebar, TopBar } from '../../components';
import config from '../../config';
import { connect, disconnect } from '../../features/socket';
import { getStories } from '../../features/stories';
import { fetchUser } from '../../features/user';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const isLoading = useSelector(
        (state: RootState) => state.stories.isLoading,
    );

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchUser()).unwrap();
            } catch (error) {
                navigate(config.routes.signIn);
            }
        })();
    }, [dispatch, navigate]);

    useEffect(() => {
        if (!user._id) return;

        dispatch(connect(user._id));
        (async () => await dispatch(getStories()).unwrap())();

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch, user._id]);

    if (isLoading) return <Loading />;

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 w-[calc(100vw_-_var(--home-sidebar-width))]'>
                <TopBar />
                <div className='w-full min-h-[100vh_-_var(--top-bar-height)] pt-5 bg-white-1 dark:bg-dark-black-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
