import request from '../utils/request';
import URL from './url'
export const getChildData = query => {
    return request({
        // url: URL.GET_CHILD_DATA,
        url: './people.json',
        method: 'get',
        params: query
    });
};
export const getAuditData = query => {
    return request({
        // url: URL.GET_AUDIT_DATA,
        url: '../../public/people.json',
        method: 'get',
        params: query
    });
};
// export const postPeopleData = data => {
//     return request({
//         url: URL.POST_PEOPLE_DATA,
//         method: 'post',
//         data
//     });
// };
export const getVaccineData = query => {
    return request({
        // url: URL.GET_VACCINE_DATA,
        url: './vaccine.json',
        method: 'get',
        params: query
    });
};
// export const postVaccineData = data => {
//     return request({
//         url: URL.POST_VACCINE_DATA,
//         method: 'post',
//         data
//     });
// };
// export const getInoculationData = query => {
//     return request({
//         // url: URL.GET_INOCULATION_DATA,
//         url: virtual.inoculation,
//         method: 'get',
//         params: query
//     });
// };
// export const postInoculationData = data => {
//     return request({
//         url: URL.POST_INOCULATION_DATA,
//         method: 'post',
//         data
//     });
// };
export const getUserData = params => {
    return request({
        url: './user.json',
        method: 'get',
        params
    });
};
