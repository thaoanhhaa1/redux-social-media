import { UIEvent, memo, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import config from '../../../../config';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { useSearch } from '../../../../hooks';
import { IGif } from '../../../../interfaces';
import ScrollbarCustomize from '../../../ScrollbarCustomize';
import Header from '../../Header';
import Search from '../Search';
import GifItem from './GifItem';

interface IGiphy {
    id: string;
    title: string;
    images: {
        original: {
            url: string;
        };
    };
    [key: string]: any;
}

const giphyAPI = (limit: number, offset: number, search?: string) =>
    `https://api.giphy.com/v1/gifs/${search ? 'search' : 'trending'}?api_key=${
        process.env.REACT_APP_GIPHY_APY_KEY
    }${
        search ? `&q=${search}` : ''
    }&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`;

const Gif = () => {
    const [gifs, setGifs] = useState<Array<IGif>>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(true);
    const { value, handleChangeSearch } = useSearch();
    const { handleHeightModal, handleHiddenSub } = useCreateTweet();

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;
        if (scrollTop + offsetHeight >= scrollHeight * 0.8 && !isLoading)
            setOffset((offset) => offset + 1);
    };

    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await axiosClient.get(
                giphyAPI(
                    config.GIFS_PER_PAGE,
                    offset * config.GIFS_PER_PAGE + 1,
                ),
            );

            setGifs((gifs) => [
                ...gifs,
                ...res.data.data.map((gif: IGiphy) => ({
                    id: gif.id,
                    title: gif.title,
                    url: gif.images.original.url,
                })),
            ]);
            setLoading(false);
        })();
    }, [offset]);

    useEffect(() => {
        if (!isLoading && gifs.length === config.GIFS_PER_PAGE)
            handleHeightModal();
    }, [gifs, handleHeightModal, isLoading]);

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Choose a GIF
            </Header>

            {(isLoading && !gifs.length && (
                <div className='py-5'>
                    <div className='mx-auto w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin'></div>
                </div>
            )) || (
                <>
                    <div className='px-4 py-2'>
                        <Search
                            placeholder='Search'
                            value={value}
                            handleChangeSearch={handleChangeSearch}
                        />
                    </div>
                    <ScrollbarCustomize
                        onScroll={handleScroll}
                        className='max-h-[calc(85vh-112px)]'
                    >
                        {gifs.map((gif) => (
                            <GifItem gif={gif} key={gif.id} />
                        ))}
                    </ScrollbarCustomize>
                </>
            )}
        </>
    );
};

export default memo(Gif);
