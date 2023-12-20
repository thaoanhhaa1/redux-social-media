import { v4 } from 'uuid';
import config from '../../config';
import ActionButton from './ActionButton';
import Button from '../Button';
import { useAppDispatch } from '../../app/hooks';
import { createTweet, setValue } from '../../features/myTweet';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Dispatch, SetStateAction, useMemo } from 'react';

const Footer = ({
    setShowModal,
}: {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const disabled = useMemo(
        () =>
            !myTweet.value &&
            !myTweet.images?.length &&
            !myTweet.tagPeople?.length &&
            !myTweet.feeling &&
            !myTweet.location &&
            !myTweet.gif,
        [
            myTweet.feeling,
            myTweet.gif,
            myTweet.images?.length,
            myTweet.location,
            myTweet.tagPeople?.length,
            myTweet.value,
        ],
    );
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        await dispatch(
            createTweet({
                content: myTweet.value,
                images: myTweet.images,
                feeling: myTweet.image
                    ? {
                          title: `${myTweet.tag} ${myTweet.feeling}`,
                          image: myTweet.image,
                      }
                    : undefined,
                location: myTweet.location,
                tagPeople: myTweet.tagPeople,
                gif: myTweet.gif,
                comments: [],
                skip: 0,
                numberOfComments: 0,
            }),
        ).unwrap();

        dispatch(setValue(''));
        setShowModal(false);
    };

    return (
        <div className='p-2 xxs:p-4'>
            <div className='p-2 flex justify-between items-center border border-[#CED0D4] dark:border-[#3E4042] rounded-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.1)]'>
                <span className='hidden xxxs:block font-semibold text-sm leading-sm text-base-black dark:text-white'>
                    Add to your tweet
                </span>
                <div className='flex gap-1'>
                    {config.createTweetActions.map((action, index) => {
                        if (index > config.CREATE_TWEET_ACTION_NUMBER)
                            return null;

                        return <ActionButton key={v4()} action={action} />;
                    })}
                </div>
            </div>
            <Button
                onClick={handleSubmit}
                disabled={disabled}
                isWidthFull
                className='mt-2 xxxs:mt-4 font-semibold bg-blue text-white'
            >
                Tweet
            </Button>
        </div>
    );
};

export default Footer;
