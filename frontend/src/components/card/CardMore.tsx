import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useWindowSize } from 'usehooks-ts';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { setBlock } from '../../features/tweets';
import { addUser, removeUser } from '../../features/userRelations';
import { ICardMoreBtn } from '../../interfaces';
import { followService } from '../../services';
import {
    AddListIcon,
    BlockIcon,
    EmbedIcon,
    FollowIcon,
    NotInterestedIcon,
    RemoveListIcon,
    ReportIcon,
    UnFollowIcon,
} from '../Icons';
import Portal from '../Portal';
import Wrapper from '../wrapper';
import CardMoreBtn from './CardMoreBtn';

// TODO Report tweet
/**
 * Click report
 * ==> Open a modal
 */

const CardMore = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const {
        tweet: { user, _id, notInterested },
        toggleNotInterested,
        toggleUserFollow,
        toggleUserList,
        toggleReport,
    } = useCardContext();
    const owner = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const { height, width } = useWindowSize();

    const handleToggleFollow = useCallback(() => {
        toggleUserFollow();
        onClose();
    }, [onClose, toggleUserFollow]);

    const handleToggleList = useCallback(() => {
        toggleUserList();
        onClose();
    }, [onClose, toggleUserList]);

    const handleBlockUser = useCallback(async () => {
        try {
            dispatch(
                setBlock({
                    isBlock: true,
                    tweetId: _id,
                    tweetOwner: user._id,
                }),
            );
            dispatch(
                addUser({
                    type: 'blocked',
                    user,
                }),
            );
            await followService.blockUser(user._id);
        } catch (error) {
            dispatch(
                setBlock({
                    isBlock: false,
                    tweetId: _id,
                    tweetOwner: user._id,
                }),
            );
            dispatch(
                removeUser({
                    type: 'blocked',
                    user,
                }),
            );
            toast.error('Failed to block user');
        }
    }, [_id, dispatch, user]);

    const handleToggleReport = useCallback(() => {
        toggleReport();
        onClose();
    }, [onClose, toggleReport]);

    const actions = useMemo(() => {
        const temp: ICardMoreBtn[] = [
            {
                icon: NotInterestedIcon,
                title: `${
                    notInterested ? 'I' : 'Not i'
                }nterested in this tweet`,
                onClick: toggleNotInterested,
            },
            {
                icon: EmbedIcon,
                title: 'Embed Tweet',
            },
        ];

        if (user._id !== owner._id)
            temp.push(
                {
                    icon: FollowIcon,
                    title: `${user.follow ? 'Unfollow' : 'Follow'} @${
                        user.username
                    }`,
                    active: user.follow,
                    activeIcon: UnFollowIcon,
                    onClick: handleToggleFollow,
                },
                {
                    icon: BlockIcon,
                    title: `Block @${user.username}`,
                    onClick: handleBlockUser,
                },
                {
                    icon: ReportIcon,
                    title: `Report Tweet`,
                    onClick: handleToggleReport,
                },
                {
                    icon: AddListIcon,
                    active: user.isInList,
                    title: `${(user.isInList && 'Remove') || 'Add'} @${
                        user.username
                    } from Lists`,
                    activeIcon: RemoveListIcon,
                    onClick: handleToggleList,
                },
            );

        return temp;
    }, [
        handleBlockUser,
        handleToggleFollow,
        handleToggleList,
        handleToggleReport,
        notInterested,
        owner._id,
        toggleNotInterested,
        user._id,
        user.follow,
        user.isInList,
        user.username,
    ]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const moreRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!open) return;

        const handleScroll = () => {
            const cardElement = wrapperRef.current;

            if (!cardElement) return;

            const { x, y } = cardElement.getBoundingClientRect();

            if (!moreRef.current) return;

            const moreElement = moreRef.current;

            const { height: moreHeight } = moreElement.getBoundingClientRect();

            if (y + moreHeight < height) {
                moreElement.classList.remove('-translate-y-full');
                moreElement.style.top = `${y}px`;
            } else {
                moreElement.classList.add('-translate-y-full');
                moreElement.style.top = `${y - 16}px`;
            }

            moreElement.style.left = `${x}px`;
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [open, height, width]);

    return (
        <div
            ref={wrapperRef}
            className='absolute -right-1 top-full opacity-0 invisible'
        >
            <div className='opacity-0 invisible'>
                {actions.map((action) => (
                    <CardMoreBtn key={v4()} cardMore={action} />
                ))}
            </div>
            {open && (
                <Portal>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Wrapper
                            ref={moreRef}
                            gap='0'
                            className='card__more z-50 dark:!bg-dark-black-3 fixed px-[6px] py-3 shadow-container dark:shadow-none'
                        >
                            {actions.map((action) => (
                                <CardMoreBtn key={v4()} cardMore={action} />
                            ))}
                        </Wrapper>
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default CardMore;
