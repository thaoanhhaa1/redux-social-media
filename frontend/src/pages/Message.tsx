import { Empty } from '../components';

const Message = () => {
    return (
        <div className='flex flex-col gap-[18px] px-5 items-center'>
            <Empty>Coming soon...</Empty>
            <a
                className='mt-5 w-fit bg-blue-white-2 text-white font-semibold px-4 py-2 rounded-2.5'
                href='https://lola.iuh-mern.id.vn/'
                target='_blank'
                rel='noreferrer'
            >
                Go to My Lola Chat App
            </a>

            {/* <ScrollbarFixTop
                header={
                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='font-semibold text-black dark:text-white'>
                                Messages
                            </div>
                            <button className='text-black dark:text-white flex-shrink-0 drop-shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[26px] h-[26px] border border-black-7 dark:border-white rounded-2.5'>
                                +
                            </button>
                        </div>
                        <div className='flex justify-between items-center mt-2.5 px-5 py-3 rounded-2.5 bg-blue-white-4 dark:bg-dark-black-3 font-semibold text-sm leading-sm'>
                            <span className='text-blue-black-2 dark:text-blue'>
                                General
                            </span>
                            <span className='text-black dark:text-white'>
                                Total
                            </span>
                        </div>
                    </div>
                }
                className='w-[346px]'
                gap='2.5'
            >
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
                <MessageItem />
            </ScrollbarFixTop>
            <Chat /> */}
        </div>
    );
};

export default Message;
