import React, { useEffect, useState } from 'react';
import useAsync from '../useAsync';
import { interceptor } from "../../utils/interceptor";
import LocalStorageService from '../../utils/localStorageService';
const localStorageService = LocalStorageService.getService();
const axiosInstance = interceptor();

const useAuth = () => {

    const {status, data, setData, error, setError, run} = useAsync();

    const checkToken = () => {
        const token = localStorageService.getAccessToken();
        return new Promise((resolve, reject) => {
            if (!token) {
                reject('no token');
            } else {
                axiosInstance.post("/api/login/token/verify/", {
                    token
                })
                .then((res) => (resolve({token, auth: true})))
                .catch((error) => (resolve({token, auth: true})));
            }
        })
    }
    
    useEffect(() => {
        (async () => {
            try {
                run(checkToken());
            } catch (err) {
                setError(error);
            }
          })();
    }, [])
    
    return {
        status,
        data,
        error,
        setData
    };
}

export default useAuth;