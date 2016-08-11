/**
 * 日期转换
 * @dateString yyyy-mm-dd
 */
function parseDate(dateString) {
   return new Date(Date.parse(dateString.replace("-","/")));
}