import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
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

const CardInformation = ({ isPopup }: { isPopup: boolean }) => {
    const user = useSelector((state: RootState) => state.user);
    const [isShowCardPopup, setShowCardPopup] = useState(false);
    const { tweet, action, toggleLikeTweet } = useCardContext();
    const dispatch = useAppDispatch();
    const isLike = tweet.likes?.includes(user._id);
    const numberLike = tweet.likes?.length || 0;

    const handleComment = () => {
        if (isPopup) return;

        dispatch(action.setTweetActiveId(tweet._id));
        setShowCardPopup(true);
    };

    return (
        <div
            className={classNames(
                'flex flex-col gap-2 xxs:gap-5',
                isPopup || 'ml-12 xxs:ml-[56px]',
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
            <div className='flex justify-between -m-1 p-1 border-y border-[#CED0D4] dark:border-dark-black-3'>
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
                    onClick={toggleLikeTweet}
                    icon={(isLike && <LikeActiveIcon />) || <LikeIcon />}
                />
            </div>

            {/* Card Popup */}
            {isPopup || (
                <CardPopup
                    isShow={isShowCardPopup}
                    setShow={setShowCardPopup}
                />
            )}
        </div>
    );
};

export default CardInformation;
