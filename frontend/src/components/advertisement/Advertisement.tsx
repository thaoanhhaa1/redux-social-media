import { memo } from 'react';
import Image from '../Image';
import Wrapper, { WrapperHeader } from '../wrapper';

const Advertisement = () => {
    return (
        <Wrapper className='p-5'>
            <WrapperHeader title='sponsored' titleLink='Create Ad' to='/' />
            <Image
                className='rounded-2.5 h-[120px]'
                alt=''
                src='https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            />
            <div className='font-semibold text-sm leading-sm'>
                <div className='text-black dark:text-white'>
                    ali baba online shoping
                </div>
                <p className='mt-1.25 text-black-8 dark:text-white-9'>
                    ali baba .com
                </p>
            </div>
        </Wrapper>
    );
};

export default memo(Advertisement);
