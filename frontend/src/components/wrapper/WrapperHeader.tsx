import { Link } from 'react-router-dom';

const WrapperHeader = ({
    title,
    titleLink,
    to,
}: {
    title: string;
    titleLink: string;
    to: string;
}) => {
    return (
        <div className="flex items-center justify-between font-semibold">
            <span className="text-black dark:text-white">{title}</span>
            <Link className="text-sm text-blue leading-sm" to={to}>
                {titleLink}
            </Link>
        </div>
    );
};

export default WrapperHeader;
