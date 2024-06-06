import React, { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { setActiveId, togglePin } from '../features/lists';
import { IList } from '../interfaces';
import { classNames } from '../utils';
import { PinActiveIcon, PinIcon } from './Icons';
import Image from './Image';

const List = ({ list }: { list: IList }) => {
    const Icon: React.ElementType = list.isPin ? PinActiveIcon : PinIcon;
    const { activeId } = useAppSelector((state: RootState) => state.lists);
    const dispatch = useAppDispatch();

    const handleChangeList = () => dispatch(setActiveId(list._id));

    const handleTogglePin = async (e: MouseEvent) => {
        e.stopPropagation();

        try {
            await dispatch(togglePin({ userId: list._id, isPin: !list.isPin }));
        } catch (error) {
            toast.error('Failed to toggle pin');
        }
    };

    return (
        <div
            onClick={handleChangeList}
            className={classNames(
                'p-2 xxs:p-3 xs:p-4 dl:p-5 cursor-pointer hover:bg-blue-white-4 dark:hover:bg-dark-black-3 rounded-2.5',
                activeId === list._id && 'bg-blue-white-4 dark:bg-dark-black-3',
            )}
        >
            <div className='mt-1.25 flex items-center gap-1.25'>
                <Image alt='' src={list.avatar} className='w-10 h-10' rounded />
                <div className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>
                    <span className='text-black-1 dark:text-white font-semibold text-sm leading-sm'>
                        {list.name}
                    </span>{' '}
                    <span className='text-black-8 dark:text-white-2 font-medium text-xs leading-xs'>
                        @{list.username}
                    </span>
                </div>
                <button onClick={handleTogglePin}>
                    <Icon className='text-black-100 dark:text-white' />
                </button>
            </div>
        </div>
    );
};

export default List;
