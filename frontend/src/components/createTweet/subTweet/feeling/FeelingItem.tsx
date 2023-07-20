import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { setFeeling, setTag } from '../../../../features/myTweet';
import { IFeeling } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import Image from '../../../Image';
import { RootState } from '../../../../app/store';

const FeelingItem = ({ feeling }: { feeling: IFeeling }) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();
    const { setSub } = useCreateTweet();

    const handleClick = () => {
        dispatch(setTag('feeling'));
        dispatch(
            setFeeling({
                feeling: feeling.title,
                image: feeling.image,
            }),
        );
        setSub(undefined);
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex items-center gap-3 p-2 hover:bg-[rgba(68,73,80,0.15)] transition-all rounded-lg cursor-pointer',
                feeling.title === myTweet.feeling && 'bg-black-opacity-05',
            )}
        >
            <div className='flex-shrink-0 p-2 bg-[#E4E6EB] rounded-full'>
                <Image alt='' src={feeling.image} className='w-5 h-5' />
            </div>
            <span className='flex-1'>{feeling.title}</span>
        </div>
    );
};

export default FeelingItem;
