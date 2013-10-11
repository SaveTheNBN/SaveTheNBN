var Members = function ($container) {
  this._container = $container;

  _this = this;
  $.get('scripts/members.json', function (data) {
    _this._data = data;
  });
};

Members.prototype.search = function (query) {
  var member,
      offices, contacts,
      i, k;

  this._container.html('');

  for (i = 0; i < this._data.length; i++) {
    member = new Member(this._data[i]);
    
    if (member.matchesQuery(query)) {
      result = crel('div', { class: 'member' },
        crel('img', { src: member.Image, class: 'photo' }),
        crel('div', { class: 'details' },
          crel('h2', member.Name),
          offices = crel('div', { class: 'offices' }),
          contacts = crel('div', { class: 'contacts' })
        )
      );

      for (k = 0; k < member.Office.length; k++) {
        offices.appendChild(crel('p', member.Office[k]));
      }

      for (k = 0; k < member.Contact.length; k++) {
        contacts.appendChild(crel('p', 
          crel('a', { href: member.Contact[k] }, member.Contact[k].replace(/mailto\:/g, '').replace(/http\:\/\//g, ''))
        ));
      }

      this._container.append(result);
      $('.left-panel').removeClass('pre-display');
      $('#loader').hide();
    }
  }
}

Member = function (args) {
  for (key in args) {
    this[key] = args[key];
  }
}

Member.prototype.matchesQuery = function (query) {
  var i;

  query = query.toLowerCase()

  if (this.Name.toLowerCase().indexOf(query) > -1) {
    return true
  }

  for (i = 0; i < this.Office.length; i++) {
    if (this.Office[i].toLowerCase().indexOf(query) > -1 || ((this.Office[i].toLowerCase().match(/\d\d\d\d/)[0] - parseInt(query)) < 200 && (this.Office[i].toLowerCase().match(/\d\d\d\d/)[0] - parseInt(query)) > -50) ){
      console.log(Math.abs(this.Office[i].toLowerCase().match(/\d\d\d\d/)[0] - parseInt(query)) < 200);
      return true;
    }
  }

  for (i = 0; i < this.Contact.length; i++) {
    if (this.Contact[i].toLowerCase().indexOf(query) > -1) {
      return true;
    }
  }

  return false;
}


$(function () {
  members = new Members($('#members'));

  var typerTimer = null;
  $('#search-form').keydown(function(){
    $('#loader').show();
    clearTimeout(typerTimer); 
    typerTimer = setTimeout(searchSubmit, 400);
  });

  function searchSubmit () {
    if($('#search-form input').val() != ''){
      $('#search-form').submit();
    }else{
      $('#loader').hide();
    }
    
  }

  $('#search-form').submit(function () {
    var query = $('#query').val();
    members.search(query);

    return false;
  });
});
