import { useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import Wrapper from '../wrapper';
import CardMoreBtn from './CardMoreBtn';

const CardMore = () => {
    const {
        tweet: { user, _id, notInterested },
    } = useCardContext();
    const owner = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
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
                    },
                },
            );

        return temp;
    }, [
        _id,
        dispatch,
        notInterested,
        owner._id,
        user._id,
        user.follow,
        user.isInList,
        user.username,
    ]);
    // const { isPopup } = useCardContext();
    // const [show, setShow] = useState<boolean>(!isPopup);

    // useEffectOnce(() => setShow(true));

    // if (!show) return null;

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
