import { Situation, FilterdDeviation } from "../types/trafikverketResponseType";

export const filterAndFormatTrafficData = (situations: Situation[]) => {
  return situations.map((situation) => {
    const firstDeviation = situation.Deviation[0];

    const formattedData = {
      LocationDescriptor: firstDeviation.LocationDescriptor || "",
      MessageType: firstDeviation.MessageType || "",
      Message: firstDeviation.Message || "",
      RoadNumber: firstDeviation.RoadNumber || "",
      SeverityText: firstDeviation.SeverityText || "",
      StartTime: formatTimeProperty(firstDeviation.StartTime) || "",
      EndTime: formatTimeProperty(firstDeviation.EndTime) || "",
      VersionTime: formatTimeProperty(firstDeviation.VersionTime) || "",
      SeverityCode: firstDeviation.SeverityCode || 0,
      UpdateType: "Traffic",
    };

    if (situation.Deviation.length > 1) {
      const extraDeviations = situation.Deviation.slice(1);
      const tempLimits: string[] = [];

      if (firstDeviation.TemporaryLimit) {
        tempLimits.push(firstDeviation.TemporaryLimit);
      }

      if (situation.Deviation.length > 1) {
        extraDeviations.forEach((deviation) => {
          if (deviation.TemporaryLimit) {
            tempLimits.push(deviation.TemporaryLimit);
          }
        });
      }
      if (tempLimits.length > 0) {
        return {
          ...formattedData,
          TemporaryLimit: tempLimits,
        };
      }
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
