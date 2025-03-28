import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
import {
  Deviation,
  TrainDeviation,
  FerryDeviation,
} from "../types/trafficTypes";

function TrafficListItem(info: Deviation | TrainDeviation | FerryDeviation) {
  const getTrafficType = (
    info: Deviation | TrainDeviation | FerryDeviation,
  ): "Train" | "Traffic" | "Ferry" | "Unknown" => {
    switch (info.UpdateType) {
      case "Train":
        return "Train";
      case "Traffic":
        return "Traffic";
      case "Ferry":
        return "Ferry";
      default:
        return "Unknown";
    }
  };

  const trafficUpdateColorMap = {
    Train: "bg-[#1282A2]",
    Ferry: "bg-[#06D6A0]",
  };

  const severityBgColorMap: Record<number, string> = {
    5: "bg-trafficRedHeader",
    4: "bg-trafficDarkOliveHeader",
    2: "bg-trafficGrayHeader",
  };

  const itemType = getTrafficType(info);

  let colorClass: string = "";

  switch (itemType) {
    case "Ferry":
      colorClass = trafficUpdateColorMap["Ferry"];
      break;
    case "Train":
      colorClass = trafficUpdateColorMap["Train"];
      break;
    case "Traffic":
      const severity = (info as Deviation).SeverityCode;
      colorClass = severityBgColorMap[severity];
      break;
  }

  return (
    <div className="relative mb-4 rounded-xl border border-cardBorderColor bg-cardcColor">
      <div className={`absolute top-0 bottom-0 left-0 w-2 ${colorClass}`}></div>
      <TrafficListTop info={info} />
      <TrafficTextHeader info={info} />
      <TrafficListBottom info={info} />
    </div>
  );
}

export default TrafficListItem;
