import { useMemo } from "react";
import RenderLabels, { TLabelProps } from "./renderLabels";
import TrlDropdown from "../../trlDropdown";
import LabelEditor from "../../labelEditor";
import { IProduct } from "../../../interfaces/interfaces";
import { useEditDetailsContext } from "../../../contexts/editDetailsContext";

interface IDetailsSectionBlockProps {
    title: TitleKey;
    labels: TLabelProps | TLabelProps[];
    editing?: boolean;
}

export type Title = Pick<IProduct, "categories" | "businessModels" | "trl" | "investmentEffort">;

export type TitleKey = keyof Title;

export enum AdditionalLabelsReducerActions {
    ADD = "add",
    DELETE = "delete"
}

export interface IReducerState {
    additionalLabels: TLabelProps[]
}

export interface IReducerAction {
    payload: TLabelProps;
    type: AdditionalLabelsReducerActions;
    title: TitleKey
}

type TitleMappings = Record<TitleKey, string>;

const titleMapper: TitleMappings = {
    categories: "Technologies",
    businessModels: "Business Models",
    trl: "TRL",
    investmentEffort: "Costs"
}

const DetailsSectionBlock = ({ title, labels, editing }: IDetailsSectionBlockProps) => {
    const { editedProduct } = useEditDetailsContext();

    const isEditingTRL = useMemo(() => editing && title === "trl", [editing, title]);
    const editProductState = useMemo(() => {
        const val = editedProduct[title];
        const newItems = typeof val === "string"
            ? {
                id: Date.now(),
                name: val
            }
            : val;
        const hasNewItems = val instanceof Array
            ? val.length > 0
            : Boolean(val)
        return {
            newItems,
            hasNewItems
        }
    }, [editedProduct, title])

    return (
        <div className="flex flex-col gap-3 p-1">

            <header className="flex justify-between h-8">
                <h2>{titleMapper[title]}</h2>
                {!isEditingTRL && editing && <LabelEditor title={title} />}
            </header>

            {isEditingTRL
                ? <TrlDropdown />
                : <div className="flex flex-col gap-3 justify-between">
                    <RenderLabels editing={editing} title={title} items={labels} />
                    {editing && editProductState.hasNewItems && <RenderLabels editing={editing} additional title={title} items={editProductState.newItems} />}
                </div>
            }
        </div >
    )
}
export default DetailsSectionBlock;