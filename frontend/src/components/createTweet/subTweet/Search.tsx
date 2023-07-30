import { ChangeEvent } from 'react';
import { SearchIcon } from '../../Icons';

const Search = ({
    value,
    placeholder = '',
    handleChangeSearch,
}: {
    value: string;
    placeholder?: string;
    handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className='flex flex-1 items-center pl-2.5 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full overflow-hidden'>
            <SearchIcon className='text-[#65676b] dark:text-[#b0b3b8]' />
            <input
                value={value}
                onChange={handleChangeSearch}
                placeholder={placeholder}
                type='text'
                className='flex-1 p-1.5 bg-[#F0F2F5] dark:bg-[#3A3B3C] border-none outline-none text-[#050505] dark:text-[#E4E6EB] placeholder:text-[#65676b] dark:placeholder:text-[#b0b3b8]'
            />
        </div>
    );
};

export default Search;
