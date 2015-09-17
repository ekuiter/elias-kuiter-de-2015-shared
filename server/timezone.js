Timezone = {
  getHour: function(date, timezone) {
    date = date || new Date();
    timezone = timezone || "Europe/Berlin";
    return moment(date).tz(timezone).format("H");
  }
};