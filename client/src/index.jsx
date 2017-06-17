import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    let that = this;

    debugger;
    let url = '/repos/import',
      dataType = 'json',
      contentType = 'application/json';
    $.ajax({
      method: 'post',
      dataType: dataType,
      contentType: contentType,
      url: url,
      data: JSON.stringify({username: term}),
      success: function(data) {
        console.log('response from database');
        $.ajax({
          url: '/repos',
          dataType: dataType,
          success: function(data) {
            that.setState({repos: data});
          }
        });
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));