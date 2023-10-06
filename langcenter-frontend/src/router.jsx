import { createBrowserRouter, Navigate } from 'react-router-dom';
import ContentLayout from './layouts/ContentLayout/ContentLayout';
import Dashboard from './views/Dashboard';
import Error404 from './views/Error404';
import Login from './views/Login';
import Cours from './views/Cours';
import PaiementsEns from './views/PaiementsEns';
import PaiementsEtu from './views/PaiementsEtu';
import Parents from './views/Parents';
import PresencesEtu from './views/PresencesEtu';
import Resultats from './views/Resultats';
import Settings from './views/Settings';
import Utilisateurs from './views/Utlisateurs';

import ForgotPasswordPage from './views/ForgotPasswordPage';

import StudentsDetail from './components/Composentforstudentspage/StudentsDetails';
import AddEtudiant from './components/Composentforstudentspage/AddEtudiant';
import EditEtudiant from './components/Composentforstudentspage/EditEtudiant';
import Etudiants from './views/Etudiants';

import EmploiTemps from './views/EmploiTemps';
import AddSchedule from './components/EmploiTempsCompo/AddSchedule';
import EditSchedule from './components/EmploiTempsCompo/EditSchedule';

import Enseignants from './views/Enseignants';
import AddTeacher from './components/Composantforteacherpage/AddTeacher';
import EditTeacher from './components/Composantforteacherpage/EditTeacher';
import EnseignantDetails from './components/Composantforteacherpage/EnseignantDetails';

import GuestLayout from './layouts/GuestLayout/GuestLayout';

import EditFeesT from './components/Composantforteacherfeespage/EditfeesT';
import TableFeesTeacher from './components/Composantforteacherfeespage/TableFeesTeacher';

import EditFees from './components/Composantforstedentsfeespage/EditFees';
import TableFeesEtud from './components/Composantforstedentsfeespage/TableFeesEtud';

import EditParent from './components/Composantforparentpage/EditParent';
import AddParent from './components/Composantforparentpage/AddParent';
import ParentDetails from './components/Composantforparentpage/ParentDetails';

import Salles from './views/Salles';
import AddSalle from './components/SallesCompo/AddSalle';
import EditSalle from './components/SallesCompo/EditSalle';
import ViewSalleDetails from './components/SallesCompo/ViewSalleDetails';

import EditUser from './components/componentforUsers/EditUser';
import AddUser from './components/componentforUsers/AddUser';
import User from './components/componentforUsers/User';

import Groupes from './views/Groupes';
import AddGroupe from './components/GroupesCompo/AddGroupe';
import EditGroupe from './components/GroupesCompo/EditGroupe';
import ViewGroupe from './components/GroupesCompo/ViewGroupe';
import EditNote from './components/ComponentResults/EditNote';
import AddNote from './components/ComponentResults/AddNote';
import AddCourse from './components/Composantsforcoursepage/AddCourse';
import EditCourse from './components/Composantsforcoursepage/EditCourse';
import SecretaryLayout from './layouts/secretarylayout/SecretaryLayout';
import DashboardDirecteur from './views/DashboardDirecteur';
import DashbordSec from './components/DashbordSec/DashbordSec';
import DirecteurLayout from './layouts/directeurlayout/DirecteurLayout';
import ScheduleTable from './components/EmploiTempsCompo/ScheduleTable';

//import for tests
import Test from './components/TestComponents/index';
import AddTest from './components/TestComponents/AddTest';

//import for levels
import Levels from './components/LevelComponents/index';
import AddLevel from './components/LevelComponents/add';
import EditLevel from './components/LevelComponents/edit';
import EditTest from './components/TestComponents/editTest';
//import for depenses
import Depenses from './components/Depenses/Depenses';
import AddExpense from './components/Depenses/Add';
import EditExpense from './components/Depenses/Edit';
//import for test payment
import TestPayment from './components/testFees/index';
import EditTestPayment from './components/testFees/edit';
import AddFeesT from './components/Composantforteacherfeespage/AddFeesT';
import AddFees from './components/Composantforstedentsfeespage/AddFeesE';

