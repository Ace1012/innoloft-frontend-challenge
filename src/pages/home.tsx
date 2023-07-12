import { useSelector } from "react-redux";
import { selectConfig } from "../store/store";
import { useEffect } from "react";

interface IHomeProps { }

const Home = ({ }: IHomeProps) => {
    const { config } = useSelector(selectConfig);

    useEffect(() => {

    }, [config]);

    return (
        <div className={`flex flex-1 justify-center items-center`} style={{ backgroundColor: config.mainColor }}>
            <h1>Home</h1>
        </div>
    )
}
export default Home;