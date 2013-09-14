var baseList = [];
var finalData = [];

$('.gallery .img-holder').each(function()
{
    baseList.push({url:this.href,img:$(this).children('img')[0].src})
});

var i = 0;
function getNext()
{
    if (i >= baseList.length)
    {
        console.log(finalData);
        return;
    }
    var baseData = baseList[i];
    var $htmlCode;
    $.get(baseData.url,function(data)
    {
        $htmlCode = $(data);
        var officeDetails = $('.box .col-third:eq(1) > p:eq(2)', $htmlCode).text();
        var contactAddresses = [];
        $('.col-third.col-last a', $htmlCode).each(function()
        {
            contactAddresses.push(this.href);
        });
        finalData.push({
            Name:$('h1', $htmlCode).text(),
            Office:officeDetails,
            Contact:contactAddresses,
            Image:baseData.img
        });

        i++;
        getNext();
    });
}

getNext();