//import for Holidays
import HolidaysTable from './components/HolidaysCompo/HolidaysTable';
import EditHoliday from './components/HolidaysCompo/EditHoliday';
import AddHoliday from './components/HolidaysCompo/AddHoliday';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContentLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/dashboard'} />,
      },

      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/',
        children: [
          {
            path: '/teacher',
            element: <Enseignants />,
          },
          {
            path: '/teacher/add',
            element: <AddTeacher />,
          },
          {
            path: '/teacher/edit/:id',
            element: <EditTeacher />,
          },
          {
            path: '/teacher/details/:id',
            element: <EnseignantDetails />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/Tests',
            element: <Test />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/levels',
            element: <Levels />,
          },
          {
            path: '/levels/add',
            element: <AddLevel />,
          },
          {
            path: '/levels/edit',
            element: <EditLevel />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/student',
            element: <Etudiants />,
          },
          {
            path: '/student/:id',
            element: <StudentsDetail />,
          },
          {
            path: '/student/addStudent',
            element: <AddEtudiant />,
          },
          {
            path: '/student/editStudent/:id',
            element: <EditEtudiant />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/parent',
            element: <Parents />,
          },
          {
            path: '/parent/addParent',
            element: <AddParent />,
          },
          {
            path: '/parent/edit/:id',
            element: <EditParent />,
          },
          {
            path: '/parent/:id',
            element: <ParentDetails />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/class',
            element: <Groupes />,
          },
          {
            path: '/class/add',
            element: <AddGroupe />,
          },
          {
            path: '/class/edit/:id',
            element: <EditGroupe />,
          },
          {
            path: '/class/details/:id',
            element: <ViewGroupe />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/course',
            element: <Cours />,
          },
          {
            path: '/course/add',
            element: <AddCourse />,
          },
          {
            path: '/course/edit/:id',
            element: <EditCourse />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/attendance',
            element: <PresencesEtu />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/users',
            element: <Utilisateurs />,
          },
          {
            path: '/users/addUser',
            element: <AddUser />,
          },
          {
            path: '/users/editUser/:id',
            element: <EditUser />,
          },
          {
            path: '/users/:id',
            element: <User />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/fees',
          },
          {
            path: '/fees/teacher',
            children: [
              {
                path: '/fees/teacher',
                element: <TableFeesTeacher />,
              },
              {
                path: '/fees/teacher/add',
                element: <AddFeesT />,
              },
              {
                path: '/fees/teacher/edit/:id',
                element: <EditFeesT />,
              },
            ],
          },
          {
            path: '/fees/expenses',
            children: [
              {
                path: '/fees/expenses',
                element: <Depenses />,
              },
              {
                path: '/fees/expenses/edit/:id',
                element: <EditExpense />,
              },
              {
                path: '/fees/expenses/add',
                element: <AddExpense />,
              },
            ],
          },
          {
            path: '/income',
            children: [
              {
                path: '/income/student',
                children: [
                  {
                    path: '/income/student',
                    element: <PaiementsEtu />,
                  },
                  {
                    path: '/income/student/edit/:id',
                    element: <EditFees />,
                  },
                  {
                    path: '/income/student/add/:id',
                    element: <AddFees />,
                  },
                ],
              },
              {
                path: '/income/test',
                children: [
                  {
                    path: '/income/test',
                    element: <TestPayment />,
                  },
                  {
                    path: '/income/test/edit/:id',
                    element: <EditTestPayment />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/classroom',
            element: <Salles />,
          },
          {
            path: '/classroom/add',
            element: <AddSalle />,
          },
          {
            path: '/classroom/edit/:id',
            element: <EditSalle />,
          },
          {
            path: '/classroom/details/:id',
            element: <ViewSalleDetails />,
          },
        ],
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/',
        children: [
          {
            path: '/schedule',
            element: <EmploiTemps />,
          },
          {
            path: '/schedule/AddSchedule',
            element: <AddSchedule />,
          },
          {
            path: '/schedule/EditSchedule/:id',
            element: <EditSchedule />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/holidays',
            element: <HolidaysTable />,
          },

          {
            path: '/holidays/addHoliday',
            element: <AddHoliday />,
          },
          {
            path: '/holidays/editHoliday/:id',
            element: <EditHoliday />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <SecretaryLayout />,
    children: [
      {
        path: '/secretary',
        element: <Navigate to={'/secretary/dashboard'} />,
      },
      {
        path: 'secretary/dashboard',
        element: <DashboardDirecteur />,
      },
      {
        path: '/',
        children: [
          {
            path: '/secretary/teacher',
            element: <Enseignants />,
          },
          {
            path: '/secretary/teacher/add',
            element: <AddTeacher />,
          },
          {
            path: '/secretary/teacher/edit/:id',
            element: <EditTeacher />,
          },
          {
            path: '/secretary/teacher/details/:id',
            element: <EnseignantDetails />,
          },
        ],
      },
      {
        path: '/secretary/fees',
        children: [
          {
            path: '/secretary/fees/student',
            element: <PaiementsEtu />,
          },
          {
            path: '/secretary/fees/student/edit/:id',
            element: <EditFees />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/secretary/class',
            element: <Groupes />,
          },
          {
            path: '/secretary/class/add',
            element: <AddGroupe />,
          },
          {
            path: '/secretary/class/edit/:id',
            element: <EditGroupe />,
          },
          {
            path: '/secretary/class/details/:id',
            element: <ViewGroupe />,
          },
        ],
      },

      {
        path: '/',
        children: [
          {
            path: '/secretary/parent',
            element: <Parents />,
          },
          {
            path: '/secretary/parent/addParent',
            element: <AddParent />,
          },
          {
            path: '/secretary/parent/edit/:id',
            element: <EditParent />,
          },
          {
            path: '/secretary/parent/:id',
            element: <ParentDetails />,
          },
        ],
      },
      {},
      {
        path: '/',
        children: [
          {
            path: '/secretary/attendance/',
            element: <PresencesEtu />,
          },
        ],
      },
      {
        path: '/secretary/settings',
        element: <Settings />,
      },
      {
        path: '/',
        children: [
          {
            path: '/secretary/holidays',
            element: <HolidaysTable />,
          },

          {
            path: '/secretary/holidays/addHoliday',
            element: <AddHoliday />,
          },
          {
            path: '/secretary/holidays/editHoliday/:id',
            element: <EditHoliday />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <DirecteurLayout />,
    children: [
      {
        path: '/director',
        element: <Navigate to={'/director/dashboard'} />,
      },
      {
        path: '/director/dashboard',
        element: <DashboardDirecteur />,
      },
      {
        path: '/',
        children: [
          {
            path: '/director/teacher',
            element: <Enseignants />,
          },
          {
            path: '/director/teacher/add',
            element: <AddTeacher />,
          },
          {
            path: '/director/teacher/edit/:id',
            element: <EditTeacher />,
          },
          {
            path: '/director/teacher/details/:id',
            element: <EnseignantDetails />,
          },
        ],
      },
      {
        path: '/director/fees',
        children: [
          {
            path: '/director/fees/student',
            element: <PaiementsEtu />,
          },
          {
            path: '/director/fees/student/edit/:id',
            element: <EditFees />,
          },
          {
            path: '/director/fees/teacher',
            children: [
              {
                path: '/director/fees/teacher',
                element: <TableFeesTeacher />,
              },
              {
                path: '/director/fees/teacher/edit/:id',
                element: <EditFeesT />,
              },
            ],
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/class',
            element: <Groupes />,
          },
          {
            path: '/director/class/add',
            element: <AddGroupe />,
          },
          {
            path: '/director/class/edit/:id',
            element: <EditGroupe />,
          },
          {
            path: '/director/class/details/:id',
            element: <ViewGroupe />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/student',
            element: <Etudiants />,
          },
          {
            path: '/director/student/:id',
            element: <StudentsDetail />,
          },
          {
            path: '/director/student/addStudent',
            element: <AddEtudiant />,
          },
          {
            path: '/director/student/editStudent/:id',
            element: <EditEtudiant />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/parent',
            element: <Parents />,
          },
          {
            path: '/director/parent/addParent',
            element: <AddParent />,
          },
          {
            path: '/director/parent/edit/:id',
            element: <EditParent />,
          },
          {
            path: '/director/parent/:id',
            element: <ParentDetails />,
          },
        ],
      },
      {},
      {
        path: '/',
        children: [
          {
            path: '/director/attendance',
            element: <PresencesEtu />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/classroom',
            element: <Salles />,
          },
          {
            path: '/director/classroom/add',
            element: <AddSalle />,
          },
          {
            path: '/director/classroom/edit/:id',
            element: <EditSalle />,
          },
          {
            path: '/director/classroom/details/:id',
            element: <ViewSalleDetails />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/class',
            element: <Groupes />,
          },
          {
            path: '/director/class/add',
            element: <AddGroupe />,
          },
          {
            path: '/director/class/edit/:id',
            element: <EditGroupe />,
          },
          {
            path: '/director/class/details/:id',
            element: <ViewGroupe />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: '/director/course',
            element: <Cours />,
          },
          {
            path: '/director/course/add',
            element: <AddCourse />,
          },
          {
            path: '/director/course/edit/:id',
            element: <EditCourse />,
          },
        ],
      },

      {
        path: '/',
        children: [
          {
            path: '/director/schedule',
            element: <ScheduleTable />,
          },
          {
            path: '/director/schedule/AddSchedule',
            element: <AddSchedule />,
          },
          {
            path: '/director/schedule/EditSchedule/:id',
            element: <EditSchedule />,
          },
        ],
      },
      {
        path: '/director/settings',
        element: <Settings />,
      },
      {
        path: '/',
        children: [
          {
            path: '/director/holidays',
            element: <HolidaysTable />,
          },

          {
            path: '/director/holidays/addHoliday',
            element: <AddHoliday />,
          },
          {
            path: '/director/holidays/editHoliday/:id',
            element: <EditHoliday />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/auth',
        element: <Login />,
      },
    ],
  },

  {
    path: '/ForgotPassword',
    element: <ForgotPasswordPage />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);
export default router;
