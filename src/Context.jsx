import React, { Component, createContext } from "react";
import { TMDB_KEY } from "./config.js";
import axios from "axios";
import firebase from 'firebase';

import {
  auth,
  createUserProfileDocument
} from "../src/Components/Firebase/firebase.utils";
import { Persist } from "react-persist";

export const MovieContext = createContext();

class MovieContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //empty array because we are fetching an array from tmdb database
      trending: [],
      popular: [],
      now: [],
      coming: [],
      top: [],
      tv:[],
      top_rated:[],
      details: "",
      tvDetails:"",
      seasoninfo:"",
      seasonCredits:[],
      episodes:[],
      genres: [],
      created_by:[],
      languages:[],
      last_episode_to_air:"",
      seasons:[],
      cast: [],
      id: "",
      pid:"",
      tid:"",
      sid:"",
      companies: [],
      countries: [],
      similar: [],
      videos: [],
      reviews: [],
      //images:[],
      recommendations: [],
      tvRecommendations: [],
      person: "",
      external_ids: [],
      movie_credits: [],
      images : [],
      known_for: [],
      //there are two different arrays for searching movies
      //first is to fetch, second is to search and see results
      movies: [],
      moviesResult: [],
      //modal is closed at first, after state is true, component will show
      modalOpen: false,
      //number of movies that will be visible at first in homepage
      visible: 10,
      //state to understand if page is refreshed
      pageRefreshed: false,
      currentUser: null,
      //favorite movies array to store favorite movies
      favorite: []
    };
  }

  //we need this to sign out, currently user is not signed out
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    
    this.getTrending();
    this.getPopular();
    this.getTv();
    this.cleanState();
    this.handleClick();
    this.handlePersonClick();
    this.handleSeasonClick();
    this.handleTvClick();
    this.searchMovie();
    this.clearSearch();
    
    // set the currentusers state as signed in user with google
    //userAuth comes from firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if userAuth exists(have any value besides null)
      if (userAuth) {
        //userRef is waiting for the function we created in firebase utils that created a snapshot, which takes userAuth as value
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
        //https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
        console.log("beftimeout")
        await new Promise(resolve => setTimeout(resolve, 4000)); // 3 sec
        console.log("After")
        //window.location.reload();
        console.log("compdidmount",this.state.currentUser.id)
        firebase.database().ref(`users/${this.state.currentUser.id}/favorite`).on('value', res => {
          const resMovies = res.val();
          const copyFavorites = [];
  
          console.log("resmo",resMovies)
  
            for (let objKey in resMovies) {
              resMovies[objKey].key = objKey;
              copyFavorites.push(resMovies[objKey]);
              this.setState({ favorite: copyFavorites });
            }
  
        })

      } else {
        //if user logs out then state will be userAuth(if theres no userAuth then its null)
        this.setState({
          currentUser: userAuth
        });
      }
    });
  };

  //this is how user will sign out
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  //cleans the states for movie lists so they wouldnt stack up
  cleanState = () => {
    this.setState({
      popular: [],
      now: [],
      coming: [],
      top: [],
      top_rated:[],
      tv: []
    });
  };

  getTrending = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_KEY}`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          trending: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPopular = () => {
    this.cleanState();
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          popular: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getNow = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          now: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
    // console.log("worked");
  };

  getComing = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          coming: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getTop = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          top: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

getTv = () => {
  this.cleanState();
  axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
  )
  .then(response => {
    const apiResponse = response.data;
    this.setState({
      tv: apiResponse.results
    });
  })
  .catch(error => {
    console.log(error);
  });
};

getTvDetails = () => {
  this.cleanState();
  axios.get(
    `https://api.themoviedb.org/3/tv/${this.state.tid}?api_key=${TMDB_KEY}&language=en-US&page=1`
  )
  .then(response => {
    const apiResponse = response.data;
    this.setState({
      tvDetails: apiResponse,
      genres: apiResponse.genres,
      companies:apiResponse.production_companies,
      created_by:apiResponse.created_by,
      languages:apiResponse.languages,
      last_episode_to_air:apiResponse.last_episode_to_air,
      seasons:apiResponse.seasons,
    });
    console.log("created_by",apiResponse.last_episode_to_air)
  })
  .catch(error => {
    console.log(error);
  });
};



