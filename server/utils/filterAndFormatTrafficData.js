export const filterAndFormatTrafficData = (situations) => {
    const result = {
        Road: [],
        Ferry: [],
    };
    situations.forEach((situation) => {
        const firstDeviation = situation.Deviation[0];
        const isFerryUpdate = firstDeviation.MessageType === "Färjor";
        const formattedData = {
            LocationDescriptor: firstDeviation.LocationDescriptor || "",
            MessageType: firstDeviation.MessageType || "",
            MessageCode: firstDeviation.MessageCode || "",
            Message: firstDeviation.Message || "",
            RoadNumber: firstDeviation.RoadNumber || "",
            SeverityText: firstDeviation.SeverityText || "",
            StartTime: formatTimeProperty(firstDeviation.StartTime) || "",
            EndTime: formatTimeProperty(firstDeviation.EndTime) || "",
            VersionTime: formatTimeProperty(firstDeviation.VersionTime) || "",
            SeverityCode: firstDeviation.SeverityCode || 1,
            UpdateType: isFerryUpdate ? "Ferry" : "Traffic",
        };
        if (situation.Deviation.length > 1) {
            const extraDeviations = situation.Deviation.slice(1);
            const tempLimits = [];
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
                formattedData.TemporaryLimit = tempLimits;
            }
        }
        if (isFerryUpdate) {
            if (firstDeviation.Header) {
                formattedData.Header = firstDeviation.Header;
            }
            result.Ferry.push(formattedData);
        }
        else {
            result.Road.push(formattedData);
        }
    });
    Object.keys(result).forEach((key) => {
        if (result[key].length > 1) {
            result[key] = result[key].sort((a, b) => new Date(b.VersionTime).getTime() - new Date(a.VersionTime).getTime());
        }
    });
    return result;
};
export const sortFilterdDeviations = (situations) => {
    return situations.sort((a, b) => new Date(b.VersionTime).getTime() - new Date(a.VersionTime).getTime());
};
export const formatTimeProperty = (timeProp) => {
    const date = new Date(timeProp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
