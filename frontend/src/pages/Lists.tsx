import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { List } from '../components';
import ListDetail from '../components/ListDetail';
import { ScrollbarFixTop } from '../components/scrollbar';
import { countPages, getLists, setActiveId } from '../features/lists';
import { IList } from '../interfaces';

// TODO Loading skeleton
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
            <>
                {pinList.length ? (
                    <div className='px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white'>
                        <span>Pinned</span>
                        <span>Edit</span>
                    </div>
                ) : null}
                {pinList.map((list) => (
                    <List list={list} key={list._id} />
                ))}
                <div className='px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white'>
                    <span>All</span>
                </div>
                {allList.map((list) => (
                    <List list={list} key={list._id} />
                ))}
            </>
        );
    }, [pinList, allList]);

    if (loading) return <div>Loading...</div>;
    if (pages === 0) return <div>Lists is empty</div>;

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
