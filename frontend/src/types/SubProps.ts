import { MemoExoticComponent } from 'react';

type SubProps = MemoExoticComponent<() => JSX.Element> | undefined;

export default SubProps;
