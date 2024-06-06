import { useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';

const useFocusTab = () => {
    const { value, setTrue, setFalse } = useBoolean(true);

    useEffect(() => {
        window.addEventListener('focus', setTrue);
        window.addEventListener('blur', setFalse);
        return () => {
            window.removeEventListener('focus', setTrue);
            window.removeEventListener('blur', setFalse);
        };
    }, [setFalse, setTrue]);

    return value;
};

export default useFocusTab;
