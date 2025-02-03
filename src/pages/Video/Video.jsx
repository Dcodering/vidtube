import React from 'react'
import './Video.css'
import Playvideo from '../../components/PlayVideo/Playvideo'
import Recommend from '../../components/recommended/Recommend'
import { useParams } from 'react-router-dom'
function Video() {
  const {category, videoId} = useParams();
  return (
    <div className='playerContainer'>
      <Playvideo category={category} videoId={videoId}/>
      <Recommend category={category}/>
    </div>
  )
}

export default Video