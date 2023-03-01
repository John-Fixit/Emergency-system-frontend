export const recordComplete=(blob)=>{
    const audioFile = new File([blob], "my_audio.mp3", {type: "audio/mp3"});

    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onload = ()=>{
        console.log(reader.result);
    }
}