import { createBrowserRouter, Navigate } from "react-router-dom";
import ContentLayout from "./layouts/ContentLayout/ContentLayout";
import Dashboard from "./views/Dashboard"
import Error404 from "./views/Error404"
import Login from "./views/Login";
import Groupes from './views/Groupes';
import Cours from './views/Cours';
import PaiementsEns from './views/PaiementsEns';
import PaiementsEtu from './views/PaiementsEtu';
import Parents from './views/Parents';
import PresencesEns from './views/PresencesEns';
import PresencesEtu from './views/PresencesEtu';
import Resultats from './views/Resultats';
import Salles from './views/Salles';
import Settings from './views/Settings';
import Utilisateurs from './views/Utliisateurs';

import ForgotPasswordPage from './views/ForgotPasswordPage';

import StudentsDetail from "./components/Composentforstudentspage/StudentsDetails";
import AddEtudiant from "./components/Composentforstudentspage/AddEtudiant";
import EditEtudiant from "./components/Composentforstudentspage/EditEtudiant";
import Etudiants from "./views/Etudiants";

import EmploiTemps from './views/EmploiTemps';
import AddSchedule from "./components/EmploiTempsCompo/AddSchedule";
import EditSchedule from "./components/EmploiTempsCompo/EditSchedule";

import Enseignants from "./views/Enseignants"
import AddTeacher from "./components/Composantforteacherpage/AddTeacher";
import EditTeacher from "./components/Composantforteacherpage/EditTeacher";
import EnseignantDetails from "./components/Composantforteacherpage/EnseignantDetails";

import GuestLayout from "./layouts/GuestLayout/GuestLayout";



const router = createBrowserRouter([
        {
            path: '/',
            element: <ContentLayout />,
            children : [
            {
                path: '/',
                element: <Navigate to={'/dashboard'}/>
            },

            {
                    path: '/dashboard',
                    element: <Dashboard/>,
            },
            {
                path:"/",
                children : [{
                    path: '/teacher',
                    element: <Enseignants/>
                },
                {
                    path: "/teacher/add",
                    element: <AddTeacher />
                },
                {
                    path: "/teacher/edit/:id",
                    element: <EditTeacher />
                },
                {
                    path: "/teacher/details/:id",
                    element: <EnseignantDetails />
                }
                ]
                
            },
            {
                path: '/',
                children:[
                    {
                        path: '/student',
                        element: <Etudiants/>
                    },
                    {
                        path: '/student/:id',
                        element: <StudentsDetail/>
                    },
                    {
                        path: '/student/addStudent',
                        element: <AddEtudiant/>
                    },
                    {
                        path: '/student/editStudent/:id',
                        element: <EditEtudiant/>
                    }
                ]
            },
            {
                path: '/parent',
                element: <Parents/>
            },
            {
                path: '/groupe',
                element: <Groupes/>
            },
            {
                path: '/course',
                element: <Cours />     
            },
            {
                path: "/",
                children: [
                    {
                        path: "/attendance",
                    },
                    {
                        path: "/attendance/teacher",
                        element: <PresencesEns/>
                    },
                    {
                        path: "/attendance/student",
                        element: <PresencesEtu/>
                    },
                ]
            },
            {
                path: "/",
                children: [
                    {
                        path: "/fees",
                    },
                    {
                        path: "/fees/teacher",
                        element: <PaiementsEns/>
                    },
                    {
                        path: "/fees/student",
                        element: <PaiementsEtu/>
                    },
                ]
            },
            {
                path: "/results",
                element: <Resultats/>
            },
            {
                path: "/classroom",
                element: <Salles/>
            },
            {
                path: "/settings",
                element: <Settings/>
            },
            {
                path: "/users",
                element: <Utilisateurs/>
            }, 
            {
                path:"/",
                children : [{
                    path: "/schedule",
                    element: <EmploiTemps/>
                },
                {
                    path: "/schedule/AddSchedule",
                    element: <AddSchedule/>
                },
                {
                    path: "/schedule/EditSchedule/:id",
                    element: <EditSchedule />
                }
                ]
                
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout/>,
        children: [
                {
                    path: '/auth',
                    element: <Login />
               },
        ]
    },
    {
        path: '/ForgotPassword',
        element: <ForgotPasswordPage />
    },
    {
        path: '*',
        element: <Error404/>
    }
])
export default router;