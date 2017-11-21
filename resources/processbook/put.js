var bookInfo = require('../codes/bookInfo.js');
var zipExtractor = require('../codes/zipExtractor.js');
var az = require('adm-zip');
var tn = require('node-thumbnail').thumb;
var fe = require('fs-extra');

var thumbFolder = 'public/thumbs/' + query.filename;
var realThumbFolder = 'public/thumbs/'; 

var epub = 'public/upload/bookfiles/' + query.filename;

if(epub.substring(epub.lastIndexOf('.') + 1).toLowerCase() == 'epub') {
    bookInfo.retrieve(epub).then(function(info){
        if(info.cover) {
            var thumbName = thumbFolder + info.cover.substr(info.cover.lastIndexOf('/'));
            var zipFile = new az(epub);
            var zipEntries = zipFile.getEntries();
            var thumbCompletePath = info.cover;
            zipEntries.forEach(function(entry){thumbCompletePath = (entry.entryName.indexOf(thumbCompletePath) >=0 ? entry.entryName : thumbCompletePath)});
            //zipEntries.forEach(function(entry){console.log(entry.entryName)});
            //console.log('thumbName:', thumbName, 'info.cover:', info.cover);
            //zipFile.extractEntryTo(info.cover, thumbFolder, false, true);
            zipFile.extractEntryTo(thumbCompletePath, thumbFolder, false, true);
            tn({
                source: thumbName,
                destination: thumbFolder,
                width:100,
                overwrite: true,
                suffix:'',
                prefix:'',
                quiet: true,
            }, function(files, err, stdout, stderr) {
                if(!err){
                    fe.move(thumbName, realThumbFolder + query.id, function(err){
                        if(!err) {
                            fe.remove(thumbFolder, function(err){
                                if(!err) {
                                    info.cover = query.id;
                                    saveEpubInfo(info, query);
                                }
                                else setResult(null, err);
                            })
                        }
                        else setResult(null, err);
                    })
                    //saveEpubInfo(info, query);
                }
                else setResult(null, err);
            });
        }
        else {
            saveEpubInfo(info, query);
        }
    })
    .catch(function(err){
        console.log('ERR:', err);
    });
}
else { //a zip of text files is uploaded
    zipExtractor.retrieve(epub, query.originalFilename).then(function(book){
        if(book){
            dpd.books.post({
                title: book.title,
                //fileId: query.id,
                //filename: query.filename,
                isPublished: false,
                isEditable:true,
                identifier:'ISBN',
                uploaderId:me.id,
                creator: toTitleCase(me.firstName + ' ' + me.lastName),
                date: (new Date(book.earliestTime)).getFullYear(),
            }, function(result, err){
                book.chapter.forEach(function(c){
                    dpd.chapters.post({
                        bookId: result.id,
                        seqNo: c.seqNo,
                        title: c.title,
                        content: replaceAll(replaceAll(c.content, '\r\n', '<br/>'), '\n', '<br/>'),
                    }, function(r, e){
                        if(e){
                            setResult(null, e);
                        }
                    })
                });
                dpd.bookfiles.del(query.id, function(r, err){
                    setResult(result, err);
                })
            })
        }
    }, function(reason){
        setResult(reason);
        console.log(reason);
    })
}


function saveEpubInfo(info, addInfo){
    info.fileId = addInfo.id;
    info.thumb = info.cover? info.cover.substr(info.cover.lastIndexOf('/') + 1) : info.cover;
    info.uploaderId = addInfo.uploaderId;
    info.filename = addInfo.filename;
    info.isPublished=true;
    info.filesize = addInfo.filesize;
    dpd.books.post(info, function(result, err){
        setResult(result, err);
    })
}
function toSentenceCase(z) {
	return z === '' ? '' : z[0].toUpperCase() + z.substr(1).toLowerCase();
}

function toTitleCase(z) {
	return z.split(' ').map(function(s){return toSentenceCase(s.trim());}).join(' ').trim();
}

function replaceAll(t, o, n) {return t.split(o).join(n);}