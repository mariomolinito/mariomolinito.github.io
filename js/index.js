// countries to use 
const countries = ["Australia", "Canada", "China", "Cuba", "Finland", "Iran", "North Korea", "Russia", "Switzerland", "Syria", "United Kingdom", "United States", "Venezuela"];
const container = document.querySelector("main");

const addToDiv = (div, header, message)=>{
	const temp = document.createElement("div");
	temp.classList.add("informationIndiv");
	const h4 = document.createElement("h4"); 
	h4.innerText = header;
	const p = document.createElement("p"); 
	p.innerText = message;
	temp.appendChild(h4);
	temp.appendChild(p);
	div.appendChild(temp);
};

function makeInteresting(country)
{
	return new Promise((resolve, reject)=>{
		// get info from the api
		const query = "https://restcountries.eu/rest/v2/name/" + country;
		fetch(query)
		// await till all the packets are given to us
		.then(async (r)=>await r.json())
		.then((r)=>{
			console.log(r);
			if (!r)
				reject(false);
			const result = r[0];
			if (result.length >= 2)
			{
				result = result[0];
			}
			const { name, capital, area, demonym, flag, latlng, population, region, timezones } = r[0];
			const div = document.createElement("div");

			const img = document.createElement("img");
			img.src = flag;
			const nameh2 = document.createElement("h2");
			nameh2.innerText = name;

			div.appendChild(img);
			div.appendChild(nameh2);

			const information = document.createElement("section");
			information.classList.add("info");

			addToDiv(information, "Capital", capital);
			addToDiv(information, "Area", area);
			addToDiv(information, "Demonym", demonym);
			addToDiv(information, "Lat-Lng", latlng);
			addToDiv(information, "Population", population);
			addToDiv(information, "Region", region);

			// TODO: do something diff for timezones
			// - put it in the footer perhaps
			addToDiv(information, "timezones", timezones);

			div.appendChild(information);
			container.appendChild(div);
		})
		.catch((e)=>{
			console.error(e);
		});
	});
};

for (const country of countries)
{
	makeInteresting(country)
	.then((r)=>{
		console.log(r);
	})
	.catch((e)=>{
		return;
	})
}
