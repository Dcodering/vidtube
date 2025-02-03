import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
function Playvideo() {
    const {videoId} = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const fetchVideoDetails = async () => {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&regionCode=NG&videoCategoryId=0&key=${API_KEY}`);
        const data = await res.json();
        setApiData(data.items[0]);
    }

    const fetchChannel = async () => {
        const channelresponse = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`);
        const data = await channelresponse.json();
        setChannelData(data.items[0])

        // COMMENTS DATA
        const commentResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`);
        const respData = await commentResponse.json();
        setCommentData(respData.items);
    }
    useEffect(() => {
        fetchVideoDetails();
    }, [videoId])
    useEffect(() => {
        fetchChannel();
    }, [apiData])
    return (
        <div className='playVideo'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
            <div className="playVideoInfo">
                <p>{apiData ? valueConverter(apiData.statistics.viewCount) : '16K'} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? valueConverter(apiData.statistics.likeCount) : 123}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />share</span>
                    <span><img src={save} alt="" />save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : 'Youtuber'}</p>
                    <span>{channelData ? valueConverter(channelData.statistics.subscriberCount) : '1M'} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vidDescription">
                <p>Channel that makes learning easy</p>
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description Here'}</p>
                <hr />
                <h4>130 Comments</h4>
                {commentData?.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="commentAction">
                                    <img src={like} alt="" />
                                    <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Playvideo