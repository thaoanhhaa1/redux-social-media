import Wrapper from '../wrapper';
import CriketItem from './CriketItem';

const Criket = () => {
    return (
        <Wrapper className='p-2 xxs:p-3 xs:p-4 dl:p-5'>
            <div className='text-black-1 dark:text-white font-semibold text-lg'>
                What’s happening
            </div>
            <div className='flex items-center justify-between font-semibold text-black-1 dark:text-white'>
                <span>Criket</span>
                <span className='text-sm leading-sm'>Final. IND won</span>
            </div>
            <div className='rounded-2.5 overflow-hidden'>
                <CriketItem
                    src='/SouthAfrica.png'
                    name='South Africa'
                    labels={['99', '27.1']}
                    backgroundColor='bg-blue'
                />
                <CriketItem
                    src='/India.png'
                    name='India'
                    labels={['105/3', '19.1']}
                    backgroundColor='bg-blue-white-2'
                />
            </div>
            <button className='w-fit font-semibold text-sm leading-sm text-blue-white-2 dark:text-blue'>
                See more
            </button>
        </Wrapper>
    );
};

export default Criket;
