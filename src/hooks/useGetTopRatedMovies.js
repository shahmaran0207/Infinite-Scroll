import {useInfiniteQuery} from "@tanstack/react-query";

const fetchTopRatedMovies=async (page)=>{
    const response=await fetch(`
    https://api.themoviedb.org/3/movie/top_rated?page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjI2MDg0NmQ0OTMxZWM2OWNiYWU3Y2E1MTRhODgzZiIsIm5iZiI6MTcyNzkxMzMzNS4zOTcwNTMsInN1YiI6IjY2ZmM5YjllMjViNjFjMzNkYTU5NDIxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4gmtFQMOgYUlaEt4Qpr__lSJpvrzixKdtRliyl6tBs'
        }
    });
    return response.json();
};

const useGetTopRatedMovies =()=>{
    return useInfiniteQuery({
        queryKey:['top-rated-movie'],
        queryFn:({pageParam})=>{
            return fetchTopRatedMovies(pageParam)
        },

        getNextPageParam:(last)=>{
            if(last.page<last.total_pages) return last.page+1;

            return undefined;
        },

        initialPageParam:1,
    })
}

export default useGetTopRatedMovies;