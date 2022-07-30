
// Google auth2 is initialized when user is signed in.
function onSignIn(googleUser){
	var profile = googleUser.getBasicProfile();
	$(".g-signin2").css("display","none");
	$(".data").css("display","block");
	$("#pic").attr('src',profile.getImageUrl());
	$("#email").text(profile.getEmail());
	
}
	
//User is signing out
function signOut(){
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function(){
		alert("You have been successfully signed out");
		$(".g-signin2").css("display","block");

	});
}


//generate next text-utterance
var j=0;
function swapText(j){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			newPhrase(this,j);
		}
	};
	xhttp.open("GET", "utterance.xml", true);
	xhttp.send();
}
	phid = 20000;
function newPhrase(xmlhttp,j) {
	let txt = "";
    let x, y, attnode, xmlDoc;
    xmlDoc = xmlhttp.responseXML;
	x = xmlDoc.getElementsByTagName('phrasetext');
    txt += x[j].childNodes[0].nodeValue + "<br>";		
	document.getElementById("phrasetext").innerHTML = txt;
	y = xmlDoc.getElementsByTagName('phraseid');
    phid = y[j].childNodes[0].nodeValue;
}


 	//kick mic to get stream plus permission
    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream)})

            function handlerFunction(stream) {
            rec = new MediaRecorder(stream);
			rec.ondataavailable = e => {
              audioChunks.push(e.data);
			   if (rec.state == "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                audioplayer.src = URL.createObjectURL(blob);
				 audioplayer.controls=true;
                audioplayer.autoplay=false;
                sendData(blob)
              }
            }
		}

		
		
		// function to send the recorded blob to server
		function sendData(newblob)
				{
			  		var blobName = getBlobName('mpeg3');
						var fd = new FormData();
						fd.append('fname', blobName);
						fd.append('data', newblob);
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "connectafrolingo.php", true);
						xhr.send(fd);
				}
			
		// this function is used to generate blob name
            function getBlobName(fileExtension) {
                var d = new Date();
                var year = d.getUTCFullYear();
                var month = d.getUTCMonth();
                var date = d.getUTCDate();
				
                return 'vr' + year + month + date + '.' + phid + '.' + fileExtension;
				}
		
		
		//record and stop via holddown and release 
	function recordAudio(){
			
			{
			var y = document.getElementById("checkrecording");
				if (y.innerHTML === "Hold down mic to record") {
					y.innerHTML = "recording 0-o-0-o-o";
					y.style.color = "green";
							} 		
							else {
							y.innerHTML = "Hello";
							}
				
					}
							
			audioChunks = [];
			rec.start();
					
			}
	
	function stopRecording() {
	
			var y = document.getElementById("checkrecording");
				if (y.innerHTML === "recording 0-o-0-o-o") {
					y.innerHTML = "Hold down mic to record";
					y.style.color = "grey";
						} 
						else {
							y.innerHTML = "Hello";
							}
	
				rec.stop();
			
			
			}
			
			//initial setup
		document.addEventListener('DOMContentLoaded', function(){
		addListeners();
		setRating(); //based on value inside the div
		});
		
		function addListeners(){
		var stars = document.querySelectorAll('.star');
		[].forEach.call(stars, function(star, index){
			star.addEventListener('click', (function(idx){
			console.log('adding rating on', index);
			document.querySelector('.stars').setAttribute('data-rating',  idx + 1);  
			console.log('Rating is now', idx+1);
			setRating();
			}).bind(window,index) );
		});
		
		}
		
		function setRating(){
		var stars = document.querySelectorAll('.star');
		var rating = parseInt( document.querySelector('.stars').getAttribute('data-rating') );
		[].forEach.call(stars, function(star, index){
			if(rating > index){
			star.classList.add('rated');
			console.log('added rated on', index );
			}else{
			star.classList.remove('rated');
			console.log('removed rated on', index );
			}
		});
		}
		
		
		
		// when Next is clicked, send last rating to db, clear rating, display new phrase, obtain phraiseID of new phrase and fetch corresponding audio file
		var n = 0;
		
			
			
var vm = new Vue({
	el: '#root',
	data: {
		
	},
	methods: {
		fetchAudio: function(id){
			axios.post('getaudiourl.php', {
				phrid: id,
			})
			.then(function (response) {
				console.log(response.data);
				if(response.data.status){
					audioplayer1.src = response.data.url;
					audioplayer1.load();
					audioplayer1.autoplay=false;
					console.log("Request complete! response:", response.data.url);
				}else{

				}
				
			})
			.catch(function (error) {
				console.log(error);
			});

		},
		nextaudioText: function (n){
			//submitrate();
			//clearrater();
			swapText(n);
			this.fetchAudio(phid);
		},
			
	}
		
});