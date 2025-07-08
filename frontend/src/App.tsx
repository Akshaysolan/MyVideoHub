import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './reducers/store';
import {Toaster} from "sonner";


function App() {
  

  return (
    <>
      <Provider store={store}>
        <Toaster position='top-right' richColors closeButton/>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
