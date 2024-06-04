import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Setting } from '../components';
import BlockedUser, { BlockedUserSkeleton } from '../components/blockedUser';
import { getBlockedUsers } from '../features/userRelations';

const Blocking = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { blocked } = useAppSelector(
        (state: RootState) => state.userRelations,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (blocked.length) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                await dispatch(getBlockedUsers()).unwrap();
            } catch (error) {
                toast.error('Failed to fetch blocked users');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [blocked.length, dispatch]);

    return (
        <div className='px-5 pb-5 flex flex-col gap-5'>
            <Setting showBack title='Blocking'>
                {loading &&
                    new Array(4)
                        .fill(null)
                        .map(() => <BlockedUserSkeleton key={v4()} />)}
                {!loading &&
                    blocked.map((person) => (
                        <BlockedUser key={person._id} user={person} />
                    ))}
            </Setting>
            {!loading && !blocked.length && (
                <p className='text-center'>You have no blocked users</p>
            )}
        </div>
    );
};

Blocking.propTypes = {};

export default Blocking;
