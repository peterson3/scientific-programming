	function plotXY(methodResult, nomeMetodo){
		PLOTAREA = document.getElementById('plotArea');
		Plotly.plot( PLOTAREA, [{
		x: methodResult[0],
		y: methodResult[1],
		name: nomeMetodo }], {
		margin: { t: 0 } } );

	 	console.table(methodResult[0]);
	 	console.table(methodResult[1]);
	}

	function metodoDeEuler(f, h, n){
		
		console.log("Método de Euler");
		
		//variáveis de controle
		let i,j;

		//variáveis
		let x0, y0, y, xfim, x, k1;

		//dados do resultado a ser plotado
		let xs=[];
		let ys=[];

		//Condição Inicial
	 	x0 = 0.0;
	 	y0 =1.0;

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

	function metodoDeHeun(f, h, n){

		console.log("Método de Heun");

		//Variáveis de Controle
		let i, j;

		//Variáveis Inerentes
		let x0, y0, y, x, k1, k2;
	   
	   	//dados do resultado a ser plotado
		let xs=[];
		let ys=[];

	   //Condição Inicial
		x0 = 0.0;
		y0 = 1.0;
		
		//Definiando Próximas Iterações
		x = x0;
		y = y0;

		for (i = 0; i < n; i++){
		   xs.push(x);
	 	   ys.push(y);
		   k1 = f(x, y);
		   k2 = f(x + h, y + k1 * h);
		   y = y + (h/2.0) * (k1 + k2);
		   x = x + h;   
		}

		let result = [];
	 	result.push(xs);
	 	result.push(ys);

	 	return result;
	}

	function funcParser(){
		// create a parser
		var parser = math.parser();
		var FUNCPARSING = $('#funcArea').val();
		parser.eval(FUNCPARSING);
		return parser.get('f');
	}

	function executaMetodo(){
		//Atualizar f,h e n de acordo com os inputs
		let f; //Função a ser recuperada pelo parser e ser usada pelo método
		let h; //Tamanho do Salto (H)
		let n; //Número de Iterações do Método
		let result; //Objeto com Resultado dos Méotod (Xs e Ys)

		f = funcParser();
		h = Number($('#hArea').val());
		n = Number($('#stepsArea').val());

		try{
		//Verificar qual método Selecionado
		switch($('#methodSelector option:selected').text()) {
		    case "Euler":
		        result = metodoDeEuler(f,h,n);
		        plotXY(result, "Euler");
		        break;
		     case "Heun":
		        result = metodoDeHeun(f,h,n);
		        plotXY(result, "Heun");
		        break;
		    default:
		        alert("Selecione um Método")
		}
		}
		catch(exception){
			alert("Erro: Verifique os Dados");
		}
	}



	$("#btn").click(executaMetodo);
