import { ReactNode } from 'react';
import ScrollbarWrapper from './scrollbar/ScrollbarWrapper';
import Card from './card/Card';

const Page = ({
    children,
    scrollChildren,
    scrollWidth,
}: {
    children: ReactNode;
    scrollChildren: ReactNode;
    scrollWidth: string;
}) => {
    return (
        <div className="flex gap-5 overscroll-y-auto pl-5 pb-5">
            <div
                className={'flex flex-col gap-5 overflow-auto flex-1'}
                style={{ paddingRight: `calc(${scrollWidth} + 20px)` }}
            >
                {children}
            </div>
            <ScrollbarWrapper style={{ width: scrollWidth }}>
                {scrollChildren}
            </ScrollbarWrapper>
        </div>
    );
};

export default Page;
