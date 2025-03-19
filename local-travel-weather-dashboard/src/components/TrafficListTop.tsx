import { useTrafficStore } from "../stores/trafficStore";
import { FaRoad } from "react-icons/fa";

function TrafficListTop({ index }: { index: number }) {
  const trafficData = useTrafficStore((state) => state.trafficData);
  const info = trafficData[index];
  return (
    <div
      className={`top-container flex flex-col justify-between px-5 py-3 text-white @min-trafficHeaderSmall/main:flex-row`}
    >
      <div className="flex flex-col">
        <h4 className="mb-[2px] w-[max-content] rounded-full bg-trafficRedHeader px-3 py-1 text-center font-bold">
          {info.SeverityText}
        </h4>
        <div className="flex">
          <div className="pt-1">
            <FaRoad className="text-3xl" />
          </div>

          <h2 className="ml-3 text-2xl">
            {info.MessageType}
            {info.RoadNumber !== "" ? ` - ${info.RoadNumber}` : ""}
          </h2>
        </div>
      </div>
      <div>
        <hr className="mt-3 mb-2 block border-t-2 border-hrColor opacity-70 @min-trafficHeaderSmall/main:hidden" />
      </div>
      <div className="flex flex-col">
        <h4 className="mb-[2px] text-start font-bold @min-trafficHeaderSmall/main:mb-0 @min-trafficHeaderSmall/main:text-end">
          {info.SeverityText}
        </h4>
        <h4 className="font-bold">
          Uppdaterad <span className="font-normal">{info.VersionTime}</span>
        </h4>
      </div>
    </div>
  );
}

export default TrafficListTop;
