import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ActivityIcon, GalleryIcon, TagFriendIcon } from '../Icons';
import Image from '../Image';
import Wrapper from '../wrapper/Wrapper';
import WhatHappenButton from './WhatHappenButton';

const WhatHappen = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <Wrapper className="p-5">
            <div className="flex items-center gap-[14px]">
                <Image alt="" src={user.avatar} className="w-10 h-10" rounded />
                <input
                    type="text"
                    placeholder="What’s happening?"
                    className="dark:bg-dark-black-2 flex-1 rounded-2.5 outline-none border border-[#969395] px-3 py-[12.5px] font-medium text-xs leading-xs text-base-black dark:text-white placeholder:text-base-black dark:placeholder:text-white"
                />
            </div>
            <div className="flex items-center gap-3">
                <WhatHappenButton
                    backgroundColor="bg-emerald-white-4 dark:bg-emerald-black-3"
                    backgroundColorIcon="bg-emerald"
                    icon={<GalleryIcon />}
                    className="flex-1"
                >
                    Gallery
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor="bg-red-white-3 dark:bg-red-black-3"
                    backgroundColorIcon="bg-red"
                    icon={<TagFriendIcon />}
                    className="flex-1"
                >
                    Tag friend
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor="bg-yellow-white-3 dark:bg-yellow-black-3"
                    backgroundColorIcon="bg-yellow"
                    icon={<ActivityIcon />}
                    className="flex-1"
                >
                    Gallery
                </WhatHappenButton>
                <button className="-mx-2 px-2 h-full text-base-black dark:text-white">
                    :
                </button>
            </div>
        </Wrapper>
    );
};

export default WhatHappen;
