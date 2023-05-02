export default function Etudiants(){
    return(
        <div className="Container">
            <div className="row">
                <div className="col-md-2">
                    <h1>Etudiants Page </h1>
                    <h2>Students</h2>
                    <p>Home &gt;  Students</p>
                </div>
            </div>
            <div className="Container bg-light">
                <div className="row">
                    <div className="col-4">
                        <h2>Tous les etudiants</h2> 
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-5">
                        <form action="" >
                            <input className="form-control" type="text" name="Nom" id="1" placeholder="Chercher avec le nom" />
                        </form>
                    </div>
                    <div className="col-5">
                        <form action="" >
                            <input className="form-control" type="text" name="Class" id="2" placeholder="Chercher avec la class" />
                        </form>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger"> Chercher </button>
                    </div>
                </div>
                </div>
            </div>
                
           
        
    )
}