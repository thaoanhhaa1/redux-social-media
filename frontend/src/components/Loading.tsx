const Loading = () => {
    return (
        <div className="relative h-[calc(100vh_-_150px)] flex justify-center items-center">
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex">
                <div className="mx-3.75 w-8.75 h-3.75 rounded-lg bg-blue shadow-[0_0_10px_0_#FECDFF] dark:shadow-none -mr-4.5 origin-[center_left] animate-spin1"></div>
                <div className="mx-3.75 w-8.75 h-3.75 rounded-lg bg-blue shadow-[0_0_10px_0_#FECDFF] dark:shadow-none origin-[center_right] animate-spin2"></div>
                <div className="mx-3.75 w-8.75 h-3.75 rounded-lg bg-blue shadow-[0_0_10px_0_#FECDFF] dark:shadow-none origin-[center_right] animate-spin3"></div>
                <div className="mx-3.75 w-8.75 h-3.75 rounded-lg bg-blue shadow-[0_0_10px_0_#FECDFF] dark:shadow-none origin-[center_right] animate-spin4"></div>
            </div>
        </div>
    );
};

export default Loading;
