export const videoRecordComplete=(blobUrl)=>{
    let videoFile;
    videoFile = new File([blobUrl], "my_video.mp4", {type: "video/mp4"})
    return videoFile;
}