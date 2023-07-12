import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import store from "../store/store";
import { fetchTrlList } from "../store/slices/trlListSlice";

import DetailsSection from "../components/productSections/detailsSection/detailsSection";
import MainSection from "../components/productSections/mainSection/mainSection";
import VideoSection from "../components/productSections/videoSection";
import SectionControls from "../components/sectionControls";
import { EditDetailsProvider } from "../contexts/editDetailsContext";


interface IEditProductProps { }

const EditProduct = ({ }: IEditProductProps) => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;

    function fetchMyTrlList() {
        dispatch(fetchTrlList())
    }

    function handleEditProduct() {
        setTimeout(() => {
            navigate("/product");
        }, 1000);
    }

    useEffect(() => {
        fetchMyTrlList();
    }, []);

    return (
        <div className="relative flex-col py-2 grid place-items-center grid-cols-1 gap-y-5 items-center">
            <EditDetailsProvider>
                <MainSection editing />
                <VideoSection editing />
                <DetailsSection editing />
                <SectionControls handleEditProduct={handleEditProduct} />
            </EditDetailsProvider>
        </div>
    )
}
export default EditProduct;