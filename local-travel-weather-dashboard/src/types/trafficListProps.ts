import { Deviation, TrainDeviation, FerryDeviation } from "./trafficTypes";

export type TrafficListProps = {
  info: Deviation | TrainDeviation | FerryDeviation;
};
export type TrafficListChildProps = {
  info: Deviation | TrainDeviation | FerryDeviation;
  bgColor: string;
  textColor: string;
  borderColor: string;
};
