import { memo, useState } from 'react';
import { IUser } from '../interfaces';
import Button from './Button';
import Image from './Image';
import axiosClient from '../api/axiosClient';
import api from '../api';
import { toast } from 'react-toastify';
import { classNames } from '../utils';

const Follow = ({ user }: { user: IUser }) => {
    const [isFollow, setFollow] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleClickBtn = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.post(
                api[isFollow ? 'unfollow' : 'follow'](),
                {
                    userId: user._id,
                },
            );
            console.log('🚀 ~ res ~ res:', res);
            setLoading(false);
            setFollow(!isFollow);
        } catch (error) {
            console.error('🚀 ~ handleClickBtn ~ error:', error);
            toast.error('Follow error');
        }
    };

    return (
        <div className="flex gap-5 cursor-pointer">
            <Image alt="" src={user.avatar} className="w-10 h-10" rounded />
            <div className="flex-1 flex justify-between items-center gap-2">
                <div className="flex-1">
                    <div className="font-semibold text-sm leading-sm text-black dark:text-white">
                        {user.name || user.username}
                    </div>
                    <div className="font-semibold text-xs leading-sm text-black-8 dark:text-white">
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
