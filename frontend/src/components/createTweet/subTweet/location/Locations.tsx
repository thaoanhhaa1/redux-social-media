import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import api from '../../../../api';
import axiosClient from '../../../../api/axiosClient';
import { RootState } from '../../../../app/store';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { useSearch } from '../../../../hooks';
import { ILocation, ISubTweet } from '../../../../interfaces';
import Header from '../../Header';
import Search from '../Search';
import Location from './Location';

const Locations = ({ handleHiddenSub }: ISubTweet) => {
    const { handleHeightModal } = useCreateTweet();
    const { value, handleChangeSearch } = useSearch();
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const locationState = useSelector(
        (state: RootState) => state.myTweet.location,
    );

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            setLoading(true);
            const res = await axiosClient.get(api.getLocations(), {
                signal: controller.signal,
                params: {
                    v: value,
                },
            });

            setLocations(res.data);
            setLoading(false);
        })();

        return () => {
            controller.abort();
        };
    }, [value]);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, isLoading]);

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Search for location
            </Header>
            <div className='px-2 xxs:px-4 h-[52px] flex items-center'>
                <Search
                    placeholder='Where are you?'
                    value={value}
                    handleChangeSearch={handleChangeSearch}
                />
            </div>
            <div className='p-2'>
                {isLoading && (
                    <div className='w-10 h-10 border-4 border-blue border-t-transparent animate-spin rounded-full mx-auto'></div>
                )}
                {!isLoading && locations.length === 0 && (
                    <p className='text-center text-sm leading-sm text-[#65676B]'>
                        No locations to show
                    </p>
                )}
                {!isLoading && locations.length > 0 && locationState && (
                    <Location location={locationState} key={v4()} />
                )}
                {!isLoading &&
                    locations.length > 0 &&
                    locations.map((location) => {
                        if (location.title === locationState?.title) return '';

                        return <Location location={location} key={v4()} />;
                    })}
            </div>
        </>
    );
};

export default memo(Locations);
