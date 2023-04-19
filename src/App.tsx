import { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

interface Book {
  id: number;
  title: string;
  author: string;
  publish_year: number;
  page_count: number;

}

function App() {
  const [ books, setBooks ] = useState([] as Book[])
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ publish_year, setPublishYear ] = useState(0);
  const [ page_count, setPageCount ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');

  async function adatLekerdezes() {
    const response = await fetch('http://localhost:3000/api/books')
    const data = await response.json() as Book[];
    setBooks(data);
  }

  useEffect(() => {
    adatLekerdezes();
  }, [])

  async function ujKonyv(e : FormEvent) {
    e.preventDefault();
    const adatok = {
      title, author, publish_year, page_count
    }

    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adatok)
    });
    if (response.ok) {
      setTitle('');
      setAuthor('');
      setPublishYear(0);
      setPageCount(0);
      adatLekerdezes();
      setErrorMessage('');
    }
    else {
      const hibaObj = await response.json();
      const hibak = hibaObj.message as string[];
      setErrorMessage(hibak.join('; '))
    }
  }

  return <div className='container-fluid'> 
  <header>

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="#ujKonyvForm">Új könyv felvétele</a>
      <a className="nav-item nav-link" href="http://petrik.hu">Petrik</a>
    </div>
  </div>
</nav>

<h1>Petrik Könyvtár Nyilvántartó</h1>
  </header>
  <div className='row'>
  {
  books.map(books => <div className='col-12 col-sm-6 col-md-4 book'>
    <h2>{ books.title }</h2>
    <p>Kiadó: { books.author }</p>
    <p>Hossz: { books.page_count }</p>
    <p>Kiadás éve: { books.publish_year }</p>
    <p><img src={'/kepek/' + books.author + '.jpg'} alt={books.author} /></p>
    
    </div>)}
    </div>

    <form onSubmit={ujKonyv} id='ujKonyvForm'>
    <label>
        Cím: <br />
        <input type='text' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      </label>

      <label>
        Author: <br />
        <input type='text' value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
      </label>

      <label>
        Publish Year: <br />
        <input type='number' value={publish_year} onChange={(e) => setPublishYear(parseInt(e.currentTarget.value))} />
      </label>
      
      <label>
        Page Count: <br />
        <input type='number' value={page_count} onChange={(e) => setPageCount(parseInt(e.currentTarget.value))} />
      </label>
      <div className='error'>{ errorMessage }</div>
      <input type="submit" value='Uj konyv' />
    </form>
    <footer>Készítette: Minta Diák</footer>
  </div>
  }

export default App