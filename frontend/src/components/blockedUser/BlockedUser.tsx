import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { removeUser } from '../../features/userRelations';
import { IPerson } from '../../interfaces';
import { followService } from '../../services';
import Person from '../person';
import Wrapper from './Wrapper';

const BlockedUser = ({ user }: { user: IPerson }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleUnblock = async () => {
        setLoading(true);
        try {
            await followService.unblockUser(user._id);
            dispatch(removeUser({ user, type: 'blocked' }));
        } catch (error) {
            toast.error('Failed to unblock user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Person
                buttonTitle='Unblock'
                user={user}
                isLoading={loading}
                onClick={handleUnblock}
            />
        </Wrapper>
    );
};

export default BlockedUser;
