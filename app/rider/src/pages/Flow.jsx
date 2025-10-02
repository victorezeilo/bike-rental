import { useState } from "react";
import api from "../lib/api";

export default function Flow(){
  const [rentalId,setRentalId]=useState("");
  const [code,setCode]=useState("");
  const [msg,setMsg]=useState("");

  const unlock = async ()=>{
    setMsg("");
    try{
      await api.post("/rentals/unlock",{ rentalId, code });
      setMsg("Unlocked ✔");
    }catch{ setMsg("Unlock failed"); }
  };
  const start = async ()=>{
    setMsg("");
    try{
      await api.post("/rentals/start",{ rentalId });
      setMsg("Ride started 🚲");
    }catch{ setMsg("Start failed"); }
  };

  return (
    <div style={{maxWidth:480, margin:"2rem auto", display:"grid", gap:8}}>
      <h2>Unlock & Start</h2>
      <input placeholder="Rental ID" value={rentalId} onChange={e=>setRentalId(e.target.value)} />
      <input placeholder="Unlock Code" value={code} onChange={e=>setCode(e.target.value)} />
      <div style={{display:"flex", gap:8}}>
        <button onClick={unlock}>Unlock</button>
        <button onClick={start}>Start Ride</button>
      </div>
      {msg && <div>{msg}</div>}
    </div>
  );
}
