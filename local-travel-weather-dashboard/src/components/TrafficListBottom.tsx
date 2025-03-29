import { FaRegCalendarAlt, FaFlagCheckered, FaCircle } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Deviation, TrainDeviation } from "../types/trafficTypes";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { useState } from "react";
import { TrafficListChildProps } from "../types/trafficListProps";
function TrafficListBottom({
  info,
  bgColor,
  textColor,
  borderColor,
}: TrafficListChildProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function isDeviation(info: Deviation | TrainDeviation): info is Deviation {
    return (
      (info as Deviation).Message !== undefined ||
      (info as Deviation).TemporaryLimit !== undefined
    );
  }

  function isTrainDeviation(
    info: Deviation | TrainDeviation,
  ): info is TrainDeviation {
    return (info as TrainDeviation).AffectedLocations !== undefined;
  }

  return (
    <div className="bottom-container flex flex-col justify-between gap-4 px-5 pt-4 pb-4 @min-bottomContainerCol/main:flex-row">
      <div className="flex flex-1/6 flex-col">
        {isDeviation(info) && (
          <p className="mb-3.5 pr-3 text-white">{info.Message}</p>
        )}
        {isDeviation(info) &&
        info.TemporaryLimit &&
        info.TemporaryLimit.length > 0 ? (
          <div
            className={`max-w-[480px] rounded-lg border-l-4 ${borderColor} bg-headerBg p-4`}
          >
            <div className="mb-3 flex items-center">
              <FaTriangleExclamation className={`mr-2 ${textColor}`} />
              <h4 className="font-bold text-white">
                Tillfälliga begränsningar
              </h4>
            </div>

            <ul className="list-none">
              {info.TemporaryLimit.map((tempLimit, index) => (
                <li
                  className={`flex items-center gap-2 text-white`}
                  key={index}
                >
                  <FaCircle className={`${textColor} text-xs`} />
                  {tempLimit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {isTrainDeviation(info) && info.AffectedLocations ? (
          <div className="flex flex-col overflow-hidden rounded-lg border-l-4 border-[#1282A2] bg-headerBg p-3">
            <h4 className="mb-1 font-bold text-white">
              Stationer där tågtrafiken kan påverkas
            </h4>
            <p
              className={`${
                !isExpanded ? "line-clamp-3" : "line-clamp-none"
              } w-full text-xs tracking-wide break-words text-white transition-all duration-500`}
            >
              {info.AffectedLocations.length > 17 && !isExpanded
                ? `${info.AffectedLocations.slice(0, 18).join(", ")} ...`
                : info.AffectedLocations.join(", ")}
              {info.AffectedLocations.length > 17 &&
                (!isExpanded ? (
                  <IoMdArrowDropdownCircle
                    onClick={() => setIsExpanded((prevState) => !prevState)}
                    className="ml-2 inline-block cursor-pointer text-xl text-[#1282A2]"
                  />
                ) : (
                  <IoMdArrowDropupCircle
                    onClick={() => setIsExpanded((prevState) => !prevState)}
                    className="ml-2 inline-block cursor-pointer text-xl text-[#1282A2]"
                  />
                ))}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 items-center justify-start @min-bottomContainerCol/main:justify-end">
        <div className="flex w-full max-w-[400px] flex-col items-center justify-center rounded-lg bg-headerBg px-2 @min-bottomContainerCol/main:mt-0 @min-bottomContainerCol/main:flex-col">
          <h4 className="py-4 text-xl text-white">Tidsplan</h4>
          <div
            className={`flex ${info.UpdateType === "Traffic" ? "gap-6" : "gap-0"} pb-5`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}
              >
                <FaRegCalendarAlt className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-text-dark-400">
                  STARTTID
                </span>
                <p className="font-medium text-white">{info.StartTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isDeviation(info) && info.EndTime && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mainContainerBg">
                  <FaFlagCheckered className="text-white" />
                </div>
              )}

              <div className="flex flex-col">
                {isDeviation(info) && info.EndTime && (
                  <span className="mr-1.5 font-bold tracking-tight text-text-dark-400 @min-bottomContainerCol/main:mr-0">
                    SLUTTID
                  </span>
                )}

                <p className="font-medium text-white">
                  {isDeviation(info) && info.EndTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficListBottom;
