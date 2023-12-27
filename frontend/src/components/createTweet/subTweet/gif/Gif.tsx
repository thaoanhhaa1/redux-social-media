import { UIEvent, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce, useIsFirstRender } from 'usehooks-ts';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { getGifs, reset } from '../../../../features/gifs';
import { useSearch } from '../../../../hooks';
import ScrollbarCustomize from '../../../ScrollbarCustomize';
import Header from '../../Header';
import Search from '../Search';
import GifItem from './GifItem';

const Gif = () => {
    const { data, loading, page } = useSelector(
        (state: RootState) => state.gifs,
    );
    const { value, handleChangeSearch } = useSearch();
    const debounceValue = useDebounce(value, 700);
    const firstRender = useIsFirstRender();
    const { handleHeightModal, handleHiddenSub } = useCreateTweet();
    const dispatch = useAppDispatch();

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;

        if (scrollTop + offsetHeight >= scrollHeight * 0.8 && !loading)
            dispatch(
                getGifs({
                    page: page + 1,
                    q: debounceValue,
                }),
            );
    };

    useEffect(() => {
        async function getData() {
            await Promise.all([
                dispatch(
                    getGifs({
                        page: 1,
                        q: debounceValue,
                    }),
                ),
                dispatch(reset()),
            ]);
        }

        getData();
    }, [debounceValue, dispatch]);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, loading]);

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Choose a GIF
            </Header>

            {firstRender || (
                <div className='px-4 py-2'>
                    <Search
                        placeholder='Search'
                        value={value}
                        handleChangeSearch={handleChangeSearch}
                    />
                </div>
            )}
            <ScrollbarCustomize
                onScroll={handleScroll}
                className='max-h-[calc(85vh-112px)] min-h-[100px] flex flex-col items-center'
            >
                {data.map((gif) => (
                    <GifItem gif={gif} key={gif._id} />
                ))}
                {loading && (
                    <div className='py-5'>
                        <div className='mx-auto w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin'></div>
                    </div>
                )}
            </ScrollbarCustomize>
        </>
    );
};

export default memo(Gif);
