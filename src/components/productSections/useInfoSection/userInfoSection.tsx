import { useSelector } from "react-redux";
import { selectProduct } from "../../../store/store";
import MapSection from "../mapSection";
import UserInfoProfile from "./userInfoProfile";
import UserInfoLocation from "./userInfoLocation";

interface IUserInfoProps {
    editing?: boolean;
    className?: string
}

const UserInfoSection = ({ className, editing }: IUserInfoProps) => {
    const { product } = useSelector(selectProduct);

    return (
        <div className={`relative flex flex-col justify-start items-start max-w-fit max-md:h-1/4 md:w-3/12 p-2 gap-5 max-md:border-none max-md:rounded-bl-xl max-md:rounded-br-xl md:rounded-tr-xl rounded-br-xl border-l border-gray-100 ${className}`}>
            <h2 className="text-lg self-start font-semibold">Offered by</h2>
            <img className="lg:w-[50%] object-contain" src={product.company.logo} alt={"Company logo"} />
            <UserInfoProfile product={product} />
            <UserInfoLocation product={product} />
            {!editing && <MapSection product={product} />}
        </div>
    )
}
export default UserInfoSection;