import IContact from '../interfaces/IContact';
import { classNames, getTime } from '../utils';
import { ClockIcon } from './Icons';
import Image from './Image';

const Contact = ({
    contact,
    className = '',
}: {
    contact: IContact;
    className?: string;
}) => {
    return (
        <div
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
                    {(contact.offline && (
                        <ClockIcon className='fill-white-45 dark:fill-white-9' />
                    )) || (
                        <span className='inline-block w-2.5 h-2.5 bg-blue-black-2 rounded-full'></span>
                    )}
                    <span className='font-semibold text-sm leading-sm text-black-8 dark:text-white-9'>
                        {contact.offline
                            ? getTime(new Date(contact.offline))
                            : 'online'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
