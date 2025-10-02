import { useEffect, useState } from "react";
import api from "../lib/api"

const typeCodes = ["city","mountain","electric"];
const sizeCodes = ["kids","small","medium","large","xl"];

export default function Bikes(){
  const [bikes,setBikes]=useState([]);
  const [form,setForm]=useState({typeCode:"city", sizeCode:"medium", isElectric:false, waterRating:"IPX4"});

  const load = async () => {
    const res = await api.get("/bikes"); // public list
    setBikes(res.data);
  };
  useEffect(()=>{ load(); },[]);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/admin/bikes", form);
    await load();
  };

  return (
    <div style={{maxWidth:800, margin:"2rem auto"}}>
      <h2>Bikes</h2>
      <form onSubmit={create} style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr auto", gap:8, alignItems:"end"}}>
        <label>Type<select value={form.typeCode} onChange={e=>setForm(f=>({...f,typeCode:e.target.value}))}>
          {typeCodes.map(c=><option key={c}>{c}</option>)}
        </select></label>
        <label>Size<select value={form.sizeCode} onChange={e=>setForm(f=>({...f,sizeCode:e.target.value}))}>
          {sizeCodes.map(c=><option key={c}>{c}</option>)}
        </select></label>
        <label>Electric<input type="checkbox" checked={form.isElectric} onChange={e=>setForm(f=>({...f,isElectric:e.target.checked}))}/></label>
        <label>Water<input value={form.waterRating} onChange={e=>setForm(f=>({...f,waterRating:e.target.value}))}/></label>
        <button type="submit">Create</button>
      </form>

      <table style={{width:"100%", marginTop:16, borderCollapse:"collapse"}}>
        <thead><tr><th>ID</th><th>Type</th><th>Size</th><th>Status</th><th>Electric</th></tr></thead>
        <tbody>
          {bikes.map(b=>(
            <tr key={b.id}>
              <td>{b.id.slice(0,8)}…</td>
              <td>{b.type?.code}</td>
              <td>{b.size?.code}</td>
              <td>{b.status}</td>
              <td>{b.isElectric ? "yes":"no"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
