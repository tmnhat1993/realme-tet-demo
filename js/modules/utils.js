let reachSection = ($target = null) => {
  if($target.offset().top > 0){
    if( window.pageYOffset > $target.offset().top - window.innerHeight / 1.5 &&
      window.pageYOffset < $target.offset().top + window.innerHeight / 2){
      return true;
    } else {
      return false;
    }
  }
  return false;
}

// Custom Event Listener
function pageListener() {
  this.events = {};
}

pageListener.prototype.on = function(eventType, listener) {
  // If the eventType Property not exist yet, create an empty aray of that property
  this.events[eventType] = this.events[eventType] || [];
  this.events[eventType].push(listener);
};

pageListener.prototype.emit = function(eventType) {
  // Loop through the events[eventType] array of function and invoke each of them
  if(this.events[eventType]){
    this.events[eventType].forEach( function(item) {
      item();
    });
  }
}


export { reachSection, pageListener };