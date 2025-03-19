import { useTrafficStore } from "../stores/trafficStore";
import { FaMapMarkerAlt } from "react-icons/fa";
function TrafficTextHeader({ index }: { index: number }) {
  const trafficData = useTrafficStore((state) => state.trafficData);
  const info = trafficData[index];
  return (
    <div className="px-5">
      <div className="header-text flex w-full max-w-[max-content] items-center rounded-lg bg-headerBg p-3">
        <FaMapMarkerAlt
          className={`mr-1 text-lg ${info.SeverityCode === 2 ? "text-trafficGrayHeader" : info.SeverityCode === 4 ? "text-trafficDarkOliveHeader" : "text-trafficRedHeader"}`}
        />
        <h2 className="text-base text-white">{info.LocationDescriptor}</h2>
      </div>
      <div className="px-1">
        <hr className="mt-5 border-t-2 border-hrColor opacity-70" />
      </div>
    </div>
  );
}

export default TrafficTextHeader;
