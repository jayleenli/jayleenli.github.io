/* Load data from JSON file and then populate project showcase. 
- Also able to sort into the correct categories
- (try to get this feature) Able to automatically size how many projects in each column

Input format:
{
	"project_name": "Type-Type-Revolution",
	"subheader": "SLO-Hacks 2019",
	"date": "Feb 2019",
	"img_src": "images/ttr.JPG",
	"img_alt_text": "Type-Type-Revolution screenshot",
	"description_html": "Online web-based Multiplayer typing race game made at SLO HACKS 2019 using Javascript and Firebase. <br/> Awards: Best Game/Game Design and Best Domain Name.",
	"category": "hackathon",
	"featured": true,
	"links": {
		"href": "https://jayleenli.github.io/type-type-revolution/",
		"GitHub": "https://github.com/jayleenli/type-type-revolution",
		"Devpost": "https://devpost.com/software/type-type-revolution",
		"Demo": "https://jayleenli.github.io/type-type-revolution/",
	}
}


Example generated div for a project:

<div class="services color-1">
	<div class="blog-entry">
		<a href="https://jayleenli.github.io/type-type-revolution/" target="_blank" class="blog-img"><img src="images/ttr.JPG" class="img-responsive" alt="Type-Type-Revolution screenshot"></a>
		<div class="desc">
			<center>
				<h3><a href="https://jayleenli.github.io/type-type-revolution/" target="_blank">Type-Type-Revolution</a></h3>
				<h4>SLO-Hacks 2019</h4>
			</center>
			<p>Online web-based Multiplayer typing race game made at SLO HACKS 2019 using Javascript and Firebase. <br/> Awards: Best Game/Game Design and Best Domain Name.</p>
			<span>
				<small><a class="btn btn-project-link" href="https://github.com/jayleenli/type-type-revolution" target="_blank">Github </a>
				<a class="btn btn-project-link" href="https://devpost.com/software/type-type-revolution" target="_blank">Devpost </a>
				<a class="btn btn-project-link" href="https://jayleenli.github.io/type-type-revolution/" target="_blank">Demo </a>
				</small>
			<small style="float:right;margin-top: 18px;">Feb 2019</small> 
			</span>
		</div>
	</div>
</div>
*/

/* Maps */
var color_map = {
	"hackathon" : "color-1",
	"leadership_involvement" : "color-5",
	"personal" : "color-4"
}

function createLinks(obj) {
	var links = [];
	links.push("<small>");
	for (const [key, value] of Object.entries(obj)) {
		if (key !== "href") {
			links.push(`<a class='btn btn-project-link' href='${value}' target='_blank'>${key}</a>`);
		}
	}
	links.push("</small>")
	return links.join("");
}

function createImageHeader(href, image, alt_text) {
	return `<a href='${href}' target='_blank' class='blog-img'><img src='${image}' class='img-responsive' alt='${alt_text}'></a>`;
}

function createTitle(href, project_name, subheader) {
	return `<center><h3><a href='${href}' target='_blank'>${project_name}</a></h3><h4>${subheader}</h4></center>`;
}

function createDateFooter(date) {
	return `<small style='float:right;margin-top: 18px;'>${date}</small> `;
}

function determineColor(category) {
	return color_map[category]
}

function createColumns(project_items_list) {
	// Have it set divide into 3 columns. This is why I think maybe changing this so that each box is the same size might be easier on the eyes. thats a TODO for another time
	var divided_project_section = [];
	const group_count = Math.ceil(project_items_list.length/3.0);
	
	divided_project_section.push(`<div class='col-md-4 animate-box' data-animate-effect='fadeInLeft'>`);
	divided_project_section.push(project_items_list.slice(0, group_count));
	divided_project_section.push(`</div>`);
	divided_project_section.push(`<div class='col-md-4 animate-box' data-animate-effect='fadeInLeft'>`);
	divided_project_section.push(project_items_list.slice(group_count, group_count*2));
	divided_project_section.push(`</div>`);
	divided_project_section.push(`<div class='col-md-4 animate-box' data-animate-effect='fadeInLeft'>`);
	divided_project_section.push(project_items_list.slice(group_count*2, project_items_list.length));
	divided_project_section.push(`</div>`);

	return divided_project_section.join("");
}

/* Test data locally. God Bless for ChatGPT converting all my shit into JSON for me ~chefs kiss~ */ 
// var json_test = [insert data here];

// var featured_items = [];
// var hackathon_items = [];
// var leadership_involvement_items = [];
// var personal_items = [];

// json_test.forEach(function(item) {
// 	var item_html = [];
// 	item_html.push(`<div class='services ${determineColor(item["category"])}'><div class='blog-entry'>`)
// 	item_html.push(createImageHeader(item["links"]["href"], item["img_src"], item["img_alt_text"]));
//   item_html.push(`<div class="desc">`);
//   item_html.push(createTitle(item["links"]["href"], item["project_name"], item["subheader"]));
//   item_html.push(`<p>${item["description_html"]}</p>`);
//   item_html.push(`<span>`);
//   item_html.push(createLinks(item["links"]));
//   item_html.push(createDateFooter(item["date"]));
//   item_html.push(`</span>`);
//   item_html.push("</div></div></div>");

//   if (item["featured"] === true) {
//   	featured_items.push(item_html.join(""));
//   }
//   switch (item["category"]) {
//   	case "hackathon": hackathon_items.push(item_html.join("")); break;
//   	case "leadership_involvement": leadership_involvement_items.push(item_html.join("")); break;
//   	case "personal": personal_items.push(item_html.join("")); break;
//   	default:
//   		console.error("unhandled type");
//   }
// });

// $( "#showcase-featured" ).append(createColumns(featured_items));
// $( "#showcase-hackathons" ).append(createColumns(hackathon_items));
// $( "#showcase-leadership" ).append(createColumns(leadership_involvement_items));
// $( "#showcase-personal" ).append(createColumns(personal_items));

/* Test data locally end. */ 

// Real data hitting endpoint
$.getJSON( "https://jayleenli.github.io/data/project_showcase.json", function( data ) {
	var featured_items = [];
	var hackathon_items = [];
	var leadership_involvement_items = [];
	var personal_items = [];

	json_test.forEach(function(item) {
		var item_html = [];
		item_html.push(`<div class='services ${determineColor(item["category"])}'><div class='blog-entry'>`)
		item_html.push(createImageHeader(item["links"]["href"], item["img_src"], item["img_alt_text"]));
	  item_html.push(`<div class="desc">`);
	  item_html.push(createTitle(item["links"]["href"], item["project_name"], item["subheader"]));
	  item_html.push(`<p>${item["description_html"]}</p>`);
	  item_html.push(`<span>`);
	  item_html.push(createLinks(item["links"]));
	  item_html.push(createDateFooter(item["date"]));
	  item_html.push(`</span>`);
	  item_html.push("</div></div></div>");

	  if (item["featured"] === true) {
	  	featured_items.push(item_html.join(""));
	  }
	  switch (item["category"]) {
	  	case "hackathon": hackathon_items.push(item_html.join("")); break;
	  	case "leadership_involvement": leadership_involvement_items.push(item_html.join("")); break;
	  	case "personal": personal_items.push(item_html.join("")); break;
	  	default:
	  		console.error("unhandled type");
	  }
	});

	$( "#showcase-featured" ).append(createColumns(featured_items));
	$( "#showcase-hackathons" ).append(createColumns(hackathon_items));
	$( "#showcase-leadership" ).append(createColumns(leadership_involvement_items));
	$( "#showcase-personal" ).append(createColumns(personal_items));
});