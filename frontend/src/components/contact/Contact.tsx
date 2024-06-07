import { memo } from 'react';
import { Link } from 'react-router-dom';
import IContact from '../../interfaces/IContact';
import { classNames, getTime } from '../../utils';
import { ClockIcon } from '../Icons';
import Image from '../Image';

const ONE_DAY_MILLISECONDS = 86400000;

const Contact = ({
    contact,
    className = '',
}: {
    contact: IContact;
    className?: string;
}) => {
    const timeString = contact.offline
        ? new Date().getTime() - new Date(contact.offline).getTime() >=
          ONE_DAY_MILLISECONDS
            ? ''
            : getTime(new Date(contact.offline))
        : 'online';

    return (
        <Link
            to={`/${contact.username}`}
            className={classNames(
                'p-2 flex gap-4 cursor-pointer rounded-2.5 hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all',
                className,
            )}
        >
            <Image
                alt=''
                src={contact.avatar}
                className='w-8.5 h-8.5'
                rounded
            />
            <div className='flex-1 flex justify-between items-center'>
                <p className='font-semibold leading-base dark:text-white'>
                    {contact.name || contact.username}
                </p>
                <div className='flex gap-2 items-center'>
                    {timeString && contact.offline && (
                        <ClockIcon className='fill-white-45 dark:fill-white-9' />
                    )}
                    {!contact.offline && (
                        <span className='inline-block w-2.5 h-2.5 bg-blue-black-2 rounded-full'></span>
                    )}
                    <span className='font-semibold text-sm leading-sm text-black-8 dark:text-white-9'>
                        {timeString}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default memo(Contact);
