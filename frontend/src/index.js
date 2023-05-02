import React from 'react';
import { createBrowserRouter as Router, RouterProvider as Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import PatientsList from './components/patientsList';
import PatientDetail from './components/patientDetail';
import CodePage from './components/code';
import NavBar from './components/navBar';
import MedicamentsPage from './components/medicaments';
import ExamsCatalogPage from './components/examCatalogPage';

const rooter = Router([
  {
    path:"/all-patients/",
    element: <PatientsList />,
  },
  {
    path:"/patient-id/:patientId",
    element: <PatientDetail />,
  },
  {
    path:"/code-manager/",
    element: <CodePage/>
  },
  {
    path:"/medoc/",
    element:<MedicamentsPage/>
  },
  {
    path:"/biologie/",
    element:<ExamsCatalogPage/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <Route router={rooter}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
