import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import Button from '../Button';
import { LeftIcon, RightIcon } from '../Icons';
import Wrapper from '../wrapper/Wrapper';
import WrapperHeader from '../wrapper/WrapperHeader';
import NewStory from './NewStory';
import Story from './Story';

const Stories = () => {
    const container = useRef<HTMLDivElement>(null);
    const [story, setStory] = useState<string[]>([]);
    const [storyLength, setStoryLength] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [storyShowCount, setStoryShowCount] = useState(0);

    const handleClickBtn = (isRightBtn: boolean) =>
        setStoryIndex((storyIndex) => {
            let newIndex = storyIndex + (isRightBtn ? 1 : -1) * storyShowCount;

            if (newIndex + storyShowCount > storyLength)
                newIndex = storyLength - storyShowCount;
            else if (newIndex < 0) newIndex = 0;

            return newIndex;
        });

    useEffect(() => {
        const res: string[] = [
            'https://images.unsplash.com/photo-1554310603-d39d43033735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://plus.unsplash.com/premium_photo-1678990345290-735e9718af20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW5pbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5pbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFuaW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFuaW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1442528010304-834a5d4f3925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1615811296323-92323c54395a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXRpZnVsJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXRpZnVsJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1539920951450-2b2d59cff66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXRpZnVsJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXRpZnVsJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        ];

        setStory(res);
        setStoryLength(res.length + 1);
    }, []);

    useLayoutEffect(() => {
        const width = container.current?.clientWidth || 0;

        setStoryShowCount(Math.floor(width / 110));
    }, []);

    return (
        <Wrapper className="bg-white px-[18px] py-[16.5px]">
            <WrapperHeader title="Stories" titleLink="See All" to="/" />
            <div ref={container} className="relative">
                <div
                    className={
                        'flex gap-[10px] overflow-x-auto snap-x hidden-scrollbar transition-all'
                    }
                    style={{
                        marginLeft: `-${
                            storyLength - storyShowCount === storyIndex
                                ? (storyLength - 1) * 120 +
                                  110 -
                                  (container.current?.clientWidth || 0)
                                : storyIndex * 120
                        }px`,
                    }}
                >
                    <NewStory />
                    {story.map((url) => (
                        <Story url={url} key={v4()} />
                    ))}
                    {storyIndex !== storyLength - storyShowCount &&
                        storyLength > storyShowCount && (
                            <Button
                                large
                                rounded
                                onClick={() => handleClickBtn(true)}
                                className="absolute right-[2px] top-2/4 -translate-y-2/4 dark:bg-[#3e4042] shadow-icon-btn bg-white"
                                icon={
                                    <RightIcon className="w-6 h-6 text-[#65676B] dark:text-[#b3b0b8]" />
                                }
                            />
                        )}
                    {storyIndex !== 0 && (
                        <Button
                            large
                            rounded
                            onClick={() => handleClickBtn(false)}
                            style={{ left: `2px` }}
                            className="absolute top-2/4 -translate-y-2/4 dark:bg-[#3e4042] shadow-icon-btn bg-white"
                            icon={
                                <LeftIcon className="w-6 h-6 text-[#65676B] dark:text-[#b3b0b8]" />
                            }
                        />
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default Stories;
