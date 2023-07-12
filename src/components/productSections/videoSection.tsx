import { useSelector } from "react-redux";
import { selectProduct } from "../../store/store";
import ProductSection from "../productSection";
import { useRef } from "react";
import { useEditDetailsContext } from "../../contexts/editDetailsContext";

interface IVideoSectionProps {
    editing?: boolean;
}

const VideoSection = ({ editing }: IVideoSectionProps) => {
    const { product } = useSelector(selectProduct);
    const { editedProductDispatch } = useEditDetailsContext();

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        const value = inputRef.current!.value;

        if (value.length > 0) {
            editedProductDispatch({
                payload: {
                    video: value
                },
                type: "video"
            })
        }
    }

    function embedLink(url: string) {
        return url.replace(/(\/watch\?v=)/i, "/embed/");
        // return url.replace(/(watch\?v=)/i, "embed/");
    }

    return (
        <ProductSection className={`flex-col relative items-center ${editing ? "" : "aspect-square"} p-3`}>
            <header className="w-full justify-self-start self-start">
                <h2 className="text-lg font-semibold">Video</h2>
            </header>
            {editing
                ? <>
                    <input
                        ref={inputRef}
                        onChange={handleSubmit}
                        className="w-[100%] bg-white border border-gray-300 py-1 px-2 rounded-md"
                        type="text"
                        placeholder="Add a youtube or vimeo link"
                    />
                </>
                : <iframe className="flex h-full w-full px-[5%] py-[5%]" src={embedLink(product.video)} />
            }
        </ProductSection>
    )
}
export default VideoSection;