import { FaMapMarkerAlt } from "react-icons/fa";
import { Deviation } from "../types/trafficTypes";
import { TrainDeviation } from "../types/trafficTypes";
import { TrafficListChildProps } from "../types/trafficListProps";
function TrafficTextHeader({ info, textColor }: TrafficListChildProps) {
  function isDeviation(info: Deviation | TrainDeviation): info is Deviation {
    return (
      (info as Deviation).Message !== undefined ||
      (info as Deviation).TemporaryLimit !== undefined
    );
  }
  return (
    <div className="px-5">
      <div className="header-text flex w-full max-w-[max-content] items-center justify-center rounded-lg bg-headerBg p-3 @min-[342px]/main:justify-start">
        {isDeviation(info) && info.SeverityCode && (
          <FaMapMarkerAlt
            className={`mr-1 hidden text-lg ${textColor} @min-[540px]/main:block`}
          />
        )}

        <h2 className="text-center text-base text-white @min-[342px]/main:text-start">
          {info.LocationDescriptor}
        </h2>
      </div>
      <div className="px-1">
        <hr className="mt-5 border-t-2 border-hrColor opacity-70" />
      </div>
    </div>
  );
}

export default TrafficTextHeader;
