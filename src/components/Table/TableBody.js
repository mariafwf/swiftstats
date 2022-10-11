import React from 'react';
import albumsJSON from "/../backend/albums-stats.json";
import TableRow from './TableRow';

const TableBody = ({album}) => {

    let position = 1;

    for (let song in albumsJSON.album) {
        return (
            <tr>
                <td>
                    {position}
                </td>
                <td>
                    {position}
                </td>
            </tr>
       )   
    }
}

export default TableBody;
