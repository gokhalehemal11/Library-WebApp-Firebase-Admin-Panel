var data_authors = [];
var data_genre = [];
var s_authors = [];
var s_books = [];
var r_books = [];

var config = {
  apiKey: "AIzaSyC5KYHGWCDaEL3W1o-Uk3Jt4vJTTvBulk8",
  authDomain: "btapp-2a08c.firebaseapp.com",
  databaseURL: "https://btapp-2a08c.firebaseio.com",
  projectId: "btapp-2a08c",
  storageBucket: "btapp-2a08c.appspot.com",
  messagingSenderId: "202689453275"
};
firebase.initializeApp(config);

document.getElementById("addbook").addEventListener("submit", e => {
  e.preventDefault();

  var con = firebase.database().ref("books");

  var title = getId("book");
  if (title == "") {
    alert("Title Cannot be Empty or Cannot Contain (,),[,],',:,.,etc");
  } else {
    var userInfo = con.child(title);
    if (userInfo) {
      userInfo.set({
        //title: getId("book"),
        author: getId("author"),
        average_rating: getId("rating"),
        books_count: getId("count"),
        genre: getId("genre"),
        id: getId("rfid"),
        isbn: getId("isbn"),
        language_code: getId("lang"),
        publication_year: getId("year"),
        shelf: getId("shelf"),
        small_image_url:
          "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
      });

      alert("Added Successfully");
      console.log("sent");
      document.getElementById("addbook").reset();
    }
  }
});

function foo(arr) {
  var b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return b;
}

function disp_pie(list, nlist) {
  var ctx = document.getElementById("pie-chart").getContext("2d");

  document.getElementById("pie_req").style.display = "block";
  document.getElementById("full_admin").style.display = "none";

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",
    data: {
      labels: list,
      datasets: [
        {
          label: "Total Requests for Books (Count)",
          backgroundColor: "rgb(10, 255, 210)",
          data: nlist
        }
      ]
    },
    options: {}
  });
}

function disp_chart2(list, nlist) {
  var ctx = document.getElementById("myChart3").getContext("2d");
  //document.getElementById('dis_graph').style.display= "block";

  document.getElementById("container").style.display = "block";
  document.getElementById("full_admin").style.display = "none";

  //ctx.style.display= "block";
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: list,
      datasets: [
        {
          label: "Recently Searched Books",
          backgroundColor: "rgb(242, 117, 46)",
          borderColor: "rgb(242, 117, 46)",
          data: nlist
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

function disp_chart3(list, nlist) {
  var ctx = document.getElementById("myChart4").getContext("2d");
  //document.getElementById('dis_graph').style.display= "block";

  document.getElementById("container").style.display = "block";
  document.getElementById("full_admin").style.display = "none";

  //ctx.style.display= "block";
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: list,
      datasets: [
        {
          label: "Recently Searched Authors",
          backgroundColor: "rgb(196, 94, 219)",
          borderColor: "rgb(196, 94, 219)",
          data: nlist
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

function disp_chart(list, list2, nlist, nlist2) {
  var ctx = document.getElementById("myChart").getContext("2d");
  //document.getElementById('dis_graph').style.display= "block";

  var ctx2 = document.getElementById("myChart2").getContext("2d");

  document.getElementById("container").style.display = "block";
  document.getElementById("full_admin").style.display = "none";

  //ctx.style.display= "block";
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: list,
      datasets: [
        {
          label: "Top Read Authors",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: nlist
        }
      ]
    },

    // Configuration options go here
    options: {}
  });

  var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: list2,
      datasets: [
        {
          label: "Top Read Genre",
          backgroundColor: "rgb(66, 212, 244)",
          borderColor: "rgb(66, 212, 244)",
          data: nlist2
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

function requested() {
  firebase
    .database()
    .ref("requested")
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        this.r_books.push(childNodes.val());
      });

      console.log(foo(this.r_books));
      var u4 = Array.from(new Set(this.r_books));
      console.log(u4);
      disp_pie(u4, foo(this.r_books));
    });
}

function viusalize() {
  var con = firebase.database();
  con
    .ref("issued_books")
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(snapshot1) {
        //console.log(snapshot1.key);
        //console.log("hey 1");
        snapshot1.forEach(function(childSnapshot) {
          this.data_authors.push(childSnapshot.val()[1]);
          this.data_genre.push(childSnapshot.val()[2]);
          //console.log("hey 2");
        });
      });
      console.log(foo(this.data_authors));
      console.log(foo(this.data_genre));
      var u1 = Array.from(new Set(this.data_authors));
      var u2 = Array.from(new Set(this.data_genre));
      u1 = u1.filter(function(item) {
        return item !== "";
      });
      u2 = u2.filter(function(item) {
        return item !== "";
      });
      console.log(u1);
      console.log(u2);
      disp_chart(u1, u2, foo(this.data_authors), foo(this.data_genre));
      //console.log(this.data_genre);
      //disp_chart(this.data_genre);
    });

  firebase
    .database()
    .ref("searched_books")
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        this.s_books.push(childNodes.val());
      });

      console.log(foo(this.s_books));
      var u3 = Array.from(new Set(this.s_books));
      console.log(u3);
      disp_chart2(u3, foo(this.s_books));
    });

  firebase
    .database()
    .ref("Searched_authors")
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        this.s_authors.push(childNodes.val());
      });

      console.log(foo(this.s_authors));
      var u4 = Array.from(new Set(this.s_authors));
      console.log(u4);
      disp_chart3(u4, foo(this.s_authors));
    });
}

/*
function monitor() {
  var con = firebase.database();
  con
    .ref("real_time_student_monitoring")
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.key);
        console.log(childSnapshot.val()["id"]);
      });
    });

  setTimeout(function() {
    monitor();
  }, 2000);
}
*/
function getId(id) {
  return document.getElementById(id).value;
}
