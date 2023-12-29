/* Load publications data from JSON file and then populate table. 
No logic for sorting assuming JSON is already in order from most recent->least recent by year 
and then chronologically within each year. */

function createEntry(publication_name, subtext, date, link) {
	var entry = [];
	entry.push(`<tr>`);
	entry.push(`<td class='td-date-align'>${date}</td>`);
	entry.push(`<td><a class='publication-link' href='${link}' target='_blank'>${publication_name}</a><i> ${subtext}</i></td>`);
	entry.push(`</tr>`);
	return entry.join("");
}


function createYearHeader(year) {
	return `<tr><th style='width:11%' class='publications-th'>${year}</th></tr>`;
}

var table_items = [];
var categories_totals = {};

for (const [yearKey, entries] of Object.entries(publications_list_json)) {
	table_items.unshift(`<!-- start of ${yearKey} -->`);
	entries.forEach(function(item) {
		table_items.unshift(createEntry(item["publication_name"], item["subtext"], item["date"], item["link"]));
	});
	table_items.unshift(createYearHeader(yearKey));
	table_items.unshift(`<!-- end of ${yearKey} -->`);

}

$( "#publications-table" ).append(table_items.join(""));