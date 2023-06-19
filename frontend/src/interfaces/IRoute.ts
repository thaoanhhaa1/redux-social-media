interface IRoute {
    path: string;
    element: () => JSX.Element;
    layout?: () => JSX.Element;
}

export default IRoute;
