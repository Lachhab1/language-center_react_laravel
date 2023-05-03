// import { useState } from "react";
import { Placeholder } from "react-bootstrap"
import  Button from "../components/Button"
import  Input from "../components/Input"
import FormC from "../components/Form"

export default function TableEtud()
{
    const inputInfo = 
        {
            label:"Full Name",
            Placeholder:"Enter the name",
            type: "text"
        }
    const option = {
        label: "select age"
        ,options:[
            {
                value: "1",
                text:"alpha",
            }
        ]
        ,defText:"select age"
    }
    return(
    <div>
                    {/* <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Class</th>
                                <th>Parents</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                             
                            </tr>
                        </tbody>
                    </table>
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Student" handleSmthg={() => console.log("chibakiya")} /> */}
                    <FormC  />

                </div>
    )

}