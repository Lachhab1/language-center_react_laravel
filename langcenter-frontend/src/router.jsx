import { createBrowserRouter, Navigate } from "react-router-dom";
import ContentLayout from "./layouts/ContentLayout/ContentLayout";
import Dashboard from "./views/Dashboard"
import Enseignants from "./views/Enseignants"
import Students from "./views/Etudiants"
import Error404 from "./views/Error404"
import Login from "./views/Login";
import Groupes from './views/Groupes';
import Cours from './views/Cours';
import EmploiTemps from './views/EmploiTemps';
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

import AddEtudiant from "./views/AddEtudiant";
import Etudiants from "./views/Etudiants";
import StudentsDetail from "./views/StudentsDetails";


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
                path: '/teacher',
                element: <Enseignants/>,
            },
            {
                path: '/',
                children:[
                    {
                        path: '/student',
                        element: <Etudiants/>
                    },
                    {
                        path: '/student/addStudent',
                        element: <AddEtudiant/>
                    },
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
                path: "/schedule",
                element: <EmploiTemps/>
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
            }
        ]
    },
    {
        path: '/auth',
        element: <Login />
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