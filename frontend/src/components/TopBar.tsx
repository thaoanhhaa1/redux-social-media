import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { DropdownIcon } from './Icons';
import Image from './Image';
import Search from './search/Search';

const TopBar = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className='z-40 sticky top-0 right-0 left-[var(--sidebar-left-width)] h-[var(--top-bar-height)] px-2 xxs:px-5 flex gap-2 xxs:gap-5 items-center justify-between bg-white dark:bg-dark-black-2 shadow-container dark:shadow-none'>
            <Search />
            <div className='flex items-center gap-2.5'>
                <Image className='w-10 h-10' rounded src={user.avatar} alt='' />
                <div className='hidden xxs:flex flex-col gap-1.25'>
                    <span className='text-dark-black-1 dark:text-white font-semibold'>
                        {user.name || user.username}
                    </span>
                    <span className='font-semibold text-black-8 dark:text-white text-sm leading-sm'>
                        Profile
                    </span>
                </div>
                <DropdownIcon className='text-dark-black-1 dark:text-white' />
            </div>
        </div>
    );
};

export default TopBar;
