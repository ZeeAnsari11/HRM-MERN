import axios from 'axios';
import { authentication } from './configuration';
import { setAuth } from '../states/reducers/slices/backend/UserSlice';

export const loginAuth = (dispatcher, body, navigation) => {
    axios.post(authentication.login, body)
        .then((auth) => {
            dispatcher(setAuth(auth.data));
            localStorage.setItem('authToken', auth.data.token);
            navigation('/dashboard');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const logout = (dispatcher, navigation) => {
    axios.get(authentication.logout)
        .then((auth) => {
            console.log(auth);
            dispatcher(setAuth({ token: null, user: { _id: null } }));
            localStorage.removeItem('authToken');
            navigation('/');
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}