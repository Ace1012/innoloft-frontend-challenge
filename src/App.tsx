import './App.css'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import ViewProduct from './pages/viewProduct';
import EditProduct from './pages/editProduct';
import Navbar from './components/navbar';

import store from './store/store';
import { fetchConfig } from './store/slices/configSlice';
import { fetchProduct } from './store/slices/productSlice';
import { IConfig } from './interfaces/interfaces';

function App() {
  const dispatch = store.dispatch;

  async function fetchMyConfig() {
    await dispatch(fetchConfig())
      .then(res => {
        const root = document.querySelector(":root") as HTMLElement;

        /**
         * On success set "--btn-primary" and "--btn-secondary"to 
         * config.mainColor and a color of my choosing otherwise set
         *  to some default colors.
         */
        if (res.meta.requestStatus === "fulfilled") {
          const config = res.payload as IConfig;

          root.style.setProperty("--btn-primary", config.mainColor);
          root.style.setProperty("--btn-secondary", "#000000");
        } else {
          root.style.setProperty("--btn-primary", "#242424");
          root.style.setProperty("--btn-secondary", "#ffffff");
        }
      })
  }

  async function fetchMyProduct() {
    await dispatch(fetchProduct())
  }

  async function fetchDefaults() {
    fetchMyConfig()
    fetchMyProduct()
  }

  useEffect(() => {
    const unsub = store.subscribe(() => {
      console.log("Current state", store.getState())
    })

    fetchDefaults();

    return () => unsub();
  }, []);

  return (
    <div className='bg-gray-100 flex flex-1 flex-col'>
      <Navbar />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<ViewProduct />} path='/product' />
        <Route element={<EditProduct />} path='/product/edit' />
      </Routes>
    </div>
  )
}

export default App
