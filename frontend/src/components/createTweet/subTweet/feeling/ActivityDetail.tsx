import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { setFeeling } from '../../../../features/myTweet';
import { IFeeling } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import Image from '../../../Image';

const ActivityDetail = ({ feeling }: { feeling: IFeeling }) => {
    const { setSub, handleHeightModal } = useCreateTweet();
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(
            setFeeling({
                feeling: feeling.title,
                image: feeling.image,
            }),
        );
        setSub(undefined);
        handleHeightModal();
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex items-center gap-3 p-1.5 rounded-lg hover:bg-black-opacity-05 transition-all cursor-pointer',
                myTweet.feeling === feeling.title ? 'bg-black-opacity-05' : '',
            )}
        >
            <Image alt='' src={feeling.image} className='w-[50px] h-[50px]' />
            <span>{feeling.title}</span>
        </div>
    );
};

export default ActivityDetail;
