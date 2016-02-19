(function(){
  $(document).ready(function() {
   // initNav();
  });
  
  function initNav(){
    var nav = '#main-nav';
    initScrollSpy(nav);
    initNavSpy(nav);
  }
  function initScrollSpy(selector){
    $('body').scrollspy({ target: selector });
    
    
    $(selector).on('activate.bs.scrollspy', function () {
      var hash = $(this).find("li.active:last a").attr("href");//.replace(/^#/, '');
      pushState(hash);
    });
  }
  function initNavSpy(selector){
    $(selector+' a').bind('click', function(evt) {
      var hash = /#(.+)$/.exec(evt.currentTarget.href);
      if (!hash){
        return true;
      }
      hash = hash.shift(); 
      pushState(hash);
      $('html,body').stop().animate({
          scrollTop: $(hash).offset().top - 50
      }, 1000);
      
      evt.preventDefault();
      return false;
    });
  }
  function pushState(hash){
    window.history.pushState(hash, hash, hash);
  }
  
})();