import { memo, useState } from 'react';
import { toast } from 'react-toastify';
import { IUser } from '../../interfaces';
import { toggleFollow } from '../../services';
import { classNames } from '../../utils';
import Avatar from '../Avatar';
import Button from '../Button';

const Follow = ({ user }: { user: IUser }) => {
    const [isFollow, setFollow] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleClickBtn = async () => {
        try {
            setLoading(true);
            await toggleFollow(user._id, isFollow);

            setFollow(!isFollow);
        } catch (error) {
            toast.error('Follow error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-5 cursor-pointer'>
            <Avatar src={user.avatar} size='lg' />
            <div className='flex-1 flex justify-between items-center gap-2'>
                <div className='flex-1'>
                    <div className='font-semibold text-sm leading-sm text-black dark:text-white'>
                        {user.name || user.username}
                    </div>
                    <div className='font-semibold text-xs leading-sm text-black-8 dark:text-white'>
                        @{user.username}
                    </div>
                </div>
                <Button
                    isLoading={isLoading}
                    onClick={handleClickBtn}
                    className={classNames(
                        'text-white text-xs leading-xs w-[86px] h-8.5',
                        isFollow ? 'bg-blue' : 'bg-black dark:bg-dark-black-1',
                    )}
                >
                    {(isFollow && 'Unfollow') || 'Follow'}
                </Button>
            </div>
        </div>
    );
};

export default memo(Follow);
