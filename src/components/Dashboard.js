import { BarChart, PieChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import moment from "moment";
const Dashboard = () => {
    const [followers, setFolowers] = useState()
    const [totalLikes, setTotalLikes] = useState(0)
    const [totalComments, setTotalComments] = useState()
    const [totalShares, setToltalShares] = useState()
    const [posts, setPosts] = useState()
    const [postsDate, setPostsDate] = useState([])
    const [postsValue, setPostsValue] = useState([null])


    
    const accessToken = 'EAAaZATvkGLKQBO0WFjjWzZCUiP7ZAnPpplN3BBoZBPhzH4A1FjEMaMhyjzjk8x2E2MFm0UTZC0at4lYZC8ezKqPQQ8vqWsxljLFEnDS2U7ZCvmApL8kE8LMA5eoWdr3sLVknna6bqZBjvyW9bXj83aw9fxOIeg8egAWGZBZCZBb3edh3sruonbE21aW3MQgIcehZBTEZD'
    const idPage = '199179103271562'

    

    //số người theo dõi
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}?fields=followers_count&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => {
                return setFolowers(data.followers_count)
            })
    },[])    
    
    //số lượt likes
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=id,likes.summary(total_count)&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => { 
                const datas = data.data
                let total = 0
                for(const dt of datas){
                    total += dt.likes.summary.total_count;
                }
                setTotalLikes(total)
            })
    },[])   
    
    //số lượt comments
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=id,comments.summary(total_count)&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => { 
                const datas = data.data
                let total = 0
                
                for(const dt of datas){
                    if(!isNaN(dt.comments.summary.total_count))
                        total += dt.comments.summary.total_count;
                }
                setTotalComments(total)
            })
    },[])   

    //số lượt shares
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=id,shares&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(datas => { 
                const data = datas.data
                let total = 0
                for(const dt of data){
                    if(dt.shares !== undefined){
                        total += dt.shares.count;
                    }

                }
                return setToltalShares(total)
            })
    },[])   
    //bài post
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}/posts?&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => {
                
                return data.data?.map(post=>{
                    return moment(post.created_time).format("DD-MM")
                }).sort()
            })
            .then(date => {
                console.log(date)
                return date?.reduce((acc, current) => {
                    let key = current;
            
                    if (!acc.hasOwnProperty(key)) {
                    acc[key] = 1;
                    } else {
                    acc[key]++;
                    }
                    return acc;
                }, {})
            })
            .then(post => {
                setPostsDate(Object.keys(post))
                setPostsValue(Object.values(post))
                setPosts(Object.values(post).reduce((sum, number) => sum + number))
            })
    },[])  
   
    

    
    return (
        <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">Người theo dõi</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link">{followers}</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-warning text-white mb-4">
                                        <div className="card-body">Tổng số lượt thích</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" >{totalLikes}</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-success text-white mb-4">
                                        <div className="card-body">Tổng số lượt comments</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" >{totalComments}</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-danger text-white mb-4">
                                        <div className="card-body">Tổng số lượt chia sẻ</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" >{totalShares}</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-area me-1"></i>
                                            SỐ BÀI ĐĂNG: {posts}
                                        </div>
                                        <div className="card-body">
                                            <BarChart
                                                xAxis={[
                                                    {
                                                        id: 'barCategories',
                                                        data: postsDate,
                                                        scaleType: 'band',
                                                    },
                                                    ]}
                                                    series={[
                                                    {
                                                        data: postsValue,
                                        
                                                    },
                                                    ]}
                                                    width={500}
                                                    height={300}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-bar me-1"></i>
                                            BIỂU ĐỒ 
                                        </div>
                                        <div className="card-body">
                                            <PieChart
                                                series={[
                                                    {
                                                    data: [
                                                        { id: 0, value: totalLikes, label: 'Likes' ,color: '#ffc107'},
                                                        { id: 1, value: totalComments, label: 'Comments',color: '#198754' },
                                                        { id: 2, value: totalShares, label: 'Shares',color: '#dc3545' },
                                                    ],
                                                    },
                                                ]}
                                                width={500}
                                                height={300}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </main>
                    
                </div>
    )
}

export default Dashboard