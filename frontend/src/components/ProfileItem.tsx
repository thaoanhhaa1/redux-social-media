const ProfileItem = ({
    title,
    number,
    color,
}: {
    title: string;
    number: number;
    color: string;
}) => {
    return (
        <div className="relative w-[112px] h-[85px] text-center rounded-2.5 shadow-[0px_10px_10px_rgba(0,_0,_0,_0.25)]">
            <span className="inline-block mt-2 font-semibold text-3xl text-black-1 dark:text-white">
                {number}
            </span>
            <br />
            <span className="inline-block mt-4 font-semibold text-sm leading-sm text-black-8 dark:text-white">
                {title}
            </span>
            <div
                className="absolute bottom-0 left-0 right-0 h-[6px] rounded-bl-2.5 rounded-br-2.5 shadow-[0px_24px_80px_-20px_rgba(3,_183,_154,_0.1)]"
                style={{ backgroundColor: `var(${color})` }}
            ></div>
        </div>
    );
};

export default ProfileItem;
