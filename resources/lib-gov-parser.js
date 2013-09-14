var baseList = [];
var finalData = [];
var finalDataString = "";

function trim(theString)
{
	return theString.replace(/\s{2,}/g, ' ').trim();
}

$('.gallery .img-holder').each(function()
{
    baseList.push({
		url:this.href,
		img:$(this).children('img')[0].src,
		position:trim($(this).siblings('a').children('position').text())
	});
});

var i = 0;
function getNext()
{
    if (i >= baseList.length)
    {
		console.log('Build Complete. Use the variable "finalDataString" to get the dump');
        finalDataString = JSON.stringify(finalData);
        return;
    }
    var baseData = baseList[i];
    var $htmlCode;
    $.get(baseData.url,function(data)
    {
        $htmlCode = $(data);
        
        var $officeDetails = $('.box .col-third:eq(1) > p:not(:eq(0))', $htmlCode);
        var officeList = [];
        $officeDetails.children('u').remove();
        $officeDetails.each(function()
        {
			officeList.push(trim($(this).text()));
		});
		
        var contactAddresses = [];
        $('.col-third.col-last a', $htmlCode).each(function()
        {
            contactAddresses.push(this.href);
        });
        finalData.push({
            Name:$('h1', $htmlCode).text(),
            Position:baseData.position,
            Office:officeList,
            Contact:contactAddresses,
            Image:baseData.img
        });

        i++;
        getNext();
    });
}

getNext();