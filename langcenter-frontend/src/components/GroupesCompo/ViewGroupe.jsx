import React from "react";
import { useParams } from 'react-router-dom';

export default function ViewGroupe(){
    const {id} = useParams();
    return(
        <h1>Groupe details</h1>
    );
}