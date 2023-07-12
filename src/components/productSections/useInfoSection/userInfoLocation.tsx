import { IProduct } from "../../../interfaces/interfaces";

interface IUserInfoLocationProps {
    product: IProduct
}

const UserInfoLocation = ({ product }: IUserInfoLocationProps) => {
    return (
        <div className="text-clamp">
            <p>{product.company.address.street} {product.company.address.house},</p>
            <p> {product.company.address.zipCode}  {product.company.address.city.name},  {product.company.address.country.name}</p>
        </div>
    )
}
export default UserInfoLocation;