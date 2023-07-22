import {
    CSSProperties,
    ReactNode,
    UIEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
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

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        setScrollThumbTop((element.scrollTop * offsetHeight) / scrollHeight);
    };

    useEffect(() => {
        if (!ref.current) return;

        const element: HTMLDivElement = ref.current;
        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;

        setOffsetHeight(offsetHeight);
        setScrollHeight(scrollHeight);
        setScrollThumbHeight(offsetHeight ** 2 / scrollHeight);
    });

    return (
        <div className='relative'>
            <div
                ref={ref}
                onScroll={handleScroll}
                className={classNames('scrollbar', className)}
                style={style}
            >
                {children}
            </div>
            <div className='absolute top-0 left-0 h-full w-4 bg-red'>
                <div
                    style={{
                        height: `${scrollThumbHeight}px`,
                        top: `${scrollThumbTop}px`,
                    }}
                    className='absolute top-0 left-1 w-2 h-4 bg-white'
                />
            </div>
        </div>
    );
};

export default ScrollbarCustomize;
