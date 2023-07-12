import { IConfig, IProduct } from "../../../interfaces/interfaces";

interface IMainSectionImageProps {
    product: IProduct;
    config: IConfig
}

const MainSectionImage = ({ product, config }: IMainSectionImageProps) => {
    return (
        <div className={`relative rounded-tl-md max-md:rounded-tr-md w-[100%] ${!config.hasUserSection && "rounded-tr-md"}`}>
            <div className="absolute top-0 left-0 bg-white rounded-tl-inherit rounded-br-md max-lg:p-2 p-3">
                <span className="font-semibold">{product.type.name}</span>
            </div>
            <img src={product.picture}
                className={`w-[100%] max-h-[30vh] object-contain rounded-inherit`}
                style={{ backgroundColor: config.mainColor }}
            />
        </div>
    )
}
export default MainSectionImage;