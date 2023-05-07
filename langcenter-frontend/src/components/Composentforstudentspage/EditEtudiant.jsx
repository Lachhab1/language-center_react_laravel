import FormC from "../Form"
import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"

export default function EditEtudiant() {
    const { id } = useParams();
    const [student,setStudent] = useState();
    let fetchdata ={
        id: id,
          firstName:"sopa",
          lastName:"pop",
        };
    useEffect(() => {
        // Fetch schedule data based on the ID from the database or API
        // Example API call: fetchScheduleData(id)
        // Once you have the data, update the schedule state
        console.log("data");
       fetchdata = {
          id: id,
          firstName:"sopa",
          lastName:"pop",
        };
        setStudent(fetchdata);
      }, [id]);
  return (
    <div className="student-add">
        <FormC firstName={fetchdata.firstName} lastName={fetchdata.lastName} />
    </div>
  )
}
