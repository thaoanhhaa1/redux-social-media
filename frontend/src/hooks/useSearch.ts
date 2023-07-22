import { ChangeEvent, useState } from 'react';

function useSearch() {
    const [value, setValue] = useState('');

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        setValue,
        handleChangeSearch,
    };
}

export default useSearch;
