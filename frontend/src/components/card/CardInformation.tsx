import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { toggleLike } from '../../features/followingTweets';
import {
    LikeActiveIcon,
    LikeIcon,
    MessagesIcon,
    RetweetIcon,
    ShareIcon,
} from '../Icons';
import Image from '../Image';
import CardButton from './CardButton';

const cardIcons = [ShareIcon, RetweetIcon, MessagesIcon];

const CardInformation = () => {
    const user = useSelector((state: RootState) => state.user);
    const { tweet } = useCardContext();
    const dispatch = useAppDispatch();
    const [isLike, setLike] = useState(() =>
        (tweet.likes || []).includes(user._id),
    );
    const [numberLike, setNumberLike] = useState(tweet?.likes?.length || 0);

    const handleLike = () => {
        dispatch(
            toggleLike({
                isLike: !isLike,
                tweetId: tweet._id || '',
                userId: user._id,
            }),
        ).unwrap();
        setNumberLike(numberLike + (isLike ? -1 : 1));
        setLike(!isLike);
    };

    return (
        <div className='flex flex-col gap-2 xxs:gap-5 ml-12 xxs:ml-[56px]'>
            {tweet.content && (
                <p className='font-medium text-sm leading-[21px] text-black dark:text-white'>
                    {tweet.content}
                </p>
            )}
            {tweet.images && tweet.images.length > 0 && (
                <Image
                    className='rounded-2.5 aspect-video'
                    alt=''
                    src={tweet.images[0]}
                />
            )}
            <div className='flex justify-between'>
                <div className='flex gap-2 xxs:gap-5'>
                    {cardIcons.map((Icon) => (
                        <CardButton
                            key={v4()}
                            className='text-black dark:text-white'
                            icon={<Icon />}
                        />
                    ))}
                </div>
                <div className='flex items-center gap-[6px]'>
                    <CardButton
                        active={isLike}
                        onClick={handleLike}
                        icon={
                            (isLike && <LikeActiveIcon />) || (
                                <LikeIcon className='text-black-8 dark:text-white' />
                            )
                        }
                    />
                    <span className='text-xs leading-3.75 text-black-8'>
                        {numberLike}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;
