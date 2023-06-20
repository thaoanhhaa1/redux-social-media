import { PinActiveIcon, PinIcon } from './Icons';
import Image from './Image';

const List = ({ isPinned = false }: { isPinned?: boolean }) => {
    return (
        <div className="p-5 cursor-pointer hover:bg-blue-white-4 dark:hover:bg-dark-black-3 rounded-2.5">
            <div className="font-semibold text-sm leading-sm text-black-1 dark:text-white">
                Grandslammers
            </div>
            <div className="mt-1.25 flex items-center gap-1.25">
                <Image
                    alt=""
                    src="https://plus.unsplash.com/premium_photo-1666700698946-fbf7baa0134a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80"
                    className="w-10 h-10"
                    rounded
                />
                <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
                    <span className="text-black-1 dark:text-white font-semibold text-sm leading-sm">
                        md mahmudul
                    </span>{' '}
                    <span className="text-black-8 dark:text-white-2 font-medium text-xs leading-xs">
                        @mahmudul
                    </span>
                </div>
                {(isPinned && (
                    <PinActiveIcon className="text-black-100 dark:text-white" />
                )) || <PinIcon className="text-black-100 dark:text-white" />}
            </div>
        </div>
    );
};

export default List;
