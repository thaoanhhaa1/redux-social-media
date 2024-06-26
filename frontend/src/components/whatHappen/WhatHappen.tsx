import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setShowUploadImage } from '../../features/myTweet';
import { addSub } from '../../features/popupMultiLevel';
import Avatar from '../Avatar';
import { ActivityIcon, GalleryIcon, TagFriendIcon } from '../Icons';
import CreateTweet from '../createTweet';
import { Feeling, More, TagPeople } from '../createTweet/subTweet';
import Wrapper from '../wrapper';
import WhatHappenButton from './WhatHappenButton';

const WhatHappen = () => {
    const user = useSelector((state: RootState) => state.user);
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();
    const [isShowModal, setShowModal] = useState(false);

    return (
        <Wrapper className='p-2 xxs:p-3 xs:p-4 gx:p-5'>
            <div className='flex items-center gap-2 xxs:gap-[14px]'>
                <Avatar src={user.avatar} size='lg' />
                <div
                    onClick={() => setShowModal(true)}
                    className='cursor-pointer dark:bg-dark-black-2 flex-1 rounded-2.5 border border-[#969395] px-3 py-[12.5px] font-medium text-xs leading-xs text-base-black dark:text-white'
                >
                    {myTweet.value || 'What’s happening?'}
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <WhatHappenButton
                    backgroundColor='bg-emerald-white-4 dark:bg-emerald-black-3'
                    backgroundColorIcon='bg-emerald'
                    icon={<GalleryIcon />}
                    className='hidden xs:flex flex-1'
                    onClick={() => {
                        setShowModal(true);
                        dispatch(setShowUploadImage(true));
                    }}
                >
                    Gallery
                </WhatHappenButton>
                <WhatHappenButton
                    onClick={() => {
                        setShowModal(true);
                        dispatch(addSub(TagPeople));
                    }}
                    backgroundColor='bg-red-white-3 dark:bg-red-black-3'
                    backgroundColorIcon='bg-red'
                    icon={<TagFriendIcon />}
                    className='hidden xxxs:flex flex-1'
                >
                    Tag friend
                </WhatHappenButton>
                <WhatHappenButton
                    onClick={() => {
                        setShowModal(true);
                        dispatch(addSub(Feeling));
                    }}
                    backgroundColor='bg-yellow-white-3 dark:bg-yellow-black-3'
                    backgroundColorIcon='bg-yellow'
                    icon={<ActivityIcon />}
                    className='flex-1'
                >
                    filing/activity
                </WhatHappenButton>
                <button
                    onClick={() => {
                        setShowModal(true);
                        dispatch(addSub(More));
                    }}
                    className='-mx-2 px-2 h-full text-base-black dark:text-white'
                >
                    :
                </button>
            </div>
            <CreateTweet
                isShowModal={isShowModal}
                setShowModal={setShowModal}
            />
        </Wrapper>
    );
};

export default WhatHappen;
