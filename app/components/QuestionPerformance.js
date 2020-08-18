import React from 'react'
import MainMenu from './MainMenu';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as actiontype from '../utils/action_types'
import { getQuestionPerformance } from '../utils/api';
import Loading from './Loading';

function questionPerformanceReducer(state, action) {
  if (action.type === actiontype.SUCCESS) {
      return {
          error: null,
          results: action.response
      }
  }
  else if (action.type === actiontype.FAILURE) {
      return {
          
      }
  }
  else if (action.type === actiontype.ERROR) {
      return {

      }
  }
}

export default function QuestionPerformance() {

  const [state, dispatch] = React.useReducer(
      questionPerformanceReducer,
      {error: null}
  )
  React.useEffect(() => {
    getQuestionPerformance()
          .then((response) => {
              dispatch({ type: actiontype.SUCCESS, state, response })
          })
          .catch((err) => dispatch({ type: actiontype.ERROR, err }));
  }, [])

    const columns = [{
        dataField: 'topicName',
        text: 'Topic',
        filter: textFilter()
      },
      {
        dataField: 'questionText',
        text: 'Question',
        filter: textFilter()
      }, 
      {
        dataField: 'correctAttempts',
        text: 'Correct Attempts',
      },
      {
        dataField: 'incorrectAttempts',
        text: 'Incorrect Attempts',
      },
    ];
      
      
    return (
        <div>
            <MainMenu />
            <hr/>
            {state.results
              ? 
                <BootstrapTable 
                  keyField='id' 
                  data={ state.results } 
                  columns={ columns } 
                  filter={ filterFactory() } 
                  striped  
                />
              : <Loading text="Confetchulating your result-o-tron" />}
           
        </div>
    );

}