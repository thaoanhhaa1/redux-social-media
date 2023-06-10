const CardButton = ({ icon }: { icon: JSX.Element }) => {
    return (
        <button className="flex justify-center items-center w-7 h-7 bg-[#000] bg-opacity-5 rounded-full">
            {icon}
        </button>
    );
};

export default CardButton;
