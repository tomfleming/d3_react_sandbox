import * as d3 from 'd3';
import topojson from 'topojson';
let svg, html, bubble;

export default class ReactMapD3 {

  constructor(el, props = {}) {
    //
    // reference to svg element containing circles
    this.svg = d3.select(el).append('svg')
      .attr('class', 'map-d3')
      .attr('width', 1000)
      .attr('height', 400);

    let svg = this.svg;
    let width = this.svg.attr("width");
    let height = this.svg.attr("height");

    let projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([width / 2, height / 2]);

    this.path = d3.geoPath()
      .projection(projection);
    let path = this.path;

    d3.queue()
      .defer(d3.json, "dist/us.json")
      .await(ready);

    function ready(error, us) {
      if (error) throw error;

      svg.append("g")
          .attr("class", "counties")
        .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
          .attr("d", path);
    }
  }

  update(el, props) {
    var data = props;
    if (!data) return;

    this.svg.attr('width', props.width);
    this.svg.attr('height', props.height);

    let width = this.svg.attr("width");
    let height = this.svg.attr("height");

    let projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([width / 2, height / 2]);

    this.path = d3.geoPath()
      .projection(projection);
    let path = this.path;

    this.svg.selectAll('path').attr('d', path);

  }

  destroy(el) {}
}
