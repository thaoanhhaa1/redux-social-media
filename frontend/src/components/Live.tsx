import Image from './Image';

const Live = () => {
    return (
        <div className="relative aspect-video rounded-2.5 overflow-hidden">
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                className=""
            />
            <div className="text-white font-semibold absolute bottom-0 left-0 right-0 px-5 py-7 bg-[linear-gradient(180deg,_rgba(69,_69,_69,_0)_0%,_#333333_100%)]">
                <span className="drop-shadow-[0px_24px_80px_rgba(0,_0,_0,_0.1)]">
                    Movie.Live
                </span>
                <p className="mt-2 text-xl drop-shadow-[0px_24px_80px_rgba(0,_0,_0,_0.1)]">
                    Catherine called Birdy Twitter watch party
                </p>
            </div>
        </div>
    );
};

export default Live;
