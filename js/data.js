var ReadingTopic = [];

ReadingTopic[0] = { title: "Computer Networks" };
ReadingTopic[1] = { title: "Numpy Module" };
ReadingTopic[2] = { title: "Bayesian Statistics" };

var Reading = $(".reading-list");

for (var x in ReadingTopic){
  var html = '<div>'+ReadingTopic[x].title+'</div>' ;
  Reading.append(html);
}

var achievement = [];
var publication = [];
var talks = [];

achievement[0] = { title: "Fit in Deutsch 2", org:"Goethe Institut", year:"2017"};

publication[0] = { title: "What works better Gandhigiri or Dadagiri?", org:"The Indian Express", year:"2009"};

talks[0] = { title: "Building Better Villages", org:"IIITD", year:"2016"};
talks[1] = { title: "Women in Computing Panel Discussion", org:"PyDelhi Conf", year:"2017"};
talks[2] = { title: "Exploring Numpy", org:"PyDelhi", year:"2017"};

var achieve = $(".achieve");
var publi = $(".publi");
var talk = $(".talk");

for (var x in achievement){
  var html = ''+achievement[x].title+' | '+achievement[x].org+' | '+achievement[x].year+'<br>';
  achieve.append(html);
}

for (var x in publication){
  var html = ''+publication[x].title+' | '+publication[x].org+' | '+publication[x].year+'<br>';
  publi.append(html);
}

for (var x in talks){
  var html = ''+talks[x].title+' | '+talks[x].org+' | '+talks[x].year+'<br>';
  talk.append(html);
}
