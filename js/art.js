/* Load table data from JSON file and then populate table */

/* Maps */
var date_order = {
  "Jan": 0,
  "Feb": 1,
  "Mar": 2,
  "Apr": 3,
  "May": 4,
  "Jun": 5,
  "Jul": 6,
  "Aug": 7,
  "Sep": 8,
  "Oct": 9,
  "Nov": 10,
  "Dec": 11
};

function createLinks(obj) {
	var links = [];
	for (const [key, value] of Object.entries(obj)) {
	  links.push(`<a href='${value}'>${key}</a>`);
	}
	return links;
}

function create_morris_donut_labels(categories_totals) {
	var labels = [];
	for (const [key, count] of Object.entries(categories_totals)) {
	  labels.push({label: key, value: count});
	}
	return labels;
}

function count_overall_total(categories_totals) {
  return Object.values(categories_totals).reduce((a, b) => a + b, 0);
}

/* because I like to challenge myself (pain) adding custom sorting for the date format in the table using the sorttable library */
/* 
	https://www.kryogenix.org/code/browser/sorttable/#customkeys 
	They sort using manually entered attributes. So making a javascript function to determine these rankings for me because i like to challenge myself (pain)
	Hm. Because I know I am only inserting entries from 2020+. I can use that to my advantage and use Jan 2020 as the first date
*/

function calculateDateRank(date_string) {
	// Date string is in Month YYYY order
	// Jan 2020 = 1

	if (date_string === undefined || date_string === null || date_string.trim() === '') {
		return 0;
	}
	
	var year = Number(date_string.slice(-4));
	var month = date_string.substring(0, 3);

	return (year-2020)*12 + date_order[month];
}

// /* Test data locally. */ 
// var json_test = [insert data here];

// Insert the endpoint code here

// /* Test data locally end. */ 

// Real data hitting endpoint
$.getJSON( "https://jayleenli.github.io/data/art_projects.json", function( data ) {
	var table_items = [];
	var categories_totals = {};

	data.forEach(function(item) {
		if (item["category"] in categories_totals) {
				categories_totals[item["category"]] = categories_totals[item["category"]] + 1;
			} else {
				categories_totals[item["category"]] = 1;
			}
		    table_items.push(`<tr>`);
		    table_items.push(`<td sorttable_customkey='${calculateDateRank(item["date_started"])}'>${item["date_started"]}</td>`);
		    table_items.push(`<td sorttable_customkey='${calculateDateRank(item["date_completed"])}'>${item["date_completed"]}</td>`);
		    table_items.push(`<td>${item["project"]}</td>`);
		    table_items.push(`<td>${item["category"]}</td>`);
		    table_items.push(`<td>${createLinks(item["links"]).join(", ")}</td>`);
		    table_items.push(`</tr>`);
	});

	$( "#artTable" ).append(table_items.join(""));

	/* Morris Donut JS for Art Page */
	Morris.Donut({
	  element: 'art-donut-viz',
	  data: create_morris_donut_labels(categories_totals)
	});

	/* Total Count */
	$( "#art-total-viz" ).text(`Total Projects Listed: ${count_overall_total(categories_totals)}`);
});