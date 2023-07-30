import { CSSProperties, LegacyRef, ReactNode, forwardRef } from 'react';
import { classNames } from '../../utils';

interface IWrapper {
    className?: string;
    children: ReactNode;
    gap?: string;
    style?: CSSProperties;
    isRow?: boolean;
}

const Wrapper = (
    { className = '', children, gap = '5', isRow = false, ...props }: IWrapper,
    ref: LegacyRef<HTMLDivElement> | undefined,
) => {
    return (
        <div
            ref={ref}
            className={classNames(
                'bg-white dark:bg-dark-black-2 rounded-2.5 flex',
                isRow || 'flex-col',
                `gap-2 xxs:gap-${gap}`,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default forwardRef(Wrapper);
