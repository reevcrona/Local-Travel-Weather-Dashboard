import { trafficFilterButtonProps } from "../types/trafficFilterButtonProps";

function TrafficFilterButton({
  handleFilterChange,
  activeFilter,
  trafficAmount,
  filtervalue,
}: trafficFilterButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-lg border-2 text-[8px] transition-colors duration-200 ease-in-out min-[385px]:text-xs ${activeFilter === filtervalue.eng ? "border-transparent bg-white text-black" : "border-[#4b5563] bg-transparent text-white hover:border-[#9ca3af]"} p-3 font-bold`}
      onClick={() => handleFilterChange(filtervalue.eng)}
    >
      {filtervalue.swe} {trafficAmount}
    </button>
  );
}

export default TrafficFilterButton;
