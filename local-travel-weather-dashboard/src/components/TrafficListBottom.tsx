import { useTrafficStore } from "../stores/trafficStore";
import { FaRegCalendarAlt } from "react-icons/fa";

function TrafficListBottom({ index }: { index: number }) {
  const trafficData = useTrafficStore((state) => state.trafficData);
  const info = trafficData[index];

  return (
    <div className="bottom-container flex flex-col px-3 @min-bottomContainerCol/main:flex-row">
      <div className="flex flex-1 flex-col">
        <p className="mb-2 pr-3">{info.Message}</p>
        {info.TemporaryLimit && info.TemporaryLimit.length > 0 ? (
          <>
            <h4 className="font-bold">Tillfälliga begränsningar</h4>
            <ul className="list-disc pl-9">
              {info.TemporaryLimit.map((tempLimit, index) => (
                <li key={index}>{tempLimit}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <div className="mt-2 flex flex-1 flex-col justify-between px-1 @min-bottomContainerCol/main:mt-0 @min-bottomContainerCol/main:flex-row">
        <div className="flex gap-2">
          <span className="pt-1">
            <FaRegCalendarAlt className="flex items-center" />
          </span>

          <span className="font-bold">Starttid</span>
          <p>{info.StartTime}</p>
        </div>
        <div className="ml-6 flex gap-2 @min-bottomContainerCol/main:ml-0">
          <span className="mr-1.5 font-bold @min-bottomContainerCol/main:mr-0">
            Sluttid
          </span>
          <p>{info.EndTime}</p>
        </div>
      </div>
    </div>
  );
}

export default TrafficListBottom;
