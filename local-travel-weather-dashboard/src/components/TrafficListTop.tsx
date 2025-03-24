import { FaRoad } from "react-icons/fa";
import { FaTrain } from "react-icons/fa6";
import { Deviation, TrainDeviation } from "../types/trafficTypes";
function TrafficListTop({ info }: { info: Deviation | TrainDeviation }) {
  function isDeviation(info: Deviation | TrainDeviation): info is Deviation {
    return (
      (info as Deviation).Message !== undefined ||
      (info as Deviation).TemporaryLimit !== undefined
    );
  }

  return (
    <div
      className={`top-container flex flex-col justify-between px-5 py-5 text-white @min-trafficHeaderSmall/main:flex-row`}
    >
      <div className="flex flex-col">
        {isDeviation(info) && info.SeverityText && (
          <h4
            className={`mb-1.5 w-[max-content] rounded-full ${isDeviation(info) && info.SeverityCode && info.SeverityCode === 2 ? "bg-trafficGrayHeader" : isDeviation(info) && info.SeverityCode === 4 ? "bg-trafficDarkOliveHeader" : "bg-trafficRedHeader"} px-3 py-1 text-center font-bold`}
          >
            {isDeviation(info) && info.SeverityText}
          </h4>
        )}

        <div className="flex">
          <div className="pt-1">
            {info.UpdateType === "Train" ? (
              <FaTrain className="text-3xl" />
            ) : (
              <FaRoad className="text-3xl" />
            )}
          </div>

          <h2 className="ml-3 text-2xl">
            {info.MessageType}
            {isDeviation(info) && info.RoadNumber !== ""
              ? ` - ${info.RoadNumber}`
              : ""}
          </h2>
        </div>
      </div>
      <div>
        <hr className="mt-3 mb-2 block border-t-2 border-hrColor opacity-70 @min-trafficHeaderSmall/main:hidden" />
      </div>
      <div className="flex flex-col">
        <span className="text-start @min-trafficHeaderSmall/main:text-end">
          {" "}
          Uppdaterad
        </span>
        <h4 className="font-bold">{info.VersionTime}</h4>
      </div>
    </div>
  );
}

export default TrafficListTop;
