import DataTable from "react-data-table-component"
import Button from '../Button';
import EditCourse from "./EditCourse";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import AddCourse from "./AddCourse";
import { useParams } from "react-router-dom";
export default function TableCourse()
{
    const {id} = useParams();
    const col=[
        {
            name: 'ID',
            selector: (row) => row.id,
        },
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
            name:"Action",
            selector:row => row.action,
            cell: (row) => (
                <div style={{ display: 'flex', gap: '0px' }}>
                  <Link to={`/course/edit/${row.id}`}>
                    <button style={{ border: 'none', background: 'none' }}>
                      <BsFillPencilFill style={{ color: 'orange' }} />
                    </button>
                  </Link>
                  <button style={{ border: 'none', background: 'none' }} onClick={() => deleteRow(row.course_code)}>
                    <MdDelete style={{ color: 'red', fontSize: '20px' }} />
                  </button>
                </div>
              ),
        }
    ]
    const Data=[ {id:"1",course_code:"1",course_name:"sopa",duration:"10",subject_name:"eng",teacher:"sopa",action:""}
                ,{id:"2",course_code:"2",course_name:"sopa1",duration:"10",subject_name:"frn",teacher:"sopa",action:""}
]
    const [records,setRecords]=useState(Data);
    const [recordsS,setRecordsS]=useState(Data);
    function handlefilter(event)
    {
        const NewData = Data.filter(row => {
            return row.course_name.toLowerCase().includes(event.target.value.toLowerCase())
        }) 
        setRecords(NewData)
    }
    function handlefilterC(event)
    {
        const NewData = Data.filter(row => {
            return row.subject_name.toLowerCase().includes(event.target.value.toLowerCase())
        }) 
        setRecords(NewData)
    }
    
    return(
        <div>
            
           
            
            <div className="row offset-1">
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by Course Name" onChange={handlefilter} />
            </div>
            <div className="col">
                 <input type="text" className="form-control" placeholder="Search by subject name" onChange={handlefilterC} />
            </div>
            <div className="col">

                <Link to="/course/add">
                    <Button
                    className=""
                    variant="danger"
                    isDisabled={false}
                    size="md"
                    value="Add Course"
                    handleSmthg={() => console.log('chibakiya')}
                    />
                </Link>
            </div>
            </div>
            <DataTable
                    columns={col}
                    data={records}
                    fixedHeader
                    pagination
            >
             </DataTable>
           
        </div>
    )
}