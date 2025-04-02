import { trafficFilterButtonProps } from "../types/trafficFilterButtonProps";

function TrafficFilterButton({
  handleFilterChange,
  activeFilter,
  trafficAmount,
  filtervalue,
}: trafficFilterButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-lg border-2 ${activeFilter === filtervalue.eng ? "border-white" : "border-[#4b5563]"} bg-transparent p-2 font-bold text-white hover:border-[#9ca3af]`}
      onClick={() => handleFilterChange(filtervalue.eng)}
    >
      {filtervalue.swe} {trafficAmount}
    </button>
  );
}

export default TrafficFilterButton;
