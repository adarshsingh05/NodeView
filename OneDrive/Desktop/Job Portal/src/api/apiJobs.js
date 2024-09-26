import supabaseClient from "@/utils/supabase";

// Fetch Jobs

// this file will contain all the fetched data from the supabase related to the job postings
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;

}

// save unsave jobs
export async function saveJob(token, { alreadySaved },saveData) {
  const supabase = await supabaseClient(token);

  if(alreadySaved){
    const { data, deleteError } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("job_id",saveData.job_id);
    if(deleteError){
      console.error("error deleting the saved job",deleteError);
      return null;
    }
    return data;


  }
  else{
    const { data, insertError } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

    if(insertError){
      console.error("error inserting the saved job",insertError);
      return null;
    }
    return data;

  }
}
  