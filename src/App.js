import React from 'react';
import './index.scss';
import {Collection} from './Collection';

const categories = [
    { "name": "All" },
    { "name": "Travel" },
    { "name": "Sports" },
    { "name": "Work" },
    { "name": "Family" }
  ];

function App() {
    const [categoryId, setCategoryId] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true)
    const [collections,
        setCollections] = React.useState([]);

    const [searchValue,
        setSearchValue] = React.useState('');

    React.useEffect(() => {
        setIsLoading(true);
        const category = categoryId ? `category=${categoryId}` : '';
        fetch(`https://6305fd33697408f7edd017c1.mockapi.io/collections?page=${page}&limit=3&${category}`).then((res) => res.json()).then((json) => {
            setCollections(json);
            console.log(json);
        }).catch((err) => {
            console.warn(err);
            alert('Error');
        }).finally(() => setIsLoading(false));
    }, [categoryId, page]);
    
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="App">
            <h1>Nice Portfolio Pics</h1>
            <div className="top">
                <ul className="tags">
                    {
                        categories.map((obj, i) => <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)
                    }
                </ul>
                <input
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    className="search-input"
                    placeholder="Search by title"/>
            </div>
            <div className="content">
                {isLoading ? <h2>Loading...</h2> : collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) => (<Collection key={index} name={obj.name} images={obj.photos}/>))}
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, i) => <li onClick={() => setPage(i +1)} className={page === i+1 ? 'active' : ''}>{i+1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
