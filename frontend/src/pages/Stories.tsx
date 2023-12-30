import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactInstaStories from 'react-insta-stories';
import { useEffectOnce, useToggle, useWindowSize } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Button,
    Loading,
    MoreSolidIcon,
    MuteIcon,
    NextIcon,
    PauseIcon,
    PlayIcon,
    PrevIcon,
    PublicIcon,
} from '../components';
import Avatar from '../components/Avatar';
import { Action, UserStories } from '../components/storiesDetail';
import { getStories } from '../features/storiesDetail';
import { IPerson, IStoryDetail } from '../interfaces';
import { classNames, getTimeComment } from '../utils';

const NAV_WIDTH = 64;
const PADDING_LEFT = 20;
const CONTROL_BTN = 48;
const GAP = 16;
const TOP_BAR_HEIGHT = 75;
const PADDING_TOP = 12;

const Stories = () => {
    const { data, loading } = useAppSelector(
        (state: RootState) => state.storiesDetail,
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [pause, togglePause] = useToggle(false);
    const [indexUser, setIndexUser] = useState<number>(0);
    const [user, setUser] = useState<IPerson | undefined>(data[0]?.user);
    const [stories, setStories] = useState<Array<IStoryDetail>>([]);
    const dispatch = useAppDispatch();
    const { width, height } = useWindowSize();

    const props = useMemo(() => {
        if (width > 576) return {};

        const widthStory =
            width -
            NAV_WIDTH -
            (PADDING_LEFT + CONTROL_BTN + (width > 508 ? GAP : GAP / 2)) * 2;
        const heightStory =
            height - TOP_BAR_HEIGHT - (PADDING_LEFT + PADDING_TOP) * 2;

        const heightAspect = (widthStory * 16) / 9;
        const widthAspect = (heightStory * 16) / 9;

        if (heightStory > heightAspect)
            return { height: heightAspect, width: widthStory };

        return {
            height: heightStory,
            width: widthAspect,
        };
    }, [height, width]);

    const handleClickUser = useCallback(
        (index: number) => {
            const item = data[index];

            setIndexUser(index);
            setStories(item.stories);
            setUser(item.user);
            setCurrentIndex(0);
        },
        [data],
    );

    const handleAllStoriesEnd = () => {
        const indexNextUser = indexUser + 1;

        if (indexNextUser >= data.length) return;

        handleClickUser(indexNextUser);
    };

    const handleNext = () => {
        const storiesLength = stories.length;
        const usersLength = data.length;

        if (currentIndex < storiesLength - 1)
            setCurrentIndex((prev) => prev + 1);
        else if (indexUser < usersLength - 1) handleClickUser(indexUser + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
        else if (indexUser > 0) handleClickUser(indexUser - 1);
    };

    useEffectOnce(() => {
        const getData = async () => await dispatch(getStories());

        if (!data.length) getData();
    });

    useEffect(() => {
        if (!data[0]) return;

        handleClickUser(0);
    }, [data, handleClickUser]);

    if (loading || !user || !stories.length) return <Loading />;

    return (
        <div className='flex px-5 gap-[18px] h-[calc(100vh_-_var(--top-bar-height)_-_40px)]'>
            <div className='w-[360px] px-4 py-3 bg-white dark:bg-dark-black-2 rounded-2.5 hidden dl:block'>
                <h1 className='text-2xl font-bold'>Stories</h1>
                <h2 className='mt-5 mb-2 font-semibold'>All stories</h2>
                <div className='-mx-2'>
                    {data.map((item, index) => (
                        <UserStories
                            onClick={() => handleClickUser(index)}
                            user={item.user}
                            key={item.user._id}
                            date={item.stories.at(-1)?.createdAt || ''}
                        />
                    ))}
                </div>
            </div>
            <div className='flex gap-2 xxs:gap-4 dl:gap-10 justify-center items-center relative flex-1 bg-white dark:bg-dark-black-2 rounded-2.5 py-3'>
                <Button
                    className={classNames(
                        'bg-dark-black-3 dark:!bg-white w-8 xxs:w-12 text-white dark:text-black overflow-hidden',
                        (!indexUser && !currentIndex && 'h-0') ||
                            'h-8 xxs:h-12',
                    )}
                    rounded
                    large
                    onClick={handlePrev}
                >
                    <PrevIcon className='w-4 h-4 xxs:w-6 xxs:h-6' />
                </Button>

                <div className='relative aspect-[9/16] rounded-lg overflow-hidden'>
                    <ReactInstaStories
                        onStoryEnd={handleNext}
                        onAllStoriesEnd={handleAllStoriesEnd}
                        keyboardNavigation
                        stories={stories}
                        defaultInterval={10000}
                        isPaused={pause}
                        preventDefault
                        currentIndex={currentIndex}
                        progressWrapperStyles={{
                            height: '4px',
                            margin: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '8px',
                        }}
                        progressContainerStyles={{
                            padding: '12px',
                            paddingTop: '12px',
                            width: '100%',
                            gap: '4px',
                            overflow: 'hidden',
                            opacity: '1 !important',
                        }}
                        {...props}
                    />

                    <div className='absolute top-8 left-0 right-0 px-3 z-[999]'>
                        <div className='flex justify-between items-center text-white'>
                            <div className='flex gap-3 items-center h-0 sc-100:h-unset w-0 sc-100:w-full'>
                                <Avatar src={user.avatar} size='lg' />
                                <div className='items-center gap-1 hidden xxs:flex'>
                                    <span className='font-semibold line-clamp-1'>
                                        {user.name || user.username}
                                    </span>
                                    <span className='text-sm leading-sm'>
                                        {getTimeComment(
                                            stories[currentIndex].createdAt,
                                        )}
                                    </span>
                                    <PublicIcon />
                                </div>
                            </div>
                            <div className='flex'>
                                <Action onClick={togglePause}>
                                    {(pause && <PlayIcon />) || <PauseIcon />}
                                </Action>
                                <Action>
                                    <MuteIcon />
                                </Action>
                                <Action>
                                    <MoreSolidIcon />
                                </Action>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next, Prev Btn */}
                <Button
                    className={classNames(
                        'bg-dark-black-3 dark:!bg-white w-8 xxs:w-12 text-white dark:text-black overflow-hidden',
                        (indexUser === data.length - 1 &&
                            currentIndex === stories.length - 1 &&
                            'h-0') ||
                            'h-8 xxs:h-12',
                    )}
                    rounded
                    onClick={handleNext}
                >
                    <NextIcon className='w-4 h-4 xxs:w-6 xxs:h-6' />
                </Button>
            </div>
        </div>
    );
};

export default Stories;
