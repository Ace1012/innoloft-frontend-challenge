import { useRef } from "react";
import { EditedProductKey, useEditDetailsContext } from "../contexts/editDetailsContext";

interface IEditTextAreaProps {
    title: EditedProductKey;
    text: string;
    cols: number;
    rows: number;
    resize?: boolean;
    className?: string;
}

const EditTextArea = ({ title, text, cols, rows, resize, className = "" }: IEditTextAreaProps) => {
    const { editedProductDispatch } = useEditDetailsContext();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function handleChange() {
        const value = textAreaRef.current!.value;

        if (value.length > 0) {
            editedProductDispatch({
                payload: {
                    [title]: value
                },
                type: title
            })
        }

    }

    return (
        <textarea
            ref={textAreaRef}
            onChange={handleChange}
            defaultValue={text}
            className={`text-sm bg-white border border-gray-300 rounded-md px-3 py-1 scroll 
        ${resize ? "resize-y" : "resize-none"} 
        ${className}`}
            cols={cols}
            rows={rows}
        />
    )
}
export default EditTextArea;