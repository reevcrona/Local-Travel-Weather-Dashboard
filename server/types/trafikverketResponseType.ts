export type Deviation = {
  AffectedDirection: string;
  AffectedDirectionValue: string;
  CountyNo?: number[];
  CreationTime: string;
  Creator: string;
  EndTime: string;
  Geometry?: {
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
  LocationDescriptor?: string;
  ManagedCause?: boolean;
  Message?: string;
  MessageCode: string;
  MessageCodeValue: string;
  MessageType: string;
  MessageTypeValue: string;
  NumberOfLanesRestricted: number;
  RoadName?: string;
  RoadNumber: string;
  RoadNumberNumeric: number;
  SafetyRelatedMessage: boolean;
  SeverityCode?: number;
  SeverityText?: string;
  StartTime: string;
  TrafficRestrictionType: string;
  TemporaryLimit?: string;
  VersionTime: string;
};
export type Situation = {
  CountryCode: string;
  Deleted: boolean;
  Deviation: Deviation[];
  Id: string;
  ModifiedTime: string;
  PublicationTime: string;
  VersionTime: string;
};
export type TrainMessageData = {
  AffectedLocation: string[];
  CountyNo: number[];
  Deleted: boolean;
  EventId: string;
  ExternalDescription: string;
  Geometry: {
    SWEREF99TM: string;
    WGS84: string;
  };
  LastUpdateDateTime: string;
  ModifiedTime: string;
  ReasonCodeText: string;
  StartDateTime: string;
};
export type TrainStationData = {
  Advertised: boolean;
  AdvertisedLocationName: string;
  AdvertisedShortLocationName: string;
  PrimaryLocationCode: string;
  CountryCode: string;
  CountyNo: number[];
  Deleted: boolean;
  Geometry: {
    SWEREF99TM: string;
    WGS84: string;
  };
  LocationInformationText: string;
  LocationSignature: string;
  PlatformLine: string[];
  Prognosticated: boolean;
  OfficialLocationName: string;
  ModifiedTime: string;
};
export type TrafikverketResponse = {
  RESPONSE: {
    RESULT: Array<{
      Situation: Situation[];
    }>;
  };
};
export type TrafikverketTrainMessageResponse = {
  RESPONSE: {
    RESULT: Array<{
      TrainMessage: TrainMessageData[];
    }>;
  };
};
export type TrafikverketTrainStationResponse = {
  RESPONSE: {
    RESULT: Array<{
      TrainStation: TrainStationData[];
    }>;
  };
};
export type FilterdDeviation = {
  LocationDescriptor: string;
  RoadNumber: string;
  SeverityText: string;
  VersionTime: string;
  StartTime: string;
  EndTime: string;
  Message: string;
  MessageCode: string;
  MessageType: string;
  TemporaryLimit?: string | string[];
  SeverityCode: number;
  UpdateType: string;
};
