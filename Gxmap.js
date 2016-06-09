var gxmapinstances = [];
var gxmapscriptLoading = false;
function gxMap() {
	this.GxMap;
	this.Icon;
	this.Title;
	this.Width;
	this.Height;
	this.Type;
	this.LatLong;
	this.wkt
	this.Precision;
	this.Ready = false;
	this.ScriptLoaded = false;	

	var gooshow;
	
	this.SetClickLatitude = function(data) {
		this.ClickLatitude = data;
	}
	this.GetClickLatitude = function() {
		return this.ClickLatitude;
	}
	this.SetClickLongitude = function(data) {
		this.ClickLongitude = data;
	}
	this.GetClickLongitude = function() {
		return this.ClickLongitude;
	}

	// Databinding for property Attribute
	this.SetAttribute = function(data) {
		///UserCodeRegionStart:[SetAttribute] (do not remove this comment.)
		this.wkt = data;
		if (gooshow) {
			gooshow.clear();
			gooshow.updateGeoJson(data);
		}
		///UserCodeRegionEnd: (do not remove this comment.)
	}

	// Databinding for property Attribute
	this.GetAttribute = function() {
        ///UserCodeRegionStart:[GetAttribute] (do not remove this comment.)
		if (gooshow) {
			var geoJson;
			var markers = gooshow.getMarkers();
			
			if (markers.length != 0) {
				if (markers.length == 1) {
					geoJson = {
						"type": "Point",
						"coordinates": [markers[0].position.lng(), markers[0].position.lat()]
					}
				}
				
				if (markers.length > 1) {
					/*geoJson= {
						"type": "GeometryCollection",
						"geometries": []
					};
					if (googleProvider) {
						console.log(googleProvider.markers)
						for (var i=0, len=googleProvider.markers.length; i<len; i++) {
							geoJson.geometries.push({
								"type": "Point",
								"coordinates": [googleProvider.markers[i].position.lat(), googleProvider.markers[i].position.lng()]
							});
						}
					}*/
					var len1=markers.length-1;
					geoJson = {
						"type": "Point",
						"coordinates": [markers[len1].position.lng(), markers[len1].position.lat()]
					};
					
				}
				return wellknown.stringify(geoJson);
			}
		}
		return "";
        ///UserCodeRegionEnd: (do not remove this comment.)
	}


	this.SetData = function(data) {
		this.GxMap = data; //this.GoogleMap = data; 

		/*if (typeof google === 'object' && typeof google.maps === 'object') {

		} else
		//		if (!this.ScriptLoaded)
		{
			var remoteScripts = [];
			gxmapinstance = this;
			remoteScripts.push("//maps.google.com/maps/api/js?sensor=false&callback=doShowExternal");
			gx.http.loadScripts(remoteScripts, function() {
				return true;
			})
			this.ScriptLoaded = true;
		}*/
	}

	this.GetData = function() {
		var data = GetGoogleMapData(this);
		return data;
	} 	


	this.show = function() {			
		var callShow = function () {			
			for (var i = 0; i< gxmapinstances.length; i++) {
				var obj = gxmapinstances[i];
				obj.show();
			}
		}
		
		if (typeof google === 'object' && typeof google.maps === 'object') {			
			this.doShow();
		} else {			
			if (!gxmapscriptLoading) {			
				gxmapscriptLoading = true;
				var remoteScripts = [];			
				remoteScripts.push("//maps.google.com/maps/api/js?sensor=false");			
				gx.http.loadScripts(remoteScripts , callShow.closure(this));
			}
			gxmapinstances.push( {"show": this.doShow.closure(this)}) ;
		}
		
	}

	this.doShow = function() {
		//GoogleShow(this);
		if (gooshow === undefined)
			gooshow = new gxGoogleShow();
		gooshow.GoogleShow(this);
	}
}
