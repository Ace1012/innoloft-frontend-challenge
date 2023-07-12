import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectConfig } from "../store/store";
import { useSelector } from "react-redux";

interface INavbarProps { }

type TRoute = "Home" | "View Product" | "Edit Product";

const Navbar = ({ }: INavbarProps) => {
    const { config } = useSelector(selectConfig);

    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<TRoute>("Home");

    useEffect(() => {
        const name = location.pathname;
        if (name === "/") {
            setCurrentPage("Home")
        } else if (name === "/product") {
            setCurrentPage("View Product")
        } else if (name === "/product/edit") {
            setCurrentPage("Edit Product")
        }
    }, [location.pathname]);

    return (
        <nav
            className={`h-[8vh] max-h-[8vh] sticky left-0 right-0 top-0 z-10 flex justify-between items-center border-b-2 border-white p-2 transition-all`}
            style={{
                backgroundColor: config.mainColor || "#242424"
            }}>
            <div
                className="h-full aspect-video max-lg:w-40 cursor-pointer lg:w-72 flex place-items-center bg-white shadow"
                tabIndex={0}
                style={{
                    maskImage: `url(${config.logo})`,
                    WebkitMaskImage: `url(${config.logo})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center"
                }}
                onClick={() => navigate(`/`)}
            />
            {currentPage !== "View Product" &&
                <ul>
                    <button className="border border-white" onClick={() => navigate(`/product`)}>View Product</button>
                </ul>
            }
        </nav>
    )
}
export default Navbar;