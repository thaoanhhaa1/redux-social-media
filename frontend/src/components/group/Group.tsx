import Image from '../Image';
import Members from '../Members';
import Wrapper, { WrapperHeader } from '../wrapper';

const Group = () => {
    return (
        <Wrapper className='p-5'>
            <WrapperHeader
                title='Suggested groups'
                titleLink='See more'
                to='/'
            />
            <Image
                className='rounded-2.5 h-[120px]'
                alt=''
                src='https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            />
            <div className='flex gap-1'>
                <div className='font-semibold'>
                    <div className='text-black dark:text-white'>
                        Anthony Douglas
                    </div>
                    <p className='mt-[2px] text-sm leading-sm text-black-8 dark:text-white-9'>
                        65 friends | 1.5k members
                    </p>
                </div>
                <Members />
            </div>
        </Wrapper>
    );
};

export default Group;
