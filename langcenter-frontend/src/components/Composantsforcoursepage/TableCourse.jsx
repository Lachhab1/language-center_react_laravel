import DataTable from "react-data-table-component"
export default function TableCourse()
{
    const col=[
        {
            name:"Course Code",
            selector:row => row.course_code
        },
        {
            name:"Course Name",
            selector:row => row.course_name
        },
        {
            name:"Duration[Hour]",
            selector:row => row.duration
        },
        {
            name:"Subject Name",
            selector:row => row.subject_name
        },
        {
            name:"Teacher",
            selector:row => row.teacher
        },
        {
            name:"Classes",
            selector:row => row.classes
        },
        {
            name:"Days",
            selector:row => row.days 
        }
    ]
    const Data=[ {course_code:"1",course_name:"sopa",duration:"10",subject_name:"eng",teacher:"sopa",classes:"6",days:"6"}
       
    ]
    return(
        <div>
            
              
            <DataTable
                    columns={col}
                    data={Data}
                    fixedHeader
                    pagination
            >
             </DataTable>
        </div>
    )
}