// var start_val = 0,
//     duration = 5000,
//     end_val = [0.06, 14, 1.33333, -232332312.00, 99999];
// 
// //var qSVG = d3.select("#ans_war").append("svg").attr("width", 200).attr("height", 200);
// 
// var format = d3.format(",d");
// 
// d3.select("#span_war")
//   .transition()
//     .duration(8000)
//     .on("start", function repeat() {
//       d3.active(this)
//           .tween("text", function() {
//             var that = d3.select(this),
//                 i = d3.interpolateNumber(that.text().replace(/,/g, ""), 484);
//             return function(t) { that.text(format(i(t))); };
//           })
//         //.transition()
//           //.delay(1500)
//           //.on("start", repeat);
//     });
