
import { useState } from 'react';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import './styles.css';
import { useTheme } from './ThemeContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={`app ${theme === 'dark' ? 'modo-oscuro' : ''}`}>
        <AppRoutes />
      </div>
    </>
  )
}

export default App;
