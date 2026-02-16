import {useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

export default function Register(){

  const navigate=useNavigate();
  const [error,setError]=useState("");

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(form.password.length<6){
      setError("Password min 6 chars");
      return;
    }

    try{
      await api.post("/auth/register",form);
      navigate("/login", {
        state: { message: "Registration successful! Please login." }
        });
    }catch(err){
      setError(err.response?.data?.message);
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input placeholder="Name"
          className="w-full border p-2 mb-3 rounded-lg"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input placeholder="Email"
          className="w-full border p-2 mb-3 rounded-lg"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password" placeholder="Password"
          className="w-full border p-2 mb-3 rounded-lg"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded-lg">
          Create Account
        </button>

      </form>
    </div>
  );
}
