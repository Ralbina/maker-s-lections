import Navbar from './componenrs/Navbar';
import AuthContextProvider from './contexts/AuthContextProvider';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <MainRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;
