import { memo } from 'react';
import { v4 } from 'uuid';
import config from '../../../../config';
import Header from '../../Header';
import MoreItem from './MoreItem';

const More = () => {
    return (
        <>
            <Header isSub>Add to your post</Header>
            <div className='grid grid-cols-2 p-2 gap-2'>
                {config.createTweetActions.map((item, index) => {
                    if (index === config.CREATE_TWEET_ACTION_NUMBER)
                        return null;

                    return <MoreItem item={item} key={v4()} />;
                })}
            </div>
        </>
    );
};

export default memo(More);
