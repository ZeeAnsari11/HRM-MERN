import axios from 'axios';
import { authentication, userRoutes } from './configuration';
import { setAuth, setCurrentUser } from '../states/reducers/slices/backend/UserSlice';

export const loginAuth = (dispatcher, body, navigation) => {
    axios.post(authentication.login, body)
        .then((auth) => {
            dispatcher(setAuth(auth.data));
            localStorage.setItem('currentUser', auth.data.user._id);
            localStorage.setItem('organization', auth.data.user.organization);
            localStorage.setItem('authToken', auth.data.token);
            getCurrentUser(auth.data.user._id, dispatcher);
            navigation('/dashboard');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const logout = (dispatcher, navigation) => {
    axios.get(authentication.logout)
        .then((auth) => {
            dispatcher(setAuth({ token: null, user: { _id: null } }));
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            navigation('/');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const getCurrentUser = (dispatcher, setLoaded=null) => {
    const userId = localStorage.getItem("currentUser")
    console.log(localStorage.getItem('currentUser'));
    axios.get(userRoutes.getUserById + userId)
        .then((user) => {
            dispatcher(setCurrentUser(user.data.user));
            if (setLoaded !== null) setLoaded(false);
        }).catch((error) => {
            console.log(error)
        })
}