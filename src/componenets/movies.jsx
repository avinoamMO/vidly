import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService'
import MoviesTable from './moviesTable'
import ListGroup from '../common/listGroup'
import Pagination from '../common/pagination'
import {paginate} from "../utils/paginate"
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash'

class Movies extends Component{
    state = {
        movies: [],
        genres: [],
        pageSize : 3,
        currentPage : 1,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount(){
        const genres =[{_id : '',name: 'All Genres'}, ...getGenres()]
        this.setState({movies: getMovies(), genres})
        
    }

    handleDelete = movie =>{
        const movies = this.state.movies.filter(m => m._id!==movie._id)
        this.setState({movies})
    }
    handleLike = movie =>{
     const movies = [...this.state.movies]
    const index= movies.indexOf(movie)
    movies[index] = {... movies[index]}
    movies[index].liked = !movies[index].liked
    this.setState({movies})
    }
    handlePageChange = page =>{
        this.setState({currentPage : page})
    }
    handleGenreSelect = genre =>{
        this.setState({selectedGenre: genre, currentPage:1})

    }
    handleSort = sortColumn=>{
       
        this.setState({sortColumn})
    }
    render(){
        const {length: count} = this.state.movies ;
        const {pageSize, currentPage,sortColumn ,movies: allMovies, selectedGenre} = this.state;
        if (this.state.movies.length === 0 ) 
        return (<p>There are no movies in the database.</p>)
        
        const filtered = selectedGenre && selectedGenre._id?
        allMovies.filter(m=>m.genre._id === selectedGenre._id)
        : allMovies

        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
        const movies=paginate(sorted, currentPage, pageSize)

        return(
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres} 
                    textProperty="name"
                    valueProperty="_id"
                    onItemSelect={this.handleGenreSelect}
                    selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database</p>
      <MoviesTable onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    sortColumn={sortColumn}
                    movies={movies}
                    onSort={this.handleSort}
                    />

        <Pagination itemsCount={filtered.length} 
                    onPageChange={this.handlePageChange} 
                    currentPage={this.state.currentPage}
                    pageSize={this.state.pageSize} />
                </div>
       
        </div>
        
        

        )}
}

export default Movies