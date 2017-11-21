/**
 * Created on 9/26/2017.
 */
var epp = require('epub-parser');

exports.retrieve = function (book){
	return new Promise(function(resolve, reject){
		epp.open(book, function(err, epd){
			if(err) {
				reject(err);
			}
			else {
				var info = retrieveInfo(epd);
				info.cover = epd.easy.epub2CoverUrl ? epd.easy.epub2CoverUrl : epd.easy.epub3CoverId? epd.easy.itemHashById[epd.easy.epub3CoverId].$.href:'';
				info.epub = book;
				resolve(info);
			}
		});
	});
}

function retrieveInfo(epd) {
	var result = {};
	epd.easy.simpleMeta.forEach(function(element){
		//console.log(element);
		if(element["dc:title"]) result.title = element["dc:title"];
		else if(element["dc:creator"]) result.creator = element["dc:creator"];
		else if(element["dc:publisher"]) result.publisher = element["dc:publisher"];
		else if(element["dc:description"]) result.description = element["dc:description"];
		else if(element["dc:creator"]) result.creator = element["dc:creator"];
		else if(element["dc:identifier"]) result.identifier = element["dc:identifier"];
		else if(element["dc:date"]) result.date = element["dc:date"];
	});
	result.subjects = epd.raw.json.opf.metadata[0]['dc:subject'];
	return result;
}
