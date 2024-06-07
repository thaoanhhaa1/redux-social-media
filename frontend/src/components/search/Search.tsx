import {
    ChangeEvent,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce, useOnClickOutside } from 'usehooks-ts';
import { AppDispatch, RootState } from '../../app/store';
import { search as fetchUser, init } from '../../features/search';
import { SearchIcon } from '../Icons';
import SearchItem from './SearchItem';
import SearchMore from './SearchMore';

const Search = () => {
    const ref = useRef(null);
    const [isShowResult, setShowResult] = useState(false);
    const [value, setValue] = useState('');
    const search = useDebounce(value.trim(), 500);
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, results } = useSelector(
        (state: RootState) => state.search,
    );

    const handleFocusInput = () => setShowResult(true);
    const handleHiddenSearch = useCallback(() => {
        setShowResult(false);
        setValue('');
    }, []);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    useEffect(() => {
        if (!search) return;
        dispatch(init());
        dispatch(fetchUser(search));
    }, [dispatch, search]);

    useOnClickOutside(ref, handleHiddenSearch);

    return (
        <div
            ref={ref}
            className='relative flex items-center flex-1 max-w-[649px] h-[43px] bg-white-1 dark:bg-dark-black-3 rounded-2.5'
        >
            <span className='absolute left-5 text-black-100 dark:text-white'>
                <SearchIcon />
            </span>
            <input
                value={value}
                onFocus={handleFocusInput}
                onChange={handleChange}
                placeholder='Search on twitter'
                type='text'
                className='search-input w-full pl-12 pr-5 py-[14px] text-black dark:text-white bg-transparent font-medium text-xs leading-3.75 outline-none'
            />
            {isShowResult && (
                <div className='absolute left-0 w-[calc(100vw-80px)] xxs:w-full top-[calc(100%_+_8px)] p-2 bg-white dark:bg-dark-black-1 rounded-2.5 shadow-[0px_2px_12px_rgba(0,0,0,0.2)]'>
                    {(results.length > 0 && !isLoading && (
                        <>
                            {Boolean(search) || (
                                <div className='mb-2 font-semibold'>Recent</div>
                            )}
                            {results.map((user) => (
                                <SearchItem
                                    handleHiddenSearch={handleHiddenSearch}
                                    key={user._id}
                                    user={user}
                                />
                            ))}
                        </>
                    )) ||
                        Boolean(search) || (
                            <div className='text-center text-black-5 dark:text-white-5'>
                                No recent searches
                            </div>
                        )}
                    {Boolean(search) && !isLoading && (
                        <SearchMore value={search} />
                    )}
                    {isLoading && (
                        <div className='mx-auto w-10 h-10 animate-spin rounded-full border-4 border-blue border-b-transparent' />
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(Search);
