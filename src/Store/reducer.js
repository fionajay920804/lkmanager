import * as constants from './actionTypes';

const defaultState = {
    homeData: {},
    sowingData: [],
    userData:{},

};

export  default (state = defaultState, action)=>{
    if(action.type === constants.INIT_HOME_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.homeData = action.homeData;
        return newState;
    }else if(action.type === constants.INIT_Sowing_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.sowingData = action.sowingData;
        return newState;
    }else if(action.type === constants.INIT_User_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        sessionStorage.setItem('userData', JSON.stringify(action.userData));
        newState.userData = action.userData;
        return newState;
    }
    return state;

}