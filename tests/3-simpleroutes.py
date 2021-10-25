# *****************************************************************************
# NOTE, THIS WAS IMPORTED USING A SEPARATE TESTER, WHICH WILL BE IN THIS FOLDER NAMED 3-simpletest.py
# *****************************************************************************

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

def log(string):
	file = open('log.txt', 'a+')
	file.write(string +'\n')
	file.close()

def e(environ):
	log('**** requested e for environment')
	#log(str(environ))
	r = {
		'local_request': environ['PATH_INFO'], # previously used SCRIPT_URI, but that consistently returns values we don't want; also, split this into two variables, local and global
		'global_request': environ['REQUEST_URI'],
		'https': environ['HTTPS'],
		'webview': environ['HTTP_USER_AGENT'],
		'uri': environ['SCRIPT_URI'],
		'query': environ['QUERY_STRING'],
		'uid': environ['UNIQUE_ID'],
		'uaddr': environ['REMOTE_ADDR'],
		'uport': environ['REMOTE_PORT'],
		#'uref': environ['HTTP_REFERER'], this line creates errors, sadly
		'server_software': environ['SERVER_SOFTWARE'],
	}
	log('**** returning request dictionary')
	#log(str(r))
	return r

class Management(object):
	def __init__(self):
		self.names = []
		self.functions = []
		
	def __call__(self, function):
		self.functions.append(function)
		self.names.append('/'+function.__name__)
		return self
	
	# INPUT: url string, including lead slash
	# OUTPUT: function number
	def find_route(self, string ): 
		log('    **** called find_route on "%s"' % string)
		string = string
		for n in range(0, len(self.names)):
			if self.names[n] == string:
				return n
		# if not found, return 0 or INDEX; can later be replaced with a special 404
		return 0
		
	def run(self, request_dictionary ):
		log('    **** called run on dict object request_dictionary')
		
		#if type( request_dictionary ) == str:
		#	print("MAJOR ERROR: expected dictionary value for request_dictionary, received string")
		#	request_dictionary = {
		#		'request':'/home'	
		#	}
			
		do = request_dictionary['local_request']
		log('    **** attempting to define go using find_route')
		go = self.find_route( do )
		log('        ... given function numbered %d' % go)
		return( self.functions[go]() ) # evaluate & return
	
route = Management()

def app(environ, start_response):
	log('Called application')
	start_response('200 OK', [('Content-Type', 'text/plain')])
	
	request_dictionary = e(environ) # has its own logging
	content = route.run( request_dictionary ) # also has its own logging
	
	log(content)
	
	response = '\n'.join([content])
	encoded = [response.encode()]
	
	return encoded


