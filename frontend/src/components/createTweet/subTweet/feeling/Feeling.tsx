import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../../../app/store';
import { useSearch } from '../../../../hooks';
import { TabFeelingType } from '../../../../types';
import { classNames } from '../../../../utils';
import Header from '../../Header';
import Search from '../Search';
import ListFeeling from './ListFeeling';
import Tab from './Tab';
import Tag from './Tag';

const tabs: {
    title: TabFeelingType;
}[] = [
    {
        title: 'Feelings',
    },
    {
        title: 'Activities',
    },
];

const Feeling = () => {
    const { value, setValue, handleChangeSearch } = useSearch();
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const { updateHeightPopup } = useSelector(
        (state: RootState) => state.popupMultiLevel,
    );
    const [tabActive, setTabActive] = useState<TabFeelingType>(() =>
        !myTweet.tag || myTweet.tag === 'feeling' ? 'Feelings' : 'Activities',
    );

    useEffect(() => {
        updateHeightPopup();
    }, [updateHeightPopup, tabActive]);

    useEffect(() => {
        value || updateHeightPopup();
    }, [updateHeightPopup, value]);

    useEffect(() => {
        setValue('');
    }, [tabActive, myTweet.tag, setValue]);

    return (
        <>
            <Header isSub>How are you feeling?</Header>
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
                <div className='flex items-center px-2 xxs:px-4 py-2 -y-2 gap-2'>
                    {tabActive === 'Activities' &&
                        myTweet.tag &&
                        myTweet.tag !== 'feeling' && <Tag />}
                    <Search
                        placeholder='Search'
                        value={value}
                        handleChangeSearch={handleChangeSearch}
                    />
                </div>

                {/* Tab */}
                <div
                    className={classNames(
                        'relative min-h-[80px] p-2 grid',
                        tabActive === 'Feelings'
                            ? 'grid-cols-2'
                            : 'grid-cols-1',
                    )}
                >
                    <ListFeeling tabActive={tabActive} value={value} />
                </div>
            </div>
        </>
    );
};

export default memo(Feeling);
