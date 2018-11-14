var about = [];
var education = [];
var organisation = [];
var communities = [];
var ComputingExp = [];
var DesignExp = [];
var Project = [];

about[1] = {
  para: "<br>My work is passion driven. I believe in creating quirky and innovative solutions, not specific to any medium. My approach is collaboration and ensuring client's satisfaction. My work potrays my client."
}
about[0] = {
  para: "I’m a multi-disciplinary freelance graphic designer and front end developer. I deliver creative and engaging solutions across brand identity, print and digital media."
}

education[0] = {
  org: "Amity University",
  spec: "Bachelors in Technology (UG)",
  duration: "2016-20",
}

organisation[0] = {
  org: "PyCon India 2017",
  spec: "Graphic Designer (Volunteer)",
  duration: "2017",
}
organisation[1] = {
  org: "PyDelhi Conference 2017",
  spec: "Graphic Designer (Volunteer)",
  duration: "2017",
}

communities[0] = {
  org: "Aset ALiAS<br>I help run my university's tech club given my love for all things tech and educationction <br> <br>"
}
communities[1] = { org: "ILUG-D" }
communities[2] = { org: "LinuxChix India" }
communities[3] = { org: "PyDelhi <br>" }

designskill=[ "branding | logo | web design | typography | UI | graphic"];

ComputingExp[0] = { head: "Operating Systems", content: "GNU/LINUX, Windows" };
ComputingExp[1] = { head: "Programming Languages", content: "C, C++" };
ComputingExp[2] = { head: "Scripting Languages", content: "Python, Bash" };
ComputingExp[3] = { head: "Internet Technologies", content: "HTML, CSS, JS" };
ComputingExp[4] = { head: "DBMS", content: "MySQL" };
ComputingExp[5] = { head: "Programming Env", content: "Nano, Vi" };

DesignExp[0] = { head: "Photo Editor", content: "Photoshop, GIMP" };
DesignExp[1] = { head: "Vector-based Editor", content: "Illustrator, Inkscape" };
DesignExp[2] = { head: "Layout Editor", content: "InDesign, CorelDraw" };
DesignExp[3] = { head: "Internet Technologies", content: "HTML, CSS, JS" };
DesignExp[4] = { head: "Print Technologies", content: "Latex" };

/*Project[0] = { title:"", url:""; language:""; about:""; type:""; contribution:""; comembers:""}; */
Project[0] = {
  title:"Research Proposal for Building Better Villages at IIITD",
  url:"",
  duration:"Jun 2016 - Aug 2016",
  type:"Competition",
};
Project[1] = {
  title:"Metro Ticketing System (C++)",
  url:"",
  duration:"Jan 2016 - Mar 2016",
  type:"High School Final Project",
};
Project[2] = {
  title:"Mr Wizard Game (MiT Scratch)",
  url:"",
  duration:"5 hr",
  type:"CS50 Assignment",
};

var background = $(".background");
var slide3 = $(".slide3");
var ab = $(".ab");

var html = '<p><div class="service-content">'+about[0].para+'<br>'+about[1].para+'</div></p>';
for (var x in designskill){
    html += '<p><div class="service-content">'+designskill[x]+'</div></p>';
ab.append(html);
}


var html = '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">education</h4><hr class="no-left">';
for (var x in education){
    html += '<h5 class="content">'+education[x].org+'</h5><h6>'+education[x].spec+'</h6><p>'+education[x].duration+'<br></div></p>';
}

html += '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">organisation</h4><hr class="no-left">';
for (var x in organisation){
    html += '<h5 class="content">'+organisation[x].org+'</h5><h6>'+organisation[x].spec+'</h6><p>'+organisation[x].duration+'<br></div></p>';
}

html += '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">communities</h4><hr class="no-left">';
for (var x in communities){
    html += '<p><div class="content">'+communities[x].org+'</div></p>';
}

html += '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">general computing exp</h4><hr class="no-left">';
for (var x in ComputingExp){
    html += '<p><div class="service-content"><div class="row line"><div class="col-sm-6"><h6>'+ComputingExp[x].head+'</h6></div>';
    html += '<div class="col-sm-6">'+ComputingExp[x].content+'</div></div></div></p>';
}

html += '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">general design exp</h4><hr class="no-left">';
for (var x in DesignExp){
    html += '<p><div class="service-content"><div class="row line"><div class="col-sm-6"><h6>'+DesignExp[x].head+'</h6></div>';
    html += '<div class="col-sm-6">'+DesignExp[x].content+'</div></div></div></p>';
}

html += '</div></div><div class="col-md-3 col-sm-6"><div class="service-item">';
html += '<h4 class="heading top-pad-50">projects</h4><hr class="no-left">';
for (var x in Project){
    html += '<p><div class="content"><h5>'+Project[x].title+'</h5><h6>'+Project[x].duration+'</h6>'+Project[x].type+'<br><br></div></p>';
}

html += '</div></div>';
background.append(html);
