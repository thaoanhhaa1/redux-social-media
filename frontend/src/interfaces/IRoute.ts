interface IRoute {
    path: string;
    element: () => JSX.Element;
    layout?: (() => JSX.Element) | null;
}

export default IRoute;
