import Label from "../../label"
import { TitleKey } from "./detailsSectionBlock";

interface IRenderlabelProps {
    title: TitleKey;
    items: TLabelProps | TLabelProps[];
    additional?: boolean;
    editing?: boolean;
}

export type TLabelProps = { id: number, name: string }

const RenderLabels = ({ title, items, additional, editing }: IRenderlabelProps) => {
    return (
        <div className="flex gap-1 flex-wrap items-center">
            {items instanceof Array
                ? items.map((item, i) => (
                    <Label
                        key={item.id || Date.now() + i}
                        title={title}
                        className={`${additional ? "bg-green-400 !text-black hover:cursor-pointer" : ""}`}
                        additional={additional}
                        editing={editing}
                        item={item}
                    />
                ))
                : <Label
                    key={items.id || Date.now()}
                    title={title}
                    additional={additional}
                    editing={editing}
                    item={items} />
            }
        </div>
    )

}

export default RenderLabels;