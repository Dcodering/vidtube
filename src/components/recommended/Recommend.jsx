import React, { useEffect, useState } from 'react'
import './recommend.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY, valueConverter } from '../../data'
import { Link } from 'react-router-dom'
function Recommend({ category }) {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=45&videoCategoryId=${category}&key=${API_KEY}`);
        const data = await res.json();
        setApiData(data.items)
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='recommended'>
            {apiData.map((item, index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="sideVideoList">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vidInfo">
                            <h4>{item.snippet.title}</h4>
                            <p className='i'>{item.snippet.channelTitle}</p>
                            <p>{valueConverter(item.statistics.viewCount)} views</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Recommend