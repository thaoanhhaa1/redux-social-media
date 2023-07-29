import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import config from '../../config';
import { remove } from '../../features/search';
import { IUser } from '../../interfaces';
import { CloseIcon } from '../Icons';
import Image from '../Image';

const SearchItem = ({
    user,
    handleHiddenSearch,
}: {
    user: IUser;
    handleHiddenSearch: () => void;
}) => {
    const dispatch = useAppDispatch();

    const handleClose = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(remove(user._id));
    };

    return (
        <Link
            onClick={handleHiddenSearch}
            to={`${config.routes.lists}?user=${user.username}`}
            className='cursor-pointer group/close flex items-center gap-2 xxs:gap-5 p-2 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 ease-linear duration-300'
        >
            <Image
                rounded
                alt=''
                src={user.avatar}
                className='flex-shrink-0 w-9 h-9'
            />

            <div className='line-clamp-2 flex-1 text-base-black dark:text-white'>
                {user.name || user.username}
            </div>
            <button
                onClick={handleClose}
                className='flex-shrink-0 w-6 h-6 flex justify-center items-center'
            >
                <CloseIcon className='transition-all duration-300 text-stroke-icon group-hover/close:text-red dark:text-white' />
            </button>
        </Link>
    );
};

export default SearchItem;
