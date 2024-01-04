import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import api from '../api';
import axiosClient from '../api/axiosClient';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import config from '../config';
import routes from '../config/routes';
import { useOnClickOutside } from '../hooks';
import { DropdownIcon, LogOutIcon } from './Icons';
import Image from './Image';
import Search from './search/Search';

const TopBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const [showPopup, togglePopup, setShowPopup] = useToggle(false);
    const ref = useRef(null);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const handleLogOut = async () => {
        await axiosClient.post(api.signOut());

        dispatch({ type: 'LOGOUT' });

        navigation(config.routes.signIn);

        document.cookie = 'cookie';
    };

    useOnClickOutside(ref, () => setShowPopup(false));

    return (
        <div className='z-40 sticky top-0 right-0 left-[var(--sidebar-left-width)] h-[var(--top-bar-height)] px-2 xxs:px-5 flex gap-2 xxs:gap-5 items-center justify-between bg-white dark:bg-dark-black-2 shadow-container dark:shadow-none'>
            <Search />
            <div className='flex items-center gap-2.5'>
                <Image className='w-10 h-10' rounded src={user.avatar} alt='' />
                <div className='hidden xxs:flex flex-col gap-1.25'>
                    <span className='text-dark-black-1 dark:text-white font-semibold'>
                        {user.name || user.username}
                    </span>
                    <Link
                        to={routes.profile}
                        className='font-semibold text-black-8 dark:text-white text-sm leading-sm'
                    >
                        Profile
                    </Link>
                </div>
                <div
                    ref={ref}
                    onClick={togglePopup}
                    className='relative -mx-2.5 p-2.5 cursor-pointer self-stretch flex items-center'
                >
                    <DropdownIcon className='text-dark-black-1 dark:text-white' />

                    {/* Popup */}
                    {showPopup && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='cursor-default p-2 absolute right-0 top-full bg-white dark:bg-dark-black-2 rounded-lg overflow-hidden w-[360px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-60px)] shadow-popup'
                        >
                            <div
                                onClick={handleLogOut}
                                className='cursor-pointer flex items-center px-2 h-[52px] gap-3 hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10 transition-all rounded-lg'
                            >
                                <span className='flex justify-center items-center w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-white-opacity-10'>
                                    <LogOutIcon />
                                </span>
                                <span className='text-sm leading-sm font-medium'>
                                    Log Out
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
