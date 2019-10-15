/* HMTLlight Texteditor routines all written by Chris Heilmann (info@onlinetools.org). */

function domlay(id,trigger,lax,lay,content) {
/*
 * Cross browser Layer visibility / Placement Routine
 * Done by Chris Heilmann (info@onlinetools.org)
 * Feel free to use with these lines included!
 * Created with help from Scott Andrews.
 * The marked part of the content change routine is taken
 * from a script by Reyn posted in the DHTML
 * Forum at Website Attraction and changed to work with
 * any layername. Cheers to that!
 * Welcome DOM-1, about time you got included... :)
 */
// Layer visible
if (trigger=="1"){
	if (document.layers) document.layers[''+id+''].visibility="show"
	else if (document.all) document.all[''+id+''].style.visibility="visible"
	else if (document.getElementById) document.getElementById(''+id+'').style.visibility="visible"				
	}
// Layer hidden
else if (trigger=="0"){
	if (document.layers) document.layers[''+id+''].visibility="hide"
	else if (document.all) document.all[''+id+''].style.visibility="hidden"
	else if (document.getElementById) document.getElementById(''+id+'').style.visibility="hidden"				
	}
// Set horizontal position	
if (lax){
	if (document.layers){document.layers[''+id+''].left=lax}
	else if (document.all){document.all[''+id+''].style.left=lax}
	else if (document.getElementById){document.getElementById(''+id+'').style.left=lax+"px"}
	}
// Set vertical position
if (lay){
	if (document.layers){document.layers[''+id+''].top=lay}
	else if (document.all){document.all[''+id+''].style.top=lay}
	else if (document.getElementById){document.getElementById(''+id+'').style.top=lay+"px"}
	}
// change content

if (content){
if (document.layers){
	sprite=document.layers[''+id+''].document;
	// add father layers if needed! document.layers[''+father+'']...
  	sprite.open();
  	sprite.write(content);
  	sprite.close();
	}
else if (document.all) document.all[''+id+''].innerHTML=content;	
else if (document.getElementById){
	//Thanx Reyn!
	rng=document.createRange();
	el=document.getElementById(''+id+'');
	rng.setStartBefore(el);
	htmlFrag=rng.createContextualFragment(content)
	while(el.hasChildNodes()) el.removeChild(el.lastChild);
	el.appendChild(htmlFrag);
	// end of Reyn ;)
	}
}
}

// displays the chosen "editor"
function edit(what){
	clearall()
	domlay ('formin',0);
	domlay (what,1);
	}	

// adds the bold text	
function addbold(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		content=document.boldform.boldtext.value;
	}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		content=document.bolded.document.boldform.boldtext.value;
	}
	add="<b>"+content+"</b>";
	if (document.all || document.getElementById){document.mainform.code.value=old+add;}
	if (document.layers){document.formin.document.mainform.code.value=old+add;}
	domlay ('formin',1);
	clearall()
	}

// add the italic text	
function additalic(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		content=document.italicform.italictext.value;
	}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		content=document.italiced.document.italicform.italictext.value;
	}
	add="<i>"+content+"</i>";
	if (document.all || document.getElementById){document.mainform.code.value=old+add;}
	if (document.layers){document.formin.document.mainform.code.value=old+add;}
	domlay ('formin',1);
	clearall();
	}

// add a link	
function addlink(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		contenttext=document.linkform.text.value;
		contenturl=document.linkform.url.value;
	}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		contenttext=document.linked.document.linkform.text.value;
		contenturl=document.linked.document.linkform.url.value;
	}
	add="<a href=\""+contenturl+"\">"+contenttext+"</a>";
	if (document.all || document.getElementById){document.mainform.code.value=old+add;}
	if (document.layers){document.formin.document.mainform.code.value=old+add;}
	domlay ('formin',1);
	clearall();
	}

// adds a string, this one is for direct entries without form, like </font> and <br>	
function addstring(string){
	domlay ('formin',1);
	clearall();
	if (document.all || document.getElementById){old=document.mainform.code.value;}
	if (document.layers){old=document.formin.document.mainform.code.value;}
	add=string;
	if (document.all || document.getElementById){document.mainform.code.value=old+add;}
	if (document.layers){document.formin.document.mainform.code.value=old+add;}
	}

