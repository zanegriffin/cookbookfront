import React from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Form from './Form'

function App() {
  const url = "https://cookbookapizane.herokuapp.com/api"
  const [authors, setAuthors] = React.useState([])
  const [books, setBooks] = React.useState([])
  const [selectedAuthor, setSelectedAuthor] = React.useState([])
  const emptyAuthor = {
    firstName: '',
    lastName: '',
  }
  //get all author
  const getAuthors = () => {
    axios.get(url + '/authors')
    .then((res) => {
      const persons = res.data
      console.log(res.data.data)
      setAuthors(persons.data)
    })
    .catch((error) => console.log(error))
  }
  //get all books
  const getCookbooks = () => {
    axios.get(url + '/cookbooks')
    .then((res) => {
      const books = res.data
      console.log(res.data.data)
      setBooks(books.data)
    })
    .catch((error) => console.log(error))
  }
  React.useEffect(() => getAuthors(), [])
  React.useEffect(() => getCookbooks(), [])
  //create new author
  const handleCreate = (newAuthor) => {
    axios({
      url: url +  '/authors', 
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(newAuthor)
    })
    .then(response => getAuthors())
  }
//update author
  const handleUpdate = (author) => {
    console.log('update', author.lastName)
    axios({
      url: url + '/authors/' + author.lastName, 
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(author)
    }).then(() => {
      getAuthors()
    })
  }
  const setAuthor = (author) => {
    setSelectedAuthor(author)
  }


  const renderAuthors = authors.map((author) => {
    return(
      <>
        <h3>{author.firstName} {author.lastName}</h3>
        <h3>{author._id}</h3>
        <Link to='/edit'><button onClick={() => setAuthor(author)}>Update</button></Link>
      </>
    )
  })
  const renderBooks = books.map((book) => {
    return(
      <>
        <h3>{book.title}</h3>
      </>
    )
  })
 

  return (
    <div className="App">
      <header>
        <h1>Cookbooks and Authors</h1>
        <Link to='/create'>
          <button>Add Author</button>
        </Link>
      </header>
      <main>
      <Switch>
      <Route exact path='/'>
      <div>{authors.length > 0 ? renderAuthors : ''}</div>
      <div>{books.length > 0 ? renderBooks : ''}</div>
      </Route>
        <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" handleSubmit={handleCreate} author={emptyAuthor}/>
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" handleSubmit={handleUpdate} author={selectedAuthor}/>
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
