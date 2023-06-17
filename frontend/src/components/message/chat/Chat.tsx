import { IChat } from '../../../interfaces';
import { ImageIcon, SendIcon, VoiceIcon } from '../../Icons';
import Textarea from '../../Textarea';
import Wrapper from '../../wrapper/Wrapper';
import Sidebar from '../sidebar/Sidebar';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import { useState, useEffect } from 'react';
import ChatItem from './ChatItem';
import { v4 } from 'uuid';

const Chat = () => {
    const [chats, setChats] = useState<IChat[]>([]);

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
                message:
                    'Khi Vinh Râu làm đa level nhưng bản tánh lại hiền lành thật thà =))',
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
                message:
                    'Khi Vinh Râu làm đa level nhưng bản tánh lại hiền lành thật thà =))',
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

    return (
        <div
            style={{ height: `var(--scroll-height)` }}
            className="flex-1 flex gap-5 pb-5"
        >
            <Wrapper gap="0" className="flex-1 flex flex-col">
                <ChatHeader />
                <div className="flex-1 overflow-y-hidden flex">
                    <div className="flex-1 h-inherit overflow-y-auto flex flex-col gap-5 min-h-full">
                        {chats.map((chat, index, chats) => (
                            // ['Jun 9, 2023, 2:28 PM', 'Sun 9:10 PM', '08:00', 'May 10, 2023, 6:53 PM', '14:55, 25/05/2022']
                            <>
                                {(index === 0 ||
                                    chat.date.getMilliseconds() <
                                        chats[
                                            index - 1
                                        ].date.getMilliseconds() -
                                            108000) && (
                                    <div className="text-center">TIME</div>
                                )}
                                <ChatItem chat={chat} key={v4()} />
                            </>
                        ))}
                    </div>
                </div>
                <div className="border-t-2 border-white-2">
                    <div className="overflow-auto flex gap-3 px-6 py-[26px]">
                        <Textarea placeholder="Write a massage...." />
                        <div className="flex items-end gap-3">
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