// adds the font definitions	
function addfont(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		defface=document.fontform.fface.options[document.fontform.fface.selectedIndex].value
		defsize=document.fontform.size.options[document.fontform.size.selectedIndex].value
		defcolor=document.fontform.color.value
	}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		defface=document.fonted.document.fontform.fface.options[document.fonted.document.fontform.fface.selectedIndex].value
		defsize=document.fonted.document.fontform.size.options[document.fonted.document.fontform.size.selectedIndex].value
		defcolor=document.fonted.document.fontform.color.value
	}
	add="<font face=\""+defface+"\" size=\""+defsize+"\"";
		if (defcolor!=""){add=add + " color=\""+defcolor+"\"";}
	add=add +">";
	if (document.all || document.getElementById){document.mainform.code.value=old+add;}
	if (document.layers){document.formin.document.mainform.code.value=old+add;}
	domlay ('formin',1);
	clearall()
	}

// hides all editors to prevent two of them being displayed	
function clearall(){
	domlay ('fonted',0);
	domlay ('bolded',0);
	domlay ('italiced',0);
	domlay ('linked',0);
	domlay ('saveed',0);
	domlay ('test',0);
	}

// undo function, checks if there is an undo state	
function oops(){
	clearall();
		if (old!=""){
			if (document.all || document.getElementById){document.mainform.code.value=old;}
			if (document.layers){document.formin.document.mainform.code.value=old}
		}
	}

// preview function, writes content in the empty test layer
function preview(){
	edit('test');
	if (document.all || document.getElementById){cont=document.mainform.code.value;}
	if (document.layers){cont=document.formin.document.mainform.code.value}
	content="<table width=480 border=1 cellpadding=10 cellspacing=0><tr><td bgcolor=\"#ffffff\">"
	content=content+"<div align=\"right\"><font face=\"verdana\" size=-2><a href=\"javascript:clearall();domlay('formin',1)\">close preview</a></font></div>"
	content=content+cont+"</td></tr></table>";
	domlay ('test',1,100,10,content);
	}

// shows the help functions, works always, but normally the help layer is hidden	
function showhelp(message){
	content='<table width=1 border=0 cellpadding=0 cellspacing=0><tr><td width=1 bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td width=10 bgcolor="#666666"><img src="dot_clear.gif" width="10" height="1" alt="" border="0"></td><td width=150 bgcolor="#666666"><img src="dot_clear.gif" width="150" height="1" alt="" border="0"></td><td width=10 bgcolor="#666666"><img src="dot_clear.gif" width="10" height="1" alt="" border="0"></td><td width=1 bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td></tr><tr><td bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#999933"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#999933" valign="top" align="center"><font face="verdana,helvetica,arial" size=-1 color="#ffffff"><b>Help</b></font></td><td bgcolor="#999933"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td></tr><tr><td bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#ffcc66"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#ffcc66" valign="top"><font face="verdana,helvetica,arial" size=-2>Touch the menu item you want info about:</font><br><br><font face="verdana,helvetica,arial" size=-1>'+message+'</font></td><td bgcolor="#ffcc66"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td><td bgcolor="#666666"><img src="dot_clear.gif" width="1" height="1" alt="" border="0"></td></tr><tr><td colspan=5><img src="helpcorner.gif" width="172" height="10" alt="bottom" border="0"></td></tr></table>'
	domlay ('help',3,560,50,content)
	}

// saves the content to one of five hidden fields	
function save(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		slot=document.saveform.saveslot.options[document.saveform.saveslot.selectedIndex].value
		}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		slot=document.saveed.document.saveform.saveslot.options[document.saveed.document.saveform.saveslot.selectedIndex].value
		}
	if (document.all || document.getElementById){document.mainform.elements["save"+slot].value=old;}
	if (document.layers){document.formin.document.mainform.eval("save"+slot).value=old;}
	domlay ('formin',1);
	clearall()
	}

// loads the content from one of five hidden fields	
function load(){
	if (document.all || document.getElementById){
		old=document.mainform.code.value;
		slot=document.saveform.saveslot.options[document.saveform.saveslot.selectedIndex].value
		}
	if (document.layers){
		old=document.formin.document.mainform.code.value;
		slot=document.saveed.document.saveform.saveslot.options[document.saveed.document.saveform.saveslot.selectedIndex].value
		}
	if (document.all || document.getElementById){
		content=document.mainform.elements["save"+slot].value;
		document.mainform.code.value=content;
		}
	if (document.layers){
		content=document.formin.document.mainform.eval("save"+slot).value;
		document.formin.document.mainform.code.value=content;
		}
	domlay ('formin',1);
	clearall()
	}
	
/* end of HTMLlight routines */	