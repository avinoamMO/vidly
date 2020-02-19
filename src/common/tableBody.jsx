import React, {Component} from 'react'
import _ from 'lodash'

class TableBody extends Component{
    render(){
        console.log(this.props.columns)
        const {data,columns} = this.props
        console.log(columns)
        
    return(/*
<tbody>
    
{data.map(item=><tr>
{columns.map(column=>
                <td>{_.get(item,column.path)}</td>)}
</tr>)}

</tbody>

   */<div>bla</div> )
}
}

export default TableBody