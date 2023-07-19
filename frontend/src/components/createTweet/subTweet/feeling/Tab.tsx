import { Dispatch, ReactNode, SetStateAction } from 'react';
import { classNames } from '../../../../utils';

const Tab = ({
    children,
    active,
    setTabActive,
}: {
    children: ReactNode;
    active: boolean;
    setTabActive: Dispatch<SetStateAction<'Feelings' | 'Activities'>>;
}) => {
    return (
        <div
            onClick={() => setTabActive(children as 'Feelings' | 'Activities')}
            className={classNames(
                'relative px-4 leading-[60px] font-semibold transition-all rounded-lg cursor-pointer',
                active
                    ? 'text-blue'
                    : 'text-[#65676B] hover:bg-black-opacity-05',
            )}
        >
            {children}
            {active && (
                <div
                    className={classNames(
                        'absolute bottom-0 left-0 right-0 h-[3px] bg-blue rounded-t-[1px]',
                    )}
                />
            )}
        </div>
    );
};

export default Tab;
