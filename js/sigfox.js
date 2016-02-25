(function(){
  $(document).ready(function() {
   checkNewsletterStatus();
  });
  function checkNewsletterStatus(){
    var qs = getQueryString();
    console.log(qs);
    if (qs && qs.nconf==="1"){
      displayNewsletterConfirmationMsg();
    }
  }
  function getQueryString(){
    var querystring = {};
    window.location.search.substr(1).split('&').forEach(function(qs_entry){
      var parts = qs_entry.split("=");
      if (parts.length !== 2){
        return null;
      }
      querystring[parts[0]] = parts[1];
    });
    
    return querystring;
  }
  function displayNewsletterConfirmationMsg(){
    $('#newsletter-form form').hide();
    $('#newsletter-form .message').show();
  }
})();