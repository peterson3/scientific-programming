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

	function metodoDeEuler(f, h, n, x0, y0){
		
		console.log("Método de Euler");

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
		nt = ((tfim - t0)/h) + 2;
		nx = ((xfim - x0)/k) + 2;

		//constante
		let c = 1.0;

		//csi
		let csi = c * dt/(dx*dx);
		
		//condicao inicial 
		for (j = 0; j < nx; j++)
		{
			solucao[0][j] = f(x);
			x += dx;
		}

		//condicao de contorno
		for (i = 0; i < nt; i++)
		{
			t += dt;
			solucao[i][0]      = gx0(t);
			solucao[i][nx - 1] = gxfim(t);
   
		for (j = 1; j < nx - 1; j++)
		{
			solucao[i + 1][j] = csi * (solucao[i][j + 1] + solucao[i][j - 1]) + (1.0 - 2.0 * csi) * solucao[i][j];
       }
   }	   

		

    //
	// 	for (i=0; i<=n; i++){
	// 		xs.push(x);
	// 		ys.push(y);
	// 		k1 = f(x,y);
   	//		y = y + h * k1;
   	//		x = x + h;
	// 	}
    //
	// 	let result = [];
	// 	result.push(xs);
	// 	result.push(ys);
    //
	//	return result;
	}

	function metodoDeHeun(f, h, n, x0, y0){

		console.log("Método de Heun / Euler Melhorado");

		//Variáveis de Controle
		let i, j;

		//Variáveis Inerentes
		let y, x, k1, k2;
	   
	   	//dados do resultado a ser plotado
		let xs=[];
		let ys=[];
		
		//Definiando Próximas Iterações
		x = x0;
		y = y0;

		for (i = 0; i < n; i++){
		   xs.push(x);
	 	   ys.push(y);
		   k1 = f(x, y);
		   k2 = f(x + h, y + k1 * h);
		   y = y + (h/2) * (k1 + k2);
		   x = x + h;   
		}

		let result = [];
	 	result.push(xs);
	 	result.push(ys);

	 	return result;
	}

	function metodoDeEulerModificado(f, h, n, x0, y0){

		console.log("Método Euler Modificado");

		//Variáveis de Controle
		let i, j;

		//Variáveis Inerentes
		let y, x;
	   
	   	//dados do resultado a ser plotado
		let xs=[];
		let ys=[];
	
		//Definiando Próximas Iterações
		x = x0;
		y = y0;

		for (i = 0; i < n; i++){
		   xs.push(x);
	 	   ys.push(y);
	 	   let aux = f(x + h/2, y + (h/2)*f(x,y));
		   y = y + (h * aux);
		   x = x + h;   
		}

		let result = [];
	 	result.push(xs);
	 	result.push(ys);

	 	return result;
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
		    case "Euler":
		        result = metodoDeEuler(f,h,n, xInit, yInit);
		        plotXY(result, "Euler");
		        break;
		     case "Euler Modificado":
		        result = metodoDeEulerModificado(f,h,n, xInit, yInit);
		        plotXY(result, "Euler Modificado");
		        break;
		     case "Heun / Euler Melhorado":
		        result = metodoDeHeun(f,h,n, xInit, yInit);
		        plotXY(result, "Heun");
		        break;
		     case "Runge-Kutta 4a Ordem":
		     	result = metodoDeRungeKutta4(f,h,n, xInit, yInit);
		        plotXY(result, "Rk4");
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