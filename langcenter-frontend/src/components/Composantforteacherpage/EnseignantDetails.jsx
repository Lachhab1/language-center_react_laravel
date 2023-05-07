export default function EnseignantDetails()
{
    
    const Prof = {
        id:'1',
        nom: 'Wade7',
        prenom: 'Mzn',
        gender:'Male',
        Fathername:'Mawade7ch',
        Mothername:'Mamzyanch',
        Digree:'IT PHD',
        email: 'wade7mzyan@.com',
        telephone: '06 12 34 56 78',
        DateNaissance:'7.7.2020',
        FatherOcupation:'Walo',
        DateAdmission:'25.3.2023',
        class:'2'
      };
   return(
    <div>
        <br /><br /><br />

        <div className="Container">
            <div className="row">
                <div className="col-5">
                    place photo
                </div>
                <div className="col">
                    <h5>{Prof.nom} {Prof.prenom}</h5>
                        <p>
                           Descreption
                        </p> 
                        <br /><br />
                        <div className="row">
                            <div className="col-6">
                                 ID Number:
                            </div>
                            <div className="col-6">
                            {Prof.id}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Last Name:
                            </div>
                            <div className="col-6">
                            {Prof.nom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 First Name:
                            </div>
                            <div className="col-6">
                            {Prof.prenom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Gender:
                            </div>
                            <div className="col-6">
                            {Prof.gender}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Name:
                            </div>
                            <div className="col-6">
                            {Prof.Fathername}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Mother Name:
                            </div>
                            <div className="col-6">
                            {Prof.Mothername}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Email:
                            </div>
                            <div className="col-6">
                            {Prof.email}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of birth:
                            </div>
                            <div className="col-6">
                            {Prof.DateNaissance}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Degree:
                            </div>
                            <div className="col-6">
                            {Prof.Digree}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Ocupation:
                            </div>
                            <div className="col-6">
                            {Prof.FatherOcupation}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of Admission:
                            </div>
                            <div className="col-6">
                            {Prof.DateAdmission}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Class
                            </div>
                            <div className="col-6">
                            {Prof.class}
                            </div>
                        </div>
                    
                </div>
            </div>

        </div>
    </div>
   )
  
   
}