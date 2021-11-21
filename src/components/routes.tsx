import * as React from 'react';
import { Route } from 'react-router-dom';
import { List } from "./view/crudlist";
import { Add } from "./view/crudAdd";
import { Edit } from './view/crudEdit';


export const RoutesIndex = () => {
    return (
        <div>
            <Route path="list" element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
        </div>
    )
}