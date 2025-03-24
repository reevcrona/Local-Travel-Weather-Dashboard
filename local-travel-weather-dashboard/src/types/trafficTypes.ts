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
};
export type TrainDeviation = {
  ExternalDescription: string;
  AffectedLocations: string[];
  StartTime: string;
  VersionTime: string;
  MessageType: string;
  UpdateType: string;
};
