var prettyGrids = {
	calibrate:{
		totalX: 6,
		totalY: 16,
		totalCanvas:2,
		gridSize: 20,
		path:'data',
		colors:['#a1d76a','#ddd','#e9a3c9'],
		categories:['increase','no change','decline']
	},
	data:[],
	output:[],
	populateGrid: function(c){
		var contain = document.getElementById('p-contain');
		for (var i=0 ; i < c.totalCanvas; i++){
			var canvas = document.createElement('div'), fragContain = document.createDocumentFragment();
			canvas .className = 'p-canvas';
			canvas.setAttribute('g', i);
			for (var ii=0; ii < c.totalY ; ii++){
				var row = document.createElement('div'), fragRow = document.createDocumentFragment();
				row .className = 'p-row';
				row.setAttribute('g', i);
				row.setAttribute('y', ii);				
				for (var iii = 0 ; iii < c.totalX ; iii++){
					var grid = document.createElement('div'), frag = document.createDocumentFragment();
					grid .className = 'p-grid';
					grid.setAttribute('g', i);
					grid.setAttribute('y', ii);
					grid.setAttribute('x', iii);
					frag.appendChild(grid);
					row.appendChild(frag);
				}
				fragRow.appendChild(row);
				canvas.appendChild(fragRow);
			}	
			fragContain.appendChild(canvas);
			contain.appendChild(fragContain);	
		}
		prettyGrids.populateData(prettyGrids.data, c, prettyGrids.output);
	},
	populateData: function(d, c){
		for (var i=0 ; i < c.totalCanvas; i++){
			for (var ii=0; ii < c.totalY ; ii++){		
				for (var iii = 0 ; iii < c.totalX ; iii++){
					$('.p-canvas:eq('+i+') .p-row:eq('+ii+') .p-grid:eq('+iii+')').attr({
						'label': d[i][ii][iii][0],
						'data': d[i][ii][iii][1],
						'category': d[i][ii][iii][2]
					});

					/* CHECK CATEGORY AND COLOR GRID */
					for (var v=0 ; v < c.categories.length ; v++){
						if (d[i][ii][iii][2] === c.categories[v]){
							$('.p-canvas:eq('+i+') .p-row:eq('+ii+') .p-grid:eq('+iii+')').css('background', c.colors[v]);
						}
					}
				}
			}	
		}
	},
	importJSON: function(path){
		$.getJSON('data/' + path + '.json', function (d) {
			 prettyGrids.data = d;
			 prettyGrids.populateGrid(prettyGrids.calibrate);
		});
	},
}

window.onload = function(){
	prettyGrids.importJSON(prettyGrids.calibrate.path);
}