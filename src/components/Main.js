import { useEffect, useState } from "react";
import axios from "axios";
import Info from "./Info";
import Input from "./Input";
import Like from "./Like";
import Generate from "./Generate";
import Lyrics from "./Lyrics";
import Disclaimer from "./Disclaimer";

const Main = () => {

    const [ songTitle, setSongTitle ] = useState("");
    const [ lyrics, setLyrics ] = useState("");
    const [ activity, setActivity ] = useState("");
    const [ like, setLike ] = useState(false);
    const [ newSong, setNewSong ] = useState(false);
    const [ likeText, setLikeText ] = useState("");

    const handleLike = (like) => {
        if (like === true) {
            setLike(true);
            setLikeText("liking");
        } else {
            setLike(false);
            setLikeText("not liking");
        }
    };

    // Create a useEffect to handle the click of the generate button to generate new lyrics
    useEffect(() => {

        // This is where all the API call stuff is going to go!
        // I can then use that data to set the state of the songTitle and the lyrics
        if (newSong === true) {

            const apiKey = process.env.REACT_APP_API_KEY;

            axios.post(
                "https://api.openai.com/v1/completions",
                {
                    prompt: `Generate a Ramones-style song about ${likeText} ${activity} using the following format:

                    1. Song Title
                    2. Verse
                    3. Chorus
                    4. Verse
                    5. Chorus
                    6. Bridge
                    7. Chorus`,
                    model: "text-davinci-003",
                    max_tokens: 500,
                    temperature: 0.6,
                  },
                  {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                    },
                }
            ).then((apiData) => {
                console.log(apiData);
                const splitInit = (apiData.data.choices[0].text).split("\n");
                const splitTitle = splitInit[2].split(" ");
                const verse1Raw1 = splitInit[3].split(" ");
                const verse1Raw2 = splitInit[4];
                const chorusRaw1 = splitInit[5].split(" ");
                const chorusRaw2 = splitInit[6];
                const verse2Raw1 = splitInit[7].split(" ");
                const verse2Raw2 = splitInit[8];
                const bridgeRaw1 = splitInit[11].split(" ");
                const bridgeRaw2 = splitInit[12];
                const refinedLyrics = verse1Raw1 + verse1Raw2 + chorusRaw1 + chorusRaw2 + verse2Raw1 + verse2Raw2 + chorusRaw1 + chorusRaw2 + bridgeRaw1 + bridgeRaw2 + chorusRaw1 + chorusRaw2;
                console.log(splitInit);
                console.log(splitTitle[1]);
                console.log(refinedLyrics);
                // console.log(apiData.data.choices[0].text);
                setSongTitle(splitTitle[1]);
                setLyrics(refinedLyrics);
                setNewSong(false);
            });
        }
        
    }, [newSong])

    return (
        <>
            <Info />
            <Input
                activity={activity}
                setActivity={setActivity}
            />
            <Like
                like={like}
                setLike={setLike}
                handleLike={handleLike}
            />
            <Generate
                setNewSong={setNewSong}
            />
            <Lyrics
                songTitle={songTitle}
                lyrics={lyrics}
            />
            <Disclaimer />
        </>
    )
}

export default Main;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/form.css";
// import Book from "./Book.js";
// import Movie from "./Movie.js";
// import Comparison from "./Comparison.js";
// import Error from "./Error.js";

// const Form = () => {
//     const [movieData, setMovieData] = useState([]);
//     const [bookData, setBookData] = useState([]);
//     const [movieError, setMovieError] = useState(false);
//     const [bookError, setBookError] = useState(false);
//     const [userInput, setUserInput] = useState("");
//     const [componentRender, setComponentRender] = useState(false);
//     const [selectedMovie, setSelectedMovie] = useState("");
//     const [selectedBook, setSelectedBook] = useState("");
//     const [result, setResult] = useState("");
//     const [isMovieLoading, setIsMovieLoading] = useState(false);
//     const [isBookLoading, setIsBookLoading] = useState(false);
//     const [resetText, setResetText] = useState(false);
//     const [bookRate, setBookRate] = useState('');
//     const [movieRate, setMovieRate] = useState('');
//     const [userSearch, setUserSearch] = useState("");

//     // Build an useEffect to make the comparison after the user pick a movie and a book.
//     useEffect(() => {
//         //Verifying if both movie and book were selected by the user
//         if(selectedMovie !== "" && selectedBook !== "") {
//             if(selectedMovie.rating > selectedBook.rating) {
//                 setResult("movie");
//             }
//             else if(selectedMovie.rating < selectedBook.rating) {
//                  setResult("book");
//             }
//             else {
//                 setResult("tie");
//             }
//         }
//     },[selectedMovie, selectedBook]);

//     //Tracking the changes on userInput
//     const handleChange = (e) => {
//         setUserInput(e.target.value);
//     }

//     //Get the form submission to start the APIs call
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setResetText(false);

//         //check for empty form submission
//         if(userInput.trim()) {
//             //setup the useStates to perform the axios call and render the right component into the screen
//             setMovieError(false);
//             setBookError(false);
//             setResult("");
//             setSelectedMovie("");
//             setSelectedBook("");
//             setBookRate("");
//             setMovieRate("");

