import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { images } from '../../assets';
import { setValue } from '../../features/myTweet';
import { classNames, getUserName } from '../../utils';
import Image from '../Image';
import ScrollbarCustomize from '../ScrollbarCustomize';
import AudienceTag from './AudienceTag';
import GifSelect from './GifSelect';
import LinkAction from './LinkAction';
import UploadImage from './UploadImage';
import { Feeling, Locations, TagPeople } from './subTweet';

const Body = () => {
    const user = useSelector((state: RootState) => state.user);
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setValue(e.target.value));

    return (
        <div>
            <div className='p-2 xxxs:p-4 flex items-center gap-[11px]'>
                <Image rounded className='w-10 h-10' alt='' src={user.avatar} />
                <div>
                    <div className='flex flex-wrap items-center mb-1 font-semibold text-sm leading-sm text-base-black dark:text-white'>
                        {user.name || user.username}
                        {(myTweet.feeling ||
                            myTweet.location ||
                            myTweet.tagPeople) &&
                            ' is'}
                        {myTweet.feeling && (
                            <LinkAction
                                image={myTweet.image}
                                sub={Feeling}
                                tag={myTweet.tag}
                                title={myTweet.feeling}
                            />
                        )}
                        {myTweet.tagPeople &&
                            myTweet.tagPeople.map((tag, index) => (
                                <LinkAction
                                    key={v4()}
                                    sub={TagPeople}
                                    tag={index ? 'and' : 'with'}
                                    title={tag.name || tag.username}
                                />
                            ))}
                        {myTweet.location && (
                            <LinkAction
                                sub={Locations}
                                tag='in'
                                title={myTweet.location.title}
                            />
                        )}
                    </div>
                    <AudienceTag src={images.public}>Public</AudienceTag>
                </div>
            </div>
            <ScrollbarCustomize className='flex flex-col min-h-[154px] max-h-[322px] px-2 xxxs:px-4'>
                <label className='cursor-text flex-1 pt-1 pb-2 '>
                    <TextareaAutosize
                        value={myTweet.value}
                        onChange={handleChange}
                        className={classNames(
                            'flex-1 w-full outline-none resize-none text-sm leading-sm text-base-black dark:text-white bg-white dark:bg-dark-black-2 placeholder:text-[#65676B] dark:placeholder:text-[#b0b3b8]',
                            myTweet.value.length > 85 ||
                                myTweet.isShowUploadImage ||
                                'xxs:text-2xl',
                        )}
                        placeholder={`What's on your mind, ${getUserName(
                            user.name,
                            user.username,
                        )}?`}
                    />
                </label>
                <GifSelect />
                {myTweet.isShowUploadImage && <UploadImage />}
            </ScrollbarCustomize>
        </div>
    );
};

export default Body;
