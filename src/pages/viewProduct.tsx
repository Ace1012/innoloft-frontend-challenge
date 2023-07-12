import MainSection from "../components/productSections/mainSection/mainSection";
import DetailsSection from "../components/productSections/detailsSection/detailsSection";
import VideoSection from "../components/productSections/videoSection";
import { useSelector } from "react-redux";
import { selectProduct } from "../store/store";
import ViewProductControls from "../components/viewProductControls";
import { EditDetailsProvider } from "../contexts/editDetailsContext";

interface IViewProductProps { }

const ViewProduct = ({ }: IViewProductProps) => {
    const { loading } = useSelector(selectProduct)

    return (
        <>
            {loading
                ? <h1 className="text-black">Loading...</h1>
                : <div className="relative grid place-items-center grid-cols-1 gap-y-5 py-2 flex-1 items-center">
                    <EditDetailsProvider>
                        <ViewProductControls />
                        <MainSection />
                        <VideoSection />
                        <DetailsSection />
                    </EditDetailsProvider>
                </div>
            }
        </>
    )
}
export default ViewProduct;