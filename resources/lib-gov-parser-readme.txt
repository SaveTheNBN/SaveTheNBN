How to Use
==========

1. Navigate to http://www.aph.gov.au/Senators_and_Members/Members/Members_Photos?party=2

2. Copy the JS code from "lib-gov-parser.js" into the JS console in the browser

3. Take the output string from the console and replace "last-lib-gov-dump.json" with it


Object Properties
=================

Name: Name of the MP, taken from the H1 tag of the page

Office: Generally should represent a contactable location of the MP (May need more data refining)

Contact: List of URLs found on the MP page, contains links to social media, contact pages, sometimes mailto addresses and personal websites

Image: MP image used on the "aph.gov.au" website