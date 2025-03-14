export type Deviation = {
  AffectedDirection: string;
  AffectedDirectionValue: string;
  CountyNo: number[];
  CreationTime: string;
  Creator: string;
  EndTime: string;
  Geometry: {
    Line: {
      SWEREF99TM: string;
      WGS84: string;
    };
    Point: {
      SWEREF99TM: string;
      WGS84: string;
    };
  };
  IconId: string;
  Id: string;
  LocationDescriptor: string;
  ManagedCause: boolean;
  Message: string;
  MessageCode: string;
  MessageCodeValue: string;
  MessageType: string;
  MessageTypeValue: string;
  NumberOfLanesRestricted: number;
  RoadName: string;
  RoadNumber: string;
  RoadNumberNumeric: number;
  SafetyRelatedMessage: boolean;
  SeverityCode: number;
  SeverityText: string;
  StartTime: string;
  TrafficRestrictionType: string;
  VersionTime: string;
};
