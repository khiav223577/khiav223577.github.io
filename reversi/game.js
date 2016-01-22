var _HTMLElementPrototype;
if (typeof(HTMLElement)  != "undefined" ) _HTMLElementPrototype = HTMLElement.prototype;
else if (typeof(Element) != "undefined" ) _HTMLElementPrototype = Element.prototype;
else if (typeof(Object)  != "undefined" ) _HTMLElementPrototype = Object.prototype;
_HTMLElementPrototype.setValue = function(value){
  if (this.value != undefined) this.value = value;
  if (this.innerHTML != undefined) this.innerHTML = value;
};
_HTMLElementPrototype.setTextInForm = function(name,text){
  this.elements[name].parentNode.innerHTML = text + "<input type='hidden' name='" + name + "'>";
};

function KeyBoardManager(mapping, callback){
  var thisObj = this;
  this.targetIsInput = function(event){
    return event.target.tagName.toLowerCase() === "input";
  };
  var listener = function(event){
    var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    var mapped    = mapping[event.which];
    if (thisObj.targetIsInput(event)) return; // Ignore the event if it's happening in a text field
    if (!modifiers && mapped !== undefined){
      event.preventDefault();
      callback(mapped);
    }
  };
  this.destroy = function(){ document.removeEventListener("keydown", listener);};
  document.addEventListener("keydown", listener);
}
function rand(len){ return Math.floor(Math.random() *len);}

//-----------------------------------------
//  Timer
//-----------------------------------------
function Timer(){ 
}
Timer.prototype.start = function(){
  this.count = new Date();
};
Timer.prototype.stop = function(){
  return new Date() - this.count;
};
//-----------------------------------------
//  SE
//-----------------------------------------
function se_play(se){
  if (se.length) se = se[rand(se.length)];
  new Audio(se).play();
}

function Point(x, y){
　　this.x = x;
　　this.y = y;
}
function real_xy(obj) {
  if (obj != null){
    var currPos = new Point(obj.offsetLeft,obj.offsetTop);
    //alert(obj.offsetLeft)
    var workPos = new Point(0,0);
    if (obj.offsetParent.tagName != "BODY"){
      workPos = real_xy(obj.offsetParent);
      currPos.x += workPos.x;
      currPos.y += workPos.y;
    }
  }
  return currPos;
}
function FB_utility(){
  this.user_picture = function(uid, width, height){
    var url = "https://graph.facebook.com/" + uid + "/picture?type=normal"
    if (width)  url += "&width="  + width;
    if (height) url += "&height=" + height;
    return url
  };
  this.user_profile = function(uid){
    return 'https://www.facebook.com/' + uid;
  };
}

var fb_util = new FB_utility();

jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            this.disabled = state;
        });
    }
});

function appendRecord(table, idx, uid, current_user_id, record1, record2, record3, record4, time){
  table.append($('' + 
    (current_user_id == uid ? '<tr class="record_tr_is_user">' : '<tr>') + 
      '<td>' + (idx + 1) + '</td>' +
      '<td><a href=' + fb_util.user_profile(uid) + ' target="_blank"><img width="100" height="100" src=' + fb_util.user_picture(uid,100, 100) + '></a></td>' + 
      '<td>' + record1 + '</td>' +
      '<td>' + record2 + '</td>' +
      '<td>' + record3 + '</td>' +
      '<td>' + record4 + '</td>' +
      '<td>' + time + '</td>' +
    '</tr>'
  ));
}
function sys_post(url, data){
  if (!data) data = {};
  $.ajax({
    type: "POST",
    async: false,
    url: url,
    dataType: 'script',
    data: data
  });
}


