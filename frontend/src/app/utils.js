
export const camelToUnderscore = (key) => {
    return key.replace( /([A-Z])/g, "_$1").toLowerCase();
}

export const underscoreObject = (obj) => {
    const newObject = {}

    for (var camel in obj) {
        newObject[camelToUnderscore(camel)] = obj[camel];
    }

    return newObject;
}