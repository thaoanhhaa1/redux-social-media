import { IBookmark } from '../interfaces';
import { classNames } from '../utils';
import Avatar from './Avatar';

const BookmarkItem = ({
    active,
    bookmark,
    onClick,
}: {
    active: boolean;
    bookmark: IBookmark;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex gap-5 p-5 cursor-pointer hover:bg-blue-white-4 dark:hover:bg-dark-black-3 rounded-2.5',
                active && 'bg-blue-white-4 dark:bg-dark-black-3',
            )}
        >
            <Avatar src={bookmark.avatar} size='lg' />
            <div className='flex justify-between items-center gap-2 flex-1 overflow-auto'>
                <div className='overflow-hidden flex flex-col gap-1.25'>
                    {bookmark.name && (
                        <div className='font-semibold text-sm leading-sm text-black dark:text-white'>
                            {bookmark.name}
                        </div>
                    )}
                    <span className='block text-ellipsis overflow-hidden font-medium text-xs leading-xs text-black-8 dark:text-white-2'>
                        @{bookmark.username}
                    </span>
                </div>
                <span className='whitespace-nowrap font-medium text-xs leading-xs text-black dark:text-white'>
                    {bookmark.numberOfTweets} Tweet
                </span>
            </div>
        </div>
    );
};

export default BookmarkItem;
