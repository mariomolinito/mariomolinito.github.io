fetch("https://restcountries.eu/rest/v2/name/Australia?fullText=true")
.then(async (r)=>{
	return await r.json();
})
.then((r)=>{
	console.log(r);
})
.catch((e)=>{
	console.log(e);
})
