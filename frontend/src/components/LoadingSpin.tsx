type Props = {
    size: number;
};

const LoadingSpin = ({ size }: Props) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
            className='rounded-full border-2 border-[#2365FF] border-t-transparent animate-spin'
        />
    );
};

export default LoadingSpin;
