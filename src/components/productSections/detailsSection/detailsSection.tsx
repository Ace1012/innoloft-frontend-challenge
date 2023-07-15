import { useSelector } from "react-redux";
import { selectProduct } from "../../../store/store";
import ProductSection from "../../productSection";
import DetailsSectionBlock from "./detailsSectionBlock";

interface IDetailsProps {
    editing?: boolean;
}

const DetailsSection = ({ editing }: IDetailsProps) => {
    const { product } = useSelector(selectProduct);

    return (
        <ProductSection className="flex flex-col p-2 md:max-h-[30vh]">
            <header className="text-lg">
                <h2 className="font-semibold">Offer Details</h2>
            </header>
            <div className="grid md:grid-cols-2 md:grid-rows-2 gap-y-1 gap-x-1">
                <DetailsSectionBlock editing={editing} title="categories" labels={product.categories} />
                <DetailsSectionBlock editing={editing} title="businessModels" labels={product.businessModels} />
                <DetailsSectionBlock editing={editing} title="trl" labels={{ id: Date.now(), name: product.trl.name }} />
                <DetailsSectionBlock editing={editing} title="investmentEffort" labels={{ id: Date.now(), name: product.investmentEffort }} />
            </div>
        </ProductSection>
    )
}
export default DetailsSection;