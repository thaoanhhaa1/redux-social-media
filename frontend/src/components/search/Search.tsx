import SearchItem from './SearchItem';

const Search = () => {
    return (
        <div className="absolute left-0 w-full top-[calc(100%_+_8px)] p-2 bg-white dark:bg-dark-black-1 rounded-2.5 shadow-[0px_2px_12px_rgba(0,0,0,0.2)]">
            <div className="mb-2 font-semibold">Recent</div>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
        </div>
    );
};

export default Search;
