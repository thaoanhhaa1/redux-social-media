import { memo } from 'react';
import { IUser } from '../interfaces';
import Button from './Button';
import Image from './Image';

const Follow = ({ user }: { user: IUser }) => {
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
                <Button className="bg-black dark:bg-dark-black-1 text-white text-xs leading-xs w-[86px] h-8.5">
                    Follow
                </Button>
            </div>
        </div>
    );
};

export default memo(Follow);
