import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// import Navbar from './component/Navbar';
// import Card from './component/Card';

function App() {
useEffect(()=>{
  fetchData();
},[])

const[data, setData]=useState([]);
const[actor, setActor]=useState('');
const[episode, setEpisode]=useState('');
const[chara, setChara]=useState('');
const[titType, setTitType]=useState('');
const[movie, setMovie]= useState('')
const[srchMovie, setSrchMovie]=useState('Endgame');

const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/title/find',
  params: {q: srchMovie},
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};

const handleLearnMore = (actrName, episodes, charName, titleType)=>{
  setActor(actrName);
  setEpisode(episodes);
  setChara(charName);
  setTitType(titleType);
}
async function fetchData(){
  // console.log(options)
  
  try {
    const response = await axios.request(options);
    const lists = response.data.results;
    console.log(lists)
    // console.log(process.env);
    setData(lists) 
  } catch (error) {
    console.error(error);
  }

}


return (
    <>
      {/* navbar start */}
      <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">Movie Detailer</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>{
                        e.preventDefault();
                        setSrchMovie(movie);
                        fetchData();
                    }}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" aria-label="Search" value={movie} onChange={(e)=>{
                        setMovie(e.target.value);
                    }}/>
                    <button className="btn my-2 my-sm-0" id="src-btn" type="submit">Search</button>
                    </form>
                </div>
            </nav>
      {/* navbar end */}

      {/* body start */}
      <div className="container1">
        {
          data.map((items,i)=>{
              if(items.image && items.year){
                    return(
                      <>
                      <div className="movie-card" key={items.id}>
                      <div className='Img-title'> 
                            <img className='card-img' src={items.image.url} alt='image not loaded' />
                        
                          <span className="movie-title">{items.title}</span>
                      </div>
                      <div className="movie-info" key={`info-${items.id}`}>
                          <h4 className="movie-epi">Released:-{items.year}</h4>
                          <a href='#'>
                          {items.principals && items.principals.length > 0 && items.principals[0].characters ? (
                            <button
                              className='learn-btn'
                              type='button'
                              data-toggle='modal'
                              data-target='#exampleModal'
                              onClick={() => {
                                handleLearnMore(
                                  items.principals[0].name,
                                  items.principals[0].episodeCount,
                                  items.principals[0].characters[0],
                                  items.titleType
                                  );
                                }}
                                >
                              Learn more
                            </button>
                          ) : null}
                        </a> 
        
                      </div>        
                            
                    </div>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" key={`additional-${items.id}`}>
                      <div className="modal-dialog" role="document">
                          <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Movie Description</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <h5>Main Actor :- {actor}</h5><br/>
                              <p>Role Played :- {chara}</p>
                              <p>Total Episodes :- {episode}</p>
                              <p>Title Type :- {titType}</p>
                          </div>
                          </div>
                      </div>
    //              </div>
                  {/*body end    */}
                    </>
                  )              
              
              }
          })
          }
      </div> 
    </>
          
          );
}

export default App;
