const TrendItem = () => {
    return (
        <div className="cursor-pointer rounded-2.5 p-2 -mx-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all">
            <div className="flex flex-col gap-[2px]">
                <div className="text-xs leading-xs text-stroke-icon dark:text-[#736F72]">
                    Trending
                </div>
                <div className="font-bold text-base-black dark:text-white">
                    Burnol
                </div>
                <div className="font-semibold text-sm leading-sm text-stroke-icon dark:text-[#736F72]">
                    1,956 Tweets
                </div>
            </div>
            <button className="-ml-1 p-1 text-base-black dark:text-white">
                ...
            </button>
        </div>
    );
};

export default TrendItem;
