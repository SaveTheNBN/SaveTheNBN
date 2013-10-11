var gedi = require('gedi'),
    crel = require('crel'),
    membersData = require('./members.json'),
    searchExpression = require('./searchExpression.gel'),
    membersElement;

var model = new gedi({members: membersData});

function updateResults(resultData){
    var resultElements = document.createDocumentFragment();

    for(var i = 0; i < resultData.length; i ++){
        var member = new Member(resultData[i]);
        resultElements.appendChild(member.renderedElement);
    }

    membersElement.empty();
    membersElement.append(resultElements);
}

function Member(data) {
    this.data = data;

    var offices,
        contacts;

    this.renderedElement = crel('div', { 'class': 'member' },
        crel('img', { src: data.Image, 'class': 'photo' }),
        crel('div', { 'class': 'details' },
            crel('h2', data.Name),
            offices = crel('div', { 'class': 'offices' }),
            contacts = crel('div', { 'class': 'contacts' })
        )
    );

    for (i = 0; i < data.Office.length; i++) {
        offices.appendChild(crel('p', data.Office[i]));
    }

    for (i = 0; i < data.Contact.length; i++) {
        contacts.appendChild(crel('p',
            crel('a', { href: data.Contact[i] }, data.Contact[i].replace(/mailto\:/g, '').replace(/http\:\/\//g, ''))
        ));
    }

    this.renderedElement.member = this;
}

$(function () {
    var searchForm = $('.search-form'),
        searchBox = searchForm.find('input');

    membersElement = $('.members');

    searchForm.on('submit', function(event){
        event.preventDefault();
    });

    $('.loader').hide();

    model.bind(searchExpression, function(event){
        var results = event.getValue();
        updateResults(results);
        $('.left-panel').removeClass('pre-display');
        $('.loader').hide();
    });

    // update search term after delay
    var typerTimer = null;
    searchBox.on('keyup', function(event){
        $('.loader').show();
        clearTimeout(typerTimer);
        typerTimer = setTimeout(function(){
            var value = searchBox.val();
            if(model.get('[search]') !== value){
                model.set('[search]', value);
            }else{
                $('.loader').hide();
            }
        }, 0);
    });
});
