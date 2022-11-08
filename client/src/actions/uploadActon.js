import * as UploadApi from '../api/Uploadrequest'
export const uploadImage = (data) => async (dispatch)=>{
    dispatch ({type:"Upload_Success"})
    try{
        await UploadApi.uploadImage(data)
        
    }catch(error){
        console.log(error)
    }
}
export const uploadPost = (data) => async(dispatch)=>{
    dispatch({type: "Upload_Start"})
    try{
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "Upload_Success",data:newPost.data})
    }catch(error){
        console.log(error)
        dispatch({type: "Upload_Fail"})
    }
}