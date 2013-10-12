;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var gedi = require('gedi'),
    crel = require('crel'),
    membersData = require('./members.json'),
    searchExpression = require('./searchExpression.gel'),
    membersElement,
    memberElement;

console.log(membersData);

var model = new gedi({members: membersData});

var updateTimer = null;
function updateResults(resultData){

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

    membersElement = $('.members');

    searchForm.on('submit', function(event){
        event.preventDefault();
    });

    $('.loader').hide();

    $('.memberDetails').on('click', function(event){
        if(event.target === this){
            model.remove('[selectedMember]');
        }
    });

    // update results.
    model.bind(searchExpression, function(event){
        updateResults(event.getValue());
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


/*

            // Contact details
            (function(){
                var contacts = crel('div', { 'class': 'contacts' });

                for (i = 0; i < data.Contact.length; i++) {
                    contacts.appendChild(crel('p',
                        crel('a', { href: data.Contact[i] }, data.Contact[i].replace(/mailto\:/g, '').replace(/http\:\/\//g, ''))
                    ));
                }

                return contacts;
            }())
*/
},{"./members.json":2,"./searchExpression.gel":3,"crel":4,"gedi":5}],2:[function(require,module,exports){
module.exports=[{"Name":"The Hon Tony Abbott MP","Position":"","Office":["Level 2, 17 Sydney Road Manly, NSW, 2095","PO Box 450 Manly, NSW, 2095"],"Contact":["mailto:Tony.Abbott.MP@aph.gov.au","http://twitter.com/TonyAbbottMHR","http://www.facebook.com/TonyAbbottMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=EZ5","http://www.tonyabbott.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/T_Abbott_MP","http://www.aph.gov.au/images/maps/pdf/Warringah09.pdf","http://www.aph.gov.au/images/maps/pdf/Warringah09.pdf","http://aec.gov.au/warringah"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/EZ5/upload_ref_binary/EZ5.JPG","location":{"lat":-33.7974734,"lng":151.2863635}},{"Name":"Mr John Alexander OAM, MP","Position":"","Office":["Suite 1, 44 - 46 Oxford St Epping, NSW, 2121","PO Box 872 Epping, NSW, 2121"],"Contact":["http://twitter.com/JohnAlexanderMP","http://www.facebook.com/profile.php?id=100001834307725","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=M3M","http://www.johnalexander.net.au/","http://www.liberal.org.au/","http://www.aph.gov.au/J_Alexander_MP","http://www.aph.gov.au/images/maps/pdf/Bennelong09.pdf","http://www.aph.gov.au/images/maps/pdf/Bennelong09.pdf","http://aec.gov.au/bennelong"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/m3m/upload_ref_binary/m3m.jpg","location":{"lat":-33.771025,"lng":151.083912}},{"Name":"Mrs Karen Andrews MP","Position":"","Office":["Ground Floor The Point 47 Watts Drive Varsity Lakes, QLD, 4227","PO Box 409 Varsity Lakes, QLD, 4227"],"Contact":["http://twitter.com/karenandrewsmp","http://www.facebook.com/pages/Karen-Andrews-MP/150255771679533?ref=ts","http://karenandrewsmp.com/","http://www.liberal.org.au/","mailto:karenandrews@karenandrewsmp.com","http://www.aph.gov.au/Karen_Andrews_MP","http://www.aph.gov.au/images/maps/pdf/McPherson09.pdf","http://www.aph.gov.au/images/maps/pdf/McPherson09.pdf","http://aec.gov.au/mcpherson"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/230886/upload_ref_binary/230886.jpg","location":{"lat":-28.078898,"lng":153.415979}},{"Name":"The Hon Kevin Andrews MP","Position":"","Office":["1st Floor 651-653 Doncaster Road Doncaster, VIC, 3108","PO Box 124 Doncaster, VIC, 3108"],"Contact":["mailto:menzies@aph.gov.au","http://twitter.com/kevinandrewsmp","http://www.facebook.com/kevinandrewsmp","http://www.kevinandrews.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/K_Andrews_MP","http://www.aph.gov.au/images/maps/pdf/Menzies09.pdf","http://www.aph.gov.au/images/maps/pdf/Menzies09.pdf","http://aec.gov.au/menzies"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HK5/upload_ref_binary/HK5.jpg","location":{"lat":-37.786962,"lng":145.127207}},{"Name":"The Hon Bob Baldwin MP","Position":"","Office":["35 Sturgeon Street Raymond Terrace, NSW, 2324","PO Box 156 Raymond Terrace, NSW, 2324"],"Contact":["mailto:Bob.Baldwin.MP@aph.gov.au","http://twitter.com/bobbaldwinmp","http://en-gb.facebook.com/bobbaldwinmp","http://www.bobbaldwin.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/B_Baldwin_MP","http://www.aph.gov.au/images/maps/pdf/Paterson09.pdf","http://www.aph.gov.au/images/maps/pdf/Paterson09.pdf","http://aec.gov.au/paterson"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/LL6/upload_ref_binary/LL6.JPG","location":{"lat":-32.764105,"lng":151.742995}},{"Name":"The Hon Bruce Billson MP","Position":"","Office":["20 Davey Street Frankston, VIC, 3199","PO Box 501 Frankston, VIC, 3199"],"Contact":["mailto:B.Billson.MP@aph.gov.au","http://twitter.com/BruceBillsonMP","http://www.facebook.com/profile.php?id=100001833476620","http://www.billson4dunkley.com/","http://www.liberal.org.au/","http://www.aph.gov.au/B_Billson_MP","http://www.aph.gov.au/images/maps/pdf/Dunkley09.pdf","http://www.aph.gov.au/images/maps/pdf/Dunkley09.pdf","http://aec.gov.au/dunkley"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/1K6/upload_ref_binary/1K6.JPG","location":{"lat":-38.146395,"lng":145.1222048}},{"Name":"The Hon Bronwyn Bishop MP","Position":"","Office":["Shop 11238-1246 Pittwater Road Narrabeen, NSW, 2101","Shop 1, 1238-1246 Pittwater Road Narrabeen, NSW, 2101"],"Contact":["mailto:Bronwyn.Bishop.MP@aph.gov.au","http://www.liberal.org.au/","http://www.aph.gov.au/B_Bishop_MP","http://www.aph.gov.au/images/maps/pdf/Mackellar09.pdf","http://www.aph.gov.au/images/maps/pdf/Mackellar09.pdf","http://aec.gov.au/mackellar"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/SE4/upload_ref_binary/SE4.JPG","location":{"lat":-33.7189597,"lng":151.2979461}},{"Name":"The Hon Julie Bishop MP","Position":"","Office":["414 Rokeby Road Subiaco, WA, 6008","PO Box 2010 Subiaco, WA, 6904"],"Contact":["mailto:Julie.Bishop.MP@aph.gov.au","http://twitter.com/JulieBishopMP","http://www.facebook.com/julie.bishop.mp","http://www.juliebishop.com.au/","http://www.liberal.org.au/","http://www.peo.gov.au/","http://www.aph.gov.au/J_Bishop_MP","http://www.aph.gov.au/images/maps/pdf/Curtin09.pdf","http://www.aph.gov.au/images/maps/pdf/Curtin09.pdf","http://aec.gov.au/curtin"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/83P/upload_ref_binary/83P.JPG","location":{"lat":-31.95617,"lng":115.824114}},{"Name":"Mr Jamie Briggs MP","Position":"","Office":["Shop 1, 72 Gawler Street Mount Barker, SA, 5251","PO Box 1601 Mount Barker, SA, 5251"],"Contact":["http://twitter.com/BriggsJamie","http://www.facebook.com/profile.php?id=1024460381","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=IYU","http://www.jamiebriggs.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/J_Briggs_MP","http://www.aph.gov.au/images/maps/pdf/Mayo09.pdf","http://www.aph.gov.au/images/maps/pdf/Mayo09.pdf","http://aec.gov.au/mayo"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/IYU/upload_ref_binary/IYU.JPG","location":{"lat":-35.06607899999999,"lng":138.861691}},{"Name":"Mr Russell Broadbent MP","Position":"","Office":["46C Albert Street Warragul, VIC, 3820","46C Albert Street Warragul, VIC, 3820"],"Contact":["mailto:Russell.Broadbent.MP@aph.gov.au","http://www.russellbroadbent.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/R_Broadbent_MP","http://www.aph.gov.au/images/maps/pdf/McMillan09.pdf","http://www.aph.gov.au/images/maps/pdf/McMillan09.pdf","http://aec.gov.au/mcmillan"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/MT4/upload_ref_binary/MT4.jpg","location":{"lat":-38.16017,"lng":145.933474}},{"Name":"Mr Scott Buchholz MP","Position":"","Office":["21 William Street Beaudesert, QLD, 4285","PO Box 628 Beaudesert, QLD, 4285"],"Contact":["http://twitter.com/ScottBuchholzMP","http://www.facebook.com/ScottBuchholzMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=230531","http://www.scottbuchholz.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Buchholz_MP","http://www.aph.gov.au/images/maps/pdf/Wright09.pdf","http://www.aph.gov.au/images/maps/pdf/Wright09.pdf","http://aec.gov.au/wright"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/230531/upload_ref_binary/230531.jpg","location":{"lat":-27.989172,"lng":152.996919}},{"Name":"Mr Steven Ciobo MP","Position":"","Office":["67 Thomas Drive Chevron Island, QLD, 4217","PO Box 4922 Gold Coast Mail Centre, QLD, 9726"],"Contact":["http://twitter.com/steveciobo","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=00AN0","http://www.stevenciobo.com/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Ciobo_MP","http://www.aph.gov.au/images/maps/pdf/Moncrieff09.pdf","http://www.aph.gov.au/images/maps/pdf/Moncrieff09.pdf","http://aec.gov.au/moncrieff"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00AN0/upload_ref_binary/00AN0.JPG","location":{"lat":-27.9976256,"lng":153.418033}},{"Name":"The Hon Peter Dutton MP","Position":"","Office":["3/199 Gympie Road Strathpine, QLD, 4500","PO Box 2012 Strathpine, QLD, 4500"],"Contact":["mailto:Peter.Dutton.MP@aph.gov.au","http://twitter.com/PeterDutton_MP","http://www.facebook.com/peterduttonmp","http://www.peterdutton.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/P_Dutton_MP","http://www.aph.gov.au/images/maps/pdf/Dickson09.pdf","http://www.aph.gov.au/images/maps/pdf/Dickson09.pdf","http://aec.gov.au/dickson"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00AKI/upload_ref_binary/00AKI.JPG","location":{"lat":-27.310857,"lng":152.992878}},{"Name":"The Hon Warren Entsch MP","Position":"","Office":["Mac Donnells Building, 102 Grafton Street Cairns, QLD, 4870","PO Box 14 Bungalow, QLD, 4870"],"Contact":["http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=7K6","http://www.liberal.org.au/","http://www.aph.gov.au/W_Entsch_MP","http://www.aph.gov.au/images/maps/pdf/Leichhardt09.pdf","http://www.aph.gov.au/images/maps/pdf/Leichhardt09.pdf","http://aec.gov.au/leichhardt"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/7K6/upload_ref_binary/7K6.jpg","location":{"lat":-16.9221171,"lng":145.7742058}},{"Name":"Mr Paul Fletcher MP","Position":"","Office":["Suite 812 Tryon Road Lindfield, NSW, 2070","Suite 8, 12 Tryon Road Lindfield, NSW, 2070"],"Contact":["mailto:Paul.Fletcher.MP@aph.gov.au","http://twitter.com/paulwfletcher/","http://www.facebook.com/pages/Paul-Fletcher/142496131402","http://www.paulfletcher.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/P_Fletcher_MP","http://www.aph.gov.au/images/maps/pdf/Bradfield09.pdf","http://www.aph.gov.au/images/maps/pdf/Bradfield09.pdf","http://aec.gov.au/bradfield"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/L6B/upload_ref_binary/l6b.jpg","location":{"lat":-33.77105,"lng":151.1790863}},{"Name":"Mr Josh Frydenberg MP","Position":"","Office":["695 Burke Road Camberwell, VIC, 3124","695 Burke Road Camberwell, VIC, 3124"],"Contact":["http://twitter.com/JoshFrydenberg","http://www.facebook.com/JoshFrydenbergMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=FKL","http://www.joshfrydenberg.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/J_Frydenberg_MP","http://www.aph.gov.au/images/maps/pdf/Kooyong09.pdf","http://www.aph.gov.au/images/maps/pdf/Kooyong09.pdf","http://aec.gov.au/kooyong"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/FKL/upload_ref_binary/FKL.jpg","location":{"lat":-37.832173,"lng":145.056076}},{"Name":"The Hon Teresa Gambaro MP","Position":"","Office":["209 Days Road Grange, QLD, 4051","PO Box 98 Grange, QLD, 4051"],"Contact":["http://twitter.com/TeresaGambaroMP","https://www.facebook.com/TeresaGambaroMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=9K6","http://www.teresagambaro.com/","http://www.liberal.org.au/","http://www.aph.gov.au/T_Gambaro_MP","http://www.aph.gov.au/images/maps/pdf/Brisbane09.pdf","http://www.aph.gov.au/images/maps/pdf/Brisbane09.pdf","http://aec.gov.au/brisbane"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/9K6/upload_ref_binary/9K6.jpg","location":{"lat":-27.425642,"lng":153.014035}},{"Name":"Mr Alex Hawke MP","Position":"","Office":["Suite 823 Terminus Street Castle Hill, NSW, 2154","PO Box 1173 Castle Hill, NSW, 2154"],"Contact":["http://twitter.com/alexhawkemp","http://www.facebook.com/alex.hawke.mp","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=HWO","http://www.alexhawke.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/A_Hawke_MP","http://www.aph.gov.au/images/maps/pdf/Mitchell09.pdf","http://www.aph.gov.au/images/maps/pdf/Mitchell09.pdf","http://aec.gov.au/mitchell"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HWO/upload_ref_binary/HWO.jpg","location":{"lat":-33.7335855,"lng":151.0059946}},{"Name":"The Hon Joe Hockey MP","Position":"","Office":["100 Mount Street(Cnr of Mount & Walker) North Sydney, NSW, 2060","PO Box 1107 North Sydney, NSW, 2059"],"Contact":["mailto:J.Hockey.MP@aph.gov.au","http://twitter.com/JoeHockey","http://www.facebook.com/joehockey","http://www.joehockey.com/","http://www.liberal.org.au/","http://www.aph.gov.au/J_Hockey_MP","http://www.aph.gov.au/images/maps/pdf/North%20Sydney09.pdf","http://www.aph.gov.au/images/maps/pdf/North%20Sydney09.pdf","http://aec.gov.au/north-sydney"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/DK6/upload_ref_binary/DK6.JPG","location":{"lat":-33.8386344,"lng":151.2071142}},{"Name":"The Hon Greg Hunt MP","Position":"","Office":["Shop 4, 184 Salmon Street Hastings, VIC, 3915","PO Box 274 Hastings, VIC, 3915"],"Contact":["mailto:Greg.Hunt.MP@aph.gov.au","http://www.twitter.com/greghuntmp","http://www.facebook.com/greg.hunt.mp","http://www.greghunt.com.au/","http://www.liberal.org.au/","http://www.peo.gov.au/","http://www.aph.gov.au/G_Hunt_MP","http://www.aph.gov.au/images/maps/pdf/Flinders09.pdf","http://www.aph.gov.au/images/maps/pdf/Flinders09.pdf","http://aec.gov.au/flinders"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00AMV/upload_ref_binary/00AMV.JPG","location":{"lat":-38.3066802,"lng":145.1930261}},{"Name":"Mr Steve Irons MP","Position":"","Office":["G3, 59 Albany Highway Victoria Park, WA, 6101","PO Box 1060 East Victoria Park, WA, 6981"],"Contact":["http://twitter.com/SteveIronsMP","https://www.facebook.com/pages/Steve-Irons-MP-Federal-Member-for-Swan/162172533830403","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=HYM","http://www.steveirons.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Irons_MP","http://www.aph.gov.au/images/maps/pdf/Swan09.pdf","http://www.aph.gov.au/images/maps/pdf/Swan09.pdf","http://aec.gov.au/swan"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HYM/upload_ref_binary/HYM.jpg","location":{"lat":-31.969263,"lng":115.889257}},{"Name":"Dr Dennis Jensen MP","Position":"","Office":["6-8 Aveley Street Willetton, WA, 6155","PO Box 329 Willetton, WA, 6955"],"Contact":["mailto:Dennis.Jensen.MP@aph.gov.au","http://twitter.com/DennisJensenMP","http://www.facebook.com/dennisjensenmp","http://www.dennisjensen.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/D_Jensen_MP","http://www.aph.gov.au/images/maps/pdf/Tangney09.pdf","http://www.aph.gov.au/images/maps/pdf/Tangney09.pdf","http://aec.gov.au/tangney"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/DYN/upload_ref_binary/DYN.jpg","location":{"lat":-32.0406756,"lng":115.8754268}},{"Name":"Mr Ewen Jones MP","Position":"","Office":["Nathan Business CentreCorner Ross River Road & Nathan Street Aitkenvale, QLD, 4814","PO Box 226 Aitkenvale, QLD, 4814"],"Contact":["http://twitter.com/EwenJonesMP","http://www.facebook.com/ewenjonesmp","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=96430","http://www.ewenjones.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/E_Jones_MP","http://www.aph.gov.au/images/maps/pdf/Herbert09.pdf","http://www.aph.gov.au/images/maps/pdf/Herbert09.pdf","http://aec.gov.au/herbert"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/96430/upload_ref_binary/96430.jpg","location":{"lat":-19.2997189,"lng":146.7614226}},{"Name":"Mr Michael Keenan MP","Position":"","Office":["203 Wanneroo Road Tuart Hill, WA, 6060","PO Box 261 Osborne Park, WA, 6917"],"Contact":["http://twitter.com/michaelkeenanmp","http://www.facebook.com/MichaelKeeenanMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=E0J","http://www.keenan.net.au/","http://www.liberal.org.au/","http://www.peo.gov.au/","http://www.aph.gov.au/M_Keenan_MP","http://www.aph.gov.au/images/maps/pdf/Stirling09.pdf","http://www.aph.gov.au/images/maps/pdf/Stirling09.pdf","http://aec.gov.au/stirling"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/E0J/upload_ref_binary/E0J.JPG","location":{"lat":-31.8902267,"lng":115.8379175}},{"Name":"Mr Craig Kelly MP","Position":"","Office":["Shop 1, 9-15 East Parade Sutherland, NSW, 2232","PO Box 1014 Sutherland, NSW, 1499"],"Contact":["http://twitter.com/CraigKellyMP","http://www.facebook.com/CraigKellyMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=99931","http://craigkelly.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/C_Kelly_MP","http://www.aph.gov.au/images/maps/pdf/Hughes09.pdf","http://www.aph.gov.au/images/maps/pdf/Hughes09.pdf","http://aec.gov.au/hughes"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/99931/upload_ref_binary/99931.jpg","location":{"lat":-34.0306149,"lng":151.0572611}},{"Name":"Mr Andrew Laming MP","Position":"","Office":["10/32 Middle Street Cleveland, QLD, 4163","PO Box 8024 Cleveland, QLD, 4163"],"Contact":["http://twitter.com/AndrewLamingMP","http://www.facebook.com/profile.php?id=100000494042921","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=E0H","http://www.andrewlaming.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/A_Laming_MP","http://www.aph.gov.au/images/maps/pdf/Bowman09.pdf","http://www.aph.gov.au/images/maps/pdf/Bowman09.pdf","http://aec.gov.au/bowman"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/E0H/upload_ref_binary/E0H.jpg","location":{"lat":-27.525485,"lng":153.2657}},{"Name":"The Hon Sussan Ley MP","Position":"","Office":["520 Swift Street Albury, NSW, 2640","PO Box 672 Albury, NSW, 2640","275 Argent Street BROKEN HILL, NSW, 2880","275 Argent Street BROKEN HILL, NSW, 2880"],"Contact":["mailto:Sussan.Ley.MP@aph.gov.au","http://twitter.com/sussanley","http://www.facebook.com/pages/Sussan-Ley-MP/198830586850988","http://www.sussanley.com/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Ley_MP","http://www.aph.gov.au/images/maps/pdf/Farrer09.pdf","http://www.aph.gov.au/images/maps/pdf/Farrer09.pdf","http://aec.gov.au/farrer"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00AMN/upload_ref_binary/00AMN.JPG","location":{"lat":-36.078431,"lng":146.917486}},{"Name":"The Hon Ian Macfarlane MP","Position":"","Office":["216 Margaret StreetCnr Margaret & Duggan Sts Toowoomba, QLD, 4350","PO Box 777 Toowoomba, QLD, 4350"],"Contact":["mailto:Ian.Macfarlane.MP@aph.gov.au","http://www.ianmacfarlanemp.com/","http://www.liberal.org.au/","http://www.aph.gov.au/I_Macfarlane_MP","http://www.aph.gov.au/images/maps/pdf/Groom09.pdf","http://www.aph.gov.au/images/maps/pdf/Groom09.pdf","http://aec.gov.au/groom"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/WN6/upload_ref_binary/WN6.JPG","location":{"lat":-27.5621549,"lng":151.9522646}},{"Name":"Ms Nola Marino MP","Position":"","Office":["Unit 3, 9 Cassowary Bend Eaton, WA, 6232","Unit 3, 9 Cassowary Bend Eaton, WA, 6232"],"Contact":["mailto:Nola.Marino.MP@aph.gov.au","http://twitter.com/#!/NolaMarinoMP","http://www.facebook.com/nola.marino.mp","http://nolamarino.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/N_Marino_MP","http://www.aph.gov.au/images/maps/pdf/Forrest09.pdf","http://www.aph.gov.au/images/maps/pdf/Forrest09.pdf","http://aec.gov.au/forrest"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HWP/upload_ref_binary/HWP.jpg","location":{"lat":-33.3211918,"lng":115.7166924}},{"Name":"Mrs Louise Markus MP","Position":"","Office":["Shop 24, Riverview Shopping Centre227 George Street Windsor, NSW, 2756","PO Box 855 Windsor, NSW, 2756"],"Contact":["http://www.facebook.com/louise.markus.mp","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=E07","http://www.louisemarkus.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/L_Markus_MP","http://www.aph.gov.au/images/maps/pdf/Macquarie09.pdf","http://www.aph.gov.au/images/maps/pdf/Macquarie09.pdf","http://aec.gov.au/macquarie"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/E07/upload_ref_binary/E07.JPG","location":{"lat":-33.6088196,"lng":150.8174842}},{"Name":"Mr Russell Matheson MP","Position":"","Office":["47 Argyle St Camden, NSW, 2570","PO Box 1065 Camden, NSW, 2570"],"Contact":["mailto:russell.matheson.mp@aph.gov.au","http://twitter.com/russellmatheson","http://www.facebook.com/pages/Russell-Matheson-MP-Federal-Member-for-Macarthur/164320700256328","http://www.russellmatheson.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/R_Matheson_MP","http://www.aph.gov.au/images/maps/pdf/Macarthur09.pdf","http://www.aph.gov.au/images/maps/pdf/Macarthur09.pdf","http://aec.gov.au/macarthur"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/m2v/upload_ref_binary/m2v.jpg","location":{"lat":-34.053536,"lng":150.69743}},{"Name":"Mrs Sophie Mirabella MP","Position":"","Office":["117 Murphy Street Wangaratta, VIC, 3677","117 Murphy Street Wangaratta, VIC, 3677"],"Contact":["mailto:Sophie.Mirabella.MP@aph.gov.au","http://twitter.com/SMirabellaMP","http://www.facebook.com/profile.php?id=1161123891","http://www.sophiemirabella.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Mirabella_MP","http://www.aph.gov.au/images/maps/pdf/Indi09.pdf","http://www.aph.gov.au/images/maps/pdf/Indi09.pdf","http://aec.gov.au/indi"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00AMU/upload_ref_binary/00AMU.JPG","location":{"lat":-36.353974,"lng":146.328086}},{"Name":"Mr Scott Morrison MP","Position":"","Office":["Suite 102, Level 130 The Kingsway Cronulla, NSW, 2230","PO Box 1306 Cronulla, NSW, 2230"],"Contact":["http://twitter.com/ScottMorrisonMP","http://www.facebook.com/pages/Scott-Morrison/101546263223119","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=E3L","http://www.scottmorrison.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Morrison_MP","http://www.aph.gov.au/images/maps/pdf/Cook09.pdf","http://www.aph.gov.au/images/maps/pdf/Cook09.pdf","http://aec.gov.au/cook"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/E3L/upload_ref_binary/E3L.JPG","location":{"lat":-34.048124,"lng":151.139497}},{"Name":"Ms Kelly O'Dwyer MP","Position":"","Office":["Suite 11343 Malvern Road Malvern, VIC, 3144","Suite 1, 1343 Malvern Road Malvern, VIC, 3144"],"Contact":["http://twitter.com/kellyodwyer","http://www.facebook.com/pages/Kelly-ODwyer/171601117783","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=LKU","http://kellyodwyer.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/K_Odwyer_MP","http://www.aph.gov.au/images/maps/pdf/Higgins09.pdf","http://www.aph.gov.au/images/maps/pdf/Higgins09.pdf","http://aec.gov.au/higgins"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/LKU/upload_ref_binary/lku.jpg","location":{"lat":-37.85245159999999,"lng":145.0362397}},{"Name":"Mrs Jane Prentice MP","Position":"","Office":["636 Moggill Road Chapel Hill, QLD, 4069","PO Box 704 Indooroopilly, QLD, 4068"],"Contact":["mailto:jane.prentice.mp@aph.gov.au","http://twitter.com/JanePrentice_MP","http://www.facebook.com/janeprenticemp","http://www.janeprentice.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/J_Prentice_MP","http://www.aph.gov.au/images/maps/pdf/Ryan09.pdf","http://www.aph.gov.au/images/maps/pdf/Ryan09.pdf","http://aec.gov.au/ryan"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/217266/upload_ref_binary/217266.jpg","location":{"lat":-27.5062088,"lng":152.9599521}},{"Name":"The Hon Christopher Pyne MP","Position":"","Office":["429 Magill Road St Morris, SA, 5068","429 Magill Road St Morris, SA, 5068"],"Contact":["mailto:C.Pyne.MP@aph.gov.au","http://www.facebook.com/christopher.pyne","http://www.pyneonline.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/C_Pyne_MP","http://www.aph.gov.au/images/maps/pdf/Sturt09.pdf","http://www.aph.gov.au/images/maps/pdf/Sturt09.pdf","http://aec.gov.au/sturt"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/9V5/upload_ref_binary/9V5.JPG","location":{"lat":-34.913688,"lng":138.655445}},{"Name":"Mr Rowan Ramsey MP","Position":"","Office":["104 Ellen St Port Pirie, SA, 5540","PO Box 296 Port Pirie, SA, 5540","45a Playford Ave Whyalla, SA, 5600","45a Playford Ave Whyalla, SA, 5600"],"Contact":["http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=HWS","http://www.rowanramsey.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/R_Ramsay_MP","http://www.aph.gov.au/images/maps/pdf/Grey09.pdf","http://www.aph.gov.au/images/maps/pdf/Grey09.pdf","http://aec.gov.au/grey"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HWS/upload_ref_binary/HWS.jpg","location":{"lat":-33.177241,"lng":138.009958}},{"Name":"Mr Don Randall MP","Position":"","Office":["Unit 22808 Albany Highway Kelmscott, WA, 6111","PO Box 465 Kelmscott, WA, 6111"],"Contact":["mailto:Don.Randall.MP@aph.gov.au","http://www.donrandallmp.com/","http://www.liberal.org.au/","http://www.aph.gov.au/D_Randall_MP","http://www.aph.gov.au/images/maps/pdf/Canning09.pdf","http://www.aph.gov.au/images/maps/pdf/Canning09.pdf","http://aec.gov.au/canning"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/PK6/upload_ref_binary/PK6.JPG","location":{"lat":-32.1144315,"lng":116.0148669}},{"Name":"The Hon Andrew Robb AO, MP","Position":"","Office":["368 Centre Road Bentleigh, VIC, 3204","368 Centre Road Bentleigh, VIC, 3204"],"Contact":["mailto:Andrew.Robb.MP@aph.gov.au","http://twitter.com/AndrewRobbMP","http://www.andrewrobb.com.au/","http://www.liberal.org.au/","http://www.peo.gov.au/","http://www.aph.gov.au/A_Robb_MP","http://www.aph.gov.au/images/maps/pdf/Goldstein09.pdf","http://www.aph.gov.au/images/maps/pdf/Goldstein09.pdf","http://aec.gov.au/goldstein"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/FU4/upload_ref_binary/FU4.JPG","location":{"lat":-37.918341,"lng":145.035504}},{"Name":"Mr Stuart Robert MP","Position":"","Office":["Unit 1, 110 Brisbane Road Labrador, QLD, 4215","PO Box 733 Biggera Waters, QLD, 4216"],"Contact":["http://twitter.com/stuartrobertmp","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=HWT","http://www.robert.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Robert_MP","http://www.aph.gov.au/images/maps/pdf/Fadden09.pdf","http://www.aph.gov.au/images/maps/pdf/Fadden09.pdf","http://aec.gov.au/fadden"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HWT/upload_ref_binary/HWT.jpg","location":{"lat":-27.93602,"lng":153.395883}},{"Name":"Mr Wyatt Roy MP","Position":"","Office":["Unit 1, 260 Morayfield Road Morayfield, QLD, 4506","PO Box 825 Morayfield, QLD, 4506"],"Contact":["http://twitter.com/Wyatt_Roy_MP","http://www.facebook.com/wyatt.roy1","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=M2X","http://www.wyattroy.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/W_Roy_MP","http://www.aph.gov.au/images/maps/pdf/Longman09.pdf","http://www.aph.gov.au/images/maps/pdf/Longman09.pdf","http://aec.gov.au/longman"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/m2x/upload_ref_binary/m2x.jpg","location":{"lat":-27.111842,"lng":152.95033}},{"Name":"The Hon Philip Ruddock MP","Position":"","Office":["Level 7 Tele Tech Building, Suite 701, 423 Pennant Hills Road Pennant Hills, NSW, 2120","PO Box 743 Pennant Hills, NSW, 1715"],"Contact":["http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=0J4","http://www.ruddockmp.com.au/","http://www.liberal.org.au/","http://www.peo.gov.au/","http://www.aph.gov.au/P_Ruddock_MP","http://www.aph.gov.au/images/maps/pdf/Berowra09.pdf","http://www.aph.gov.au/images/maps/pdf/Berowra09.pdf","http://aec.gov.au/berowra"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/0J4/upload_ref_binary/0J4.jpg","location":{"lat":-33.739624,"lng":151.068775}},{"Name":"Mr Luke Simpkins MP","Position":"","Office":["Shop 3, Kingsway Shopping Centre Madeley, WA, 6065","PO Box 219 Kingsway, WA, 6065"],"Contact":["http://www.facebook.com/profile.php?id=1588540248","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=HWE","http://www.lukesimpkinsmp.com/","http://www.liberal.org.au/","http://www.aph.gov.au/L_Simpkins_MP","http://www.aph.gov.au/images/maps/pdf/Cowan09.pdf","http://www.aph.gov.au/images/maps/pdf/Cowan09.pdf","http://aec.gov.au/cowan"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/HWE/upload_ref_binary/HWE.jpg","location":{"lat":-31.81779879999999,"lng":115.8237089}},{"Name":"The Hon Tony Smith MP","Position":"","Office":["Suite 11 East Ridge Drive Chirnside Park, VIC, 3116","Suite 1, 1 East Ridge Drive Chirnside Park, VIC, 3116"],"Contact":["mailto:Tony.Smith.MP@aph.gov.au","http://twitter.com/TonySmithMP","http://www.tonysmithmp.com/","http://www.liberal.org.au/","http://www.aph.gov.au/T_Smith_MP","http://www.aph.gov.au/images/maps/pdf/Casey09.pdf","http://www.aph.gov.au/images/maps/pdf/Casey09.pdf","http://aec.gov.au/casey"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/00APG/upload_ref_binary/00APG.JPG","location":{"lat":-37.76045200000001,"lng":145.303464}},{"Name":"Dr Andrew Southcott MP","Position":"","Office":["Level 1, 724 Marion Road Marion, SA, 5043","Level 1, 724 Marion Road Marion, SA, 5043"],"Contact":["mailto:Andrew.Southcott.MP@aph.gov.au","http://twitter.com/asouthcottmp","http://www.facebook.com/people/Andrew-Southcott/564332755","http://www.andrewsouthcott.com/","http://www.liberal.org.au/","http://www.aph.gov.au/A_Southcott_MP","http://www.aph.gov.au/images/maps/pdf/Boothby09.pdf","http://www.aph.gov.au/images/maps/pdf/Boothby09.pdf","http://aec.gov.au/boothby"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/TK6/upload_ref_binary/TK6.JPG","location":{"lat":-35.003309,"lng":138.557359}},{"Name":"The Hon Dr Sharman Stone MP","Position":"","Office":["426 Wyndham Street Shepparton, VIC, 3632","PO Box 884 Shepparton, VIC, 3632"],"Contact":["http://twitter.com/SharmanStone","http://www.facebook.com/profile.php?id=618520734","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=EM6","http://www.sharmanstone.com/","http://www.liberal.org.au/","http://www.aph.gov.au/S_Stone_MP","http://www.aph.gov.au/images/maps/pdf/Murray09.pdf","http://www.aph.gov.au/images/maps/pdf/Murray09.pdf","http://aec.gov.au/murray"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/EM6/upload_ref_binary/EM6.JPG","location":{"lat":-36.383362,"lng":145.398509}},{"Name":"Mr Dan Tehan MP","Position":"","Office":["190 Gray Street Hamilton, VIC, 3300","190 Gray Street Hamilton, VIC, 3300","73 Kepler Street Warrnambool, VIC, 3280","73 Kepler Street Warrnambool, VIC, 3280"],"Contact":["http://twitter.com/DanTehanWannon","http://www.facebook.com/dan.tehan.mp?v=wall","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=210911","http://www.dantehan.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/D_Tehan_MP","http://www.aph.gov.au/images/maps/pdf/Wannon09.pdf","http://www.aph.gov.au/images/maps/pdf/Wannon09.pdf","http://aec.gov.au/wannon"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/210911/upload_ref_binary/210911.jpg","location":{"lat":-37.742639,"lng":142.0257659}},{"Name":"Mr Alan Tudge MP","Position":"","Office":["Suite 4, Level 1420 Burwood Highway Wantirna South, VIC, 3152","Suite 4, Level 1, 420 Burwood Highway Wantirna South, VIC, 3152"],"Contact":["http://twitter.com/AlanTudgeMP","http://www.facebook.com/alantudgemp","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=M2Y","http://www.alantudge.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/A_Tudge_MP","http://www.aph.gov.au/images/maps/pdf/Aston09.pdf","http://www.aph.gov.au/images/maps/pdf/Aston09.pdf","http://aec.gov.au/aston"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/m2y/upload_ref_binary/m2y.jpg","location":{"lat":-37.870951,"lng":145.2427311}},{"Name":"The Hon Malcolm Turnbull MP","Position":"","Office":["Ground Floor, 287-289 New South Head Road (Corner Edgecliff Road) Edgecliff, NSW, 2027","PO Box 545 Edgecliff, NSW, 2027"],"Contact":["mailto:Malcolm.Turnbull.MP@aph.gov.au","http://twitter.com/TurnbullMalcolm","http://www.facebook.com/pages/Malcolm-Turnbull/53772921578","http://www.malcolmturnbull.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/M_Turnbull_MP","http://www.aph.gov.au/images/maps/pdf/Wentworth09.pdf","http://www.aph.gov.au/images/maps/pdf/Wentworth09.pdf","http://aec.gov.au/wentworth"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/885/upload_ref_binary/885.JPG","location":{"lat":-33.8797536,"lng":151.2400239}},{"Name":"Mr Bert van Manen MP","Position":"","Office":["Tenancy 4/96 George Street Beenleigh, QLD, 4207","PO Box 884 Beenleigh, QLD, 4207"],"Contact":["http://twitter.com/bertvanmanen/","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=188315","http://www.bertvanmanen.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/B_Van_Manen_MP","http://www.aph.gov.au/images/maps/pdf/Forde09.pdf","http://www.aph.gov.au/images/maps/pdf/Forde09.pdf","http://aec.gov.au/forde"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/188315/upload_ref_binary/188315.jpg","location":{"lat":-27.716791,"lng":153.204232}},{"Name":"Mr Ross Vasta MP","Position":"","Office":["69 Clara Street Wynnum, QLD, 4178","69 Clara Street Wynnum, QLD, 4178"],"Contact":["http://www.facebook.com/pages/Ross-Vasta/299861623376616","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=E0D","http://www.rossvasta.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/R_Vasta_MP","http://www.aph.gov.au/images/maps/pdf/Bonner09.pdf","http://www.aph.gov.au/images/maps/pdf/Bonner09.pdf","http://aec.gov.au/bonner"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/E0D/upload_ref_binary/E0D.JPG","location":{"lat":-27.445157,"lng":153.174313}},{"Name":"Mr Ken Wyatt AM, MP","Position":"","Office":["Shop 10-12 Forrestfield Forum, 80 Hale Road Forrestfield, WA, 6058","PO Box 325 Forrestfield, WA, 6058"],"Contact":["http://twitter.com/KenWyattMP","http://www.aph.gov.au/Senators_and_Members/Contact_Senator_or_Member?MPID=M3A","http://www.kenwyatt.com.au/","http://www.liberal.org.au/","http://www.aph.gov.au/K_Wyatt_MP","http://www.aph.gov.au/images/maps/pdf/Hasluck09.pdf","http://www.aph.gov.au/images/maps/pdf/Hasluck09.pdf","http://aec.gov.au/hasluck"],"Image":"http://parlinfo.aph.gov.au/parlInfo/download/handbook/allmps/m3a/upload_ref_binary/m3a.jpg","location":{"lat":-31.987485,"lng":116.007439}}]

},{}],3:[function(require,module,exports){
module.exports = '(&&[search](filter[members]{member(||(="*"[search])(contains member.Name[search])(findOne member.Office{office(||(contains office[search])(&&(!(isNaN[search]))(>(slice -4 office)(*(slice 0 1[search])1000))(<(apply -(sort(array[search](slice -4 office)){a b(- b a)}))200)))})(findOne member.Contact{contact(contains contact[search])}))}))';
},{}],4:[function(require,module,exports){
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.
    
    However, the code's intention should be transparent.
    
    *** IE SUPPORT ***
    
    If you require this library to work in IE7, add the following after declaring crel.
    
    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');    
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;
    

    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;
    
    

*/

// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
  }
}(this, function () {
    // based on http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    var isNode = typeof Node === 'object'
        ? function (object) { return object instanceof Node }
        : function (object) {
            return object
                && typeof object === 'object'
                && typeof object.nodeType === 'number'
                && typeof object.nodeName === 'string';
        };

    function crel(){
        var document = window.document,
            args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = document.createElement(args[0]),
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel.attrMap;

        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(typeof settings !== 'object' || isNode(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string    
        if((argumentsLength - childIndex) === 1 && typeof args[childIndex] === 'string' && element.textContent !== undefined){
            element.textContent = args[childIndex];
        }else{    
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];
                
                if(child == null){
                    continue;
                }
                
                if(!isNode(child)){
                    child = document.createTextNode(child);
                }
                
                element.appendChild(child);
            }
        }
        
        for(var key in settings){
            if(!attributeMap[key]){
                element.setAttribute(key, settings[key]);
            }else{
                var attr = crel.attrMap[key];
                if(typeof attr === 'function'){     
                    attr(element, settings[key]);               
                }else{            
                    element.setAttribute(attr, settings[key]);
                }
            }
        }
        
        return element;
    }
    
    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    // String referenced so that compilers maintain the property name.
    crel['attrMap'] = {};
    
    // String referenced so that compilers maintain the property name.
    crel["isNode"] = isNode;
    
    return crel;
}));

},{}],5:[function(require,module,exports){
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Gel = require('gel-js'),
    WeakMap = require('weakmap'),
    createPathToken = require('./pathToken'),
    Token = Gel.Token,
    paths = require('gedi-paths'),
    pathConstants = paths.constants,
    createSpec = require('spec-js');

//Create gedi
var gediConstructor = newGedi;

var exceptions = {
    invalidPath: 'Invalid path syntax'
};

var arrayProto = [];


//***********************************************
//
//      Gedi object.
//
//***********************************************

//Creates the public gedi constructor
function newGedi(model) {

    // Storage for the applications model
    model = model || {};

        // Storage for model event handles
    var internalBindings = [],

        // Storage for tracking references within the model
        modelReferences = new WeakMap(),

        // Storage for tracking the dirty state of the model
        dirtyModel = {},

        // Whether model events are paused
        eventsPaused = false,

        // gel instance
        gel,

        PathToken = createPathToken(get, model);

    // Add a new object who's references should be tracked.
    function addModelReference(path, object){
        if(!object || typeof object !== 'object'){
            return;
        }

        var path = paths.resolve(paths.createRoot(),path),
            objectReferences = modelReferences.get(object);

        if(!objectReferences){
            objectReferences = [];
            modelReferences.set(object, objectReferences);
        }

        if(objectReferences.indexOf(path) < 0){
            objectReferences.push(path);
        }

        for(var key in object){
            var prop = object[key];

            // Faster to check again here than to create pointless paths.
            if(prop && typeof prop === 'object' && !modelReferences.has(prop)){
                addModelReference(paths.append(path, paths.create(key)), prop);
            }
        }
    }

    function removeModelReference(path, object){
        if(!object || typeof object !== 'object'){
            return;
        }

        var path = paths.resolve(paths.createRoot(),path),
            objectReferences = modelReferences.get(object),
            refIndex;

        if(!objectReferences){
            return;
        }

        objectReferences.splice(objectReferences.indexOf(path),1);

        if(!objectReferences.length){
            modelReferences['delete'](object);
        }

        for(var key in object){
            var prop = object[key];

            // Faster to check again here than to create pointless paths.
            if(prop && typeof prop === 'object' && prop !== object){
                removeModelReference(paths.append(path, paths.create(key)), prop);
            }
        }
    }

    function triggerModelReferences(targetPath){
        var parentPath = paths.resolve(paths.createRoot(), targetPath, paths.create(pathConstants.upALevel)),
            parentObject = get(parentPath, model);

        if(!parentObject || typeof parentObject !== 'object'){
            return;
        }

        var objectReferences = modelReferences.get(parentObject);

        if(!objectReferences){
            return;
        }

        for(var i = objectReferences.length - 1; i >= 0; i--){
            if(objectReferences[i] !== parentPath){
                trigger(objectReferences[i]);
            }
        }
    }

    //Initialise model references
    addModelReference('[/]', model);

    //internal functions

    //***********************************************
    //
    //      IE indexOf polyfill
    //
    //***********************************************

    //IE Specific idiocy

    Array.prototype.indexOf = Array.prototype.indexOf || function (object) {
        fastEach(this, function (value, index) {
            if (value === object) {
                return index;
            }
        });
    };

    // http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
    String.prototype.trim = String.prototype.trim || function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

    // http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
    Array.isArray = Array.isArray || function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    //End IE land.


    //***********************************************
    //
    //      Array Fast Each
    //
    //***********************************************

    function fastEach(array, callback) {
        for (var i = 0; i < array.length; i++) {
            if (callback(array[i], i, array)) break;
        }
        return array;
    }

    //***********************************************
    //
    //      Array Fast Each
    //
    //***********************************************

    function each(object, callback) {
        var isArray = Array.isArray(object);
        for (var key in object) {
            if(isArray && isNaN(key)){
                continue;
            }
            if(callback(object[key], key, object)){
                break;
            }
        }
        return object;
    }

    //***********************************************
    //
    //      Gel integration
    //
    //***********************************************

    gel = new Gel();

    gel.tokenConverters.push(PathToken);

    gel.scope.isDirty = function(scope, args){
        var token = args.raw()[0];

        return isDirty(paths.resolve(scope.get('_gediModelContext_'), (token instanceof PathToken) ? token.original : paths.create()));
    };

    gel.scope.getAllDirty = function (scope, args) {
        var token = args.raw()[0],
            path = paths.resolve(scope.get('_gediModelContext_'), (token instanceof PathToken) && token.original),
            source = get(path, model),
            result,
            itemPath;

        if (source == null) {
            return null;
        }

        result = source.constructor();

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                itemPath = paths.resolve(path, paths.create(key));
                if (result instanceof Array) {
                    isDirty(itemPath) && result.push(source[key]);
                } else {
                    isDirty(itemPath) && (result[key] = source[key]);
                }
            }
        }

        return result;
    };

    //***********************************************
    //
    //      Get
    //
    //***********************************************

    var memoiseCache = {};

    // Lots of similarities between get and set, refactor later to reuse code.
    function get(path, model) {
        if (!path) {
            return model;
        }

        var memoiseObject = memoiseCache[path.toString()];
        if(memoiseObject && memoiseObject.model === model){
            return memoiseObject.value;
        }

        if(paths.isRoot(path)){
            return model;
        }

        var pathParts = paths.toParts(path),
            reference = model,
            index = 0,
            pathLength = pathParts.length;

        if(paths.isAbsolute(path)){
            index = 1;
        }

        for(; index < pathLength; index++){
            var key = pathParts[index];

            if (reference == null) {
                break;
            } else if (typeof reference[key] === "object") {
                reference = reference[key];
            } else {
                reference = reference[key];

                // If there are still keys in the path that have not been accessed,
                // return undefined.
                if(index < pathLength - 1){
                    reference = undefined;
                }
                break;
            }
        }

        memoiseCache[path] = {
            model: model,
            value: reference
        };

        return reference;
    }


    //***********************************************
    //
    //      Overwrite Model
    //
    //***********************************************

    function overwriteModel(replacement, model){
        for (var modelProp in model) {
            delete model[modelProp];
        }
        for (var replacementProp in replacement) {
            model[replacementProp] = replacement[replacementProp];
        }
    }


    //***********************************************
    //
    //      Set
    //
    //***********************************************

    function set(path, value, model) {
        // passed a null or undefined path, do nothing.
        if (!path) {
            return;
        }

        memoiseCache = {};

        // If you just pass in an object, you are overwriting the model.
        if (typeof path === "object") {
            value = path;
            path = paths.createRoot();
        }

        var pathParts = paths.toParts(path),
            index = 0,
            pathLength = pathParts.length;

        if(paths.isRoot(path)){
            overwriteModel(value, model);
            return;
        }

        if(paths.isAbsolute(path)){
            index = 1;
        }

        var reference = model;

        for(; index < pathLength; index++){
            var key = pathParts[index];

            // if we have hit a non-object property on the reference and we have more keys after this one
            // make an object (or array) here and move on.
            if ((typeof reference[key] !== "object" || reference[key] === null) && index < pathLength - 1) {
                if (!isNaN(key)) {
                    reference[key] = [];
                }
                else {
                    reference[key] = {};
                }
            }
            if (index === pathLength - 1) {
                // if we are at the end of the line, set to the model
                reference[key] = value;
            }
                //otherwise, RECURSANIZE!
            else {
                reference = reference[key];
            }
        }
    }

    //***********************************************
    //
    //      Remove
    //
    //***********************************************

    function remove(path, model) {
        var reference = model;

        memoiseCache = {};

        var pathParts = paths.toParts(path),
            index = 0,
            pathLength = pathParts.length;

        if(paths.isRoot(path)){
            overwriteModel({}, model);
            return;
        }

        if(paths.isAbsolute(path)){
            index = 1;
        }

        for(; index < pathLength; index++){
            var key = pathParts[index];
            //if we have hit a non-object and we have more keys after this one
            if (typeof reference[key] !== "object" && index < pathLength - 1) {
                break;
            }
            if (index === pathLength - 1) {
                // if we are at the end of the line, delete the last key

                if (reference instanceof Array) {
                    reference.splice(key, 1);
                } else {
                    delete reference[key];
                }
            } else {
                reference = reference[key];
            }
        }

        return reference;
    }


    //***********************************************
    //
    //      Trigger Binding
    //
    //***********************************************

    function trigger(path) {

        var reference = internalBindings,
            references = [reference],
            target = paths.resolve('[/]', path);

        function triggerListeners(reference, sink) {
            if (reference != undefined && reference !== null) {
                for(var index = 0; index < reference.length; index++){
                    var callback = reference[index],
                        callbackBinding = callback.binding,
                        callbackBindingParts,
                        parentPath = callback.parentPath,
                        wildcardIndex = callbackBinding.indexOf(pathConstants.wildcard),
                        wildcardMatchFail;

                    if(wildcardIndex >= 0 && getPathsInExpression(callbackBinding)[0] === callbackBinding){

                        //fully resolve the callback path
                        callbackBindingParts = paths.toParts(paths.resolve('[/]', callback.parentPath, callbackBinding));

                        //null out the now not needed parent path
                        parentPath = null;

                        fastEach(callbackBindingParts, function(pathPart, i){
                            if(pathPart === pathConstants.wildcard){
                                callbackBindingParts[i] = target[i];
                            }else if (pathPart !== target[i]){
                                return wildcardMatchFail = true;
                            }
                        });
                        if(wildcardMatchFail){
                            continue;
                        }
                    }

                    callback({
                        target: target,
                        getValue: function(scope, returnAsTokens){
                            return modelGet(callbackBinding, parentPath, scope, returnAsTokens);
                        }
                    });
                }

                if (sink) {
                    for (var key in reference) {
                        if (reference.hasOwnProperty(key) && Array.isArray(reference[key])) {
                            triggerListeners(reference[key], sink);
                        }
                    }
                }
            }
        }

        var index = 0;

        if(paths.isAbsolute(path)){
            index = 1;
        }

        var pathParts = paths.toParts(path);

        for(; index < pathParts.length; index++){
            var key = pathParts[index];
            if (!isNaN(key) || key in arrayProto) {
                key = "_" + key;
            }

            if (reference !== undefined && reference !== null) {
                reference = reference[key];
                references.push(reference);
            }
        }

        // Top down, less likely to cause changes this way.

        while (references.length > 1) {
            reference = references.shift();
            triggerListeners(reference);
        }

        triggerListeners(references.pop(), true);
    }

    //***********************************************
    //
    //      Pause Model Events
    //
    //***********************************************

    function pauseModelEvents() {
        eventsPaused = true;
    }

    //***********************************************
    //
    //      Resume Model Events
    //
    //***********************************************

    function resumeModelEvents() {
        eventsPaused = false;
    }

    //***********************************************
    //
    //      Set Binding
    //
    //***********************************************

    function setBinding(binding, callback, parentPath) {

        var path,
            reference = internalBindings;

        callback.binding = callback.binding || binding;
        callback.parentPath = parentPath;
        if(!callback.references){
            callback.references = [];
        }

        //If the binding has opperators in it, break them apart and set them individually.
        if (!paths.create(binding)) {
            var expressionPaths = getPathsInExpression(binding),
                boundExpressions = {};

            fastEach(expressionPaths, function (path) {
                if(!boundExpressions[path]){
                    boundExpressions[path] = true;
                    setBinding(path, callback, parentPath);
                }
            });
            return;
        }

        path = binding;

        callback.references.push(path);

        if (parentPath) {
            path = paths.resolve(paths.createRoot(), parentPath, path);
        }

        // Handle wildcards

        var firstWildcardIndex = path.indexOf(pathConstants.wildcard);
        if(firstWildcardIndex>=0){
            path = path.slice(0, firstWildcardIndex);
        }

        if(paths.isRoot(path)){
            reference.push(callback);
            return;
        }

        var index = 0;

        if(paths.isAbsolute(path)){
            index = 1;
        }

        var pathParts = paths.toParts(path);

        for(; index < pathParts.length; index++){
            var key = pathParts[index];

            //escape properties of the array with an underscore.
            // numbers mean a binding has been set on an array index.
            // array property bindings like length can also be set, and thats why all array properties are escaped.
            if (!isNaN(key) || key in arrayProto) {
                key = "_" + key;
            }

            //if we have more keys after this one
            //make an array here and move on.
            if (typeof reference[key] !== "object" && index < pathParts.length - 1) {
                reference[key] = [];
                reference = reference[key];
            }
            else if (index === pathParts.length - 1) {
                // if we are at the end of the line, add the callback
                reference[key] = reference[key] || [];
                reference[key].push(callback);
            }
                //otherwise, RECURSANIZE! (ish...)
            else {
                reference = reference[key];
            }
        }
    }


    //***********************************************
    //
    //      Remove Binding
    //
    //***********************************************

    function removeBinding(path, callback){
        var callbacks;

        if(typeof path === 'function'){
            callback = path;
            path = null;
        }

        var parentPath = callback ? callback.parentPath : null;

        if(path == null){
            if(callback != null && callback.references){
                fastEach(callback.references, function(path){
                    removeBinding(path, callback);
                });
            }else{
                internalBindings = [];
            }
            return;
        }

        var expressionPaths = getPathsInExpression(path);
        if(expressionPaths.length > 1){
            fastEach(expressionPaths, function(path){
                removeBinding(path, callback);
            });
            return;
        }

        var resolvedPathParts = paths.toParts(paths.resolve(parentPath, path)),
            bindingPathParts = [];

        for(var i = 0; i < resolvedPathParts.length; i++){
            if(parseInt(resolvedPathParts[i]).toString() === resolvedPathParts[i]){
                bindingPathParts[i] = '_' + resolvedPathParts[i];
            }else{
                bindingPathParts[i] = resolvedPathParts[i];
            }
        }

        var escapedPath = paths.create(bindingPathParts);

        if(!callback){
            set(escapedPath, [], internalBindings);
        }

        callbacks = get(escapedPath, internalBindings);

        if(!callbacks){
            return;
        }

        for (var i = 0; i < callbacks.length; i++) {
            if(callbacks[i] === callback){
                callbacks.splice(i, 1);
                return;
            }
        }
    }


    //***********************************************
    //
    //      Get Paths
    //
    //***********************************************
    var memoisedExpressionPaths = {};
    function getPathsInExpression(expression) {
        var paths = [];

        if(memoisedExpressionPaths[expression]){
            return memoisedExpressionPaths[expression];
        }

        if (gel) {
            var tokens = gel.tokenise(expression);
            for(var index = 0; index < tokens.length; index++){
            var token = tokens[index];
                if(token instanceof PathToken){
                    paths.push(token.original);
                }
            }
        } else {
            return memoisedExpressionPaths[expression] = [paths.create(expression)];
        }
        return memoisedExpressionPaths[expression] = paths;
    }

    //***********************************************
    //
    //      Model Get
    //
    //***********************************************

    function modelGet(binding, parentPath, scope, returnAsTokens) {
        if(parentPath && typeof parentPath !== "string"){
            scope = parentPath;
            parentPath = paths.create();
        }

        if (binding) {
            var gelResult,
                expression = binding;

            scope = scope || {};

            scope['_gediModelContext_'] = parentPath;

            return gel.evaluate(expression, scope, returnAsTokens);
        }

        parentPath = parentPath || paths.create();

        binding = paths.resolve(parentPath, binding);

        return get(binding, model);
    }

    //***********************************************
    //
    //      Model Set
    //
    //***********************************************

    function getSourcePathInfo(expression, parentPath, subPathOpperation){
        var gelResult,
            scope = {
                _gediModelContext_: parentPath
            };

        var resultToken = gel.evaluate(expression, scope, true)[0],
            sourcePathInfo = resultToken.sourcePathInfo;

        if(sourcePathInfo){
            if(sourcePathInfo.subPaths){
                each(sourcePathInfo.subPaths, function(item){
                    subPathOpperation(item);
                });
                return true;
            }
            expression = sourcePathInfo.path;
        }

        return expression;
    }

    function DeletedItem(){}

    function modelSet(expression, value, parentPath, dirty) {
        if(typeof expression === 'object' && !paths.create(expression)){
            dirty = value;
            value = expression;
            expression = paths.createRoot();
        }else if(typeof parentPath === 'boolean'){
            dirty = parentPath;
            parentPath = undefined;
        }

        if(expression && !arguments[4]){
            expression = getSourcePathInfo(expression, parentPath, function(subPath){
                modelSet(subPath, value, parentPath, dirty, true);
            });
            if(expression === true){
                return;
            }
        }

        parentPath = parentPath || paths.create();
        expression = paths.resolve(parentPath, expression);

        setDirtyState(expression, dirty);

        var previousValue = get(expression, model);

        set(expression, value, model);

        if(!(value instanceof DeletedItem)){
            addModelReference(expression, value);
            trigger(expression);
            triggerModelReferences(expression);
        }

        if(!(value && typeof value !== 'object') && previousValue && typeof previousValue === 'object'){
            removeModelReference(expression, previousValue);
        }
    }

    //***********************************************
    //
    //      Model Remove
    //
    //***********************************************

    function modelRemove(expression, parentPath, dirty) {
        if(parentPath instanceof Boolean){
            dirty = parentPath;
            parentPath = undefined;
        }

        if(expression && !arguments[3]){
            parentPaths = {};
            expression = getSourcePathInfo(expression, parentPath, function(subPath){
                modelSet(subPath, new DeletedItem(), parentPath, dirty, true);
                parentPaths[paths.append(subPath, paths.create(pathConstants.upALevel))] = null;
            });

            for(var key in parentPaths){
                if(parentPaths.hasOwnProperty(key)){
                    var parentObject = get(paths.resolve(parentPath, key), model),
                        isArray = Array.isArray(parentObject);

                    if(isArray){
                        for(var i = 0; i < parentObject.length; i++){
                            if(parentObject[i] instanceof DeletedItem){
                                parentObject.splice(i, 1);
                                i--;
                            }
                        }
                    }else{
                        for(var key in parentObject){
                            if(parentObject[key] instanceof DeletedItem){
                                delete parentObject[key];
                            }
                        }
                    }

                    trigger(key);
                }
            }

            if(expression === true){
                return;
            }
        }

        parentPath = parentPath || paths.create();
        expression = paths.resolve(parentPath, expression);

        setDirtyState(expression, dirty);

        var removedItem = get(expression, model),
            parentObject = remove(expression, model);

        if(Array.isArray(parentObject)){
            //trigger one above
            trigger(paths.resolve('[/]', paths.append(expression, paths.create(pathConstants.upALevel))));
        }else{
            trigger(expression);
        }

        removeModelReference(expression, removedItem);
        triggerModelReferences(expression);
    }

    //***********************************************
    //
    //      Set Dirty State
    //
    //***********************************************

    function setDirtyState(expression, dirty, parentPath) {

        var reference = dirtyModel;

        if(expression && !arguments[3]){
            expression = getSourcePathInfo(expression, parentPath, function(subPath){
                setDirtyState(subPath, dirty, parentPath, true);
            });
            if(expression === true){
                return;
            }
        }

        if(!paths.create(expression)){
            throw exceptions.invalidPath;
        }

        parentPath = parentPath || paths.create();


        dirty = dirty !== false;

        if(paths.isRoot(expression)){
            dirtyModel = {
                '_isDirty_': dirty
            };
            return;
        }

        var index = 0;

        if(paths.isAbsolute(expression)){
            index = 1;
        }

        var pathParts = paths.toParts(paths.resolve(parentPath, expression));

        for(; index < pathParts.length; index++){
            var key = pathParts[index];
            if ((typeof reference[key] !== "object" || reference[key] === null) && index < pathParts.length - 1) {
                reference[key] = {};
            }
            if (index === pathParts.length - 1) {
                reference[key] = {};
                reference[key]['_isDirty_'] = dirty;
            }
            else {
                reference = reference[key];
            }
        }

        if(!pathParts.length){
            dirtyModel['_isDirty_'] = dirty;
        }
    }

    //***********************************************
    //
    //      Is Dirty
    //
    //***********************************************

    function isDirty(path) {
        var reference,
            hasDirtyChildren = function (ref) {
                if (typeof ref !== 'object') {
                    return false;
                }
                if (ref['_isDirty_']) {
                    return true;
                } else {
                    for (var key in ref) {
                        if (hasDirtyChildren(ref[key])) {
                            return true;
                        }
                    }
                }
            };

        reference = get(path, dirtyModel);

        return !!hasDirtyChildren(reference);
    }

    //Public Objects ******************************************************************************


    function Gedi() {}

    Gedi.prototype = {
        paths: {
            create: paths.create,
            resolve: paths.resolve,
            isRoot: paths.isRoot,
            isAbsolute: paths.isAbsolute,
            append: paths.append,
            toParts: paths.toParts
        },

        get: modelGet,

        set: modelSet,

        remove: modelRemove,

        utils: {
            get:get,
            set:set
        },

        init: function (model) {
            this.set(model, false);
        },

        bind: setBinding,

        debind: removeBinding,

        trigger: trigger,

        isDirty: isDirty,

        setDirtyState: setDirtyState,

        gel: gel, // expose gel instance for extension

        getNumberOfBindings: function(){
            function getNumCallbacks(reference){
                var length = reference.length;
                for (var key in reference) {
                    if(isNaN(key)){
                        length += getNumCallbacks(reference[key]);
                    }
                }
                return length;
            }

            return getNumCallbacks(internalBindings);
        }
    };

    return new Gedi();
}

module.exports = gediConstructor;
},{"./pathToken":6,"weakmap":7,"gedi-paths":8,"spec-js":9,"gel-js":10}],7:[function(require,module,exports){
(function(){/* (The MIT License)
 *
 * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the 'Software'), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included with all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
// Updated and bugfixed by Raynos @ https://gist.github.com/1638059
// Expanded by Benvie @ https://github.com/Benvie/harmony-collections

void function(global, undefined_, undefined){
  var getProps = Object.getOwnPropertyNames,
      defProp  = Object.defineProperty,
      toSource = Function.prototype.toString,
      create   = Object.create,
      hasOwn   = Object.prototype.hasOwnProperty,
      funcName = /^\n?function\s?(\w*)?_?\(/;


  function define(object, key, value){
    if (typeof key === 'function') {
      value = key;
      key = nameOf(value).replace(/_$/, '');
    }
    return defProp(object, key, { configurable: true, writable: true, value: value });
  }

  function nameOf(func){
    return typeof func !== 'function'
          ? '' : 'name' in func
          ? func.name : toSource.call(func).match(funcName)[1];
  }

  // ############
  // ### Data ###
  // ############

  var Data = (function(){
    var dataDesc = { value: { writable: true, value: undefined } },
        datalock = 'return function(k){if(k===s)return l}',
        uids     = create(null),

        createUID = function(){
          var key = Math.random().toString(36).slice(2);
          return key in uids ? createUID() : uids[key] = key;
        },

        globalID = createUID(),

        storage = function(obj){
          if (hasOwn.call(obj, globalID))
            return obj[globalID];

          if (!Object.isExtensible(obj))
            throw new TypeError("Object must be extensible");

          var store = create(null);
          defProp(obj, globalID, { value: store });
          return store;
        };

    // common per-object storage area made visible by patching getOwnPropertyNames'
    define(Object, function getOwnPropertyNames(obj){
      var props = getProps(obj);
      if (hasOwn.call(obj, globalID))
        props.splice(props.indexOf(globalID), 1);
      return props;
    });

    function Data(){
      var puid = createUID(),
          secret = {};

      this.unlock = function(obj){
        var store = storage(obj);
        if (hasOwn.call(store, puid))
          return store[puid](secret);

        var data = create(null, dataDesc);
        defProp(store, puid, {
          value: new Function('s', 'l', datalock)(secret, data)
        });
        return data;
      }
    }

    define(Data.prototype, function get(o){ return this.unlock(o).value });
    define(Data.prototype, function set(o, v){ this.unlock(o).value = v });

    return Data;
  }());


  var WM = (function(data){
    var validate = function(key){
      if (key == null || typeof key !== 'object' && typeof key !== 'function')
        throw new TypeError("Invalid WeakMap key");
    }

    var wrap = function(collection, value){
      var store = data.unlock(collection);
      if (store.value)
        throw new TypeError("Object is already a WeakMap");
      store.value = value;
    }

    var unwrap = function(collection){
      var storage = data.unlock(collection).value;
      if (!storage)
        throw new TypeError("WeakMap is not generic");
      return storage;
    }

    var initialize = function(weakmap, iterable){
      if (iterable !== null && typeof iterable === 'object' && typeof iterable.forEach === 'function') {
        iterable.forEach(function(item, i){
          if (item instanceof Array && item.length === 2)
            set.call(weakmap, iterable[i][0], iterable[i][1]);
        });
      }
    }


    function WeakMap(iterable){
      if (this === global || this == null || this === WeakMap.prototype)
        return new WeakMap(iterable);

      wrap(this, new Data);
      initialize(this, iterable);
    }

    function get(key){
      validate(key);
      var value = unwrap(this).get(key);
      return value === undefined_ ? undefined : value;
    }

    function set(key, value){
      validate(key);
      // store a token for explicit undefined so that "has" works correctly
      unwrap(this).set(key, value === undefined ? undefined_ : value);
    }

    function has(key){
      validate(key);
      return unwrap(this).get(key) !== undefined;
    }

    function delete_(key){
      validate(key);
      var data = unwrap(this),
          had = data.get(key) !== undefined;
      data.set(key, undefined);
      return had;
    }

    function toString(){
      unwrap(this);
      return '[object WeakMap]';
    }

    try {
      var src = ('return '+delete_).replace('e_', '\\u0065'),
          del = new Function('unwrap', 'validate', src)(unwrap, validate);
    } catch (e) {
      var del = delete_;
    }

    var src = (''+Object).split('Object');
    var stringifier = function toString(){
      return src[0] + nameOf(this) + src[1];
    };

    define(stringifier, stringifier);

    var prep = { __proto__: [] } instanceof Array
      ? function(f){ f.__proto__ = stringifier }
      : function(f){ define(f, stringifier) };

    prep(WeakMap);

    [toString, get, set, has, del].forEach(function(method){
      define(WeakMap.prototype, method);
      prep(method);
    });

    return WeakMap;
  }(new Data));

  var defaultCreator = Object.create
    ? function(){ return Object.create(null) }
    : function(){ return {} };

  function createStorage(creator){
    var weakmap = new WM;
    creator || (creator = defaultCreator);

    function storage(object, value){
      if (value || arguments.length === 2) {
        weakmap.set(object, value);
      } else {
        value = weakmap.get(object);
        if (value === undefined) {
          value = creator(object);
          weakmap.set(object, value);
        }
      }
      return value;
    }

    return storage;
  }


  if (typeof module !== 'undefined') {
    module.exports = WM;
  } else if (typeof exports !== 'undefined') {
    exports.WeakMap = WM;
  } else if (!('WeakMap' in global)) {
    global.WeakMap = WM;
  }

  WM.createStorage = createStorage;
  if (global.WeakMap)
    global.WeakMap.createStorage = createStorage;
}((0, eval)('this'));

})()
},{}],9:[function(require,module,exports){
Object.create = Object.create || function (o) {
    if (arguments.length > 1) {
        throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
};

function createSpec(child, parent){
    var parentPrototype;
    
    if(!parent) {
        parent = Object;
    }
    
    if(!parent.prototype) {
        parent.prototype = {};
    }
    
    parentPrototype = parent.prototype;
    
    child.prototype = Object.create(parent.prototype);
    child.prototype.__super__ = parentPrototype;
    
    // Yes, This is 'bad'. However, it runs once per Spec creation.
    var spec = new Function("child", "return function " + child.name + "(){child.prototype.__super__.constructor.apply(this, arguments);return child.apply(this, arguments);}")(child);
    
    spec.prototype = child.prototype;
    spec.prototype.constructor = child.prototype.constructor = spec;
    
    return spec;
}

module.exports = createSpec;
},{}],6:[function(require,module,exports){
var Lang = require('lang-js'),
    Token = Lang.Token,
    paths = require('gedi-paths'),
    createSpec = require('spec-js'),
    detectPath = require('gedi-paths/detectPath');

module.exports = function(get, model){

    function PathToken(){}
    PathToken = createSpec(PathToken, Token);
    PathToken.prototype.name = 'PathToken';
    PathToken.prototype.precedence = 4;
    PathToken.tokenise = function(substring){
        var path = detectPath(substring);

        if(path){
            return new PathToken(path, path.length);
        }
    };
    PathToken.prototype.evaluate = function(scope){
        this.path = this.original;
        this.result = get(paths.resolve(scope.get('_gediModelContext_'), this.original), model);
        this.sourcePathInfo = {
            path: this.original
        };
    };

    return PathToken;
}
},{"gedi-paths/detectPath":11,"lang-js":12,"gedi-paths":8,"spec-js":9}],8:[function(require,module,exports){
var detectPath = require('./detectPath');

var pathSeparator = "/",
    upALevel = "..",
    currentKey = "#",
    rootPath = "",
    pathStart = "[",
    pathEnd = "]",
    pathWildcard = "*";

function pathToRaw(path) {
    return path && path.slice(1, -1);
}

//***********************************************
//
//      Raw To Path
//
//***********************************************

function rawToPath(rawPath) {
    return pathStart + (rawPath == null ? '' : rawPath) + pathEnd;
}

var memoisePathCache = {};
function resolvePath() {
    var memoiseKey = '';

    for(var argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++){
        memoiseKey += arguments[argumentIndex];
    }

    if(memoisePathCache[memoiseKey]){
        return memoisePathCache[memoiseKey];
    }

    var absoluteParts = [],
        lastRemoved,
        pathParts,
        pathPart;

    for(var argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++){
        pathParts = pathToParts(arguments[argumentIndex]);

        if(!pathParts || !pathParts.length){
            continue;
        }

        for(var pathPartIndex = 0; pathPartIndex < pathParts.length; pathPartIndex++){
            pathPart = pathParts[pathPartIndex];

            if(pathParts.length === 0){
                // Empty path, maintain parent path.
            } else if (pathPart === currentKey) {
                // Has a last removed? Add it back on.
                if(lastRemoved != null){
                    absoluteParts.push(lastRemoved);
                    lastRemoved = null;
                }
            } else if (pathPart === rootPath) {
                // Root path? Reset parts to be absolute.
                absoluteParts = [''];

            } else if (pathPart === upALevel) {
                // Up a level? Remove the last item in absoluteParts
                lastRemoved = absoluteParts.pop();
            } else if (pathPart.slice(0,2) === upALevel) {
                var argument = pathPart.slice(2);
                //named
                while(absoluteParts.slice(-1).pop() !== argument){
                    if(absoluteParts.length === 0){
                        throw "Named path part was not found: '" + pathPart + "', in path: '" + arguments[argumentIndex] + "'.";
                    }
                    lastRemoved = absoluteParts.pop();
                }
            } else {
                // any following valid part? Add it to the absoluteParts.
                absoluteParts.push(pathPart);
            }
        }
    }

    // Convert the absoluteParts to a Path and memoise the result.
    return memoisePathCache[memoiseKey] = createPath(absoluteParts);
}

var memoisedPathTokens = {};

function createPath(path){

    if(typeof path === 'number'){
        path = path.toString();
    }

    if(path == null){
        return rawToPath();
    }

    // passed in an Expression or an 'expression formatted' Path (eg: '[bla]')
    if (typeof path === "string"){

        if(memoisedPathTokens[path]){
            return memoisedPathTokens[path];
        }

        if(path.charAt(0) === pathStart) {
            var pathString = path.toString(),
                detectedPath = detectPath(pathString);

            if (detectedPath && detectedPath.length === pathString.length) {
                return memoisedPathTokens[pathString] = detectedPath;
            } else {
                return false;
            }
        }else{
            return createPath(rawToPath(path));
        }
    }

    if(path instanceof Array) {

        var parts = [];
        for (var i = 0; i < path.length; i++) {
            var pathPart = path[i];
            if(pathPart.indexOf('\\') >= 0){
                pathPart = pathPart.replace(/([\[|\]|\\|\/])/g, '\\$1');
            }
            parts.push(pathPart);
        }
        return rawToPath(parts.join(pathSeparator));
    }
}

function createRootPath(){
    return createPath([rootPath, rootPath]);
}

function pathToParts(path){
    if(!path){
        return;
    }
    if(Array.isArray(path)){
        return path;
    }

    path = path.slice(1,-1);

    var lastPartIndex = 0,
        parts,
        nextChar,
        currentChar;

    if(path.indexOf('\\') < 0){
        if(path === ""){
            return [];
        }
        return path.split(pathSeparator);
    }

    parts = [];

    for(var i = 0; i < path.length; i++){
        currentChar = path.charAt(i);
        if(currentChar === pathSeparator){
            parts.push(path.slice(lastPartIndex,i));
            lastPartIndex = i+1;
        }else if(currentChar === '\\'){
            nextChar = path.charAt(i+1);
            if(nextChar === '\\'){
                path = path.slice(0, i) + path.slice(i + 1);
            }else if(nextChar === ']' || nextChar === '['){
                path = path.slice(0, i) + path.slice(i + 1);
            }else if(nextChar === pathSeparator){
                parts.push(path.slice(lastPartIndex), i);
            }
        }
    }
    parts.push(path.slice(lastPartIndex));

    return parts;
}

function appendPath(){
    var parts = pathToParts(arguments[0]);

    if(!parts){
        return;
    }

    for (var argumentIndex = 1; argumentIndex < arguments.length; argumentIndex++) {
        var pathParts = pathToParts(arguments[argumentIndex]);
        for (var partIndex = 0; partIndex < pathParts.length; partIndex++) {
                parts.push(pathParts[partIndex]);
        }
    }

    return createPath(parts);
}

function isPathAbsolute(path){
    return pathToParts(path)[0] === rootPath;
}

function isPathRoot(path){
    var parts = pathToParts(path);
    return (isPathAbsolute(parts) && parts[0] === parts[1]) || parts.length === 0;
}

module.exports = {
    resolve: resolvePath,
    create: createPath,
    isAbsolute: isPathAbsolute,
    isRoot: isPathRoot,
    append: appendPath,
    toParts: pathToParts,
    createRoot: createRootPath,
    constants:{
        separator: pathSeparator,
        upALevel: upALevel,
        currentKey: currentKey,
        root: rootPath,
        start: pathStart,
        end: pathEnd,
        wildcard: pathWildcard
    }
};
},{"./detectPath":11}],10:[function(require,module,exports){
var Lang = require('lang-js'),
    paths = require('gedi-paths'),
    createNestingParser = Lang.createNestingParser,
    detectString = Lang.detectString,
    Token = Lang.Token,
    Scope = Lang.Scope,
    createSpec = require('spec-js');

function fastEach(items, callback) {
    for (var i = 0; i < items.length; i++) {
        if (callback(items[i], i, items)) break;
    }
    return items;
}

function stringFormat(string, values){
    return string.replace(/{(\d+)}/g, function(match, number) {
        return values[number] != null
          ? values[number]
          : ''
        ;
    });
}

function isIdentifier(substring){
    var valid = /^[$A-Z_][0-9A-Z_$]*/i,
        possibleIdentifier = substring.match(valid);

    if (possibleIdentifier && possibleIdentifier.index === 0) {
        return possibleIdentifier[0];
    }
}

function tokeniseIdentifier(substring){
    // searches for valid identifiers or operators
    //operators
    var operators = "!=<>/&|*%-^?+\\",
        index = 0;

    while (operators.indexOf(substring.charAt(index)||null) >= 0 && ++index) {}

    if (index > 0) {
        return substring.slice(0, index);
    }

    var identifier = isIdentifier(substring);

    if(identifier != null){
        return identifier;
    }
}

function createKeywordTokeniser(Constructor, keyword){
    return function(substring){
        substring = isIdentifier(substring);
        if (substring === keyword) {
            return new Constructor(substring, substring.length);
        }
    };
}

function StringToken(){}
StringToken = createSpec(StringToken, Token);
StringToken.prototype.precedence = 2;
StringToken.prototype.stringTerminal = '"';
StringToken.prototype.name = 'StringToken';
StringToken.tokenise = function (substring) {
    if (substring.charAt(0) === this.prototype.stringTerminal) {
        var index = 0,
        escapes = 0;

        while (substring.charAt(++index) !== this.prototype.stringTerminal)
        {
           if(index >= substring.length){
                   throw "Unclosed " + this.name;
           }
           if (substring.charAt(index) === '\\' && substring.charAt(index+1) === this.prototype.stringTerminal) {
                   substring = substring.slice(0, index) + substring.slice(index + 1);
                   escapes++;
           }
        }

        return new this(
            substring.slice(0, index+1),
            index + escapes + 1
        );
    }
}
StringToken.prototype.evaluate = function () {
    this.result = this.original.slice(1,-1);
}

function String2Token(){}
String2Token = createSpec(String2Token, StringToken);
String2Token.prototype.stringTerminal = "'";
String2Token.prototype.name = 'String2Token';
String2Token.tokenise = StringToken.tokenise;

function ParenthesesToken(){
}
ParenthesesToken = createSpec(ParenthesesToken, Token);
ParenthesesToken.prototype.name = 'ParenthesesToken';
ParenthesesToken.tokenise = function(substring) {
    if(substring.charAt(0) === '(' || substring.charAt(0) === ')'){
        return new ParenthesesToken(substring.charAt(0), 1);
    }
}
ParenthesesToken.prototype.parse = createNestingParser(/^\($/,/^\)$/);
ParenthesesToken.prototype.evaluate = function(scope){
    scope = new Scope(scope);

    var functionToken = this.childTokens[0];

    if(!functionToken){
        throw "Invalid function call. No function was provided to execute.";
    }

    functionToken.evaluate(scope);

    if(typeof functionToken.result !== 'function'){
        throw functionToken.original + " (" + functionToken.result + ")" + " is not a function";
    }

    this.result = scope.callWith(functionToken.result, this.childTokens.slice(1), this);
};

function NumberToken(){}
NumberToken = createSpec(NumberToken, Token);
NumberToken.prototype.name = 'NumberToken';
NumberToken.tokenise = function(substring) {
    var specials = {
        "NaN": Number.NaN,
        "-NaN": Number.NaN,
        "Infinity": Infinity,
        "-Infinity": -Infinity
    };
    for (var key in specials) {
        if (substring.slice(0, key.length) === key) {
            return new NumberToken(key, key.length);
        }
    }

    var valids = "0123456789-.Eex",
        index = 0;

    while (valids.indexOf(substring.charAt(index)||null) >= 0 && ++index) {}

    if (index > 0) {
        var result = substring.slice(0, index);
        if(isNaN(parseFloat(result))){
            return;
        }
        return new NumberToken(result, index);
    }

    return;
};
NumberToken.prototype.evaluate = function(scope){
    this.result = parseFloat(this.original);
};

function ValueToken(value, path, key){
    this.result = value;
    this.sourcePathInfo = new SourcePathInfo();
    this.sourcePathInfo.path = path;
    this.sourcePathInfo.drillTo(key);
}
ValueToken = createSpec(ValueToken, Token);
ValueToken.prototype.name = 'ValueToken';
ValueToken.prototype.evaluate = function(){};
ValueToken.prototype.precedence = 2;

function NullToken(){}
NullToken = createSpec(NullToken, Token);
NullToken.prototype.name = 'NullToken';
NullToken.prototype.precedence = 2;
NullToken.tokenise = createKeywordTokeniser(NullToken, "null");
NullToken.prototype.evaluate = function(scope){
    this.result = null;
};

function UndefinedToken(){}
UndefinedToken = createSpec(UndefinedToken, Token);
UndefinedToken.prototype.name = 'UndefinedToken';
UndefinedToken.prototype.precedence = 2;
UndefinedToken.tokenise = createKeywordTokeniser(UndefinedToken, 'undefined');
UndefinedToken.prototype.evaluate = function(scope){
    this.result = undefined;
};

function TrueToken(){}
TrueToken = createSpec(TrueToken, Token);
TrueToken.prototype.name = 'TrueToken';
TrueToken.prototype.precedence = 2;
TrueToken.tokenise = createKeywordTokeniser(TrueToken, 'true');
TrueToken.prototype.evaluate = function(scope){
    this.result = true;
};

function FalseToken(){}
FalseToken = createSpec(FalseToken, Token);
FalseToken.prototype.name = 'FalseToken';
FalseToken.prototype.precedence = 2;
FalseToken.tokenise = createKeywordTokeniser(FalseToken, 'false');
FalseToken.prototype.evaluate = function(scope){
    this.result = false;
};

function DelimiterToken(){}
DelimiterToken = createSpec(DelimiterToken, Token);
DelimiterToken.prototype.name = 'DelimiterToken';
DelimiterToken.prototype.precedence = 2;
DelimiterToken.tokenise = function(substring) {
    var i = 0;
    while(i < substring.length && substring.charAt(i).trim() === "" || substring.charAt(i) === ',') {
        i++;
    }

    if(i){
        return new DelimiterToken(substring.slice(0, i), i);
    }
};
DelimiterToken.prototype.parse = function(tokens, position){
    tokens.splice(position, 1);
};

function IdentifierToken(){}
IdentifierToken = createSpec(IdentifierToken, Token);
IdentifierToken.prototype.name = 'IdentifierToken';
IdentifierToken.prototype.precedence = 3;
IdentifierToken.tokenise = function(substring){
    var result = tokeniseIdentifier(substring);

    if(result != null){
        return new IdentifierToken(result, result.length);
    }
};
IdentifierToken.prototype.evaluate = function(scope){
    this.result = scope.get(this.original);
    this.sourcePathInfo = scope.get('__sourcePathInfoFor__' + this.original);
};

function PeriodToken(){}
PeriodToken = createSpec(PeriodToken, Token);
PeriodToken.prototype.name = 'PeriodToken';
PeriodToken.prototype.precedence = 1;
PeriodToken.tokenise = function(substring){
    var periodConst = ".";
    return (substring.charAt(0) === periodConst) ? new PeriodToken(periodConst, 1) : undefined;
};
PeriodToken.prototype.parse = function(tokens, position){
    this.targetToken = tokens.splice(position-1,1)[0];
    this.identifierToken = tokens.splice(position,1)[0];
};
PeriodToken.prototype.evaluate = function(scope){
    this.targetToken.evaluate(scope);
    if(
        this.targetToken.result &&
        (typeof this.targetToken.result === 'object' || typeof this.targetToken.result === 'function')
        && this.targetToken.result.hasOwnProperty(this.identifierToken.original)
    ){
        this.result = this.targetToken.result[this.identifierToken.original];
    }else{
        this.result = undefined;
    }

    var targetPath;

    if(this.targetToken.sourcePathInfo){
        targetPath = this.targetToken.sourcePathInfo.path
    }

    if(targetPath){
        this.sourcePathInfo = {
            path: paths.append(targetPath, paths.create(this.identifierToken.original))
        };
    }
};

function FunctionToken(){}
FunctionToken = createSpec(FunctionToken, Token);
FunctionToken.prototype.name = 'FunctionToken';
FunctionToken.tokenise = function convertFunctionToken(substring) {
    if(substring.charAt(0) === '{' || substring.charAt(0) === '}'){
        return new FunctionToken(substring.charAt(0), 1);
    }
};
FunctionToken.prototype.parse = createNestingParser(/^\{$/,/^\}$/);
FunctionToken.prototype.evaluate = function(scope){
    var parameterNames = this.childTokens.slice(),
        fnBody = parameterNames.pop();

    this.result = function(scope, args){
        scope = new scope.constructor(scope);

        for(var i = 0; i < parameterNames.length; i++){
            var parameterToken = args.getRaw(i);
            scope.set(parameterNames[i].original, args.get(i));
            if(parameterToken instanceof Token && parameterToken.sourcePathInfo){
                scope.set('__sourcePathInfoFor__' + parameterNames[i].original, parameterToken.sourcePathInfo);
            }
        }

        fnBody.evaluate(scope);

        if(args.callee){
            args.callee.sourcePathInfo = fnBody.sourcePathInfo;
        }

        return fnBody.result;
    };
};

function SourcePathInfo(token, source, trackSubPaths){
    var innerPathInfo;

    if(trackSubPaths && source){
        this.subPaths = typeof source === 'object' && new source.constructor();
    }

    if(token){
        innerPathInfo = token.sourcePathInfo;

        if(token instanceof Token && token.name === 'PathToken'){
            originPath = token.original;
            this.original = source;
        }
    }

    this.innerPathInfo = innerPathInfo;


    this.original = innerPathInfo && innerPathInfo.original || source;
    this.path = innerPathInfo && innerPathInfo.path;
}
SourcePathInfo.prototype.setSubPath = function(to, key){
    if(!this.subPaths){
        return;
    }
    this.subPaths[to] = this.innerPathInfo && this.innerPathInfo.subPaths && this.innerPathInfo.subPaths[key] || paths.append(this.path, paths.create(key));
};
SourcePathInfo.prototype.pushSubPath = function(key){
    if(!this.subPaths){
        return;
    }
    this.setSubPath(this.subPaths.length, key);
};
SourcePathInfo.prototype.setSubPaths = function(paths){
    if(!this.subPaths){
        return;
    }
    this.subPaths = paths;
};
SourcePathInfo.prototype.drillTo = function(key){
    if(this.subPaths){
        this.path = this.subPaths[key];
    }
    if(this.path){
        this.path = paths.append(this.path, paths.create(key));
    }
};

function ksort(array, sourceSubPaths, scope, sortFunction){

    if(array.length < 2){
        return {
            values: array,
            paths: sourceSubPaths
        };
    }

    var source = array.slice(),
        left = [],
        pivot = source.splice(source.length/2,1).pop(),
        pivotPath = sourceSubPaths.splice(sourceSubPaths.length/2,1).pop(),
        right = [],
        result,
        resultPaths;

    var leftPaths = [];
    var rightPaths = [];

    for(var i = 0; i < source.length; i++){
        var item = source[i];
        if(scope.callWith(sortFunction, [item, pivot]) > 0){
            right.push(item);
            rightPaths.push(sourceSubPaths[i]);
        }else{
            left.push(item);
            leftPaths.push(sourceSubPaths[i]);
        }
    }

    var leftResult = ksort(left, leftPaths, scope, sortFunction);

    left = leftResult.values;
    leftPaths = leftResult.paths;

    left.push(pivot);
    leftPaths.push(pivotPath);

    var rightResult = ksort(right, rightPaths, scope, sortFunction);

    right = rightResult.values;
    rightPaths = rightResult.paths;

    resultPaths = leftPaths.concat(rightPaths);

    result = left.concat(right);

    return {
        values: result,
        paths: resultPaths
    };
}

function addFilterResult(filteredItems, item, key, sourcePathInfo, isArray){
    if(isArray){
        filteredItems.push(item);
    }else{
        filteredItems[key] = item;
    }
    sourcePathInfo.pushSubPath(key);
}

function gelFilter(scope, args) {
    var source = args.get(0),
        sourcePathInfo = new SourcePathInfo(args.getRaw(0), source, true),
        filteredItems = source && typeof source === 'object' && new source.constructor();

    var functionToCompare = args.get(1);

    if(!filteredItems){
        return undefined;
    }

    var isArray = Array.isArray(source),
        item;

    for(var key in source){
        if(isArray && isNaN(key)){
            continue;
        }
        item = source[key];
        if(typeof functionToCompare === "function"){
            if(scope.callWith(functionToCompare, [item])){
                addFilterResult(filteredItems, item, key, sourcePathInfo, isArray);
            }
        }else{
            if(item === functionToCompare){
                addFilterResult(filteredItems, item, key, sourcePathInfo, isArray);
            }
        }
    }

    args.callee.sourcePathInfo = sourcePathInfo;

    return filteredItems;
}

var tokenConverters = [
        StringToken,
        String2Token,
        ParenthesesToken,
        NumberToken,
        NullToken,
        UndefinedToken,
        TrueToken,
        FalseToken,
        DelimiterToken,
        IdentifierToken,
        PeriodToken,
        FunctionToken
    ],
    scope = {
        "toString":function(scope, args){
            return "" + args.next();
        },
        "+":function(scope, args){
            return args.next() + args.next();
        },
        "-":function(scope, args){
            return args.next() - args.next();
        },
        "/":function(scope, args){
            return args.next() / args.next();
        },
        "*":function(scope, args){
            return args.next() * args.next();
        },
        "isNaN":function(scope, args){
            return isNaN(args.get(0));
        },
        "max":function(scope, args){
            var result = args.next();
            while(args.hasNext()){
                result = Math.max(result, args.next());
            }
            return result;
        },
        "min":function(scope, args){
            var result = args.next();
            while(args.hasNext()){
                result = Math.min(result, args.next());
            }
            return result;
        },
        ">":function(scope, args){
            return args.next() > args.next();
        },
        "<":function(scope, args){
            return args.next() < args.next();
        },
        ">=":function(scope, args){
            return args.next() >= args.next();
        },
        "<=":function(scope, args){
            return args.next() <= args.next();
        },
        "?":function(scope, args){
            var result,
                resultToken;
            if(args.next()){
                result = args.get(1);
                resultToken = args.getRaw(1);
            }else{
                result = args.get(2);
                resultToken = args.getRaw(2);
            }

            args.callee.sourcePathInfo = resultToken && resultToken.sourcePathInfo;

            return result;
        },
        "!":function(scope, args){
            return !args.next();
        },
        "=":function(scope, args){
            return args.next() == args.next();
        },
        "==":function(scope, args){
            return args.next() === args.next();
        },
        "!=":function(scope, args){
            return args.next() != args.next();
        },
        "!==":function(scope, args){
            return args.next() !== args.next();
        },
        "||":function(scope, args){
            var nextArg;
            while(args.hasNext()){
                nextArg = args.next();
                if(nextArg){
                    return nextArg;
                }
            }
            return nextArg;
        },
        "|":function(scope, args){
            var nextArg;
            while(args.hasNext()){
                nextArg = args.next();
                if(nextArg === true ){
                    return nextArg;
                }
            }
            return nextArg;
        },
        "&&":function(scope, args){
            var nextArg;
            while(args.hasNext()){
                nextArg = args.next();
                if(!nextArg){
                    return false;
                }
            }
            return nextArg;
        },
        "object":function(scope, args){
            var result = {};
            while(args.hasNext()){
                result[args.next()] = args.next();
            }
            return result;
        },
        "keys":function(scope, args){
            var object = args.next();
            return typeof object === 'object' ? Object.keys(object) : undefined;
        },
        "values":function(scope, args){
            var target = args.next(),
                result = [];
            for(var key in target){
                result.push(target[key]);
            }
            return result;
        },
        "invert":function(scope, args){
            var target = args.next(),
                result = {};
            for(var key in target){
                result[target[key]] = key;
            }
            return result;
        },
        "extend":function(scope, args){
            var result = {};
            while(args.hasNext()){
                var nextObject = args.next();
                for(var key in nextObject){
                    result[key] = nextObject[key];
                }
            }
            return result;
        },
        "array":function(scope, args){
            var result = [];
            while(args.hasNext()){
                result.push(args.next());
            }
            return result;
        },
        "map":function(scope, args){
            var source = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source, true),
                isArray = Array.isArray(source),
                result = isArray ? [] : {},
                functionToken = args.next();

            if(isArray){
                fastEach(source, function(item, index){
                    var callee = {};
                    result[index] = scope.callWith(functionToken, [new ValueToken(item, sourcePathInfo.path, index)], callee);
                    if(callee.sourcePathInfo){
                        sourcePathInfo.subPaths[index] = callee.sourcePathInfo.path;
                    }
                });
            }else{
                for(var key in source){
                    var callee = {};
                    result[key] = scope.callWith(functionToken, [new ValueToken(source[key], sourcePathInfo.path, key)], callee);
                    if(callee.sourcePathInfo){
                        sourcePathInfo.subPaths[key] = callee.sourcePathInfo.path;
                    }
                };
            }

            args.callee.sourcePathInfo = sourcePathInfo;

            return result;
        },
        "pairs": function(scope, args){
            var target = args.next(),
                result = [];

            for(var key in target){
                if(target.hasOwnProperty(key)){
                    result.push([key, target[key]]);
                }
            }

            return result;
        },
        "flatten":function(scope, args){
            var target = args.next(),
                shallow = args.hasNext() && args.next();

            function flatten(target){
                var result = [],
                    source;

                for(var i = 0; i < target.length; i++){
                    source = target[i];

                    for(var j = 0; j < source.length; j++){
                        if(!shallow && Array.isArray(source[j])){
                            result.push(flatten(source));
                        }else{
                            result.push(target[i][j]);
                        }
                    }
                }
                return result;
            }
            return flatten(target);
        },
        "sort": function(scope, args) {
            var source = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source, true),
                sortFunction = args.next(),
                result,
                sourceArrayKeys,
                sortValues = [];

            if(!Array.isArray(source)){
                return;
            }

            for(var i = 0; i < source.length; i++){
                sourcePathInfo.setSubPath(i, i);
            }

            result = ksort(source, sourcePathInfo.subPaths, scope, sortFunction);
            sourcePathInfo.setSubPaths(result.paths);

            args.callee.sourcePathInfo = sourcePathInfo;

            return result.values;
        },
        "filter": gelFilter,
        "findOne": function(scope, args) {
            var source = args.next(),
                functionToCompare = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source),
                result;

            if (Array.isArray(source)) {

                fastEach(source, function(item, index){
                    if(scope.callWith(functionToCompare, [item])){
                        result = item;
                        sourcePathInfo.drillTo(index);
                        args.callee.sourcePathInfo = sourcePathInfo;
                        return true;
                    }
                });
                return result;
            }
        },
        "concat":function(scope, args){
            var result = args.next(),
                argCount = 0,
                sourcePathInfo = new SourcePathInfo(),
                sourcePaths = Array.isArray(result) && [];

            var addPaths = function(){
                if(sourcePaths){
                    var argToken = args.getRaw(argCount++),
                        argSourcePathInfo = argToken && argToken.sourcePathInfo;

                    if(argSourcePathInfo){
                        if(Array.isArray(argSourcePathInfo.subPaths)){
                        sourcePaths = sourcePaths.concat(argSourcePathInfo.subPaths);
                        }else{
                            for(var i = 0; i < argToken.result.length; i++){
                                sourcePaths.push(paths.append(argSourcePathInfo.path, paths.create(i)));
                            }
                        }
                    }
                }
            }

            addPaths();

            while(args.hasNext()){
                if(result == null || !result.concat){
                    return undefined;
                }
                var next = args.next();
                Array.isArray(next) && (result = result.concat(next));
                addPaths();
            }
            sourcePathInfo.subPaths = sourcePaths;
            args.callee.sourcePathInfo = sourcePathInfo;
            return result;
        },
        "join":function(scope, args){
            args = args.all();

            return args.slice(1).join(args[0]);
        },
        "slice":function(scope, args){
            var sourceTokenIndex = 0,
                source = args.next(),
                start,
                end,
                sourcePathInfo;

            if(args.hasNext()){
                start = source;
                source = args.next();
                sourceTokenIndex++;
            }
            if(args.hasNext()){
                end = source;
                source = args.next();
                sourceTokenIndex++;
            }

            if(!source || !source.slice){
                return;
            }

            // clone source
            source = source.slice();

            sourcePathInfo = new SourcePathInfo(args.getRaw(sourceTokenIndex), source, true);

            var result = source.slice(start, end);

            sourcePathInfo.setSubPaths(sourcePathInfo.innerPathInfo && sourcePathInfo.innerPathInfo.subPaths && sourcePathInfo.innerPathInfo.subPaths.slice(start, end));

            args.callee.sourcePathInfo = sourcePathInfo;

            return result;
        },
        "split":function(scope, args){
            var target = args.next();
            return target ? target.split(args.hasNext() && args.next()) : undefined;
        },
        "last":function(scope, args){
            var source = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source);

            sourcePathInfo.drillTo(source.length - 1);

            args.callee.sourcePathInfo = sourcePathInfo;

            if(!Array.isArray(source)){
                return;
            }
            return source[source.length - 1];
        },
        "first":function(scope, args){
            var source = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source);

            sourcePathInfo.drillTo(0);

            args.callee.sourcePathInfo = sourcePathInfo;

            if(!Array.isArray(source)){
                return;
            }
            return source[0];
        },
        "length":function(scope, args){
            return args.next().length;
        },
        "getValue":function(scope, args){
            var source = args.next(),
                key = args.next(),
                sourcePathInfo = new SourcePathInfo(args.getRaw(0), source);

            sourcePathInfo.drillTo(key);

            args.callee.sourcePathInfo = sourcePathInfo;

            if(!source || typeof source !== 'object'){
                return;
            }

            return source[key];
        },
        "compare":function(scope, args){
            var args = args.all(),
                comparitor = args.pop(),
                reference = args.pop(),
                result = true,
                objectToCompare;

            while(args.length){
                objectToCompare = args.pop();
                for(var key in objectToCompare){
                    if(!scope.callWith(comparitor, [objectToCompare[key], reference[key]])){
                        result = false;
                    }
                }
            }

            return result;
        },
        "contains": function(scope, args){
            var args = args.all(),
                target = args.shift(),
                success = false,
                strict = false,
                arg;

            if(target == null){
                return;
            }

            if(typeof target === 'boolean'){
                strict = target;
                target = args.shift();
            }

            arg = args.pop();

            if(target == null || !target.indexOf){
                return;
            }

            if(typeof arg === "string" && !strict){
                arg = arg.toLowerCase();

                if(Array.isArray(target)){
                    fastEach(target, function(targetItem){
                        if(typeof targetItem === 'string' && targetItem.toLowerCase() === arg.toLowerCase()){
                            return success = true;
                        }
                    });
                }else{
                    if(typeof target === 'string' && target.toLowerCase().indexOf(arg)>=0){
                        return success = true;
                    }
                }
                return success;
            }else{
                return target.indexOf(arg)>=0;
            }
        },
        "charAt":function(scope, args){
            var target = args.next(),
                position;

            if(args.hasNext()){
                position = args.next();
            }

            if(typeof target !== 'string'){
                return;
            }

            return target.charAt(position);
        },
        "toLowerCase":function(scope, args){
            var target = args.next();

            if(typeof target !== 'string'){
                return undefined;
            }

            return target.toLowerCase();
        },
        "toUpperCase":function(scope, args){
            var target = args.next();

            if(typeof target !== 'string'){
                return undefined;
            }

            return target.toUpperCase();
        },
        "format": function format(scope, args) {
            var args = args.all();

            if(!args[0]){
                return;
            }

            return stringFormat(args.shift(), args);
        },
        "refine": function(scope, args){
            var args = args.all(),
                exclude = typeof args[0] === "boolean" && args.shift(),
                original = args.shift(),
                refined = {};

            for(var i = 0; i < args.length; i++){
                args[i] = args[i].toString();
            }

            for(var key in original){
                if(args.indexOf(key)>=0){
                    !exclude && (refined[key] = original[key]);
                }else if(exclude){
                    refined[key] = original[key];
                }
            }

            return refined;
        },
        "date": (function(){
            var date = function(scope, args) {
                return args.length ? new Date(args.length > 1 ? args.all() : args.next()) : new Date();
            };

            date.addDays = function(scope, args){
                var baseDate = args.next();

                return new Date(baseDate.setDate(baseDate.getDate() + args.next()));
            }

            return date;
        })(),
        "toJSON":function(scope, args){
            return JSON.stringify(args.next());
        },
        "fromJSON":function(scope, args){
            return JSON.parse(args.next());
        },
        "fold": function(scope, args){
            var args = args.all(),
                fn = args.pop(),
                seed = args.pop(),
                array = args[0],
                result = seed;

            if(args.length > 1){
                array = args;
            }

            if(!array || !array.length){
                return result;
            }

            for(var i = 0; i < array.length; i++){
                result = scope.callWith(fn, [result, array[i]]);
            }

            return result;
        },
        "partial": function(scope, args){
            var outerArgs = args.all(),
                fn = outerArgs.shift();

            return function(scope, args){
                var innerArgs = args.all();
                return scope.callWith(fn, outerArgs.concat(innerArgs));
            };
        },
        "flip": function(scope, args){
            var outerArgs = args.all().reverse(),
                fn = outerArgs.pop();

            return function(scope, args){
                return scope.callWith(fn, outerArgs)
            };
        },
        "compose": function(scope, args){
            var outerArgs = args.all().reverse();

            return function(scope, args){
                var result = scope.callWith(outerArgs[0], args.all());

                for(var i = 1; i < outerArgs.length; i++){
                    result = scope.callWith(outerArgs[i], [result]);
                }

                return result;
            };
        },
        "apply": function(scope, args){
            var fn = args.next()
                outerArgs = args.next();

            return scope.callWith(fn, outerArgs);
        },
        "zip": function(scope, args){
            var allArgs = args.all(),
                result = [],
                maxLength = 0;

            for(var i = 0; i < allArgs.length; i++){
                if(!Array.isArray(allArgs[i])){
                    allArgs.splice(i,1);
                    i--;
                    continue;
                }
                maxLength = Math.max(maxLength, allArgs[i].length);
            }

            for (var itemIndex = 0; itemIndex < maxLength; itemIndex++) {
                for(var i = 0; i < allArgs.length; i++){
                    if(allArgs[i].length >= itemIndex){
                        result.push(allArgs[i][itemIndex]);
                    }
                }
            }            

            return result;
        }
    };


Gel = function(){
    var gel = {},
        lang = new Lang();

    gel.lang = lang;
    gel.tokenise = function(expression){
        return gel.lang.tokenise(expression, this.tokenConverters);
    }
    gel.evaluate = function(expression, injectedScope, returnAsTokens){
        var scope = new Scope();

        scope.add(this.scope).add(injectedScope);

        return lang.evaluate(expression, scope, this.tokenConverters, returnAsTokens);
    };
    gel.tokenConverters = tokenConverters.slice();
    gel.scope = Object.create(scope);

    return gel;
};

Gel.Token = Token;
Gel.Scope = Scope;
module.exports = Gel;
},{"lang-js":12,"gedi-paths":8,"spec-js":9}],11:[function(require,module,exports){
module.exports = function detectPath(substring){
    if (substring.charAt(0) === '[') {
        var index = 1;

        do {
            if (
                (substring.charAt(index) === '\\' && substring.charAt(index + 1) === '\\') || // escaped escapes
                (substring.charAt(index) === '\\' && (substring.charAt(index + 1) === '[' || substring.charAt(index + 1) === ']')) //escaped braces
            ) {
                index++;
            }
            else if(substring.charAt(index) === ']'){
                return substring.slice(0, index+1);
            }
            index++;
        } while (index < substring.length);
    }
};
},{}],12:[function(require,module,exports){
var Token = require('./src/token');

function fastEach(items, callback) {
    for (var i = 0; i < items.length; i++) {
        if (callback(items[i], i, items)) break;
    }
    return items;
}

function callWith(fn, fnArguments, calledToken){
    var argIndex = 0,
        scope = this,
        args = {
            callee: calledToken,
            length: fnArguments.length,
            raw: function(evaluated){
                var rawArgs = fnArguments.slice();
                if(evaluated){
                    fastEach(rawArgs, function(arg){
                        if(arg instanceof Token){
                            arg.evaluate(scope);
                        }
                    });
                }
                return rawArgs;
            },
            getRaw: function(index, evaluated){
                var arg = fnArguments[index];

                if(evaluated){
                    if(arg instanceof Token){
                        arg.evaluate(scope);
                    }
                }
                return arg;
            },
            get: function(index){
                var arg = fnArguments[index];
                    
                if(arg instanceof Token){
                    arg.evaluate(scope);
                    return arg.result;
                }
                return arg;
            },
            hasNext: function(){
                return argIndex < fnArguments.length;
            },
            next: function(){
                if(!this.hasNext()){
                    throw "Incorrect number of arguments";
                }
                if(fnArguments[argIndex] instanceof Token){
                    fnArguments[argIndex].evaluate(scope);
                    return fnArguments[argIndex++].result;
                }
                return fnArguments[argIndex++];
            },
            all: function(){
                var allArgs = [];
                while(this.hasNext()){
                    allArgs.push(this.next());
                }
                return allArgs;
            }
        };
        
    return fn(scope, args);
}

function Scope(oldScope){
    this.__scope__ = {};
    this.__outerScope__ = oldScope;
}
Scope.prototype.get = function(key){
    if(key in this.__scope__){
        if(this.__scope__.hasOwnProperty(key)){
            return this.__scope__[key];
        }
    }
    return this.__outerScope__ && this.__outerScope__.get(key);
};
Scope.prototype.set = function(key, value, bubble){
    if(bubble){
        var currentScope = this;
        while(currentScope && !(key in currentScope.__scope__)){
            currentScope = currentScope.__outerScope__;
        }

        if(currentScope){
            currentScope.set(key, value);
        }
    }
    this.__scope__[key] = value;
    return this;
};
Scope.prototype.add = function(obj){
    for(var key in obj){
        this.__scope__[key] = obj[key];
    }
    return this;
};
Scope.prototype.isDefined = function(key){
    if(key in this.__scope__){
        return true;
    }
    return this.__outerScope__ && this.__outerScope__.isDefined(key) || false;
};
Scope.prototype.callWith = callWith;

// Takes a start and end regex, returns an appropriate parse function
function createNestingParser(openRegex, closeRegex){
    return function(tokens, index){
        if(this.original.match(openRegex)){
            var position = index,
                opens = 1;
                
            while(position++, position <= tokens.length && opens){
                if(!tokens[position]){
                    throw "Invalid nesting. No closing token was found matching " + closeRegex.toString();
                }
                if(tokens[position].original.match(openRegex)){
                    opens++;
                }
                if(tokens[position].original.match(closeRegex)){
                    opens--;
                }
            }

            // remove all wrapped tokens from the token array, including nest end token.
            var childTokens = tokens.splice(index + 1, position - 1 - index);

            // Remove the nest end token.
            childTokens.pop();

            // parse them, then add them as child tokens.
            this.childTokens = parse(childTokens);
            
            //Remove nesting end token
        }else{
            // If a nesting end token is found during parsing,
            // there is invalid nesting,
            // because the opening token should remove its closing token.
            throw "Invalid nesting. No opening token was found matching " + openRegex.toString();
        }
    };
}

function scanForToken(tokenisers, expression){
    for (var i = 0; i < tokenisers.length; i++) {
        var token = tokenisers[i].tokenise(expression);
        if (token) {                
            return token;
        }
    }
}

function sortByPrecedence(items){
    return items.slice().sort(function(a,b){
        var precedenceDifference = a.precedence - b.precedence;
        return precedenceDifference ? precedenceDifference : items.indexOf(a) - items.indexOf(b);
    });
}

function tokenise(expression, tokenConverters, memoisedTokens) {
    if(!expression){
        return [];
    }
    
    if(memoisedTokens && memoisedTokens[expression]){
        return memoisedTokens[expression].slice();
    }

    tokenConverters = sortByPrecedence(tokenConverters);
    
    var originalExpression = expression,
        tokens = [],
        totalCharsProcessed = 0,
        previousLength,
        reservedKeywordToken;
    
    do {
        previousLength = expression.length;
        
        var token;

        token = scanForToken(tokenConverters, expression);
        
        if(token){
            expression = expression.slice(token.length);
            totalCharsProcessed += token.length;                    
            tokens.push(token);
            continue;
        }
        
        if(expression.length === previousLength){
            throw "Unable to determine next token in expression: " + expression;
        }
        
    } while (expression);
    
    memoisedTokens && (memoisedTokens[originalExpression] = tokens.slice());
    
    return tokens;
}

function parse(tokens){
    var parsedTokens = 0,
        tokensByPrecedence = sortByPrecedence(tokens),
        currentToken = tokensByPrecedence[0],
        tokenNumber = 0;

    while(currentToken && currentToken.parsed == true){
        currentToken = tokensByPrecedence[tokenNumber++];
    }

    if(!currentToken){
        return tokens;
    }

    if(currentToken.parse){
        currentToken.parse(tokens, tokens.indexOf(currentToken));
    }

    // Even if the token has no parse method, it is still concidered 'parsed' at this point.
    currentToken.parsed = true;
    
    return parse(tokens);
}

function evaluate(tokens, scope){        
    scope = scope || new Scope();
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        token.evaluate(scope);
    }
    
    return tokens;
}

function printTopExpressions(stats){
    var allStats = [];
    for(var key in stats){
        allStats.push({
            expression: key,
            time: stats[key].time,
            calls: stats[key].calls,
            averageTime: stats[key].averageTime
        });
    }

    allStats.sort(function(stat1, stat2){
        return stat2.time - stat1.time;
    }).slice(0, 10).forEach(function(stat){
        console.log([
            "Expression: ",
            stat.expression,
            '\n',
            'Average evaluation time: ',
            stat.averageTime,
            '\n',
            'Total time: ',
            stat.time,
            '\n',
            'Call count: ',                    
            stat.calls
        ].join(''));
    });
}

function Lang(){    
    var lang = {},
        memoisedTokens = {},
        memoisedExpressions = {};


    var stats = {};

    lang.printTopExpressions = function(){
        printTopExpressions(stats);
    }

    function addStat(stat){
        var expStats = stats[stat.expression] = stats[stat.expression] || {time:0, calls:0};

        expStats.time += stat.time;
        expStats.calls++;
        expStats.averageTime = expStats.time / expStats.calls;
    }

    lang.parse = parse;
    lang.tokenise = function(expression, tokenConverters){
        return tokenise(expression, tokenConverters, memoisedTokens);
    };
    lang.evaluate = function(expression, scope, tokenConverters, returnAsTokens){
        var langInstance = this,
            memoiseKey = expression,
            expressionTree,
            evaluatedTokens,
            lastToken;

        if(!(scope instanceof Scope)){
            var injectedScope = scope;

            scope = new Scope();

            scope.add(injectedScope);
        }

        if(Array.isArray(expression)){
            return evaluate(expression , scope).slice(-1).pop();
        }

        if(memoisedExpressions[memoiseKey]){
            expressionTree = memoisedExpressions[memoiseKey].slice();
        } else{            
            expressionTree = langInstance.parse(langInstance.tokenise(expression, tokenConverters, memoisedTokens));
            
            memoisedExpressions[memoiseKey] = expressionTree;
        }
        
        
        var startTime = new Date();
        evaluatedTokens = evaluate(expressionTree , scope);
        addStat({
            expression: expression,
            time: new Date() - startTime
        });
        
        if(returnAsTokens){
            return evaluatedTokens.slice();
        }
            
        lastToken = evaluatedTokens.slice(-1).pop();
        
        return lastToken && lastToken.result;
    };
    
    lang.callWith = callWith;
    return lang;
};

Lang.createNestingParser = createNestingParser;
Lang.Scope = Scope;
Lang.Token = Token;

module.exports = Lang;
},{"./src/token":13}],13:[function(require,module,exports){
function Token(substring, length){
    this.original = substring;
    this.length = length;
}
Token.prototype.name = 'token';
Token.prototype.precedence = 0;
Token.prototype.valueOf = function(){
    return this.result;
}

module.exports = Token;
},{}]},{},[1])
;