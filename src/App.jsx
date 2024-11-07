import './App.css';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import useGetTopRatedMovies from './hooks/useGetTopRatedMovies.js';
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

const MovieContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const MovieItem = styled('div')({
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
});

const MovieImage = styled('img')({
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
});

const MovieTitle = styled('div')({
    fontSize: '1.2rem',
    margin: '10px 0 5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '200px',
});

function App() {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetTopRatedMovies();

    const {ref, inView} = useInView();

    useEffect(() => {
        if(inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }

    }, [inView]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error.message}</p>;

    return (
        <div className="App">
            <Grid container spacing={4} sx={{ maxWidth: '1000px', margin: 'auto' }}>
                {data?.pages.map((page) =>
                    page.results.map((movie) => (
                        <MovieContainer item sm={4} xs={12} key={movie.id}>
                            <MovieItem>
                                <MovieImage
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <MovieTitle>{movie.title}</MovieTitle>
                            </MovieItem>
                        </MovieContainer>
                    ))
                )}
            </Grid>

            <h1 ref={ref}>Load more...</h1>

        </div>
    );
}

export default App;
