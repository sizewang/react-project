import React, { useState, useEffect  } from 'react';
import { Form, Card, Input, Button, message, Upload, Icon } from 'antd';
// 需要下载安装并引入富文本编辑器组件
import BraftEditor from "braft-editor";
// 需要下载安装并引入富文本编辑器样式
import "braft-editor/dist/index.css";
import { createApi, getOneById, modifyOne } from "../../../services/products";
import { serverUrl } from '../../../utils/config'

function Edit(props) {
    console.log(props);
    // props.macth.params.id 存在的话是修改或者为新增
    const { getFieldDecorator } = props.form;
    const [currentData, setCurrentData] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [loading,setLoading] = useState(false);
    const [editorState, setEditorState] = useState();

    // 初始化的时候执行
    useEffect(()=>{
        if(props.match.params.id) {
            getOneById(props.match.params.id).then( (res) => {
                // console.log('-------------',res);
                setCurrentData(res);
                // 修改的时候把原有的图片取出来
                setImageUrl(res.coverImg);
                setEditorState(BraftEditor.createEditorState(res.content));
            });
        }
    },[]);


    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    
    // 图片上传
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {//上传成功
          setLoading(false);
        //   console.log(info);
          setImageUrl(info.file.response.info)
        }
      };


    // 富文本编辑器
     const handleEditorChange = (v) => {
        setEditorState(v);
     }


    const priceValidate = (rule, value, callback) => {
        if(value*1>100){
            callback('价格不能大于一百')
        }else{
            callback();
        }
    }
    const handleSubmit = e =>{
        // editorState.toHTML()获取当前富文本的内容
        // console.log(editorState.toHTML());
        e.preventDefault();
        
        // 验证
        props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                // console.log(values);
                // console.log('提交');
                // 此处需要调用api接口
                if(props.match.params.id){
                    // 修改接口
                    modifyOne(props.match.params.id,{...values,coverImg:imageUrl, content:editorState.toHTML()})
                    .then((res)=>{
                        // console.log(":::::::::::::::",res);
                        // 新增成功之后跳转到商品列表页面
                        props.history.push("/admin/products");
                    })
                    .catch((err)=>{
                        // console.log(err);
                    });
                }else{
                    createApi({
                        ...values,
                        coverImg: imageUrl,//获取到图片后保存到页面中
                        // content: editorState.toHTML()
                    })
                    .then((res)=>{
                        // console.log(":::::::::::::::",res);
                        // 新增成功之后跳转到商品列表页面
                        props.history.push("/admin/products");
                    })
                    .catch((err)=>{
                        // console.log(err);
                    });
                }
            }else{
                message.error('请输入正确的内容')
            }
        })
    }
    return (
        // Card最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面
       <Card 
       title="商品编辑"
       extra={
           <Button onClick={()=>{
               props.history.push('/admin/products')
           }}>
               返回
           </Button>
       }
       >
           <Form onSubmit={e=>{handleSubmit(e)}}>
                <Form.Item  label="名字">
                    {getFieldDecorator("name",{
                        rules: [
                            {
                                required:true,
                                message:'请输入商品名字'
                            }
                        ],
                        // 取到初始值
                        initialValue: currentData.name
                    })(<Input placeholder="请输入商品名字"/>)}
                </Form.Item>
                <Form.Item  label="价格">
                    {getFieldDecorator("price",{
                        rules: [
                            {
                                required:true,
                                message:'请输入商品价格'
                            },
                            {
                                validator:priceValidate
                            }
                        ],
                        initialValue: currentData.price
                    })(<Input placeholder="请输入商品价格"/>)}
                </Form.Item>

                <Form.Item label="主图">
                <Upload
                    // 和服务端约好的名字
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={serverUrl + "/api/v1/common/file_upload"}
                    onChange={(info)=>handleChange(info)}
                >
                    { imageUrl ? 
                        <img 
                            src={serverUrl + imageUrl} 
                            alt="avatar" 
                            style={{ width: '100%' }} 
                        /> 
                        : uploadButton
                    }
                </Upload>
                </Form.Item>
                <Form.Item label="详情">
                    <BraftEditor
                        value={editorState}
                        // 富文本编辑器
                        onChange={(e) => handleEditorChange(e)}
                    />
               </Form.Item>
               <Form.Item>
                   <Button htmlType="submit" type="primary">保存</Button>
               </Form.Item>
           </Form>
       </Card>
    );
}

export default Form.create({ name: "productEdit" }) (Edit);
