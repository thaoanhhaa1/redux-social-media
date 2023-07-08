import { MemoExoticComponent } from 'react';

interface IRoute {
    path: string;
    element: (() => JSX.Element) | MemoExoticComponent<() => JSX.Element>;
    layout?: (() => JSX.Element) | null;
}

export default IRoute;
