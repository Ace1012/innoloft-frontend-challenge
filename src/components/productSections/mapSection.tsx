import { IProduct } from "../../interfaces/interfaces";

interface IMapSectionProps {
    product: IProduct;
}

const MapSection = ({ product }: IMapSectionProps) => {

    const { latitude, longitude } = product.company.address

    const src = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    console.log({ latitude, longitude })

    return (
        <iframe
            className="rounded-md w-full flex-1"
            src={src}
            loading="lazy"
        />
    )
}
export default MapSection;