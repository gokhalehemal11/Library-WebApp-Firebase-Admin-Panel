var tot = 0;

function get_count() {
  var omc = [];
  var omc_ids = [];
  var sids = document.getElementById("sids");

  var con = firebase.database();
  con
    .ref("real_time_student_monitoring")
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //console.log(childSnapshot.key);
        omc.push(childSnapshot.key);
        omc_ids.push(childSnapshot.val()["id"]);
        //console.log(childSnapshot.val()["id"]);
        sids.innerHTML = "<ul><li>" + omc_ids.join("</li><li>");
        +"</li></ul>";
      });
      tot = omc.length;
      //console.log(tot);
    });

  //console.log(tot);
  return tot;
}

function get_student_data_from_day_and_time() {
  //console.log("hi there");

  var mytime = document.getElementById("myTime").value;
  var mydate = document.getElementById("myDate").value;
  var stud_ids = [];
  //console.log(mytime);
  //console.log(mydate);

  var con = firebase.database();
  con
    .ref("entry_exit_data")
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //console.log(childSnapshot.val()["day"]);
        //console.log(childSnapshot.val()["id"]);
        //console.log(childSnapshot.val()["in_time"]);
        //console.log(childSnapshot.val()["out_time"]);
        if (mydate == childSnapshot.val()["day"]) {
          if (mytime.toString() == "7 AM - 10 AM") {
            if (
              childSnapshot.val()["in_time"] >= "07:00:00" &&
              childSnapshot.val()["in_time"] < "10:00:00"
            ) {
              stud_ids.push(childSnapshot.val()["id"]);
            }
          } else if (mytime.toString() == "10 AM - 1 PM") {
            if (
              childSnapshot.val()["in_time"] >= "10:00:00" &&
              childSnapshot.val()["in_time"] < "13:00:00"
            ) {
              stud_ids.push(childSnapshot.val()["id"]);
            }
          } else if (mytime.toString() == "1 PM - 4 PM") {
            if (
              childSnapshot.val()["in_time"] >= "13:00:00" &&
              childSnapshot.val()["in_time"] < "16:00:00"
            ) {
              stud_ids.push(childSnapshot.val()["id"]);
            }
          } else if (mytime.toString() == "4 PM - 7 PM") {
            if (
              childSnapshot.val()["in_time"] >= "16:00:00" &&
              childSnapshot.val()["in_time"] < "19:00:00"
            ) {
              stud_ids.push(childSnapshot.val()["id"]);
            }
          } else if (mytime.toString() == "7 PM - 10 PM") {
            if (
              childSnapshot.val()["in_time"] >= "19:00:00" &&
              childSnapshot.val()["in_time"] < "22:00:00"
            ) {
              stud_ids.push(childSnapshot.val()["id"]);
            }
          }
        }
      });
    if(stud_ids.length > 0){
      alert(stud_ids);
    }
    else{
      alert("No Data Available");
    }
    });
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
