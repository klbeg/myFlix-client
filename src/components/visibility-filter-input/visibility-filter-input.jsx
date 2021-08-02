import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  console.log('visibilityFilterInput: ', props);
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Filter Movies"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
