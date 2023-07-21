import { TabFeelingType } from '../types';

function getKeyFeeling(tabActive: TabFeelingType, activity: string): string {
    if (tabActive === 'Feelings') return 'feelings';
    if (activity && activity !== 'feeling') return activity;
    return 'activities';
}

export default getKeyFeeling;
