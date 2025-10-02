import { useState } from "react";
import api from "../lib/api";
import { auth } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const nav=useNavigate();

  const submit = async (e)=>{
    e.preventDefault(); setErr("");
    try{
      const res = await api.post("/auth/login",{email,password});
      auth.set(res.data.access_token);
      nav("/browse");
    }catch{ setErr("Login failed"); }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:360,margin:"4rem auto",display:"grid",gap:8}}>
      <h2>Rider Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
      {err && <small style={{color:"crimson"}}>{err}</small>}
    </form>
  );
}
