import firebase from 'firebase';
import axios from "axios";

var app = firebase.initializeApp({
  apiKey: "AIzaSyDLKjsf_jQdapTSYIcwcynUFhHLpedhnbw",
  authDomain: "moviestoreisd-ace06.firebaseapp.com",
  databaseURL: "https://moviestoreisd-ace06.firebaseio.com",
  projectId: "moviestoreisd-ace06",
  storageBucket: "moviestoreisd-ace06.appspot.com",
  messagingSenderId: "973688109346"
});

var MS = {};

MS.db = app.database();

MS.newUser = (fname,lname, email, age, password, isAdmin) => {
  return {
    First_name: fname,
    Last_name: lname,
    Email: email,
    Age: age,
    Password: password,
    isAdmin: isAdmin,
    ShippingInfo:{
      address: "",
      postCode: "",
      city: ""
    },
    PaymentDetails: {
      cardNumber: "",
      exp: "",
      cvc: ""
    },
    Login: "",
    Logout: "",
    Orders: []
  }
};

MS.addUser = (fname,lname, email, age, balance, password, isAdmin) => {
  var user = MS.newUser(fname,lname, email, age, balance, password, isAdmin);
  MS.db.ref('Users').push(user);
};

MS.getUsers = () => {
  return new Promise((resolve) => {
    var a = [];
    MS.db.ref('Users').once('value', (snap) => {
      snap.forEach(order => {
        var user = order.val();
        user.key = order.key;
          a.push(user);
      })
    });
    resolve(a);
  });
};

MS.newOrder = (userKey,shipping,payment, movies) => {
  var total = movies.reduce((total,amount) => total + parseInt(amount.Price),0);
  var d = new Date();
  return {
    userKey: userKey,
    totalPrice: total,
    shipping:shipping,
    payment:payment,
    time: d.toString(),
    movies: MS.transformMoviesArray(movies)
  }
};

MS.transformMoviesArray = (movies) => {
  var m = [].concat(movies);
  m.forEach(e => {
    e['key'] = e['.key'];
    delete e['.key'];
  });
  return MS.arrayToObj(m);
};

MS.arrayToObj = (array) => {
  var obj = {};
  for(var i=0;i<array.length;i++){
    obj[i] = array[i];
  }
  return obj;
};

MS.addOrder = (userKey,shipping,payment,movies) => {
  var newOrder = MS.newOrder(userKey,shipping,payment,movies);
  MS.db.ref('Orders').push(newOrder).then((snap) => {
    var key = snap.key;
    newOrder.key = key;
  });
  return newOrder;
};

MS.getOrders = (userKey) => {
  return new Promise((resolve) => {
    var a = [];
    MS.db.ref('Orders').once('value', (snap) => {
      snap.forEach(order => {
        var key = order.key;
        var o = order.val();
        o.key = key;
        if(o.userKey === userKey){
          a.push(o)
        }
      })
    });
    resolve(a);
  });
};

MS.addDefaultUsers = () => {
  MS.addUser("Hani","Rifai", "hani@rifai.net", 19, "123", true);
  MS.addUser("Naomi","Nehme", "test@rifai.net", 20,"123", false);
  MS.addUser("Mitch","Fitz", "hani@rifai.net", 21, "123", false);
};

MS.getDate = () => {
  let current_datetime = new Date();
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
  return formatted_date;
};

MS.log = (key,type) => {
  MS.db.ref('Users/'+key+'/'+type).once('value', (e) => {
    var current = e.val();
    var d = MS.getDate();
    var log = current+'' !== 'null' ? e.val()+','+d : d;
    MS.db.ref('Users/'+key+'/'+type).set(log);
  })
};

MS.login = (username,password) => {
  return new Promise((resolve => {
    MS.db.ref('Users').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var user = childSnapshot.val();
        user.key = childSnapshot.key;
        if(user.Email === username && user.Password === password){
          MS.log(user.key,'Login');
          resolve(user);
        }
      });
      resolve(-1);
    });
  }))
};

MS.getRefreshedActiveUser = (key) => {
  MS.db.ref('Users/'+key).once('value', (snap) => {
    return snap.val();
  })
};

MS.queryUser = (input,field) => {
  return new Promise((resolve => {
    MS.db.ref('Users').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var user = childSnapshot.val();
        user.key = childSnapshot.key;
        if(user[field] === input){
          resolve(user);
        }
      });
      resolve(-1);
    });
  }))
};

MS.newMovie = (id, name, year, ticketPrice, director, rating, description) => {

  var promise = new Promise(function(resolve, reject) {
    var movie = {
      Id: id,
      Name: name,
      Year: year,
      Price: ticketPrice,
      Director: director,
      Rating: rating,
      Poster: null,
      Description: description
    };

    axios.get("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + movie.Name)
      .then((response) => {
        movie.Poster = 'http://image.tmdb.org/t/p/w500/' + response.data.results[0].poster_path;
        resolve(movie);
      });

  });
  return promise;

};

MS.newMovieAPI = (name,ticketPrice) => {

  var promise = new Promise(function(resolve, reject) {
    var movie = {
      Name: name,
      Year: null,
      Price: ticketPrice,
      Director: null,
      Rating: null,
      Poster: null,
      Description: null
    };

    axios.get("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + movie.Name)
      .then((response) => {
        var movie_data = response.data.results[0];
        movie.Poster = 'http://image.tmdb.org/t/p/w500/' + response.data.results[0].poster_path;
        movie.Rating = Math.round(movie_data.vote_average/2);
        movie.Description = movie_data.overview;
        movie.Year = movie_data.release_date.split('-')[0];
        resolve(movie);
      });
  });

  return promise;
};


MS.addDefaultMovies = () => {
  ["Frozen","Ponyo","Inception","Transformers","Sherlock Holmes",
  "Dorian Gray","Faustus","Beach Rats", "Those People", "Riverdale",
  "Simpsons", "Volare", "Howl's Moving Castle", "Aladdin", "The Lego Movie"].forEach(name =>  MS.addMovieAPI(name, 10))

};

MS.addMovie = (id, name, year, ticketPrice, director, rating, description) => {
  MS.newMovieAPI(id, name, year, ticketPrice, director, rating, description).then( movie => {
    MS.db.ref('Movies').push(movie)
  });
};

MS.addMovieAPI = (movieName, price) => {
    MS.newMovieAPI(movieName, price).then( movie => {
      MS.db.ref('Movies').push(movie)
    })
};

MS.getMovies = () => {
  return new Promise((resolve) => {
    var a = [];
    MS.db.ref('Movies').on('value', (snap) => {
      snap.forEach(movie => {
        var mobj = movie.val();
        mobj.key = movie.key;
        a.push(mobj);
      })
    });
    resolve(a);
  });
};


export default MS;
