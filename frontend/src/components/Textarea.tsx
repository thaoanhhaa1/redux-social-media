import TextareaAutosize from 'react-textarea-autosize';

const Textarea = ({ placeholder = '' }: { placeholder: string }) => {
    return (
        <TextareaAutosize
            placeholder={placeholder}
            className="max-h-[102px] flex-1 font-medium text-sm leading-sm text-black-8 outline-none resize-none self-center"
        />
    );
};

export default Textarea;
