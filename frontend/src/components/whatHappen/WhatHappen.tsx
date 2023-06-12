import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Image from '../Image';
import Button from '../Button';
import { GalleryIcon } from '../Icons';
import WhatHappenButton from './WhatHappenButton';

const WhatHappen = () => {
    return (
        <Wrapper className="p-5">
            <div className="flex items-center gap-[14px]">
                <Image
                    alt=""
                    src="https://plus.unsplash.com/premium_photo-1674939149224-a4d29cca2b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    placeholder="What’s happening?"
                    className="flex-1 rounded-2.5 outline-none border border-[#969395] px-3 py-[12.5px] font-medium text-xs leading-xs placeholder:text-base-black"
                />
            </div>
            <div className="flex gap-3">
                <WhatHappenButton
                    backgroundColor="bg-emerald"
                    icon={<GalleryIcon />}
                    className="flex-1"
                >
                    Gallery
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor="bg-red"
                    icon={<GalleryIcon />}
                    className="flex-1"
                >
                    Tag friend
                </WhatHappenButton>
                <WhatHappenButton
                    backgroundColor="bg-yellow"
                    icon={<GalleryIcon />}
                    className="flex-1"
                >
                    Gallery
                </WhatHappenButton>
                <button className="-mx-2 px-2 h-full">:</button>
            </div>
        </Wrapper>
    );
};

export default WhatHappen;
