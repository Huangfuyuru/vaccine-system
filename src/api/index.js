import request from '../utils/request';
import URL from './url'
export const postLoginUser = data => {
    return request({
        url: URL.POST_LOGIN,
        method: 'post',
        data
    });
};

export const getPeopleData = query => {
    return request({
        url: URL.GET_PEOPLE_DATA,
        method: 'get',
        query
    });
};

export const getCount = query => {
    return request({
        url: URL.GET_COUNT,
        method: 'get',
        query
    });
};

export const postMPeopleData = data => {
    return request({
        url: URL.POST_MODIFICATION_CHILD,
        method: 'post',
        data
    });
};

export const postPeopleData = data => {
    return request({
        url: URL.POST_PEOPLE_DATA,
        method: 'post',
        data
    });
};

export const postDeletePeople = data => {
    return request({
        url: URL.POST_PEOPLE_DATA,
        method: 'post',
        data
    });
};

export const getVaccineData = query => {
    return request({
        url: URL.GET_VACCINE_DATA,
        method: 'get',
        query
    });
};

export const getVaccineCount = query => {
    return request({
        url: URL.GET_VACCINE_Count,
        method: 'get',
        query
    });
};

export const postVaccineData = data => {
    return request({
        url: URL.POST_VACCINE_DATA,
        method: 'post',
        data
    });
};

export const postDeleteVaccine = data => {
    return request({
        url: URL.POST_DELETE_VACCINE_DATA,
        method: 'post',
        data
    });
};

export const getInoculationData = query => {
    return request({
        url: URL.GET_INOCULATION_DATA,
        method: 'get',
        query
    });
};

export const postInoculationData = data => {
    return request({
        url: URL.POST_INOCULATION_DATA,
        method: 'post',
        data
    });
};

export const getUserData = query => {
    return request({
        url: URL.GET_USER_DATA,
        method: 'get',
        query
    });
};

export const getUserCount = query => {
    return request({
        url: URL.GET_USER_COUNT,
        method: 'get',
        query
    });
};

export const postUserData = data => {
    return request({
        url: URL.POST_USER_DATA,
        method: 'post',
        data
    });
};

export const getFixedVaccines = async query => {
    return await request({
        url: URL.GET_FIXEDVACCINE_DATA,
        method: 'get',
        query
    });
};
