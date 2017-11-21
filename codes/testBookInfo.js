var zipExtractor = require('../codes/zipExtractor.js');

var query = {
	filename: "andani citra.zip",
}
zipExtractor.retrieve(query.filename).then(function(book){
    //console.log(book);
	console.log('done');
    //setResult(book);
}, function(reason){
    console.log(reason);
})


/*
var bookInfo = require('../../../codes/bookInfo.js');
var az = require('adm-zip');
var tn = require('node-thumbnail').thumb;

var book = 'ICMJ.epub'
var thumbFolder = 'thumbs';
bookInfo.retrieve(book).then(function(info){
	console.log(info);
	var zipFile = new az(info.epub);
	var zipEntries = zipFile.getEntries();

	var thumbName = thumbFolder + info.cover.substr(info.cover.lastIndexOf('/'));
	console.log('HELLO', info.cover.substr(info.cover.lastIndexOf('/')), 'WORLD', thumbName)
	zipFile.extractEntryTo(info.cover, thumbFolder, false, true);
	tn({
		source: thumbName,
		destination: thumbFolder,
		width:100,
		overwrite: true,
		suffix:'',
		prefix:'',
	}, function(files, err, stdout, stderr) {
		console.log('All done!', files, err);
	});
})
.catch(function(err){
	console.log(err);
});
*/