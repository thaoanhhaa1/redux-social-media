import Button from '../components/Button';
import { FollowIcon, MessageIcon } from '../components/Icons';
import Image from '../components/Image';
import List from '../components/List';
import Card from '../components/card/Card';
import ScrollbarFixTop from '../components/scrollbar/ScrollbarFixTop';

const Lists = () => {
    return (
        <div className="flex gap-5 px-5">
            <ScrollbarFixTop
                marginBottom="20px"
                className="w-[336px] shadow-box dark:shadow-none"
                header={
                    <div className="font-semibold text-sm leading-sm text-black-5 dark:text-white text-center">
                        Lists
                    </div>
                }
            >
                <div className="px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white">
                    <span>Pinned</span>
                    <span>Edit</span>
                </div>
                <List isPinned={true} />
                <List isPinned={true} />
                <List isPinned={true} />
                <div className="px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white">
                    <span>All</span>
                </div>
                <List />
                <List />
                <List />
                <List />
                <List />
            </ScrollbarFixTop>
            <div className="flex-1 mb-2 rounded-2.5 shadow-box dark:shadow-none overflow-hidden dark:bg-dark-black-3">
                <Image
                    alt=""
                    src="https://plus.unsplash.com/premium_photo-1686604504223-47a6aef5c3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80"
                    className="h-auto aspect-[809/207]"
                />
                <div className="mx-5 flex gap-5 bg-white dark:bg-dark-black-2 shadow-[0px_5px_45px_#EBEBED] dark:shadow-none">
                    <Image
                        alt=""
                        src="https://images.unsplash.com/photo-1686757662326-cb1516c1240b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                        className="-mt-17.5 mb-[43.5px] w-[200px] aspect-square"
                        rounded
                    />
                    <div className="mt-[18.5px] flex-1 flex flex-col gap-1.25">
                        <div className="font-semibold text-3xl text-black dark:text-white">
                            Sunday Suppers
                        </div>
                        <div className="font-semibold text-xl leading-xl text-black dark:text-white">
                            Delicious dinner ideas
                        </div>
                        <div>
                            <span className="font-semibold text-black dark:text-white">
                                md mahmudul
                            </span>{' '}
                            <span className="font-medium text-sm leading-sm text-black-8 dark:text-white">
                                @mahmudul
                            </span>
                        </div>
                        <div className="font-semibold text-sm leading-sm text-black dark:text-white">
                            <span>106 Members</span>
                            <span className="ml-[14px]">304 Subscribers</span>
                        </div>
                    </div>
                    <div className="mr-5 self-center flex flex-col gap-2">
                        <Button
                            className="bg-blue text-white"
                            icon={
                                <FollowIcon className="w-5.5 h-5.5 fill-current" />
                            }
                        >
                            Follow
                        </Button>
                        <Button
                            className="bg-white-7 text-black"
                            icon={
                                <MessageIcon className="w-5.5 h-5.5 fill-current" />
                            }
                        >
                            Message
                        </Button>
                    </div>
                </div>
                <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-5">
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default Lists;
