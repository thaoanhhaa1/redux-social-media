import { ReactNode } from 'react';
import ScrollbarCustomize from './ScrollbarCustomize';

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
        <div className='flex gap-5 px-5'>
            <div className='flex-1 overflow-hidden'>
                <div className='max-w-[680px] w-full mx-auto flex flex-col gap-5 pb-5'>
                    {children}
                </div>
            </div>
            <ScrollbarCustomize
                style={{
                    width: scrollWidth,
                    minHeight: scrollHeight,
                    top: '95px',
                }}
                className='flex flex-col gap-5 max-h-0 sticky overflow-y-auto pb-5'
            >
                {scrollChildren}
            </ScrollbarCustomize>
        </div>
    );
};

export default Page;
