export type Deviation = {
  LocationDescriptor: string;
  RoadNumber: string;
  SeverityText: string;
  VersionTime: string;
  StartTime: string;
  EndTime: string;
  Message: string;
  MessageType: string;
  MessageCode: string;
  TemporaryLimit?: string[];
  SeverityCode: number;
  UpdateType: string;
};
export type TrainDeviation = {
  LocationDescriptor: string;
  AffectedLocations: string[];
  StartTime: string;
  VersionTime: string;
  MessageType: string;
  MessageCode: string;
  UpdateType: string;
};

export type TrafficData = {
  Road: Deviation[];
  Ferry: Deviation[];
};

export type FerryDeviation = {
  Header: string;
  EndTime: string;
  LocationDescriptor: string;
  Message: string;
  MessageCode: string;
  MessageType: string;
  RoadNumber: string;
  SeverityCode: number;
  SeverityText: string;
  StartTime: string;
  TemporaryLimit: string[];
  UpdateType: string;
  VersionTime: string;
};
