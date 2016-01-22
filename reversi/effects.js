var TimerIDSet = {};
SetLoopTimeout = function(key, func, baseＮum, randNum){
  clearTimeout(TimerIDSet[key]);
  var loop = function(){
    var randtime = Math.round(Math.random() * randNum) + baseＮum;
    TimerIDSet[key] = setTimeout(function(){
      func();
      loop();  
    }, randtime);
  };
  loop();
};
var BlinkEffectHash = {};
BlinkEffect = function(selector, inTim, outTim, waitTim){
  inTim   = inTim   || 500;
  outTim  = outTim  || 500;
  waitTim = waitTim || 200;
  var loopTim = inTim + outTim + waitTim;
  var func = function(){
    $(selector).fadeIn(outTim, function(){
      $(selector).fadeOut(inTim);
    });
  };
  clearInterval(BlinkEffectHash[selector]);
  BlinkEffectHash[selector] = setInterval(func , loopTim);
  func();
  return BlinkEffectHash[selector];
};

