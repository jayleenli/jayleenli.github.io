/* Load table data from JSON file and then populate table */
function createLinks(obj) {
	var links = [];
	for (const [key, value] of Object.entries(obj)) {
	  links.push("<a href='"+ value + "'>" + key +"</a>");
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
	var order = {
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
	var year = Number(date_string.slice(-4));
	var month = date_string.substring(0, 3);

	return (year-2020)*12 + order[month];
}

// /* Test data locally. */ 
// var json_test = [
// 	{
// 		"date_started": "Aug 2021",
// 		"date_completed": "Dec 2021",
// 		"project": "Steampunk Gear Clock",
// 		"category": "3D Print",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=mW2YG3WzXSY",
// 			"Instagram": "https://www.instagram.com/p/CXLQihvrAuO/",
// 			"Thingiverse": "https://www.thingiverse.com/thing:5165050"
// 		}
// 	},
// 	{
// 		"date_started": "Sep 2020",
// 		"date_completed": "Sep 2020",
// 		"project": "Abstract Bulbasaur",
// 		"category": "3D Pen",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=zqHsPxKWokw",
// 			"Instagram": "https://www.instagram.com/p/CFGJUUkpuT9/"
// 		}
// 	},
// 	{
// 		"date_started": "Aug 2020",
// 		"date_completed": "Aug 2020",
// 		"project": "Abstract Mudkip",
// 		"category": "3D Pen",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=QwV4vjeYzqE",
// 			"Instagram": "https://www.instagram.com/p/CEieAzNJOkX/"
// 		}
// 	},
// 	{
// 		"date_started": "Aug 2020",
// 		"date_completed": "Aug 2020",
// 		"project": "3D Pen Pirate Ship",
// 		"category": "3D Pen",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=FTyr1llCN4o",
// 			"Instagram": "https://www.instagram.com/p/CEQBZvBpcNq/"
// 		}
// 	},
// 	{
// 		"date_started": "Aug 2020",
// 		"date_completed": "Aug 2020",
// 		"project": "Polymer Clay Beach Island",
// 		"category": "Polymer Clay",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=-mHM_Lj1VD4",
// 			"Instagram": "https://www.instagram.com/p/CDaxWpujiJ_/"
// 		}
// 	},
// 	{
// 		"date_started": "Aug 2020",
// 		"date_completed": "Aug 2020",
// 		"project": "3D Printer Pen Cactus",
// 		"category": "3D Pen",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=2vJgDEdreUs",
// 			"Instagram": "https://www.instagram.com/p/CDai88oDxDS/"
// 		}
// 	},
// 	{
// 		"date_started": "",
// 		"date_completed": "Jul 2020",
// 		"project": "Polymer Clay Village",
// 		"category": "Polymer Clay",
// 		"links": {
// 			"YouTube": "https://www.youtube.com/watch?v=Qpcng4tSGqs",
// 			"Instagram": "https://www.instagram.com/p/CDTLpcjjrBY/"
// 		}
// 	}
// ]

// var table_items = [];
// var categories_totals = {};

// json_test.forEach(function(item) {
// 	if (item["category"] in categories_totals) {
// 		categories_totals[item["category"]] = categories_totals[item["category"]] + 1;
// 	} else {
// 		categories_totals[item["category"]] = 1;
// 	}
//     table_items.push("<tr>");
//     table_items.push("<td sorttable_customkey='" + calculateDateRank(item["date_started"]) + "'>" + item["date_started"] + "</td>" );
//     table_items.push("<td sorttable_customkey='" + calculateDateRank(item["date_completed"]) + "'>" + item["date_completed"] + "</td>" );
//     table_items.push("<td>" + item["project"] + "</td>" );
//     table_items.push("<td>" + item["category"] + "</td>" );
//     table_items.push("<td>" + createLinks(item["links"]).join(", ") + "</td>" );
//     table_items.push("</tr>");
// });

// $( "#artTable" ).append(table_items.join(""));

// /* Morris Donut JS for Art Page */
// Morris.Donut({
//   element: 'art-donut-viz',
//   data: create_morris_donut_labels(categories_totals)
// });

// $( "#art-total-viz" ).text("Total Projects Listed: " + count_overall_total(categories_totals));

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
		    table_items.push("<tr>");
		    table_items.push("<td sorttable_customkey='" + calculateDateRank(item["date_started"]) + "'>" + item["date_started"] + "</td>" );
		    table_items.push("<td sorttable_customkey='" + calculateDateRank(item["date_completed"]) + "'>" + item["date_completed"] + "</td>" );
		    table_items.push("<td>" + item["project"] + "</td>" );
		    table_items.push("<td>" + item["category"] + "</td>" );
		    table_items.push("<td>" + createLinks(item["links"]).join(", ") + "</td>" );
		    table_items.push("</tr>");
	});

	$( "#artTable" ).append(table_items.join(""));

	/* Morris Donut JS for Art Page */
	Morris.Donut({
	  element: 'art-donut-viz',
	  data: create_morris_donut_labels(categories_totals)
	});

	/* Total Count */
	$( "#art-total-viz" ).text("Total Projects Listed: " + count_overall_total(categories_totals));
});