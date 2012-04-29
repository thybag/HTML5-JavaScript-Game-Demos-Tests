if(window.addEventListener == undefined){
    

    HTMLDocument.prototype.addEventListener =
    Element.prototype.addEventListener =
    Window.prototype.addEventListener = function(event, callback) {
        this.attachEvent('on'+event, callback, true);
    }; 
    HTMLDocument.prototype.removeEventListener =
    Element.prototype.removeEventListener =
    Window.prototype.removeEventListener = function(event, callback) {
        this.detachEvent('on'+event, callback)
    }; 
    Event.prototype.stopPropagation = function () {
      this.cancelBubble = true;
    };
    Event.prototype.preventDefault = function () {
      this.returnValue = false;
    };
 
}
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}