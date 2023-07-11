import { CSSProperties, ReactNode, useLayoutEffect, useRef } from 'react';
import useScroll from '../../contexts/ScrollContext';
import { classNames } from '../../utils';
import Scrollbar from './Scrollbar';
import ScrollbarThumb from './ScrollbarThumb';

const ScrollbarWrapper = ({
    children,
    className = '',
    style = {},
    ...props
}: {
    children: ReactNode;
    className?: string;
    style: CSSProperties;
}) => {
    const parentScrollbarRef = useRef<HTMLDivElement>(null);
    const {
        clientHeight,
        offsetWidth,
        offsetLeft,
        top,
        setClientHeight,
        setHeight,
        setOffsetLeft,
        setOffsetTop,
        setOffsetWidth,
        setTop,
    } = useScroll();

    useLayoutEffect(() => {
        const parentElement = parentScrollbarRef.current;

        setHeight(parentElement?.scrollHeight || 0);
        setClientHeight(parentElement?.clientHeight || 0);
        setOffsetWidth(parentElement?.offsetWidth || 0);
        setOffsetTop(parentElement?.offsetTop || 0);
        setOffsetLeft(parentElement?.offsetLeft || 0);

        const handleScroll = () => setTop(parentElement?.scrollTop || 0);

        parentElement?.addEventListener('scroll', handleScroll);

        return () => parentElement?.removeEventListener('scroll', handleScroll);
    }, [
        parentScrollbarRef,
        setClientHeight,
        setHeight,
        setOffsetLeft,
        setOffsetTop,
        setOffsetWidth,
        setTop,
    ]);

    return (
        <Scrollbar>
            <div ref={parentScrollbarRef} style={style}>
                <div
                    {...props}
                    style={{
                        top: `${top}px`,
                        left: `${offsetLeft + offsetWidth - 16}px`,
                        height: `${clientHeight}px`,
                    }}
                    className={classNames(
                        'group fixed flex flex-shrink-0 hidden-scrollbar overflow-y-auto flex-col gap-5 pb-5',
                        className,
                    )}
                >
                    {children}
                    <ScrollbarThumb />
                </div>
            </div>
        </Scrollbar>
    );
};

export default ScrollbarWrapper;
