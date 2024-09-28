import { BarLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import { useEffect } from "react";
import ApplyJobDrawer from "@/components/apply-job";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  // Fetching job details
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  // Fetching hiring status
  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  // Handle status change
  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  // Fetch the job once the user is loaded
  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  // Show loader until the data is fetched
  if (!isLoaded || loadingJob || !job) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title || "Loading..."}
        </h1>
        {job?.company?.logo_url && (
          <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
        )}
      </div>

      <div className="flex justify-between ">
        <div className="flex gap-2">
          <MapPinIcon /> {job?.location || "Unknown location"}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length || 0} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring Status */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}

      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the Project/Job</h2>
      <p className="sm:text-lg">{job?.description || "No description provided."}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">What we are looking for?</h2>
      <MDEditor.Markdown source={job?.requirments || "No requirements specified."} className="bg-transparent sm:text-lg" />

      {/* Render application */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user?.id)}
        />
      )}
    </div>
  );
};

export default JobPage;
