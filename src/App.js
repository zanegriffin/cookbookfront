import React from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const url = "https://cookbookapizane.herokuapp.com/api"
  const [authors, setAuthors] = React.useState([])
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
  React.useEffect(() => getAuthors(), [])
  
  const renderAuthors = authors.map((author) => {
    return(
      <>
        <h3>{author.firstName} {author.lastName}</h3>
        <h3>{author._id}</h3>
      </>
    )
  })
  
  //get all cookbook
  axios({url: url + '/cookbooks'})

  return (
    <div className="App">
      <header>
        <h1>Cookbooks</h1>
      </header>
      <p>{authors.length > 0 ? renderAuthors : ''}</p>

    </div>
  );
}

export default App;
