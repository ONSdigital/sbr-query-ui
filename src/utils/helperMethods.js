// @flow

export function countStatus(history: Array<{}>, status: number) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode === status).length;
}

export function queryGenerator(r){
  const value = {
    'SIC':r.sic.value,
    'Employees':r.employee.value,
    'contained_rep_vat_turnover':r.turnover.value,
    'LegalStatus':r.legalStatus.value
 };
  const valueMax = {
   'SIC':r.sicMax.value,
   'Employees':r.employeeMax.value,
   'contained_rep_vat_turnover':r.turnoverMax.value
 }
 let concat = [];
  for (let i in value) {
    if (notEmpty(value[i])) {
      if (notEmpty(valueMax[i])) {
        value[i] = convertDecimal(value[i])
        valueMax[i] = convertDecimal(valueMax[i])
        concat.push(`${i} between ${value[i]} AND ${valueMax[i]}`)
      } else {
        concat.push(`${i}=${value[i]}`)
      }
    }
  }
  const query = concat.join(' AND ')
  return query;
}

function notEmpty(string){
  if (string === "" || string === undefined){
    return false;
  }
  return true;
}

export function convertDecimal(string){
  if (!string.includes(".")){
    string+=".00"
  }
  return string
}

export function countStatusBetween(history: Array<{}>, status: object) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}

export function lessThanFive(results) {return (results.length < 5) ? results.length : 5;}
