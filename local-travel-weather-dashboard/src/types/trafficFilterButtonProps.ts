export type trafficFilterButtonProps = {
  handleFilterChange: (
    filterString: "all" | "trains" | "roads" | "ferry",
  ) => void;
  activeFilter: "all" | "trains" | "roads" | "ferry";
  trafficAmount: number;
  filtervalue: {
    eng: "all" | "trains" | "roads" | "ferry";
    swe: "Alla" | "Tåg" | "Väg" | "Färja";
  };
};
