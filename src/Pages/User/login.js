import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserDataAction} from '../../Store/actionCreators'

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            user_name:'',
            user_pwd:'',
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login-wrap">
                    {/*<div className="avatar">*/}
                    {/*    <img src="./uploads/logo.jpg" className="img-circle" alt="" />*/}
                    {/*</div>*/}
                    <form action="" className="col-md-offset-1 col-md-10">
                        <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                        <i className="fa fa-id-card-o"></i>
                    </span>
                            <input
                                name='user_name'
                                type="text"
                                className="form-control"
                                placeholder="用户名"
                                onChange={e=>this.onInputChange(e)}
                                onKeyUp={e=>this.onInputKeyUp(e)}
                            />
                        </div>
                        <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                        <i className="fa fa-key"></i>
                    </span>
                            <input type="password" className="form-control" placeholder="密码"
                                   name='user_pwd'
                                   onChange={e=>this.onInputChange(e)}
                                   onKeyUp={e=>this.onInputKeyUp(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-danger btn-block"
                                onClick={e=>this.onSubmit()}

                        >登 录</button>
                    </form>
                </div>
            </div>
        );
    }

    onInputChange(e){
        let inputValue = e.target.value,
            inputName = e.target.name;

        this.setState({
            [inputName] : inputValue
        })

    }

    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit(e);
        }

    }

    onSubmit(){
        const {user_name, user_pwd} = this.state;
        // 3.2 验证数据
        if(!user_name){
            alert("输入的口令不能为空！");
            return;
        }
        if(!user_pwd){
            alert("输入的密码不能为空！");
            return;
        }

        let formData = new FormData();
        formData.append('user_name', user_name);
        formData.append('user_pwd', user_pwd);

        // 3.4 发起网络请求
        this.props.reqLogin(formData, (userData)=>{
            if(userData.token !== ''){
                this.props.history.push('/');
            }
        })
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogin(data, callback){
            const action = getUserDataAction(data, callback);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(Login);
