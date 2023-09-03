import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import {
    toggleList,
    toggleUserFollow,
    toggleUserList,
} from '../../features/followingTweets';
import { ICardMoreBtn } from '../../interfaces';
import { toggleFollow } from '../../services';
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
import Wrapper from '../wrapper';
import CardMoreBtn from './CardMoreBtn';

const CardMore = () => {
    const { user } = useCardContext();
    const owner = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const actions = useMemo(() => {
        const temp: ICardMoreBtn[] = [
            {
                icon: NotInterestedIcon,
                title: 'Not interested in this tweet',
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
                    onClick: async () => {
                        await toggleFollow(user._id, user.follow);
                        dispatch(toggleUserFollow(user._id));

                        toast.success(
                            `${user.follow ? 'Unfollow' : 'Follow'} @${
                                user.username
                            } successfully!`,
                        );
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
                    onClick: async () => {
                        await dispatch(
                            toggleList({
                                userId: user._id,
                                isAdd: !user.isInList,
                            }),
                        ).unwrap();
                        dispatch(toggleUserList(user._id));

                        toast.success(
                            `${user.follow ? 'Remove' : 'Add'} @${
                                user.username
                            } from lists successfully!`,
                        );
                    },
                },
            );

        return temp;
    }, [
        dispatch,
        owner._id,
        user._id,
        user.follow,
        user.isInList,
        user.username,
    ]);

    return (
        <Wrapper
            gap='0'
            className='card__more z-1 dark:!bg-dark-black-3 transition-all duration-300 invisible group-hover/more:visible opacity-0 group-hover/more:opacity-100 absolute -right-1 top-full px-[6px] py-3 shadow-container dark:shadow-none'
        >
            {actions.map((action) => (
                <CardMoreBtn key={v4()} cardMore={action} />
            ))}
        </Wrapper>
    );
};

export default CardMore;
