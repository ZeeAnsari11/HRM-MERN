const baseUrl = 'http://127.0.0.1:4000/api/v1';

export const authentication = {
    login: baseUrl+'/login',
    logout: baseUrl+'/logout',
}

export const userRoutes = {
    getUserById: baseUrl+'/user/',
}

export const organizationRoutes = {
    getUserById: baseUrl+'/organization/',
}