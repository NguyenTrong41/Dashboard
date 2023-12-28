import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [data, setData] = useState()

    const accessToken = 'EAAaZATvkGLKQBO0WFjjWzZCUiP7ZAnPpplN3BBoZBPhzH4A1FjEMaMhyjzjk8x2E2MFm0UTZC0at4lYZC8ezKqPQQ8vqWsxljLFEnDS2U7ZCvmApL8kE8LMA5eoWdr3sLVknna6bqZBjvyW9bXj83aw9fxOIeg8egAWGZBZCZBb3edh3sruonbE21aW3MQgIcehZBTEZD'
    const idPage = '199179103271562'

    useEffect(()=>{
        fetch(`https://graph.facebook.com/${idPage}?fields=id,name,about,phone,emails,location,category,link,picture,cover&access_token=${accessToken}`)
            .then(response =>{
                return response.json()
            })
            .then(datas => {
                setData(datas)
                console.log(datas)
            })
    },[])
    return (
        <div className="padding" id="layoutSidenav_content">
            <div className="">
                <div className="card"> <img className="card-img-top" src={data?.cover.source} alt="Card image cap"/>
                    <div className="card-body little-profile text-center">
                        <div className="pro-img"><img src={data?.picture.data.url} alt="user"/></div>
                        <h3 className="m-b-0">{data?.name}</h3>
                        <p>{data?.category}</p>
                        <div className="row text-center m-t-20">
                           
                            <div className="panel">
                                <div className="bio-graph-heading">
                                    {data?.about}
                                </div>
                                <div className="panel-body bio-graph-info">
                                    <h1>Profile</h1>
                                    <div className="row">
                                        <div className="bio-row">
                                            <p style={{float: 'left'}}><span>Name </span>: {data?.name}</p>
                                        </div>
                                        <div className="bio-row">
                                            <p style={{float: 'left'}} ><span>Country </span>: {data?.location.country}</p>
                                        </div>
                                        <div className="bio-row">
                                            <p style={{float: 'left'}} ><span>Address</span>: {data?.location.street} {data?.location.city}</p>
                                        </div>
                                        
                                        <div className="bio-row">
                                            <p style={{float: 'left'}} ><span>Email </span>: {data?.emails}</p>
                                        </div>
                                        <div className="bio-row">
                                            <p style={{float: 'left'}} ><span>Phone </span>: {data?.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile