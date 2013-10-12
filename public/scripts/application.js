var gedi = require('gedi'),
    crel = require('crel'),
    membersData = require('./members.json'),
    searchExpression = require('./searchExpression.gel'),
    initialiseMap = require('./map'),
    membersElement,
    memberElement;

console.log(membersData);

var model = new gedi({members: membersData});

var updateTimer = null;
function updateResultsList(resultData){

    // Show loading pulser.
    $('.loader').show();

    // Wait for the user to stop typing.
    clearTimeout(updateTimer);
    updateTimer = setTimeout(function(){
        var resultElements = document.createDocumentFragment();

        for(var i = 0; i < resultData.length; i ++){
            var member = new Member(resultData[i]);
            resultElements.appendChild(member.renderedElement);
        }

        membersElement.empty();
        membersElement.append(resultElements);

        $('.left-panel').removeClass('pre-display');
        $('.loader').hide();
    }, 300);
}

function Member(data) {
    this.data = data;

    var offices,
        contacts;

    this.renderedElement = crel('div', { 'class': 'member' },
        crel('img', { src: data.Image, 'class': 'photo' }),
        crel('div', { 'class': 'details' },

            // Member Name
            crel('h2', data.Name),

            // Offices
            (function(){
                var offices = crel('div', { 'class': 'offices' });

                for (i = 0; i < 1; i++) {
                    offices.appendChild(crel('p', data.Office[i]));
                }

                return offices;
            }())
        )
    );

    $(this.renderedElement).on('click', function(){
        model.set('[selectedMember]', this.member.data);
    });

    this.renderedElement.member = this;
}


function updateSelectedMember(member){
    if(!member){
        $('.memberDetails').fadeOut();
        return;
    }
    var memberElement = crel('div', {'class':'content'},
            crel('button', {'class':'close'}, 'X'),
            crel('h1', member.Name),
            crel('img', {src:member.Image}),
            (function(){
                var contactDetails = crel('ul');

                for(var i = 0; i < member.Contact.length; i++){
                    contactDetails.appendChild(crel('li',
                        crel('a',
                            member.Contact[i]
                        )
                    ));
                }

                return contactDetails;
            }())
        );

    $('.memberDetails').empty().append(memberElement).fadeIn();
}

$(function () {
    var searchForm = $('.search-form'),
        searchBox = searchForm.find('input');

    initialiseMap(model);

    membersElement = $('.members');

    searchForm.on('submit', function(event){
        event.preventDefault();
    });

    $('.loader').hide();

    $('.memberDetails').on('click', function(event){
        if(event.target === this || $(event.target).is('.close')){
            model.remove('[selectedMember]');
        }
    });

    // update results.
    model.bind(searchExpression, function(event){
        model.set('[results]', event.getValue());
    });

    // update results list.
    model.bind('[results]', function(event){
        updateResultsList(event.getValue());
    });

    // update results.
    model.bind('[selectedMember]', function(event){
        updateSelectedMember(event.getValue());
    });

    // update search term if changed
    searchBox.on('keyup', function(event){
        var value = searchBox.val();
        if(value != model.get('[search]')){
            model.set('[search]', value);
        }
    });
});