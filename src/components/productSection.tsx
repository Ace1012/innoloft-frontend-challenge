interface IProductSectionProps {
    children: React.ReactNode;
    className?: string;
}

const ProductSection = ({ children, className = "" }: IProductSectionProps) => {
    return (
        <section
            className={`flex max-md:h-fit md:max-h-[70vh] max-md:w-[95%] md:w-[88%] lg:w-[75%] xl:w-[60%] border border-gray-200 rounded-md bg-white text-black ${className}`}>
            {children}
        </section>
    )
}
export default ProductSection;