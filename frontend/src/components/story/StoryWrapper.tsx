import { ReactElement } from 'react';
import { classNames } from '../../utils';

const StoryWrapper = ({
    children,
    className = '',
    onClick = () => {},
}: {
    children: ReactElement;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <div
            className={classNames(
                'cursor-pointer flex-shrink-0 w-[110px] aspect-[9/16] rounded-lg overflow-hidden group snap-start snap-always',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default StoryWrapper;
