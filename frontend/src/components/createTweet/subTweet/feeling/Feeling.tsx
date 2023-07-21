import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../../../app/store';
import { images } from '../../../../assets';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { IFeeling, ISubTweet } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import { SearchIcon } from '../../../Icons';
import Header from '../../Header';
import Activities from './Activities';
import FeelingItem from './FeelingItem';
import Tab from './Tab';
import Tag from './Tag';

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

const Feeling = ({ handleHiddenSub }: ISubTweet) => {
    const { handleHeightModal } = useCreateTweet();
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const [tabActive, setTabActive] = useState<TabType>(() =>
        !myTweet.tag || myTweet.tag === 'feeling' ? 'Feelings' : 'Activities',
    );

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
                <div className='flex items-center px-4 py-2 -y-2 gap-2'>
                    {myTweet.tag && myTweet.tag !== 'feeling' && <Tag />}
                    <div className='flex flex-1 items-center pl-2.5 bg-[#F0F2F5] rounded-full overflow-hidden'>
                        <SearchIcon className='text-[#65676b]' />
                        <input
                            placeholder='Search'
                            type='text'
                            className='flex-1 p-1.5 bg-[#F0F2F5] border-none outline-none text-[#050505] placeholder:text-[#65676b]'
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
                        ))) || <Activities />}
                </div>
            </div>
        </>
    );
};

export default memo(Feeling);
