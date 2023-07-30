import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ActivityIcon, GalleryIcon, TagFriendIcon } from '../Icons';
import Image from '../Image';
import Wrapper from '../wrapper/Wrapper';
import WhatHappenButton from './WhatHappenButton';
import CreateTweet from '../createTweet/CreateTweet';
import { useState } from 'react';

const WhatHappen = () => {
    const user = useSelector((state: RootState) => state.user);
    const [isShowModal, setShowModal] = useState(false);

    return (
        <Wrapper className='p-2 xxs:p-5'>
            <div className='flex items-center gap-2 xxs:gap-[14px]'>
                <Image alt='' src={user.avatar} className='w-10 h-10' rounded />
                <div
                    onClick={() => setShowModal(true)}
                    className='cursor-pointer dark:bg-dark-black-2 flex-1 rounded-2.5 border border-[#969395] px-3 py-[12.5px] font-medium text-xs leading-xs text-base-black dark:text-white'
                >
                    What’s happening?
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <WhatHappenButton
                    backgroundColor='bg-emerald-white-4 dark:bg-emerald-black-3'
                    backgroundColorIcon='bg-emerald'
                    icon={<GalleryIcon />}
                    className='hidden xs:flex flex-1'
                >
                    Gallery
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor='bg-red-white-3 dark:bg-red-black-3'
                    backgroundColorIcon='bg-red'
                    icon={<TagFriendIcon />}
                    className='hidden xxxs:flex flex-1'
                >
                    Tag friend
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor='bg-yellow-white-3 dark:bg-yellow-black-3'
                    backgroundColorIcon='bg-yellow'
                    icon={<ActivityIcon />}
                    className='flex-1'
                >
                    filing/activity
                </WhatHappenButton>
                <button className='-mx-2 px-2 h-full text-base-black dark:text-white'>
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
