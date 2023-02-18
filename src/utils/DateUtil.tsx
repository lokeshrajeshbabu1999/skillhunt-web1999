import moment from 'moment';

export function toDisplayDate(sourceDate: moment.MomentInput) {
  return moment(sourceDate, 'DD-MM-YYYY').format('ll');
}
