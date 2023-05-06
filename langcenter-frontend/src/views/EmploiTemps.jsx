import ScheduleTable from '../components/EmploiTempsCompo/ScheduleTable';

export default function EmploiTemps() {
  const data = [
    { id: 1, courseName: "English", courseLevel: "Intermediate", group: "Group A", classroom: "Room 101", day: "Monday", startTime: "09:00", endTime: "10:30" },
    { id: 2, courseName: "French", courseLevel: "Beginner", group: "Group B", classroom: "Room 102", day: "Tuesday", startTime: "10:30", endTime: "12:00" },
    // Ajoutez plus de données selon vos besoins
  ];

  return (
    <div>
      <h1>Emploi du Temps Page</h1>
      <ScheduleTable data={data} />
    </div>
  );
}
