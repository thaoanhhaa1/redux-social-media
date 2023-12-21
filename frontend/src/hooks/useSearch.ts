import { ChangeEvent, useState } from 'react';

function useSearch(search: string = '') {
    const [value, setValue] = useState(search);

    const handleChangeSearch = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setValue(e.target.value);

    return {
        value,
        setValue,
        handleChangeSearch,
    };
}

export default useSearch;
