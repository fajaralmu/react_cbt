import * as types from './types'
const apiURL = "http://localhost/ReactLatihan/service_cbt/index.php/cbt/";

const apiURL_user = "http://localhost/ReactLatihan/service_cbt/index.php/account/";

export const addUser = (user) => ({
    type: types.ADD_USER,
    payload: [],
    meta: {
        type: 'add_user',
        url: apiURL_user + "add",
        user: user
    }
})

export const userLogin = (user) => ({
    type: types.LOG_IN,
    payload: [],
    meta: {
        type: 'user_login',
        url: apiURL_user + "getin",
        user: user
    }
})

export const fetchAllExam = () => ({
    type: types.FETCH_ALL_EXAM,
    payload: [],
    meta: {
        type: 'api',
        url: apiURL + "all"
    }
})

export const deleteExam = (id) => ({
    type: types.DELETE_EXAM,
    payload: [],
    meta: {
        type: 'delete_exam',
        url: apiURL + "remove/" + id,
        id: id
    }
})

export const getExamById = (id) => ({
    type: types.FETCH_EXAM_BY_ID,
    payload: [],
    meta: {
        type: 'get_exam_by_id',
        url: apiURL + "get/" + id,
        id: id
    }
})

export const submitExam = (exam) => ({
    type: types.SUBMIT_EXAM,
    payload: [],
    meta: {
        type: 'submit_exam',
        url: apiURL + "submitexam",
        exam: exam
    }
})

export const appNewExam = (exam) => ({
    type: types.ADD_EXAM,
    payload: [],
    meta: {
        type: 'add_exam',
        url: apiURL + "add",
        exam: exam
    }
})

export const updateExam = (exam) => ({
    type: types.UPDATE_EXAM,
    payload: [],
    meta: {
        type: 'update_exam',
        url: apiURL + "updateexam",
        exam: exam
    }
})

export const fetchOneExam = () => ({
    type: types.FETCH_ONE_EXAM,
    payload: [{
        id: 1,
        title: "ff",
        user: {
            name: "suser",
            role: "d.role",
        },
        date: "2019-11-12",
        body: "body body body body"
    },
    ]
})

export const login = () => ({
    type: types.LOG_IN,
    payload: {
        name: "el-fajr",
        status: "logged in"
    }
})

export const logout = () => ({
    type: types.LOG_OUT,
    payload: {
        name: "el-fajr",
        status: "logged out"
    }
})