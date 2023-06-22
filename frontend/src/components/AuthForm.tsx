import { ReactNode } from 'react';

const AuthForm = ({
    title,
    description,
    children,
    onSubmit,
}: {
    title: string;
    description?: string;
    children: ReactNode;
    onSubmit: () => void;
}) => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center dark:bg-dark-black-1">
            <form
                onSubmit={onSubmit}
                className="my-5 py-5 min-h-[700px] flex flex-col justify-center items-center gap-5 w-[736px] rounded-2.5 shadow-[0px_24px_80px_rgba(0,_0,_0,_0.1)] dark:bg-dark-black-2"
            >
                <h1 className="font-medium text-4xl leading-4xl text-black dark:text-white">
                    {title}
                </h1>
                {description && (
                    <p className="font-semibold text-xl leading-xl text-black-6 dark:text-white">
                        {description}
                    </p>
                )}
                {children}
            </form>
        </div>
    );
};

export default AuthForm;
