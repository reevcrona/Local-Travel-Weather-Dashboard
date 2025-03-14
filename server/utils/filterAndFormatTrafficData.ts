import {
  Situation,
  FilterdDeviation,
  Deviation,
} from "../types/trafikVerketResponseType";

const addIfExists = (
  obj: Record<string, string | string[]>,
  key: string,
  value: string | string[]
) => {
  if (value !== undefined && value !== null && value !== "") {
    obj[key] = value;
  }
};

export const filterAndFormatTrafficData = (situations: Situation[]) => {
  return situations.map((situation) => {
    const propertyArray: (keyof Deviation)[] = [
      "LocationDescriptor",
      "MessageType",
      "Message",
      "RoadNumber",
      "SeverityText",
      "TemporaryLimit",
      "StartTime",
      "EndTime",
      "VersionTime",
    ];

    const formattedData: Record<string, string | string[]> = {};
    const firstDeviation = situation.Deviation[0];

    propertyArray.forEach((property) => {
      const value = firstDeviation[property];

      if (typeof value === "string") {
        addIfExists(formattedData, property, value);
      }
    });

    if (situation.Deviation.length > 1) {
      const extraDeviations = situation.Deviation.slice(1);
      const tempLimits: string[] = [];
      if (extraDeviations.length > 1) {
        extraDeviations.forEach((deviation) => {
          if (deviation.TemporaryLimit) {
            tempLimits.push(deviation.TemporaryLimit);
          }
        });
      }
      if (tempLimits.length > 0) {
        formattedData.TemporaryLimits = tempLimits;
      }
    }

    return formattedData;
  });
};
