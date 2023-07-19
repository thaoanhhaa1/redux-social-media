import { v4 } from 'uuid';
import { ISubTweet } from '../../../../interfaces';
import Header from '../../Header';
import Tab from './Tab';
import { useState } from 'react';

const tabs: {
    title: 'Feelings' | 'Activities';
}[] = [
    {
        title: 'Feelings',
    },
    {
        title: 'Activities',
    },
];

const Feeling = ({ handleHiddenSub }: ISubTweet) => {
    const [tabActive, setTabActive] = useState<'Feelings' | 'Activities'>(
        'Feelings',
    );

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                How are you feeling?
            </Header>
            <div>
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
            </div>
        </>
    );
};

export default Feeling;
