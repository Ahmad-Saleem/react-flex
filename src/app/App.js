import React, { Component } from 'react';
import FlexContainer from './components/layout/FlexContainer';
import FlexItem from './components/layout/FlexItem';
import '../style/index.scss';

// customized styles 
import './app.scss';

class App extends Component {
  render() {
    return (
      <main>
          <FlexContainer>
            <FlexItem order={1} basis='50%' tablet='100%' mobile='100%' align='center'> 1  </FlexItem>
            <FlexItem order={2} basis='30%' tablet='50%' mobile='100%' align='flex-start'> 2 </FlexItem>
            <FlexItem order={3} basis='20%' tablet='50%' mobile='100%' align='flex-end'> 3 </FlexItem>
          </FlexContainer>
      </main>
    );
  }
}

export default App;