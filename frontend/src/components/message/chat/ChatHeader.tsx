import { CallIcon, VideoIcon } from '../../Icons';
import Image from '../../Image';
import ChatButton from './ChatButton';

const ChatHeader = () => {
    return (
        <div className="border-b-2 border-white-2">
            <div className="flex gap-[14px] p-5">
                <Image
                    alt=""
                    src="https://plus.unsplash.com/premium_photo-1686514714138-51925a219605?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    className="w-10 h-10"
                    rounded
                />
                <div className="flex-1 flex justify-between items-center">
                    <div className="font-semibold">
                        <div className="text-sm leading-sm text-[#000]">
                            maike.B
                        </div>
                        <p className="mt-[2px] text-xs leading-xs text-black-8">
                            online
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <ChatButton>
                            <VideoIcon />
                        </ChatButton>
                        <ChatButton>
                            <CallIcon />
                        </ChatButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
