/**
 * Created by gal9569 on 11/19/2017.
 */

exports.create = function(book, chapters, epubPath, epubFilename) {
	return new Promise(function(resolve, reject){
		epubPath = epubPath || 'public/upload/bookfiles/';
		epubFilename = epubFilename || book.filename;
		var epubGenerator = require('epub-generator');
		var fs = require('fs');
		var epub = epubGenerator({
			title: book.title,
			author: book.creator,
			description: book.descriptions,
			date: book.lastUpdatedDate,
			cover: book.thumb?("public/upload/thumbs/" + book.thumb) : '',
			subjects: book.subjects.map(function(s){return {subject:s}}),
		});
		var cn = 1;
		var xhtml1 = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link rel="stylesheet" href="quill.core.css" type="text/css"/><title>';
		var xhtml2 = '</title></head><body><span class="ql-container ql-editor">';
		var xhtml3 = '</span></body></html>';
		chapters.forEach(function(c){
			var data = xhtml1 + c.title + xhtml2;
			if(c.printChapterNumber || c.printTitle) {
				data += '<div style="text-align:center"><strong>';
				if (c.printChapterNumber) {
					data += c.seqNo + '. ';
				}
				if (c.printTitle) {
					data += c.title;
				}
				data += '</strong></div><br/><br/>';
			}
			data += c.content + xhtml3;
			epub.add(
				'chapter_' + cn++ + '.xhtml',
				data,
				{
					title: c.title,
					toc: true,
				}
			)
		})
		epub.end();

		var file = fs.createWriteStream(epubPath + epubFilename);
		file.on('finish', function(){
			fs.stat(epubPath + epubFilename, function(err, stat){
				if(err) reject(err);
				else {
					stat.filename = epubPath + epubFilename;
					resolve(stat);
				}
			})
		});

		epub.pipe( file);

		epub.on('error', function(err){
			reject(err);
		});
	});
};
