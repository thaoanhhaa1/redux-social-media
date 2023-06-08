import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import Story from './Story';
import NewStory from './NewStory';
import { useState } from 'react';
import Button from '../Button';
import { LeftIcon, RightIcon } from '../Icons';
import { classNames } from '../../utils';

const Stories = () => {
    const [story, setStory] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [storyIndex, setStoryIndex] = useState(0);
    console.log('🚀 ~ Stories ~ storyIndex:', storyIndex);

    const handleClickRightBtn = () =>
        setStoryIndex((storyIndex) => storyIndex + 4);

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between">
                <span className="text-base text-black leading-[19px]">
                    Stories
                </span>
                <Link className="text-sm text-blue leading-[17px]" to="/">
                    See All
                </Link>
            </div>
            <div
                className={
                    'relative mt-5 flex gap-[10px] overflow-x-auto snap-x hidden-scrollbar transition-all'
                }
                style={{
                    marginLeft: `-${storyIndex * 120}px`,
                }}
            >
                <NewStory />
                {story.map(() => (
                    <Story key={v4()} />
                ))}
                <Button
                    onClick={handleClickRightBtn}
                    className="absolute right-[2px] top-2/4 -translate-y-2/4"
                    icon={<RightIcon className="w-6 h-6 text-[#65676B]" />}
                />
                {storyIndex !== 0 && (
                    <Button
                        className="absolute left-[2px] top-2/4 -translate-y-2/4"
                        icon={<LeftIcon className="w-6 h-6 text-[#65676B]" />}
                    />
                )}
            </div>
        </div>
    );
};

export default Stories;
