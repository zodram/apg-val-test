import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
// import Nav from './components/Navbar'
import Link from 'next/link'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apologist Validate',
  description: 'Evaluation App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Apologist</Link>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/prompts">Prompts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/configurations">Configurations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/evaluation/">Evaluation</Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
    </header>
    <main>
        {children}
        </main>
      </body>
    </html>
  )
}
