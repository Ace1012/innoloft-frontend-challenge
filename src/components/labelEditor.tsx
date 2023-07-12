import { useEffect, useMemo, useRef, useState } from "react";
import { TitleKey } from "./productSections/detailsSection/detailsSectionBlock";
import { addCommas } from "../utilities";
import { useEditDetailsContext } from "../contexts/editDetailsContext";

interface ILabelEditorProps {
    title: TitleKey;
}

const LabelEditor = ({ title }: ILabelEditorProps) => {
    const { editedProductDispatch } = useEditDetailsContext();

    const [isAddingLabel, setIsAddingLabel] = useState(false);
    const isInvestmentEffort = useMemo(() => title === "investmentEffort", [title]);

    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Toggle between button and input
     */
    function toggleEditing() {
        setIsAddingLabel(prev => !prev)
    }

    function handleChange() {
        const size = inputRef.current!.value.length >= 10 ? inputRef.current!.value.length : 10;
        inputRef.current!.style.width = `${size + 2}ch`
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Submitted");

        const value = inputRef.current!.value;

        if (value.length > 0) {
            const newVal = {
                [title]: title === "investmentEffort" ? `< ${addCommas(parseInt(value))}€` : value
            };

            editedProductDispatch({
                payload: newVal,
                type: title
            })
        }

        toggleEditing();
    }

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key.toLocaleLowerCase() === "escape") {
            toggleEditing()
        }
    }

    useEffect(() => {
        if (isAddingLabel) {
            inputRef.current!.focus();
        }
    }, [isAddingLabel]);

    return (
        <>
            {isAddingLabel
                ? <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type={isInvestmentEffort ? "number" : "text"}
                        pattern={isInvestmentEffort ? "\d" : ".*"}
                        className="inline max-w-[8rem] w-clamp bg-transparent border border-gray-300 px-1 py-1 rounded-md"
                        onChange={handleChange}
                        onKeyDown={handleKey}
                        onBlur={toggleEditing}
                    />
                </form>
                : <button
                    className="w-[30px] h-[30px] px-[8px] py-[0px] flex justify-center items-center text-white text-[1.25rem]"
                    onClick={toggleEditing}
                >
                    +
                </button>
            }
        </>
    )
}
export default LabelEditor;