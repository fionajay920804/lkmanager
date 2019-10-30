import * as constants from './actionTypes';
import {getHomeData, getSowingData, getUserData} from "../Api";


//get homeopage data
export const getHomeAction = () => {
    return (dispatch) => {
        getHomeData().then((res) => {
            if (res.status_code === 200) {
                const homeData = res.result[0];
                dispatch({
                    type: constants.INIT_HOME_DATA,
                    homeData
                })

            }
        }).catch(() => {
            alert('request failed')
        })
    }
};

export const getSowingDataAction = () => {
    return (dispatch) => {
        getSowingData().then((res) => {
            if (res.status_code === 200) {
                const sowingData = res.result;
                dispatch({
                    type: constants.INIT_Sowing_DATA,
                    sowingData
                })

            }
        }).catch(() => {
            alert('request failed')
        })
    }
};

export const getUserDataAction = (data, callback)=>{
    return (dispatch)=>{
        // 2.1 发起网络请求
        getUserData(data).then((res)=>{
            if(res.status_code === 200){
                const userData = res.result;
                dispatch({
                    type: constants.INIT_User_DATA,
                    userData
                });
                // 成功的回调
                callback && callback(userData);
            }else {
                alert(res.result);
            }
        }).catch((error)=>{
            alert(error);
        })
    }
};