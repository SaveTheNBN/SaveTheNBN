function mapInitialize(model) {

    // http://stackoverflow.com/questions/10656743/how-to-offset-the-center-point-in-google-maps-api-v3/10666030#10666030
    function offsetCenter(latlng,offsetx,offsety) {

        // latlng is the apparent centre-point
        // offsetx is the distance you want that point to move to the right, in pixels
        // offsety is the distance you want that point to move upwards, in pixels
        // offset can be negative
        // offsetx and offsety are both optional

        var scale = Math.pow(2, map.getZoom());
        var nw = new google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );

        var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
        var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

        var worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

        return newCenter;
    }

    function getPositionOffset(position){
        var offset = 0,
            sidebarWidth = 500,
            windowWidth = $(window).width();

        if(windowWidth > sidebarWidth){
            offset = windowWidth / 2 - (windowWidth - sidebarWidth) / 2
        }else{
            offset = windowWidth / 4;
        }

        return offsetCenter(position, offset);
    }

    // map options
    google.maps.visualRefresh = true;
    var mapOptions = {
      center: new google.maps.LatLng(-29.286399,131.19873),
      zoom: 5,
      disableDefaultUI: true,
        zoomControl: true,
      scrollwheel: false,
      zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($(".background-map")[0],
        mapOptions);

    var currentMarkers = [],
        updateTimer = null;

    function createMemberMarker(member){
        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(member.location.lat, member.location.lng),
                title:member.Name
            });

        marker.member = member;

        marker.addListener("click", function() {
            model.set('[selectedMember]', this.member);
        });

        return marker;
    }

    function removeAllMarkers(){
        currentMarkers.forEach(function(marker){
            marker.setMap(null);
        });
    }

    model.bind('[results]', function(event){
        clearTimeout(updateTimer);
        updateTimer = setTimeout(function(){
            var members = event.getValue();

            removeAllMarkers();

            for(var i = 0; i < members.length; i++) {
                var member = members[i],
                    marker = createMemberMarker(member);

                currentMarkers.push(marker);
                marker.setMap(map); // add marker
            };
        }, 300);
    });

    model.bind('[selectedMember]', function(event){
        var member = event.getValue(),
            selectedMarker,
            markerPosition;

        if(!member){
            return;
        }

        currentMarkers.forEach(function(marker){
            if(marker.member === member){
                selectedMarker = marker;
            }
        });

        if(!selectedMarker){
            currentMarkers.push(selectedMarker = createMemberMarker(member));
        }

        markerPosition = selectedMarker.getPosition();

        map.panTo(getPositionOffset(markerPosition));
    });
}

module.exports = mapInitialize;