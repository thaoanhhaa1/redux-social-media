import Wrapper from '../wrapper/Wrapper';
import TrendItem from './TrendItem';

const Trend = () => {
    return (
        <Wrapper className='p-2 xxs:p-3 xs:p-4 dl:p-5' gap='0'>
            <div className='mb-3 font-semibold text-base-black dark:text-white'>
                Trends for you
            </div>
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <button className='mt-2 xxs:mt-3 xs:mt-4 dl:mt-5 w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue'>
                show more
            </button>
        </Wrapper>
    );
};

export default Trend;
