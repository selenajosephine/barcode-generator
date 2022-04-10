export const checkEligibility = (user, allowedUsers) => {
    const roles = user.roles || [];
    if(roles.length > 0){
        const result = roles.find((role)=> role.split("_")[1].toUpperCase()===allowedUsers)
        return !!result;
    }
    return !!0;
};

export const updateSession = (userData)=> 
    sessionStorage.setItem("user-data", JSON.stringify(userData));
