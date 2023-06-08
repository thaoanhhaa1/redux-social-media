import { ReactElement } from 'react';
import { classNames } from '../../utils';

const StoryWrapper = ({
    children,
    className = '',
}: {
    children: ReactElement;
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'cursor-pointer flex-shrink-0 w-[110px] aspect-[9/16] rounded-lg overflow-hidden group snap-start snap-always',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default StoryWrapper;
