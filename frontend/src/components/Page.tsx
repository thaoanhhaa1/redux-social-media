import { ReactNode } from 'react';

const Page = ({
    children,
    scrollChildren,
    scrollWidth,
    scrollHeight,
}: {
    children: ReactNode;
    scrollChildren: ReactNode;
    scrollWidth: string;
    scrollHeight: string;
}) => {
    return (
        <div className="flex gap-5 px-5">
            <div className="flex flex-col gap-5 overflow-auto flex-1 pb-5">
                {children}
            </div>
            <div
                style={{
                    width: scrollWidth,
                    minHeight: scrollHeight,
                    top: '95px',
                }}
                className="flex flex-col gap-5 max-h-0 sticky overflow-y-auto pb-5"
            >
                {scrollChildren}
            </div>
        </div>
    );
};

export default Page;
