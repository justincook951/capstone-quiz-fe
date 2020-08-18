import React from 'react'
import MainMenu from './MainMenu';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export default function QuestionPerformance() {

    const products = [
        {
            'topicName': 'Ayy what',
            'questionText': 'What would you like to do??',
            'correctAttempts': 123,
            'incorrectAttempts': 555
        },
        {
          'topicName': 'Ayy what',
          'questionText': 'Somethin else here',
          'correctAttempts': 3,
          'incorrectAttempts': 6 
      },
      {
        'topicName': 'New Topic',
        'questionText': 'Haahahaha',
        'correctAttempts': 0,
        'incorrectAttempts': 50000 
    }
    ]

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
            <p>Question Performance</p>
            <BootstrapTable 
                keyField='id' 
                data={ products } 
                columns={ columns } 
                filter={ filterFactory() } 
                striped  
                />
        </div>
    );

}