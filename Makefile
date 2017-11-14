
clean:
	@echo "Building production and development.\n\nCleaning previous bundles..."
	@rm -rf ./dist/app ./dist/public ./dist/*.json ./dist/*.log ./dist/*.js

webpack_ORG:
	@echo "Packing..."
	@webpack -p --config ./webpack.config.client.js && cp -R ./public ./dist && rm -f ./dist/public/static/*.map
	@NODE_ENV=production webpack -p --config ./webpack.config.server.js
	
webpack:
	@echo "Packing for Production and Development..."
	cp -R ./public ./dist
	@webpack -p --config ./webpack.config.client.js
	@NODE_ENV=production webpack -p --config ./webpack.config.server.js

build: clean webpack
	@cp package.json ./dist
	@echo "Done !"
	
webpack_dev:
	@echo "Packing Develoment..."
	@webpack -p --config ./webpack.config.client.development.js && cp -R ./public ./dist
	@NODE_ENV=production webpack -p --config ./webpack.config.server.js
	
build_dev: webpack_dev
	@cp package.json ./dist
	@echo "Done !"