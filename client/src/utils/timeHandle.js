import moment from "moment";



export default {
    // Format dates
    formatTime: function(timeString) {
        let momentTime = moment(timeString, moment.ISO_8601);
        return momentTime.format("DD-MM-YYYY")
    },


    numDays: function(start, end) {
        let momentStart = moment(start, moment.ISO_8601);
        let momentEnd = moment(end, moment.ISO_8601);
        return (momentEnd.diff(momentStart, 'days')+1)
    },



  };

