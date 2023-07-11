import { useCardContext } from '../../contexts/CardContext';
import { getTimeString } from '../../utils';
import { BottomIcon } from '../Icons';
import Image from '../Image';
import CardMore from './CardMore';

const CardProfile = () => {
    const { user, tweet } = useCardContext();

    return (
        <div className='flex gap-4'>
            <Image alt='' src={user.avatar} className='w-10 h-10' rounded />
            <div className='flex justify-between items-center flex-1'>
                <div>
                    <div className='font-semibold dark:text-white'>
                        {user.name || user.username}
                    </div>
                    <p className='mt-1.25 font-semibold text-sm leading-sm text-black-8 dark:text-white-9'>
                        @{user.username}
                    </p>
                </div>
                <div className='flex gap-1.25 text-black-8 dark:text-white font-medium text-xs leading-3.75'>
                    <span>
                        {getTimeString(new Date(tweet.createdAt || ''))}
                    </span>
                    <div className='relative group/more'>
                        <BottomIcon className='cursor-pointer w-4 h-4 fill-black dark:fill-white group-hover/more:fill-blue dark:group-hover/more:fill-blue-white-2 transition' />
                        <CardMore />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProfile;
