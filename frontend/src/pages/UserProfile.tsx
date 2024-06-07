import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import ListDetail from '../components/ListDetail';
import ListDetailSkeleton from '../components/ListDetailSkeleton';
import config from '../config';
import { getUserProfile } from '../features/userProfile';
import NotFound from './NotFound';

const UserProfile = () => {
    const user = useAppSelector((state: RootState) => state.user);
    const { username } = useParams();
    const { loading, lists } = useAppSelector(
        (state: RootState) => state.userProfiles,
    );
    console.log('🚀 ~ UserProfile ~ lists:', lists);
    const list = useMemo(
        () => lists.find((list) => list.username === username),
        [lists, username],
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!list && username && user.username && user.username !== username)
            dispatch(getUserProfile({ username }));
    }, [dispatch, list, user.username, username]);

    useEffect(() => {
        if (user.username === username) navigate(config.routes.profile);
    }, [navigate, user.username, username]);

    if (loading)
        return (
            <div className='px-2 xxs:px-3 xs:px-4 dl:px-5 max-w-[700px] mx-auto'>
                <ListDetailSkeleton />
            </div>
        );
    if (!username || !list) return <NotFound />;

    return (
        <div className='px-2 xxs:px-3 xs:px-4 dl:px-5 max-w-[700px] mx-auto'>
            <ListDetail type='USER_PROFILE' list={list} />
        </div>
    );
};

export default UserProfile;
