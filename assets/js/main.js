function getPartners(type, callback){
  var baseURL = 'https://partners.sigfox.com/api/products?filter[categories]=';
  fetch(baseURL+type)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    callback(json);
  })
  .catch(function(ex) {
    console.error('Kits Information failed', ex);
  });
}
function fetchKits(max){
  return fetchProducts('kit', document.querySelector('#hardware .devkits .devkits-list'), max);
}
function fetchModules(max){
  return fetchProducts('module',document.querySelector('#hardware .modules .modules-list'), max);
}
function fetchProducts(type, hostNode, max){
  getPartners(type, function(items){
    if (!items || !items.length){
      return;
    }
    if (max){
      items.sort(function(a,b){
        return Math.round(Math.random() * 2 - 1);
      });
      items = items.slice(0,max);
    }

    items.forEach(function(item){
      showHWCard(hostNode, item);
    });
    hostNode.classList.remove('hidden');
  });
}
function showHWCard(parentDiv, item){
    var baseUrl =  '//partners.sigfox.com/';
    var imgUrl = baseUrl + 'assets/media-for/';
    var productUrl = baseUrl + 'products/';

    var card = document.createElement('div');
    card.classList.add('mdl-card');
    card.classList.add('mdl-shadow--2dp');

    card.style.background = 'url(\''+imgUrl+item._id+'\') center / cover';

    var link = document.createElement('a');
    link.href = productUrl+item.slug;



    var title = document.createElement('div');
    title.classList.add('mdl-card__title');
    title.classList.add('mdl-card--expand');

    var actions = document.createElement('div');
    actions.classList.add('mdl-card__actions');
    var span = document.createElement('span');
    span.innerHTML = item.name;

    link.appendChild(span);

    actions.appendChild(link);

    card.appendChild(title);
    card.appendChild(actions);

    parentDiv.querySelector('.mdl-spinner').classList.remove('is-active');
    parentDiv.appendChild(card);




}
function fetchAskActivity(){
  fetch('https://ask.sigfox.com/services/v1/question/list.json?sort=date&pageSize=10')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    displayAskActivity(json.result);
  })
  .catch(function(ex) {
    console.error('Unable to load ask.sigfox activity', ex);
  });
}
function displayAskActivity(entries){
  var container = document.querySelector('table#ask-activity');
  var entriesHost = container.querySelector('tbody');
  entries.forEach(function(item){
    showAskQuestion(entriesHost, item);
  });
  container.classList.remove('hidden');
}
function showAskQuestion(hostNode, entry){

  if (!entry){
    return false;
  }
  var date = entry.lastActiveDate;
  var link = "https://ask.sigfox.com/questions/"+entry.id+"/"+entry.plug+".html";

  function getLinkNode(url, innerHTML){
    var a = document.createElement('a');
    a.innerHTML = innerHTML;
    a.href = url;
    a.target = "_blank";
    a.rel="noopener noreferrer";

    return a;
  }



  var tableLine = document.createElement('tr');
  var dateCol = document.createElement('td');
  dateCol.classList.add('mdl-data-table__cell--non-numeric');
  dateCol.appendChild(getLinkNode(link, moment(date).fromNow()));

  var userCol = document.createElement('td');
  userCol.classList.add('mdl-data-table__cell--non-numeric');
  userCol.classList.add('mdl-cell--hide-tablet');
  userCol.classList.add('mdl-cell--hide-phone');
  userCol.appendChild(getLinkNode(link, entry.author.username));

  var titleCol = document.createElement('td');
  titleCol.classList.add('mdl-data-table__cell--non-numeric');
  titleCol.appendChild(getLinkNode(link, entry.title));


  tableLine.appendChild(titleCol);
  tableLine.appendChild(dateCol);
  tableLine.appendChild(userCol);



  hostNode.appendChild(tableLine);

}
document.addEventListener("DOMContentLoaded", function() {
  fetchKits(4);
  fetchModules(4);
  fetchAskActivity();
});
