import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { setFeeling, setTag } from '../../../../features/myTweet';
import { IFeeling } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import Image from '../../../Image';
import { resetSubs } from '../../../../features/popupMultiLevel';

const ActivityDetail = ({ feeling }: { feeling: IFeeling }) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const { updateHeightPopup } = useSelector(
        (state: RootState) => state.popupMultiLevel,
    );
    const dispatch = useAppDispatch();
    const isActive = myTweet.feeling === feeling.title;

    const handleClick = () => {
        if (isActive) {
            dispatch(setTag(''));
        } else {
            dispatch(
                setFeeling({
                    feeling: feeling.title,
                    image: feeling.image,
                }),
            );
        }

        dispatch(resetSubs());
        updateHeightPopup();
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex items-center gap-3 p-1.5 rounded-lg hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10 transition-all cursor-pointer',
                isActive ? 'bg-black-opacity-05 dark:bg-white-opacity-10' : '',
            )}
        >
            <Image alt='' src={feeling.image} className='w-[50px] h-[50px]' />
            <span>{feeling.title}</span>
        </div>
    );
};

export default ActivityDetail;
