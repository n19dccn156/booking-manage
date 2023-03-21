
const Constants = {
    host: 'http://localhost',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    HOTEL: 'HOTEL',
    EMPLOYEE: 'EMPLOYEE',
    ADMIN: 'ADMIN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    SET_ROLE: 'SET',
    REMOVE_ROLE: 'REMOVE',
    URL_AUTHOZ: '/api/v1/users/authorization',
    URL_ORDER_BY_HOTEL: '/api/v1/orders',
    STATUS: {
        AWAIT: 'CHOXACNHAN',
        COMFIRM: 'DATTHANHCONG',
        ONGOING: 'DANGSUDUNG',
        COMPLETE: 'DAHOANTHANH',
        CANCEL: 'DAHUY',
    }
}

export default Constants;