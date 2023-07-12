import { useRef } from "react";
import { TitleKey } from "./productSections/detailsSection/detailsSectionBlock";
import { TLabelProps } from "./productSections/detailsSection/renderLabels";
import { useEditDetailsContext } from "../contexts/editDetailsContext";

interface ILabelProps {
    title: TitleKey;
    item: TLabelProps;
    additional?: boolean;
    editing?: boolean;
    className?: string
}

const Label: React.FC<ILabelProps> = ({ title, item, additional, editing, className = "" }) => {
    const { editedProductDispatch } = useEditDetailsContext();

    const spanRef = useRef<HTMLSpanElement>(null);

    function handleClick() {
        if (additional) {
            editedProductDispatch({
                payload: {
                    [title]: item.name
                },
                type: "delete"
            })
        }
    }

    // Remove when focused and space/enter is pressed.
    function handleAccessibility(e: React.KeyboardEvent<HTMLSpanElement>) {
        const key = e.key.toLocaleLowerCase();
        if (key === "enter" || key === "spacebar" || key === " ") {
            handleClick();
        }
    }

    return (
        <span
            ref={spanRef}
            className={
                `bg-gray-200 text-gray-500 hover:text-black cursor-default py-1 px-2 h-fit rounded-xl text-sm transition-colors 
                ${additional ? "bg-green-400 !text-black hover:cursor-pointer hover:bg-red-500 hover:!text-white focus:bg-red-500 focus:!text-white" : ""} 
                ${className}`
            }
            title={additional ? "Click to remove" : ""}
            onClick={handleClick}
            onKeyDown={handleAccessibility}
            tabIndex={additional && editing ? 0 : -1}
        >
            {item.name || item.toString()}
        </span>
    )
}
export default Label;