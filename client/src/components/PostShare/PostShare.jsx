import React,{useState,useRef} from 'react';
import './PostShare.css';
import ProfileImage from '../../images/profileImg.jpg';
import {UilScenery} from "@iconscout/react-unicons";
import {UilPlayCircle} from "@iconscout/react-unicons";
import {UilLocationPoint} from "@iconscout/react-unicons";
import {UilSchedule} from "@iconscout/react-unicons";
import {UilTimes} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../actions/uploadActon';
import { uploadPost } from '../../api/Uploadrequest';

const PostShare = () =>{
    const loading = useSelector((state)=>state.postReducer.uploading)
    const[image,setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()
    const desc = useRef()
    const {user} = useSelector((state)=>state.authReducer.authData)
    const onImageChange =(event)=>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setImage(img);
        }

    };
    const reset = ()=>{
        setImage(null);
        desc.current.value= ""
    }
    const handleSubmit = (e)  => async (dispatch) => {
        e.preventDefault();
        
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(image){
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image = filename;
            console.log(newPost)
            try{
                dispatch(uploadImage(data))
            } catch (error){
                console.log(error)
            }
        }
        dispatch(await uploadPost(newPost))
        reset()
    };
    return (
        <div className='PostShare'>
            <img src={ProfileImage} alt=''/>
            <div>
                <input ref={desc} required type="text" placeholder="what's is happening" />
                <div className="postOptions">
                    <div className="option" style={{color:"var(--photo)"}} 
                    onClick={()=>imageRef.current.click()}>

                        <UilScenery/>
                        Photo
                    </div>
                    <div className='option' style={{color:"var(--video)"}}>
                        <UilPlayCircle/>
                        Video
                    </div>
                    <div className='option' style={{color:"var(--location)"}}>
                        <UilLocationPoint/>
                        Location
                    </div>
                    <div className='option' style={{color: "var(--shedule)"}}>
                        <UilSchedule/>
                        Schedule
                    </div>
                    <button className='button ps-button' onClick={handleSubmit} disabled={loading}>
                        
                        {loading ? "Uploading..." : "Share"}
                    </button>
                    <div style={{display:"none"}}>
                        <input type='file' name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                { image &&
                <div className='previewimage'>
                    <UilTimes onClick={()=>setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt=''/>
                </div>
                }
            </div>
        </div>
    )
}
export default PostShare