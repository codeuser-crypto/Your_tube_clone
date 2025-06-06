import React, { useRef, useState } from 'react';

const VideoCall = () => {
  const localVideoRef = useRef();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
  };

  const startRecording = () => {
    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded_call.webm';
      a.click();
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const startScreenShare = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    localVideoRef.current.srcObject = screenStream;
  };

  return (
    <div>
      <h2>Video Call</h2>
      <video ref={localVideoRef} autoPlay playsInline style={{ width: '400px' }} />
      <button onClick={startCall}>Start Call</button>
      <button onClick={startScreenShare}>Share Screen</button>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop & Download</button>
      )}
    </div>
  );
};

export default VideoCall;
