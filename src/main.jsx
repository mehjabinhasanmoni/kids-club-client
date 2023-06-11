import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/routes';
import AuthProvider from './Providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <div className="max-w-screen-2xl mx-auto">
            <RouterProvider router={router} />
          </div>
      </QueryClientProvider>
      </AuthProvider>
  </React.StrictMode>,
)


