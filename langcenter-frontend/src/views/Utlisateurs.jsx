import TableUser from '../components/componentforUsers/tableUser';
export default function Utlisateurs(){
    return(
        <div>
            <h2 >Users</h2>         
            <div className="Container">
                <div className="row">
                    <div className="">
                    <TableUser/>
                    </div>
                </div>
            </div>
        </div>
    )
}