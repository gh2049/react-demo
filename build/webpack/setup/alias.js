const path = require('path')

module.exports = function (config) {
	const sourcePath = config.path.source

	return {
    'thirdparty': path.resolve(sourcePath, 'thirdparty'),
    'widget': path.resolve(sourcePath, 'widget'),
    'state': path.resolve(sourcePath, 'state')
	}
}