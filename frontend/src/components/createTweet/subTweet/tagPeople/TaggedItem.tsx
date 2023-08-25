import { useDispatch } from 'react-redux';
import { removeTagPeople } from '../../../../features/myTweet';
import { IPerson } from '../../../../interfaces';
import { XMarkIcon } from '../../../Icons';

const TaggedItem = ({ user }: { user: IPerson }) => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(removeTagPeople(user._id));

    return (
        <div className='flex items-center py-[2px] pl-2.5 pr-[2px] font-semibold text-sm leading-sm text-blue bg-[#E7F3FF] dark:bg-[rgba(45,_136,_255,_0.2)] rounded-md'>
            <span>{user.name || user.username}</span>
            <span
                onClick={handleClick}
                className='flex items-center justify-center w-7 h-7 rounded-full hover:bg-black-opacity-05 transition-all cursor-pointer'
            >
                <XMarkIcon />
            </span>
        </div>
    );
};

export default TaggedItem;
