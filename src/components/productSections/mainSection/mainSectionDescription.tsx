import { useMemo } from "react";
import EditTextArea from "../../editTextarea";
import { IProduct } from "../../../interfaces/interfaces";

interface IMainSectionDescriptionProps {
    editing: boolean | undefined;
    product: IProduct
}

const MainSectionDescription = ({
    editing,
    product
}: IMainSectionDescriptionProps) => {

    const description = useMemo(() => {
        return getDescription(product.description)
    }, [product.description])

    function getDescription(desc: string) {
        const reg = /<.*?>(.*?)<\/.*?>/g;
        const reg2 = /<.*?>(.*?)console.log\("test"\);/g;
        return desc.replaceAll(reg, "$1").replaceAll(reg2, "$1")
    }

    return (
        <div className="flex flex-1 flex-col gap-2 md:h-[40%] justify-center rounded-bl-md p-2">
            {editing
                ?
                <>
                    <EditTextArea title="name" className="min-h-[30px] font-bold" text={product.name} cols={30} rows={1} />
                    <EditTextArea title="description" className="min-h-[200px]" text={description} cols={30} rows={10} resize />
                </>
                :
                <>
                    <h2 className="font-bold" >{product.name}</h2>
                    <p className="max-lg:text-xs lg:text-sm rounded-bl-inherit flex-1">{description}</p>
                </>
            }
        </div>
    )
}
export default MainSectionDescription;