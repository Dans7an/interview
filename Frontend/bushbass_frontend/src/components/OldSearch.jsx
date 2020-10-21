// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import './home.css';
// import './search.css';

// const Search = ({ movieList }) => {
//   const [inputText, setInputText] = useState('');
//   const [filteredList, setFilteredList] = useState([]);

//   useEffect(
//     () =>
//       setFilteredList(
//         movieList.filter((movie) =>
//           movie.title.toLowerCase().includes(inputText.toLowerCase())
//         )
//       ),
//     [movieList, inputText]
//   );

//   return (
//     <main className='search-main'>
//       <div className='search-area'>
//         <h2>Search within the top 20</h2>
//         <div>
//           <input
//             type='text'
//             value={inputText}
//             onChange={(Event) => setInputText(Event.target.value)}
//           />
//         </div>
//       </div>
//       <div className='card-display-area'>
//         {filteredList.length < 1 && <h2>No movies match your search</h2>}
//         {filteredList.map(
//           ({ id, title, overview, vote_average, popularity, poster_path }) => (
//             <Card
//               key={id}
//               title={title}
//               overview={overview}
//               vote_average={vote_average}
//               popularity={popularity}
//               id={id}
//               poster_path={poster_path}
//             />
//           )
//         )}
//       </div>
//     </main>
//   );
// };
// export default Search;
