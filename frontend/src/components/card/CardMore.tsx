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
import Wrapper from '../wrapper/Wrapper';

const CardMore = () => {
    return (
        <Wrapper
            gap="0"
            className="dark:!bg-dark-black-3 transition-all duration-300 invisible group-hover/more:visible opacity-0 group-hover/more:opacity-100 absolute -right-1 top-full px-[6px] py-3 shadow-[shadow-container] dark:shadow-none"
        >
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<UnFollowIcon className="fill-black dark:fill-white-1" />}
            >
                unfollow language learning
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={
                    <NotInterestedIcon className="fill-black dark:fill-white-1" />
                }
            >
                Not intersted in this tweet
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<FollowIcon className="fill-black dark:fill-white-1" />}
            >
                Follow @westminster_eng
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<MuteIcon className="fill-black dark:fill-white-1" />}
            >
                Mute @Westminster_Eng
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<BlockIcon className="fill-black dark:fill-white-1" />}
            >
                Block @Westminster_Eng
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<EmbedIcon className="fill-black dark:fill-white-1" />}
            >
                Embed Tweet
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<ReportIcon className="fill-black dark:fill-white-1" />}
            >
                Report Tweet
            </Button>
            <Button
                align="left"
                gap="4"
                className="p-2 h-auto text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all"
                icon={<AddListIcon className="fill-black dark:fill-white-1" />}
            >
                Add/remove @Westminster_Eng from Lists
            </Button>
        </Wrapper>
    );
};

export default CardMore;
