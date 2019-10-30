import React, { Component } from 'react';

class LKHeader extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-custom">
                    <div className="navbar-header">
                        <a className="navbar-brand">数据分发管理系统</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        {/*<li><a href="/mine"><i className="fa fa-user"></i>个人中心</a></li>*/}
                        <li><a><i className="fa fa-bell"></i><span
                            className="badge">20</span></a></li>
                        <li><a><i className="fa fa-sign-out"></i>退出</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default LKHeader;