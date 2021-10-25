# **** A BRIEF DESCRIPTION
# All this test actually did was get and dump the stuff the application function actually receives
# This is our environment and start_response function, of course, but we
# needed to actually be able to find that out somehow, so this is how I did that.
# I've seen the auto-generated thing cpanel makes for python pages, so I kind-of
# knew what to expect, but I had no idea what those variables should actually contain or
# what they do, so. This.


# https://www.w3schools.com/python/python_datatypes.asp
# https://www.w3schools.com/python/ref_dictionary_get.asp

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

def wf(content):
    file = open('dump.txt', 'w+')
    file.write(content)
    file.close()
    return 0

def application(*args):
    content = ''
    for x in range(0, len(args)):
        content = content + str(args[x])
    wf( str(content) )
    return(content)

if __name__ == '__main__':
    print(application(['test','ing','123']))
	
	
	
	
	
	
	
	













