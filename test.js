var initTree=function(){
	$('#selTree').jstree({
			"core" : {
				"animation" : 0,
				"check_callback" : true,
				'force_text' : true,
				"themes" : { "stripes" : true },
				'data' : [{"id":"DGA","text":"Gobierno de Aragón"}
							  ]
				
			},
			"types" : {
				"#" : { "max_children" : 1, "max_depth" : 4, "valid_children" : ["root"] },
				"root" : { "icon" : "/static/3.3.4/assets/images/tree_icon.png", "valid_children" : ["default"] },
				"default" : { "valid_children" : ["default","file"] },
				"file" : { "icon" : "glyphicon glyphicon-file", "valid_children" : [] }
			},
			"plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
		});
	var selTree= $('#selTree').jstree(true);
/*	$("#selOrganismos").on("select_node.jstree",
		 function(evt, data){
			  log(data.node.text);
			  var seleccionados=$("#selOrganismos").jstree('get_selected', true);
			  var org;
			  var idOrg;
			  var bTodos=false;
			  var hsOrgs=factoriaHashMaps.newHashMap();
			  for (var i=0;((i<seleccionados.length)&&(!bTodos));i++){
				  if (seleccionados[i].id=="DGA"){
					bTodos=true;
				  } else {
					idOrg=seleccionados[i].id;
					org=organismos.getById(idOrg);
					hsOrgs.add(org.id,org);
				  }
			  }
			  var procsRoot=selProcedimientos.get_node("TODOS");
			  //while (procsRoot.children.length>0){
				selProcedimientos.delete_node(procsRoot.children);
			  //}
			  procedimientos.listado.recorrer(function(auxProc){
				var bIncluir=bTodos;
				if (!bIncluir){
					if (auxProc.getOrganismo().isFamilia(hsOrgs)){
						bIncluir=true;
					}
				}
				if (bIncluir){
					selProcedimientos.create_node("TODOS", {"text":auxProc.id+' - '+auxProc.nombre,"id":auxProc.id});
				}
			  });

		 }
	);*/
}
