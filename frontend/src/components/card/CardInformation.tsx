import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
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
    const isLike = useMemo(
        () => (tweet.likes || []).includes(user._id),
        [tweet.likes, user._id],
    );

    return (
        <div className='flex flex-col gap-5 ml-[56px]'>
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
                <div className='flex gap-5'>
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
                        icon={
                            (isLike && <LikeActiveIcon />) || (
                                <LikeIcon className='stroke-black dark:stroke-white' />
                            )
                        }
                    />
                    <span className='text-xs leading-3.75 text-black-8'>
                        {(tweet.likes && tweet.likes.length) || 0}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;
