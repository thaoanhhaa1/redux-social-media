import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 } from 'uuid';
import { IChat } from '../../../interfaces';
import { getTimeString } from '../../../utils';
import { ImageIcon, SendIcon, VoiceIcon } from '../../Icons';
import Wrapper from '../../wrapper/Wrapper';
import Sidebar from '../sidebar/Sidebar';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import ChatItem from './ChatItem';

const Chat = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        const chats: IChat[] = [
            {
                date: new Date('2023-06-16 12:25:00'),
                viewedAt: new Date('2023-06-16 12:25:00'),
                message: 'Hello!',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:25:00'),
                viewedAt: new Date('2023-06-16 12:25:00'),
                message: 'Maple Sally',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:28:00'),
                viewedAt: new Date('2023-06-16 12:28:00'),
                message: 'HI',
                userId: '2',
            },
            {
                date: new Date('2023-06-16 12:28:00'),
                viewedAt: new Date('2023-06-16 12:28:00'),
                message: '😂😒',
                userId: '2',
            },
            {
                date: new Date('2023-06-16 12:29:00'),
                viewedAt: new Date('2023-06-16 12:29:00'),
                message: 'OKAY,thank you vary much for the speed',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:30:00'),
                viewedAt: new Date('2023-06-16 12:30:00'),
                message: 'catch',
                userId: '2',
            },
            {
                date: new Date('2023-06-16 12:25:00'),
                viewedAt: new Date('2023-06-16 12:25:00'),
                message: 'Hello!',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:25:00'),
                viewedAt: new Date('2023-06-16 12:25:00'),
                message: 'Maple Sally',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:28:00'),
                viewedAt: new Date('2023-06-16 12:28:00'),
                message: 'HI',
                userId: '2',
            },
            {
                date: new Date('2023-06-16 12:28:00'),
                viewedAt: new Date('2023-06-16 12:28:00'),
                message: '😂😒',
                userId: '2',
            },
            {
                date: new Date('2023-06-16 12:29:00'),
                viewedAt: new Date('2023-06-16 12:29:00'),
                message: 'OKAY,thank you vary much for the speed',
                userId: '1',
            },
            {
                date: new Date('2023-06-16 12:30:00'),
                viewedAt: new Date('2023-06-16 12:30:00'),
                message: 'catch',
                userId: '2',
            },
        ];

        setChats(chats);
    }, []);

    useLayoutEffect(() => {
        if (!chatBodyRef.current) return;
        const element: HTMLDivElement = chatBodyRef.current;

        element.scrollTop = element.scrollHeight - element.clientHeight;
    }, [chats]);

    return (
        <div
            style={{ height: `var(--scroll-height)` }}
            className='flex-1 flex gap-5 pb-5'
        >
            <Wrapper gap='0' className='flex-1 flex flex-col'>
                <ChatHeader />
                <div className='flex-1 overflow-y-hidden flex'>
                    <div
                        ref={chatBodyRef}
                        className='flex-1 h-inherit overflow-y-auto flex flex-col gap-5 min-h-full'
                    >
                        {chats.map((chat, index, chats) => (
                            <Fragment key={v4()}>
                                {(index === 0 ||
                                    chat.date.getMilliseconds() <
                                        chats[
                                            index - 1
                                        ].date.getMilliseconds() -
                                            108000) && (
                                    <div className='font-semibold text-center text-xs leading-xs text-black-8'>
                                        {getTimeString(chat.date)}
                                    </div>
                                )}
                                <ChatItem chat={chat} />
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className='border-t-2 border-white-2 dark:border-b-black-3'>
                    <div className='overflow-auto flex gap-3 px-6 py-[26px]'>
                        <TextareaAutosize
                            placeholder='Write a massage....'
                            className='max-h-[102px] flex-1 font-medium text-sm leading-sm text-black-8 dark:text-white bg-transparent outline-none resize-none self-center'
                        />
                        <div className='flex items-end gap-3'>
                            <ChatButton>
                                <ImageIcon />
                            </ChatButton>
                            <ChatButton>
                                <VoiceIcon />
                            </ChatButton>
                            <ChatButton isActive>
                                <SendIcon />
                            </ChatButton>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Sidebar />
        </div>
    );
};

export default Chat;
