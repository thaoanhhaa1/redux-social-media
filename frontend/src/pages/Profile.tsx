import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Button from '../components/Button';
import EditProfile from '../components/EditProfile';
import Follow from '../components/Follow';
import { CalendarIcon, CameraIcon, EditProfileIcon } from '../components/Icons';
import Image from '../components/Image';
import ProfileItem from '../components/ProfileItem';
import StickyBottom from '../components/StickyBottom';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';
import WhatHappen from '../components/whatHappen/WhatHappen';
import Wrapper from '../components/wrapper/Wrapper';

const Profile = () => {
    const [isShowModel, setShowModel] = useState(false);

    const handleShowModel = useCallback(
        () => setShowModel((isShowModel) => !isShowModel),
        [],
    );

    useEffect(() => {
        document.body.style.height = isShowModel ? '100vh' : 'unset';
        document.body.style.overflow = isShowModel ? 'hidden' : 'unset';
    }, [isShowModel]);

    return (
        <div className="relative px-5">
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                className="aspect-[1163/253] h-auto rounded-2.5"
            />
            <Button
                onClick={handleShowModel}
                className="!px-5 absolute top-[35px] right-[36px] bg-white dark:bg-dark-black-3 text-black dark:text-white font-medium text-xs leading-xs"
                large
                icon={<EditProfileIcon />}
            >
                Edit profile
            </Button>
            <EditProfile
                isShowModel={isShowModel}
                handleShowModel={handleShowModel}
            />
            <Wrapper
                isRow
                className="relative -mt-[82px] mx-[30px] px-[30px] pb-[2px] shadow-[0px_5px_45px_#EBEBED] dark:shadow-none"
            >
                <div className="relative w-fit">
                    <Image
                        alt=""
                        src="https://images.unsplash.com/photo-1664527184222-420bb0fec61a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                        className="w-[200px] h-[200px]"
                        rounded
                    />
                    <Button
                        className="absolute right-3 bottom-[14px] bg-white"
                        icon={<CameraIcon />}
                        rounded
                    />
                </div>
                <div className="flex-1 flex justify-between items-center gap-5">
                    <div className="flex flex-col gap-[11px]">
                        <div className="font-medium text-4xl leading-4xl text-black-1 dark:text-white">
                            MD mahmudul
                        </div>
                        <div className="font-semibold text-xl leading-xl text-black-8 dark:text-white">
                            @mdmahmu27705362
                        </div>
                        <div className="flex">
                            <CalendarIcon className="dark:hidden ml-[6px]" />
                            <span className="font-semibold text-black-1 dark:text-white">
                                Joined August 2022
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <ProfileItem
                            color="--emerald-black-1-color"
                            title="Tweets"
                            number={847}
                        />
                        <ProfileItem
                            color="--red-black-1-color"
                            title="Tweets"
                            number={847}
                        />
                        <ProfileItem
                            color="--yellow-black-1-color"
                            title="Tweets"
                            number={847}
                        />
                    </div>
                </div>
            </Wrapper>
            <div className="flex gap-5 mt-5">
                <div className="flex-1 flex flex-col gap-5 overflow-auto">
                    <Stories />
                    <WhatHappen />
                    {new Array(3).fill(null).map(() => (
                        <Card key={v4()} />
                    ))}
                </div>
                <StickyBottom>
                    <Wrapper className="w-[337px] p-5 mb-5">
                        <div className="font-semibold text-xl leading-xl text-black dark:text-white">
                            Who to follow
                        </div>
                        {new Array(10).fill(null).map(() => (
                            <Follow key={v4()} />
                        ))}
                        <button className="w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue">
                            SHOW more
                        </button>
                    </Wrapper>
                </StickyBottom>
            </div>
        </div>
    );
};

export default Profile;
