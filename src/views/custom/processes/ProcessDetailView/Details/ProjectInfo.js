import React from 'react';
import PropTypes from 'prop-types';
import {
  Card
} from '@material-ui/core';
import BasicTable from './BasicTable';


// Project Sponsor: John Doe

// Process Owner: Owner name

// Process Owner Email: email@owneremail.com

// Process SME: Expert Name

// Process SME Email: sme@email.com

// Assigned Team: RPA Team 1


// const NEWS = [...Array(5)].map((item, index) => {
//   const setIndex = index + 1;
//   return {
//     title: 'Project Sponsor',
//     description: 'John Doe',
//     image: getImgCover(128, setIndex),
//     postedAt: faker.date.soon()
//   };
// });


ProjectInfo.propTypes = {
  className: PropTypes.string
};

export default function ProjectInfo({ className, ...other }) {

  return (
    <Card>
      <BasicTable />
    </Card>
  );
}