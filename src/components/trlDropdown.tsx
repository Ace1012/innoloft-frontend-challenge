import { useSelector } from "react-redux";
import { selectTrlList } from "../store/store";
import { useRef } from "react";
import { useEditDetailsContext } from "../contexts/editDetailsContext";
import { ITrl } from "../interfaces/interfaces";

interface ITrlDropdownProps {

}

const TrlDropdown = ({ }: ITrlDropdownProps) => {
    const { trlList } = useSelector(selectTrlList);
    const { editedProductDispatch } = useEditDetailsContext();

    const selectRef = useRef<HTMLSelectElement>(null);

    function handleChange() {
        editedProductDispatch({
            payload: {
                trl: JSON.parse(selectRef.current!.value) as ITrl,
            },
            type: "trl"
        })
    }

    return (
        <select
            ref={selectRef}
            className="bg-transparent border w-full border-gray-300 p-1 rounded-md"
            onChange={handleChange}
        >
            {trlList.map((trl) => (
                <option key={trl.id} value={JSON.stringify(trl)}>{trl.name}</option>
            ))}
        </select>
    )
}
export default TrlDropdown;