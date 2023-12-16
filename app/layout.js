import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
// import Nav from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apologist Validate',
  description: 'Evaluation App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          test nav
        </div>
        {children}
      </body>
    </html>
  )
}
