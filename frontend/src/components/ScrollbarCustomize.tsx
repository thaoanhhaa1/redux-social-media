import {
    CSSProperties,
    MouseEvent,
    ReactNode,
    UIEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { classNames } from '../utils';

const ScrollbarCustomize = ({
    className = '',
    style = {},
    children,
}: {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}) => {
    const ref = useRef(null);
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [scrollThumbHeight, setScrollThumbHeight] = useState(0);
    const [scrollThumbTop, setScrollThumbTop] = useState(0);
    const contacts = useSelector((state: RootState) => state.contacts);
    const [selectThumb, setSelectThumb] = useState(false);
    const [selectClientY, setSelectClientY] = useState(0);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const element = e.target as HTMLDivElement;
        const elementScroll: HTMLDivElement = ref.current;
        const scrollTop = element.scrollTop;

        elementScroll.scrollTop = scrollTop;
        setScrollThumbTop((element.scrollTop * offsetHeight) / scrollHeight);
    };

    const handleClickTrack = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const elementTrack = e.target as HTMLDivElement;
        const element: HTMLDivElement = ref.current;
        const top = element.getBoundingClientRect().top;
        const positionClick = e.clientY - top;
        let scrollThumbTopNew;

        if (positionClick < scrollThumbTop)
            scrollThumbTopNew = Math.max(0, scrollThumbTop - 50);
        else if (positionClick > scrollThumbTop + scrollThumbHeight)
            scrollThumbTopNew = Math.min(
                scrollThumbTop + 50,
                offsetHeight - scrollThumbHeight,
            );
        else return;

        element.scrollTop = (scrollThumbTopNew * scrollHeight) / offsetHeight;
        elementTrack.scrollTop =
            (scrollThumbTopNew * scrollHeight) / offsetHeight;
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const element: HTMLDivElement = ref.current;
        const top = element.getBoundingClientRect().top;
        const positionClick = e.clientY - top;

        if (
            positionClick >= scrollThumbTop &&
            positionClick <= scrollThumbTop + scrollThumbHeight
        ) {
            setSelectThumb(true);
            setSelectClientY(e.clientY);
        }
    };

    useEffect(() => {
        const handleMouseUp = () => {
            setSelectThumb(false);
        };

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!ref.current) return;
            let scroll = e.clientY - selectClientY;
            const elementTrack = e.target as HTMLDivElement;
            const element: HTMLDivElement = ref.current;

            if (scroll < 0) scroll = 0;
            else if (scroll > offsetHeight - scrollThumbHeight)
                scroll = offsetHeight - scrollThumbHeight;

            element.scrollTop = (scroll * scrollHeight) / offsetHeight;
            elementTrack.scrollTop = (scroll * scrollHeight) / offsetHeight;
        };

        if (selectThumb) {
            document.body.addEventListener('mouseup', handleMouseUp);
            document.body.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.body.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, [
        offsetHeight,
        scrollHeight,
        scrollThumbHeight,
        selectClientY,
        selectThumb,
    ]);

    useEffect(() => {
        if (!ref.current) return;

        const element: HTMLDivElement = ref.current;
        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;

        setOffsetHeight(offsetHeight);
        setScrollHeight(scrollHeight);
        setScrollThumbHeight(offsetHeight ** 2 / scrollHeight);
    }, [contacts]);

    return (
        <div className='relative group/scrollbar'>
            <div
                ref={ref}
                onScroll={handleScroll}
                className={classNames('scrollbar', className)}
                style={style}
            >
                {children}
            </div>
            {scrollHeight > offsetHeight && (
                <>
                    <div
                        onClick={handleClickTrack}
                        onScroll={handleScroll}
                        onMouseDown={handleMouseDown}
                        className='scrollbar scrollbar--track overflow-auto absolute right-0 top-0 bottom-0 w-4 bg-[#CED0D4] bg-opacity-0 hover:bg-opacity-30 ease-linear duration-300'
                    >
                        <div
                            className='w-full'
                            style={{ height: `${scrollHeight}px` }}
                        ></div>
                    </div>
                    <div
                        style={{
                            height: `${scrollThumbHeight}px`,
                            top: `${scrollThumbTop}px`,
                        }}
                        className={classNames(
                            'pointer-events-none scrollbar--thumb absolute top-0 right-0 px-1 w-4 h-4 opacity-0 group-hover/scrollbar:opacity-100 group-hover/scrollbar:delay-0 delay-500 duration-100 transition-opacity ease-linear',
                            selectThumb && '!opacity-100',
                        )}
                    >
                        <div className='w-full h-full rounded bg-[#BCC0C9]' />
                    </div>
                </>
            )}
        </div>
    );
};

export default ScrollbarCustomize;
