import Image from '../../../Image';
import { ILifeEvent } from './LifeEvent';

const LifeEventItem = ({ item }: { item: ILifeEvent }) => {
    return (
        <div className='aspect-square flex flex-col justify-center items-center rounded hover:bg-black-opacity-05 transition-all cursor-pointer'>
            <Image className='w-8 h-8' src={item.image} alt='' />
            <span className='mt-3 text-xs leading-xs'>{item.title}</span>
        </div>
    );
};

export default LifeEventItem;
