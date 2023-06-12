import { RefObject, useLayoutEffect, useState } from 'react';

// ! BUG: Khi Image chưa load xong thì scrollHeight return kết quả sai

const Scrollbar = ({ parentRef }: { parentRef: RefObject<HTMLDivElement> }) => {
    const [height, setHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [top, setTop] = useState(0);

    useLayoutEffect(() => {
        const parentElement = parentRef.current;

        setHeight(parentElement?.scrollHeight || 0);
        setClientHeight(parentElement?.clientHeight || 0);

        const handleScroll = () => setTop(parentElement?.scrollTop || 0);

        parentElement?.addEventListener('scroll', handleScroll);

        return () => parentElement?.removeEventListener('scroll', handleScroll);
    }, [parentRef]);

    return (
        <div className="scrollbar hover:bg-opacity-30 dark:hover:bg-opacity-30 ease-linear duration-300 fixed top-[calc(var(--top-bar-height)+20px)] bottom-0 right-0 w-4 bg-[#CED0D4] dark:bg-[#3e4042] bg-opacity-0 dark:bg-opacity-0 rounded-[10px] px-1">
            <div
                style={{
                    marginTop: `${(top / height) * clientHeight}px`,
                    height: `${clientHeight ** 2 / height}px`,
                }}
                className="group-hover:bg-opacity-100 dark:group-hover:bg-opacity-30 bg-[#bcc0c4] dark:bg-[#ffffff] bg-opacity-0 dark:bg-opacity-0 rounded"
            ></div>
        </div>
    );
};

export default Scrollbar;