//             // Movie API request
//             // Start load screen to wait for the API data
//             setIsMovieLoading(true);
//             setIsBookLoading(true);

//             //set the userSearch to error handling
//             setUserSearch(userInput);

//             axios({
//                 url: "https://api.themoviedb.org/3/search/movie",
//                 params: {
//                     api_key: process.env.REACT_APP_MOVIE_API_KEY,
//                     query: userInput
//                 }
//             })
//             .then(apiDataMovie => {
//                 //Check the API response array length before hold the data in a variable 
//                 if(apiDataMovie.data.results.length !== 0) {
//                     const movieDataObj = apiDataMovie.data.results;
                    
//                     // Create an empty array to hold the filtered values
//                     const movieArrayData = [];

//                     for(let index in movieDataObj) {
//                         //handle the movie rating in case the title has no rating
//                         let newMovieRating = "";

//                         if(movieDataObj[index].vote_average) {
//                             newMovieRating = Math.round((movieDataObj[index].vote_average / 10) * 100);                        
//                         }
//                         else {
//                             newMovieRating = 0;
//                         }

//                         //handle the movie vote count in case the title has no votes
//                         let newMovieVotes = "";
//                         if(movieDataObj[index].vote_count) {
//                             newMovieVotes = movieDataObj[index].vote_count;                        
//                         }
//                         else {
//                             newMovieVotes = 0;
//                         }

//                         //handle the movie image url in case the title has no image path
//                         let movieImg = "";
//                         if(movieDataObj[index].poster_path) {
//                             movieImg = "https://image.tmdb.org/t/p/w500"+movieDataObj[index].poster_path;
//                         }
//                         else {
//                             movieImg = null;
//                         }
                        
//                         //Create a new object to fill the array
//                         const newMovieObj = {
//                             id: movieDataObj[index].id,
//                             title: movieDataObj[index].title,
//                             description: movieDataObj[index].overview,
//                             image: movieImg,
//                             rating: newMovieRating,
//                             published: movieDataObj[index].release_date,
//                             voteCount: newMovieVotes
//                         }

//                         movieArrayData.push(newMovieObj);
//                     }

//                     //sorting the array in descending vote count order
//                     const sortedArray = movieArrayData.sort((a, b) => b.voteCount - a.voteCount);

//                     const newSortedMovie = [];                    
//                     //wrapper the movie results in maximum 10 titles sorted.
//                     if(sortedArray.length >= 10) {
//                         for(let i = 0; i < 10; i++) {
//                             newSortedMovie.push(sortedArray[i]);
//                         }
//                     }
//                     else {
//                         for(let i = 0; i < sortedArray.length; i++) {
//                             newSortedMovie.push(sortedArray[i]);
//                         }
//                     }

//                     //Fill the use state to pass down by props
//                     setMovieData(newSortedMovie);
//                     //set error handling to false
//                     setMovieError(false);                    
//                 }
//                 else {
//                     // If no movie is found, set error handling to true
//                     setMovieError(true);
//                 }
                
//                 // Stop load screen
//                 setIsMovieLoading(false);
//             });

//             // Book API request
//             axios({
//                 url: "https://www.googleapis.com/books/v1/volumes",
//                 params: {
//                     key: process.env.REACT_APP_BOOKS_API_KEY,
//                     q: `intitle:'${userInput}'`,
//                     printType: "BOOKS",
//                     filter: "partial",
//                     orderBy: "relevance"
//                 }
//             })
//             .then(apiDataBook => {
//                 //Check the API response array length before hold the data in a variable 
//                 if(apiDataBook.data.totalItems !== 0) {                   
//                     const bookDataObj = apiDataBook.data.items;

//                     // Create an empty array to hold the filtered values
//                     const bookArrayData = [];

//                     for(let index in bookDataObj) {
//                         // handle the book rating in case the book has no rate
//                         let newBookRating = "";
//                         if(bookDataObj[index].volumeInfo.averageRating) {
//                             newBookRating = Math.round((bookDataObj[index].volumeInfo.averageRating / 5) * 100);
//                         }                    
//                         else {
//                             newBookRating = 0;                                                
//                         }

//                         //handle the book vote count in case the title has no votes
//                         let newBookVotes = "";
//                         if(bookDataObj[index].volumeInfo.ratingsCount) {
//                             newBookVotes = bookDataObj[index].volumeInfo.ratingsCount;                        
//                         }
//                         else {
//                             newBookVotes = 0;
//                         }

//                         //handle the book image in case the book has no image
//                         let bookImg = "";
//                         if(bookDataObj[index].volumeInfo.imageLinks) {                            
//                             bookImg = bookDataObj[index].volumeInfo.imageLinks.thumbnail;
//                             bookImg = bookImg.slice(0, 4) + "s" + bookImg.slice(4);
//                         }
//                         else {
//                             bookImg = null;
//                         }

