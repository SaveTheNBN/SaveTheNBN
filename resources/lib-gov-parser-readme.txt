How to Use
==========

1. Navigate to http://www.aph.gov.au/Senators_and_Members/Members/Members_Photos?party=2

2. Copy the JS code from "lib-gov-parser.js" into the JS console in the browser

3. The variable "finalDataString" has the JSON encoded object. Take this string and replace the contents of "last-lib-gov-dump.json" with it.


Object Properties
=================

Name: Name of the MP, taken from the H1 tag of the page

Position: Like "Member for Warringah, New South Wales" etc

Office: List of physical contact locations. First should be their main location, second generally will be a PO box. May be more for other MPs.

Contact: List of URLs found on the MP page, contains links to social media, contact pages, sometimes mailto addresses and personal websites

Image: MP image used on the "aph.gov.au" website