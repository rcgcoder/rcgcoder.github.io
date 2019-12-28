var fncDescargaExcel=function(objExcel,callback){
	var sUrlExcel=objExcel.archivo;
	var tipoExcel=objExcel.tipo;
	var url = sUrlExcel;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";
	var fncCallBack=callback;
	var fncOnload=function(e){
	  var arraybuffer = oReq.response;

	  /* convert data to binary string */
	  var data = new Uint8Array(arraybuffer);
	  var arr = new Array();
	  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
	  var bstr = arr.join("");
	  /* Call XLSX */
	  var workbook = XLSX.read(bstr, {type:"binary"});
	  fncCallBack(workbook);
	}
	oReq.onload = fncOnload;
	oReq.send();
}


function excelColRowToA1(c,r){
	var sCell="";
	var iMultiChar=0;
	while (c>26){
	  iMultiChar++;
	  c=c-26;
	}
	if (iMultiChar>0){
	  iMultiChar--;
	  var res = String.fromCharCode("A".charCodeAt(0)+iMultiChar);
	  sCell+=res;
	}
	var res = String.fromCharCode("A".charCodeAt(0)+c);
	sCell+=res;
	sCell+=(""+(r+1));
	return sCell;
}

var indExcel=0;
var cargarTodasExcels=function(shtCallBack,callBack){
	var lastCallBack=callBack;
	if (indExcel<arrExcels.length){
		var objExcel=arrExcels[indExcel];
		indExcel++;
		fncDescargaExcel(objExcel,
			function(workbook){
				procesarExcel(workbook,shtCallBack,objExcel);
				cargarTodasExcels(shtCallBack, lastCallBack);
			});
	} else {
		lastCallBack();
	}
}
var procesarExcel=function(workbook,shtCallBack,fileInfo){
	var getCell=function(row,col){
			var sCelda=excelColRowToA1(col,row);
			var desired_cell = this[sCelda];
			if (desired_cell){
				return desired_cell.v;
			}
			return "";
		}
	for (var i=0;i<workbook.SheetNames.length;i++){
		console.log("cargando sheet:"+workbook.SheetNames[i]);
		var sht=workbook.Sheets[workbook.SheetNames[i]];
		sht.getCell=getCell;
		shtCallBack(sht,fileInfo);
	}
}
