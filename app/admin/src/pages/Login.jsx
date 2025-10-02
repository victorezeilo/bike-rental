import { useState } from "react";
import api from "../lib/api";
import { auth } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("admin@bike.local");
  const [password,setPassword]=useState("Admin123!");
  const [err,setErr]=useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login",{email,password});
      auth.set(res.data.access_token);
      nav("/bikes");
    } catch(e){
      console.error(e?.response?.status, e?.response?.data || e.message);
      setErr("Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:360,margin:"4rem auto",display:"grid",gap:8}}>
      <h2>Admin Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password"/>
      <button type="submit">Login</button>
      {err && <small style={{color:"crimson"}}>{err}</small>}
    </form>
  );
}
