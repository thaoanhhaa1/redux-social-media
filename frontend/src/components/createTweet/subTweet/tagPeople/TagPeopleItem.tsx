import { useAppDispatch } from '../../../../app/hooks';
import { addTagPeople } from '../../../../features/myTweet';
import { IUserTweet } from '../../../../interfaces';
import Image from '../../../Image';

const TagPeopleItem = ({ user }: { user: IUserTweet }) => {
    const dispatch = useAppDispatch();
    const handleClick = () => dispatch(addTagPeople(user));

    return (
        <div
            onClick={handleClick}
            className='p-2 flex items-center gap-3 hover:bg-black-opacity-05 transition-all rounded-lg cursor-pointer'
        >
            <Image rounded className='w-10 h-10' src={user.avatar} alt='' />
            <span className='font-semibold text-sm leading-sm'>
                {user.name || user.username}
            </span>
        </div>
    );
};

export default TagPeopleItem;
