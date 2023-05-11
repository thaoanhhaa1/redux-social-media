import Image from './Image';

const Story = () => {
    return (
        <div className="cursor-pointer flex-shrink-0 w-[110px] aspect-[9/16] rounded-lg overflow-hidden group">
            <Image
                className="select-none group-hover:scale-110 transition-all ease-linear"
                src="https://cdn.dribbble.com/users/175166/screenshots/15796960/media/f373d333ff0c597f454ad0ae05526abb.jpg?compress=1&resize=1000x750&vertical=top"
                alt=""
            />
        </div>
    );
};

export default Story;
