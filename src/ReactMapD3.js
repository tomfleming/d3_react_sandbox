import * as d3 from 'd3';
import topojson from 'topojson';
let svg, html, bubble;

export default class ReactMapD3 {

  constructor(el, props = {}) {
    let defaultProps = {
      id: 'map-d3',
      mapfile: 'my_topo.json',
      width: 1000,
      height: 400
    }

    this.props = Object.assign(defaultProps, props);

    // reference to svg element containing circles
    this.svg = d3.select(el).append('svg')
      .attr('id', this.props.id)
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    let svg = this.svg;

    let projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([this.props.width / 2, this.props.height / 2]);

    this.path = d3.geoPath()
      .projection(projection);
    let path = this.path;

    this.rateById = d3.map();
    let that = this;
    d3.queue()
      .defer(d3.json, this.props.mapfile)
      .defer(
        d3.tsv,
        "dist/unemployment.tsv",
        (d) => { that.rateById.set(d.id, +d.rate); })
      .await(ready);

    function ready(error, us) {
      if (error) throw error;

      svg.append("g")
          .attr("class", "counties")
        .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
          .attr("d", path)
          .style('stroke', '#FFFFFF');
    }
  }

  update(el, props) {

    Object.assign(this.props, props);

    this.svg.
      transition().duration(2000)
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    let projection = d3.geoAlbersUsa()
      .scale(1280)
      .translate([this.props.width / 2, this.props.height / 2]);

    this.path = d3.geoPath()
      .projection(projection);
    let path = this.path;

    var quantize = d3.scaleQuantize()
      .domain([0, 0.15])
      .range(d3.range(9).map((i) => { return "q" + i + "-9"; }));

    let that = this;
    this.svg.selectAll('path')
      .attr('d', path)
      .attr("class", (d) => { return quantize(that.rateById.get(d.id)); })
      .transition().duration(3000)
      .style('stroke', '#81E797')
  }

  destroy(el) {}
}
