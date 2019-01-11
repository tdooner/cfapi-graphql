import React, { Component } from 'react';

import { ListBrigadesComponent } from '../__generated__/types';
import AppLayout from '../components/AppLayout';
import GridBox from '../components/CFA/GridBox';
import Slab from '../components/CFA/Slab';

class HomePage extends Component{
  render() {
    return (
      <AppLayout>
        <Slab>
          <GridBox>
            <h1>Brigade List</h1>
          </GridBox>
        </Slab>

        <Slab>
          <GridBox>
            <ListBrigadesComponent>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return 'Error: ' + error;
                if (!data) {
                  return 'No brigades found!'
                }
                return data.listBrigades.map((brigade: any) => <div key={brigade.slug}>{brigade.name}</div>);
              }}
            </ListBrigadesComponent>
          </GridBox>
        </Slab>
      </AppLayout>
    );
  }
}

export default HomePage;
