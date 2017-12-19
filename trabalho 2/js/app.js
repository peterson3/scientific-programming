   function plotXY(methodResult, nomeMetodo){
		let PLOTAREA = document.getElementById('plotArea');
		Plotly.plot( PLOTAREA, [{
		x: methodResult[0],
		y: methodResult[1],
		name: nomeMetodo }], {
		margin: { t: 0 } } );

	 	//console.table(methodResult[0]);
	 	//console.table(methodResult[1]);
	}

	function limparPlotter(methodResult, nomeMetodo){
		let PLOTAREA = document.getElementById('plotArea');
		Plotly.purge(PLOTAREA);
	}

	function metodoExplicito(dt, dx){
		var t, t0, tfim, x, x0, xfim, dt, dx, c, csi;

		//esses valores vão ser setados no html!
		//ALTERAR DEPOIS
		//dt = 0.1; /* delta tempo */
		//dx = 0.2;   /* delta espaco */
		
		//intervalo de tempo
		t0   = 0;
		tfim = 3;

		//intervalo do espaco
		x0   = 0.0;
		xfim = 1.0;


		//numero de intervalos de tempo e espaco
		nx = ((xfim - x0)/dx) + 1;
		nt = ((tfim - t0)/dt) + 1;
		
		
		let solucao = new Array(nt);
			for (let i = 0; i < solucao.length; i++) {
		    solucao[i] = new Array(nx);
			}
			

		
		//constante
		c = 1.0;

		//csi
		csi = c * dt/(dx*dx);
	
		
		let xs = [];
		let ys =[];
		let result2 = [];
	 	
		x=x0;
		xs.push(x);
		
		//condicao inicial 
		for (let j = 0; j < nx; j++)
		{
			solucao[0][j] = u(x);
			x += dx;
			xs.push(x);
		}

		result2.push(xs);

		t = t0;
		//condicao de contorno
		for (let i = 0; i < nt; i++)
		{
			t += dt;
			//console.log(solucao);
			solucao[i][0]= gx0(t);
			solucao[i][nx-1] = gxfim(t);
		}

		t=t0;
		x=x0;


		//Preenchendo a meiuca da tabela
		for (i=1; i<nt; i++){
			for (j=1; j< nx - 1; j++){
				x += dx;
				solucao[i][j] = (csi * solucao[i-1][j-1]) + ((1-(2*csi))* solucao[i-1][j]) + (csi * solucao[i-1][j+1]) + f(x,t); 
			}
			t += dt;
			x = x0;
		}

		console.table(solucao);
		
		//Plotando para cada X
		for (i=0; i<nt; i++){
			for (j=0; j<nx; j++){
	    		 ys.push(solucao[i][j]);
			}
			result2.push(ys);
			plotXY(result2, "");
			ys = [];		
		    result2.pop();	 	
		}
				
	}		
	
	/*funcao u(x,0)*/
	function u(x)
		{
		return 50*Math.sin(Math.PI*x)+x;
		}
	
	function gx0(t)
	   {
		   return 0;
	   }
	   
	//fonte
	function f(x,t)
		{

		console.log("X= " + x + " T= " + t);
		if ((parseFloat(parseFloat(x).toFixed(5)) == 0.6) && (parseFloat(parseFloat(t).toFixed(5)) >= 0.1) && (parseFloat(parseFloat(t).toFixed(5)) <= 0.3))
			{
				console.log("retornando 50");
				return 50;
			}


		else{
			console.log("retornando 0");
			return 0;
		}
		}
	
function gxfim(t)
   {
   return(1);
   }
	
	function funcParser(){
		// create a parser
		let parser = math.parser();
		let FUNCPARSING = $('#funcArea').val();
		parser.eval("f(x,y)=" + FUNCPARSING);
		return parser.get('f');
	}

$("#btn").on('click', function(){
	metodoExplicito(Number($('#deltaTArea').val()), Number($('#deltaXArea').val()))
		});
$("#btnClear").click(limparPlotter);