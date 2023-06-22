const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <p className="font-medium text-sm leading-sm text-red-white-1 dark:text-red-black-1">
            {message}
        </p>
    );
};

export default ErrorMessage;
