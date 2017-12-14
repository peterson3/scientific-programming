	function plotXY(methodResult, nomeMetodo){
		let PLOTAREA = document.getElementById('plotArea');
		Plotly.plot( PLOTAREA, [{
		x: methodResult[0],
		y: methodResult[1],
		name: nomeMetodo }], {
		margin: { t: 0 } } );

	 	console.table(methodResult[0]);
	 	console.table(methodResult[1]);
	}

	function limparPlotter(methodResult, nomeMetodo){
		let PLOTAREA = document.getElementById('plotArea');
		Plotly.purge(PLOTAREA);
	}

	function metodoExplicito(t, t0, tfim, x, x0, xfim, dt, dx, c, csi){
		
		console.log("Método Explícito");

		//esses valores vão ser setados no html!
		//ALTERAR DEPOIS
		dt = 0.001; /* delta tempo */
		dx = 0.05;   /* delta espaco */

		
		//intervalo de tempo
		t0   = 0.0;
		tfim = 0.5;

		//intervalo do espaco
		x0   = 0.0;
		xfim = 1.0;

		//numero de intervalor de tempo e espaco
		nt = ((tfim - t0)/dt) + 2;
		nx = ((xfim - x0)/dx) + 2;

		//constante
		let c = 1.0;

		//csi
		let csi = c * dt/(dx*dx);
		
		//condicao inicial 
		for (j = 0; j < nx; j++)
		{
			metodoExplicito[0][j] = f(x);
			x += dx;
		}

		//condicao de contorno
		for (i = 0; i < nt; i++)
		{
			t += dt;
			metodoExplicito[i][0]      = gx0(t);
			metodoExplicito[i][nx - 1] = gxfim(t);
   
		for (j = 1; j < nx - 1; j++)
		{
			metodoExplicito[i + 1][j] = csi * (metodoExplicito[i][j + 1] + metodoExplicito[i][j - 1]) + (1.0 - 2.0 * csi) * metodoExplicito[i][j];
        }
		//falta fazer o retorno e torcer pra dar certo
		let result = [];
	 	result.push(metodoExplicito);
		return result;
		}	  
	}		
	
	/*funcao f(x,t)*/
	function f(x)
    {
    if (x >= 0.0) 
        if (x <= 0.3)  
			return(50.0);
        else         
			return(0.0);
		else            
			return(0.0);
    }
	
	function funcParser(){
		// create a parser
		let parser = math.parser();
		let FUNCPARSING = $('#funcArea').val();
		parser.eval("f(x,y)=" + FUNCPARSING);
		return parser.get('f');
	}

	function executaMetodo(){
		//Atualizar f,h e n de acordo com os inputs
		let f; //Função a ser recuperada pelo parser e ser usada pelo método
		let h; //Tamanho do Salto (H)
		let n; //Número de Iterações do Método
		let result; //Objeto com Resultado dos Méotod (Xs e Ys)
		let xInit;
		let yInit;

		
		f = funcParser();
		h = Number($('#hArea').val());
		n = Number($('#stepsArea').val());
		xInit = Number($('#xInit').val());
		yInit = Number($('#yInit').val());

		try{
		//Verificar qual método Selecionado
		switch($('#methodSelector option:selected').text()) {
		    case "Explicito":
		        result = metodoExplicito(t, t0, tfim, x, x0, xfim, dt, dx, c, csi);
		        plotXY(result, "Explicito");
		        break;
		     case "Euler Modificado":
		        result = metodoDeEulerModificado(f,h,n, xInit, yInit);
		        plotXY(result, "Euler Modificado");
		        break;
		     
		    default:
		        alert("Selecione um Método")
		}
		}catch(exception){
			alert("Erro: Verifique os Dados");
			console.log(exception.message);
		}
	}


	$("#btn").click(executaMetodo);
	$("#btnClear").click(limparPlotter);