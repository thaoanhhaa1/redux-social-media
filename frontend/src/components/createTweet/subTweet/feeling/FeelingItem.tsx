import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { setFeeling, setSub, setTag } from '../../../../features/myTweet';
import { IFeeling } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import Image from '../../../Image';

const FeelingItem = ({ feeling }: { feeling: IFeeling }) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();
    const isActive = feeling.title === myTweet.feeling;

    const handleClick = () => {
        if (isActive) dispatch(setTag(''));
        else {
            dispatch(setTag('feeling'));
            dispatch(
                setFeeling({
                    feeling: feeling.title,
                    image: feeling.image,
                }),
            );
        }
        dispatch(setSub(undefined));
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex items-center gap-3 p-2 hover:bg-[rgba(68,73,80,0.15)] dark:hover:bg-white-opacity-10 transition-all rounded-lg cursor-pointer',
                isActive && 'bg-black-opacity-05 dark:bg-[#18191A]',
            )}
        >
            <div className='flex-shrink-0 p-2 bg-[#E4E6EB] dark:bg-[#3E4042] rounded-full'>
                <Image alt='' src={feeling.image} className='w-5 h-5' />
            </div>
            <span className='flex-1'>{feeling.title}</span>
        </div>
    );
};

export default FeelingItem;
