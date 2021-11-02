environ = {'REQUEST_URI': '/crawler',
'PATH_INFO': '/',
'SCRIPT_NAME': '/crawler',
'QUERY_STRING': '',
'REQUEST_METHOD': 'GET',
'SERVER_NAME': 'johnalex.co',
'SERVER_PORT': '443',
'SERVER_SOFTWARE': 'Apache/2.4.48 (cPanel) OpenSSL/1.1.1k mod_bwlimited/1.4 Phusion_Passenger/6.0.10',
'SERVER_PROTOCOL': 'HTTP/1.1',
'REMOTE_ADDR': '68.49.53.190',
'REMOTE_PORT': '50686',
'PASSENGER_CONNECT_PASSWORD': 'IvJ0y1ETT7lWYWFx',
'HTTPS': 'on',
'HTTP_USER_AGENT': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML\n like Gecko) Chrome/87.0.4280.88 Safari/537.36',
'HTTP_SEC_FETCH_DEST': 'document',
'HTTP_SEC_FETCH_USER': '?1',
'HTTP_ACCEPT_ENCODING': 'gzip deflate, br',
'HTTP_SEC_FETCH_SITE': 'cross-site',
'HTTP_REFERER': 'https://mi3-ss56.a2hosting.com:2083/',
'HTTP_ACCEPT': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'HTTP_SEC_FETCH_MODE': 'navigate',
'HTTP_ACCEPT_LANGUAGE': 'en-US,en;q=0.9,fy;q=0.8',
'HTTP_HOST': 'johnalex.co',
'HTTP_X_HTTPS': '1',
'HTTP_UPGRADE_INSECURE_REQUESTS': '1',
'UNIQUE_ID': 'YSZKGeyq28k33VLAWPmo-QAAAAU',
'SCRIPT_URL': '/crawler',
'SCRIPT_URI': 'https://johnalex.co/crawler',
'SSL_TLS_SNI': 'johnalex.co',
'wsgi.input': '<_io.BufferedReader name=6>',
'wsgi.errors': "<_io.TextIOWrapper name='<stderr>' mode='w' encoding='utf-8'>",
'wsgi.version': (1, 0),
'wsgi.multithread': False,
'wsgi.multiprocess': True,
'wsgi.run_once': False,
'wsgi.url_scheme': 'https',
'passenger.hijack': '<function RequestHandler.process_request.<locals>.hijack at 0x2b6bd7b1e790>'}

def request(string):
	#print('**** Tester will be requesting [%s] ****'%string)
	environ['PATH_INFO'] = string # https://stackoverflow.com/questions/2261951/what-exactly-is-path-info-in-php; basically path relative to script
	environ['SCRIPT_NAME'] = string
	environ['SCRIPT_URL'] = string
	environ['SCRIPT_URI'] = 'https://johnalex.co/'+string

def start_response(*args):
	print(str(args))
	return str(args)

request('/favicon')

import test
print( 
	test.application(environ, start_response)
)
