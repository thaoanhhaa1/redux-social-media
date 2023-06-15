import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IScrollContext } from '../interfaces';

const ScrollContext = createContext<IScrollContext>({
    height: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetTop: 0,
    offsetLeft: 0,
    top: 0,
    setHeight: () => {},
    setClientHeight: () => {},
    setOffsetWidth: () => {},
    setOffsetTop: () => {},
    setOffsetLeft: () => {},
    setTop: () => {},
});

function ScrollProvider(props: PropsWithChildren) {
    const [height, setHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [offsetTop, setOffsetTop] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [top, setTop] = useState(0);

    return (
        <ScrollContext.Provider
            value={{
                height,
                clientHeight,
                offsetWidth,
                offsetTop,
                offsetLeft,
                top,
                setHeight,
                setClientHeight,
                setOffsetWidth,
                setOffsetTop,
                setOffsetLeft,
                setTop,
            }}
            {...props}
        />
    );
}

function useScroll() {
    const value = useContext(ScrollContext);

    return value;
}

export default useScroll;
export { ScrollProvider };