getTop_rated = () => {
  this.cleanState();
  axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
  )
  .then(response => {
    const apiResponse = response.data;
    this.setState({
      top_rated: apiResponse.results
    });
  })
  .catch(error => {
    console.log(error);
  });
};


  getDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        // console.log(this.state.id);
        this.setState(
          {
            details: apiResponse,
            genres: apiResponse.genres,
            companies: apiResponse.production_companies,
            countries: apiResponse.production_countries
          },
          () => console.log(apiResponse)
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  getTvSeasons = () => {

    console.log("inside get tv sessons")
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.state.tid}/season/${this.state.sid}?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        // console.log(this.state.id);
        this.setState(
          {
            seasoninfo:apiResponse,
            episodes: apiResponse.episodes,
          });    
          console.log("episode",this.state.episodes)   
          console.log("seasoninfo",this.state.seasoninfo)
      })
      
      .catch(error => {
        console.log(error);
      });
      
  };

  getTvSeasonsCredits = () => {

    console.log("inside get tv credit sessons")
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.state.tid}/season/${this.state.sid}/credits?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        // console.log(this.state.id);
        this.setState(
          {
            seasonCredits:apiResponse.cast
          });    
          console.log("season credits",this.state.seasonCredits)   
      })
      
      .catch(error => {
        console.log(error);
      });
      
  };


  

  getCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          cast: apiResponse.cast
        });
        // console.log(apiResponse.cast);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPerson = () => {
    console.log("inside getPerson",this.state.pid)
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.state.pid}?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        this.setState({
          person: apiResponse,
          known_for:apiResponse.also_known_as
        });
         console.log("known for",this.state.known_for);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPersonImages = () => {
    console.log("inside getPerson",this.state.pid)
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.state.pid}/tagged_images?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        this.setState({
          images: apiResponse.results,
        });
         console.log("Images",this.state.images);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getExternal_ids = () => {
    console.log("inside getPerson",this.state.pid)
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.state.pid}/external_ids?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        this.setState({
          external_ids: apiResponse,
        });
         console.log("Images",this.state.images);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getMovie_credits = () => {
    console.log("inside getcredits",this.state.pid)
    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.state.pid}/movie_credits?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        console.log("credits",apiResponse)
        this.setState({
          movie_credits: apiResponse.cast,
          
        });
        // console.log(apiResponse.cast);
        console.log("credits 2",this.state.movie_credits)
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSimilar = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/similar?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          similar: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getReccomendation = () =>{
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/recommendations?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          recommendations: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTvReccomendation = () =>{
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.state.tid}/recommendations?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          tvRecommendations: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getReviews  = () =>{
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/reviews?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          reviews: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getImages = () => {
    axios
    .get(
      `https://api.themoviedb.org/3/movie/${this.state.id}/images?api_key=${TMDB_KEY}&language=en-US&page=1`
    )
    .then(response => {
      const apiResponse = response.data;
      this.setState({
        images: apiResponse.results
      });
      // console.log(apiResponse.results);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getVideos = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/videos?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          videos: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //search from movies state, store to moviesResult array in state
  searchMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${this.state.movies}&language=en-US&page=1&include_adult=false`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          moviesResult: apiResponse.results
        });
        // console.log(apiResponse.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //this will get the id of clicked element and set the id state with id it got from the element
  //https://stackoverflow.com/questions/44325272/getting-the-id-of-a-clicked-element-from-rendered-list
  handleClick = id => {
    this.setState(
      {
        id: id
      },
      // how to put two callback functions within setState
      // https://stackoverflow.com/questions/53788156/passing-multiple-functions-as-callback-in-setstate
      () => {
        this.getDetails();
        console.log("movie id",id)
        this.getCast();
        this.getSimilar();
        this.getVideos();
        this.getReccomendation();
        this.getReviews();
        this.getImages();
        //this.getPerson();
      }
    );
  };

  handleTvClick = tid => {
    this.setState(
      {
        tid: tid
      },
      // how to put two callback functions within setState
      // https://stackoverflow.com/questions/53788156/passing-multiple-functions-as-callback-in-setstate
      () => {
        this.getTvDetails();
        console.log("tv id",tid)
        this.getTvReccomendation();
      }
    );
  };

  handleSeasonClick = sid => {
    this.setState(
      {
        sid: sid
      },
      () => {
        this.getTvSeasons();
        console.log("season number",sid)
        this.getTvSeasonsCredits();
        console.log("season cast",this.state.seasonCredits)
       
      }
    );
  };




  handlePersonClick = pid => {
    this.setState(
      {
         pid: pid
      },
    
    () => {
      console.log("pid is",pid)
      this.getPerson();
      console.log("pid is",pid)
      this.getMovie_credits();
      //this.getPersonImages();
      this.getExternal_ids();
    }
    )
  };


  // gets the value of inputs
  handleChange = e => {
    this.setState(
      {
        movies: e.target.value
      },
      () => {
        this.searchMovie();
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchMovie();
    //.reset() to reset searchbar
    e.target.reset();
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  clearSearch = () => {
    this.setState({
      movies: [],
      moviesResult: []
    });
  };

  //clears the state of visible to go back to initial state of 10 movies
  clearVisible = () => {
    this.setState({
      visible: 10,
      now: [],
      coming: [],
      top: [],
      tv:[],
      top_rated:[]
    });
  };

  //https://codepen.io/grantdotlocal/pen/zReNgE
  loadMore = () => {
    this.setState(prev => {
      return { visible: prev.visible + 5 };
    });
  };

  //using !this.state.pageRefreshed so pageRefreshed would always be opposite of it, on every click
  refreshPage = () => {
    this.setState({
      pageRefreshed: !this.state.pageRefreshed
    });
  };

  addFavorite = (movie) => {
    const { favorite } = this.state;
    let copyFavorites = [...favorite];
    let key=movie.id

    console.log(favorite)
    console.log(copyFavorites)
    console.log(key)
    console.log("inside")
    console.log("moviee",movie)
    console.log(this.state.currentUser.id)

    //if it doesnt include, add
    if (!favorite.includes(movie)) {
      //copyFavorites.push(movie);
      //this.setState({ favorite: copyFavorites });
         
     
      firebase.database().ref(`users/${this.state.currentUser.id}/favorite/${key}`).set(movie)

      // firebase.database().ref(`users/${this.state.currentUser.id}/favorite`).on('value', res => {
      //   const resMovies = res.val();
      //   const copyFavorites = [];

      //   console.log("resmo",resMovies)

      //     for (let objKey in resMovies) {
      //       resMovies[objKey].key = objKey;
      //       copyFavorites.push(resMovies[objKey]);
      //       this.setState({ favorite: copyFavorites });
      //     }

      // })
      //if it includes, remove
      //https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    } else {
      console.log("outside")
      copyFavorites = copyFavorites.filter(eachMovie => eachMovie !== movie);
      this.setState({ favorite: copyFavorites });
      firebase.database().ref(`users/${this.state.currentUser.id}/favorite/`).child(key).remove();
    }
  };

  render() {
    return (
      <MovieContext.Provider
        //these methods will be able to used by consumer after putting them here
        value={{
          ...this.state,
          getTrending: this.getTrending,
          getPopular: this.getPopular,
          getNow: this.getNow,
          getComing: this.getComing,
          getTop: this.getTop,
          getTv:this.getTv,
          getTop_rated:this.getTop_rated,
          handleClick: this.handleClick,
          handlePersonClick: this.handlePersonClick,
          handleSeasonClick:this.handleSeasonClick,
          handleTvClick:this.handleTvClick,
          handleSubmit: this.handleSubmit,
          handleChange: this.handleChange,
          searchMovie: this.searchMovie,
          openModal: this.openModal,
          closeModal: this.closeModal,
          clearSearch: this.clearSearch,
          loadMore: this.loadMore,
          cleanState: this.cleanState,
          clearVisible: this.clearVisible,
          refreshPage: this.refreshPage,
          updateMovieInfo: this.updateMovieInfo,
          addFavorite: this.addFavorite,
          getPerson:this.getPerson,
          getMovie_credits: this.getMovie_credits,
          getPersonImages:this.getPersonImages,
          getExternal_ids:this.getExternal_ids,
          getTvSeasons:this.getTvSeasons,
          getTvSeasonsCredits:this.getTvSeasonsCredits,
        }}
      >
        {this.props.children}
        <Persist
          name="movies"
          data={this.state}
          debounce={500}
          onMount={data => this.setState(data)}
        />
      </MovieContext.Provider>
    );
  }
}

export default MovieContextProvider;
