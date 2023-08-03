import { useSelector } from 'react-redux';
import { TabFeelingType } from '../../../../types';
import { getKeyFeeling } from '../../../../utils';
import { RootState } from '../../../../app/store';
import config from '../../../../config';
import ActivityDetail from './ActivityDetail';
import ActivityItem from './ActivityItem';
import FeelingItem from './FeelingItem';
import { v4 } from 'uuid';

const ListFeeling = ({
    tabActive,
    value,
}: {
    tabActive: TabFeelingType;
    value: string;
}) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const key = getKeyFeeling(tabActive, myTweet.tag);
    const feelings = config.feelings[key] ?? [];
    let Comp = ActivityDetail;

    if (key === 'activities') Comp = ActivityItem;
    else if (key === 'feelings') Comp = FeelingItem;

    const feelingSearches = feelings.filter((feeling) =>
        new RegExp(value, 'i').test(feeling.title),
    );

    if (feelingSearches.length === 0)
        return (
            <div className='absolute left-0 right-0 p-2 text-center text-sm leading-sm text-[#65676B] dark:text-[#8A8D91]'>
                Nothing found
            </div>
        );

    return (
        <>
            {feelingSearches.map((feeling) => (
                <Comp feeling={feeling} key={v4()} />
            ))}
        </>
    );
};

export default ListFeeling;
