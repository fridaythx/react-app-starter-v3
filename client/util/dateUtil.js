import moment from 'moment';

const PATTERN_YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss';

const format = (date, pattern = PATTERN_YYYY_MM_DD_HH_MM_SS) =>
  moment(date).format(pattern);

const parse = o => moment(o).toDate();

export default { format, parse };
