import { CSSProperties, ReactNode, useRef } from 'react';
import Scrollbar from './Scrollbar';
import { classNames } from '../../utils';

const ScrollbarWrapper = ({
    children,
    className = '',
    ...props
}: {
    children: ReactNode;
    className?: string;
    style: CSSProperties;
}) => {
    const parentScrollbarRef = useRef<HTMLDivElement>(null);

    return (
        <div
            {...props}
            ref={parentScrollbarRef}
            className={classNames(
                'group fixed flex t-[calc(var(--top-bar-height)+20px)] right-0 flex-shrink-0 h-[calc(100vh-var(--top-bar-height)-20px)] hidden-scrollbar overflow-y-auto flex-col gap-5 pb-5',
                className,
            )}
        >
            {children}
            <Scrollbar parentRef={parentScrollbarRef} />
        </div>
    );
};

export default ScrollbarWrapper;
