import React from 'react';
import GlobalStyle from './styles/global'

import singIn from './pages/SignIn'

const App: React.FC = () => {
  return (
    <>
      <singIn />
      <GlobalStyle />
    </>);
}

export default App;
