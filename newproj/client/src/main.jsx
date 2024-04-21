import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayData from './DisplayData.jsx';
// import FrmAdditem from './FrmAdditem.jsx';
import ItemPage from './ItemPage.jsx';
import { ChakraProvider } from '@chakra-ui/react';
const muitheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={muitheme}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/category-list/:itemCode" element={<DisplayData />} />
            {/* <Route path='/frmdata' element={<FrmAdditem />}/> */}
            <Route path='/items' element={<ItemPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
