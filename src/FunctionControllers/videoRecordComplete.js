export const videoRecordComplete=(blobUrl)=>{
    let videoFile;
    return videoFile = new File([blobUrl], "my_video.mp4", {type: "video/mp4"})
}