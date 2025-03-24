export type Deviation = {
  LocationDescriptor: string;
  RoadNumber: string;
  SeverityText: string;
  VersionTime: string;
  StartTime: string;
  EndTime: string;
  Message: string;
  MessageType: string;
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
  UpdateType: string;
};
