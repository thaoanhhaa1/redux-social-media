import { memo } from 'react';
import { IPerson } from '../../interfaces';
import { getTimeComment } from '../../utils';
import Avatar from '../Avatar';

type Props = {
    user: IPerson;
    date: string;
    onClick: () => void;
};

const UserStories = ({ user, date, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className='cursor-pointer flex gap-3 items-center p-2 rounded-[6px] hover:bg-black-opacity-05 transition-all'
        >
            <Avatar src={user.avatar} size='lg' />
            <div className='text-sm leading-sm'>
                <h3 className='font-semibold'>{user.name || user.username}</h3>
                <span className='text-[#65676B]'>{getTimeComment(date)}</span>
            </div>
        </div>
    );
};

export default memo(UserStories);
