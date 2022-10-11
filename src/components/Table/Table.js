import React from 'react';
import TableBody from './TableBody';

const Table = ({props}) => {

  return (
    <table className='uk-table uk-table-hover uk-table-divider'>
        <thead>
            <tr>
                <th>
                    {/* blank th for position */} 
                </th>
                <th>
                    Name
                </th>
                <th>
                    Popularity
                </th>
            </tr>
        </thead>
        <tbody>
            <TableBody album={props.album}/>
        </tbody>
    </table>
  )
}

export default Table;

