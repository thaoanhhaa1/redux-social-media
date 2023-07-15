import { useCardContext } from '../../contexts/CardContext';
import Button from '../Button';
import {
    AddListIcon,
    BlockIcon,
    EmbedIcon,
    FollowIcon,
    MuteIcon,
    NotInterestedIcon,
    ReportIcon,
    UnFollowIcon,
} from '../Icons';
import Wrapper from '../wrapper';

const CardMore = () => {
    const { user } = useCardContext();

    return (
        <Wrapper
            gap='0'
            className='card__more z-1 dark:!bg-dark-black-3 transition-all duration-300 invisible group-hover/more:visible opacity-0 group-hover/more:opacity-100 absolute -right-1 top-full px-[6px] py-3 shadow-container dark:shadow-none'
        >
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<UnFollowIcon className='fill-black dark:fill-white-1' />}
            >
                unfollow language learning
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={
                    <NotInterestedIcon className='fill-black dark:fill-white-1' />
                }
            >
                Not intersted in this tweet
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<FollowIcon className='fill-black dark:fill-white-1' />}
            >
                Follow @{user.username}
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<MuteIcon className='fill-black dark:fill-white-1' />}
            >
                Mute @{user.username}
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<BlockIcon className='fill-black dark:fill-white-1' />}
            >
                Block @{user.username}
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<EmbedIcon className='fill-black dark:fill-white-1' />}
            >
                Embed Tweet
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<ReportIcon className='fill-black dark:fill-white-1' />}
            >
                Report Tweet
            </Button>
            <Button
                align='left'
                gap='4'
                className='p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'
                icon={<AddListIcon className='fill-black dark:fill-white-1' />}
            >
                Add/remove @{user.username} from Lists
            </Button>
        </Wrapper>
    );
};

export default CardMore;
