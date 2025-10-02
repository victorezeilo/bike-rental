import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Browse(){
  const [bikes,setBikes]=useState([]);
  const [type,setType]=useState("");
  const [size,setSize]=useState("");
  const [reserveResult,setReserveResult]=useState(null);

  const load = async ()=>{
    const qs = new URLSearchParams();
    if(type) qs.set("type", type);
    if(size) qs.set("size", size);
    // status defaults to available on backend; adjust if you changed it
    const res = await api.get(`/bikes?${qs.toString()}`);
    setBikes(res.data);
  };
  useEffect(()=>{ load(); },[type,size]);

  const reserve = async (bikeId)=>{
    const res = await api.post("/rentals/reserve",{ bikeId });
    setReserveResult(res.data); // { rentalId, unlockCode }
  };

  return (
    <div style={{maxWidth:900, margin:"2rem auto"}}>
      <h2>Available Bikes</h2>
      <div style={{display:"flex", gap:8}}>
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="">All types</option>
          <option value="city">city</option>
          <option value="mountain">mountain</option>
          <option value="electric">electric</option>
        </select>
        <select value={size} onChange={e=>setSize(e.target.value)}>
          <option value="">All sizes</option>
          {["kids","small","medium","large","xl"].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>

      <ul>
        {bikes.map(b=>(
          <li key={b.id} style={{display:"flex", gap:8, alignItems:"center"}}>
            <span>{b.type?.code}/{b.size?.code} — {b.isElectric ? "electric":"manual"}</span>
            <button onClick={()=>reserve(b.id)}>Reserve</button>
          </li>
        ))}
      </ul>

      {reserveResult && (
        <div style={{marginTop:16, padding:12, border:"1px solid #ccc"}}>
          <b>Reserved!</b><br/>
          Rental ID: {reserveResult.rentalId}<br/>
          Unlock Code: {reserveResult.unlockCode}
        </div>
      )}
    </div>
  );
}
