import React from 'react';


const TableRow = ({position, name, popularity}) => {
    
  return (
    <tr>
        <td className='uk-text-left'>
            {position}
        </td>
        <td className='uk-text-left'>
            {name}
        </td>
        <td>
            {popularity}
        </td>
    </tr>
  )
}

export default TableRow;