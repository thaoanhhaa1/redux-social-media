import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { setLocation, setSub } from '../../../../features/myTweet';
import { ILocation } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import Image from '../../../Image';

const Location = ({ location }: { location: ILocation }) => {
    const dispatch = useAppDispatch();
    const locationState = useSelector(
        (state: RootState) => state.myTweet.location,
    );
    const isActive = locationState && locationState.title === location.title;

    const handleClick = () => {
        if (isActive) dispatch(setLocation(undefined));
        else dispatch(setLocation(location));
        dispatch(setSub(undefined));
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'p-1.5 flex items-center gap-3 h-[52px] rounded-lg cursor-pointer hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10 transition-all',
                isActive &&
                    'bg-black-opacity-05 dark:bg-white-opacity-10 text-blue',
            )}
        >
            <div className='p-1 flex-shrink-0 rounded-lg bg-[#65676B]'>
                <Image alt='' src={location.image} className='w-6 h-6' />
            </div>
            <div className='flex-1'>
                <div className='font-medium text-sm leading-sm text-current'>
                    {location.title}
                </div>
                {location.description && (
                    <p className='mt-1 text-xs leading-xs text-current'>
                        {location.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Location;
