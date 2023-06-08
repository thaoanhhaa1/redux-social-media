import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import Button from '../Button';
import { LeftIcon, RightIcon } from '../Icons';
import NewStory from './NewStory';
import Story from './Story';
import Wrapper from '../Wrapper';

const Stories = () => {
    const container = useRef<HTMLDivElement>(null);
    const [story, setStory] = useState<number[]>([]);
    const [storyLength, setStoryLength] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [storyShowCount, setStoryShowCount] = useState(0);

    const handleClickBtn = (isRightBtn: boolean) =>
        setStoryIndex((storyIndex) => {
            let newIndex =
                storyIndex +
                (isRightBtn
                    ? storyShowCount + (storyIndex === 0 ? -1 : 0)
                    : -1 * storyShowCount);

            if (newIndex > storyLength) newIndex = storyLength - storyShowCount;
            else if (newIndex < 0) newIndex = 0;

            return newIndex;
        });

    useEffect(() => {
        const res = [1, 2, 3, 4, 5, 6, 7, 8];

        setStory(res);
        setStoryLength(res.length);
    }, []);

    useLayoutEffect(() => {
        const width = container.current?.clientWidth || 0;

        setStoryShowCount(Math.floor(width / 110));
    }, []);

    return (
        <Wrapper className="bg-white font-semibold px-[18px] py-[16.5px]">
            <div className="flex items-center justify-between">
                <span className="text-base text-black leading-[19px]">
                    Stories
                </span>
                <Link className="text-sm text-blue leading-[17px]" to="/">
                    See All
                </Link>
            </div>
            <div
                ref={container}
                className={
                    'relative mt-5 flex gap-[10px] overflow-x-auto snap-x hidden-scrollbar transition-all'
                }
                style={{
                    marginLeft: `-${
                        storyLength - storyShowCount + 1 === storyIndex
                            ? storyLength * 120 +
                              110 -
                              (container.current?.clientWidth || 0)
                            : storyIndex * 120
                    }px`,
                }}
            >
                <NewStory />
                {story.map(() => (
                    <Story key={v4()} />
                ))}
                {storyIndex !== storyLength - storyShowCount + 1 &&
                    storyLength + 1 > storyShowCount && (
                        <Button
                            onClick={() => handleClickBtn(true)}
                            className="absolute right-[2px] top-2/4 -translate-y-2/4"
                            icon={
                                <RightIcon className="w-6 h-6 text-[#65676B]" />
                            }
                        />
                    )}
                {storyIndex !== 0 && (
                    <Button
                        onClick={() => handleClickBtn(false)}
                        style={{ left: `${storyIndex * 120 + 2}px` }}
                        className="absolute top-2/4 -translate-y-2/4"
                        icon={<LeftIcon className="w-6 h-6 text-[#65676B]" />}
                    />
                )}
            </div>
        </Wrapper>
    );
};

export default Stories;
