import { ChangeEvent } from 'react';
import { SearchIcon } from '../../../Icons';

const Search = ({
    value,
    handleChangeSearch,
}: {
    value: string;
    handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className='flex flex-1 items-center pl-2.5 bg-[#F0F2F5] rounded-full overflow-hidden'>
            <SearchIcon className='text-[#65676b]' />
            <input
                value={value}
                onChange={handleChangeSearch}
                placeholder='Search'
                type='text'
                className='flex-1 p-1.5 bg-[#F0F2F5] border-none outline-none text-[#050505] placeholder:text-[#65676b]'
            />
        </div>
    );
};

export default Search;
