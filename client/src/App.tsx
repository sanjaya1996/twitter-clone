// Packages
import axios from 'axios';

import Routes from './routes/Routes';

import './sass/_main.scss';

axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return <Routes />;
};

export default App;
