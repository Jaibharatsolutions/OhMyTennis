function formatDate(date) {
  date = moment(date).toDate();
  var monthNames = [
    "January",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var trans = monthNames[monthIndex];
  return day + "-" + trans;
}

module.exports = {
  formatDate
};
