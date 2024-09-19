"use client";

import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';

export default function PlayComponent(props) {
    const videoRef = useRef(null);
    const webrtcAdaptor = useRef(null);
    const [streamId, setStreamId] = useState(""); // State for streamId

    useEffect(() => {
        var pc_config = {
            'iceServers': [{
                'urls': 'stun:stun1.l.google.com:19302'
            }]
        };

        var sdpConstraints = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

        if (webrtcAdaptor.current) {
            webrtcAdaptor.current.closeWebSocket();
            webrtcAdaptor.current.closeStream();
            webrtcAdaptor.current = null;
        }

        webrtcAdaptor.current = new WebRTCAdaptor({
            websocket_url: "wss://test.antmedia.io/LiveApp/websocket",
            remoteVideoElement: videoRef.current,
            isPlayMode: true,
            pc_config: pc_config,
            sdpConstraints: sdpConstraints,
            candidateTypes: ["tcp", "udp"],
            remoteVideoId: "remoteVideo",

            callback: (info, obj) => {
                if (info === "play_started") {
                    console.log("play started");
                } else if (info === "play_finished") {
                    console.log("play finished");
                } else if (info === "initialized") {
                    console.log("WebRTC initialized");
                }
            },
        });

        return () => {
            if (webrtcAdaptor.current) {
                webrtcAdaptor.current.closeWebSocket();
                webrtcAdaptor.current.closeStream();
                webrtcAdaptor.current = null;
            }
        };
    }, []);

    const handlePlay = () => {
        if (streamId && webrtcAdaptor.current) {
            webrtcAdaptor.current.play(streamId);
        } else {
            console.error("Stream ID is required");
        }
    };

    return (
        <main>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>WebRTC Play</h1>
                <div style={{ display: "flex", width: "640px", height: "360px", resize: "both" }} id="videoContainer">
                    <video autoPlay={true} style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }} ref={videoRef} id="remoteVideo" muted controls playsInline></video>
                </div>
                <input
                    style={{marginTop:"1rem"}}
                    type="text"
                    placeholder="Enter Stream ID"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)} // Update streamId state
                />
                <button style={{width:"200px",height:"50px",marginTop:"1rem", marginLeft:"auto", marginRight:"auto"}} onClick={handlePlay}>Play</button> {/* Call handlePlay on button click */}
            </div>
        </main>
    );
}
