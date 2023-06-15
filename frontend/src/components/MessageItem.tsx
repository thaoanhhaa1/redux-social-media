import Image from './Image';

const MessageItem = () => {
    return (
        <div className="[&:not(:last-child)]:pb-2.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:mb-2.5 border-white-3">
            <div className="cursor-pointer rounded-2.5 p-5 flex gap-5 hover:bg-blue-white-5 ease-linear duration-300">
                <div className="w-10 h-10 relative">
                    <Image
                        alt=""
                        src="https://images.unsplash.com/photo-1686615961795-707678f243f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        className="w-10 h-10 rounded-2.5"
                    />
                    <div className="absolute right-[2px] bottom-[1px]  w-2 h-2 border border-white bg-blue-black-1 rounded-full" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <div>
                        <div className="font-semibold text-black-1">
                            karti.w
                        </div>
                        <p className="mt-[5px] font-semibold text-sm leading-sm text-black-8">
                            See you tomorrow
                        </p>
                    </div>
                    <span className="w-5 h-5 bg-blue-white-4 rounded-full font-medium text-xs leading-5 text-center text-blue-black-2">
                        3
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
