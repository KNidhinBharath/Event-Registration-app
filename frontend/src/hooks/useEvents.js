import {useState} from "react";
import api from "../api/axios";

export default function useEvents(){

  const [events,setEvents]=useState([]);

  const fetchEvents=async(filters)=>{
    const res=await api.get("/events",{params:filters});
    setEvents(res.data);
  };

  return {events,fetchEvents,setEvents};
}
