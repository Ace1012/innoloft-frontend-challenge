import { useSelector } from "react-redux";
import { selectConfig, selectProduct } from "../store/store";
import ActivityIndicator from "./activityIndicator";
import { useState } from "react";
import ProductSection from "./productSection";
import { useEditDetailsContext } from "../contexts/editDetailsContext";

interface ISectionControlsProps {
    handleEditProduct(): void
    className?: string;
}

const SectionControls = ({ handleEditProduct, className = "" }: ISectionControlsProps) => {
    const { error: pError } = useSelector(selectProduct);
    const { config } = useSelector(selectConfig);

    const { saveProductEdits } = useEditDetailsContext();

    const [editedSuccessfuly, setEditedSuccessfuly] = useState(false);
    const [loading, setLoading] = useState(false);

    // function reset() {
    //     setEditedSuccessfuly(false);
    //     setLoading(false);
    // }

    function animateSuccess() {
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => {
            handleEditProduct();
            saveProductEdits()
            // setEditedSuccessfuly(false);
        }, 3000);
    }

    function handleClick() {
        setLoading(true);
        setEditedSuccessfuly(true);
        animateSuccess()
        // setTimeout(() => reset(), 1000);
        // handleEditProduct();
    }

    return (
        <ProductSection className={`justify-end !bg-transparent border-none px-1 py-3 gap-2 ${className}`}>
            <button onClick={handleEditProduct} className="bg-transparent text-black">
                Cancel
            </button>
            <button
                className={`w-[5rem] flex justify-center items-center gap-3 opacity-75 ${(loading || editedSuccessfuly) && "opacity-100"} border-none focus:opacity-100 hover:opacity-100 transition-all duration-150`}
                onClick={handleClick}
                style={{
                    backgroundColor: config.mainColor
                }}
            >
                {loading
                    ? <ActivityIndicator />
                    : pError
                        ? <span className="text-red-600 text-md font-extrabold">
                            &times;
                        </span>
                        : editedSuccessfuly
                            ? <span className="text-emerald-500 text-md font-extrabold">
                                &#10003;
                            </span>
                            : <span className="text-white"> Save </span>
                }
            </button>
        </ProductSection>
    )
}
export default SectionControls;