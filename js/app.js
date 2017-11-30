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
		
		//variáveis de controle
		let i,j;

		//variáveis
		let y, xfim, x, k1;

		//dados do resultado a ser plotado
		let xs=[];
		let ys=[];

	 	//Definindo a Próxima Iteração
	 	x = x0;
	 	y = y0;


	 	for (i=0; i<=n; i++){
	 		xs.push(x);
	 		ys.push(y);
	 		k1 = f(x,y);
   			y = y + h * k1;
   			x = x + h;
	 	}

	 	let result = [];
	 	result.push(xs);
	 	result.push(ys);

	 	return result;
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

	function metodoDeRungeKutta4(f, h, n, x0, y0){
		
		let x,y;
		let i;
		let xs = [];
		let ys = [];
		
		/* Inicializacao das variaveis */
		x = x0;
		y = y0;

		for (i = 0; i < n; i++) 
		    {

		    xs.push(x);
		    ys.push(y);

		   	k1= f(x, y);
		   	k2= f(x + h/2, y + (h/2)*k1);
		   	k3= f(x + h/2, y + (h/2)*k2);
		   	k4= f(x + h, y + h*k3);

		    y = y + ((h/6)*(k1 + 2*k2 + 2*k3 + k4));
		    x = x + h;
		    }

		let result = [];
	 	result.push(xs);
	 	result.push(ys);

	 	return result;
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