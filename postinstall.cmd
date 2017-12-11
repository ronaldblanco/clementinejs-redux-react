@echo "Packing Production..."
	mkdir dist
	xcopy public\* dist\public /e /i
	copy package.json dist
	call server.cmd
	webpack -p --config webpack.config.client.js