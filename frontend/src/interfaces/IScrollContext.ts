interface IScrollContext {
    height: number;
    clientHeight: number;
    offsetWidth: number;
    offsetTop: number;
    offsetLeft: number;
    top: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    setClientHeight: React.Dispatch<React.SetStateAction<number>>;
    setOffsetWidth: React.Dispatch<React.SetStateAction<number>>;
    setOffsetTop: React.Dispatch<React.SetStateAction<number>>;
    setOffsetLeft: React.Dispatch<React.SetStateAction<number>>;
    setTop: React.Dispatch<React.SetStateAction<number>>;
}

export default IScrollContext;
