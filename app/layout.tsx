// app/layout.tsx
import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </body>
    </html>
  );
}
