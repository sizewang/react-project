import React,{useEffect,useState} from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { loadProduct } from '../../../store/action/product';
import { listApi, delOne, modifyOne } from '../../../services/products';
import { serverUrl } from '../../../utils/config'
import './list.css';

// const dataSource = [
//     {
//         id:1,
//         name:'香皂',
//         price:5
//     },
//     {
//         id:2,
//         name:'特仑苏',
//         price:6
//     },
//     {
//         id:1,
//         name:'小浣熊',
//         price:1.5
//     },
// ]

function List(props) {
    console.log(props)
    // 定义局部状态
    // const [dataSource,setDataSource] = useState([]);
    // const [total,setTotal] = useState(0);
    // const [currentPage,setCurrentPage] = useState(1)


    const {list,page,total} = props


    useEffect(()=>{
        props.dispatch(
            loadProduct({
              page:1,
            //   name:'小米'
        })
      );
        // listApi().then((res)=>{
        //     // console.log("------------",res);
        //     setDataSource(res.products);
        //     setTotal(res.totalCount);
        // })
    },[]);

    // 实现分页
    const loadData = () =>{
        // // console.log(page);获取上下页码
        // listApi(page).then((res)=>{
        //     // 把页码值传过去 重新获取数据
        //     setDataSource(res.products);
        //     setTotal(res.totalCount);
        //     setCurrentPage(page);//修改完数据之后保持在当前页
        // })
        props.dispatch(
            loadProduct({
              page:page,
            //   name:'小米'
        })
      );

    }


    // 组件初始化的时候执行
    const columns = [
    {
        title:'序号',
        key:'_id',
        width:80,
        align:'center',
        render:(txt, record, index) => index + 1
    },
    {
        title:'名字',
        dataIndex:'name'
    },
    {
        title:'主图',
        dataIndex:'coverImg',
        render:(txt, record) => 
        record.coverImg ? (
        <img 
            src={serverUrl + record.coverImg}
            alt={record.name}
            style={{width:'120px'}}
        />
        ) : (
            "暂无图片"
        )
    },
    {
        title:'价格',
        dataIndex:'price'
    },
    {
        title:'是否在售',
        dataIndex:'onSale',
        render:(txt,record) => (record.onSale ? "在售" : "已下架")
    },
    {
        title:'操作',
        render:(txt, record, index) =>{
            return(
                <div>
                    <Button type="primary" size="small" onClick={()=>{
                        // console.log(record._id)
                        // 当我们点击编辑时 跳转到edit页面 传递id作为参数
                        props.history.push(`/admin/products/edit/${record._id}`);
                    }}>
                        修改
                    </Button>
                    <Popconfirm 
                        title="确定删除此项吗"
                        onCancel={() => {console.log("用户取消删除")}}
                        onConfirm={() => {
                            // console.log("用户确认删除");
                            // 此处调用api接口进行相关操作
                            delOne(record._id).then(()=>{
                                // 删除成功之后重新加载数据并保持在当前页
                                loadData();
                            })
                        }}

                    >
                    <Button style={{margin:'0 1rem'}} type="danger" size="small">
                        删除
                    </Button>
                    </Popconfirm>
                    <Button size="small" onClick={()=>{
                        // 修改在售状态
                        modifyOne(record._id,{ onSale:!record.onSale }).then((res)=>{
                            // 修改成功之后重新加载数据并保持在当前页
                            loadData();
                        })
                    }}>
                        {record.onSale ? "下架" : "上架"}
                    </Button>
                </div>
            )
        }
    }
]
    return (
        <Card 
            title="商品列表" 
            extra={
            <Button type="primary" size="small" 
            // 在按钮上添加点击事件 跳转到指定页面
            onClick={()=>{props.history.push("/admin/products/edit")}}>
                新增
            </Button>
            }>
          <Table 
            rowKey="_id" 
            rowClassName={record => (record.onSale ? "" : "bg-red")}
            // 分页 总条数  每页展示的条数 实现分页
            pagination={{total,defaultPageSize:2,
                onChange:(p)=>{
                props.dispatch(loadProduct({page:p}))
            }}} 
            columns={columns} 
            bordered 
            dataSource={list}
            />
        </Card>
    );
}

export default connect(state=>state.product )(List)
