import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './pages/Room/Room';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

function App() {
  const { loading } = useLoadingWithRefresh();
  
  return loading ? <Loader message="Loading..." /> : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<GuestRoute>
          <Home />
        </GuestRoute>} />

        <Route path="/authenticate" element={<GuestRoute>
          <Authenticate />
        </GuestRoute>} />

        <Route path="/activate" element={<SemiProtectedRoute>
          <Activate />
        </SemiProtectedRoute>} />

        <Route path="/rooms" element={<ProtectedRoute>
          <Rooms />
        </ProtectedRoute>} />

        <Route path="/room/:id" element={<ProtectedRoute>
          <Room />
        </ProtectedRoute>} />

      </Routes>

      <NotificationContainer />
    </BrowserRouter>
  );
}


const GuestRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector(state => state.auth);

  return isAuth ? <Navigate replace to={
    {
      pathname: '/rooms',
      state: { from: location },
    }
  } /> : children
}
 
const SemiProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user } = useSelector(state => state.auth);
  return !isAuth ? <Navigate replace to={
    {
      pathname: '/',
      state: { from: location },
    }
  } /> : (
    (isAuth && !user.activated) ? children : <Navigate replace to={
      {
        pathname: '/rooms',
        state: { from: location },
      }
    } />
  )
}


const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user } = useSelector(state => state.auth);
  return !isAuth ? <Navigate replace to={
    {
      pathname: '/',
      state: { from: location },
    }
  } /> : (
    (isAuth && !user.activated) ? <Navigate replace to={
      {
        pathname: '/activate',
        state: { from: location },
      }
    } /> : children
  )
}

export default App;