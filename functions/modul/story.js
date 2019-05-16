module.exports = story;


function story(romaji, idname, author, totalChapter, totalVolume, status, lastestChapter, lastestUpdateTime, listVolume, description, frequency){
	this.romaji = romaji;
	this.idname = idname;
	this.author = author;
	this.totalChapter = totalChapter;
	this.totalVolume = totalVolume;
	this.status = status;
	this.lastestChapter = lastestChapter;
	this.lastestUpdateTime = lastestUpdateTime;
	this.listVolume = listVolume;
	this.description = description;
	this.frequency = frequency;
}

