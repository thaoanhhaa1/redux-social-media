import { memo } from 'react';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import Header from '../../Header';
import config from '../../../../config';
import MoreItem from './MoreItem';
import { v4 } from 'uuid';

const More = () => {
    const { handleHiddenSub } = useCreateTweet();

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Add to your post
            </Header>
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
