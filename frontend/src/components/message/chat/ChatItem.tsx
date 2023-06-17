import { useState } from 'react';
import { IChat } from '../../../interfaces';
import { classNames, numberShow } from '../../../utils';

const ChatItem = ({ chat }: { chat: IChat }) => {
    const [date] = useState(() => chat.viewedAt || chat.date);

    return (
        <div
            className={classNames(
                'flex',
                chat.userId === '1' ? 'justify-end' : 'justify-start',
            )}
        >
            <div className="grid justify-items-end grid-cols-1 px-5 gap-[5px] w-fit max-w-[444px]">
                <div
                    className={classNames(
                        'px-[11.5px] py-[8.5px] w-fit min-w-[55px] bg-blue-white-4 text-black font-medium text-sm leading-sm rounded-2.5',
                        chat.userId === '1'
                            ? 'rounded-br-none'
                            : 'rounded-bl-none',
                    )}
                >
                    {chat.message}
                </div>
                <div className="flex justify-between gap-1 text-xs leading-xs text-black-8">
                    <span>
                        {chat.viewedAt && chat.userId === '1' && 'viewed at'}
                    </span>
                    <span>
                        {numberShow(date.getHours())}:
                        {numberShow(date.getMinutes())}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;
