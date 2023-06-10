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
        <div className="flex items-center justify-between">
            <span className="text-base text-black leading-[19px]">{title}</span>
            <Link className="text-sm text-blue leading-[17px]" to={to}>
                {titleLink}
            </Link>
        </div>
    );
};

export default WrapperHeader;
