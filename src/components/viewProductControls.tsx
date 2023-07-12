import { useNavigate } from "react-router-dom";
import ProductSection from "./productSection";

interface IViewProductControlsProps { }

const ViewProductControls = ({ }: IViewProductControlsProps) => {
    const navigate = useNavigate();
    return (
        <ProductSection className="!bg-transparent border-none text-white max-md:justify-start md:justify-end">
            <button className="w-fit" onClick={() => navigate(`/product/edit`)}>Edit</button>
        </ProductSection>
    )
}
export default ViewProductControls;