//                         //Create a new object to fill the array
//                         const newBookObj = {
//                             id: bookDataObj[index].id,
//                             title: bookDataObj[index].volumeInfo.title,
//                             author: bookDataObj[index].volumeInfo.authors,
//                             description: bookDataObj[index].volumeInfo.description,
//                             image: bookImg,
//                             rating: newBookRating,
//                             published: bookDataObj[index].volumeInfo.publishedDate,
//                             voteCount: newBookVotes,
//                             pageCount: bookDataObj[index].volumeInfo.pageCount
//                         }

//                         bookArrayData.push(newBookObj);
//                     }

//                     //sorting the book array in descending vote count order
//                     const sortedArray = bookArrayData.sort((a, b) => b.voteCount - a.voteCount);

//                     const newSortedBook = [];                    
//                     //wrapper the book results in maximum 10 titles sorted.
//                     if(sortedArray.length >= 10) {
//                         for(let i = 0; i < 10; i++) {
//                             newSortedBook.push(sortedArray[i]);
//                         }
//                     }
//                     else {
//                         for(let i = 0; i < sortedArray.length; i++) {
//                             newSortedBook.push(sortedArray[i]);
//                         }
//                     }

//                     //Fill the use state to pass down by props
//                     setBookData(newSortedBook);
//                     //set error handling to false
//                     setBookError(false);

//                 }
//                 else {
//                     // If no book is found, set error handling to true
//                     setBookError(true);
//                 }

//                 // Stop load screen
//                 setIsBookLoading(false);
//             });

//             //Clear the user input 
//             setUserInput("");
//             //Set component render to show the the book and the movie component
//             setComponentRender(true);

//         }
//         else {
//             alert("Please enter a book or movie title!");
//         }
//     }

//     //Get the user movie chosen
//     const movieHandleSelected = (e) => {
//         movieData.forEach((item) => {            
//             // console.log(item.id);
//             if(item.id === parseInt(e.target.parentElement.id)) {                
//                 const newMovieSelected = {
//                     id: item.id,
//                     title: item.title,
//                     description: item.description,
//                     image: item.image,
//                     rating: item.rating,
//                     published: item.published,
//                     voteCount: item.voteCount
//                 }

//                 //Fill the use state with user selection
//                 setSelectedMovie(newMovieSelected);
//             }
//         });
//     }

//     //Get the user book chosen
//     const bookHandleSelected = (e) => {
//         bookData.forEach((item) => {
//             if(item.id === e.target.parentElement.id) {
//                 const newBookSelected = {
//                     id: item.id,
//                     title: item.title,
//                     description: item.description,
//                     image: item.image,
//                     rating: item.rating,
//                     published: item.published,
//                     voteCount: item.voteCount,
//                     pageCount: item.pageCount
//                 }

//                 //Fill the use state with user selection
//                 setSelectedBook(newBookSelected);
//             }
//         });        
//     }
    
//     const handleClose = (e) => {
//         e.target.parentElement.parentElement.classList.add("hidden");
//         setResetText(true);
//         setBookRate(selectedBook.rating);
//         setMovieRate(selectedMovie.rating);
//     }

//     return (
//         <>
//             <form id="userInputForm" className="searchBar" onSubmit={handleSubmit}>
//                 <label htmlFor="userInput">Search for a title:</label>
//                 <input type="text" id="userInput" onChange={handleChange} value={userInput}/>
//                 <button aria-label="Search title">Search</button>
//             </form>
//     <div className="formComponent wrapper">
//             <section aria-live="polite">
//             {
//                 componentRender === false
//                 ? <h2 className="welcomeMsg">Welcome! Please search for your favourite movie / book title to begin!</h2>
//                 : movieError === true || bookError === true 
//                     ? <Error 
//                         userSearch={userSearch}
//                         bookData={bookData}                    
//                         bookError={bookError}
//                         movieData={movieData}
//                         movieError={movieError} 
//                     />
//                     : <div>
//                         {bookData === "" && movieData === ""
//                         ? null
//                         : <div className="formSuccessBox">
//                             <h3 className="mediaHelp">
//                             {resetText
//                                 ? "Search another book or movie title to play again!"
//                                 : "Choose one movie and one book to see which is better!"}
//                             </h3>
//                             <div className="mediaListFlex">
//                                 <Book 
//                                     bookData={bookData} 
//                                     bookHandleSelected={bookHandleSelected} 
//                                     selectedBook={selectedBook} 
//                                     isBookLoading={isBookLoading}
//                                     bookRate={bookRate}
//                                     userSearch={userSearch}
//                                 />
//                                 <Movie 
//                                     movieData={movieData} 
//                                     movieHandleSelected={movieHandleSelected} 
//                                     selectedMovie={selectedMovie}
//                                     isMovieLoading={isMovieLoading} 
//                                     movieRate={movieRate}
//                                     userSearch={userSearch}
//                                 />
//                             </div>
//                             <h3 className="mediaHelp">Don't see your book or movie? Try searching something more specific!</h3>
//                         </div>
//                         }
//                         {
//                             result === ""
//                             ? null
//                             : <Comparison 
//                                 result={result} 
//                                 selectedBook={selectedBook}
//                                 handleClose={handleClose}
//                             />
//                         }                        
//                     </div>
//             }
//             </section>         
//         </div>
//         </>
//     )
    
// }

// export default Form;