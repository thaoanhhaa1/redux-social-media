import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../app/store';
import Contact from '../components/Contact';
import Image from '../components/Image';
import Members from '../components/Members';
import Page from '../components/Page';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';
import WhatHappen from '../components/whatHappen/WhatHappen';
import Wrapper from '../components/wrapper/Wrapper';
import WrapperHeader from '../components/wrapper/WrapperHeader';

const Home = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <Page
            scrollWidth="var(--home-sidebar-width)"
            scrollHeight="var(--scroll-height)"
            scrollChildren={
                <>
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
                            <p className="mt-1.25 text-black-8 dark:text-white-9">
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
                    <Wrapper gap="0" className="p-5">
                        <WrapperHeader
                            title="Contacts"
                            titleLink="See more"
                            to="/"
                            className="mb-3"
                        />
                        {new Array(15).fill(null).map(() => (
                            <Contact
                                className="-mx-2"
                                isOnline={Math.random() > 0.5}
                                key={v4()}
                            />
                        ))}
                    </Wrapper>
                </>
            }
        >
            <Stories />
            <WhatHappen />
            {new Array(3).fill(null).map(() => (
                <Card key={v4()} />
            ))}
        </Page>
    );
};

export default Home;
