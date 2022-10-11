import React from 'react';
import albumsJSON from '/../backend/albums-stats.json';
import TableRow from './TableRow';

const TableBody = ({ album }) => {

    let position = 0;

    for (let song in albumsJSON.album) {
        position++;
        return (
            <TableRow position={position}
                      name={song["name"]}
                      popularity={song["popularity"]} />
       )   
    }
}

export default TableBody;
