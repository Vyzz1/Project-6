import LayoutDefault from "../layouts/LayoutDefault";
import Dashboard from "../pages/Dashboard";
import BookRoom from "../pages/BookRoom";
import Room from "../pages/Room";
import CreateRoom from "../pages/Room/CreateRoom";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Searching from "../pages/Searching";
import DetailCompany from "../pages/DetailCompany";
import DetailJobs from "../pages/DetailJobs";
import SettingCompany from "../pages/SettingCompany";
import SettingJobs from "../pages/SettingJobs";
import DetailJobsAdmin from "../pages/DetailJobsAdmin";
import ManageCv from "../pages/ManageCV";
import DetailCv from "../pages/DetailCv";
import Register from "../pages/Register";
import CvByJob from "../pages/CvByJob";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "book-room",
        element: <BookRoom />,
      },
      {
        path: "room",
        element: <Room />,
      },
      {
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        path: "/search/:city/:text",
        element: <Searching />,
      },
      {
        path: "/company/:idCompany",
        element: <DetailCompany />,
      },
      {
        path: "/jobs/:id",
        element: <DetailJobs />,
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },

          {
            path: "setting/company",
            element: <SettingCompany />,
          },
          {
            path: "setting/jobs",
            element: <SettingJobs />,
          },
          {
            path: "admin/jobs/:id",
            element: <DetailJobsAdmin />,
          },
          {
            path: "setting/cv",
            element: <ManageCv />,
          },
          {
            path: "admin/cv/:id",
            element: <DetailCv />,
          },
          {
            path: "admin/job/:id/cv",
            element: <CvByJob />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];
