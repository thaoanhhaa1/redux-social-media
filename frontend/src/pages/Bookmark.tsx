import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { BookmarkItem, Card, Loading, ScrollbarFixTop } from '../components';
import { CardSkeleton } from '../components/card';
import CardWrapper from '../components/card/CardWrapper';
import { getBookmarks, getTweets } from '../features/bookmarks';
import { getArray } from '../utils';

const Bookmark = () => {
    const { bookmarks, loading } = useAppSelector(
        (state: RootState) => state.bookmarks,
    );
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState<number>(-1);
    const bookmark = bookmarks[index];

    const loadMoreCard = useCallback(async () => {
        if (index > -1)
            await dispatch(
                getTweets({
                    userId: bookmarks[index]._id,
                    page: bookmarks[index].page + 1,
                }),
            );
    }, [bookmarks, dispatch, index]);

    useEffect(() => {
        if (!bookmarks.length) dispatch(getBookmarks());
        else if (index === -1) setIndex(0);
    }, [bookmarks, bookmarks.length, dispatch, index]);

    useEffect(() => {
        if (bookmark && !bookmark.tweets.length) loadMoreCard();
    }, [bookmark, dispatch, loadMoreCard]);

    if (loading || index === -1 || !bookmark.tweets.length) return <Loading />;

    return (
        <div className='flex gap-5 px-5'>
            <ScrollbarFixTop
                gap='2'
                className='w-[335px]'
                header={
                    <div className='text-center font-semibold text-black-5 dark:text-white'>
                        Bookmark Tweet
                    </div>
                }
            >
                {bookmarks.map((bm, index) => (
                    <BookmarkItem
                        active={bm._id === bookmark?._id}
                        bookmark={bm}
                        key={bm._id}
                        onClick={() => setIndex(index)}
                    />
                ))}
            </ScrollbarFixTop>
            <div className='flex-1 pb-5'>
                <div className='max-w-[700px] mx-auto flex flex-col gap-5'>
                    <InfiniteScroll
                        dataLength={bookmark.tweets.length}
                        hasMore={bookmark.page < bookmark.pages}
                        loader={getArray(3).map(() => (
                            <CardSkeleton key={v4()} />
                        ))}
                        next={loadMoreCard}
                        className='scrollbar flex flex-col gap-2 xxs:gap-5'
                    >
                        {bookmark.tweets.map((tweet) => (
                            <CardWrapper key={tweet._id} tweet={tweet}>
                                <Card />
                            </CardWrapper>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
