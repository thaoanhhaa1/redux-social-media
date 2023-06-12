import { classNames } from '../../utils';

const CardButton = ({
    icon,
    active = false,
}: {
    icon: JSX.Element;
    active?: boolean;
}) => {
    return (
        <button
            className={classNames(
                'flex justify-center items-center w-7 h-7 bg-opacity-5 rounded-full',
                active
                    ? 'bg-red-white-2 dark:bg-red-white-2'
                    : 'bg-[#000] dark:bg-dark-black-3',
            )}
        >
            {icon}
        </button>
    );
};

export default CardButton;
