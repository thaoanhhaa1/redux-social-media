import { memo, useEffect, useState } from 'react';
import api from '../../../../api';
import axiosClient from '../../../../api/axiosClient';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { useSearch } from '../../../../hooks';
import { ISubTweet, IUserTweet } from '../../../../interfaces';
import Button from '../../../Button';
import Header from '../../Header';
import Search from '../Search';
import TagPeopleItem from './TagPeopleItem';
import TaggedItem from './TaggedItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import ScrollbarCustomize from '../../../ScrollbarCustomize';
import { useDebounce } from 'usehooks-ts';

const TagPeople = ({ handleHiddenSub }: ISubTweet) => {
    const { value, handleChangeSearch } = useSearch();
    const valueDebounce = useDebounce(value, 800);
    const { handleHeightModal } = useCreateTweet();
    const [users, setUsers] = useState<Array<IUserTweet>>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const myTweet = useSelector((state: RootState) => state.myTweet);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await axiosClient.get(api.getFriends(), {
                    params: {
                        value: valueDebounce,
                        tagged:
                            (myTweet.tagPeople &&
                                myTweet.tagPeople.map((user) => user._id)) ||
                            [],
                    },
                });

                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.log('🚀 ~ error:', error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, isLoading, myTweet.tagPeople]);

    return (
        <>
            <Header isSub onClick={handleHiddenSub}>
                Tag people
            </Header>
            <div className='flex items-center px-4 py-2'>
                <Search
                    value={value}
                    handleChangeSearch={handleChangeSearch}
                    placeholder='Search for friends'
                />
                <Button
                    small
                    className='pl-5 pr-2 font-semibold text-sm leading-sm text-blue'
                    onClick={handleHiddenSub}
                >
                    Done
                </Button>
            </div>
            <div className='pt-4' />
            {myTweet.tagPeople && (
                <>
                    <div className='pl-4 pr-2 pb-2 font-semibold text-sm leading-sm text-[#65676B] dark:text-[#B0B3B8]'>
                        TAGGED
                    </div>
                    <div className='mx-4 mt-2 mb-4 border border-[#CED0D4] dark:border-[#3E4042] rounded-md overflow-hidden'>
                        <div className='gap-2 flex flex-wrap max-h-[156px] p-2 rounded-md overflow-y-scroll'>
                            {myTweet.tagPeople.map((user) => (
                                <TaggedItem user={user} key={user._id} />
                            ))}
                        </div>
                    </div>
                </>
            )}
            <ScrollbarCustomize className='px-2 pb-2 max-h-[387px]'>
                {(isLoading && (
                    <div className='mx-auto w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin'></div>
                )) || (
                    <>
                        <div className='pl-2 pb-2 font-semibold text-sm leading-sm text-[#65676B] dark:text-[#B0B3B8]'>
                            {(valueDebounce && 'SEARCH') || 'SUGGESTIONS'}
                        </div>
                        {users
                            .filter(
                                (user) =>
                                    new RegExp(valueDebounce).test(
                                        user.name || user.username,
                                    ) &&
                                    myTweet.tagPeople &&
                                    !myTweet.tagPeople.some(
                                        (u) => u._id === user._id,
                                    ),
                            )
                            .map((user) => (
                                <TagPeopleItem key={user._id} user={user} />
                            ))}
                    </>
                )}
            </ScrollbarCustomize>
        </>
    );
};

export default memo(TagPeople);
