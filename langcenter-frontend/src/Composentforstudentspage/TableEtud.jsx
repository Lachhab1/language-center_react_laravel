// import { useState } from "react";
import  Button from "../components/Button"
import  FormCustom from "../components/Form"

export default function TableEtud()
{
//     const [dataInput,setDataInput] = useState({});
//     const handleClick = () =>
//     {
//         return({
//         });
//     }
    return(
    <div>
                    <table className='table'>
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
                    <Button className="" variant="danger" isDisabled={false} size="md" value="add Student" handleSmthg={() => console.log("chibakiya")} />
                    <FormCustom/>
                </div>
    )

}