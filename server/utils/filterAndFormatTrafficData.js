const addIfExists = (obj, key, value) => {
    if (value !== undefined && value !== null && value !== "") {
        obj[key] = value;
    }
};
export const filterAndFormatTrafficData = (situations) => {
    return situations.map((situation) => {
        const propertyArray = [
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
        const formattedData = {};
        const firstDeviation = situation.Deviation[0];
        propertyArray.forEach((property) => {
            const value = firstDeviation[property];
            if (typeof value === "string" || typeof value === "number") {
                addIfExists(formattedData, property, value);
            }
        });
        if (situation.Deviation.length > 1) {
            const extraDeviations = situation.Deviation.slice(1);
            const tempLimits = [];
            if (extraDeviations.length > 1) {
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
        return formattedData;
    });
};
export const sortFilterdDeviations = (situations) => {
    return situations.sort((a, b) => b.SeverityCode - a.SeverityCode);
};
