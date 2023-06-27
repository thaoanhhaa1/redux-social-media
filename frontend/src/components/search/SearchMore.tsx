import { Link } from 'react-router-dom';
import config from '../../config';
import { SearchIcon } from '../Icons';

const SearchMore = ({ value }: { value: string }) => {
    return (
        <Link
            to={config.routes.search}
            className="cursor-pointer group/close flex items-center gap-5 p-2 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 ease-linear duration-300"
        >
            <span className="flex justify-center items-center w-9 h-9 bg-blue text-white rounded-full">
                <SearchIcon className="w-4 h-4" />
            </span>
            <div className="flex-1 text-blue">
                Search for <span className="font-semibold">{value}</span>
            </div>
        </Link>
    );
};

export default SearchMore;
