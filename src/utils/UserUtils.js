export const checkEligibility = (user, allowedUsers) => {
    const roles = user.roles || [];
    if(roles.length > 0){
        const result = roles.find((role)=> role.split("_")[1].toUpperCase()===allowedUsers)
        return !!result;
    }
    return !!0;
};

const USER_CONSTANT = "user-data";

export const updateSession = (userData)=> 
    sessionStorage.setItem(USER_CONSTANT, JSON.stringify(userData));
export const getToken = () =>
    `${JSON.parse(sessionStorage.getItem(USER_CONSTANT))?.tokenType} ${JSON.parse(sessionStorage.getItem(USER_CONSTANT))?.accessToken}`;