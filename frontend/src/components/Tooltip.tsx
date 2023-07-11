import { ReactNode } from 'react';

const Tooltip = ({
    tooltip,
    children,
}: {
    tooltip: string;
    children: ReactNode;
}) => {
    return (
        <div className='relative group cursor-pointer'>
            {children}
            <div className='whitespace-nowrap group-hover:visible group-hover:opacity-100 transition-all invisible opacity-0 select-none pointer-events-none absolute -top-[2px] left-2/4 -translate-x-2/4 -translate-y-full px-3 py-2 bg-[rgba(11,_11,_11,_0.8)] text-xs leading-xs text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.5)] rounded-2.5'>
                {tooltip}
            </div>
        </div>
    );
};

export default Tooltip;
