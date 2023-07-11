import { CloseIcon } from '../Icons';
import Image from '../Image';

const NotificationAllItem = () => {
    return (
        <div className='group/close flex gap-5 p-5 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 shadow-container dark:shadow-none ease-linear duration-300'>
            <Image
                rounded
                alt=''
                src='https://plus.unsplash.com/premium_photo-1686090449625-16579c8ac225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                className='w-10 h-10'
            />
            <div className='flex-1 flex justify-between items-center'>
                <div>
                    <div className='font-semibold text-base-black dark:text-white'>
                        Recent Tweet from Mohammad Amir
                    </div>
                    <p className='mt-1 text-sm leading-sm text-stroke-icon dark:text-white'>
                        dashing 🙌
                    </p>
                </div>
                <button className='w-6 h-6 flex justify-center items-center'>
                    <CloseIcon className='transition-all duration-300 text-stroke-icon group-hover/close:text-red dark:text-white' />
                </button>
            </div>
        </div>
    );
};

export default NotificationAllItem;
