$(document).ready(function(){ 


	mapa(-21.23,-43.77);
	

	$('#button').click(function(){
		pesquisa();
	});
	
	$( "#texto" ).keypress(function(e) {
  		if (e.which == 13) {
			pesquisa();
		}
	});


	function pesquisa() {
		
		let SUA_CHAVE = "Use sua chave aqui";
		var texto=$('#texto').val();
		$('#texto').val('');
		$.ajax({type: 'GET',url: 'http://api.openweathermap.org/data/2.5/weather?q='+texto+'&appid='+SUA_CHAVE, success: function(resp){
   		
     		var latitude= JSON.parse(resp.coord.lat);
			var longitude= JSON.parse(resp.coord.lon);
			var cod = JSON.parse(resp.cod);
     		console.log(resp);
		    if(cod==200){
		    	$('#imagem').hide();
		       	$('#msg_erro').fadeOut(500);
		     	$('#informacoes').fadeIn(500);
		   
			    $('#pesquisa').css({
			 		width: "30%",
					height: "25vh"
			    });
			
		     	$('#informacoes').html('<h1>'+resp.name+'</h1><img src="http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png" class="img_icon"><br>Temperatura atual: ' + (resp.main.temp-273.15).toFixed(2) + '°C<hr> <div id = "esquerda"><br>Temperatura  máxima: ' +(resp.main.temp_max-273.15).toFixed(2) + 
		     		'°C<hr><br>Temperatura mínima: ' +(resp.main.temp_min-273.15).toFixed(2) + '°C<hr><br>Longitude: ' + resp.coord.lon + '<hr></div> <div id = "direita"><br>Nascer do sol: ' + time(resp.sys.sunrise)+ '<hr><br>Pôr do sol: ' + time(resp.sys.sunset)+'<hr><br>Latitude: '+ resp.coord.lat + '<hr></div>') ;
				$('#mapa').html(mapa(latitude,longitude));
			}
		
			else{ 
				$('#msg_erro').fadeIn(500);
				$('#informacoes').fadeOut(500);
			}
	
		}
		});
		
	}

	function time(hora) {
		var date = new Date(hora*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();	
		var horario = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		
		return horario;	
	}

	function mapa(latitude, longitude) {
    	var coord = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 8,
          center: coord
        });
        var marker = new google.maps.Marker({
          position: coord,
          map: map
        });
  	}

	
});
