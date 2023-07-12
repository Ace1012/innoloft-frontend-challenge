import { useSelector } from "react-redux/es/exports";
import { selectConfig, selectProduct } from "../../../store/store";
import ProductSection from "../../productSection";
import UserInfoSection from "../useInfoSection/userInfoSection";
import MainSectionDescription from "./mainSectionDescription";
import MainSectionImage from "./mainSectionImage";
import { useEffect } from "react";

interface IMainSectionProps {
    editing?: boolean;
}

const MainSection = ({ editing }: IMainSectionProps) => {
    const { product } = useSelector(selectProduct);
    const { config } = useSelector(selectConfig);

    useEffect(() => {
        if (!editing) {
            console.log(JSON.stringify(product, null, 2));
        }
    }, [product]);

    return (
        <ProductSection className="max-md:relative flex-col md:flex-row">
            <div className="flex flex-col flex-1 max-md:border-b rounded-tl-md rounded-bl-md w-full">
                <MainSectionImage product={product} config={config} />
                <MainSectionDescription editing={editing} product={product} />
            </div>
            {config.hasUserSection && <UserInfoSection editing={editing} />}
        </ProductSection>
    )
}
export default MainSection;