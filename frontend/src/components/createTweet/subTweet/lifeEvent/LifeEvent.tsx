import { memo } from 'react';
import { v4 } from 'uuid';
import { images } from '../../../../assets';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import Image from '../../../Image';
import ScrollbarCustomize from '../../../ScrollbarCustomize';
import Header from '../../Header';
import LifeEventItem from './LifeEventItem';

export interface ILifeEvent {
    title: string;
    image: string;
}

const lifeEvents: ILifeEvent[] = [
    {
        title: 'Work',
        image: images.work,
    },
    {
        title: 'Work',
        image: images.work,
    },
    {
        title: 'Work',
        image: images.work,
    },
    {
        title: 'Work',
        image: images.work,
    },
];

const LifeEvent = () => {
    const { handleHiddenSub } = useCreateTweet();

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Create life event
            </Header>
            <ScrollbarCustomize>
                <Image
                    src={images.backgroundLifeEvent}
                    alt=''
                    className='mt-4 h-[150px]'
                />
                <div className='mt-1.5 font-bold text-center text-xl leading-xl'>
                    Life events
                </div>
                <p className='mt-1.5 font-medium text-center text-[#65676B] text-sm leading-sm'>
                    Share and remember important moments from your life.
                </p>
                <div className='my-10 mx-4 h-[1px] bg-[#CED0D4]' />
                <div className='font-medium text-center uppercase'>
                    SELECT A CATEGORY
                </div>
                <div className='grid grid-cols-4 gap-2 pt-9 pb-4 px-3'>
                    {lifeEvents.map((item) => (
                        <LifeEventItem item={item} key={v4()} />
                    ))}
                </div>
            </ScrollbarCustomize>
        </>
    );
};

export default memo(LifeEvent);
