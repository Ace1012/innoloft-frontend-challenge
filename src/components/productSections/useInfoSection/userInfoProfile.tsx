import { IProduct } from "../../../interfaces/interfaces";

interface IUserInfoProfileProps {
    product: IProduct
}

const UserInfoProfile = ({ product: { user, ...product } }: IUserInfoProfileProps) => {
    return (
        <div className="flex justify-start gap-2 items-center w-full">
            <img
                className="w-20 object-contain rounded-[50%] border"
                src={user.profilePicture}
                alt={"User profile picture"}
            />
            <div className="flex flex-col text-gray-500 text-clamp">
                <span className="font-semibold">{user.firstName} {user.lastName}</span>
                <span >{product.company.name}</span>
            </div>
        </div>
    )
}
export default UserInfoProfile;