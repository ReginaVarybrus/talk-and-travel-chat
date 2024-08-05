export const generateUniqueKey = () =>
    `${Date.now()}-${Math.floor(Math.random() * 1000)}`;