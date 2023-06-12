import { useRef } from 'react';
import { v4 } from 'uuid';
import Contact from '../components/Contact';
import Image from '../components/Image';
import Members from '../components/Members';
import Scrollbar from '../components/Scrollbar';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';
import Wrapper from '../components/wrapper/Wrapper';
import WrapperHeader from '../components/wrapper/WrapperHeader';
import WhatHappen from '../components/WhatHappen';

const Home = () => {
    const parentScrollbarRef = useRef<HTMLDivElement>(null);

    return (
        <div className="pt-[calc(var(--top-bar-height)+20px)] flex gap-5 overscroll-y-auto bg-white-1 dark:bg-dark-black-1 pl-5 pb-5">
            <div className="flex flex-col gap-5 overflow-auto flex-1 pr-[calc(var(--sidebar-width)+20px)]">
                <WhatHappen />
                <Stories />
                {new Array(3).fill(null).map(() => (
                    <Card key={v4()} />
                ))}
            </div>
            <div
                ref={parentScrollbarRef}
                className="group fixed flex t-[calc(var(--top-bar-height)+20px)] right-0 flex-shrink-0 w-[var(--sidebar-width)] h-[calc(100vh-var(--top-bar-height)-20px)] hidden-scrollbar overflow-y-auto flex-col gap-5 pb-5"
            >
                <Wrapper className="p-5">
                    <WrapperHeader
                        title="sponsored"
                        titleLink="Create Ad"
                        to="/"
                    />
                    <Image
                        className="rounded-2.5 h-[120px]"
                        alt=""
                        src="https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                    <div className="font-semibold text-sm leading-sm">
                        <div className="text-black dark:text-white">
                            ali baba online shoping
                        </div>
                        <p className="mt-[5px] text-black-8 dark:text-white-9">
                            ali baba .com
                        </p>
                    </div>
                </Wrapper>
                <Wrapper className="p-5">
                    <WrapperHeader
                        title="Suggested groups"
                        titleLink="See more"
                        to="/"
                    />
                    <Image
                        className="rounded-2.5 h-[120px]"
                        alt=""
                        src="https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                    <div className="flex gap-1">
                        <div className="font-semibold">
                            <div className="text-black dark:text-white">
                                Anthony Douglas
                            </div>
                            <p className="mt-[2px] text-sm leading-sm text-black-8 dark:text-white-9">
                                65 friends | 1.5k members
                            </p>
                        </div>
                        <Members />
                    </div>
                </Wrapper>
                <Wrapper className="flex flex-col gap-5 p-5">
                    <WrapperHeader
                        title="Contacts"
                        titleLink="See more"
                        to="/"
                    />
                    {new Array(15).fill(null).map(() => (
                        <Contact isOnline={Math.random() > 0.5} key={v4()} />
                    ))}
                </Wrapper>
                <Scrollbar parentRef={parentScrollbarRef} />
            </div>
        </div>
    );
};

export default Home;
