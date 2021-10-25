# FINDINGS BREAKDOWN:
# ================================================================================
# cPanel has a wrapper for wsgi that it uses when calling the application() defined by the user
# what this means is that we --
#     (1) will inheret environ and start_response, like wsgi frameworks like flask do
#     (2) that we just need to respond with our information encoded
# and holy fuck did that take a lot of testing to figure out

# Basically, what was tripping up my previous attempts:
#    (1) start_response is a function, not-callable, and I couldn't actually find it in the source-code of Flask
#    (2) trying to log or print dictionaries acts really weird sometimes if you don't convert them to a string, first
#    (3) the response needs to be returned in a very, very specific way to work. it's a pain in the ass, actually.

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

def log(string):
	file = open('log.txt', 'a+')
	file.write(string +'\n')
	file.close()

def e(environ):
	log('**** requested e for environment')
	log(str(environ))
	r = {
		'request': environ['SCRIPT_URL'],
		'https': environ['HTTPS'],
		'webview': environ['HTTP_USER_AGENT'],
		'uri': environ['SCRIPT_URI'],
		'query': environ['QUERY_STRING'],
		'uid': environ['UNIQUE_ID'],
		'uaddr': environ['REMOTE_ADDR'],
		'uport': environ['REMOTE_PORT'],
		'uref': environ['HTTP_REFERER'],
		'server_software': environ['SERVER_SOFTWARE'],
	}
	log('**** building request dictionary')
	log(str(r))
	return r
		

def application(environ, start_response):
	start_response('200 OK', [('Content-Type', 'text/plain')])
	
	content = 'hello world!'	
	request_dictionary = e(environ)
	content = content + request_dictionary['request']
	
	response = '\n'.join([content])
	
	encoded = [response.encode()]
	
	return encoded
