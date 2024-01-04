import { useState } from 'react';
import { ITweet } from '../interfaces';
import { classNames } from '../utils';
import ScrollbarCustomize from './ScrollbarCustomize';
import Card from './card';
import CardComment from './cardPopup/CardComment';
import CommentTweet from './commentTweet';

type Props = {
    tweet: ITweet;
    className?: string;
    isPopup?: boolean;
};

const CardDetail = ({ tweet, className = '', isPopup }: Props) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>('');

    const handleScroll = () => setScrolled(true);

    return (
        <div className='bg-white dark:bg-dark-black-2 rounded-lg'>
            <ScrollbarCustomize
                onScroll={handleScroll}
                className={classNames(isPopup && 'max-h-[50vh]')}
            >
                <Card isPopup className={className} tweet={tweet} />
                {tweet.comments?.map((comment) => (
                    <CommentTweet
                        edit={edit}
                        setEdit={setEdit}
                        scrolled={scrolled}
                        setScrolled={setScrolled}
                        key={comment._id}
                        comment={comment}
                    />
                ))}
            </ScrollbarCustomize>
            <CardComment isParent={isPopup} />
        </div>
    );
};

export default CardDetail;
