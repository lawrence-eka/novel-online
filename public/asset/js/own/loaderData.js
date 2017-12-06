/**
 * Created by gal9569 on 8/7/2017.
 */

var mainMenuPath = '#app/main-menu.menu-grid';

var specialAddress = [
	"#user.login-form",
	"#user.forgot-password",
	"#user.reset-password",
	"#user.registration",
	'#common.privacyPolicy',
];
/*
*
* */

function mainMenu (path){
	if(path != undefined) {
		if(path == '') {
			if(storage.me.read()) {
				dpd.users.logout(function (err) {
					//debugger;
					storage.me.erase();
					window.location.hash = '#app';
				});
			}
			else window.location.hash = '#app/user.login-form';
		} else window.location.hash = path;
		return;
	}

	var me = storage.me.read();
	var menu = [
			{code:'upload', icon:'upload',short:'Upload', long:'Upload Book', addr:'#app/upload.home'},
			{code:'write', icon:'edit',short:'Write', long:'Write Books', addr:'#app/writer.home'},
			{code:'read', icon:'book',short:'Read', long:'Read Book', addr:"#app/reader.home"},
			{code:'manageGenres', icon:'hashtag',short:'Genres', long:'Manage Genres', addr:"#app/genres.home"},
			{code:'approveUsers', icon:'files-o',short:'Approvals', long:'User Approval', addr:'#app/user.myApprovals'},
			{code:'manageUsers', icon:'users',short:'Users', long:'Manage Users', addr:'#app/user.home'},
			{code:'profile', icon:'address-card-o',short:'Profile', long:(me? (me.firstName + ' ' + me.lastName).toTitleCase():''), addr:'#app/user.myProfile'},
			{code:'login', icon:'power-off', short: (me? 'Log Out' : 'Log In'), addr:''},
		];
/**/
	function actionable(){
		//debugger;
		var result = '|login|';
		if(me) {
			result += 'profile|read|';
			if(me.isPublisher) result += 'upload|write|';
			if(me.isAdmin) result += 'approveUsers|manageUsers|manageGenres|';
		}
		return result;//.toLowerCase();
	}

	return menu.filter(function(x){return actionable().indexOf('|' + x.code + '|')>=0;});
}

var assets = [
	{seq: 2, file: "asset/css/font-awesome.min.css"},
	{seq: 2, file: "asset/css/bootstrap.min.css"},
	{seq: 3, file: "asset/css/css-patch.css"},
	{seq: 2, file: "asset/css/custom-style.css"},
	{seq: 2, file: "asset/css/ie10-viewport-bug-workaround.css"},
	{seq: 2, file: "asset/css/sticky-footer-navbar.css"},
	{seq: 2, file: "asset/js/jquery.min.js"},
	{seq: 4, file: "asset/js/bootstrap.min.js"},
	{seq: 4, file: "asset/js/epub/epub.js"},
	{seq: 4, file: "asset/js/epub/reader.js"},
	{seq: 4, file: "asset/js/epub/libs/zip.min.js"},
	{seq: 2, file: "asset/css/awesomplete.css"},
	{seq: 4, file: "asset/js/awesomplete/awesomplete.js"},
	{seq: 4, file: "asset/js/nicEdit/nicEdit.js"},
	{seq: 2, file: "dpd.js"},
	{seq: 2, file: "asset/js/own/prototypes.js"},
	{seq: 2, file: "asset/js/own/datePair.js"},
	{seq: 2, file: "asset/js/own/alert.js"},
	{seq: 2, file: "asset/js/own/utils.js"},
	{seq: 2, file: "asset/js/own/event.js"},
	{seq: 1, file: "asset/js/own/storages.js"},
	{seq: 1, file: "asset/js/zlib/gunzip.min.js"},
	{seq: 0, file: "asset/js/own/loaderData.js"},
	{seq: 1, file: "dist/yalla.js",
		attribute: {
			id: "yallaScript",
			"yalla-component": "app",
			"yalla-base": "dist",
			"yalla-domtarget": "body",
			"yalla-routing": "authenticate"
		}
	},
	{seq: 2, file: "asset/js/own/yalla-patch.js"},
	{seq: 2, file: "asset/js/vendor/pica.min.js"},
	{seq: 3, file: "asset/js/own/imageProcessor.js"},
];

function authenticate(path){
	return new Promise(function(resolve){
		//resolve("#app/user.login-form");
		resolve(path && path != '#app' ? path : mainMenuPath);
		//resolve(path);
	});
}

