const Loading = () => {
    return (
        <div className='absolute inset-0 bg-black bg-opacity-5 backdrop-blur-[1px] flex justify-center items-center'>
            <div className='w-10 h-10 border-4 rounded-full border-blue border-t-transparent animate-spin'></div>
        </div>
    );
};

export default Loading;
