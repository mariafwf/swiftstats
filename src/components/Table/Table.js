import React from 'react';
import TableBody from './TableBody';
import TableTitle from './TableTitle';

const Table = ({ album, props }) => {

  return (  
    <>
    <TableTitle>

    </TableTitle>
    <table className='uk-table uk-table-hover uk-table-divider'>
        <thead>
            <tr>
                <th> {/* blank th for position */} </th>
                <th> Name </th>
                <th> Popularity </th>
            </tr>
        </thead>
        <tbody>
            <TableBody album={album}/>
        </tbody>
    </table>
    </>
  )
}

export default Table;

