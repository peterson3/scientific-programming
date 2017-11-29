	function plotXY(methodResult){
		PLOTAREA = document.getElementById('plotArea');
		Plotly.plot( PLOTAREA, [{
		x: methodResult[0],
		y: methodResult[1] }], {
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
		f = funcParser();
		h = Number($('#hArea').val());
		n = Number($('#stepsArea').val());

		//Verificar qual método Selecionado
		switch($('#methodSelector option:selected').text()) {
		    case "Euler":
		        let result = metodoDeEuler(f,h,n);
		        plotXY(result);
		        break;
		    default:
		        alert("Selecione um Método")
		}

	}

	$("#btn").click(executaMetodo);
