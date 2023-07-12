interface IActivityIndicatorProps { }

const GAP = 10;
const WIDTH = 20;

const ActivityIndicator = ({ }: IActivityIndicatorProps) => {
    return (
        <div className="flex flex-col h-fit w-full justify-center items-center" title="Saving product..">
            <svg
                className=" aspect-video"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100%"
                height="25px"
                viewBox="0 0 24 30"
            >
                <rect className="fill-white" x={`${GAP}%`} y="20%" width="20%" height="60%" fill="#333">
                    <animate
                        attributeName="opacity"
                        attributeType="XML"
                        values="1; .2; 1"
                        begin="0s"
                        dur="0.6s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect className="fill-white" x={`${(GAP * 2) + WIDTH}%`} y="20%" width="20%" height="60%" fill="#333">
                    <animate
                        attributeName="opacity"
                        attributeType="XML"
                        values="1; .2; 1"
                        begin="0.2s"
                        dur="0.6s"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect className="fill-white" x={`${(GAP * 3) + (WIDTH * 2)}%`} y="20%" width="20%" height="60%" fill="#333">
                    <animate
                        attributeName="opacity"
                        attributeType="XML"
                        values="1; .2; 1"
                        begin="0.4s"
                        dur="0.6s"
                        repeatCount="indefinite"
                    />
                </rect>
            </svg>
        </div>
    )
}
export default ActivityIndicator;