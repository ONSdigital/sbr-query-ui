// @flow

const formatDate = require('../../server/formatDate.js');

const searchHistory = {
  /**
   * Gets version/lastUpdate info from the UI.
   * @param  {Function} callback Called with returned data.
   */
  addToHistory(data: {}) {
    let historyArr: Array<{}> = [];
    const startTime = formatDate(new Date());
    if (localStorage.length !== 0) {
      historyArr = JSON.parse(localStorage.getItem('searchHistory'));
    }
    historyArr.push({
      query: data.url,
      HTTPCode: data.status,
      timestamp: startTime,
    });
    localStorage.setItem('searchHistory', JSON.stringify(historyArr));
  },
  getSearchHistory() {
    if (localStorage.getItem('searchHistory')) {
      try {
        const history: Object = JSON.parse(localStorage.getItem('searchHistory'));
        return history;
      } catch (e) {
        console.log('Unable to retrieve search history.');
        return [];
      }
    } else {
      return [];
    }
  },
  clearSearchHistory() {
    localStorage.clear();
  },
};

export default searchHistory;
