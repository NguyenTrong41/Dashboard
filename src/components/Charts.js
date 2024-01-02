import { BarChart } from '@mui/x-charts'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Charts = () => {
    const today = moment()
    

    const [selectedType, setSelectedType] = useState('day');
    const [selectedCount, setSelectedCount] = useState(1);
    const [dateSort, setDateSort] = useState(today.format("YYYY-MM-DD")) 
    const [postsDate, setPostsDate] = useState([null])
    const [postsValue, setPostsValue] = useState([null])
    
    const [monthSort, setMonthSort] = useState(today.format("YYYY-MM")) 
    const [postsMonth, setPostsMonth] = useState([null])
    const [postsMonthValue, setPostsMonthValue] = useState([null])

    const [yearSort, setYearSort] = useState(today.year()) 
    const [postsYear, setPostsYear] = useState([null])
    const [postsYearValue, setPostsYearValue] = useState([null])

    const [timeLCS, setTimeLCS] = useState([null])
    const [likesValue, setLikesValue] = useState([null])
    const [commentsValue, setCommentsValue] = useState([null])
    const [sharesValue, setSharesValue] = useState([null])


    const accessToken = 'EAAaZATvkGLKQBO0WFjjWzZCUiP7ZAnPpplN3BBoZBPhzH4A1FjEMaMhyjzjk8x2E2MFm0UTZC0at4lYZC8ezKqPQQ8vqWsxljLFEnDS2U7ZCvmApL8kE8LMA5eoWdr3sLVknna6bqZBjvyW9bXj83aw9fxOIeg8egAWGZBZCZBb3edh3sruonbE21aW3MQgIcehZBTEZD'
    const idPage = '199179103271562'
    
    const handleChangeType = (e) => {
        setSelectedType(e.target.value);
    };
    const handleChangeCount = (e) => {
        let count = parseInt(e.target.value, 10)
        if(count <= 0){
            count = 1
        }
        setSelectedCount(count);
    };
    
    //bài đăng theo ngày 
    const dateSortValue = (event)=>{    
        setDateSort(moment(event.target.value).format("DD-MM-YYYY"))
    }
    useEffect(()=>{
        const today = moment()
        
       
        console.log(selectedCount)
        const daysAgo = today.startOf("day").subtract(selectedCount  -1, "days")
        const sinceDay = moment(daysAgo).format("YYYY-MM-DD")
        console.log(sinceDay,dateSort)
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=created_time&since=${sinceDay}T00:00:00&until=${dateSort}T23:59:59&access_token=${accessToken}`)      
            .then(function(response){
                    return response.json()
            })
            .then(data => {
                return data.data?.map(post=>{
                    return moment(post.created_time).format("DD-MM-YYYY")
                }).sort()
            })
            .then(date => {
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
                
                if(Object.keys(post).length === 0 || post === undefined || post === null){
                    setPostsDate([dateSort])
                    setPostsValue([0])
                }else{
                    setPostsDate(Object.keys(post))
                    setPostsValue(Object.values(post))
                }
            })
    },[dateSort,selectedCount]) 
    
    
   //bài đăng theo tháng
    const monthSortValue = (event)=>{    
        setMonthSort((event.target.value))
    }
    useEffect(()=>{
        const today = moment()
        let monthsAgo = today.startOf("month").subtract(selectedCount-1, "months")
        
        const sinceMonth = moment(monthsAgo).format("YYYY-MM")
        
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=created_time&since=${sinceMonth}-01T00:00:00&until=${monthSort}-31T23:59:59&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => {
                return data.data?.map(post=>{
                    return moment(post.created_time).format("DD-MM-YYYY")
                }).sort()
            })
            .then(date => {
               
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
                if(Object.keys(post).length === 0 || post === undefined || post === null){
                    setPostsMonth([monthSort])
                    setPostsMonthValue([0])
                }else{
                    setPostsMonth(Object.keys(post))
                    setPostsMonthValue(Object.values(post))
                }
                
            })
    },[monthSort, selectedCount])
    //bài đăng theo năm
    const yearSortValue = (event)=>{    
        setYearSort((event.target.value))
    }
    useEffect(()=>{
        const today = moment()
        const yearsAgo = today.startOf("year").subtract(selectedCount - 1 , "years")
        const sinceYear = moment(yearsAgo).year()
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=created_time&since=${sinceYear}-01-01T00:00:00&until=${yearSort}-12-31T23:59:59&access_token=${accessToken}`)
            .then(function(response){
                return response.json()
            })
            .then(data => {
                return data.data?.map(post=>{
                    return moment(post.created_time).format("DD-MM-YYYY")
                }).sort()
            })
            
            .then(date => {
            
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
                console.log(post)
                if(Object.keys(post).length === 0 || post === undefined || post === null){
                    setPostsYear([yearSort])
                    setPostsYearValue([0])
                }else{
                    setPostsYear(Object.keys(post))
                    setPostsYearValue(Object.values(post))
                }
                
                
            })
    },[yearSort,selectedCount])
    //thống kê số lượng likes, comments, shares
    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}/posts?fields=id,likes.summary(total_count),comments.summary(total_count),shares,created_time&access_token=${accessToken}`)
            .then(response => {
                return response.json()
            })
            .then(datas => {
                let data = datas.data
                const results = {};
                data.forEach((item) => {
                    // Trích xuất ngày từ created_time
                    const date = moment(item.created_time).format("DD-MM-YYYY")
                
                    // Tạo đối tượng ngày nếu nó chưa tồn tại
                    if (!results[date]) {
                        results[date] = {
                            likes: 0,
                            comments: 0,
                            shares: 0
                        };
                    }
                
                    // Tăng số lượt thích, bình luận và chia sẻ cho ngày tương ứng
                    results[date].likes += item.likes.summary.total_count || 0;
                    results[date].comments += item.comments.summary.total_count || 0;
                    results[date].shares += item?.shares?.count || 0;
                })
                const sortedResults = Object.entries(results)
                .sort(([aDate], [bDate]) => {
                    const aMoment = moment(aDate, 'DD-MM-YYYY');
                    const bMoment = moment(bDate, 'DD-MM-YYYY');
                    return aMoment.isBefore(bMoment) ? -1 : aMoment.isAfter(bMoment) ? 1 : 0;
                })
                .reduce((acc, [date, values]) => {
                    acc[date] = values;
                    return acc;
                }, {});

                
                const likes = []
                const comments = []
                const shares = []
                
                for(const key in sortedResults) {
                    likes.push(results[key].likes);
                    comments.push(results[key].comments);
                    shares.push(results[key].shares);
                }
                
                setTimeLCS(Object.keys(sortedResults))
                setLikesValue(likes)
                setCommentsValue(comments)
                setSharesValue(shares)
                
            })
            
    },[])
    return (
        <>
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Charts</h1>
                    <ol className="breadcrumb mb-4"><li className="breadcrumb-item"><Link to={"/"} >Dashboard</Link></li><li className="breadcrumb-item active">Charts</li></ol>
    
                       
                        <div className="">
                            <div className="card ">
                                <div className="card-header">
                                    <i className="fas fa-chart-area me-1"></i>
                                    THỐNG KÊ LIKES, COMMENTS, SHARES
                                    
                                </div>
                                <div className="card-body">
                                    <BarChart
                                        xAxis={[
                                        {
                                            data: timeLCS,
                                            scaleType: 'band',
                                        },
                                        ]}
                                        series={[
                                        {
                                            data: likesValue,
                                            label: 'likes'
                                         },
                                        {
                                            data: commentsValue,
                                            label: 'comments'
                                        },
                                        {
                                            data: sharesValue,
                                            label: 'shares'
                                        },
                                        ]}  
                                        width={1000}
                                        height={500}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                
                        
                    <div style={{marginTop: 30}} >
                            <div className="card">
                                <div className="card-header">
                                    <i className="fas fa-chart-area me-1"></i>
                                    BÀI ĐĂNG
                                    <div>
                                        <label>
                                            Chọn loại:
                                            <select value={selectedType} onChange={handleChangeType}>
                                            <option value="day">Ngày</option>
                                            <option value="month">Tháng</option>
                                            <option value="year">Năm</option>
                                            </select>
                                        </label>

                                        <label>
                                            Số lượng item:
                                            <input
                                                type="number"
                                                value={selectedCount}
                                                onChange={handleChangeCount}
                                            />
                                        </label>

                                        {selectedType === 'day' && (
                                            <label>
                                            Chọn ngày:
                                            <input
                                                type="date"
                                                value={dateSort}
                                                onChange={dateSortValue}
                                            />
                                            </label>
                                        )}

                                        {selectedType === 'month' && (
                                            <label>
                                                Chọn tháng:
                                                <input 
                                                type="month" 
                                                name="month" 
                                                value={monthSort}
                                                onChange={monthSortValue}
                                                />
                                            </label>
                                        )}

                                        {selectedType === 'year' && (
                                            <label>
                                            Chọn năm:
                                            <input
                                                type="number"
                                                value={yearSort}
                                                onChange={yearSortValue}
                                            />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <BarChart
                                        xAxis={[
                                            {
                                                data: (()=>{
                                                    switch (selectedType) {
                                                        case 'day':
                                                            return postsDate
                                
                                                        case 'month':
                                                            return postsMonth
                                                        case 'year':
                                                            return postsYear
                                                        default:
                                                            return []
                                                            
                                                    }
                                                })(),
                                                scaleType: 'band',
                                            },
                                            ]}
                                            series={[
                                            {
                                                data: (() => {
                                                    switch (selectedType) {
                                                      case 'day':
                                                        return postsValue;
                                                      case 'month':
                                                        return postsMonthValue;
                                                      case 'year':
                                                        return postsYearValue;
                                                      default:
                                                        return [];
                                                    }
                                                  })(),
                                
                                            },
                                            ]}
                                            width={1000}
                                            height={500}
                                    />
                                </div>
                            </div>
                        </div>
                        
                </div>
            </main>
        </div>
        
        </>
    )
}

export default Charts