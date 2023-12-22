import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { toggleLike } from '../../features/followingTweets';
import { classNames } from '../../utils';
import {
    LikeActiveIcon,
    LikeIcon,
    MessagesIcon,
    RetweetIcon,
    ShareIcon,
} from '../Icons';
import Image from '../Image';
import CardPopup from '../cardPopup/CardPopup';
import CardButton from './CardButton';

const CardInformation = () => {
    const user = useSelector((state: RootState) => state.user);
    const card = useCardContext();
    const [isShowCardPopup, setShowCardPopup] = useState(false);
    const tweet = useCardContext();
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

    const handleComment = () => {
        if (card.isPopup) return;
        setShowCardPopup(true);
    };

    return (
        <div
            className={classNames(
                'flex flex-col gap-2 xxs:gap-5',
                card.isPopup || 'ml-12 xxs:ml-[56px]',
            )}
        >
            {tweet.content && (
                <p className='font-medium text-sm leading-[21px] text-black dark:text-white break-words'>
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
            {tweet.gif && (
                <Image
                    className='rounded-2.5 aspect-video'
                    alt={tweet.gif.title}
                    src={tweet.gif.url}
                />
            )}

            {/* Action Btn */}
            <div className='flex justify-between'>
                <div className='flex gap-2 xxs:gap-5'>
                    <CardButton number={0} icon={<ShareIcon />} />
                    <CardButton number={0} icon={<RetweetIcon />} />
                    <CardButton
                        number={tweet.numberOfComments ?? 0}
                        onClick={handleComment}
                        icon={<MessagesIcon />}
                    />
                </div>
                <CardButton
                    number={numberLike}
                    active={isLike}
                    className='text-black-8 dark:text-white'
                    onClick={handleLike}
                    icon={(isLike && <LikeActiveIcon />) || <LikeIcon />}
                />
            </div>

            {/* Card Popup */}
            {card.isPopup || (
                <CardPopup
                    isShow={isShowCardPopup}
                    setShow={setShowCardPopup}
                />
            )}
        </div>
    );
};

export default CardInformation;
