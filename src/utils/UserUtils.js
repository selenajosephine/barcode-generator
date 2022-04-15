export const checkEligibility = (roles = [], allowedUsers) => {
    if (roles.length > 0) {
        const result = roles.find((role) => role.split("_")[1] === allowedUsers.toUpperCase())
        return !!result;
    }
    return !!0;
};

const USER_CONSTANT = "user-data";

export const updateSession = (userData) =>
    sessionStorage.setItem(USER_CONSTANT, JSON.stringify(userData));

export const getToken = () =>
    `${JSON.parse(sessionStorage.getItem(USER_CONSTANT))?.tokenType} ${JSON.parse(sessionStorage.getItem(USER_CONSTANT))?.accessToken}`;

export const getUserInSession = () =>
    JSON.parse(sessionStorage.getItem(USER_CONSTANT))