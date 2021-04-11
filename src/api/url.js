export default {
    POST_REGISTER_CODE: '/register/code',//发送注册验证码
    POST_REGISTER: '/register/create',

    GET_CHILDS_DATA: '/childs/detail',
    POST_CHILDS_DATA: '/childs/create',//新建
    POST_DELETE_CHILDS_DATA: '/childs/delete',//删除
    POST_MODIFICATION_CHILD: '/childs/modify',//修改

    GET_VACCINE_DATA: '/vaccines/detail',
    POST_VACCINE_DATA: '/vaccines/create',
    POST_DELETE_VACCINE_DATA: '/vaccines/delete',//删除
    POST_MODIFICATION_VACCINE: '/vaccines/modify',//修改疫苗
    GET_FIXEDVACCINE_DATA: '/vaccines/fixedvaccines',//得到固定疫苗信息渲染

    GET_INOCULATION_DATA: '/inoculations/detail',
    POST_INOCULATION_DATA: '/inoculations/create',

    POST_LOGIN: '/users/login',//登录
    GET_USER_DATA: '/users/detail',
    GET_USER_COUNT: '/users/count',
    POST_MODIFICATION_USER: '/users/modify',
    POST_DELETE_USERS_DATA: '/users/delete',

    GET_COUNT: '/vaccines/count',//接种人数，接种疫苗数，疫苗种类数
};