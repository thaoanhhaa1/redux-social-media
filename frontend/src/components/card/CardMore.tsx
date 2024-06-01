import { useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'usehooks-ts';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import {
    toggleFollow,
    toggleInterested,
    toggleList,
} from '../../features/tweets';
import { ICardMoreBtn } from '../../interfaces';
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
 * ==> Send a request to the server ==> Undo report
 * ==> Open a modal
 */

// TODO Block user
/**
 * Bạn đã chặn trang cá nhân của Duc Dung ==> 15px 600
 * Các bạn sẽ không thể nhìn thấy hoặc liên hệ với nhau. ==> 12px 400
 * Separate the two sentences with a new line
 * Button: Quản lý Bảng feed ==> 15px 500
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
    } = useCardContext();
    const owner = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const { height, width } = useWindowSize();
    const actions = useMemo(() => {
        const temp: ICardMoreBtn[] = [
            {
                icon: NotInterestedIcon,
                title: `${
                    notInterested ? 'I' : 'Not i'
                }nterested in this tweet`,
                onClick: () => {
                    dispatch(
                        toggleInterested({
                            interested: notInterested,
                            tweetId: _id,
                        }),
                    );
                },
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
                    onClick: () => {
                        dispatch(
                            toggleFollow({
                                userId: user._id,
                                follow: !user.follow,
                            }),
                        );
                        onClose();
                    },
                },
                {
                    icon: BlockIcon,
                    title: `Block @${user.username}`,
                },
                {
                    icon: ReportIcon,
                    title: `Report Tweet`,
                },
                {
                    icon: AddListIcon,
                    active: user.isInList,
                    title: `${(user.isInList && 'Remove') || 'Add'} @${
                        user.username
                    } from Lists`,
                    activeIcon: RemoveListIcon,
                    onClick: () => {
                        dispatch(
                            toggleList({
                                isAdd: !user.isInList,
                                userId: user._id,
                            }),
                        );
                        onClose();
                    },
                },
            );

        return temp;
    }, [
        _id,
        dispatch,
        notInterested,
        onClose,
        owner._id,
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
