import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Empty } from '../components';
import ListDetail from '../components/ListDetail';
import ListWrapper from '../components/ListWrapper';
import ListsSkeleton from '../components/ListsSkeleton';
import { ScrollbarFixTop } from '../components/scrollbar';
import { countPages, getLists, setActiveId } from '../features/lists';
import { IList } from '../interfaces';

const Lists = () => {
    const { lists, activeId, pages, loading } = useAppSelector(
        (state: RootState) => state.lists,
    );
    const list = useMemo(
        () => activeId && lists.find((list) => list._id === activeId),
        [activeId, lists],
    );
    const dispatch = useAppDispatch();
    const { allList, pinList } = useMemo(() => {
        const pinList: IList[] = [];
        const allList: IList[] = [];

        if (lists.length)
            lists.forEach((list) => {
                if (list.isPin) pinList.push(list);
                else allList.push(list);
            });

        return { pinList, allList };
    }, [lists]);

    useEffect(() => {
        if (lists.length) return;

        dispatch(getLists({ page: 1 }));
        dispatch(countPages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!activeId && lists.length) dispatch(setActiveId(lists[0]._id));
    }, [activeId, dispatch, lists]);

    const renderListChild = useCallback(() => {
        return (
            <div className='flex flex-col gap-2 xxs:gap-3'>
                <ListWrapper title='Pinned' list={pinList} />
                <ListWrapper title='All' list={allList} />
            </div>
        );
    }, [pinList, allList]);

    if (loading) return <ListsSkeleton />;
    if (pages === 0) return <Empty>No lists available</Empty>;

    return (
        <div className='px-2 xxs:px-3 xs:px-4 dl:px-5'>
            <div className='block dl:hidden mb-2 xxs:mb-3 dl:mb-4 dark:bg-dark-black-2 p-2 xxs:p-3 xs:p-4 dl:p-5 rounded-md'>
                {renderListChild()}
            </div>
            <div className='flex gap-2 xxs:gap-3 xs:gap-4 dl:gap-5'>
                <ScrollbarFixTop
                    marginBottom='20px'
                    className='hidden dl:flex w-[336px] shadow-box dark:shadow-none'
                    header={
                        <div className='font-semibold text-sm leading-sm text-black-5 dark:text-white text-center'>
                            Lists
                        </div>
                    }
                >
                    {renderListChild()}
                </ScrollbarFixTop>
                {list ? <ListDetail list={list} /> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Lists;
