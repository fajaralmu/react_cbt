import { createStore, applyMiddleware } from 'redux'
import { initialState, rootReducer } from './reducers'
import { fetchAllExam } from './actionCreators';

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            loggigMiddleware,
            apiMiddleware,
            addExamMiddleware,
            submitExamMiddleware,
            udpateExamMiddleware,
            getExamByIdMiddleware,
            deleteExamMiddleware,
            userLoginMiddleware,
            addUserMiddleware
        )
    );

    return store;
}

const userLoginMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'user_login') {
        return next(action);
    }
    if (!window.confirm("continue sign in?"))
        return false;
    let user = action.meta.user;
   
    fetch(action.meta.url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let logstatus = false;
            if(data == 1){
                alert("correct identity");
                logstatus = true;
            }else{
                alert("incorrect identity");
            }
            let newAction = Object.assign({}, action, {
                payload: logstatus
            });
            
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => console.log(err));
}

const addUserMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'add_user') {
        return next(action);
    }
    if (!window.confirm("continue registration?"))
        return false;
    let user = action.meta.user;
   
    fetch(action.meta.url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let regstatus = false;
            if(data == 1){
                alert("registration successfull");
                regstatus = true;
            }else{
                alert("registration unsuccessfull");
            }
            let newAction = Object.assign({}, action, {
                payload: regstatus
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => console.log(err));
}

const loggigMiddleware = store => next => action => {
    console.log(`Redux Log `, action);
    next(action);
}

const addExamMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'add_exam') {
        return next(action);
    }
    if (!window.confirm("LANJUT?"))
        return false;
    let exam = action.meta.exam;
    console.log("exam to be added ", exam);
    fetch(action.meta.url, {
        method: 'POST',
        body: JSON.stringify(exam),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            if (res == 1) {
                alert("tambah sukses");
                store.dispatch(fetchAllExam());
            }
        })
        .catch(err => console.log(err));
}

const udpateExamMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'update_exam') {
        return next(action);
    }
    if (!window.confirm("LANJUT?"))
        return false;
    let exam = action.meta.exam;
    console.log("exam to be update ", exam);
    fetch(action.meta.url, {
        method: 'PUT',
        body: JSON.stringify(exam),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()
    ).then(res => {
        if (res == 1) {
            store.dispatch(fetchAllExam());
            alert("update sukses");
        }
    }).catch(err => console.log(err));
}

const deleteExamMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'delete_exam') {
        return next(action);
    }
    if (!window.confirm("DELETE?"))
        return false;
    fetch(action.meta.url, {
        method: 'DELETE'
    }).then(response => response.json()
    ).then(res => {
        if (res == 1) {
            store.dispatch(fetchAllExam());
            alert("delete sukses");
        }
    }).catch(err => console.log(err));
}

const submitExamMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'submit_exam') {
        return next(action);
    }
    if (!window.confirm("LANJUT?"))
        return false;
    let exam = action.meta.exam;
    console.log("exam to be tested ", exam);
    fetch(action.meta.url, {
        method: 'POST',
        body: JSON.stringify(exam),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => console.log(err));
}

const apiMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'api') {
        return next(action);
    }
    console.log("API Action, ", action);
    const { url } = action.meta
    const fetchOption = Object.assign({}, action.meta);

    fetch(url, fetchOption)
        .then(response => response.json())
        .then(data => {
            let exams = data;

            let newAction = Object.assign({}, action, {
                payload: exams
            });
            delete newAction.meta;
            store.dispatch(newAction);
        });
}

const getExamByIdMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'get_exam_by_id') {
        return next(action);
    }
    console.log("API Action, ", action);
    const { url } = action.meta

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        data => {
            let exam = data
            let newAction = Object.assign({}, action, {
                payload: exam
            });
            delete newAction.meta;
            store.dispatch(newAction);
        }
    ).catch(err => { alert(err); console.log(err); });
}


export default configureStore;