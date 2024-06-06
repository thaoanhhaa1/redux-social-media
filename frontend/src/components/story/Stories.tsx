import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'usehooks-ts';
import { RootState } from '../../app/store';
import Button from '../Button';
import CreateStory from '../CreateStory';
import { LeftIcon, RightIcon } from '../Icons';
import RenderList from '../RenderList';
import Wrapper from '../wrapper/Wrapper';
import WrapperHeader from '../wrapper/WrapperHeader';
import NewStory from './NewStory';
import Story from './Story';
import StorySkeleton from './StorySkeleton';

const Stories = ({
    all = true,
    loading,
}: {
    all?: boolean;
    loading: boolean;
}) => {
    const container = useRef<HTMLDivElement>(null);
    const [storyLength, setStoryLength] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [storyShowCount, setStoryShowCount] = useState(0);
    const [isShowModal, setShowModal] = useState(false);
    const stories = useSelector((state: RootState) => state.stories);
    const user = useSelector((state: RootState) => state.user);
    const { width } = useWindowSize();
    const filteredStories = useMemo(
        () => stories.stories.filter((story) => all || story.user === user._id),
        [all, stories.stories, user._id],
    );
    const marginLeft = useMemo(
        () =>
            storyLength && storyLength < storyIndex + storyShowCount
                ? (storyLength + 1) * 120 -
                  10 -
                  (container.current?.clientWidth || 0)
                : storyIndex * 120,
        [storyIndex, storyLength, storyShowCount],
    );

    const handleClickBtn = (isRightBtn: boolean) =>
        setStoryIndex((storyIndex) => {
            let newIndex = storyIndex + (isRightBtn ? 1 : -1) * storyShowCount;

            if (newIndex + storyShowCount > storyLength)
                newIndex = storyLength - storyShowCount + 1;
            else if (newIndex < 0) newIndex = 0;

            return newIndex;
        });

    useEffect(() => {
        setStoryLength(stories.stories.length);
    }, [stories.stories.length]);

    useLayoutEffect(() => {
        const width = container.current?.clientWidth || 0;

        setStoryShowCount(Math.floor((width + 10) / 120));
        setStoryIndex(0);
    }, [width]);

    return (
        <Wrapper className='bg-white px-2 xxs:px-[18px] py-2 xxs:py-[16.5px] overflow-hidden'>
            <WrapperHeader title='Stories' titleLink='See All' to='/stories' />
            <div ref={container} className='relative'>
                <div
                    className='flex gap-2.5 overflow-x-auto snap-x hidden-scrollbar transition-all'
                    style={{
                        marginLeft: `-${marginLeft}px`,
                    }}
                >
                    <NewStory onClick={() => setShowModal(true)} />
                    {(loading && <RenderList Control={StorySkeleton} />) ||
                        filteredStories.map((story) => (
                            <Story url={story.story} key={story._id} />
                        ))}
                    {storyIndex !== storyLength - storyShowCount + 1 &&
                        storyLength + 1 > storyShowCount && (
                            <Button
                                large
                                rounded
                                onClick={() => handleClickBtn(true)}
                                className='absolute right-[2px] top-2/4 -translate-y-2/4 dark:bg-[#3e4042] shadow-icon-btn bg-white'
                                icon={
                                    <RightIcon className='w-6 h-6 text-[#65676B] dark:text-[#b3b0b8]' />
                                }
                            />
                        )}
                    {storyIndex !== 0 && (
                        <Button
                            large
                            rounded
                            onClick={() => handleClickBtn(false)}
                            style={{ left: `2px` }}
                            className='absolute top-2/4 -translate-y-2/4 dark:bg-[#3e4042] shadow-icon-btn bg-white'
                            icon={
                                <LeftIcon className='w-6 h-6 text-[#65676B] dark:text-[#b3b0b8]' />
                            }
                        />
                    )}
                </div>
            </div>
            <CreateStory
                isShowModal={isShowModal}
                setShowModal={setShowModal}
            />
        </Wrapper>
    );
};

export default Stories;
