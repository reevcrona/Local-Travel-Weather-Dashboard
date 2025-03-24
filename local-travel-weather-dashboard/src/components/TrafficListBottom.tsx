import { FaRegCalendarAlt, FaFlagCheckered } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Deviation, TrainDeviation } from "../types/trafficTypes";
import { IoMdArrowDropdownCircle } from "react-icons/io";
function TrafficListBottom({ info }: { info: Deviation | TrainDeviation }) {
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
            className={`max-w-[480px] rounded-lg border-l-4 ${info.SeverityCode === 2 ? "border-trafficGrayHeader" : info.SeverityCode === 4 ? "border-trafficDarkOliveHeader" : "border-trafficRedHeader"} bg-headerBg p-4`}
          >
            <div className="mb-3 flex items-center">
              <FaTriangleExclamation
                className={`mr-2 ${info.SeverityCode === 2 ? "text-trafficGrayHeader" : info.SeverityCode === 4 ? "text-trafficDarkOliveHeader" : "text-trafficRedHeader"}`}
              />
              <h4 className="font-bold text-white">
                Tillfälliga begränsningar
              </h4>
            </div>

            <ul className="list-disc pl-9">
              {info.TemporaryLimit.map((tempLimit, index) => (
                <li
                  className={`text-white marker:text-2xl ${info.SeverityCode === 2 ? "marker:text-trafficGrayHeader" : info.SeverityCode === 4 ? "marker:text-trafficDarkOliveHeader" : "marker:text-trafficRedHeader"}`}
                  key={index}
                >
                  {tempLimit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {isTrainDeviation(info) && info.AffectedLocations ? (
          <div className="flex flex-col overflow-hidden rounded-lg bg-headerBg p-3">
            <h4 className="font-bold text-white">
              Stationer där tågtrafiken kan påverkas
            </h4>
            <p className="max-h-[45px] w-full text-xs tracking-wide break-words overflow-ellipsis text-white marker:text-2xl">
              {info.AffectedLocations.length > 6
                ? `${info.AffectedLocations.slice(0, 15).join(", ")} ...`
                : info.AffectedLocations.join(", ")}
              {info.AffectedLocations.length > 6 && (
                <IoMdArrowDropdownCircle className="ml-2 inline-block text-xl" />
              )}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 items-center justify-start @min-bottomContainerCol/main:justify-end">
        <div className="flex w-full max-w-[400px] flex-col items-center justify-center rounded-lg bg-headerBg px-2 @min-bottomContainerCol/main:mt-0 @min-bottomContainerCol/main:flex-col">
          <h4 className="py-4 text-xl text-white">Tidsplan</h4>
          <div className="flex gap-6 pb-5">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${isDeviation(info) && info.SeverityCode === 2 ? "bg-trafficGrayHeader" : isDeviation(info) && info.SeverityCode === 4 ? "bg-trafficDarkOliveHeader" : "bg-trafficRedHeader"}`}
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
