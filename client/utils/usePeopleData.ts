import { api } from "@/lib/config";
import getPeopleData from "pages/api/get-people-data";
import { useEffect, useState } from "react";

export default function usePeopleData() {
  const [peopleData, setPeopleData] = useState([]);

  const apiUrl = api.getPeopleData;

  useEffect(() => {
    const data = fetch(apiUrl).then((res) => res.json());
    console.log("🚀 ~ useEffect ~ data:", data);
    setPeopleData(data);
  }, []);

  return { peopleData };
}
