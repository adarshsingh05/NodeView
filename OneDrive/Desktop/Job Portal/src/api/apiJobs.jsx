import supabaseClient from "@/utils/supabase.js";

// this file will contain all the fetched data from the supabase related to the job postings
export async function getJobs(token){
    const supabase= await supabaseClient(token);

    // writing our query-selecting from the jobs table and selecting everything
    let query=supabase.from("jobs").select("*")
    const{data,error}=await query;
    if(error){
        console.log("error fetching the job",error);
        return null;
    }
    return data;

}
