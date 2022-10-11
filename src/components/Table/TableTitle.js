import React from 'react';


const TableTitle = ({ name, font, color, size }) => {

    const styleTitle = {
        fontSize: size,
        fontFamily: font,
        color: color,
    }

  return (
    <div className='title' style={styleTitle}>
        {name}
    </div>
  )
}

export default TableTitle;