import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refSearch } from '../actions/ApiActions';
import ErrorModal from '../components/ErrorModal';
import SearchRefResultsTable from '../components/SearchRefResultsTable';
import DownloadButton from '../components/DownloadButton';
import { queryGenerator } from '../utils/helperMethods';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Select from 'react-select';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import 'react-select/dist/react-select.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      results: [],
      query: [],
      period: "201708",
      filter: ["entref,ent_name,ent_postcode"],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // The Redux action for the api request will set the errorMessage in the
    // store if the response is 4xx/5xx etc. Show this errorMessage in a modal,
    // props update on keypress so only show error if it has just appeared.
    if (nextProps.data.errorMessage !== '' &&
        nextProps.data.errorMessage !== this.props.data.errorMessage) {
      this.setState({
        show: true,
        errorMessage: nextProps.data.errorMessage,
        results: [],
        query: [],
        period: "201708",
      });
    } else {
      this.setState({ results: nextProps.data.results });
      this.setState({ query: nextProps.data.query });
      this.setState({ period: nextProps.data.period });
    }
  }
  componentWillUpdate() {
    const test = document.getElementsByClassName('Select-value-icon')
    for (let i = 0; i <= test.length; i++) {
      if (test[i] !== undefined){
        test[i].setAttribute('aria-hidden','false');
      }
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const period = this.state.period;
    const filterList = this.state.filter;
    const query = queryGenerator(this.refs);
    this.props.dispatch(refSearch(query,filterList,period))
  }
  handleChange(filter) {
    const test = document.getElementsByClassName('Select-value-icon')
    let filterList = ['entref','ent_name','ent_postcode']
    for (var i in filter) {
      filterList.push(filter[i].value)
    }
    this.setState({ filter: filterList})
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  dropdownChange(period) {
    this.setState({period : period})
  }
  render() {
    const items = [
      { name: 'Frame Creation', link: '' },
    ];
    const listItems = [
      {value:'PAYE_jobs', label:"Paye Jobs"},
      {value:'employees', label:"Employees"},
      {value:'standard_vat_turnover', label:"Standard Vat Turnover"},
      {value:'contained_rep_vat_turnover', label:"Contained Rep Vat Turnover"}
    ]
    const results = (<SearchRefResultsTable results={this.props.data.results} period={this.props.data.period} query={this.props.data.query} props={this.props}/>);
    const enterprises = (this.props.data.results != 0) ? results : <div></div>;
    const downloadButton = (<DownloadButton results={this.props.data.results} period={this.props.data.period} query={this.props.data.query} props={this.props}/>);
    const Download = (this.props.data.results != 0) ? downloadButton : <div></div>;
    return (
      <div>
        <BreadCrumb
          breadCrumbItems={[
            { name: 'Home', link: '/Home' },
            { name: 'Frame Creation', link: '/FrameCreation' },
          ]}
        />
        <TitleAndDescription
          title="Frame Creation"
          description="Search the Statistical Business Register to produce a frame"
          marginBottom="1"
        />
        <div className="page-intro background--gallery">
          <div className="wrapper">
            <form onSubmit={this.onSubmit}>
              <div className="col-wrap">
              <div>
              <label className="search__label col margin-left-md--1 col--md-5 col--lg-11" htmlFor="nav-search">Reference period</label>
              <Dropdown color="primary" label={this.state.period}>
                <DropdownItem onClick={() => this.dropdownChange("201708")}>August (2017/08)</DropdownItem>
                <DropdownItem onClick={() => this.dropdownChange("201706")}>June (2017/06)</DropdownItem>
              </Dropdown>
              </div><br/>
              <div className="col--md-40 col--lg-20 margin-left-md--1">
                <Select
                  className="col--lg-30"
                  multi={true}
                  options={listItems}
                  value={this.state.filter}
                  onChange={this.handleChange}
                  closeOnSelect={false}
                  searchable={false}
                />
              </div><br />
              <div className="col--md-40 col--lg-20 margin-left-md--1">
                <input ref="legalStatus" placeholder="Enter legal status" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
              </div>
              <div className="col col--md-40 col--lg-20 margin-left-md--1">
                <input ref="sic" placeholder="Enter SIC (min)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
                <input ref="employee" placeholder="Enter employee (min)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
                <input ref="turnover" placeholder="Enter turnover (min)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
              </div>
              <div className="col col--md-40 col--lg-20 margin-left-md--1">
                <input ref="sicMax" placeholder="Enter SIC (max)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
                <input ref="employeeMax" placeholder="Enter employee (max)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
                <input ref="turnoverMax" placeholder="Enter turnover (max)" type="search" autoComplete="on" className="search__input col col--md-21 col--lg-17" id="nav-search" /><br /><br /><br />
              </div>
            </div>
            <button onClick={!this.props.currentlySending ? this.props.onSubmit : null} type="submit" className="btn btn--primary" id="nav-search-submit">Create Frame</button>
            {Download}
            </form>
            <ErrorModal
              show={this.state.show}
              message={this.state.errorMessage}
              close={this.closeModal}
            />
            <br />
            {enterprises}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(Search);
