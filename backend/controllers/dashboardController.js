import Registration from "../models/Registration.js";

export const getDashboard = async (req,res)=>{
  const data = await Registration.find({
    user:req.user.id
  }).populate("event");

  res.json(data);
};
