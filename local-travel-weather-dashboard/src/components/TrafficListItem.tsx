import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
import { TrafficListProps } from "../types/trafficListProps";
import {
  Deviation,
  TrainDeviation,
  FerryDeviation,
} from "../types/trafficTypes";

function TrafficListItem({ info }: TrafficListProps) {
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
    Train: {
      bg: "bg-[#1282A2]",
      text: "text-[#1282A2]",
      border: "border-[#1282A2]",
    },
    Ferry: {
      bg: "bg-[#06D6A0]",
      text: "text-[#06D6A0]",
      border: "border-[#06D6A0]",
    },
    Unknown: {
      bg: "bg-[#06D6A0]",
      text: "text-[#06D6A0]",
      border: "border-[#06D6A0]",
    },
  };

  const severityBgColorMap: Record<
    number | string,
    { bg: string; text: string; border: string }
  > = {
    5: {
      bg: "bg-trafficRedHeader",
      text: "text-trafficRedHeader",
      border: "border-trafficRedHeader",
    },
    4: {
      bg: "bg-trafficDarkOliveHeader",
      text: "text-trafficDarkOliveHeader",
      border: "border-trafficDarkOliveHeader",
    },
    2: {
      bg: "bg-trafficGrayHeader",
      text: "text-trafficGrayHeader",
      border: "border-trafficGrayHeader",
    },
    default: {
      bg: "bg-trafficGrayHeader",
      text: "text-trafficGrayHeader",
      border: "border-trafficGrayHeader",
    },
  };

  const itemType = getTrafficType(info);

  let colorClass = { bg: "", text: "", border: "" };

  switch (itemType) {
    case "Ferry":
      colorClass = trafficUpdateColorMap["Ferry"];
      break;
    case "Train":
      colorClass = trafficUpdateColorMap["Train"];
      break;
    case "Traffic":
      const severity = (info as Deviation).SeverityCode;
      colorClass = severityBgColorMap[severity] || severityBgColorMap.default;
      break;
    default:
      colorClass = trafficUpdateColorMap["Unknown"];
  }

  return (
    <div className="relative mb-4 w-full max-w-4xl rounded-xl border border-cardBorderColor bg-cardcColor">
      <div
        className={`absolute top-0 bottom-0 left-0 w-2 ${colorClass.bg}`}
      ></div>
      <TrafficListTop
        info={info}
        bgColor={colorClass.bg}
        textColor={colorClass.text}
        borderColor={colorClass.border}
      />
      <TrafficTextHeader
        info={info}
        bgColor={colorClass.bg}
        textColor={colorClass.text}
        borderColor={colorClass.border}
      />
      <TrafficListBottom
        info={info}
        bgColor={colorClass.bg}
        textColor={colorClass.text}
        borderColor={colorClass.border}
      />
    </div>
  );
}

export default TrafficListItem;
