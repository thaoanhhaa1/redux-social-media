import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { images } from '../../assets';
import { createTweet } from '../../features/myTweet/myTweetSlice';
import { classNames } from '../../utils';
import Button from '../Button';
import { CloseIcon } from '../Icons';
import Image from '../Image';
import Model from '../Model';
import Tooltip from '../Tooltip';
import ActionButton from './ActionButton';
import AudienceTag from './AudienceTag';

const actions: {
    tooltip: string;
    image: string;
}[] = [
    {
        tooltip: 'Photo/Video',
        image: images.image,
    },
    {
        tooltip: 'Tag people',
        image: images.tagPeople,
    },
    {
        tooltip: 'Feeling/activity',
        image: images.feeling,
    },
    {
        tooltip: 'Check in',
        image: images.checkIn,
    },
    {
        tooltip: 'GIF',
        image: images.gif,
    },
    {
        tooltip: 'More',
        image: images.more,
    },
];

const CreateTweet = ({
    isShowModel,
    setShowModel,
}: {
    isShowModel: boolean;
    setShowModel: Dispatch<SetStateAction<boolean>>;
}) => {
    const { user, myTweet } = useSelector((state: RootState) => state);
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value);

    const handleSubmit = async () => {
        await dispatch(
            createTweet({
                content: value,
            }),
        ).unwrap();

        setShowModel(false);
    };

    return (
        <Model
            isShowModel={isShowModel}
            handleCloseModel={() => setShowModel(false)}
            className='max-w-[500px] w-full'
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='relative w-full rounded-2.5 bg-white cursor-default overflow-hidden'
            >
                {/* Header */}
                <div className='relative flex justify-center items-center h-[60px] px-3.75 border-b border-black-opacity-10'>
                    <h2 className='font-semibold text-xl leading-xl'>
                        Create tweet
                    </h2>
                    <Button
                        onClick={() => setShowModel(false)}
                        className='absolute right-3.75 transition-all duration-300 text-stroke-icon hover:text-red dark:text-white'
                        icon={<CloseIcon />}
                    />
                </div>

                {/* Body */}
                <div>
                    <div className='p-4 flex items-center gap-[11px]'>
                        <Image
                            rounded
                            className='w-10 h-10'
                            alt=''
                            src={user.avatar}
                        />
                        <div>
                            <div className='mb-1 font-semibold text-sm leading-sm text-base-black'>
                                {user.name || user.username}
                            </div>
                            <AudienceTag src={images.onlyMe}>
                                Only me
                            </AudienceTag>
                        </div>
                    </div>
                    <TextareaAutosize
                        value={value}
                        onChange={handleChange}
                        className={classNames(
                            'min-h-[154px] px-4 pt-1 pb-2 w-full max-h-[345px] outline-none resize-none text-base-black placeholder:text-[#65676B]',
                            value.length > 85
                                ? 'text-sm leading-sm'
                                : 'text-2xl',
                        )}
                        placeholder={`What's on your mind, ${
                            user.name || user.username
                        }?`}
                    />
                </div>

                {/* Footer */}
                <div className='p-4'>
                    <div className='p-2 flex justify-between items-center border border-[#CED0D4] rounded-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.1)]'>
                        <span className='font-semibold text-sm leading-sm text-base-black'>
                            Add to your tweet
                        </span>
                        <div className='flex gap-1'>
                            {actions.map((action) => (
                                <Tooltip key={v4()} tooltip={action.tooltip}>
                                    <ActionButton src={action.image} />
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!value}
                        isWidthFull
                        className='mt-4 font-semibold bg-blue text-white'
                    >
                        Tweet
                    </Button>
                </div>

                {/* Loading */}
                {myTweet.isLoading && (
                    <div className='absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center'>
                        <div className='w-10 h-10 border-4 rounded-full border-blue border-t-transparent animate-spin'></div>
                    </div>
                )}
            </div>
        </Model>
    );
};

export default CreateTweet;
