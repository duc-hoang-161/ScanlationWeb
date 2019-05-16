const chapter = require("./chapter.js");




function volume(id, numVolume, thumbnail, download, listChap){
	this.id = id;
	this.numVolume = numVolume;
	this.thumbnail = thumbnail;
	this.download = download;
	this.listChap = listChap;
}


var method = volume.prototype;

method.getChapterById= function(id){
	for(var i = 0; i < this.listChap.length; i++){
		if(this.listChap[i].id === id)
			return new chapter(this.listChap[i]);
	}
}








