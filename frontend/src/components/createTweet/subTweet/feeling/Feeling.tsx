import { memo, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { images } from '../../../../assets';
import { IActivity, IFeeling, ISubTweet } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import { SearchIcon } from '../../../Icons';
import Header from '../../Header';
import ActivityItem from './ActivityItem';
import FeelingItem from './FeelingItem';
import Tab from './Tab';

type TabType = 'Feelings' | 'Activities';

const tabs: {
    title: TabType;
}[] = [
    {
        title: 'Feelings',
    },
    {
        title: 'Activities',
    },
];

const feelings: IFeeling[] = [
    {
        image: images.happy,
        title: 'happy',
    },
    {
        image: images.blessed,
        title: 'blessed',
    },
    {
        image: images.loved,
        title: 'loved',
    },
    {
        image: images.sad,
        title: 'sad',
    },
];

const activities: Array<IActivity> = [
    {
        title: 'Celebrating',
        image: images.celebrating,
    },
    {
        title: 'Watching',
        image: images.watching,
    },
    {
        title: 'Eating',
        image: images.eating,
    },
    {
        title: 'Drinking',
        image: images.drinking,
    },
];

const Feeling = ({
    handleHiddenSub,
    handleHeightModal = () => {},
}: ISubTweet) => {
    const [tabActive, setTabActive] = useState<TabType>('Feelings');

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, tabActive]);

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                How are you feeling?
            </Header>
            <div>
                {/* Tabs */}
                <div className='flex'>
                    {tabs.map((tab) => (
                        <Tab
                            setTabActive={setTabActive}
                            active={tabActive === tab.title}
                            key={v4()}
                        >
                            {tab.title}
                        </Tab>
                    ))}
                </div>

                {/* Search */}
                <div className='px-4 py-2 -y-2'>
                    <div className='flex items-center pl-2.5 bg-[#F0F2F5] rounded-full overflow-hidden'>
                        <SearchIcon className='text-[#65676b]' />
                        <input
                            placeholder='Search'
                            type='text'
                            className='flex-1 px-[6px] py-2 bg-[#F0F2F5] border-none outline-none text-[#050505] placeholder:text-[#65676b]'
                        />
                    </div>
                </div>

                {/* Tab */}
                <div
                    className={classNames(
                        'p-2 grid',
                        tabActive === 'Feelings'
                            ? 'grid-cols-2'
                            : 'grid-cols-1',
                    )}
                >
                    {(tabActive === 'Feelings' &&
                        feelings.map((feeling) => (
                            <FeelingItem key={v4()} feeling={feeling} />
                        ))) ||
                        activities.map((activity) => (
                            <ActivityItem activity={activity} key={v4()} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default memo(Feeling);
