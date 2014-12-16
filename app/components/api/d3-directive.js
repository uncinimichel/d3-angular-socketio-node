    'use strict';

    angular.module('Skeleton').directive('d3', function (d3Service, $rootScope) {
    return {
        restrict: 'EA',
        scope: {
            map: '=map',
            points: '=points'
        },
        template: '<div id="d3Map"> </div>',
        link: function (scope, element, attrs) {
            if (!scope.map.jsonFile) {
                throw new Error('No map name specified');
            }

            var d3 = d3Service.d3();

            var width  = 800,
                height = 600;

            var projection = d3.geo.mercator()
                .center([0, 5])
                .scale(100)
                .rotate([0,0]);

            var svg = d3.select(element[0])
                .append('svg')
                .attr("width", width)
                .attr("height", height);

            var path = d3.geo.path()
                .projection(projection);

            var g = svg.append("g");

            // load and display the World
            d3.json(scope.map.jsonFile, function(error, topology) {
                g.selectAll("path")
                    .data(topojson.feature(topology, topology.objects.countries).features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                _loadPoints(scope.points);
            });

            scope.$watch('points', function (oldValue, newValue) {
                _loadPoints(newValue || {});
            }, true);

            var _loadPoints = function (points) {
                g.selectAll("circle")
                   .data(points)
                   .enter()
                   .append("circle")
                   .attr("cx", function(d) {
                           return projection([d.long, d.lat])[0];
                   })
                   .attr("cy", function(d) {
                           return projection([d.long, d.lat])[1];
                   })
                   .attr("r", 1)
                   .style("fill", "red");
            }


            // zoom and pan
            var zoom = d3.behavior.zoom()
                .on("zoom",function() {
                    g.attr("transform","translate("+ 
                        d3.event.translate.join(",")+")scale("+d3.event.scale+")");
                    g.selectAll("path")  
                        .attr("d", path.projection(projection)); 
              });

            svg.call(zoom);
        }
    };

    });
