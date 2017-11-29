
	PLOTAREA = document.getElementById('plotArea');
	var f ; //Função a ser recuperada pelo parser e ser usada pelo método

	// Função f(x,y) = y;
	// function f(x,y){
	// 	return y;
	// }

	function metodoDeEuler(){
		
		console.log("Método de Euler");
		//variáveis de controle
		let i,j,n;

		//variáveis
		let h, x0, y0, y, xfim, x, k1;

		let xs=[];
		let ys=[];

		//Condição Inicial
	 	x0 = 0.0;
	 	y0 =1.0;

	 	//Salto (H)
	 	h=0.1;

	 	//X final
	 	xfim =  3.0;

	 	//Calculando a quatidade de passos
	 	n = (xfim - x0)/h;

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

	 	console.table(xs);
	 	console.table(ys);

	 	Plotly.plot( PLOTAREA, [{
		x: xs,
		y: ys }], {
		margin: { t: 0 } } );
	}

	function funcParser(){
		// create a parser
		var parser = math.parser();
		var FUNCPARSING = $('#funcArea').val();
		parser.eval(FUNCPARSING);
		f = parser.get('f');
		metodoDeEuler();
	}

	$("#btn").click(funcParser);
