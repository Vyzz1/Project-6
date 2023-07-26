import { Get } from "../utils/requestFirebase";

export const searchService = async (text, city) => {
  const response = await Get("jobs");
  const tag = text.toLowerCase();
  let result = [];
  result = response.filter((job) => {
    const jobTags = job.tags.map((tag) => tag.toLowerCase());
    const jobCity = job.city.map((city) => city.toLowerCase());
    if (job.status !== true) {
      return false; // Skip jobs with status other than true
    }
    if (text === "all") {
      return jobCity.includes(city.toLowerCase()); // Search by city only
    } else if (city === "all") {
      return job.name.toLowerCase().includes(tag) || jobTags.includes(tag); // Search by text only (in name or tags)
    } else {
      // Search by both text and city
      return (
        (job.name.toLowerCase().includes(tag) || jobTags.includes(tag)) &&
        jobCity.includes(city.toLowerCase())
      );
    }
  });

  return result;
};
