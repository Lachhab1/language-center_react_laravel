import Image from 'react-bootstrap/Image'
import imgStudent from "../../images/photo-profile.png"

export default function ParentDetails() {


    const etudiant = {
        id:'1',
        nom: 'Wade7',
        prenom: 'Mzn',
        gender:'Male',
        Fathername:'Mawade7ch',
        Mothername:'Mamzyanch',
        email: 'wade7mzyan@.com',
        telephone: '06 12 34 56 78',
        DateNaissance:'7.7.2020',
        FatherOcupation:'Walo',
        DateEnrol:'25.3.2023',
        class:'2'
      };
   return(
    <div>
        <div className="Container mt-5 w-100">
            <div className="row">
                <div className="col-5">
                    <Image width={"50%"} className="ms-5"  src={imgStudent} roundedCircle>
                        </Image>
                </div>
                <div className="col">
                    <h5>{etudiant.nom} {etudiant.prenom}</h5>
                        <p>
                           Descreption
                        </p> 
                        <br /><br />
                        <div className="row">
                            <div className="col-6">
                                 ID Number:
                            </div>
                            <div className="col-6">
                            {etudiant.id}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Last Name:
                            </div>
                            <div className="col-6">
                            {etudiant.nom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 First Name:
                            </div>
                            <div className="col-6">
                            {etudiant.prenom}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Gender:
                            </div>
                            <div className="col-6">
                            {etudiant.gender}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Name:
                            </div>
                            <div className="col-6">
                            {etudiant.Fathername}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Mother Name:
                            </div>
                            <div className="col-6">
                            {etudiant.Mothername}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Email:
                            </div>
                            <div className="col-6">
                            {etudiant.email}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of birth:
                            </div>
                            <div className="col-6">
                            {etudiant.DateNaissance}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Father Ocupation:
                            </div>
                            <div className="col-6">
                            {etudiant.FatherOcupation}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Date of Enr:
                            </div>
                            <div className="col-6">
                            {etudiant.DateEnrol}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                 Class
                            </div>
                            <div className="col-6">
                            {etudiant.class}
                            </div>
                        </div>
                    
                </div>
            </div>

        </div>
        <div>
      
    </div>
    </div>
   )
  
   
}