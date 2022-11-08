import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/Profileside/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = () => {
    return (
        <div className="Home">
            <ProfileSide/>
            <PostSide/>
            <RightSide/>
            <div className="RightSide">rightside</div>
        </div> 
    )
}

export default Home