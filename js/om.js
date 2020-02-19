var tot = 0;

function get_count() {
  var omc = [];

  var con = firebase.database();
  con
    .ref("real_time_student_monitoring")
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //console.log(childSnapshot.key);
        omc.push(childSnapshot.key);
        //console.log(childSnapshot.val()["id"]);
      });
      tot = omc.length;
      console.log(tot);
    });

  console.log(tot);
  return tot;
}

Highcharts.chart("container", {
  chart: {
    type: "spline",
    animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    events: {
      load: function() {
        // set up the updating of the chart each second
        var series = this.series[0];
        setInterval(function() {
          var x = new Date().getTime(), // current time
            y = get_count();
          series.addPoint([x, y], true, true);
        }, 1000);
      }
    }
  },

  time: {
    useUTC: false
  },

  title: {
    text: "Live Student Count"
  },

  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: 15000,
      announcementFormatter: function(allSeries, newSeries, newPoint) {
        if (newPoint) {
          return "New point added. Value: " + newPoint.y;
        }
        return false;
      }
    }
  },

  xAxis: {
    type: "datetime",
    tickPixelInterval: 150
  },

  yAxis: {
    title: {
      text: "Number of Students"
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#808080"
      }
    ]
  },

  tooltip: {
    headerFormat: "<b>{series.name}</b><br/>",
    pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
  },

  legend: {
    enabled: false
  },

  exporting: {
    enabled: false
  },

  series: [
    {
      name: "Student Count",
      data: (function() {
        // generate an array of random data
        var data = [],
          time = new Date().getTime(),
          i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: get_count()
          });
        }
        return data;
      })()
    }
  ]
});
