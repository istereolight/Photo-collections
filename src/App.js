import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './Collection';
import data from './data/data.json';


function App() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryID] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setCollections(data.collections.filter( obj => {
      return categoryId ? obj.category === categoryId : obj.category;
    }));
    setIsLoading(false);
  }, [categoryId]);

  // console.log(collections)


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
              data.categories.map((obj, i) => 
              <li 
                onClick={() => setCategoryID(i)}
                className={categoryId === i ? 'active' : ''} 
                key={obj.name}
              >{obj.name}</li>)
            }
        </ul>
        <input 
          className="search-input" 
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
          {isLoading ? (
            <h2>Идёт загрузка...</h2>
            ) : (
              collections.filter(obj => {
                return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
              })
              .map((obj, index) => (
                <Collection 
                  key={index} 
                  name={obj.name} 
                  cat={obj.category}
                  images={obj.photos} 
                />
              ))
            ) 
          }
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => {
          return (
            <li
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}  
              key={i}>{i+1}
            </li>
          )
        } )}
      </ul>
    </div>
  );
}

export default App;
