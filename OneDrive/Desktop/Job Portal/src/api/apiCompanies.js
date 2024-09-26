import supabaseClient from "@/utils/supabase";

// file is to add and fetching the companies
export async function getCompanies(token){
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from("companies").select("*");
    if(error){
        console.error("error fetching companies", error);
        return null;

    
    }
    return data;
}