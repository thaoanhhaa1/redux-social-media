import { useCardContext } from '../../contexts/CardContext';
import { getTimeTweet } from '../../utils';
import { BottomIcon } from '../Icons';
import Image from '../Image';
import TagPeople from '../TagPeople';
import CardMore from './CardMore';

const CardProfile = () => {
    const { user, tweet } = useCardContext();

    return (
        <div className='flex gap-2 xxs:gap-4 overflow-y-visible'>
            <Image alt='' src={user.avatar} className='w-10 h-10' rounded />
            <div className='flex justify-between items-center flex-1 gap-2'>
                <div>
                    <div className='break-words dark:text-white'>
                        <span className='whitespace-nowrap font-semibold'>
                            {user.name || user.username}
                        </span>
                        {[
                            tweet.feeling,
                            tweet.location,
                            tweet.tagPeople?.length,
                        ].some(Boolean) && ' is'}
                        {tweet.feeling && (
                            <>
                                &nbsp;
                                <Image
                                    alt=''
                                    src={tweet.feeling.image}
                                    className='inline-block w-4 h-4'
                                />
                                &nbsp;
                                {tweet.feeling.title}
                            </>
                        )}
                        {tweet.tagPeople && tweet.tagPeople.length > 0 && (
                            <TagPeople tagPeople={tweet.tagPeople} />
                        )}
                        {tweet.location && (
                            <>
                                &nbsp;in&nbsp;
                                <span className='font-semibold cursor-pointer hover:underline'>
                                    {tweet.location.title}
                                </span>
                            </>
                        )}
                    </div>
                    <p className='mt-1.25 font-semibold text-sm leading-sm text-black-8 dark:text-white-9'>
                        @{user.username}
                    </p>
                </div>
                <div className='hidden xxs:flex gap-1.25 text-black-8 dark:text-white font-medium text-xs leading-3.75'>
                    <span className='whitespace-nowrap'>
                        {getTimeTweet(tweet.createdAt)}
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
