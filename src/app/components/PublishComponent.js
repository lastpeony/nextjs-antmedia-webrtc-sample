"use client";

import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';

export default function PublishComponent(props) {
    const videoRef = useRef(null);
    const webrtcAdaptor = useRef(null);
    const [streamId, setStreamId] = useState(""); // State for streamId

    useEffect(() => {

        var mediaConstraints = {
            audio: {
                noiseSuppression: true,
                echoCancellation: true
            },
            video: true
        };    

        var pc_config = {
            'iceServers': [{
                'urls': 'stun:stun1.l.google.com:19302'
            }]
        };

        var sdpConstraints = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

   

        webrtcAdaptor.current = new WebRTCAdaptor({
            websocket_url: "wss://test.antmedia.io/LiveApp/websocket",
            localVideoElement: videoRef.current,
            pc_config: pc_config,
            mediaConstraints: mediaConstraints,
            sdpConstraints: sdpConstraints,
            candidateTypes: ["tcp", "udp"],
            remoteVideoId: "remoteVideo",

            callback: (info, obj) => {
                if (info === "publish_started") {
                    alert("Publish started!")
                } else if (info === "publish_finished") {
                    console.log("publish finished");
                } else if (info === "initialized") {
                    console.log("WebRTC initialized");
                }
            },
        });

     
    }, []);

    const handlePublish = () => {
        if (streamId && webrtcAdaptor.current) {
            webrtcAdaptor.current.publish(streamId);
        } else {
            console.error("Stream ID is required");
        }
    };

    return (
        <main>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>WebRTC Publish</h1>
                <div style={{ display: "flex", width: "640px", height: "360px", resize: "both" }} id="videoContainer">
                    <video autoPlay={true} style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} ref={videoRef} id="localVideo" muted controls playsInline></video>
                </div>
                <input
                    style={{marginTop:"1rem"}}
                    type="text"
                    placeholder="Enter Stream ID"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)} // Update streamId state
                />
                <button style={{width:"200px",height:"50px",marginTop:"1rem", marginLeft:"auto", marginRight:"auto"}} onClick={handlePublish}>Publish</button> {/* Call handlePlay on button click */}
            </div>
        </main>
    );
}
