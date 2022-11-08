import React from "react"
import Comment from '../../images/comment.png'
import Heart from '../../images/like.png'
import Share from '../../images/share.png'
import NotLike from '../../images/notlike.png'
import './Post.css'
import { useSelector } from "react-redux"
const Post = ({data})=>{
    const {user} = useSelector((state)=>state.authReducer.authData)
    return(
        <div className='Post'>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER+ data.image : ""} alt=""/>
            <div className="postReact">
                <img src={data.liked?Heart: NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>
            <span style={{color:"var(--gray)",fontSize:'12px'}}>{data.likes} likes</span> 
            <div className="detail">
                <span><b>{data.name}</b></span>
                <span><b>{data.desc}</b></span>
            </div>

        </div>
    )
}
export default Post