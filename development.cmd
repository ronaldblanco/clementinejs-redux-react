@echo "Building development.\n\nCleaning previous bundles..."
	rmdir dist /s /q
@echo "Packing Develoment..."
	mkdir dist
	xcopy public\* dist\public /e /i
	webpack -p --config webpack.config.client.development.js
	