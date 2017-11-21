/**
 * Created by gal9569 on 11/15/2017.
 */
var az = require('adm-zip');

exports.retrieve = function (zipFileName, originalFilename){
	originalFilename = originalFilename || zipFileName;
	return new Promise(function(resolve, reject){
		var book = {
			title: title(originalFilename),
			chapter: [],
		}
		try {
			var zipFile = new az(zipFileName);
			var zipEntries = zipFile.getEntries();
			var idx = 1;
			var maxDate = (new Date('1-Jan-0001')).setFullYear(1);
			var minDate = (new Date()).getTime();
			zipEntries.forEach(function (ze) {
				if (!ze.isDirectory) {
					var fileTime = (new Date(ze.header.time)).getTime();
					minDate = minDate < fileTime? minDate: fileTime;
					maxDate = maxDate > fileTime? maxDate: fileTime;
					book.chapter.push({
						seqNo: idx++,
						title: title(ze.entryName),
						content: zipFile.readAsText(ze.entryName),
					})
				}
			});
			book.earliestTime = minDate;
			book.latestTime = maxDate;
		}
		catch(e){
			reject({error:e, ze:zipEntries});
		}
		resolve(book);
	});
}

function title(z){
	z = z.lastIndexOf('/') >= 0 ? z.substring(z.lastIndexOf('/') + 1) : z;
	z = z.lastIndexOf('.') >= 0 ? z.substring(0, z.lastIndexOf('.')) : z;
	return toTitleCase(z);
}

toSentenceCase = function(z) {
	return z == '' ? '' : z[0].toUpperCase() + z.substr(1).toLowerCase();
}

toTitleCase =function(z) {
	return z.split(' ').map(function(s){return toSentenceCase(s.trim());}).join(' ').trim();
}


//var book = '../../andani citra.zip'

