export const formatPlaceDescription = (description: string) =>
    description.length > 100 ? `${description.substring(0, 97)}...` : description;