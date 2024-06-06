import { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { BookmarkItem, Card, Loading, ScrollbarFixTop } from '../components';
import { CardSkeleton } from '../components/card';
import CardWrapper from '../components/card/CardWrapper';
import { getBookmarks, getTweets, setActiveId } from '../features/bookmarks';
import { getArray } from '../utils';

const Bookmark = () => {
    const { bookmarks, isLoading, activeId } = useAppSelector(
        (state: RootState) => state.bookmarks,
    );
    const dispatch = useAppDispatch();
    const bookmark = useMemo(
        () => bookmarks.find((bm) => bm._id === activeId)!,
        [activeId, bookmarks],
    );

    const loadMoreCard = useCallback(async () => {
        if (activeId)
            await dispatch(
                getTweets({
                    userId: bookmark._id,
                    page: bookmark.page + 1,
                }),
            );
    }, [activeId, bookmark?._id, bookmark?.page, dispatch]);

    const handleChangeActiveId = useCallback(
        (id: string) => dispatch(setActiveId(id)),
        [dispatch],
    );

    useEffect(() => {
        if (!bookmarks.length) dispatch(getBookmarks());
        else if (!activeId) dispatch(setActiveId(bookmarks[0]._id));
    }, [activeId, bookmarks, bookmarks.length, dispatch]);

    useEffect(() => {
        if (bookmark && !bookmark.tweets.length) loadMoreCard();
    }, [bookmark, dispatch, loadMoreCard]);

    if (isLoading || !activeId || !bookmark.tweets.length) return <Loading />;

    return (
        <div className='px-2 xxs:px-3 xs:px-4 dl:px-5'>
            <div className='p-2 xxs:p-3 xs:p-4 dl:p-5 bg-white dark:bg-dark-black-2 rounded block xxs:hidden mb-2 xxs:mb-3 xs:mb-4 dl:mb-5'>
                <Swiper spaceBetween={0} slidesPerView='auto'>
                    {bookmarks.map((bm) => (
                        <SwiperSlide key={bm._id} className='!w-fit'>
                            <BookmarkItem
                                active={bm._id === bookmark?._id}
                                bookmark={bm}
                                onClick={() => handleChangeActiveId(bm._id)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='flex gap-2 xxs:gap-3 xs:gap-4 dl:gap-5'>
                <ScrollbarFixTop
                    gap='2'
                    className='hidden xxs:flex w-fit dl:w-[335px]'
                    header={
                        <div className='relative'>
                            <span className='opacity-0 invisible'>1</span>
                            <div className='absolute inset-0 text-center font-semibold text-black-5 dark:text-white line-clamp-1'>
                                Bookmark Tweet
                            </div>
                        </div>
                    }
                >
                    {bookmarks.map((bm) => (
                        <BookmarkItem
                            active={bm._id === bookmark?._id}
                            bookmark={bm}
                            key={bm._id}
                            onClick={() => handleChangeActiveId(bm._id)}
                        />
                    ))}
                </ScrollbarFixTop>
                <div className='flex-1 pb-5'>
                    <div className='max-w-[680px] mx-auto flex flex-col gap-5'>
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
                                <CardWrapper
                                    type='BOOKMARKS'
                                    key={tweet._id}
                                    tweet={tweet}
                                >
                                    <Card />
                                </CardWrapper>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
