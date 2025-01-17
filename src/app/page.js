"use client"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("user_email", email);
    formData.append("user_password", password);

    await axios.post("http://127.0.0.1:8000/api/user/login", formData).then(response=>{
      router.push('/dashboard');
    }).catch(error=>{
      console.log(error.response.data.messages);
    })
  }
  return (
    <>
      <div className="mb-3 w-50">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3 ml-5 w-50">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="email"
          className="form-control"
          id="password"
          placeholder="name@example.com"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={login}>Login</button>
    </>
  );
}
