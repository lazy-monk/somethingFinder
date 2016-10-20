import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as nameActions from '../../actions/nameActions';
import {browserHistory} from 'react-router';

class HomePage extends Component {

  constructor() {
    super();

    this.inputChange = this.inputChange.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    this.requestName = this.requestName.bind(this);
  }

  inputChange(e) {
    let input = e.target;
    this.setState({autocomplete: new google.maps.places.Autocomplete(input)});
  }

  submitAddress(e) {
    e.preventDefault();
    const {autocomplete} = this.state;
    const place = autocomplete.getPlace();
    if(place) {
      browserHistory.push("/results");
    }
  }

  requestName() {
    const {requestName} = this.props.nameActions;
    console.log('request name');
    requestName();
    console.log ('this.props.name:', this.props.name)
  }

  render() {
    return (
      <div className="home">
        <p className="text-center title">GYM FINDER</p>
        <div className="col-md-8 col-md-offset-2">
          <form
            onSubmit={this.submitAddress}>
              <input
                style={styles.searchBar}
                className="col-md-10"
                type="text"
                placeholder="Enter a location"
                onChange={this.inputChange} />
              <button
                style={styles.searchButton}
                className="btn btn-default col-md-2">
                <strong style={styles.buttonText}>Search</strong>
              </button>
          </form>

        </div>

      </div>
    );
  }
}

const styles = {
  searchBar: {
    height: 50,
    fontSize: 24
  },
  searchButton: {
    height: 50,
    background: '#90A4AE'
  },
  buttonText: {
    fontSize: 20
  }
};

function mapStateToProps(state, ownProps) {
  return {
    name: state.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    nameActions: bindActionCreators(nameActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
