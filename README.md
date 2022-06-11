# crawler
A simple library for rapid website development, designed primarily for use with cPanel

#### Day-By-Day

###### Day 0, missing timestamps
Somewhere in the ballpark of 2 to 5 hours put into test 1. Got `environ` and `start_response` dumps.

###### Day 1, October 25 2021, about 4 hours
Did multiple tests, and are capable of serving plain test, and probably HTML too, using basic functions. With very little tweaking, this could serve a static or even partially dynamic website such as a user counter. However, I don't know exactly how stable it is. *(Additional text removed for brevity)*
##### Day 2, November 2 2021, about 3 hours
Re-designed from scratch, unable to get static files to work but can stably serve HTML and some types of other content with proper `mimetype`s. *(Additional text removed for brevity)*

*NOTE:* I do not know how much development happened (if any) between these two points because of poor notetaking between 0.0.4 and 0.0.05a

##### Day "3", March 23 2022, 50 minutes
Re-re-designed from scratch. Is a lot prettier, but does not support filetype definitions. This can be re-added later, but this massive update was done to allow building [Friendly](https://github.com/JohnAlexCO/Friendly). *(Additional text removed for brevity)*

##### Day "4", June 11 2022, 2 and a half hours
Re-implemented the idea with `Node.js` instead of Python. 
It can serve static files or regular text, but does not have a built-in routing system,
and it does not actually process the request at all.
