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
      showItem(hostNode, item);
    });
    hostNode.classList.remove('hidden');
  });
}
function showItem(parentDiv, item){
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
document.addEventListener("DOMContentLoaded", function() {
  fetchKits(4);
  fetchModules(4);
});