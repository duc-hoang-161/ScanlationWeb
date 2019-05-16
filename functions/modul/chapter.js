

function Chapter(id, title, issue, volume, totalPages, links, download, preChap, nextChap, timeUpload){
	this.id = id;
	this.title = title;
	this.issue = issue;
	this.volume = volume;
	this.totalPages = totalPages;
	this.links = links;
	this.download = download;
	this.preChap = preChap;
	this.newChap = nextChap;
	this.timeUpload = timeUpload;
}

var method = Chapter.prototype;

module.exports = Chapter;