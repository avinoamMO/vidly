import React, {Component} from 'react'
import Like from '../common/like'
import TableHeader from '../common/tableHeader'
import TableBody from '../common/tableBody'

class MoviesTable extends Component{

    columns =[
    {path: 'title', label: 'Title'},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {key: 'like', content: movie => <Like onClick={() => this.props.onLike(movie)} liked={movie.liked}/>},

    {key: 'delete', content: movie =>  <button  onClick={() => this.props.onDelete(movie)} className="button.btn.btn-dannger btn-sm">Delete</button>}
]    
    render(){
        const {movies, onDelete, onLike, sortColumn, onSort} = this.props
        return(
            <table className="table">
            <TableHeader columns ={this.columns} sortColumn={sortColumn} onSort={onSort} />
        
            
                <TableBody data={movies} columns={this.columns}/>
                
                {movies.map(movie =>(
                    <tr>
                    <td key={movie.name}>{movie.title}</td>
                    <td key={movie.name}>{movie.genre.name}</td>
                    <td key={movie.name}>{movie.numberInStock}</td>
                    <td key={movie.name}>{movie.dailyRentalRate}</td>
                </tr>
                ))}
                 
        </table>
        )
    }
}


export default MoviesTable