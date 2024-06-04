import { PropsWithChildren, createContext, useContext } from 'react';

interface IModalContext {
    handleClose: () => void;
}

const ModalContext = createContext<IModalContext>({
    handleClose: () => {},
});

const ModalProvider = ({
    value,
    ...props
}: { value: IModalContext } & PropsWithChildren) => {
    return <ModalContext.Provider value={value} {...props} />;
};

const useModel = () => useContext(ModalContext);

export { ModalProvider, useModel };
