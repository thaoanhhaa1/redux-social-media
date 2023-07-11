import useScroll from '../../contexts/ScrollContext';

// ! BUG: Khi Image chưa load xong thì scrollHeight return kết quả sai

const ScrollbarThumb = () => {
    const { height, clientHeight, offsetWidth, offsetTop, offsetLeft, top } =
        useScroll();

    return (
        <div
            style={{
                top: `${offsetTop}px`,
                height: `${clientHeight}px`,
                left: `${offsetLeft + offsetWidth - 16}px`,
            }}
            className='scrollbar hover:bg-opacity-30 dark:hover:bg-opacity-30 ease-linear duration-300 fixed w-4 bg-[#CED0D4] dark:bg-[#3e4042] bg-opacity-0 dark:bg-opacity-0 rounded-2.5 px-1'
        >
            <div
                style={{
                    marginTop: `${(top / height) * clientHeight}px`,
                    height: `${clientHeight ** 2 / height}px`,
                }}
                className='group-hover:bg-opacity-100 dark:group-hover:bg-opacity-30 bg-[#bcc0c4] dark:bg-[#ffffff] bg-opacity-0 dark:bg-opacity-0 rounded'
            ></div>
        </div>
    );
};

export default ScrollbarThumb;
