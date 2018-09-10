var UtilityHelper = {
    getStartEndDateByWeek: function (req) {
        const year = req.query.year ? req.query.year : '2018';
        const week = req.query.week ? req.query.week : 1;
        var d = new Date("Jan 01, " + year + " 01:00:00");
        var w = d.getTime() + 604800000 * (week - 1);
        console.log(new Date(w).toISOString());
        console.log(new Date(w + 518400000).toISOString());

        return {
            startDate: new Date(w).toISOString(),
            endDate: new Date(w + 518400000).toISOString()
        };
    }
};

module.exports = UtilityHelper;