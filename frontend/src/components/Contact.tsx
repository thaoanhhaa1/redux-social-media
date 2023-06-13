import { classNames } from '../utils';
import { ClockIcon } from './Icons';
import Image from './Image';

const Contact = ({
    isOnline,
    className = '',
}: {
    isOnline: boolean;
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'p-2 flex gap-4 cursor-pointer rounded-2.5 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)] transition-all',
                className,
            )}
        >
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                className="w-[34px] h-[34px] rounded-full"
            />
            <div className="flex-1 flex justify-between items-center">
                <p className="font-semibold leading-base dark:text-white">
                    Anterio franci
                </p>
                <div className="flex gap-2 items-center">
                    {(isOnline && (
                        <span className="inline-block w-[10px] h-[10px] bg-blue-black-2 rounded-full"></span>
                    )) || (
                        <ClockIcon className="fill-white-45 dark:fill-white-9" />
                    )}
                    <span className="font-semibold text-sm leading-sm text-black-8 dark:text-white-9">
                        {isOnline ? 'online' : '9.30 AM'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
