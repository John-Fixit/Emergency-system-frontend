import React from 'react'

function AudioWithJs() {
    let device = navigator.mediaDevices.getUserMedia({audio: true });
    let items = [];
    device.then(stream=>{
        
    })
  return (
    <div>AudioWithJs</div>
  )
}

export default AudioWithJs