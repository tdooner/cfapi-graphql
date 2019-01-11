import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import AppLayout from '../components/AppLayout';
import GridBox from '../components/CFA/GridBox';
import Slab from '../components/CFA/Slab';

class HomePage extends Component {
  render() {
    return (
      <AppLayout>
        <Slab>
          <GridBox>
            <p>Home Page</p>

            <p><Link to='/brigades'>View Brigade List</Link></p>
          </GridBox>
        </Slab>
      </AppLayout>
    );
  }
}

export default HomePage;
