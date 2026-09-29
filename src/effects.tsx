import {useEffect,useRef,useState,type ReactNode} from 'react';
import {MetalFx} from 'metal-fx';
import {VoiceBeam} from 'voice-glow';
import {Mic,Square} from 'lucide-react';
import {useMotion,useVisible} from './motion';
export function MetalIdentity({children}:{children:ReactNode}){const root=useRef<HTMLDivElement>(null);const visible=useVisible(root);const motion=useMotion();return <div ref={root} className="metal-identity">{visible&&motion&&<MetalFx preset="chromatic" theme="light" variant="circle" strength={.8} disableGlow aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}><span style={{display:'block',width:'100%',height:'100%'}}/></MetalFx>}<span className="identity-foreground">{children}</span></div>;}
export function VoicePreview(){
const [stream,setStream]=useState<MediaStream|null>(null);const [error,setError]=useState('');const [starting,setStarting]=useState(false);const owned=useRef<MediaStream|null>(null);const revision=useRef(0);const root=useRef<HTMLDivElement>(null);const visible=useVisible(root);const motion=useMotion();
const stop=()=>{revision.current++;owned.current?.getTracks().forEach(track=>track.stop());owned.current=null;setStream(null);setStarting(false);};
useEffect(()=>{const hide=()=>{if(document.hidden)stop();};document.addEventListener('visibilitychange',hide);return()=>{document.removeEventListener('visibilitychange',hide);revision.current++;owned.current?.getTracks().forEach(t=>t.stop());};},[]);
useEffect(()=>{if(!visible)stop();},[visible]);
const start=async()=>{setError('');setStarting(true);const id=++revision.current;try{if(!navigator.mediaDevices?.getUserMedia)throw Error('Microphone preview needs HTTPS or localhost.');const audio=await navigator.mediaDevices.getUserMedia({audio:true});if(id!==revision.current){audio.getTracks().forEach(t=>t.stop());return;}owned.current=audio;setStream(audio);}catch(e){setError(e instanceof Error?e.message:'The microphone could not start.');}finally{if(id===revision.current)setStarting(false);}};
return <div ref={root} className="voice-preview"><VoiceBeam stream={stream} active={!!stream&&visible} theme="dark" strength={.7} colorVariant="candy" idle={0} paused={!motion} flow={motion?1:0}><div className="voice-surface"><span className="voice-caption">{stream?'MICROPHONE ON · LOCAL VISUALIZER':'YOUR VOICE. A NATURAL BEGINNING.'}</span><p>{stream?'Say something.':'“Hey Dira.”'}</p><button className="voice-trigger" onClick={()=>stream?stop():void start()} disabled={starting} aria-pressed={!!stream}>{stream?<Square size={17}/>:<Mic size={20}/>}<span>{starting?'Opening microphone…':stream?'Stop microphone':'Try the voice glow'}</span></button></div></VoiceBeam><p className="voice-disclaimer">{error||'This website only visualizes your microphone. It does not record, upload audio, or execute commands. Install DIRA for the voice agent.'}</p></div>;
}


