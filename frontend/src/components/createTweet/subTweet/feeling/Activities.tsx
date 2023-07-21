import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../../../app/store';
import { images } from '../../../../assets';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { IActivity } from '../../../../interfaces';
import ActivityDetail from './ActivityDetail';
import ActivityItem from './ActivityItem';

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

const activityDetails: {
    [key: string]: Array<IActivity>;
} = {
    celebrating: [
        {
            title: 'friendship',
            image: images.friendship,
        },
        {
            title: 'a birthday',
            image: images.aBirthday,
        },
        {
            title: 'your special day',
            image: images.yourSpecialDay,
        },
        {
            title: 'birthdays',
            image: images.birthdays,
        },
    ],
    watching: [],
    eating: [],
    drinking: [],
};

const Activities = () => {
    const { handleHeightModal } = useCreateTweet();
    const myTweet = useSelector((state: RootState) => state.myTweet);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, myTweet.tag]);

    return (
        <>
            {(myTweet.tag &&
                myTweet.tag !== 'feeling' &&
                activityDetails[myTweet.tag].map((activity) => (
                    <ActivityDetail activity={activity} key={v4()} />
                ))) ||
                activities.map((activity) => (
                    <ActivityItem activity={activity} key={v4()} />
                ))}
        </>
    );
};

export default Activities;
