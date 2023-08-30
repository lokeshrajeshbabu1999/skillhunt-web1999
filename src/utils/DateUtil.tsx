import moment from 'moment';

export function toDisplayDate(sourceDate: moment.MomentInput) {
  return moment(sourceDate, 'DD-MM-YYYY').format('ll');
}

export function dbToUIDate(inputDateStr: string) {
  // shLogger.debug("Convert into friendly date for " + inputDateStr);
  return moment(inputDateStr, 'YYYY/MM/DD').format('ll');
}

export function toDay(dayValue: number) {
  // shLogger.debug("Convert dayValue to day for " + dayValue);
  return moment().day(dayValue).format('dddd');
}
