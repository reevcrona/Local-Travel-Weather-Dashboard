import { FaMapMarkerAlt } from "react-icons/fa";
import { Deviation } from "../types/trafficTypes";
import { TrainDeviation } from "../types/trafficTypes";
function TrafficTextHeader({ info }: { info: Deviation | TrainDeviation }) {
  function isDeviation(info: Deviation | TrainDeviation): info is Deviation {
    return (
      (info as Deviation).Message !== undefined ||
      (info as Deviation).TemporaryLimit !== undefined
    );
  }
  return (
    <div className="px-5">
      <div className="header-text flex w-full max-w-[max-content] items-center rounded-lg bg-headerBg p-3">
        {isDeviation(info) && info.SeverityCode && (
          <FaMapMarkerAlt
            className={`mr-1 text-lg ${info.SeverityCode === 2 ? "text-trafficGrayHeader" : info.SeverityCode === 4 ? "text-trafficDarkOliveHeader" : "text-trafficRedHeader"}`}
          />
        )}

        <h2 className="text-base text-white">{info.LocationDescriptor}</h2>
      </div>
      <div className="px-1">
        <hr className="mt-5 border-t-2 border-hrColor opacity-70" />
      </div>
    </div>
  );
}

export default TrafficTextHeader;
