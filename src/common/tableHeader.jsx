import React, {Component} from 'react'
import TableBody from '../common/tableBody'

// columns: array
// sortColumn : obj
// onSort :
class TableHeader extends Component{
    raiseSort= path =>{
        const sortColumn={...this.props.sortColumn}
        if (sortColumn.path ===path)
        sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc'
        else{
        sortColumn.path= path
        sortColumn.order ='asc'
        }
        this.props.onSort(sortColumn)
    }
renderSortIcon = column => {
    const {sortColumn} = this.props
    if(column.path !== sortColumn.path) return (null)
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"/>
    if(sortColumn.order === 'desc') return <i className="fa fa-sort-desc"/>
    
}
    render(){
return(
    <thead>
        <tr>
{this.props.columns.map(column => (
<th className="clickable" key={column.path}  onClick={() =>this.raiseSort(column.path)}>{column.label} {this.renderSortIcon(column)}</th>))}
        </tr>
        {/* <TableBody data={movies} columns={this.columns}/> */}
    </thead>
)
}
}

export default TableHeader