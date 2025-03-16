import {
  Situation,
  FilterdDeviation,
  Deviation,
} from "../types/trafikVerketResponseType";

const addIfExists = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  if (value !== undefined && value !== null && value !== "") {
    obj[key] = value;
  }
};

export const filterAndFormatTrafficData = (situations: Situation[]) => {
  return situations.map((situation) => {
    const propertyArray: (keyof FilterdDeviation)[] = [
      "LocationDescriptor",
      "MessageType",
      "Message",
      "RoadNumber",
      "SeverityText",
      "TemporaryLimit",
      "StartTime",
      "EndTime",
      "VersionTime",
      "SeverityCode",
    ];

    const formattedData: FilterdDeviation = {
      LocationDescriptor: "",
      MessageType: "",
      Message: "",
      RoadNumber: "",
      SeverityText: "",
      TemporaryLimit: [],
      StartTime: "",
      EndTime: "",
      VersionTime: "",
      SeverityCode: 0,
    };
    const firstDeviation = situation.Deviation[0];

    propertyArray.forEach((property) => {
      let value = firstDeviation[property];

      if (
        (property === "StartTime" ||
          property === "EndTime" ||
          property === "VersionTime") &&
        typeof value === "string"
      ) {
        value = formatTimeProperty(value);
      }
      if (typeof value === "string" || typeof value === "number") {
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

      if (extraDeviations.length === 1 && extraDeviations[0].TemporaryLimit) {
        tempLimits.push(extraDeviations[0].TemporaryLimit);
      }

      if (tempLimits.length > 0) {
        formattedData.TemporaryLimit = tempLimits;
      } else {
        delete formattedData.TemporaryLimit;
      }
    } else if (
      formattedData.TemporaryLimit &&
      formattedData.TemporaryLimit.length < 1
    ) {
      delete formattedData.TemporaryLimit;
    }
    return formattedData;
  });
};

export const sortFilterdDeviations = (situations: FilterdDeviation[]) => {
  return situations.sort((a, b) => b.SeverityCode - a.SeverityCode);
};

export const formatTimeProperty = (timeProp: string) => {
  const date = new Date(timeProp);

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
