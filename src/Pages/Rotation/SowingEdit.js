import React, {Component} from 'react';
import {editSowingData} from "../../Api";
import {Link} from "react-router-dom";

const IMG_PRE = 'http://localhost:1688/uploads/';

class SowingEdit extends Component {

    constructor(props){
        super(props);
        console.log(this.props.location);
        // 要修改的原始数据
        const sowing = this.props.location.state.item;
        this.state = {
            id: sowing._id,
            image_title: sowing.image_title,
            image_url: IMG_PRE + sowing.image_url,
            image_small_url:  IMG_PRE + sowing.image_small_url,
            image_link: sowing.image_link,
            s_time: sowing.s_time,
            e_time: sowing.e_time,
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="body teacher-profile">
                    <ol className="breadcrumb">
                        <li><Link to="/sowing/list">轮播图管理</Link></li>
                        <li className="active">编辑轮播图</li>
                    </ol>
                    <div className="settings">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">图片名称</label>
                                <div className="col-md-5">
                                    <input
                                        ref="image_title"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="填写图片名称"
                                        value = {this.state.image_title}
                                        onChange={(e)=>this._dealInputValue(e, 'image_title')}
                                    />
                                </div>
                            </div>
                            {/*大图*/}
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">大图</label>
                                <div className="col-md-2 preview">
                                    <img src={this.state.image_url} style={{border: 1}} />
                                    <input
                                        ref="image_url"
                                        type="file"
                                        className="form-control input-sm"
                                        placeholder="选择小图片"
                                        onChange={()=>this._previewImg('image_url')}
                                    />
                                    <div className="cover">
                                        <i className="fa fa-upload"></i>
                                    </div>
                                </div>
                            </div>
                            {/*小图*/}
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">小图</label>
                                <div className="col-md-2 preview">
                                    <img src={this.state.image_small_url} style={{border: 1}} />
                                    <input
                                        ref="image_small_url"
                                        type="file"
                                        className="form-control input-sm"
                                        placeholder="选择大图片"
                                        onChange={()=>this._previewImg('image_small_url')}
                                    />
                                    <div className="cover">
                                        <i className="fa fa-upload"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">跳转页面链接</label>
                                <div className="col-md-5">
                                    <input
                                        ref="image_link"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="填写跳转链接"
                                        value={this.state.image_link}
                                        onChange={(e)=>this._dealInputValue(e, 'image_link')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">计划上架时间</label>
                                <div className="col-md-5">
                                    <input
                                        ref="s_time"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="请填写上架的链接"
                                        value = {this.state.s_time.substr(0, 10)}
                                        onChange={(e)=>this._dealInputValue(e, 's_time')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-3 control-label">计划下架时间</label>
                                <div className="col-md-5">
                                    <input
                                        ref="e_time"
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="请填写下架的链接"
                                        value = {this.state.e_time.substr(0, 10)}
                                        onChange={(e)=>this._dealInputValue(e, 'e_time')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-8">
                                    <button onClick={()=>this._dealWithClick()} className="btn btn-danger btn-sm pull-right">确认修改</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    _dealInputValue(e, type){
        const value = e.target.value;
        if(type === 'image_title'){
            this.setState({
                image_title: value
            })
        }else if(type === 'image_link'){
            this.setState({
                image_link: value
            })
        }else if(type === 's_time'){
            this.setState({
                s_time: value
            })
        }else if(type === 'e_time'){
            this.setState({
                e_time: value
            })
        }

    }

    _dealWithClick(){
        const {id, image_title, image_link, s_time, e_time} = this.state;
        const {image_url, image_small_url} = this.props.location.state.item;

        let formData = new FormData();
        formData.append('id', id);
        formData.append('image_title', image_title);
        formData.append('image_link', image_link);
        formData.append('s_time', s_time);
        formData.append('e_time', e_time);
        formData.append('image_url', this.refs.image_url.files[0] || image_url);
        formData.append('image_small_url', this.refs.image_small_url.files[0] || image_small_url);

        editSowingData(formData).then((res)=>{
            if (res.status_code === 200){
                this.props.history.push('/sowinglist');
            }
        }).catch((error)=>{
            console.log(error);
            alert('edit failed')
        })

    }

    _previewImg(imgRef){
        // 1. 根据ref获取用户上传的文件
        let file = this.refs[imgRef].files[0];
        console.log(file);

        // 2. 修改图片的信息
        let src = '';
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }else {
            src = '';
        }
        // 阅读器已经解析完毕
        reader.onloadend = ()=>{
            src = reader.result;
            console.log(src);
            // 判断
            if(imgRef === 'image_url'){
                this.setState({
                    image_url: src
                })
            }else {
                this.setState({
                    image_small_url: src
                })
            }

        }
    }
}

export default SowingEdit;