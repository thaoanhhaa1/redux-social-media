import { ReactElement, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createPortalWrapper = () => {
    const element = document.createElement('div');
    element.id = 'portal-wrapper';

    return element;
};

const portalWrapper = createPortalWrapper();
const Portal = ({ children }: { children: ReactElement }) => {
    useLayoutEffect(() => {
        document.body.appendChild(portalWrapper);
    }, []);

    return createPortal(children, portalWrapper);
};

export default Portal;
