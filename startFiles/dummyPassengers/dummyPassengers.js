// Auto generates a list of dummy passengers as per the given files in its directory
function dummyPassengers(numberOfDummyPassengers) {
	let fs = require('fs');
	let text = fs.readFileSync("./names.txt", 'utf-8');
	let names = text.split('\n');
	text = fs.readFileSync("./emails.txt", 'utf-8');
	let emails = text.split('\n');
	text = fs.readFileSync("./phoneNos.txt", 'utf-8');
	let phoneNos = text.split('\n');
	var dummyPassengers = [];
	if (!((numberOfDummyPassengers < names.length - 1 || numberOfDummyPassengers < emails.length - 1 || numberOfDummyPassengers < phoneNos.length - 1))) {
		smallest = names.length < emails.length ? names.length : emails.length
		smallest = smallest < phoneNos.length ? smallest : phoneNos.length
		smallest--;
		console.log('You requested more than ' + smallest + ' dummy passengers.\nIt\'s ok. We will just give you a list of size ' + smallest + '.')
	}

	for (let i = 0; i < numberOfDummyPassengers && (i < names.length - 1 || i < emails.length - 1 || i < phoneNos.length - 1); i++) {
		dummyPassengers.push({ name: names[i], email: emails[i], phone: phoneNos[i] })
	}

	return dummyPassengers
}
