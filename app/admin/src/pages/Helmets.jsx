import { useEffect, useState } from "react";
import api from "../lib/api";

const sizes = ["xs","s","m","l","xl"];

export default function Helmets(){
  const [helmets,setHelmets]=useState([]);
  const [sizeCode,setSizeCode]=useState("m");

  const load = async () => {
    const res = await api.get("/helmets");
    setHelmets(res.data);
  };
  useEffect(()=>{ load(); },[]);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/admin/helmets",{ sizeCode });
    await load();
  };

  return (
    <div style={{maxWidth:800, margin:"2rem auto"}}>
      <h2>Helmets</h2>
      <form onSubmit={create} style={{display:"flex", gap:8}}>
        <select value={sizeCode} onChange={e=>setSizeCode(e.target.value)}>
          {sizes.map(s=><option key={s}>{s}</option>)}
        </select>
        <button type="submit">Create</button>
      </form>

      <ul>
        {helmets.map(h=><li key={h.id}>{h.id.slice(0,8)}… — {h.size?.code} — {h.status}</li>)}
      </ul>
    </div>
  );
}
