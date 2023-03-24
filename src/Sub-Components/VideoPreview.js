import React from 'react'

export default function VideoPreview({stream}) {
    const videoRef = React.useRef(null);
    
    React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    }, [stream]);
    
    if (!stream) {
    return null;
    }
    return <video ref={videoRef} width={500} height={500} autoPlay controls />;
}
