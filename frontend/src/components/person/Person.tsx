import { IPerson } from '../../interfaces';
import { classNames } from '../../utils';
import Avatar from '../Avatar';
import Button from '../Button';

const Person = ({
    active,
    user,
    buttonTitle,
    buttonClassName,
    isLoading,
    onClick = () => {},
}: {
    active?: boolean;
    user: IPerson;
    isLoading?: boolean;
    buttonTitle: string;
    buttonClassName?: string;
    onClick?: () => void;
}) => {
    return (
        <div className='flex gap-5 cursor-pointer bg-white dark:bg-dark-black-2'>
            <Avatar src={user.avatar} size='lg' />
            <div className='flex-1 flex justify-between items-center gap-2'>
                <div className='flex-1'>
                    <div className='font-semibold text-sm leading-sm text-black dark:text-white'>
                        {user.name || user.username}
                    </div>
                    <div className='font-semibold text-xs leading-sm text-black-8 dark:text-white'>
                        @{user.username}
                    </div>
                </div>
                <Button
                    isLoading={isLoading}
                    onClick={onClick}
                    className={classNames(
                        'text-white text-xs leading-xs w-[86px] h-8.5',
                        active ? 'bg-blue' : 'bg-black dark:bg-dark-black-1',
                        buttonClassName,
                    )}
                >
                    {buttonTitle}
                </Button>
            </div>
        </div>
    );
};

export default Person;
