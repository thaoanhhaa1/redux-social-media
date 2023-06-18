import Image from './Image';

const BookmarkItem = () => {
    return (
        <div className="flex gap-5 p-5 cursor-pointer hover:bg-blue-white-4 dark:hover:bg-dark-black-3 rounded-2.5">
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1686903430777-279ba0f25e7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                className="h-10 w-10"
                rounded
            />
            <div className="flex justify-between items-center gap-2 flex-1 overflow-auto">
                <div className="overflow-hidden">
                    <div className="font-semibold text-sm leading-sm text-black dark:text-white">
                        Gabriele Corno
                    </div>
                    <span className="block text-ellipsis overflow-hidden mt-[5px] font-medium text-xs leading-xs text-black-8 dark:text-white-2">
                        @Gabriele_Corno
                    </span>
                </div>
                <span className="whitespace-nowrap font-medium text-xs leading-xs text-black dark:text-white">
                    200 Tweet
                </span>
            </div>
        </div>
    );
};

export default BookmarkItem;
