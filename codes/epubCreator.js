/**
 * Created by gal9569 on 11/19/2017.
 */

exports.create = function(book, chapters) {
	var epubGenerator = require('epub-generator')
	var fs = require('fs');
	var epub = epubGenerator({
		title: book.title,
		author: book.creator,
		description: book.descriptions,
		date: book.date,
		cover: ("public/thumbs/" + book.thumb),
		subjects: book.subjects,
	});
	console.log(book.subjects);
	var cn = 1;
	var xhtml1 = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>';
	var xhtml2 = '</title></head><body>';
	var xhtml3 = '</body></html>';
	chapters.forEach(function(c){
		epub.add(
			'chapter_' + cn++ + '.xhtml',
			xhtml1 + c.title + xhtml2 + c.content + xhtml3,
			//xhtml,
			{
				title: c.title,
				toc: true,
			}
		)
	})
	epub.end();
	epub.pipe( fs.createWriteStream(book.title + '.epub'));

	epub.on('error', function(err){
		console.log(err);
	});
}