import { useTrafficStore } from "../stores/trafficStore";

function TrafficTextHeader({ index }: { index: number }) {
  const trafficData = useTrafficStore((state) => state.trafficData);
  const info = trafficData[index];
  return (
    <>
      <div className="header-text flex pt-3 pl-3">
        <h2 className="text-xl">{info.LocationDescriptor}</h2>
      </div>
      <div className="px-3">
        <hr className="mt-4 mb-2 border-t-2 border-hrColor opacity-70 @min-bottomContainerCol/main:mb-4" />
      </div>
    </>
  );
}

export default TrafficTextHeader;
