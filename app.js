var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon');
var mongodb = require('mongodb');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

module.exports = app;

app.get('/',function(req,res){
	res.sendfile(path.join(__dirname+'/content/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/results',function(req,res){
  res.redirect("/");
  // var MongoClient = mongodb.MongoClient;
  // var url = 'mongodb://localhost:27017/the-gap-db1'
  // MongoClient.connect(url,function(err,db){
  //   if(err){
  //     console.log("unable to connect to server");
  //   }
  //   else{
  //     console.log("Connection Established");
  //     var collection= db.collection('formSubmissions');

  //     collection.find({}).toArray(function(err,result){
  //       if (err){
  //         res.send(err);
  //       }
  //       else if(result.length){
  //         res.render('results',{"forms":result});
  //       }
  //       else{
  //         res.send("no documents found");
  //       }
  //       db.close();
  //     })
  //   }
  // })
});

app.get('/submit',function(req,res){
  res.sendfile(path.join(__dirname+'/content/newResponse.html'));
});

app.post('/submitComplete',function(req,res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/the-gap-db1'
  MongoClient.connect(url, function(err,db){
    if (err){
      alert("Unable to connect to server");
    }
    else{
      console.log("Connected to server");
      var collection =  db.collection('formSubmissions');
      var s = req.body
      var response = {title:s.title,content:s.content};
      console.log(response);
      collection.insert([response],function(err,result){
        if (err){
          console.log(err);
        }
        else{
          res.redirect("results");
        }
      });
    }
  });
});


//REST OF THE PAGES

  // SYSTEM
  app.get('/system/intro',function(req,res){
    res.sendfile(path.join(__dirname+'/content/system/intro.html'))
  })
  app.get('/system/districting',function(req,res){
    res.sendfile(path.join(__dirname+'/content/system/districting.html'))
  })
  app.get('/system/caseStudy',function(req,res){
    res.sendfile(path.join(__dirname+'/content/system/caseStudy.html'))
  })
  // BIAS
  app.get('/bias/intro',function(req,res){
    res.sendfile(path.join(__dirname+'/content/bias/intro.html'))
  })
  app.get('/bias/preschool',function(req,res){
    res.sendfile(path.join(__dirname+'/content/bias/preschool.html'))
  })
  app.get('/bias/falter',function(req,res){
    res.sendfile(path.join(__dirname+'/content/bias/falter.html'))
  })
  //CHOICE
  app.get('/choice/intro',function(req,res){
    res.sendfile(path.join(__dirname+'/content/choice/intro.html'))
  })
  app.get('/choice/dreams',function(req,res){
    res.sendfile(path.join(__dirname+'/content/choice/dreams.html'))
  })
  app.get('/choice/privatepublic',function(req,res){
    res.sendfile(path.join(__dirname+'/content/choice/privatepublic.html'))
  })

///////////
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function() {
  console.log(`Listening at ${PORT}`);
});
