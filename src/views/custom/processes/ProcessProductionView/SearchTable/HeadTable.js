import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------



function HeadTable({
  order,
  classes,
  orderBy,
  headLabel,
  onRequestSort,
}) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell, i) => (
          <TableCell
            key={`${headCell.id}${i}`}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.sortSpan}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default HeadTable;
