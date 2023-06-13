import { Link } from 'react-router-dom';
import { classNames } from '../../utils';

const WrapperHeader = ({
    title,
    titleLink,
    to,
    className = '',
}: {
    title: string;
    titleLink: string;
    to: string;
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'flex items-center justify-between font-semibold',
                className,
            )}
        >
            <span className="text-black dark:text-white">{title}</span>
            <Link className="text-sm text-blue leading-sm" to={to}>
                {titleLink}
            </Link>
        </div>
    );
};

export default WrapperHeader;
