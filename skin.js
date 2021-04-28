// Garden Gnome Software - Skin
// Pano2VR 6.1.9/17983
// Filename: simplex_v6_ha.ggsk
// Generated 2021-04-28T17:38:00

function pano2vrSkin(player,base) {
	player.addVariable('opt_hotspot_preview', 2, true);
	player.addVariable('opt_zoom', 2, true);
	player.addVariable('opt_autorotate', 2, true);
	player.addVariable('opt_info', 2, true);
	player.addVariable('opt_thumbnail', 2, false);
	player.addVariable('vis_thumbnail_menu_show', 2, false);
	player.addVariable('opt_thumbnail_tooltip', 2, false);
	player.addVariable('opt_projection', 2, false);
	player.addVariable('opt_gyro', 2, true);
	player.addVariable('opt_fullscreen', 2, true);
	player.addVariable('opt_loader', 2, true);
	player.addVariable('opt_loader_mulires', 2, false);
	player.addVariable('opt_url', 2, false);
	player.addVariable('opt_autohide', 2, true);
	player.addVariable('vis_userdata', 2, false);
	player.addVariable('vis_close_buton', 2, false);
	player.addVariable('vis_image_popup', 2, false);
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('vis_video_popup_file', 2, false);
	player.addVariable('vis_video_popup_url', 2, false);
	player.addVariable('vis_video_popup_vimeo', 2, false);
	player.addVariable('vis_video_popup_youtube', 2, false);
	player.addVariable('vis_website', 2, false);
	player.addVariable('vis_thumbnail_menu_mobile', 2, false);
	player.addVariable('vis_thumbnail_menu_auto_hide', 2, true);
	player.addVariable('vis_360image_once', 2, true);
	player.addVariable('vis_loader', 2, true);
	player.addVariable('vis_timer', 2, false);
	player.addVariable('pos_zoom_in', 1, 0);
	player.addVariable('pos_zoom_out', 1, 0);
	player.addVariable('pos_autorotate', 1, 0);
	player.addVariable('pos_information', 1, 0);
	player.addVariable('pos_thumbnail', 1, 0);
	player.addVariable('pos_projection', 1, 0);
	player.addVariable('pos_gyro', 1, 0);
	player.addVariable('pos_fullscreen', 1, 0);
	player.addVariable('pos_controller', 1, 0);
	player.addVariable('pos_360image', 1, 0);
	player.addVariable('pos_enter_vr', 1, 0);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._show_controller_button=document.createElement('div');
		els=me._show_controller_button__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cDovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNTY2IC0yNjA2IDMyIDMyIiBoZWlnaHQ9IjMycHgiIHhtbG5zOmdyYXBoPSJodHRwOi8vbnMuYWRvYmUuY29tL0dyYXBocy8xLjAvIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zNTY2IC0yNjA2IDMyIDMyIj4KIDxnIGlkPSJMYXllcl8xIi8+CiA8ZyBpZD0iRWJlbmVfMSIvPgogPGcgaWQ9IkxheWVy'+
			'XzIiPgogIDxnPgogICA8Zz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1OTAuMzc2IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5IiByPSIyLjc2IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41IiBjeD0iLTM1NTkuMzMzIi8+CiAgICA8Y2lyY2xlIGN5PSItMjU5MC4zNzYiIHI9IjIuNzYiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgY3g9Ii0zNTU5LjMzMyIvPgogICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIGN5PSItMjU5MC4zNzYiIHI9IjIuNzYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC4yIiBjeD'+
			'0iLTM1NTkuMzMzIi8+CiAgIDwvZz4KICAgPGc+CiAgICA8Y2lyY2xlIHN0cm9rZT0iIzAwMDAwMCIgY3k9Ii0yNTkwLjM3NiIgYTphZG9iZS1ibGVuZGluZy1tb2RlPSJtdWx0aXBseSIgcj0iMi43NiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9Ii0zNTQwLjY2NyIvPgogICAgPGNpcmNsZSBjeT0iLTI1OTAuMzc2IiByPSIyLjc2IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSItMzU0MC42NjciLz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1OTAuMzc2IiByPSIyLjc2IiBmaWxsPSJub25lIiBzdHJva2Utd2lk'+
			'dGg9IjAuMiIgY3g9Ii0zNTQwLjY2NyIvPgogICA8L2c+CiAgPC9nPgogIDxnPgogICA8Y2lyY2xlIHN0cm9rZT0iIzAwMDAwMCIgY3k9Ii0yNTkwLjM3NiIgYTphZG9iZS1ibGVuZGluZy1tb2RlPSJtdWx0aXBseSIgcj0iMi43NiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9Ii0zNTUwIi8+CiAgIDxjaXJjbGUgY3k9Ii0yNTkwLjM3NiIgcj0iMi43NiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBjeD0iLTM1NTAiLz4KICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIGN5PSItMjU5MC4zNzYiIHI9IjIuNzYiIGZpbGw9Im5vbmUiIHN0cm'+
			'9rZS13aWR0aD0iMC4yIiBjeD0iLTM1NTAiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._show_controller_button__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._show_controller_button__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cDovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNTY2IC0yNTcxLjMzMyAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzU2NiAtMjU3MS4zMzMgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiLz4KIDxnIGlkPSJFYmVuZV8xIi8+CiA8ZyBp'+
			'ZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxnPgogICAgPGNpcmNsZSBzdHJva2U9IiMwMDAwMDAiIGN5PSItMjU1NS43MDkiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIHI9IjMuMDM2IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41IiBjeD0iLTM1NjAuMjY2Ii8+CiAgICA8Y2lyY2xlIGN5PSItMjU1NS43MDkiIHI9IjMuMDM2IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSItMzU2MC4yNjYiLz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1NTUuNzA5IiByPSIzLjAzNiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZH'+
			'RoPSIwLjIiIGN4PSItMzU2MC4yNjYiLz4KICAgPC9nPgogICA8Zz4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1NTUuNzA5IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5IiByPSIzLjAzNiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9Ii0zNTM5LjczMyIvPgogICAgPGNpcmNsZSBjeT0iLTI1NTUuNzA5IiByPSIzLjAzNiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBjeD0iLTM1MzkuNzMzIi8+CiAgICA8Y2lyY2xlIHN0cm9rZT0iIzAwMDAwMCIgY3k9Ii0yNTU1LjcwOSIgcj0iMy4wMzYiIGZpbGw9Im5v'+
			'bmUiIHN0cm9rZS13aWR0aD0iMC4yIiBjeD0iLTM1MzkuNzMzIi8+CiAgIDwvZz4KICA8L2c+CiAgPGc+CiAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1NTUuNzA5IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5IiByPSIzLjAzNiIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSIgY3g9Ii0zNTUwIi8+CiAgIDxjaXJjbGUgY3k9Ii0yNTU1LjcwOSIgcj0iMy4wMzYiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgY3g9Ii0zNTUwIi8+CiAgIDxjaXJjbGUgc3Ryb2tlPSIjMDAwMDAwIiBjeT0iLTI1NTUuNzA5IiByPSIzLjAzNi'+
			'IgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIGN4PSItMzU1MCIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._show_controller_button__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="show_controller_button";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 23px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._show_controller_button.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._show_controller_button.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._show_controller_button.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._show_controller_button.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._show_controller_button.style[domTransition]='left 0s, bottom 0s';
				if (me._show_controller_button.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._show_controller_button.style.bottom='-100px';
					me._show_controller_button.ggUpdatePosition(true);
				}
				else {
					me._show_controller_button.ggDx=1;
					me._show_controller_button.style.bottom='23px';
					me._show_controller_button.ggUpdatePosition(true);
				}
			}
		}
		me._show_controller_button.onclick=function (e) {
			me._hide_timer.ggTimeout=Number("5") * 1000.0;
			me._hide_timer.ggTimestamp=skin.ggCurrentTime;
		}
		me._show_controller_button.onmouseover=function (e) {
			me._show_controller_button__img.style.visibility='hidden';
			me._show_controller_button__imgo.style.visibility='inherit';
			me.elementMouseOver['show_controller_button']=true;
			me._tt_show_controller.logicBlock_visible();
		}
		me._show_controller_button.onmouseout=function (e) {
			me._show_controller_button__img.style.visibility='inherit';
			me._show_controller_button__imgo.style.visibility='hidden';
			me.elementMouseOver['show_controller_button']=false;
			me._tt_show_controller.logicBlock_visible();
		}
		me._show_controller_button.ontouchend=function (e) {
			me.elementMouseOver['show_controller_button']=false;
			me._tt_show_controller.logicBlock_visible();
		}
		me._show_controller_button.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hide_timer=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=0;
		el.ggId="hide_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_timer.ggIsActive=function() {
			return (me._hide_timer.ggTimestamp + me._hide_timer.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hide_timer.ggActivate=function () {
			if (player.transitionsDisabled) {
				me._controller.style[domTransition]='none';
			} else {
				me._controller.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controller.style.opacity='1';
			me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._show_controller_button.style[domTransition]='none';
			} else {
				me._show_controller_button.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._show_controller_button.style.opacity='0';
			me._show_controller_button.style.visibility='hidden';
			player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
		}
		me._hide_timer.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._show_controller_button.style[domTransition]='none';
			} else {
				me._show_controller_button.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._show_controller_button.style.opacity='1';
			me._show_controller_button.style.visibility=me._show_controller_button.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._controller.style[domTransition]='none';
			} else {
				me._controller.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._controller.style.opacity='0';
			me._controller.style.visibility='hidden';
			player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
		}
		me._hide_timer.ggUpdatePosition=function (useTransition) {
		}
		me._show_controller_button.appendChild(me._hide_timer);
		el=me._tt_show_controller=document.createElement('div');
		els=me._tt_show_controller__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_show_controller";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 120px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u83dc\u5355";
		el.appendChild(els);
		me._tt_show_controller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_show_controller.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_show_controller.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_show_controller.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_show_controller.style[domTransition]='left 0s, top 0s';
				if (me._tt_show_controller.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_show_controller.style.top='-25px';
					me._tt_show_controller.ggUpdatePosition(true);
				}
				else {
					me._tt_show_controller.ggDx=0;
					me._tt_show_controller.style.top='32px';
					me._tt_show_controller.ggUpdatePosition(true);
				}
			}
		}
		me._tt_show_controller.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['show_controller_button'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_show_controller.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_show_controller.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_show_controller.style[domTransition]='left 0s, top 0s';
				if (me._tt_show_controller.ggCurrentLogicStateVisible == 0) {
					me._tt_show_controller.style.visibility=(Number(me._tt_show_controller.style.opacity)>0||!me._tt_show_controller.style.opacity)?'inherit':'hidden';
					me._tt_show_controller.ggVisible=true;
				}
				else {
					me._tt_show_controller.style.visibility="hidden";
					me._tt_show_controller.ggVisible=false;
				}
			}
		}
		me._tt_show_controller.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._show_controller_button.appendChild(me._tt_show_controller);
		me.divSkin.appendChild(me._show_controller_button);
		el=me._loading_multires=document.createElement('div');
		els=me._loading_multires__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+Cjxzdmcgd2lkdGg9IjI2cHgiIHZlcnNpb249IjEuMCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEyOCAzNSIgaGVpZ2h0PSI3cHgiPgogPGc+CiAgPGNpcmNsZSBjeT0iMTcuNSIgcj0iMTcuNSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBjeD0iMTcuNSIvPg'+
			'ogIDxhbmltYXRlIGtleVRpbWVzPSIwOzAuMTY3OzAuNTswLjY2ODsxIiB2YWx1ZXM9IjAuMzsxOzE7MC4zOzAuMyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iNjAwbXMiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGJlZ2luPSIwcyIvPgogPC9nPgogPGc+CiAgPGNpcmNsZSBjeT0iMTcuNSIgcj0iMTcuNSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBjeD0iMTEwLjUiLz4KICA8YW5pbWF0ZSBrZXlUaW1lcz0iMDswLjMzNDswLjU7MC44MzU7MSIgdmFsdWVzPSIwLjM7MC4zOzE7MTswLjMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjYwMG1zIiBhdHRyaWJ1'+
			'dGVOYW1lPSJvcGFjaXR5IiBiZWdpbj0iMHMiLz4KIDwvZz4KIDxnPgogIDxjaXJjbGUgY3k9IjE3LjUiIHI9IjE3LjUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgY3g9IjY0Ii8+CiAgPGFuaW1hdGUga2V5VGltZXM9IjA7MC4xNjc7MC4zMzQ7MC42Njg7MC44MzU7MSIgdmFsdWVzPSIwLjM7MC4zOzE7MTswLjM7MC4zIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSI2MDBtcyIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgYmVnaW49IjBzIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._loading_multires__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_multires";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 7px;';
		hs+='position : absolute;';
		hs+='right : 6px;';
		hs+='top : 6px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_multires.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_multires.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTileLoading() == true)) && 
				((player.getVariableValue('opt_loader_mulires') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._loading_multires.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._loading_multires.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._loading_multires.style[domTransition]='';
				if (me._loading_multires.ggCurrentLogicStateVisible == 0) {
					me._loading_multires.style.visibility=(Number(me._loading_multires.style.opacity)>0||!me._loading_multires.style.opacity)?'inherit':'hidden';
					me._loading_multires.ggVisible=true;
				}
				else {
					me._loading_multires.style.visibility="hidden";
					me._loading_multires.ggVisible=false;
				}
			}
		}
		me._loading_multires.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._loading_multires);
		el=me._screentint=document.createElement('div');
		el.ggId="screentint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._screentint.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._screentint.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._screentint.style[domTransition]='opacity 500ms ease 0ms';
				if (me._screentint.ggCurrentLogicStateAlpha == 0) {
					me._screentint.style.visibility=me._screentint.ggVisible?'inherit':'hidden';
					me._screentint.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._screentint.style.opacity == 0.0) { me._screentint.style.visibility="hidden"; } }, 505);
					me._screentint.style.opacity=0;
				}
			}
		}
		me._screentint.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			player.setVariableValue('vis_info_popup', false);
			player.setVariableValue('vis_video_popup_file', false);
			player.setVariableValue('vis_video_popup_url', false);
			player.setVariableValue('vis_video_popup_vimeo', false);
			player.setVariableValue('vis_video_popup_youtube', false);
			player.setVariableValue('vis_website', false);
			player.setVariableValue('vis_userdata', false);
		}
		me._screentint.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint);
		el=me._controller=document.createElement('div');
		el.ggId="controller";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 23px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 288px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._controller.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._controller.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._controller.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._controller.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._controller.style.bottom='-100px';
					me._controller.ggUpdatePosition(true);
				}
				else {
					me._controller.ggDx=0;
					me._controller.style.bottom='23px';
					me._controller.ggUpdatePosition(true);
				}
			}
		}
		me._controller.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._controller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._controller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._controller.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._controller.ggCurrentLogicStateAlpha == 0) {
					me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
					me._controller.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._controller.style.opacity == 0.0) { me._controller.style.visibility="hidden"; } }, 505);
					me._controller.style.opacity=0;
				}
			}
		}
		me._controller.onmouseover=function (e) {
			me.elementMouseOver['controller']=true;
		}
		me._controller.onmouseout=function (e) {
			me.elementMouseOver['controller']=false;
		}
		me._controller.ontouchend=function (e) {
			me.elementMouseOver['controller']=false;
		}
		me._controller.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._controller_slider=document.createElement('div');
		el.ggId="controller_slider";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller_slider.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._controller_slider.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_controller') == 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_controller') == 2))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_controller') == 3))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_controller') == 4))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_controller') == 5))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_controller') == 6))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_controller') == 7))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_controller') == 8))
			)
			{
				newLogicStatePosition = 7;
			}
			else if (
				((player.getVariableValue('pos_controller') == 9))
			)
			{
				newLogicStatePosition = 8;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._controller_slider.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._controller_slider.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._controller_slider.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._controller_slider.ggCurrentLogicStatePosition == 0) {
					me._controller_slider.style.left='128px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 1) {
					me._controller_slider.style.left='112px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 2) {
					me._controller_slider.style.left='96px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 3) {
					me._controller_slider.style.left='80px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 4) {
					me._controller_slider.style.left='64px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 5) {
					me._controller_slider.style.left='48px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 6) {
					me._controller_slider.style.left='32px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 7) {
					me._controller_slider.style.left='16px';
					me._controller_slider.style.top='0px';
				}
				else if (me._controller_slider.ggCurrentLogicStatePosition == 8) {
					me._controller_slider.style.left='0px';
					me._controller_slider.style.top='0px';
				}
				else {
					me._controller_slider.style.left='0px';
					me._controller_slider.style.top='0px';
				}
			}
		}
		me._controller_slider.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._controller_slider.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._controller_slider.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._controller_slider.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._controller_slider.ggCurrentLogicStateAlpha == 0) {
					me._controller_slider.style.visibility=me._controller_slider.ggVisible?'inherit':'hidden';
					me._controller_slider.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._controller_slider.style.opacity == 0.0) { me._controller_slider.style.visibility="hidden"; } }, 505);
					me._controller_slider.style.opacity=0;
				}
			}
		}
		me._controller_slider.ggUpdatePosition=function (useTransition) {
		}
		el=me._enter_vr=document.createElement('div');
		els=me._enter_vr__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMzM0NS4yNSAtMjYwNiAzMiAzMiIgaGVpZ2h0PSIzMnB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zMzQ1LjI1IC0yNjA2IDMyIDMyIj4KIDxnIGlkPSJMYXllcl8xIi8+CiA8ZyBpZD0iRWJlbmVfMSI+CiAgPGc+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iIzFBMTcxQiIgZD0iTS0zMzI5LjI0OS0yNjAyLjVjLTYuODkyLDAtMTIuNSw1LjYwNy0xMi41LDEyLjVzNS42MDcsMTIuNSwxMi41LDEyLjVjNi44OTMsMCwxMi41LTUuNjA3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5'+
			'O1MtMzMyMi4zNTUtMjYwMi41LTMzMjkuMjQ5LTI2MDIuNXogTS0zMzI5LjI0OS0yNTgwLjEzMmMtNS40NDEsMC05Ljg3LTQuNDI3LTkuODctOS44NjhjMC01LjQ0Miw0LjQyOS05Ljg2OSw5Ljg3LTkuODY5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzUuNDQyLDAsOS44Nyw0LjQyOCw5Ljg3LDkuODY5Qy0zMzE5LjM3OC0yNTg0LjU2LTMzMjMuODA1LTI1ODAuMTMyLTMzMjkuMjQ5LTI1ODAuMTMyeiIvPgogICAgPHBhdGggZmlsbD0iIzFBMTcxQiIgZD0iTS0zMzIxLjU4OS0yNTkzLjgwOGMtMC45LTEuMjYtMi4zOTktMS40MjItMy42MDQtMS40MjJoLTEuNzA0di0xLjY0NmMwLTAuNj'+
			'Y4LTAuNTQyLTEuMjA5LTEuMjEtMS4yMDkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtoLTIuMjgxYy0wLjY2OCwwLTEuMjEsMC41NDEtMS4yMSwxLjIwOXYxLjY0NmgtMS43MDJjLTEuMjA1LDAtMi43MDQsMC4xNjItMy42MDYsMS40MjJjLTAuNjg4LDAuOTYxLTEuMDA3LDIuMjItMS4wMDcsMy45NjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwyLjEsMC42MDEsMy44MTcsMS42MDksNC41OTNjMC44ODEsMC42NzksMS41MDYsMC43OTMsMi41NzMsMC43OTNjMS4yNTgsMCwyLjIxNC0wLjQ5LDIuOTgyLTAuODgzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNTc5'+
			'LTAuMjk3LDEuMDM2LTAuNTMxLDEuNTAxLTAuNTMxczAuOTIzLDAuMjM0LDEuNTAyLDAuNTMyYzAuNzY3LDAuMzkzLDEuNzI0LDAuODgyLDIuOTgyLDAuODgyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzEuMDY1LDAsMS42OS0wLjExNCwyLjU3Mi0wLjc5MmMxLjAwOS0wLjc3NiwxLjYxMS0yLjQ5MywxLjYxMS00LjU5NUMtMzMyMC41ODEtMjU5MS41ODgtMzMyMC45MDItMjU5Mi44NDgtMzMyMS41ODktMjU5My44MDh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7IE0tMzMyMy42NjctMjU4Ny4xNjhjLTAuMzM1LDAuMjU5LTAuMzc4LDAuMjkyLTEuMDk3LDAuMjkyYy0wLjY3NS'+
			'wwLTEuMjMzLTAuMjg3LTEuODc5LTAuNjE4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjcyOS0wLjM3My0xLjU1Ny0wLjc5Ni0yLjYwNS0wLjc5NnMtMS44NzUsMC40MjMtMi42MDQsMC43OTZjLTAuNjQ2LDAuMzMyLTEuMjA0LDAuNjE4LTEuODc5LDAuNjE4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjcxOSwwLTAuNzYyLTAuMDMzLTEuMDk2LTAuMjkyYy0wLjE0Mi0wLjExMi0wLjY2OC0wLjg5My0wLjY2OC0yLjY3N2MwLTEuMTk3LDAuMTgxLTIuMDMzLDAuNTU1LTIuNTU1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMTI2LTAuMTc2LDAuNDM0LTAu'+
			'NDExLDEuNjQtMC40MTFoOC4xMDdjMS4yMDUsMCwxLjUxMiwwLjIzNCwxLjYzOCwwLjQxMWMwLjM3NCwwLjUyMiwwLjU1NiwxLjM1OCwwLjU1NiwyLjU1NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzMyMy0yNTg4LjA2LTMzMjMuNTI3LTI1ODcuMjgtMzMyMy42NjctMjU4Ny4xNjh6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zMzI5LjI0OS0yNjAyLjVjLTYuODkyLDAtMTIuNSw1LjYwNy0xMi41LDEyLjVzNS42MDcsMTIuNSwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Ji'+
			'N4OTtjNi44OTMsMCwxMi41LTUuNjA3LDEyLjUtMTIuNVMtMzMyMi4zNTUtMjYwMi41LTMzMjkuMjQ5LTI2MDIuNXogTS0zMzI5LjI0OS0yNTgwLjEzMmMtNS40NDEsMC05Ljg3LTQuNDI3LTkuODctOS44NjgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC01LjQ0Miw0LjQyOS05Ljg2OSw5Ljg3LTkuODY5YzUuNDQyLDAsOS44Nyw0LjQyOCw5Ljg3LDkuODY5Qy0zMzE5LjM3OC0yNTg0LjU2LTMzMjMuODA1LTI1ODAuMTMyLTMzMjkuMjQ5LTI1ODAuMTMyeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zMzIxLjU4'+
			'OS0yNTkzLjgwOGMtMC45LTEuMjYtMi4zOTktMS40MjItMy42MDQtMS40MjJoLTEuNzA0di0xLjY0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTAuNjY4LTAuNTQyLTEuMjA5LTEuMjEtMS4yMDloLTIuMjgxYy0wLjY2OCwwLTEuMjEsMC41NDEtMS4yMSwxLjIwOXYxLjY0NmgtMS43MDJjLTEuMjA1LDAtMi43MDQsMC4xNjItMy42MDYsMS40MjImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjg4LDAuOTYxLTEuMDA3LDIuMjItMS4wMDcsMy45NjNjMCwyLjEsMC42MDEsMy44MTcsMS42MDksNC41OTNjMC44ODEsMC42NzksMS41MDYsMC43OTMsMi41NzMsMC43OTMmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMS4yNTgsMCwyLjIxNC0wLjQ5LDIuOTgyLTAuODgzYzAuNTc5LTAuMjk3LDEuMDM2LTAuNTMxLDEuNTAxLTAuNTMxczAuOTIzLDAuMjM0LDEuNTAyLDAuNTMyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzY3LDAuMzkzLDEuNzI0LDAuODgyLDIuOTgyLDAuODgyYzEuMDY1LDAsMS42OS0wLjExNCwyLjU3Mi0wLjc5MmMxLjAwOS0wLjc3NiwxLjYxMS0yLjQ5MywxLjYxMS00LjU5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzMyMC41ODEtMjU5MS41ODgtMzMyMC45MDItMjU5Mi44NDgtMzMyMS41ODktMjU5My44MDh6'+
			'IE0tMzMyMy42NjctMjU4Ny4xNjhjLTAuMzM1LDAuMjU5LTAuMzc4LDAuMjkyLTEuMDk3LDAuMjkyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY3NSwwLTEuMjMzLTAuMjg3LTEuODc5LTAuNjE4Yy0wLjcyOS0wLjM3My0xLjU1Ny0wLjc5Ni0yLjYwNS0wLjc5NnMtMS44NzUsMC40MjMtMi42MDQsMC43OTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjQ2LDAuMzMyLTEuMjA0LDAuNjE4LTEuODc5LDAuNjE4Yy0wLjcxOSwwLTAuNzYyLTAuMDMzLTEuMDk2LTAuMjkyYy0wLjE0Mi0wLjExMi0wLjY2OC0wLjg5My0wLjY2OC0yLjY3NyYjeGQ7JiN4YTsmI3g5OyYjeD'+
			'k7JiN4OTsmI3g5O2MwLTEuMTk3LDAuMTgxLTIuMDMzLDAuNTU1LTIuNTU1YzAuMTI2LTAuMTc2LDAuNDM0LTAuNDExLDEuNjQtMC40MTFoOC4xMDdjMS4yMDUsMCwxLjUxMiwwLjIzNCwxLjYzOCwwLjQxMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjM3NCwwLjUyMiwwLjU1NiwxLjM1OCwwLjU1NiwyLjU1NUMtMzMyMy0yNTg4LjA2LTMzMjMuNTI3LTI1ODcuMjgtMzMyMy42NjctMjU4Ny4xNjh6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTS0zMzI5LjI0OS0yNjAyLjVjLTYuODkyLDAtMTIuNSw1LjYwNy0x'+
			'Mi41LDEyLjVzNS42MDcsMTIuNSwxMi41LDEyLjVjNi44OTMsMCwxMi41LTUuNjA3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O1MtMzMyMi4zNTUtMjYwMi41LTMzMjkuMjQ5LTI2MDIuNXogTS0zMzI5LjI0OS0yNTgwLjEzMmMtNS40NDEsMC05Ljg3LTQuNDI3LTkuODctOS44NjhjMC01LjQ0Miw0LjQyOS05Ljg2OSw5Ljg3LTkuODY5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzUuNDQyLDAsOS44Nyw0LjQyOCw5Ljg3LDkuODY5Qy0zMzE5LjM3OC0yNTg0LjU2LTMzMjMuODA1LTI1ODAuMTMyLTMzMjkuMjQ5LTI1ODAuMTMyeiIgZmlsbC1vcGFjaXR5PSIxIi'+
			'8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTMzMjEuNTg5LTI1OTMuODA4Yy0wLjktMS4yNi0yLjM5OS0xLjQyMi0zLjYwNC0xLjQyMmgtMS43MDR2LTEuNjQ2YzAtMC42NjgtMC41NDItMS4yMDktMS4yMS0xLjIwOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2gtMi4yODFjLTAuNjY4LDAtMS4yMSwwLjU0MS0xLjIxLDEuMjA5djEuNjQ2aC0xLjcwMmMtMS4yMDUsMC0yLjcwNCwwLjE2Mi0zLjYwNiwxLjQyMmMtMC42ODgsMC45NjEtMS4wMDcsMi4yMi0xLjAwNywzLjk2MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDIuMSwwLjYwMSwzLjgxNywxLjYwOSw0LjU5'+
			'M2MwLjg4MSwwLjY3OSwxLjUwNiwwLjc5MywyLjU3MywwLjc5M2MxLjI1OCwwLDIuMjE0LTAuNDksMi45ODItMC44ODMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC41NzktMC4yOTcsMS4wMzYtMC41MzEsMS41MDEtMC41MzFzMC45MjMsMC4yMzQsMS41MDIsMC41MzJjMC43NjcsMC4zOTMsMS43MjQsMC44ODIsMi45ODIsMC44ODImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMS4wNjUsMCwxLjY5LTAuMTE0LDIuNTcyLTAuNzkyYzEuMDA5LTAuNzc2LDEuNjExLTIuNDkzLDEuNjExLTQuNTk1Qy0zMzIwLjU4MS0yNTkxLjU4OC0zMzIwLjkwMi0yNTkyLjg0OC0zMzIxLjU4OS'+
			'0yNTkzLjgwOHomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTS0zMzIzLjY2Ny0yNTg3LjE2OGMtMC4zMzUsMC4yNTktMC4zNzgsMC4yOTItMS4wOTcsMC4yOTJjLTAuNjc1LDAtMS4yMzMtMC4yODctMS44NzktMC42MTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNzI5LTAuMzczLTEuNTU3LTAuNzk2LTIuNjA1LTAuNzk2cy0xLjg3NSwwLjQyMy0yLjYwNCwwLjc5NmMtMC42NDYsMC4zMzItMS4yMDQsMC42MTgtMS44NzksMC42MTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNzE5LDAtMC43NjItMC4wMzMtMS4wOTYtMC4yOTJjLTAuMTQyLTAuMTEyLTAu'+
			'NjY4LTAuODkzLTAuNjY4LTIuNjc3YzAtMS4xOTcsMC4xODEtMi4wMzMsMC41NTUtMi41NTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4xMjYtMC4xNzYsMC40MzQtMC40MTEsMS42NC0wLjQxMWg4LjEwN2MxLjIwNSwwLDEuNTEyLDAuMjM0LDEuNjM4LDAuNDExYzAuMzc0LDAuNTIyLDAuNTU2LDEuMzU4LDAuNTU2LDIuNTU1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zMzIzLTI1ODguMDYtMzMyMy41MjctMjU4Ny4yOC0zMzIzLjY2Ny0yNTg3LjE2OHoiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaW'+
			'xsPSJub25lIiBkPSJNLTMzMjkuMjQ5LTI2MDIuNWMtNi44OTIsMC0xMi41LDUuNjA3LTEyLjUsMTIuNXM1LjYwNywxMi41LDEyLjUsMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M2Ljg5MywwLDEyLjUtNS42MDcsMTIuNS0xMi41Uy0zMzIyLjM1NS0yNjAyLjUtMzMyOS4yNDktMjYwMi41eiBNLTMzMjkuMjQ5LTI1ODAuMTMyYy01LjQ0MSwwLTkuODctNC40MjctOS44Ny05Ljg2OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTUuNDQyLDQuNDI5LTkuODY5LDkuODctOS44NjljNS40NDIsMCw5Ljg3LDQuNDI4LDkuODcsOS44NjlDLTMzMTkuMzc4LTI1ODQuNTYtMzMy'+
			'My44MDUtMjU4MC4xMzItMzMyOS4yNDktMjU4MC4xMzJ6IiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTMzMjEuNTg5LTI1OTMuODA4Yy0wLjktMS4yNi0yLjM5OS0xLjQyMi0zLjYwNC0xLjQyMmgtMS43MDR2LTEuNjQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAtMC42NjgtMC41NDItMS4yMDktMS4yMS0xLjIwOWgtMi4yODFjLTAuNjY4LDAtMS4yMSwwLjU0MS0xLjIxLDEuMjA5djEuNjQ2aC0xLjcwMmMtMS4yMDUsMC0yLjcwNCwwLjE2Mi0zLjYwNiwxLjQyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3'+
			'g5O2MtMC42ODgsMC45NjEtMS4wMDcsMi4yMi0xLjAwNywzLjk2M2MwLDIuMSwwLjYwMSwzLjgxNywxLjYwOSw0LjU5M2MwLjg4MSwwLjY3OSwxLjUwNiwwLjc5MywyLjU3MywwLjc5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MxLjI1OCwwLDIuMjE0LTAuNDksMi45ODItMC44ODNjMC41NzktMC4yOTcsMS4wMzYtMC41MzEsMS41MDEtMC41MzFzMC45MjMsMC4yMzQsMS41MDIsMC41MzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC43NjcsMC4zOTMsMS43MjQsMC44ODIsMi45ODIsMC44ODJjMS4wNjUsMCwxLjY5LTAuMTE0LDIuNTcyLTAuNzkyYzEuMDA5LTAuNzc2LDEu'+
			'NjExLTIuNDkzLDEuNjExLTQuNTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zMzIwLjU4MS0yNTkxLjU4OC0zMzIwLjkwMi0yNTkyLjg0OC0zMzIxLjU4OS0yNTkzLjgwOHogTS0zMzIzLjY2Ny0yNTg3LjE2OGMtMC4zMzUsMC4yNTktMC4zNzgsMC4yOTItMS4wOTcsMC4yOTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjc1LDAtMS4yMzMtMC4yODctMS44NzktMC42MThjLTAuNzI5LTAuMzczLTEuNTU3LTAuNzk2LTIuNjA1LTAuNzk2cy0xLjg3NSwwLjQyMy0yLjYwNCwwLjc5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NDYsMC4zMzItMS4yMD'+
			'QsMC42MTgtMS44NzksMC42MThjLTAuNzE5LDAtMC43NjItMC4wMzMtMS4wOTYtMC4yOTJjLTAuMTQyLTAuMTEyLTAuNjY4LTAuODkzLTAuNjY4LTIuNjc3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAtMS4xOTcsMC4xODEtMi4wMzMsMC41NTUtMi41NTVjMC4xMjYtMC4xNzYsMC40MzQtMC40MTEsMS42NC0wLjQxMWg4LjEwN2MxLjIwNSwwLDEuNTEyLDAuMjM0LDEuNjM4LDAuNDExJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMzc0LDAuNTIyLDAuNTU2LDEuMzU4LDAuNTU2LDIuNTU1Qy0zMzIzLTI1ODguMDYtMzMyMy41MjctMjU4Ny4yOC0zMzIzLjY2Ny0yNTg3LjE2'+
			'OHoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiIvPgo8L3N2Zz4K';
		me._enter_vr__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._enter_vr__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMzM0NS4yNSAtMjU3MS4zMzMgMzIgMzIiIGhlaWdodD0iMzJweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzM0NS4yNSAtMjU3MS4zMzMgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiLz4KIDxnIGlkPSJFYmVuZV8xIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNLTMzMjkuMjUtMjU2OS4wODNjLTcuNTgxLDAtMTMuNzUsNi4xNjgtMTMuNzUsMTMuNzQ5YzAsNy41ODMsNi4xNjgsMTMuNzUsMTMuNzUsMTMuNzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNy41'+
			'ODMsMCwxMy43NS02LjE2NywxMy43NS0xMy43NUMtMzMxNS41LTI1NjIuOTE1LTMzMjEuNjY3LTI1NjkuMDgzLTMzMjkuMjUtMjU2OS4wODN6IE0tMzMyOS4yNS0yNTQ0LjQ3OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtNS45ODUsMC0xMC44NTctNC44NjktMTAuODU3LTEwLjg1NWMwLTUuOTg2LDQuODcyLTEwLjg1NSwxMC44NTctMTAuODU1YzUuOTg3LDAsMTAuODU3LDQuODcxLDEwLjg1NywxMC44NTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTMzMTguMzkzLTI1NDkuMzQ5LTMzMjMuMjYyLTI1NDQuNDc5LTMzMjkuMjUtMjU0NC40Nzl6Ii8+CiAgICA8cGF0aCBmaW'+
			'xsPSIjMUExNzFCIiBkPSJNLTMzMjAuODI1LTI1NTkuNTIxYy0wLjk5LTEuMzg3LTIuNjM5LTEuNTY0LTMuOTY1LTEuNTY0aC0xLjg3NXYtMS44MTJjMC0wLjczNC0wLjU5Ni0xLjMzLTEuMzMxLTEuMzMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtoLTIuNTA5Yy0wLjczNSwwLTEuMzMxLDAuNTk2LTEuMzMxLDEuMzN2MS44MTJoLTEuODczYy0xLjMyNSwwLTIuOTc0LDAuMTc4LTMuOTY3LDEuNTY0Yy0wLjc1NiwxLjA1Ny0xLjEwNywyLjQ0Mi0xLjEwNyw0LjM1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDIuMzEsMC42NjIsNC4xOTksMS43Nyw1LjA1M2MwLjk2OSwwLjc0'+
			'NywxLjY1NywwLjg3MywyLjgzMSwwLjg3M2MxLjM4NCwwLDIuNDM2LTAuNTM5LDMuMjgxLTAuOTcxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNjM3LTAuMzI3LDEuMTQtMC41ODQsMS42NTEtMC41ODRjMC41MTIsMCwxLjAxNSwwLjI1NywxLjY1MiwwLjU4NGMwLjg0NCwwLjQzMiwxLjg5NywwLjk3LDMuMjgxLDAuOTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMS4xNzEsMCwxLjg1OS0wLjEyNSwyLjgzLTAuODcxYzEuMTA5LTAuODU0LDEuNzcyLTIuNzQzLDEuNzcyLTUuMDU0Qy0zMzE5LjcxNS0yNTU3LjA4MS0zMzIwLjA2OC0yNTU4LjQ2Ni0zMzIwLjgyNS0yNTU5Lj'+
			'UyMXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTS0zMzIzLjExMS0yNTUyLjIxOGMtMC4zNjksMC4yODUtMC40MTYsMC4zMjEtMS4yMDYsMC4zMjFjLTAuNzQyLDAtMS4zNTctMC4zMTUtMi4wNjctMC42NzkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuODAyLTAuNDExLTEuNzEyLTAuODc2LTIuODY2LTAuODc2Yy0xLjE1MywwLTIuMDYyLDAuNDY1LTIuODY1LDAuODc2Yy0wLjcxLDAuMzY0LTEuMzI1LDAuNjc5LTIuMDY3LDAuNjc5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjc5MSwwLTAuODM4LTAuMDM2LTEuMjA1LTAuMzJjLTAuMTU2LTAuMTIzLTAu'+
			'NzM1LTAuOTgxLTAuNzM1LTIuOTQ1YzAtMS4zMTcsMC4yLTIuMjM2LDAuNjEtMi44MTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4xMzgtMC4xOTQsMC40NzctMC40NTIsMS44MDMtMC40NTJoOC45MThjMS4zMjYsMCwxLjY2MywwLjI1NywxLjgwMSwwLjQ1MmMwLjQxMiwwLjU3NSwwLjYxMSwxLjQ5NCwwLjYxMSwyLjgxMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzMyMi4zNzctMjU1My4xOTktMzMyMi45NTYtMjU1Mi4zNDEtMzMyMy4xMTEtMjU1Mi4yMTh6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZm'+
			'lsbD0ibm9uZSIgZD0iTS0zMzI5LjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDcuNTgzLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1YzcuNTgzLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTMzMTUuNS0yNTYyLjkxNS0zMzIxLjY2Ny0yNTY5LjA4My0zMzI5LjI1LTI1NjkuMDgzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyBNLTMzMjkuMjUtMjU0NC40NzljLTUuOTg1LDAtMTAuODU3LTQuODY5LTEwLjg1Ny0xMC44NTVjMC01Ljk4Niw0Ljg3Mi0xMC44NTUsMTAuODU3LTEwLjg1NSYjeGQ7'+
			'JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M1Ljk4NywwLDEwLjg1Nyw0Ljg3MSwxMC44NTcsMTAuODU1Qy0zMzE4LjM5My0yNTQ5LjM0OS0zMzIzLjI2Mi0yNTQ0LjQ3OS0zMzI5LjI1LTI1NDQuNDc5eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zMzIwLjgyNS0yNTU5LjUyMWMtMC45OS0xLjM4Ny0yLjYzOS0xLjU2NC0zLjk2NS0xLjU2NGgtMS44NzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTt2LTEuODEyYzAtMC43MzQtMC41OTYtMS4zMy0xLjMzMS0xLjMzaC0yLjUwOWMtMC43MzUsMC0xLjMzMSwwLjU5Ni'+
			'0xLjMzMSwxLjMzdjEuODEyaC0xLjg3M2MtMS4zMjUsMC0yLjk3NCwwLjE3OC0zLjk2NywxLjU2NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC43NTYsMS4wNTctMS4xMDcsMi40NDItMS4xMDcsNC4zNTljMCwyLjMxLDAuNjYyLDQuMTk5LDEuNzcsNS4wNTNjMC45NjksMC43NDcsMS42NTcsMC44NzMsMi44MzEsMC44NzMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMS4zODQsMCwyLjQzNi0wLjUzOSwzLjI4MS0wLjk3MWMwLjYzNy0wLjMyNywxLjE0LTAuNTg0LDEuNjUxLTAuNTg0YzAuNTEyLDAsMS4wMTUsMC4yNTcsMS42NTIsMC41ODQmI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7JiN4OTtjMC44NDQsMC40MzIsMS44OTcsMC45NywzLjI4MSwwLjk3YzEuMTcxLDAsMS44NTktMC4xMjUsMi44My0wLjg3MWMxLjEwOS0wLjg1NCwxLjc3Mi0yLjc0MywxLjc3Mi01LjA1NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzMxOS43MTUtMjU1Ny4wODEtMzMyMC4wNjgtMjU1OC40NjYtMzMyMC44MjUtMjU1OS41MjF6IE0tMzMyMy4xMTEtMjU1Mi4yMThjLTAuMzY5LDAuMjg1LTAuNDE2LDAuMzIxLTEuMjA2LDAuMzIxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjc0MiwwLTEuMzU3LTAuMzE1LTIuMDY3LTAuNjc5Yy0wLjgwMi0wLjQxMS0xLjcxMi'+
			'0wLjg3Ni0yLjg2Ni0wLjg3NmMtMS4xNTMsMC0yLjA2MiwwLjQ2NS0yLjg2NSwwLjg3NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC43MSwwLjM2NC0xLjMyNSwwLjY3OS0yLjA2NywwLjY3OWMtMC43OTEsMC0wLjgzOC0wLjAzNi0xLjIwNS0wLjMyYy0wLjE1Ni0wLjEyMy0wLjczNS0wLjk4MS0wLjczNS0yLjk0NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTEuMzE3LDAuMi0yLjIzNiwwLjYxLTIuODExYzAuMTM4LTAuMTk0LDAuNDc3LTAuNDUyLDEuODAzLTAuNDUyaDguOTE4YzEuMzI2LDAsMS42NjMsMC4yNTcsMS44MDEsMC40NTImI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7JiN4OTtjMC40MTIsMC41NzUsMC42MTEsMS40OTQsMC42MTEsMi44MTFDLTMzMjIuMzc3LTI1NTMuMTk5LTMzMjIuOTU2LTI1NTIuMzQxLTMzMjMuMTExLTI1NTIuMjE4eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzMyOS4yNS0yNTY5LjA4M2MtNy41ODEsMC0xMy43NSw2LjE2OC0xMy43NSwxMy43NDljMCw3LjU4Myw2LjE2OCwxMy43NSwxMy43NSwxMy43NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M3LjU4MywwLDEzLjc1LTYuMTY3LDEzLjc1LTEzLjc1Qy0zMzE1LjUtMjU2Mi45MTUtMzMyMS'+
			'42NjctMjU2OS4wODMtMzMyOS4yNS0yNTY5LjA4M3ogTS0zMzI5LjI1LTI1NDQuNDc5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy01Ljk4NSwwLTEwLjg1Ny00Ljg2OS0xMC44NTctMTAuODU1YzAtNS45ODYsNC44NzItMTAuODU1LDEwLjg1Ny0xMC44NTVjNS45ODcsMCwxMC44NTcsNC44NzEsMTAuODU3LDEwLjg1NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzMxOC4zOTMtMjU0OS4zNDktMzMyMy4yNjItMjU0NC40NzktMzMyOS4yNS0yNTQ0LjQ3OXoiIGZpbGwtb3BhY2l0eT0iMSIvPgogICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTS0zMzIwLjgyNS0yNTU5LjUy'+
			'MWMtMC45OS0xLjM4Ny0yLjYzOS0xLjU2NC0zLjk2NS0xLjU2NGgtMS44NzV2LTEuODEyYzAtMC43MzQtMC41OTYtMS4zMy0xLjMzMS0xLjMzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7aC0yLjUwOWMtMC43MzUsMC0xLjMzMSwwLjU5Ni0xLjMzMSwxLjMzdjEuODEyaC0xLjg3M2MtMS4zMjUsMC0yLjk3NCwwLjE3OC0zLjk2NywxLjU2NGMtMC43NTYsMS4wNTctMS4xMDcsMi40NDItMS4xMDcsNC4zNTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwyLjMxLDAuNjYyLDQuMTk5LDEuNzcsNS4wNTNjMC45NjksMC43NDcsMS42NTcsMC44NzMsMi44MzEsMC44NzNjMS4zODQsMC'+
			'wyLjQzNi0wLjUzOSwzLjI4MS0wLjk3MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjYzNy0wLjMyNywxLjE0LTAuNTg0LDEuNjUxLTAuNTg0YzAuNTEyLDAsMS4wMTUsMC4yNTcsMS42NTIsMC41ODRjMC44NDQsMC40MzIsMS44OTcsMC45NywzLjI4MSwwLjk3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzEuMTcxLDAsMS44NTktMC4xMjUsMi44My0wLjg3MWMxLjEwOS0wLjg1NCwxLjc3Mi0yLjc0MywxLjc3Mi01LjA1NEMtMzMxOS43MTUtMjU1Ny4wODEtMzMyMC4wNjgtMjU1OC40NjYtMzMyMC44MjUtMjU1OS41MjF6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7'+
			'IE0tMzMyMy4xMTEtMjU1Mi4yMThjLTAuMzY5LDAuMjg1LTAuNDE2LDAuMzIxLTEuMjA2LDAuMzIxYy0wLjc0MiwwLTEuMzU3LTAuMzE1LTIuMDY3LTAuNjc5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjgwMi0wLjQxMS0xLjcxMi0wLjg3Ni0yLjg2Ni0wLjg3NmMtMS4xNTMsMC0yLjA2MiwwLjQ2NS0yLjg2NSwwLjg3NmMtMC43MSwwLjM2NC0xLjMyNSwwLjY3OS0yLjA2NywwLjY3OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC43OTEsMC0wLjgzOC0wLjAzNi0xLjIwNS0wLjMyYy0wLjE1Ni0wLjEyMy0wLjczNS0wLjk4MS0wLjczNS0yLjk0NWMwLTEuMzE3LDAuMi'+
			'0yLjIzNiwwLjYxLTIuODExJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMTM4LTAuMTk0LDAuNDc3LTAuNDUyLDEuODAzLTAuNDUyaDguOTE4YzEuMzI2LDAsMS42NjMsMC4yNTcsMS44MDEsMC40NTJjMC40MTIsMC41NzUsMC42MTEsMS40OTQsMC42MTEsMi44MTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTMzMjIuMzc3LTI1NTMuMTk5LTMzMjIuOTU2LTI1NTIuMzQxLTMzMjMuMTExLTI1NTIuMjE4eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0tMzMyOS4yNS0yNTY5LjA4'+
			'M2MtNy41ODEsMC0xMy43NSw2LjE2OC0xMy43NSwxMy43NDkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCw3LjU4Myw2LjE2OCwxMy43NSwxMy43NSwxMy43NWM3LjU4MywwLDEzLjc1LTYuMTY3LDEzLjc1LTEzLjc1Qy0zMzE1LjUtMjU2Mi45MTUtMzMyMS42NjctMjU2OS4wODMtMzMyOS4yNS0yNTY5LjA4M3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTS0zMzI5LjI1LTI1NDQuNDc5Yy01Ljk4NSwwLTEwLjg1Ny00Ljg2OS0xMC44NTctMTAuODU1YzAtNS45ODYsNC44NzItMTAuODU1LDEwLjg1Ny0xMC44NTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNS45OD'+
			'csMCwxMC44NTcsNC44NzEsMTAuODU3LDEwLjg1NUMtMzMxOC4zOTMtMjU0OS4zNDktMzMyMy4yNjItMjU0NC40NzktMzMyOS4yNS0yNTQ0LjQ3OXoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0tMzMyMC44MjUtMjU1OS41MjFjLTAuOTktMS4zODctMi42MzktMS41NjQtMy45NjUtMS41NjRoLTEuODc1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7di0xLjgxMmMwLTAuNzM0LTAuNTk2LTEuMzMtMS4zMzEtMS4zM2gtMi41MDljLTAuNzM1LDAtMS4zMzEsMC41OTYtMS4zMzEsMS4zM3YxLjgxMmgtMS44NzNjLTEuMzI1'+
			'LDAtMi45NzQsMC4xNzgtMy45NjcsMS41NjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNzU2LDEuMDU3LTEuMTA3LDIuNDQyLTEuMTA3LDQuMzU5YzAsMi4zMSwwLjY2Miw0LjE5OSwxLjc3LDUuMDUzYzAuOTY5LDAuNzQ3LDEuNjU3LDAuODczLDIuODMxLDAuODczJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzEuMzg0LDAsMi40MzYtMC41MzksMy4yODEtMC45NzFjMC42MzctMC4zMjcsMS4xNC0wLjU4NCwxLjY1MS0wLjU4NGMwLjUxMiwwLDEuMDE1LDAuMjU3LDEuNjUyLDAuNTg0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuODQ0LDAuNDMyLDEuODk3LD'+
			'AuOTcsMy4yODEsMC45N2MxLjE3MSwwLDEuODU5LTAuMTI1LDIuODMtMC44NzFjMS4xMDktMC44NTQsMS43NzItMi43NDMsMS43NzItNS4wNTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTMzMTkuNzE1LTI1NTcuMDgxLTMzMjAuMDY4LTI1NTguNDY2LTMzMjAuODI1LTI1NTkuNTIxeiBNLTMzMjMuMTExLTI1NTIuMjE4Yy0wLjM2OSwwLjI4NS0wLjQxNiwwLjMyMS0xLjIwNiwwLjMyMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC43NDIsMC0xLjM1Ny0wLjMxNS0yLjA2Ny0wLjY3OWMtMC44MDItMC40MTEtMS43MTItMC44NzYtMi44NjYtMC44NzZjLTEuMTUzLDAtMi4w'+
			'NjIsMC40NjUtMi44NjUsMC44NzYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNzEsMC4zNjQtMS4zMjUsMC42NzktMi4wNjcsMC42NzljLTAuNzkxLDAtMC44MzgtMC4wMzYtMS4yMDUtMC4zMmMtMC4xNTYtMC4xMjMtMC43MzUtMC45ODEtMC43MzUtMi45NDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0xLjMxNywwLjItMi4yMzYsMC42MS0yLjgxMWMwLjEzOC0wLjE5NCwwLjQ3Ny0wLjQ1MiwxLjgwMy0wLjQ1Mmg4LjkxOGMxLjMyNiwwLDEuNjYzLDAuMjU3LDEuODAxLDAuNDUyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNDEyLDAuNTc1LDAuNjExLD'+
			'EuNDk0LDAuNjExLDIuODExQy0zMzIyLjM3Ny0yNTUzLjE5OS0zMzIyLjk1Ni0yNTUyLjM0MS0zMzIzLjExMS0yNTUyLjIxOHoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiIvPgo8L3N2Zz4K';
		me._enter_vr__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="enter_vr";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 256px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._enter_vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._enter_vr.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_enter_vr') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 7))
			)
			{
				newLogicStatePosition = 7;
			}
			else if (
				((player.getVariableValue('pos_enter_vr') == 8))
			)
			{
				newLogicStatePosition = 8;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._enter_vr.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._enter_vr.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._enter_vr.ggCurrentLogicStatePosition == 0) {
					me._enter_vr.style.left='0px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 1) {
					me._enter_vr.style.left='32px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 2) {
					me._enter_vr.style.left='64px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 3) {
					me._enter_vr.style.left='96px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 4) {
					me._enter_vr.style.left='128px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 5) {
					me._enter_vr.style.left='160px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 6) {
					me._enter_vr.style.left='192px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 7) {
					me._enter_vr.style.left='224px';
					me._enter_vr.style.top='0px';
				}
				else if (me._enter_vr.ggCurrentLogicStatePosition == 8) {
					me._enter_vr.style.left='256px';
					me._enter_vr.style.top='0px';
				}
				else {
					me._enter_vr.style.left='256px';
					me._enter_vr.style.top='0px';
				}
			}
		}
		me._enter_vr.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.hasVR() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._enter_vr.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._enter_vr.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._enter_vr.ggCurrentLogicStateVisible == 0) {
					me._enter_vr.style.visibility=(Number(me._enter_vr.style.opacity)>0||!me._enter_vr.style.opacity)?'inherit':'hidden';
					me._enter_vr.ggVisible=true;
				}
				else {
					me._enter_vr.style.visibility="hidden";
					me._enter_vr.ggVisible=false;
				}
			}
		}
		me._enter_vr.onclick=function (e) {
			player.enterVR();
		}
		me._enter_vr.onmouseover=function (e) {
			me._enter_vr__img.style.visibility='hidden';
			me._enter_vr__imgo.style.visibility='inherit';
			me.elementMouseOver['enter_vr']=true;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.onmouseout=function (e) {
			me._enter_vr__img.style.visibility='inherit';
			me._enter_vr__imgo.style.visibility='hidden';
			me.elementMouseOver['enter_vr']=false;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.ontouchend=function (e) {
			me.elementMouseOver['enter_vr']=false;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_enter_vr=document.createElement('div');
		els=me._tt_enter_vr__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_enter_vr";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="VR \u6a21\u5f0f";
		el.appendChild(els);
		me._tt_enter_vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_enter_vr.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_enter_vr.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_enter_vr.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._tt_enter_vr.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_enter_vr.style.top='-25px';
					me._tt_enter_vr.ggUpdatePosition(true);
				}
				else {
					me._tt_enter_vr.ggDx=0;
					me._tt_enter_vr.style.top='32px';
					me._tt_enter_vr.ggUpdatePosition(true);
				}
			}
		}
		me._tt_enter_vr.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['enter_vr'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_enter_vr.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_enter_vr.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._tt_enter_vr.ggCurrentLogicStateVisible == 0) {
					me._tt_enter_vr.style.visibility=(Number(me._tt_enter_vr.style.opacity)>0||!me._tt_enter_vr.style.opacity)?'inherit':'hidden';
					me._tt_enter_vr.ggVisible=true;
				}
				else {
					me._tt_enter_vr.style.visibility="hidden";
					me._tt_enter_vr.ggVisible=false;
				}
			}
		}
		me._tt_enter_vr.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._enter_vr.appendChild(me._tt_enter_vr);
		me._controller_slider.appendChild(me._enter_vr);
		el=me._fullscreen_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="fullscreen_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 224px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_fullscreen') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else if (
				((player.getVariableValue('pos_fullscreen') == 7))
			)
			{
				newLogicStatePosition = 7;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._fullscreen_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._fullscreen_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._fullscreen_buttons.style[domTransition]='left 0s, top 0s';
				if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 0) {
					me._fullscreen_buttons.style.left='0px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 1) {
					me._fullscreen_buttons.style.left='32px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 2) {
					me._fullscreen_buttons.style.left='64px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 3) {
					me._fullscreen_buttons.style.left='96px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 4) {
					me._fullscreen_buttons.style.left='128px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 5) {
					me._fullscreen_buttons.style.left='160px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 6) {
					me._fullscreen_buttons.style.left='192px';
					me._fullscreen_buttons.style.top='0px';
				}
				else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 7) {
					me._fullscreen_buttons.style.left='224px';
					me._fullscreen_buttons.style.top='0px';
				}
				else {
					me._fullscreen_buttons.style.left='224px';
					me._fullscreen_buttons.style.top='0px';
				}
			}
		}
		me._fullscreen_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_fullscreen') == true)) && 
				((player.getOS() != 4))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._fullscreen_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._fullscreen_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._fullscreen_buttons.style[domTransition]='left 0s, top 0s';
				if (me._fullscreen_buttons.ggCurrentLogicStateVisible == 0) {
					me._fullscreen_buttons.style.visibility=(Number(me._fullscreen_buttons.style.opacity)>0||!me._fullscreen_buttons.style.opacity)?'inherit':'hidden';
					me._fullscreen_buttons.ggVisible=true;
				}
				else {
					me._fullscreen_buttons.style.visibility="hidden";
					me._fullscreen_buttons.ggVisible=false;
				}
			}
		}
		me._fullscreen_buttons.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._fullscreen_buttons.onmouseover=function (e) {
			me.elementMouseOver['fullscreen_buttons']=true;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._fullscreen_buttons.onmouseout=function (e) {
			me.elementMouseOver['fullscreen_buttons']=false;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._fullscreen_buttons.ontouchend=function (e) {
			me.elementMouseOver['fullscreen_buttons']=false;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._fullscreen_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._fullscreen=document.createElement('div');
		els=me._fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjE0OSw3LjAzNGMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjgtMC44NDYsMC4zNTEmI3hkOyYjeGE7JiN4OTsmI3g5O1MzLjUsNy41NjUsMy41LDcuODh2MTYuMjRjMCwwLjMxNSwwLjEyOCwwLjYyMywwLjM1MSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0Niww'+
			'LjM1MWgyMi42MDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjMxOSwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTFjMC4yMjctMC4yMjYsMC4zNTEtMC41MjYsMC4zNTEtMC44NDZWNy44OEMyOC41LDcuNTY1LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzR6IE01Ljg5MywyMi45MjQmI3hkOyYjeGE7JiN4OTsmI3g5O1Y5LjA3NmgyMC4yMTV2MTMuODQ4SDUuODkzeiBNMTYsMTkuMjRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZ2MC40NDhjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NnYtMC'+
			'40NDhDMTcuMTk2LDE5Ljc3NSwxNi42NjEsMTkuMjQsMTYsMTkuMjR6IE0xMS42NywxNC44MDRoLTAuMzQyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgwLjM0MmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTIuODY2LDE1LjMzOSwxMi4zMzEsMTQuODA0LDExLjY3LDE0LjgwNHogTTguMTk1LDE0LjgwNEg3Ljg1NGMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NjEsMC41MzYsMS4x'+
			'OTYsMS4xOTcsMS4xOTZoMC4zNDFjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzkuMzkyLDE1LjMzOSw4Ljg1NSwxNC44MDQsOC4xOTUsMTQuODA0eiBNMTguMjg3LDEzLjQxMiYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0wLjIyMiwwLjE0OGMtMC40MjcsMC4yODUtMC41NDEsMC44NjMtMC4yNTYsMS4yOWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy0wLjE1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7bDAuMjIxLTAuMTQ4YzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjlDMTkuMjkzLDEzLjI0MiwxOC43MTUsMTMuMTI2LD'+
			'E4LjI4NywxMy40MTJ6IE0yMy44MTMsOS43MmwtMC4yMjIsMC4xNDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40MjcsMC4yODYtMC41NDIsMC44NjQtMC4yNTYsMS4yOTFjMC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40MjctMC4yODUsMC41NDItMC44NjMsMC4yNTYtMS4yOTFDMjQuODE4LDkuNTQ5LDI0LjI0MSw5LjQzNCwyMy44MTMsOS43MnogTTE2LDE0LjgwNGgtMS4xOTZjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsm'+
			'I3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTAuMzE1LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMSwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTIxLjA1LDExLjU2NWwtMC4yMjEsMC4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTFjMC4xOCwwLjI2OCwwLjQ3NSwwLjQxMywwLjc3NCwwLjQxM2MwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE3LT'+
			'AuMTU3bDAuMjIxLTAuMTQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTFTMjEuNDc4LDExLjI4LDIxLjA1LDExLjU2NXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4LjE0OSw3LjAzNGMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjgtMC44NDYsMC4zNTEmI3hkOyYjeGE7JiN4OTsmI3g5O1MzLjUsNy41NjUsMy41LDcuODh2MTYuMjRjMCwwLjMxNSww'+
			'LjEyOCwwLjYyMywwLjM1MSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MWgyMi42MDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjMxOSwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTFjMC4yMjctMC4yMjYsMC4zNTEtMC41MjYsMC4zNTEtMC44NDZWNy44OEMyOC41LDcuNTY1LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzR6IE01Ljg5MywyMi45MjQmI3hkOyYjeGE7JiN4OTsmI3g5O1Y5LjA3NmgyMC4yMTV2MTMuODQ4SDUuODkzeiBNMTYsMTkuMjRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZ2MC40NDhjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Ni'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NnYtMC40NDhDMTcuMTk2LDE5Ljc3NSwxNi42NjEsMTkuMjQsMTYsMTkuMjR6IE0xMS42NywxNC44MDRoLTAuMzQyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgwLjM0MmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTIuODY2LDE1LjMzOSwxMi4zMzEsMTQuODA0LDExLjY3LDE0LjgwNHogTTguMTk1LDE0LjgwNEg3Ljg1NGMtMC42NjEsMC0xLjE5Nyww'+
			'LjUzNS0xLjE5NywxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMC4zNDFjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzkuMzkyLDE1LjMzOSw4Ljg1NSwxNC44MDQsOC4xOTUsMTQuODA0eiBNMTguMjg3LDEzLjQxMiYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0wLjIyMiwwLjE0OGMtMC40MjcsMC4yODUtMC41NDEsMC44NjMtMC4yNTYsMS4yOWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy0wLjE1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7bDAuMjIxLTAuMTQ4YzAuNDI4LTAuMj'+
			'g1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjlDMTkuMjkzLDEzLjI0MiwxOC43MTUsMTMuMTI2LDE4LjI4NywxMy40MTJ6IE0yMy44MTMsOS43MmwtMC4yMjIsMC4xNDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40MjcsMC4yODYtMC41NDIsMC44NjQtMC4yNTYsMS4yOTFjMC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40MjctMC4yODUsMC41NDItMC44NjMsMC4yNTYtMS4yOTFDMjQuODE4LDkuNTQ5LDI0LjI0MSw5LjQzNCwyMy44MTMsOS43MnogTTE2LDE0LjgwNGgt'+
			'MS4xOTZjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTAuMzE1LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMSwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTIxLjA1LDExLjU2NWwtMC4yMjEsMC4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTFjMC4xOCwwLj'+
			'I2OCwwLjQ3NSwwLjQxMywwLjc3NCwwLjQxM2MwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTFTMjEuNDc4LDExLjI4LDIxLjA1LDExLjU2NXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._fullscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._fullscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjguMTQ5LDcuMDM0Yy0wLjIyMy0wLjIyMy0wLjUzMS0wLjM1MS0wLjg0Ni0wLjM1MUg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyOC0wLjg0NiwwLjM1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7UzMuNSw3LjU2NSwzLjUsNy44OHYxNi4yNGMwLDAu'+
			'MzE1LDAuMTI4LDAuNjIzLDAuMzUxLDAuODQ2YzAuMjIzLDAuMjI0LDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxaDIyLjYwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMzE5LDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MWMwLjIyNy0wLjIyNiwwLjM1MS0wLjUyNiwwLjM1MS0wLjg0NlY3Ljg4QzI4LjUsNy41NjUsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzNHogTTUuODkzLDIyLjkyNCYjeGQ7JiN4YTsmI3g5OyYjeDk7VjkuMDc2aDIwLjIxNXYxMy44NDhINS44OTN6IE0xNiwxOS4yNGMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NnYwLjQ0OGMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LD'+
			'EuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2di0wLjQ0OEMxNy4xOTYsMTkuNzc1LDE2LjY2MSwxOS4yNCwxNiwxOS4yNHogTTExLjY3LDE0LjgwNGgtMC4zNDImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDAuMzQyYzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O0MxMi44NjYsMTUuMzM5LDEyLjMzMSwxNC44MDQsMTEuNjcsMTQuODA0eiBNOC4xOTUsMTQuODA0SDcuODU0Yy0wLjY2MSwwLTEu'+
			'MTk3LDAuNTM1LTEuMTk3LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgwLjM0MWMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZDOS4zOTIsMTUuMzM5LDguODU1LDE0LjgwNCw4LjE5NSwxNC44MDR6IE0xOC4yODcsMTMuNDEyJiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTAuMjIyLDAuMTQ4Yy0wLjQyNywwLjI4NS0wLjU0MSwwLjg2My0wLjI1NiwxLjI5YzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMC4yMjEtMC4xNDhjMC40Mj'+
			'gtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOUMxOS4yOTMsMTMuMjQyLDE4LjcxNSwxMy4xMjYsMTguMjg3LDEzLjQxMnogTTIzLjgxMyw5LjcybC0wLjIyMiwwLjE0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2NC0wLjI1NiwxLjI5MWMwLjE3OSwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNGMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTdsMC4yMjEtMC4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQyNy0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ni0xLjI5MUMyNC44MTgsOS41NDksMjQuMjQxLDkuNDM0LDIzLjgxMyw5LjcyeiBNMTYsMTQu'+
			'ODA0aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlYxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMC4zMTUtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMxLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMjEuMDUsMTEuNTY1bC0wLjIyMSwwLjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLj'+
			'E4LDAuMjY4LDAuNDc1LDAuNDEzLDAuNzc0LDAuNDEzYzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQyOC0wLjI4NiwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MVMyMS40NzgsMTEuMjgsMjEuMDUsMTEuNTY1eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yOC4xNDksNy4wMzRjLTAuMjIzLTAuMjIz'+
			'LTAuNTMxLTAuMzUxLTAuODQ2LTAuMzUxSDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxJiN4ZDsmI3hhOyYjeDk7JiN4OTtTMy41LDcuNTY1LDMuNSw3Ljg4djE2LjI0YzAsMC4zMTUsMC4xMjgsMC42MjMsMC4zNTEsMC44NDZjMC4yMjMsMC4yMjQsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFoMjIuNjA3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zMTksMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxYzAuMjI3LTAuMjI2LDAuMzUxLTAuNTI2LDAuMzUxLTAuODQ2VjcuODhDMjguNSw3LjU2NSwyOC4zNzIsNy4yNTcsMjguMTQ5LDcuMDM0eiBNNS44OTMsMjIuOTI0JiN4ZDsmI3hhOy'+
			'YjeDk7JiN4OTtWOS4wNzZoMjAuMjE1djEzLjg0OEg1Ljg5M3ogTTE2LDE5LjI0Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2djAuNDQ4YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZ2LTAuNDQ4QzE3LjE5NiwxOS43NzUsMTYuNjYxLDE5LjI0LDE2LDE5LjI0eiBNMTEuNjcsMTQuODA0aC0wLjM0MiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMC4zNDJjMC42NjEsMCwxLjE5'+
			'Ni0wLjUzNSwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzEyLjg2NiwxNS4zMzksMTIuMzMxLDE0LjgwNCwxMS42NywxNC44MDR6IE04LjE5NSwxNC44MDRINy44NTRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDAuMzQxYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NkM5LjM5MiwxNS4zMzksOC44NTUsMTQuODA0LDguMTk1LDE0LjgwNHogTTE4LjI4NywxMy40MTImI3hkOyYjeGE7JiN4OTsmI3g5O2wtMC4yMjIsMC4xNDhjLTAuNDI3LDAuMjg1LTAuNTQxLDAuODYzLT'+
			'AuMjU2LDEuMjljMC4xOCwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNGMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTcmI3hkOyYjeGE7JiN4OTsmI3g5O2wwLjIyMS0wLjE0OGMwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5QzE5LjI5MywxMy4yNDIsMTguNzE1LDEzLjEyNiwxOC4yODcsMTMuNDEyeiBNMjMuODEzLDkuNzJsLTAuMjIyLDAuMTQ3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODY0LTAuMjU2LDEuMjkxYzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy0wLjE1N2ww'+
			'LjIyMS0wLjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDI3LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU2LTEuMjkxQzI0LjgxOCw5LjU0OSwyNC4yNDEsOS40MzQsMjMuODEzLDkuNzJ6IE0xNiwxNC44MDRoLTEuMTk2Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2VjE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjMxNS0wLjEyOC0wLjYyMy0wLjM1LTAuODQ2QzE2LjYyMywxNC45Mz'+
			'EsMTYuMzE0LDE0LjgwNCwxNiwxNC44MDR6IE0yMS4wNSwxMS41NjVsLTAuMjIxLDAuMTQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU3LDEuMjkxYzAuMTgsMC4yNjgsMC40NzUsMC40MTMsMC43NzQsMC40MTNjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDI4LTAuMjg2LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxUzIxLjQ3OCwxMS4yOCwyMS4wNSwxMS41NjV6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._fullscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._fullscreen.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._fullscreen.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._fullscreen.style[domTransition]='opacity 500ms ease 0ms';
				if (me._fullscreen.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._fullscreen.style.opacity == 0.0) { me._fullscreen.style.visibility="hidden"; } }, 505);
					me._fullscreen.style.opacity=0;
				}
				else {
					me._fullscreen.style.visibility=me._fullscreen.ggVisible?'inherit':'hidden';
					me._fullscreen.style.opacity=1;
				}
			}
		}
		me._fullscreen.onmouseover=function (e) {
			me._fullscreen__img.style.visibility='hidden';
			me._fullscreen__imgo.style.visibility='inherit';
		}
		me._fullscreen.onmouseout=function (e) {
			me._fullscreen__img.style.visibility='inherit';
			me._fullscreen__imgo.style.visibility='hidden';
		}
		me._fullscreen.ggUpdatePosition=function (useTransition) {
		}
		me._fullscreen_buttons.appendChild(me._fullscreen);
		el=me._fullscreen_off=document.createElement('div');
		els=me._fullscreen_off__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTE2LDE0LjgwNEg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyOC0wLjg0NiwwLjM1MUMzLjYyNywxNS4zNzcsMy41LDE1LjY4NiwzLjUsMTZ2OC4xMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC4zMTUsMC4xMjcsMC42MjQsMC4zNSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMwLjMyLDAsMC42Mi0wLjEyNCwwLjg0'+
			'Ni0wLjM1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMjI2LTAuMjI2LDAuMzUtMC41MjUsMC4zNS0wLjg0NlYxNmMwLTAuMzE0LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMiwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTE0LjgwNCwyMi45MjQmI3hkOyYjeGE7JiN4OTsmI3g5O0g1Ljg5M3YtNS43MjhoOC45MTFWMjIuOTI0eiBNNC42OTcsMTMuOTk4YzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4YzAtMC42Ni0wLjUzNi0xLjE5NS0xLjE5Ni0xLjE5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk1djAuMz'+
			'A4QzMuNSwxMy40NjIsNC4wMzYsMTMuOTk4LDQuNjk3LDEzLjk5OHogTTQuNjk3LDEwLjQ3N2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk3aDAmI3hkOyYjeGE7JiN4OTsmI3g5O1Y5LjA3NmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2YzAtMC42Ni0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5Nkg0LjY5N2MtMC4zMTUsMC0wLjYyMywwLjEyNy0wLjg0NiwwLjM1JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMy42MjgsNy4yNTcsMy41LDcuNTY0LDMuNSw3Ljg4djEuMzk5QzMuNSw5Ljk0LDQuMDM2LDEwLjQ3Nyw0LjY5NywxMC40Nzd6IE0xOS4yODksOS4wNzZoMC4yNDJjMC42NjEsMCwx'+
			'LjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjUzNS0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDJjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZTMTguNjI4LDkuMDc2LDE5LjI4OSw5LjA3NnogTTE2LjEyMiw2LjY4NGgtMC4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnMwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0M2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2UzE2Ljc4Miw2LjY4NCwxNi4xMjIsNi42ODR6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTIyLjY5OCw5LjA3NmgwLjI0M2'+
			'MwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZzLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0M2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtTMjIuMDM4LDkuMDc2LDIyLjY5OCw5LjA3NnogTTkuMDYsOS4wNzZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2UzkuOTYyLDYuNjg0LDkuMzAyLDYuNjg0SDkuMDYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlM4LjM5OSw5LjA3Niw5LjA2LDkuMDc2eiBNMTIuNDY5LDkuMDc2aDAuMjQzYzAuNjYxLDAsMS4xOTYtMC41MzYs'+
			'MS4xOTYtMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2UzExLjgwOCw5LjA3NiwxMi40NjksOS4wNzZ6IE0yNy4zMDQsMTEuMTExJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOC41LDExLjY0NiwyNy45NjQsMTEuMTExLDI3LjMwNCwxMS4xMTF6IE0yNy4zMDQsMT'+
			'QuNjVjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE1LjE4NiwyNy45NjQsMTQuNjUsMjcuMzA0LDE0LjY1eiBNMjcuMzA0LDIxLjcyOGMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7aC0wLjIzNGMtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMS40MzFjMC4zMTQsMCwwLjYyMy0wLjEyOCww'+
			'Ljg0Ni0wLjM1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7czAuMzUxLTAuNTMsMC4zNTEtMC44NDZ2LTEuMTk2QzI4LjUsMjIuMjY0LDI3Ljk2NCwyMS43MjgsMjcuMzA0LDIxLjcyOHogTTI3LjMwNCwxOC4xODljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MC4zMDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE4LjcyNiwyNy45NjQsMTguMTg5LDI3LjMwNCwxOC4xODl6IE0yOC4xNDksNy4wMzMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4yMjMtMC4yMjItMC41Mz'+
			'EtMC4zNS0wLjg0Ni0wLjM1aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWNy44OEMyOC41LDcuNTY0LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzN6IE0yMS44NjMsMTMuMjYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMC4yMjEtMC4xNDdjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOTFjLTAuMjg2LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU2bC0w'+
			'LjIyMSwwLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0QzIxLjUyNCwxMy40MTgsMjEuNzA0LDEzLjM2NywyMS44NjMsMTMuMjYxeiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xOS4zMjksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQyYzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMC41MjUsMjMuNDYsMTkuOTksMjIuOTI0LD'+
			'E5LjMyOSwyMi45MjR6IE0xOC41ODQsMTUuMjY0YzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5Yy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1N2wtMC4yMjIsMC4xNDdjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU2LDEuMjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTcuOTg5LDE1LjExOSwxOC4yODMsMTUuMjY0LDE4LjU4NCwxNS4yNjR6IE0yMi43MzksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NiYjeGQ7'+
			'JiN4YTsmI3g5OyYjeDk7YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzIzLjkzNiwyMy40NiwyMy4zOTksMjIuOTI0LDIyLjczOSwyMi45MjR6IE0yNS4xMDQsOS45NzYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4yODUtMC40MjctMC44NjMtMC41NDItMS4yOTEtMC4yNTZsLTAuMjIxLDAuMTQ3Yy0wLjQyOCwwLjI4NS0wLjU0MiwwLjg2My0wLjI1NiwxLjI5YzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNi0wLjE1NmwwLj'+
			'IyMi0wLjE0OEMyNS4yNzQsMTAuOTgxLDI1LjM4OSwxMC40MDMsMjUuMTA0LDkuOTc2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMTYsMTQuODA0SDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxQzMuNjI3LDE1LjM3NywzLjUsMTUuNjg2LDMuNSwxNnY4LjEyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjMxNSwwLjEyNywwLjYyNCwwLjM1LDAuODQ2YzAuMjIzLDAuMjI0LDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxSDE2YzAuMzIsMCwwLjYyLTAuMTI0'+
			'LDAuODQ2LTAuMzUxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yMjYtMC4yMjYsMC4zNS0wLjUyNSwwLjM1LTAuODQ2VjE2YzAtMC4zMTQtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMyLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMTQuODA0LDIyLjkyNCYjeGQ7JiN4YTsmI3g5OyYjeDk7SDUuODkzdi01LjcyOGg4LjkxMVYyMi45MjR6IE00LjY5NywxMy45OThjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhjMC0wLjY2LTAuNTM2LTEuMTk1LTEuMTk2LTEuMTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOT'+
			'V2MC4zMDhDMy41LDEzLjQ2Miw0LjAzNiwxMy45OTgsNC42OTcsMTMuOTk4eiBNNC42OTcsMTAuNDc3YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTdoMCYjeGQ7JiN4YTsmI3g5OyYjeDk7VjkuMDc2YzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZjMC0wLjY2LTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2SDQuNjk3Yy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzUmI3hkOyYjeGE7JiN4OTsmI3g5O0MzLjYyOCw3LjI1NywzLjUsNy41NjQsMy41LDcuODh2MS4zOTlDMy41LDkuOTQsNC4wMzYsMTAuNDc3LDQuNjk3LDEwLjQ3N3ogTTE5LjI4OSw5LjA3NmgwLjI0MmMwLjY2'+
			'MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuNTM1LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0MmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlMxOC42MjgsOS4wNzYsMTkuMjg5LDkuMDc2eiBNMTYuMTIyLDYuNjg0aC0wLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2czAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQzYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZTMTYuNzgyLDYuNjg0LDE2LjEyMiw2LjY4NHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMjIuNjk4LDkuMDc2aD'+
			'AuMjQzYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnMtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O1MyMi4wMzgsOS4wNzYsMjIuNjk4LDkuMDc2eiBNOS4wNiw5LjA3NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZTOS45NjIsNi42ODQsOS4zMDIsNi42ODRIOS4wNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2UzguMzk5LDkuMDc2LDkuMDYsOS4wNzZ6IE0xMi40NjksOS4wNzZoMC4yNDNjMC42NjEsMCwxLjE5Ni0w'+
			'LjUzNiwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDNjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZTMTEuODA4LDkuMDc2LDEyLjQ2OSw5LjA3NnogTTI3LjMwNCwxMS4xMTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI4LjUsMTEuNjQ2LDI3Ljk2NCwxMS4xMTEsMjcuMzA0LDExLjExMXogTTI3Lj'+
			'MwNCwxNC42NWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTUuMTg2LDI3Ljk2NCwxNC42NSwyNy4zMDQsMTQuNjV6IE0yNy4zMDQsMjEuNzI4Yy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtoLTAuMjM0Yy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxLjQzMWMwLjMxNCwwLDAuNjIzLTAu'+
			'MTI4LDAuODQ2LTAuMzUxJiN4ZDsmI3hhOyYjeDk7JiN4OTtzMC4zNTEtMC41MywwLjM1MS0wLjg0NnYtMS4xOTZDMjguNSwyMi4yNjQsMjcuOTY0LDIxLjcyOCwyNy4zMDQsMjEuNzI4eiBNMjcuMzA0LDE4LjE4OWMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYwLjMwOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTguNzI2LDI3Ljk2NCwxOC4xODksMjcuMzA0LDE4LjE4OXogTTI4LjE0OSw3LjAzMyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjIyMy0wLjIyMi'+
			'0wLjUzMS0wLjM1LTAuODQ2LTAuMzVoLTEuMTk2Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzM3ogTTIxLjg2MywxMy4yNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2wwLjIyMS0wLjE0N2MwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MWMtMC4yODYtMC40MjgtMC44NjMtMC41NDItMS4yOTEtMC4y'+
			'NTZsLTAuMjIxLDAuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU3LDEuMjkxYzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRDMjEuNTI0LDEzLjQxOCwyMS43MDQsMTMuMzY3LDIxLjg2MywxMy4yNjF6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE5LjMyOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIwLjUyNSwyMy40NiwxOS45OSwyMi'+
			'45MjQsMTkuMzI5LDIyLjkyNHogTTE4LjU4NCwxNS4yNjRjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjljLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU3bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTYsMS4yOTEmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNy45ODksMTUuMTE5LDE4LjI4MywxNS4yNjQsMTguNTg0LDE1LjI2NHogTTIyLjczOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZDMjMuOTM2LDIzLjQ2LDIzLjM5OSwyMi45MjQsMjIuNzM5LDIyLjkyNHogTTI1LjEwNCw5Ljk3NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjI4NS0wLjQyNy0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1NmwtMC4yMjEsMC4xNDdjLTAuNDI4LDAuMjg1LTAuNTQyLDAuODYzLTAuMjU2LDEuMjljMC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTQmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE2LTAuMT'+
			'U2bDAuMjIyLTAuMTQ4QzI1LjI3NCwxMC45ODEsMjUuMzg5LDEwLjQwMywyNS4xMDQsOS45NzZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._fullscreen_off__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._fullscreen_off__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMTYsMTQuODA0SDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxQzMuNjI3LDE1LjM3NywzLjUsMTUuNjg2LDMuNSwxNnY4LjEyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjMxNSwwLjEyNywwLjYyNCwwLjM1LDAuODQ2YzAu'+
			'MjIzLDAuMjI0LDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxSDE2YzAuMzIsMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yMjYtMC4yMjYsMC4zNS0wLjUyNSwwLjM1LTAuODQ2VjE2YzAtMC4zMTQtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMyLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMTQuODA0LDIyLjkyNCYjeGQ7JiN4YTsmI3g5OyYjeDk7SDUuODkzdi01LjcyOGg4LjkxMVYyMi45MjR6IE00LjY5NywxMy45OThjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhjMC0wLjY2LTAuNTM2LTEuMTk1LTEuMTk2LTEuMT'+
			'k1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTV2MC4zMDhDMy41LDEzLjQ2Miw0LjAzNiwxMy45OTgsNC42OTcsMTMuOTk4eiBNNC42OTcsMTAuNDc3YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTdoMCYjeGQ7JiN4YTsmI3g5OyYjeDk7VjkuMDc2YzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZjMC0wLjY2LTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2SDQuNjk3Yy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzUmI3hkOyYjeGE7JiN4OTsmI3g5O0MzLjYyOCw3LjI1NywzLjUsNy41NjQsMy41LDcuODh2MS4zOTlDMy41LDku'+
			'OTQsNC4wMzYsMTAuNDc3LDQuNjk3LDEwLjQ3N3ogTTE5LjI4OSw5LjA3NmgwLjI0MmMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuNTM1LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0MmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlMxOC42MjgsOS4wNzYsMTkuMjg5LDkuMDc2eiBNMTYuMTIyLDYuNjg0aC0wLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2czAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQzYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZTMTYuNzgyLD'+
			'YuNjg0LDE2LjEyMiw2LjY4NHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMjIuNjk4LDkuMDc2aDAuMjQzYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnMtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O1MyMi4wMzgsOS4wNzYsMjIuNjk4LDkuMDc2eiBNOS4wNiw5LjA3NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZTOS45NjIsNi42ODQsOS4zMDIsNi42ODRIOS4wNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2UzguMzk5'+
			'LDkuMDc2LDkuMDYsOS4wNzZ6IE0xMi40NjksOS4wNzZoMC4yNDNjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDNjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZTMTEuODA4LDkuMDc2LDEyLjQ2OSw5LjA3NnogTTI3LjMwNCwxMS4xMTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOCYjeGQ7JiN4YTsmI3'+
			'g5OyYjeDk7QzI4LjUsMTEuNjQ2LDI3Ljk2NCwxMS4xMTEsMjcuMzA0LDExLjExMXogTTI3LjMwNCwxNC42NWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTUuMTg2LDI3Ljk2NCwxNC42NSwyNy4zMDQsMTQuNjV6IE0yNy4zMDQsMjEuNzI4Yy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtoLTAuMjM0Yy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZj'+
			'MCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxLjQzMWMwLjMxNCwwLDAuNjIzLTAuMTI4LDAuODQ2LTAuMzUxJiN4ZDsmI3hhOyYjeDk7JiN4OTtzMC4zNTEtMC41MywwLjM1MS0wLjg0NnYtMS4xOTZDMjguNSwyMi4yNjQsMjcuOTY0LDIxLjcyOCwyNy4zMDQsMjEuNzI4eiBNMjcuMzA0LDE4LjE4OWMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYwLjMwOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTguNzI2LDI3Ljk2NCwxOC4xODksMjcuMzA0LD'+
			'E4LjE4OXogTTI4LjE0OSw3LjAzMyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjIyMy0wLjIyMi0wLjUzMS0wLjM1LTAuODQ2LTAuMzVoLTEuMTk2Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzM3ogTTIxLjg2MywxMy4yNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2wwLjIyMS0wLjE0N2MwLjQyOC0wLjI4NSwwLjU0'+
			'Mi0wLjg2MywwLjI1Ny0xLjI5MWMtMC4yODYtMC40MjgtMC44NjMtMC41NDItMS4yOTEtMC4yNTZsLTAuMjIxLDAuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU3LDEuMjkxYzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRDMjEuNTI0LDEzLjQxOCwyMS43MDQsMTMuMzY3LDIxLjg2MywxMy4yNjF6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE5LjMyOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNS'+
			'wxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIwLjUyNSwyMy40NiwxOS45OSwyMi45MjQsMTkuMzI5LDIyLjkyNHogTTE4LjU4NCwxNS4yNjRjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjljLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU3bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTYsMS4yOTEmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNy45ODksMTUuMTE5LDE4LjI4MywxNS4yNjQsMTguNTg0LDE1LjI2NHog'+
			'TTIyLjczOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZDMjMuOTM2LDIzLjQ2LDIzLjM5OSwyMi45MjQsMjIuNzM5LDIyLjkyNHogTTI1LjEwNCw5Ljk3NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjI4NS0wLjQyNy0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1NmwtMC4yMjEsMC4xNDdjLTAuNDI4LDAuMjg1LTAuNTQyLDAuODYzLTAuMjU2LDEuMjljMC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC'+
			'40MTQmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE2LTAuMTU2bDAuMjIyLTAuMTQ4QzI1LjI3NCwxMC45ODEsMjUuMzg5LDEwLjQwMywyNS4xMDQsOS45NzZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTE2LDE0LjgwNEg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyOC0wLjg0NiwwLjM1MUMzLjYyNywxNS4zNzcsMy41LDE1LjY4Niwz'+
			'LjUsMTZ2OC4xMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC4zMTUsMC4xMjcsMC42MjQsMC4zNSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMwLjMyLDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMjI2LTAuMjI2LDAuMzUtMC41MjUsMC4zNS0wLjg0NlYxNmMwLTAuMzE0LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMiwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTE0LjgwNCwyMi45MjQmI3hkOyYjeGE7JiN4OTsmI3g5O0g1Ljg5M3YtNS43MjhoOC45MTFWMjIuOTI0eiBNNC42OTcsMTMuOTk4YzAuNj'+
			'YxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4YzAtMC42Ni0wLjUzNi0xLjE5NS0xLjE5Ni0xLjE5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk1djAuMzA4QzMuNSwxMy40NjIsNC4wMzYsMTMuOTk4LDQuNjk3LDEzLjk5OHogTTQuNjk3LDEwLjQ3N2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk3aDAmI3hkOyYjeGE7JiN4OTsmI3g5O1Y5LjA3NmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2YzAtMC42Ni0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5Nkg0LjY5N2MtMC4zMTUsMC0wLjYyMywwLjEyNy0wLjg0NiwwLjM1'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMy42MjgsNy4yNTcsMy41LDcuNTY0LDMuNSw3Ljg4djEuMzk5QzMuNSw5Ljk0LDQuMDM2LDEwLjQ3Nyw0LjY5NywxMC40Nzd6IE0xOS4yODksOS4wNzZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjUzNS0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDJjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZTMTguNjI4LDkuMDc2LDE5LjI4OSw5LjA3NnogTTE2LjEyMiw2LjY4NGgtMC4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnMwLjUzNi'+
			'wxLjE5NiwxLjE5NiwxLjE5NmgwLjI0M2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2UzE2Ljc4Miw2LjY4NCwxNi4xMjIsNi42ODR6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTIyLjY5OCw5LjA3NmgwLjI0M2MwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZzLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0M2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtTMjIuMDM4LDkuMDc2LDIyLjY5OCw5LjA3NnogTTkuMDYsOS4wNzZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2UzkuOTYyLDYuNjg0LDkuMzAyLDYuNjg0'+
			'SDkuMDYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlM4LjM5OSw5LjA3Niw5LjA2LDkuMDc2eiBNMTIuNDY5LDkuMDc2aDAuMjQzYzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2UzExLjgwOCw5LjA3NiwxMi40NjksOS4wNzZ6IE0yNy4zMDQsMTEuMTExJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMT'+
			'k2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOC41LDExLjY0NiwyNy45NjQsMTEuMTExLDI3LjMwNCwxMS4xMTF6IE0yNy4zMDQsMTQuNjVjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE1LjE4NiwyNy45NjQsMTQuNjUsMjcuMzA0LDE0LjY1eiBNMjcuMzA0LDIxLjcyOGMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5Niwx'+
			'LjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7aC0wLjIzNGMtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMS40MzFjMC4zMTQsMCwwLjYyMy0wLjEyOCwwLjg0Ni0wLjM1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7czAuMzUxLTAuNTMsMC4zNTEtMC44NDZ2LTEuMTk2QzI4LjUsMjIuMjY0LDI3Ljk2NCwyMS43MjgsMjcuMzA0LDIxLjcyOHogTTI3LjMwNCwxOC4xODljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MC4zMDgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLD'+
			'EuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE4LjcyNiwyNy45NjQsMTguMTg5LDI3LjMwNCwxOC4xODl6IE0yOC4xNDksNy4wMzMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4yMjMtMC4yMjItMC41MzEtMC4zNS0wLjg0Ni0wLjM1aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWNy44OEMyOC41LDcuNTY0LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzN6'+
			'IE0yMS44NjMsMTMuMjYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMC4yMjEtMC4xNDdjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOTFjLTAuMjg2LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU2bC0wLjIyMSwwLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0QzIxLjUyNCwxMy40MTgsMjEuNzA0LDEzLjM2NywyMS44NjMsMTMuMjYxeiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xOS4zMjksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5Ni'+
			'wxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQyYzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMC41MjUsMjMuNDYsMTkuOTksMjIuOTI0LDE5LjMyOSwyMi45MjR6IE0xOC41ODQsMTUuMjY0YzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5Yy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1N2wtMC4yMjIsMC4xNDdjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU2LDEuMjkx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTcuOTg5LDE1LjExOSwxOC4yODMsMTUuMjY0LDE4LjU4NCwxNS4yNjR6IE0yMi43MzksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzIzLjkzNiwyMy40NiwyMy4zOTksMjIuOTI0LDIyLjczOSwyMi45MjR6IE0yNS4xMDQsOS45NzYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4yODUtMC40MjctMC44NjMtMC41NDItMS4yOTEtMC4yNTZsLTAuMjIxLDAuMTQ3Yy0wLj'+
			'QyOCwwLjI4NS0wLjU0MiwwLjg2My0wLjI1NiwxLjI5YzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNi0wLjE1NmwwLjIyMi0wLjE0OEMyNS4yNzQsMTAuOTgxLDI1LjM4OSwxMC40MDMsMjUuMTA0LDkuOTc2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._fullscreen_off__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="fullscreen_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_off.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._fullscreen_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._fullscreen_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._fullscreen_off.style[domTransition]='opacity 500ms ease 0ms';
				if (me._fullscreen_off.ggCurrentLogicStateAlpha == 0) {
					me._fullscreen_off.style.visibility=me._fullscreen_off.ggVisible?'inherit':'hidden';
					me._fullscreen_off.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._fullscreen_off.style.opacity == 0.0) { me._fullscreen_off.style.visibility="hidden"; } }, 505);
					me._fullscreen_off.style.opacity=0;
				}
			}
		}
		me._fullscreen_off.onmouseover=function (e) {
			me._fullscreen_off__img.style.visibility='hidden';
			me._fullscreen_off__imgo.style.visibility='inherit';
		}
		me._fullscreen_off.onmouseout=function (e) {
			me._fullscreen_off__img.style.visibility='inherit';
			me._fullscreen_off__imgo.style.visibility='hidden';
		}
		me._fullscreen_off.ggUpdatePosition=function (useTransition) {
		}
		me._fullscreen_buttons.appendChild(me._fullscreen_off);
		el=me._tt_fullscreen=document.createElement('div');
		els=me._tt_fullscreen__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_fullscreen";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_fullscreen.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_fullscreen.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_fullscreen.style.top='-25px';
					me._tt_fullscreen.ggUpdatePosition(true);
				}
				else {
					me._tt_fullscreen.ggDx=0;
					me._tt_fullscreen.style.top='32px';
					me._tt_fullscreen.ggUpdatePosition(true);
				}
			}
		}
		me._tt_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['fullscreen_buttons'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._tt_fullscreen.style.visibility=(Number(me._tt_fullscreen.style.opacity)>0||!me._tt_fullscreen.style.opacity)?'inherit':'hidden';
					me._tt_fullscreen.ggVisible=true;
				}
				else {
					me._tt_fullscreen.style.visibility="hidden";
					me._tt_fullscreen.ggVisible=false;
				}
			}
		}
		me._tt_fullscreen.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getIsFullscreen() == false))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_fullscreen.ggCurrentLogicStateText = newLogicStateText;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStateText == 0) {
					me._tt_fullscreen.ggText="\u9000\u51fa\u5168\u5c4f";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="\u9000\u51fa\u5168\u5c4f";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
				else if (me._tt_fullscreen.ggCurrentLogicStateText == 1) {
					me._tt_fullscreen.ggText="\u5168\u5c4f";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="\u5168\u5c4f";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
				else {
					me._tt_fullscreen.ggText="";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_fullscreen.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._fullscreen_buttons.appendChild(me._tt_fullscreen);
		me._controller_slider.appendChild(me._fullscreen_buttons);
		el=me._gyro=document.createElement('div');
		el.ggId="gyro";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 192px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_gyro') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else if (
				((player.getVariableValue('pos_gyro') == 6))
			)
			{
				newLogicStatePosition = 6;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._gyro.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._gyro.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._gyro.style[domTransition]='left 0s, top 0s';
				if (me._gyro.ggCurrentLogicStatePosition == 0) {
					me._gyro.style.left='0px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 1) {
					me._gyro.style.left='32px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 2) {
					me._gyro.style.left='64px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 3) {
					me._gyro.style.left='96px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 4) {
					me._gyro.style.left='128px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 5) {
					me._gyro.style.left='160px';
					me._gyro.style.top='0px';
				}
				else if (me._gyro.ggCurrentLogicStatePosition == 6) {
					me._gyro.style.left='192px';
					me._gyro.style.top='0px';
				}
				else {
					me._gyro.style.left='192px';
					me._gyro.style.top='0px';
				}
			}
		}
		me._gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_gyro') == true)) && 
				((player.getGyroAvailable() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._gyro.style[domTransition]='left 0s, top 0s';
				if (me._gyro.ggCurrentLogicStateVisible == 0) {
					me._gyro.style.visibility=(Number(me._gyro.style.opacity)>0||!me._gyro.style.opacity)?'inherit':'hidden';
					me._gyro.ggVisible=true;
				}
				else {
					me._gyro.style.visibility="hidden";
					me._gyro.ggVisible=false;
				}
			}
		}
		me._gyro.onclick=function (e) {
			player.stopAutorotate();
			player.setUseGyro(!(player.getUseGyro()));
		}
		me._gyro.onmouseover=function (e) {
			me.elementMouseOver['gyro']=true;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.onmouseout=function (e) {
			me.elementMouseOver['gyro']=false;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.ontouchend=function (e) {
			me.elementMouseOver['gyro']=false;
			me._tt_gyro.logicBlock_visible();
		}
		me._gyro.ggUpdatePosition=function (useTransition) {
		}
		el=me._gyro_on=document.createElement('div');
		els=me._gyro_on__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjAvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMCIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cD'+
			'ovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNTA2LjY2NyAtMjYwNiAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzUwNi42Njcg'+
			'LTI2MDYgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiLz4KIDxnIGlkPSJFYmVuZV8xIj4KICA8Zz4KICAgPGcgb3BhY2l0eT0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDkyLjA4MS0yNTkwLjM1YzAuMTcyLDAuNTAyLDAuNjQyLDAuODE3LDEuMTQ1LDAuODE3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMTMsMCwwLjI2Mi0wLjAyMSwwLjM5Mi0wLjA2NWMwLjYzMi0wLjIxNiwwLjk2OS0wLjkwNCwwLjc1Mi0xLjUzN2wtMi4wODMtNi4wOGMtMC4yMTYtMC42MzEtMC45MDYtMC45NjYtMS41MzYtMC43NTImI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjLTAuNjMzLDAuMjE2LTAuOTY5LDAuOTA0LTAuNzUzLDEuNTM2TC0zNDkyLjA4MS0yNTkwLjM1eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDkwLjY2Ny0yNjAyLjVjLTYuODkyLDAtMTIuNDk5LDUuNjA3LTEyLjQ5OSwxMi41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czUuNjA3LDEyLjUsMTIuNDk5LDEyLjVzMTIuNS01LjYwNywxMi41LTEyLjVTLTM0ODMuNzc1LTI2MDIuNS0zNDkwLjY2Ny0yNjAyLjV6IE0tMzQ5MC42NjctMjU3OS45MTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7'+
			'JiN4OTtjLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDgxYzAtNS41NTksNC41MjItMTAuMDgsMTAuMDgtMTAuMDhjNS41NTksMCwxMC4wODEsNC41MjEsMTAuMDgxLDEwLjA4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zNDgwLjU4Ni0yNTg0LjQ0MS0zNDg1LjEwOC0yNTc5LjkxOS0zNDkwLjY2Ny0yNTc5LjkxOXoiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0tMzQ4Mi40NDEtMjU5Mi45NTdjLTAuNjcyLTEuOTYxLTIuODQ3LTMuMTMyLTUuODE3LTMuMTMyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5Oy'+
			'YjeDk7Yy0wLjc2NCwwLTEuNTYyLDAuMDg5LTIuMzY1LDAuMjQ2bDAuNzkyLDIuMzExYzAuNTM2LTAuMDg4LDEuMDY1LTAuMTM4LDEuNTczLTAuMTM4YzEuODMyLDAsMy4yMTYsMC41ODgsMy41MjgsMS40OTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC40NzYsMS4zODctMS40NDksMy43NzYtNC45NzEsNC45ODNjLTEuMTY0LDAuMzk4LTIuMzU5LDAuNjEtMy40NTYsMC42MWMtMS44MzIsMC0zLjIxNi0wLjU4OC0zLjUyOC0xLjQ5NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4zODYtMS4xMjksMC44MTEtMi45MTcsMy4xNjMtNC4xOTVsLTAuNzkxLTIuMzA5Yy0zLjUz'+
			'LDEuNzkyLTUuNTI1LDQuNzY0LTQuNjYxLDcuMjg4YzAuNjcyLDEuOTYxLDIuODQ3LDMuMTMyLDUuODE3LDMuMTMyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuOTg1LDAsMi4wMjUtMC4xMzgsMy4wNjEtMC4zOTZsMC41OTgsMS43NDNjMC4xNzIsMC41MDIsMC42NDIsMC44MTgsMS4xNDUsMC44MThjMC4xMywwLDAuMjYzLTAuMDIxLDAuMzkzLTAuMDY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNjMxLTAuMjE3LDAuOTY5LTAuOTA0LDAuNzUxLTEuNTM3bC0wLjU5Ny0xLjc0MUMtMzQ4My44NDMtMjU4Ny4wNzctMzQ4MS41MjItMjU5MC4yNzEtMzQ4Mi40NDEtMjU5Mi'+
			'45NTd6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBkPSJNLTM0OTIuMDgxLTI1OTAuMzVjMC4xNzIsMC41MDIsMC42NDIsMC44MTcsMS4xNDUsMC44MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4xMywwLDAuMjYyLTAuMDIxLDAuMzkyLTAuMDY1YzAuNjMyLTAuMjE2LDAuOTY5LTAuOTA0LDAuNzUyLTEuNTM3bC0yLjA4My02LjA4Yy0wLjIxNi0wLjYzMS0wLjkwNi0wLjk2Ni0xLjUzNi0wLjc1MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42MzMsMC4yMTYtMC45Njks'+
			'MC45MDQtMC43NTMsMS41MzZMLTM0OTIuMDgxLTI1OTAuMzV6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ5MC42NjctMjYwMi41Yy02Ljg5MiwwLTEyLjQ5OSw1LjYwNy0xMi40OTksMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O3M1LjYwNywxMi41LDEyLjQ5OSwxMi41czEyLjUtNS42MDcsMTIuNS0xMi41Uy0zNDgzLjc3NS0yNjAyLjUtMzQ5MC42NjctMjYwMi41eiBNLTM0OTAuNjY3LTI1NzkuOTE5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy01LjU1OC'+
			'wwLTEwLjA4LTQuNTIxLTEwLjA4LTEwLjA4MWMwLTUuNTU5LDQuNTIyLTEwLjA4LDEwLjA4LTEwLjA4YzUuNTU5LDAsMTAuMDgxLDQuNTIxLDEwLjA4MSwxMC4wOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzQ4MC41ODYtMjU4NC40NDEtMzQ4NS4xMDgtMjU3OS45MTktMzQ5MC42NjctMjU3OS45MTl6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ4Mi40NDEtMjU5Mi45NTdjLTAuNjcyLTEuOTYxLTIuODQ3LTMuMTMyLTUuODE3LTMuMTMyJiN4ZDsmI3hhOyYjeDk7JiN4'+
			'OTsmI3g5OyYjeDk7Yy0wLjc2NCwwLTEuNTYyLDAuMDg5LTIuMzY1LDAuMjQ2bDAuNzkyLDIuMzExYzAuNTM2LTAuMDg4LDEuMDY1LTAuMTM4LDEuNTczLTAuMTM4YzEuODMyLDAsMy4yMTYsMC41ODgsMy41MjgsMS40OTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC40NzYsMS4zODctMS40NDksMy43NzYtNC45NzEsNC45ODNjLTEuMTY0LDAuMzk4LTIuMzU5LDAuNjEtMy40NTYsMC42MWMtMS44MzIsMC0zLjIxNi0wLjU4OC0zLjUyOC0xLjQ5NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4zODYtMS4xMjksMC44MTEtMi45MTcsMy4xNjMtNC4xOTVsLTAuNzkxLTIuMz'+
			'A5Yy0zLjUzLDEuNzkyLTUuNTI1LDQuNzY0LTQuNjYxLDcuMjg4YzAuNjcyLDEuOTYxLDIuODQ3LDMuMTMyLDUuODE3LDMuMTMyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuOTg1LDAsMi4wMjUtMC4xMzgsMy4wNjEtMC4zOTZsMC41OTgsMS43NDNjMC4xNzIsMC41MDIsMC42NDIsMC44MTgsMS4xNDUsMC44MThjMC4xMywwLDAuMjYzLTAuMDIxLDAuMzkzLTAuMDY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNjMxLTAuMjE3LDAuOTY5LTAuOTA0LDAuNzUxLTEuNTM3bC0wLjU5Ny0xLjc0MUMtMzQ4My44NDMtMjU4Ny4wNzctMzQ4MS41MjItMjU5MC4yNzEtMzQ4Mi40'+
			'NDEtMjU5Mi45NTd6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiIvPgo8L3N2Zz4K';
		me._gyro_on__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._gyro_on__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjAvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMCIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cD'+
			'ovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNTA2LjY2NyAtMjU3MS4zMzMgMzIgMzIiIGhlaWdodD0iMzJweCIgeG1sbnM6Z3JhcGg9Imh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTM1MDYu'+
			'NjY3IC0yNTcxLjMzMyAzMiAzMiI+CiA8ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiPgogIDxnPgogICA8ZyBvcGFjaXR5PSIwLjQiPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTM0OTIuMjIzLTI1NTUuNzE4YzAuMTg5LDAuNTUyLDAuNzA2LDAuODk5LDEuMjU5LDAuODk5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMTQzLDAsMC4yODktMC4wMjMsMC40MzEtMC4wNzJjMC42OTYtMC4yMzgsMS4wNjUtMC45OTUsMC44MjgtMS42OWwtMi4yOTEtNi42ODhjLTAuMjM4LTAuNjk0LTAuOTk3LTEuMDYzLTEuNjg5LTAuODI3JiN4ZDsmI3'+
			'hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY5NiwwLjIzOC0xLjA2NSwwLjk5NC0wLjgyOCwxLjY4OUwtMzQ5Mi4yMjMtMjU1NS43MTh6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTM0OTAuNjY3LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc0OSw2LjE2OC0xMy43NDksMTMuNzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCw3LjU4Miw2LjE2OCwxMy43NSwxMy43NDksMTMuNzVjNy41ODIsMCwxMy43NS02LjE2NywxMy43NS0xMy43NUMtMzQ3Ni45MTctMjU2Mi45MTYtMzQ4My4wODUtMjU2OS4wODMtMzQ5MC42'+
			'NjctMjU2OS4wODN6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7IE0tMzQ5MC42NjctMjU0NC4yNDVjLTYuMTEzLDAtMTEuMDg3LTQuOTc0LTExLjA4Ny0xMS4wODljMC02LjExNCw0Ljk3NC0xMS4wODgsMTEuMDg3LTExLjA4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M2LjExNCwwLDExLjA4OSw0Ljk3NCwxMS4wODksMTEuMDg4Qy0zNDc5LjU3OC0yNTQ5LjIxOS0zNDg0LjU1My0yNTQ0LjI0NS0zNDkwLjY2Ny0yNTQ0LjI0NXoiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0tMzQ4MS42MTktMjU1OC41OD'+
			'ZjLTAuNzQtMi4xNTgtMy4xMzItMy40NDYtNi4zOTktMy40NDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuODQsMC0xLjcxOCwwLjA5OC0yLjYwMSwwLjI3bDAuODcxLDIuNTQyYzAuNTktMC4wOTcsMS4xNzItMC4xNTEsMS43My0wLjE1MWMyLjAxNSwwLDMuNTM4LDAuNjQ3LDMuODgxLDEuNjQ3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNTIzLDEuNTI2LTEuNTk0LDQuMTU0LTUuNDY4LDUuNDgxYy0xLjI4LDAuNDM4LTIuNTk1LDAuNjcxLTMuODAxLDAuNjcxYy0yLjAxNSwwLTMuNTM4LTAuNjQ3LTMuODgtMS42NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4'+
			'OTtjLTAuNDI1LTEuMjQyLDAuODkyLTMuMjA4LDMuNDc5LTQuNjE1bC0wLjg3LTIuNTRjLTMuODgzLDEuOTcxLTYuMDc3LDUuMjQtNS4xMjcsOC4wMTdjMC43MzksMi4xNTcsMy4xMzIsMy40NDUsNi4zOTgsMy40NDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMS4wODMsMCwyLjIyOC0wLjE1MiwzLjM2Ny0wLjQzNmwwLjY1NywxLjkxN2MwLjE5LDAuNTUzLDAuNzA2LDAuODk5LDEuMjU5LDAuODk5YzAuMTQzLDAsMC4yODktMC4wMjMsMC40MzItMC4wNzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC42OTQtMC4yMzksMS4wNjYtMC45OTUsMC44MjctMS42OWwtMC42NTYtMS'+
			'45MTVDLTM0ODMuMTYxLTI1NTIuMTE4LTM0ODAuNjA3LTI1NTUuNjMxLTM0ODEuNjE5LTI1NTguNTg2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDkyLjIyMy0yNTU1LjcxOGMwLjE4OSwwLjU1MiwwLjcwNiwwLjg5OSwxLjI1OSwwLjg5OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjE0MywwLDAuMjg5LTAuMDIzLDAuNDMxLTAuMDcyYzAuNjk2LTAuMjM4LDEuMDY1LTAuOTk1LDAuODI4LTEuNjlsLTIuMjkxLTYuNjg4Yy0wLjIzOC0wLjY5NC0wLjk5Ny0xLjA2My0xLjY4'+
			'OS0wLjgyNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42OTYsMC4yMzgtMS4wNjUsMC45OTQtMC44MjgsMS42ODlMLTM0OTIuMjIzLTI1NTUuNzE4eiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBkPSJNLTM0OTAuNjY3LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc0OSw2LjE2OC0xMy43NDksMTMuNzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCw3LjU4Miw2LjE2OCwxMy43NSwxMy43NDksMTMuNzVjNy41ODIsMCwxMy43NS02LjE2NywxMy43NS0xMy43NUMtMzQ3Ni45MT'+
			'ctMjU2Mi45MTYtMzQ4My4wODUtMjU2OS4wODMtMzQ5MC42NjctMjU2OS4wODN6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7IE0tMzQ5MC42NjctMjU0NC4yNDVjLTYuMTEzLDAtMTEuMDg3LTQuOTc0LTExLjA4Ny0xMS4wODljMC02LjExNCw0Ljk3NC0xMS4wODgsMTEuMDg3LTExLjA4OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M2LjExNCwwLDExLjA4OSw0Ljk3NCwxMS4wODksMTEuMDg4Qy0zNDc5LjU3OC0yNTQ5LjIxOS0zNDg0LjU1My0yNTQ0LjI0NS0zNDkwLjY2Ny0yNTQ0LjI0NXoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgIDxwYXRo'+
			'IHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDgxLjYxOS0yNTU4LjU4NmMtMC43NC0yLjE1OC0zLjEzMi0zLjQ0Ni02LjM5OS0zLjQ0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC44NCwwLTEuNzE4LDAuMDk4LTIuNjAxLDAuMjdsMC44NzEsMi41NDJjMC41OS0wLjA5NywxLjE3Mi0wLjE1MSwxLjczLTAuMTUxYzIuMDE1LDAsMy41MzgsMC42NDcsMy44ODEsMS42NDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC41MjMsMS41MjYtMS41OTQsNC4xNTQtNS40NjgsNS40ODFjLTEuMjgsMC40MzgtMi41OTUsMC42NzEtMy44MDEsMC42NzFjLTIuMD'+
			'E1LDAtMy41MzgtMC42NDctMy44OC0xLjY0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC40MjUtMS4yNDIsMC44OTItMy4yMDgsMy40NzktNC42MTVsLTAuODctMi41NGMtMy44ODMsMS45NzEtNi4wNzcsNS4yNC01LjEyNyw4LjAxN2MwLjczOSwyLjE1NywzLjEzMiwzLjQ0NSw2LjM5OCwzLjQ0NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MxLjA4MywwLDIuMjI4LTAuMTUyLDMuMzY3LTAuNDM2bDAuNjU3LDEuOTE3YzAuMTksMC41NTMsMC43MDYsMC44OTksMS4yNTksMC44OTljMC4xNDMsMCwwLjI4OS0wLjAyMywwLjQzMi0wLjA3MiYjeGQ7JiN4YTsmI3g5OyYjeDk7'+
			'JiN4OTsmI3g5O2MwLjY5NC0wLjIzOSwxLjA2Ni0wLjk5NSwwLjgyNy0xLjY5bC0wLjY1Ni0xLjkxNUMtMzQ4My4xNjEtMjU1Mi4xMTgtMzQ4MC42MDctMjU1NS42MzEtMzQ4MS42MTktMjU1OC41ODZ6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiIvPgo8L3N2Zz4K';
		me._gyro_on__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="gyro_on";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_on.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_on.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_on.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_on.style[domTransition]='opacity 500ms ease 0ms';
				if (me._gyro_on.ggCurrentLogicStateAlpha == 0) {
					me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
					me._gyro_on.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._gyro_on.style.opacity == 0.0) { me._gyro_on.style.visibility="hidden"; } }, 505);
					me._gyro_on.style.opacity=0;
				}
			}
		}
		me._gyro_on.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._gyro_on.style[domTransition]='none';
			} else {
				me._gyro_on.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_on.style.opacity='0';
			me._gyro_on.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._gyro_off.style[domTransition]='none';
			} else {
				me._gyro_off.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_off.style.opacity='1';
			me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
			me.__360image_gyro.ggTimeout=Number("4") * 1000.0;
			me.__360image_gyro.ggTimestamp=skin.ggCurrentTime;
			me.__360image_timer.ggTimeout=Number("0.4") * 1000.0;
			me.__360image_timer.ggTimestamp=skin.ggCurrentTime;
		}
		me._gyro_on.onmouseover=function (e) {
			me._gyro_on__img.style.visibility='hidden';
			me._gyro_on__imgo.style.visibility='inherit';
		}
		me._gyro_on.onmouseout=function (e) {
			me._gyro_on__img.style.visibility='inherit';
			me._gyro_on__imgo.style.visibility='hidden';
		}
		me._gyro_on.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_on);
		el=me._gyro_off=document.createElement('div');
		els=me._gyro_off__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjAvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMCIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cD'+
			'ovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNDY5LjI1IC0yNjA2IDMyIDMyIiBoZWlnaHQ9IjMycHgiIHhtbG5zOmdyYXBoPSJodHRwOi8vbnMuYWRvYmUuY29tL0dyYXBocy8xLjAvIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zNDY5LjI1IC0y'+
			'NjA2IDMyIDMyIj4KIDxnIGlkPSJMYXllcl8xIj4KICA8Zz4KICAgPGcgb3BhY2l0eT0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDU0LjYwNi0yNTkwLjI4M2MwLjE3LDAuNDk4LDAuNjM2LDAuODEsMS4xMzQsMC44MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjEyOCwwLDAuMjYtMC4wMjEsMC4zODktMC4wNjVjMC42MjYtMC4yMTUsMC45NTktMC44OTYsMC43NDUtMS41MjJsLTIuMDY0LTYuMDIzYy0wLjIxNC0wLjYyNi0wLjg5NC0wLjk1OC0xLjUyMi0wLjc0NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42MjYsMC'+
			'4yMTUtMC45NTksMC44OTYtMC43NDUsMS41MjFMLTM0NTQuNjA2LTI1OTAuMjgzeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDUzLjI1LTI2MDIuNDk5Yy02Ljg5MiwwLTEyLjUsNS42MDctMTIuNSwxMi40OTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCw2Ljg5Myw1LjYwNywxMi41LDEyLjUsMTIuNXMxMi41LTUuNjA3LDEyLjUtMTIuNUMtMzQ0MC43NS0yNTk2Ljg5Mi0zNDQ2LjM1Ny0yNjAyLjQ5OS0zNDUzLjI1LTI2MDIuNDk5eiBNLTM0NTMuMjUtMjU4MC4xMzEmI3hkOyYjeGE7JiN4OTsmI3g5OyYj'+
			'eDk7JiN4OTtjLTUuNDQyLDAtOS44Ny00LjQyNy05Ljg3LTkuODY5czQuNDI4LTkuODY5LDkuODctOS44NjlzOS44Nyw0LjQyOCw5Ljg3LDkuODY5Uy0zNDQ3LjgwNy0yNTgwLjEzMS0zNDUzLjI1LTI1ODAuMTMxeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDQ4Ljc0OS0yNTg1LjQ2MWwtMS44NzktMC45NDFsMC45NDEtMS44NzgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4yMjktMC40NiwwLjA0My0xLjAxOS0wLjQxNS0xLjI0OWMtMC40NTktMC4yMjktMS4wMi0wLjA0My0xLjI0OSwwLjQxNmwtMC45NC'+
			'wxLjg3N2wtMS44NzgtMC45NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC40Ni0wLjIyOS0xLjAxOS0wLjA0NC0xLjI1LDAuNDE2Yy0wLjIyOSwwLjQ2LTAuMDQyLDEuMDIsMC40MTYsMS4yNDlsMS44NzgsMC45NGwtMC45NDEsMS44NzgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI5LDAuNDU4LTAuMDQzLDEuMDE4LDAuNDE1LDEuMjQ4YzAuMjMsMC4xMTUsMC40ODYsMC4xMjUsMC43MTEsMC4wNWMwLjIyNS0wLjA3NSwwLjQyNC0wLjIzNiwwLjUzOS0wLjQ2NWwwLjk0LTEuODc4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7bDEuODc4LDAuOTQxYzAuMjI5'+
			'LDAuMTE2LDAuNDgzLDAuMTI2LDAuNzA4LDAuMDUxYzAuMjI2LTAuMDc1LDAuNDI1LTAuMjM3LDAuNTQtMC40NjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM0NDguMTA0LTI1ODQuNjcyLTM0NDguMjktMjU4NS4yMzItMzQ0OC43NDktMjU4NS40NjF6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTM0NTUuMzMyLTI1ODUuODU2Yy0wLjI5Ni0wLjE0OC0wLjUyNi0wLjM3Ni0wLjY4NC0wLjY0MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMS42NDEtMC4wNjktMi44NjYtMC42MjYtMy4xNTMtMS40Nj'+
			'ljLTAuMjIyLTAuNjQ3LDAuMDktMS41MTgsMC44NTQtMi4zODhjMC41NzctMC42NTgsMS4zNzUtMS4yNjgsMi4zLTEuNzczbC0wLjc4NC0yLjI5MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMS4zMjUsMC42NjktMi40NzIsMS41MTgtMy4zMTgsMi40ODJjLTEuMzY2LDEuNTU3LTEuODM1LDMuMjQyLTEuMzIsNC43NDZjMC42NjUsMS45NDIsMi44MiwzLjEwMiw1Ljc2MiwzLjEwMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjMzMSwwLDAuNjY4LTAuMDE2LDEuMDA5LTAuMDQ2bDAuNTU3LTEuMTA5TC0zNDU1LjMzMi0yNTg1Ljg1NnoiIHN0cm9rZS13aWR0aD0iMS41Ii8+'+
			'CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0tMzQ0NS4wNTgtMjU5Mi44MDJjLTAuNjY2LTEuOTQzLTIuODItMy4xMDMtNS43NjItMy4xMDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNzUxLDAtMS41MzQsMC4wODYtMi4zMjIsMC4yMzlsMC43ODYsMi4yOTFjMC41MjQtMC4wODUsMS4wNDItMC4xMzQsMS41MzctMC4xMzRjMS44MTUsMCwzLjE4NywwLjU4MywzLjQ5NSwxLjQ4NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjIyMiwwLjY0Ni0wLjA5LDEuNTE2LTAuODU0LDIuMzg2Yy0wLjIwNiwwLjIzNS0wLjQ0NCwwLjQ2Mi0wLjcwMi'+
			'wwLjY4MmMwLjA1NCwwLjMzMiwwLjAxMiwwLjY4My0wLjE1LDEuMDA1bC0wLjYxMiwxLjIyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2wxLjA1NywwLjUyOWMwLjg1OC0wLjU0NiwxLjYwOC0xLjE3NCwyLjIwOC0xLjg1N0MtMzQ0NS4wMTItMjU4OS42MTQtMzQ0NC41NDMtMjU5MS4yOTktMzQ0NS4wNTgtMjU5Mi44MDJ6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBkPSJNLTM0NTQuNjA2LTI1OTAuMjgzYzAuMTcsMC40OTgsMC42MzYsMC44MSwxLjEzNCwwLjgxJiN4ZDsmI3hhOyYjeDk7'+
			'JiN4OTsmI3g5OyYjeDk7YzAuMTI4LDAsMC4yNi0wLjAyMSwwLjM4OS0wLjA2NWMwLjYyNi0wLjIxNSwwLjk1OS0wLjg5NiwwLjc0NS0xLjUyMmwtMi4wNjQtNi4wMjNjLTAuMjE0LTAuNjI2LTAuODk0LTAuOTU4LTEuNTIyLTAuNzQ1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjYyNiwwLjIxNS0wLjk1OSwwLjg5Ni0wLjc0NSwxLjUyMUwtMzQ1NC42MDYtMjU5MC4yODN6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ1My4yNS0yNjAyLjQ5OWMtNi44OTIsMC0xMi41LD'+
			'UuNjA3LTEyLjUsMTIuNDk5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsNi44OTMsNS42MDcsMTIuNSwxMi41LDEyLjVzMTIuNS01LjYwNywxMi41LTEyLjVDLTM0NDAuNzUtMjU5Ni44OTItMzQ0Ni4zNTctMjYwMi40OTktMzQ1My4yNS0yNjAyLjQ5OXogTS0zNDUzLjI1LTI1ODAuMTMxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy01LjQ0MiwwLTkuODctNC40MjctOS44Ny05Ljg2OXM0LjQyOC05Ljg2OSw5Ljg3LTkuODY5czkuODcsNC40MjgsOS44Nyw5Ljg2OVMtMzQ0Ny44MDctMjU4MC4xMzEtMzQ1My4yNS0yNTgwLjEzMXoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tl'+
			'LXdpZHRoPSIwLjIiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDQ4Ljc0OS0yNTg1LjQ2MWwtMS44NzktMC45NDFsMC45NDEtMS44NzgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4yMjktMC40NiwwLjA0My0xLjAxOS0wLjQxNS0xLjI0OWMtMC40NTktMC4yMjktMS4wMi0wLjA0My0xLjI0OSwwLjQxNmwtMC45NCwxLjg3N2wtMS44NzgtMC45NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC40Ni0wLjIyOS0xLjAxOS0wLjA0NC0xLjI1LDAuNDE2Yy0wLjIyOSwwLjQ2LTAuMDQyLDEuMDIsMC40MTYsMS4yNDlsMS44NzgsMC'+
			'45NGwtMC45NDEsMS44NzgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMjI5LDAuNDU4LTAuMDQzLDEuMDE4LDAuNDE1LDEuMjQ4YzAuMjMsMC4xMTUsMC40ODYsMC4xMjUsMC43MTEsMC4wNWMwLjIyNS0wLjA3NSwwLjQyNC0wLjIzNiwwLjUzOS0wLjQ2NWwwLjk0LTEuODc4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7bDEuODc4LDAuOTQxYzAuMjI5LDAuMTE2LDAuNDgzLDAuMTI2LDAuNzA4LDAuMDUxYzAuMjI2LTAuMDc1LDAuNDI1LTAuMjM3LDAuNTQtMC40NjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM0NDguMTA0LTI1ODQuNjcyLTM0NDguMjktMjU4'+
			'NS4yMzItMzQ0OC43NDktMjU4NS40NjF6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ1NS4zMzItMjU4NS44NTZjLTAuMjk2LTAuMTQ4LTAuNTI2LTAuMzc2LTAuNjg0LTAuNjQyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjY0MS0wLjA2OS0yLjg2Ni0wLjYyNi0zLjE1My0xLjQ2OWMtMC4yMjItMC42NDcsMC4wOS0xLjUxOCwwLjg1NC0yLjM4OGMwLjU3Ny0wLjY1OCwxLjM3NS0xLjI2OCwyLjMtMS43NzNsLTAuNzg0LTIuMjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3'+
			'g5OyYjeDk7Yy0xLjMyNSwwLjY2OS0yLjQ3MiwxLjUxOC0zLjMxOCwyLjQ4MmMtMS4zNjYsMS41NTctMS44MzUsMy4yNDItMS4zMiw0Ljc0NmMwLjY2NSwxLjk0MiwyLjgyLDMuMTAyLDUuNzYyLDMuMTAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMzMxLDAsMC42NjgtMC4wMTYsMS4wMDktMC4wNDZsMC41NTctMS4xMDlMLTM0NTUuMzMyLTI1ODUuODU2eiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBkPSJNLTM0NDUuMDU4LTI1OTIuODAyYy0wLjY2Ni0xLjk0My0yLjgyLTMuMTAz'+
			'LTUuNzYyLTMuMTAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjc1MSwwLTEuNTM0LDAuMDg2LTIuMzIyLDAuMjM5bDAuNzg2LDIuMjkxYzAuNTI0LTAuMDg1LDEuMDQyLTAuMTM0LDEuNTM3LTAuMTM0YzEuODE1LDAsMy4xODcsMC41ODMsMy40OTUsMS40ODQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4yMjIsMC42NDYtMC4wOSwxLjUxNi0wLjg1NCwyLjM4NmMtMC4yMDYsMC4yMzUtMC40NDQsMC40NjItMC43MDIsMC42ODJjMC4wNTQsMC4zMzIsMC4wMTIsMC42ODMtMC4xNSwxLjAwNWwtMC42MTIsMS4yMjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsMS'+
			'4wNTcsMC41MjljMC44NTgtMC41NDYsMS42MDgtMS4xNzQsMi4yMDgtMS44NTdDLTM0NDUuMDEyLTI1ODkuNjE0LTM0NDQuNTQzLTI1OTEuMjk5LTM0NDUuMDU4LTI1OTIuODAyeiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIi8+Cjwvc3ZnPgo=';
		me._gyro_off__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._gyro_off__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjAvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMCIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6eD0iaHR0cD'+
			'ovL25zLmFkb2JlLmNvbS9FeHRlbnNpYmlsaXR5LzEuMC8iIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zNDY5LjI1IC0yNTcxLjMzMyAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzQ2OS4y'+
			'NSAtMjU3MS4zMzMgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnPgogICA8ZyBvcGFjaXR5PSIwLjQiPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTM0NTQuNzQyLTI1NTUuNjQ1YzAuMTg4LDAuNTQ3LDAuNywwLjg5MSwxLjI0OCwwLjg5MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjE0MSwwLDAuMjg2LTAuMDIyLDAuNDI3LTAuMDcxYzAuNjg4LTAuMjM2LDEuMDU1LTAuOTg2LDAuODE5LTEuNjc0bC0yLjI3MS02LjYyNWMtMC4yMzUtMC42ODktMC45ODMtMS4wNTQtMS42NzUtMC44MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2'+
			'MtMC42ODgsMC4yMzYtMS4wNTUsMC45ODYtMC44MTksMS42NzRMLTM0NTQuNzQyLTI1NTUuNjQ1eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDUzLjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDcuNTgyLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1YzcuNTgyLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTM0MzkuNS0yNTYyLjkxNS0zNDQ1LjY2OC0yNTY5LjA4My0zNDUzLjI1LTI1NjkuMDgzeiYjeGQ7JiN4YTsmI3g5OyYj'+
			'eDk7JiN4OTsmI3g5OyBNLTM0NTMuMjUtMjU0NC40NzljLTUuOTg2LDAtMTAuODU3LTQuODctMTAuODU3LTEwLjg1NWMwLTUuOTg1LDQuODcxLTEwLjg1NiwxMC44NTctMTAuODU2YzUuOTg3LDAsMTAuODU2LDQuODcxLDEwLjg1NiwxMC44NTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM0NDIuMzkzLTI1NDkuMzQ4LTM0NDcuMjYzLTI1NDQuNDc5LTM0NTMuMjUtMjU0NC40Nzl6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNLTM0NDguMjk4LTI1NTAuMzQxbC0yLjA2Ny0xLjAzNWwxLjAzNi0yLjA2NiYjeGQ7Ji'+
			'N4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjI1Mi0wLjUwNiwwLjA0OC0xLjEyLTAuNDU3LTEuMzc0Yy0wLjUwNS0wLjI1Mi0xLjEyMi0wLjA0OC0xLjM3NCwwLjQ1N2wtMS4wMzQsMi4wNjVsLTIuMDY2LTEuMDM0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUwNi0wLjI1Mi0xLjEyMS0wLjA0OC0xLjM3NSwwLjQ1N2MtMC4yNTIsMC41MDYtMC4wNDcsMS4xMjIsMC40NTcsMS4zNzRsMi4wNjYsMS4wMzRsLTEuMDM2LDIuMDY2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjI1MiwwLjUwNC0wLjA0NywxLjExOSwwLjQ1NywxLjM3M2MwLjI1MywwLjEyNiwwLjUzNCww'+
			'LjEzOCwwLjc4MywwLjA1NWMwLjI0OC0wLjA4MywwLjQ2Ny0wLjI2LDAuNTkyLTAuNTEybDEuMDM1LTIuMDY2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7bDIuMDY2LDEuMDM1YzAuMjUyLDAuMTI3LDAuNTMxLDAuMTM5LDAuNzc5LDAuMDU2YzAuMjQ5LTAuMDgzLDAuNDY4LTAuMjYxLDAuNTk0LTAuNTEzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zNDQ3LjU5LTI1NDkuNDc0LTM0NDcuNzk0LTI1NTAuMDg5LTM0NDguMjk4LTI1NTAuMzQxeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDU1LjU0LT'+
			'I1NTAuNzc2Yy0wLjMyNi0wLjE2NC0wLjU3OS0wLjQxNC0wLjc1Mi0wLjcwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMS44MDUtMC4wNzYtMy4xNTItMC42ODktMy40NjktMS42MTVjLTAuMjQ1LTAuNzEyLDAuMDk5LTEuNjY5LDAuOTM5LTIuNjI2YzAuNjM1LTAuNzI0LDEuNTEyLTEuMzk1LDIuNTMtMS45NTFsLTAuODYyLTIuNTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuNDU3LDAuNzM2LTIuNzE5LDEuNjctMy42NDksMi43MzFjLTEuNTAzLDEuNzEyLTIuMDE5LDMuNTY2LTEuNDUyLDUuMjJjMC43MzEsMi4xMzYsMy4xMDIsMy40MTIsNi4zMzgsMy40MTImI3hk'+
			'OyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNjMsMCwwLjczNC0wLjAxOCwxLjEwOS0wLjA1MWwwLjYxMi0xLjIyTC0zNDU1LjU0LTI1NTAuNzc2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgZmlsbD0ibm9uZSIgZD0iTS0zNDQ0LjIzOC0yNTU4LjQxNmMtMC43MzMtMi4xMzgtMy4xMDItMy40MTMtNi4zMzgtMy40MTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuODI2LDAtMS42ODcsMC4wOTUtMi41NTUsMC4yNjNsMC44NjQsMi41MmMwLjU3Ni0wLjA5MywxLjE0Ni0wLjE0NywxLjY5LTAuMTQ3YzEuOTk2LDAsMy41MDUsMC42ND'+
			'EsMy44NDQsMS42MzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4yNDUsMC43MS0wLjA5OSwxLjY2Ny0wLjkzOSwyLjYyNGMtMC4yMjcsMC4yNTgtMC40ODgsMC41MDgtMC43NzIsMC43NWMwLjA1OSwwLjM2NSwwLjAxMywwLjc1MS0wLjE2NSwxLjEwNmwtMC42NzMsMS4zNDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsMS4xNjMsMC41ODJjMC45NDQtMC42MDEsMS43NjktMS4yOTEsMi40MjktMi4wNDNDLTM0NDQuMTg4LTI1NTQuOTA5LTM0NDMuNjcyLTI1NTYuNzYzLTM0NDQuMjM4LTI1NTguNDE2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgPC9nPgogICA8Zz4KICAg'+
			'IDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDU0Ljc0Mi0yNTU1LjY0NWMwLjE4OCwwLjU0NywwLjcsMC44OTEsMS4yNDgsMC44OTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4xNDEsMCwwLjI4Ni0wLjAyMiwwLjQyNy0wLjA3MWMwLjY4OC0wLjIzNiwxLjA1NS0wLjk4NiwwLjgxOS0xLjY3NGwtMi4yNzEtNi42MjVjLTAuMjM1LTAuNjg5LTAuOTgzLTEuMDU0LTEuNjc1LTAuODImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjg4LDAuMjM2LTEuMDU1LDAuOTg2LTAuODE5LDEuNjc0TC0zNDU0Ljc0Mi0yNTU1LjY0NXoiIGZpbGwtb3'+
			'BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDUzLjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDcuNTgyLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1YzcuNTgyLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTM0MzkuNS0yNTYyLjkxNS0zNDQ1LjY2OC0yNTY5LjA4My0zNDUzLjI1LTI1NjkuMDgzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyBNLTM0NTMuMjUtMjU0NC40NzljLTUuOTg2LDAtMTAu'+
			'ODU3LTQuODctMTAuODU3LTEwLjg1NWMwLTUuOTg1LDQuODcxLTEwLjg1NiwxMC44NTctMTAuODU2YzUuOTg3LDAsMTAuODU2LDQuODcxLDEwLjg1NiwxMC44NTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM0NDIuMzkzLTI1NDkuMzQ4LTM0NDcuMjYzLTI1NDQuNDc5LTM0NTMuMjUtMjU0NC40Nzl6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ0OC4yOTgtMjU1MC4zNDFsLTIuMDY3LTEuMDM1bDEuMDM2LTIuMDY2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yz'+
			'AuMjUyLTAuNTA2LDAuMDQ4LTEuMTItMC40NTctMS4zNzRjLTAuNTA1LTAuMjUyLTEuMTIyLTAuMDQ4LTEuMzc0LDAuNDU3bC0xLjAzNCwyLjA2NWwtMi4wNjYtMS4wMzQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTA2LTAuMjUyLTEuMTIxLTAuMDQ4LTEuMzc1LDAuNDU3Yy0wLjI1MiwwLjUwNi0wLjA0NywxLjEyMiwwLjQ1NywxLjM3NGwyLjA2NiwxLjAzNGwtMS4wMzYsMi4wNjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMjUyLDAuNTA0LTAuMDQ3LDEuMTE5LDAuNDU3LDEuMzczYzAuMjUzLDAuMTI2LDAuNTM0LDAuMTM4LDAuNzgzLDAuMDU1YzAuMjQ4LTAu'+
			'MDgzLDAuNDY3LTAuMjYsMC41OTItMC41MTJsMS4wMzUtMi4wNjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsMi4wNjYsMS4wMzVjMC4yNTIsMC4xMjcsMC41MzEsMC4xMzksMC43NzksMC4wNTZjMC4yNDktMC4wODMsMC40NjgtMC4yNjEsMC41OTQtMC41MTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDLTM0NDcuNTktMjU0OS40NzQtMzQ0Ny43OTQtMjU1MC4wODktMzQ0OC4yOTgtMjU1MC4zNDF6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0tMzQ1NS41NC0yNTUwLj'+
			'c3NmMtMC4zMjYtMC4xNjQtMC41NzktMC40MTQtMC43NTItMC43MDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuODA1LTAuMDc2LTMuMTUyLTAuNjg5LTMuNDY5LTEuNjE1Yy0wLjI0NS0wLjcxMiwwLjA5OS0xLjY2OSwwLjkzOS0yLjYyNmMwLjYzNS0wLjcyNCwxLjUxMi0xLjM5NSwyLjUzLTEuOTUxbC0wLjg2Mi0yLjUyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjQ1NywwLjczNi0yLjcxOSwxLjY3LTMuNjQ5LDIuNzMxYy0xLjUwMywxLjcxMi0yLjAxOSwzLjU2Ni0xLjQ1Miw1LjIyYzAuNzMxLDIuMTM2LDMuMTAyLDMuNDEyLDYuMzM4LDMuNDEyJiN4ZDsmI3hh'+
			'OyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMzYzLDAsMC43MzQtMC4wMTgsMS4xMDktMC4wNTFsMC42MTItMS4yMkwtMzQ1NS41NC0yNTUwLjc3NnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTS0zNDQ0LjIzOC0yNTU4LjQxNmMtMC43MzMtMi4xMzgtMy4xMDItMy40MTMtNi4zMzgtMy40MTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuODI2LDAtMS42ODcsMC4wOTUtMi41NTUsMC4yNjNsMC44NjQsMi41MmMwLjU3Ni0wLjA5MywxLjE0Ni0wLjE0NywxLjY5LTAuMTQ3YzEuOT'+
			'k2LDAsMy41MDUsMC42NDEsMy44NDQsMS42MzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4yNDUsMC43MS0wLjA5OSwxLjY2Ny0wLjkzOSwyLjYyNGMtMC4yMjcsMC4yNTgtMC40ODgsMC41MDgtMC43NzIsMC43NWMwLjA1OSwwLjM2NSwwLjAxMywwLjc1MS0wLjE2NSwxLjEwNmwtMC42NzMsMS4zNDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsMS4xNjMsMC41ODJjMC45NDQtMC42MDEsMS43NjktMS4yOTEsMi40MjktMi4wNDNDLTM0NDQuMTg4LTI1NTQuOTA5LTM0NDMuNjcyLTI1NTYuNzYzLTM0NDQuMjM4LTI1NTguNDE2eiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Ut'+
			'd2lkdGg9IjAuMiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIi8+Cjwvc3ZnPgo=';
		me._gyro_off__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="gyro_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gyro_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gyro_off.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getUseGyro() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._gyro_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._gyro_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._gyro_off.style[domTransition]='opacity 500ms ease 0ms';
				if (me._gyro_off.ggCurrentLogicStateAlpha == 0) {
					me._gyro_off.style.visibility=me._gyro_off.ggVisible?'inherit':'hidden';
					me._gyro_off.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._gyro_off.style.opacity == 0.0) { me._gyro_off.style.visibility="hidden"; } }, 505);
					me._gyro_off.style.opacity=0;
				}
			}
		}
		me._gyro_off.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._gyro_off.style[domTransition]='none';
			} else {
				me._gyro_off.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_off.style.opacity='0';
			me._gyro_off.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._gyro_on.style[domTransition]='none';
			} else {
				me._gyro_on.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._gyro_on.style.opacity='1';
			me._gyro_on.style.visibility=me._gyro_on.ggVisible?'inherit':'hidden';
		}
		me._gyro_off.onmouseover=function (e) {
			me._gyro_off__img.style.visibility='hidden';
			me._gyro_off__imgo.style.visibility='inherit';
		}
		me._gyro_off.onmouseout=function (e) {
			me._gyro_off__img.style.visibility='inherit';
			me._gyro_off__imgo.style.visibility='hidden';
		}
		me._gyro_off.ggUpdatePosition=function (useTransition) {
		}
		me._gyro.appendChild(me._gyro_off);
		el=me._tt_gyro=document.createElement('div');
		els=me._tt_gyro__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_gyro";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_gyro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_gyro.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_gyro.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_gyro.style.top='-25px';
					me._tt_gyro.ggUpdatePosition(true);
				}
				else {
					me._tt_gyro.ggDx=0;
					me._tt_gyro.style.top='32px';
					me._tt_gyro.ggUpdatePosition(true);
				}
			}
		}
		me._tt_gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['gyro'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStateVisible == 0) {
					me._tt_gyro.style.visibility=(Number(me._tt_gyro.style.opacity)>0||!me._tt_gyro.style.opacity)?'inherit':'hidden';
					me._tt_gyro.ggVisible=true;
				}
				else {
					me._tt_gyro.style.visibility="hidden";
					me._tt_gyro.ggVisible=false;
				}
			}
		}
		me._tt_gyro.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getUseGyro() == true))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getUseGyro() == false))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_gyro.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_gyro.ggCurrentLogicStateText = newLogicStateText;
				me._tt_gyro.style[domTransition]='left 0s, top 0s';
				if (me._tt_gyro.ggCurrentLogicStateText == 0) {
					me._tt_gyro.ggText="\u7981\u7528\u9640\u87ba\u4eea";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="\u7981\u7528\u9640\u87ba\u4eea";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
				else if (me._tt_gyro.ggCurrentLogicStateText == 1) {
					me._tt_gyro.ggText="\u9640\u87ba\u4eea";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="\u9640\u87ba\u4eea";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
				else {
					me._tt_gyro.ggText="";
					me._tt_gyro__text.innerHTML=me._tt_gyro.ggText;
					if (me._tt_gyro.ggUpdateText) {
					me._tt_gyro.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_gyro.ggUpdatePosition) me._tt_gyro.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_gyro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._gyro.appendChild(me._tt_gyro);
		me._controller_slider.appendChild(me._gyro);
		el=me._projection_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="projection_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 160px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._projection_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._projection_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_projection') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_projection') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_projection') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_projection') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_projection') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else if (
				((player.getVariableValue('pos_projection') == 5))
			)
			{
				newLogicStatePosition = 5;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._projection_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._projection_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._projection_buttons.style[domTransition]='left 0s, top 0s';
				if (me._projection_buttons.ggCurrentLogicStatePosition == 0) {
					me._projection_buttons.style.left='0px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 1) {
					me._projection_buttons.style.left='32px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 2) {
					me._projection_buttons.style.left='64px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 3) {
					me._projection_buttons.style.left='96px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 4) {
					me._projection_buttons.style.left='128px';
					me._projection_buttons.style.top='0px';
				}
				else if (me._projection_buttons.ggCurrentLogicStatePosition == 5) {
					me._projection_buttons.style.left='160px';
					me._projection_buttons.style.top='0px';
				}
				else {
					me._projection_buttons.style.left='160px';
					me._projection_buttons.style.top='0px';
				}
			}
		}
		me._projection_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_projection') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._projection_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._projection_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._projection_buttons.style[domTransition]='left 0s, top 0s';
				if (me._projection_buttons.ggCurrentLogicStateVisible == 0) {
					me._projection_buttons.style.visibility=(Number(me._projection_buttons.style.opacity)>0||!me._projection_buttons.style.opacity)?'inherit':'hidden';
					me._projection_buttons.ggVisible=true;
				}
				else {
					me._projection_buttons.style.visibility="hidden";
					me._projection_buttons.ggVisible=false;
				}
			}
		}
		me._projection_buttons.onclick=function (e) {
			if (
				(
					((player.getProjection() == 4))
				)
			) {
				player.changeProjectionEx(9,1);
			}
			if (
				(
					((player.getProjection() == 9))
				)
			) {
				player.changeProjectionEx(12,1);
			}
			if (
				(
					((player.getProjection() == 12))
				)
			) {
				player.changeProjectionEx(4,1);
			}
		}
		me._projection_buttons.onmouseover=function (e) {
			me.elementMouseOver['projection_buttons']=true;
			me._tt_projection.logicBlock_visible();
		}
		me._projection_buttons.onmouseout=function (e) {
			me.elementMouseOver['projection_buttons']=false;
			me._tt_projection.logicBlock_visible();
		}
		me._projection_buttons.ontouchend=function (e) {
			me.elementMouseOver['projection_buttons']=false;
			me._tt_projection.logicBlock_visible();
		}
		me._projection_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._stereographic=document.createElement('div');
		els=me._stereographic__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIiBkaXNwbGF5PSJub25lIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iIzFBMTcxQiIgZD0iTTE2LDMuNUM5LjEwNywzLjUsMy41LDkuMTA3LDMuNSwxNlM5LjEwNywyOC40OTksMTYsMjguNDk5UzI4LjUsMjIuODkzLDI4LjUsMTZTMjIuODkzLDMuNSwxNiwzLjV6JiN4ZDsm'+
			'I3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7IE0xNiwyNi4wODFjLTUuNTU5LDAtMTAuMDgtNC41MjItMTAuMDgtMTAuMDgxUzEwLjQ0MSw1LjkxOSwxNiw1LjkxOVMyNi4wOCwxMC40NDEsMjYuMDgsMTZTMjEuNTU5LDI2LjA4MSwxNiwyNi4wODF6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNMjMuMjIxLDEwLjk4NWMtMC4zMTgtMC4yMjctMC43MjctMC4yODUtMS4wOTgtMC4xNTlDMjIuMDkyLDEwLjgzNywxOS4wMSwxMS44OSwxNiwxMS44OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMi45OTYsMC02LjA5NC0xLjA1My02LjEyMy0xLjA2M2MtMC4zNzEtMC4xMjctMC43Nz'+
			'ktMC4wNjgtMS4wOTgsMC4xNTljLTAuMzE4LDAuMjI4LTAuNTA4LDAuNTk0LTAuNTA4LDAuOTg0djguMDAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC40MDQsMC4yMDMsMC43ODMsMC41MzksMS4wMDZjMC4yMDEsMC4xMzUsMC40MzYsMC4yMDMsMC42NzIsMC4yMDNjMC4xNTYsMCwwLjMxNi0wLjAyOSwwLjQ2NS0wLjA5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjAyOS0wLjAxMywzLjA2MS0xLjI2Miw2LjA1My0xLjI2MmMyLjk3NywwLDYuMDIzLDEuMjUsNi4wNTMsMS4yNjNjMC4zNzUsMC4xNTQsMC44MDEsMC4xMTIsMS4xMzctMC4xMTEmI3hkOyYjeGE7JiN4'+
			'OTsmI3g5OyYjeDk7JiN4OTtjMC4zMzYtMC4yMjUsMC41MzktMC42MDIsMC41MzktMS4wMDZWMTEuOTdDMjMuNzI5LDExLjU3OSwyMy41MzksMTEuMjEyLDIzLjIyMSwxMC45ODV6IE0yMS4zMDksMTguMjcyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjMzNC0wLjQwMi0zLjMwNS0wLjg2NS01LjMwOS0wLjg2NXMtMy45NzUsMC40NjMtNS4zMDksMC44NjV2LTQuNjkzQzEyLjAxOCwxMy45MTUsMTQsMTQuMzA5LDE2LDE0LjMwOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O3MzLjk4Mi0wLjM5NCw1LjMwOS0wLjcyOVYxOC4yNzJ6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT'+
			'0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgZmlsbD0ibm9uZSIgZD0iTTE2LDMuNUM5LjEwNywzLjUsMy41LDkuMTA3LDMuNSwxNlM5LjEwNywyOC40OTksMTYsMjguNDk5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7UzI4LjUsMjIuODkzLDI4LjUsMTZTMjIuODkzLDMuNSwxNiwzLjV6IE0xNiwyNi4wODFjLTUuNTU5LDAtMTAuMDgtNC41MjItMTAuMDgtMTAuMDgxUzEwLjQ0MSw1LjkxOSwxNiw1LjkxOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O1MyNi4wOCwxMC40NDEsMjYuMDgsMTZTMjEuNTU5LDI2LjA4MSwxNiwyNi4wODF6IiBzdHJva2Utd2lkdGg9IjEu'+
			'NSIvPgogICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBmaWxsPSJub25lIiBkPSJNMjMuMjIxLDEwLjk4NWMtMC4zMTgtMC4yMjctMC43MjctMC4yODUtMS4wOTgtMC4xNTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjIuMDkyLDEwLjgzNywxOS4wMSwxMS44OSwxNiwxMS44OWMtMi45OTYsMC02LjA5NC0xLjA1My02LjEyMy0xLjA2M2MtMC4zNzEtMC4xMjctMC43NzktMC4wNjgtMS4wOTgsMC4xNTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMzE4LDAuMjI4LTAuNTA4LDAuNTk0LTAuNTA4LDAuOTg0djguMDAyYzAsMC40MDQsMC4yMDMsMC43ODMsMC41MzksMS4wMD'+
			'ZjMC4yMDEsMC4xMzUsMC40MzYsMC4yMDMsMC42NzIsMC4yMDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4xNTYsMCwwLjMxNi0wLjAyOSwwLjQ2NS0wLjA5M2MwLjAyOS0wLjAxMywzLjA2MS0xLjI2Miw2LjA1My0xLjI2MmMyLjk3NywwLDYuMDIzLDEuMjUsNi4wNTMsMS4yNjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNzUsMC4xNTQsMC44MDEsMC4xMTIsMS4xMzctMC4xMTFjMC4zMzYtMC4yMjUsMC41MzktMC42MDIsMC41MzktMS4wMDZWMTEuOTdDMjMuNzI5LDExLjU3OSwyMy41MzksMTEuMjEyLDIzLjIyMSwxMC45ODV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsm'+
			'I3g5OyYjeDk7IE0yMS4zMDksMTguMjcyYy0xLjMzNC0wLjQwMi0zLjMwNS0wLjg2NS01LjMwOS0wLjg2NXMtMy45NzUsMC40NjMtNS4zMDksMC44NjV2LTQuNjkzQzEyLjAxOCwxMy45MTUsMTQsMTQuMzA5LDE2LDE0LjMwOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O3MzLjk4Mi0wLjM5NCw1LjMwOS0wLjcyOVYxOC4yNzJ6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE2LDMuNUM5LjEwNywzLjUsMy41LDkuMTA3LDMuNSwxNlM5LjEwNywyOC40OTksMTYsMjguNDk5UzI4LjUsMjIuODkzLDI4LjUsMTZTMjIuOD'+
			'kzLDMuNSwxNiwzLjV6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7IE0xNiwyNi4wODFjLTUuNTU5LDAtMTAuMDgtNC41MjItMTAuMDgtMTAuMDgxUzEwLjQ0MSw1LjkxOSwxNiw1LjkxOVMyNi4wOCwxMC40NDEsMjYuMDgsMTZTMjEuNTU5LDI2LjA4MSwxNiwyNi4wODF6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMy4yMjEsMTAuOTg1Yy0wLjMxOC0wLjIyNy0wLjcyNy0wLjI4NS0xLjA5OC0wLjE1OUMyMi4wOTIsMTAuODM3LDE5LjAxLDExLjg5LDE2LDExLjg5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0yLjk5NiwwLTYuMDk0'+
			'LTEuMDUzLTYuMTIzLTEuMDYzYy0wLjM3MS0wLjEyNy0wLjc3OS0wLjA2OC0xLjA5OCwwLjE1OWMtMC4zMTgsMC4yMjgtMC41MDgsMC41OTQtMC41MDgsMC45ODR2OC4wMDImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjQwNCwwLjIwMywwLjc4MywwLjUzOSwxLjAwNmMwLjIwMSwwLjEzNSwwLjQzNiwwLjIwMywwLjY3MiwwLjIwM2MwLjE1NiwwLDAuMzE2LTAuMDI5LDAuNDY1LTAuMDkzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMDI5LTAuMDEzLDMuMDYxLTEuMjYyLDYuMDUzLTEuMjYyYzIuOTc3LDAsNi4wMjMsMS4yNSw2LjA1MywxLjI2M2MwLjM3NSwwLjE1NC'+
			'wwLjgwMSwwLjExMiwxLjEzNy0wLjExMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjMzNi0wLjIyNSwwLjUzOS0wLjYwMiwwLjUzOS0xLjAwNlYxMS45N0MyMy43MjksMTEuNTc5LDIzLjUzOSwxMS4yMTIsMjMuMjIxLDEwLjk4NXogTTIxLjMwOSwxOC4yNzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuMzM0LTAuNDAyLTMuMzA1LTAuODY1LTUuMzA5LTAuODY1cy0zLjk3NSwwLjQ2My01LjMwOSwwLjg2NXYtNC42OTNDMTIuMDE4LDEzLjkxNSwxNCwxNC4zMDksMTYsMTQuMzA5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czMuOTgyLTAuMzk0LDUuMzA5LTAu'+
			'NzI5VjE4LjI3MnoiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNMTYsMy41QzkuMTA3LDMuNSwzLjUsOS4xMDcsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtTMjguNSwyMi44OTMsMjguNSwxNlMyMi44OTMsMy41LDE2LDMuNXogTTE2LDI2LjA4MWMtNS41NTksMC0xMC4wOC00LjUyMi0xMC4wOC0xMC4wODFTMTAuNDQxLDUuOTE5LDE2LDUuOTE5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7UzI2LjA4LDEwLjQ0MSwyNi4wOCwxNlMyMS'+
			'41NTksMjYuMDgxLDE2LDI2LjA4MXoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0yMy4yMjEsMTAuOTg1Yy0wLjMxOC0wLjIyNy0wLjcyNy0wLjI4NS0xLjA5OC0wLjE1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMi4wOTIsMTAuODM3LDE5LjAxLDExLjg5LDE2LDExLjg5Yy0yLjk5NiwwLTYuMDk0LTEuMDUzLTYuMTIzLTEuMDYzYy0wLjM3MS0wLjEyNy0wLjc3OS0wLjA2OC0xLjA5OCwwLjE1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4zMTgsMC4yMjgtMC41MDgsMC41OTQtMC41MDgsMC45'+
			'ODR2OC4wMDJjMCwwLjQwNCwwLjIwMywwLjc4MywwLjUzOSwxLjAwNmMwLjIwMSwwLjEzNSwwLjQzNiwwLjIwMywwLjY3MiwwLjIwMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjE1NiwwLDAuMzE2LTAuMDI5LDAuNDY1LTAuMDkzYzAuMDI5LTAuMDEzLDMuMDYxLTEuMjYyLDYuMDUzLTEuMjYyYzIuOTc3LDAsNi4wMjMsMS4yNSw2LjA1MywxLjI2MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjM3NSwwLjE1NCwwLjgwMSwwLjExMiwxLjEzNy0wLjExMWMwLjMzNi0wLjIyNSwwLjUzOS0wLjYwMiwwLjUzOS0xLjAwNlYxMS45N0MyMy43MjksMTEuNTc5LDIzLjUzOSwxMS'+
			'4yMTIsMjMuMjIxLDEwLjk4NXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTTIxLjMwOSwxOC4yNzJjLTEuMzM0LTAuNDAyLTMuMzA1LTAuODY1LTUuMzA5LTAuODY1cy0zLjk3NSwwLjQ2My01LjMwOSwwLjg2NXYtNC42OTNDMTIuMDE4LDEzLjkxNSwxNCwxNC4zMDksMTYsMTQuMzA5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czMuOTgyLTAuMzk0LDUuMzA5LTAuNzI5VjE4LjI3MnoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._stereographic__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._stereographic__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIiBkaXNwbGF5PSJub25lIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iIzFBMTcxQiIgZD0iTTE2LDIuMjVDOC40MTgsMi4yNSwyLjI1LDguNDE4LDIuMjUsMTZTOC40MTgsMjkuNzQ5LDE2LDI5Ljc0OVMyOS43NSwyMy41ODIsMjkuNzUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7JiN4OTtTMjMuNTgyLDIuMjUsMTYsMi4yNXogTTE2LDI3LjA4OUM5Ljg4NiwyNy4wODksNC45MTIsMjIuMTE0LDQuOTEyLDE2UzkuODg2LDQuOTExLDE2LDQuOTExUzI3LjA4OCw5Ljg4NiwyNy4wODgsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtTMjIuMTE0LDI3LjA4OSwxNiwyNy4wODl6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNMjMuOTQyLDEwLjQ4M2MtMC4zNS0wLjI1LTAuNzk5LTAuMzEzLTEuMjA3LTAuMTc1Yy0wLjAzNCwwLjAxMi0zLjQyNSwxLjE3LTYuNzM1LDEuMTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTMuMjk2LDAtNi43MD'+
			'MtMS4xNTgtNi43MzUtMS4xN2MtMC40MDgtMC4xNDEtMC44NTctMC4wNzQtMS4yMDgsMC4xNzVjLTAuMzUsMC4yNTEtMC41NTksMC42NTMtMC41NTksMS4wODN2OC44MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjQ0NCwwLjIyNCwwLjg2MSwwLjU5NCwxLjEwNmMwLjIyMSwwLjE0NywwLjQ3OSwwLjIyMywwLjczOCwwLjIyM2MwLjE3MiwwLDAuMzQ5LTAuMDMyLDAuNTEyLTAuMTAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMDMyLTAuMDE0LDMuMzY2LTEuMzg4LDYuNjU4LTEuMzg4YzMuMjc0LDAsNi42MjYsMS4zNzUsNi42NTgsMS4zODljMC40MTIsMC4xNyww'+
			'Ljg4MSwwLjEyMywxLjI1LTAuMTIyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMzY5LTAuMjQ3LDAuNTkzLTAuNjYyLDAuNTkzLTEuMTA2di04LjgwM0MyNC41MDEsMTEuMTM3LDI0LjI5MywxMC43MzIsMjMuOTQyLDEwLjQ4M3ogTTIxLjgzOSwxOC41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjQ0My0zLjYzNS0wLjk1Mi01LjgzOS0wLjk1MnMtNC4zNzIsMC41MDktNS44NCwwLjk1MnYtNS4xNjNjMS40NTksMC4zNjksMy42NCwwLjgwMyw1Ljg0LDAuODAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czQuMzgxLTAuNDM0LDUuODM5LTAuODAzVj'+
			'E4LjV6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT0iMC40Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgZmlsbD0ibm9uZSIgZD0iTTE2LDIuMjVDOC40MTgsMi4yNSwyLjI1LDguNDE4LDIuMjUsMTZTOC40MTgsMjkuNzQ5LDE2LDI5Ljc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O1MyOS43NSwyMy41ODIsMjkuNzUsMTZTMjMuNTgyLDIuMjUsMTYsMi4yNXogTTE2LDI3LjA4OUM5Ljg4NiwyNy4wODksNC45MTIsMjIuMTE0LDQuOTEyLDE2UzkuODg2LDQuOTExLDE2LDQuOTExJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7UzI3LjA4OCw5Ljg4NiwyNy4wODgsMTZTMjIu'+
			'MTE0LDI3LjA4OSwxNiwyNy4wODl6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBmaWxsPSJub25lIiBkPSJNMjMuOTQyLDEwLjQ4M2MtMC4zNS0wLjI1LTAuNzk5LTAuMzEzLTEuMjA3LTAuMTc1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjAzNCwwLjAxMi0zLjQyNSwxLjE3LTYuNzM1LDEuMTdjLTMuMjk2LDAtNi43MDMtMS4xNTgtNi43MzUtMS4xN2MtMC40MDgtMC4xNDEtMC44NTctMC4wNzQtMS4yMDgsMC4xNzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMzUsMC4yNTEtMC41NTksMC42NTMtMC41NTksMS4wODN2OC'+
			'44MDNjMCwwLjQ0NCwwLjIyNCwwLjg2MSwwLjU5NCwxLjEwNmMwLjIyMSwwLjE0NywwLjQ3OSwwLjIyMywwLjczOCwwLjIyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjE3MiwwLDAuMzQ5LTAuMDMyLDAuNTEyLTAuMTAyYzAuMDMyLTAuMDE0LDMuMzY2LTEuMzg4LDYuNjU4LTEuMzg4YzMuMjc0LDAsNi42MjYsMS4zNzUsNi42NTgsMS4zODkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC40MTIsMC4xNywwLjg4MSwwLjEyMywxLjI1LTAuMTIyYzAuMzY5LTAuMjQ3LDAuNTkzLTAuNjYyLDAuNTkzLTEuMTA2di04LjgwM0MyNC41MDEsMTEuMTM3LDI0LjI5MywxMC43MzIs'+
			'MjMuOTQyLDEwLjQ4M3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTTIxLjgzOSwxOC41Yy0xLjQ2Ny0wLjQ0My0zLjYzNS0wLjk1Mi01LjgzOS0wLjk1MnMtNC4zNzIsMC41MDktNS44NCwwLjk1MnYtNS4xNjNjMS40NTksMC4zNjksMy42NCwwLjgwMyw1Ljg0LDAuODAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czQuMzgxLTAuNDM0LDUuODM5LTAuODAzVjE4LjV6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE2LDIuMjVDOC40MTgsMi4yNSwyLjI1LDguNDE4LDIuMjUsMTZTOC40MTgsMjkuNzQ5LD'+
			'E2LDI5Ljc0OVMyOS43NSwyMy41ODIsMjkuNzUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtTMjMuNTgyLDIuMjUsMTYsMi4yNXogTTE2LDI3LjA4OUM5Ljg4NiwyNy4wODksNC45MTIsMjIuMTE0LDQuOTEyLDE2UzkuODg2LDQuOTExLDE2LDQuOTExUzI3LjA4OCw5Ljg4NiwyNy4wODgsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtTMjIuMTE0LDI3LjA4OSwxNiwyNy4wODl6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMy45NDIsMTAuNDgzYy0wLjM1LTAuMjUtMC43OTktMC4zMTMtMS4yMDctMC4xNzVjLTAuMDM0LDAuMDEy'+
			'LTMuNDI1LDEuMTctNi43MzUsMS4xNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMy4yOTYsMC02LjcwMy0xLjE1OC02LjczNS0xLjE3Yy0wLjQwOC0wLjE0MS0wLjg1Ny0wLjA3NC0xLjIwOCwwLjE3NWMtMC4zNSwwLjI1MS0wLjU1OSwwLjY1My0wLjU1OSwxLjA4M3Y4LjgwMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNDQ0LDAuMjI0LDAuODYxLDAuNTk0LDEuMTA2YzAuMjIxLDAuMTQ3LDAuNDc5LDAuMjIzLDAuNzM4LDAuMjIzYzAuMTcyLDAsMC4zNDktMC4wMzIsMC41MTItMC4xMDImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4wMzItMC4wMTQsMy'+
			'4zNjYtMS4zODgsNi42NTgtMS4zODhjMy4yNzQsMCw2LjYyNiwxLjM3NSw2LjY1OCwxLjM4OWMwLjQxMiwwLjE3LDAuODgxLDAuMTIzLDEuMjUtMC4xMjImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNjktMC4yNDcsMC41OTMtMC42NjIsMC41OTMtMS4xMDZ2LTguODAzQzI0LjUwMSwxMS4xMzcsMjQuMjkzLDEwLjczMiwyMy45NDIsMTAuNDgzeiBNMjEuODM5LDE4LjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuNDY3LTAuNDQzLTMuNjM1LTAuOTUyLTUuODM5LTAuOTUycy00LjM3MiwwLjUwOS01Ljg0LDAuOTUydi01LjE2M2MxLjQ1OSwwLjM2OSwzLjY0LDAuODAz'+
			'LDUuODQsMC44MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtzNC4zODEtMC40MzQsNS44MzktMC44MDNWMTguNXoiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBmaWxsPSJub25lIiBkPSJNMTYsMi4yNUM4LjQxOCwyLjI1LDIuMjUsOC40MTgsMi4yNSwxNlM4LjQxOCwyOS43NDksMTYsMjkuNzQ5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7UzI5Ljc1LDIzLjU4MiwyOS43NSwxNlMyMy41ODIsMi4yNSwxNiwyLjI1eiBNMTYsMjcuMDg5QzkuODg2LDI3LjA4OSw0LjkxMiwyMi4xMTQsNC45MTIsMTZTOS44ODYsNC'+
			'45MTEsMTYsNC45MTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtTMjcuMDg4LDkuODg2LDI3LjA4OCwxNlMyMi4xMTQsMjcuMDg5LDE2LDI3LjA4OXoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGZpbGw9Im5vbmUiIGQ9Ik0yMy45NDIsMTAuNDgzYy0wLjM1LTAuMjUtMC43OTktMC4zMTMtMS4yMDctMC4xNzUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMDM0LDAuMDEyLTMuNDI1LDEuMTctNi43MzUsMS4xN2MtMy4yOTYsMC02LjcwMy0xLjE1OC02LjczNS0xLjE3Yy0wLjQwOC0wLjE0MS0wLjg1Ny0wLjA3NC0xLjIwOCwwLjE3'+
			'NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4zNSwwLjI1MS0wLjU1OSwwLjY1My0wLjU1OSwxLjA4M3Y4LjgwM2MwLDAuNDQ0LDAuMjI0LDAuODYxLDAuNTk0LDEuMTA2YzAuMjIxLDAuMTQ3LDAuNDc5LDAuMjIzLDAuNzM4LDAuMjIzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMTcyLDAsMC4zNDktMC4wMzIsMC41MTItMC4xMDJjMC4wMzItMC4wMTQsMy4zNjYtMS4zODgsNi42NTgtMS4zODhjMy4yNzQsMCw2LjYyNiwxLjM3NSw2LjY1OCwxLjM4OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjQxMiwwLjE3LDAuODgxLDAuMTIzLDEuMjUtMC4xMjJjMC'+
			'4zNjktMC4yNDcsMC41OTMtMC42NjIsMC41OTMtMS4xMDZ2LTguODAzQzI0LjUwMSwxMS4xMzcsMjQuMjkzLDEwLjczMiwyMy45NDIsMTAuNDgzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyBNMjEuODM5LDE4LjVjLTEuNDY3LTAuNDQzLTMuNjM1LTAuOTUyLTUuODM5LTAuOTUycy00LjM3MiwwLjUwOS01Ljg0LDAuOTUydi01LjE2M2MxLjQ1OSwwLjM2OSwzLjY0LDAuODAzLDUuODQsMC44MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtzNC4zODEtMC40MzQsNS44MzktMC44MDNWMTguNXoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3Zn'+
			'Pgo=';
		me._stereographic__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="stereographic";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._stereographic.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._stereographic.onmouseover=function (e) {
			me._stereographic__img.style.visibility='hidden';
			me._stereographic__imgo.style.visibility='inherit';
		}
		me._stereographic.onmouseout=function (e) {
			me._stereographic__img.style.visibility='inherit';
			me._stereographic__imgo.style.visibility='hidden';
		}
		me._stereographic.ggUpdatePosition=function (useTransition) {
		}
		me._projection_buttons.appendChild(me._stereographic);
		el=me._tt_projection=document.createElement('div');
		els=me._tt_projection__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_projection";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_projection.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_projection.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_projection.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_projection.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_projection.style[domTransition]='left 0s, top 0s';
				if (me._tt_projection.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_projection.style.top='-25px';
					me._tt_projection.ggUpdatePosition(true);
				}
				else {
					me._tt_projection.ggDx=0;
					me._tt_projection.style.top='32px';
					me._tt_projection.ggUpdatePosition(true);
				}
			}
		}
		me._tt_projection.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['projection_buttons'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_projection.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_projection.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_projection.style[domTransition]='left 0s, top 0s';
				if (me._tt_projection.ggCurrentLogicStateVisible == 0) {
					me._tt_projection.style.visibility=(Number(me._tt_projection.style.opacity)>0||!me._tt_projection.style.opacity)?'inherit':'hidden';
					me._tt_projection.ggVisible=true;
				}
				else {
					me._tt_projection.style.visibility="hidden";
					me._tt_projection.ggVisible=false;
				}
			}
		}
		me._tt_projection.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getProjection() == 4))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getProjection() == 9))
			)
			{
				newLogicStateText = 1;
			}
			else if (
				((player.getProjection() == 12))
			)
			{
				newLogicStateText = 2;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_projection.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_projection.ggCurrentLogicStateText = newLogicStateText;
				me._tt_projection.style[domTransition]='left 0s, top 0s';
				if (me._tt_projection.ggCurrentLogicStateText == 0) {
					me._tt_projection.ggText="\u7acb\u4f53\u6a21\u5f0f";
					me._tt_projection__text.innerHTML=me._tt_projection.ggText;
					if (me._tt_projection.ggUpdateText) {
					me._tt_projection.ggUpdateText=function() {
						var hs="\u7acb\u4f53\u6a21\u5f0f";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_projection.ggUpdatePosition) me._tt_projection.ggUpdatePosition();
					}
				}
				else if (me._tt_projection.ggCurrentLogicStateText == 1) {
					me._tt_projection.ggText="\u9c7c\u773c\u6a21\u5f0f";
					me._tt_projection__text.innerHTML=me._tt_projection.ggText;
					if (me._tt_projection.ggUpdateText) {
					me._tt_projection.ggUpdateText=function() {
						var hs="\u9c7c\u773c\u6a21\u5f0f";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_projection.ggUpdatePosition) me._tt_projection.ggUpdatePosition();
					}
				}
				else if (me._tt_projection.ggCurrentLogicStateText == 2) {
					me._tt_projection.ggText="\u76f4\u7ebf\u6a21\u5f0f";
					me._tt_projection__text.innerHTML=me._tt_projection.ggText;
					if (me._tt_projection.ggUpdateText) {
					me._tt_projection.ggUpdateText=function() {
						var hs="\u76f4\u7ebf\u6a21\u5f0f";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_projection.ggUpdatePosition) me._tt_projection.ggUpdatePosition();
					}
				}
				else {
					me._tt_projection.ggText="";
					me._tt_projection__text.innerHTML=me._tt_projection.ggText;
					if (me._tt_projection.ggUpdateText) {
					me._tt_projection.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_projection.ggUpdatePosition) me._tt_projection.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_projection.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._projection_buttons.appendChild(me._tt_projection);
		me._controller_slider.appendChild(me._projection_buttons);
		el=me._thumbnail=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="thumbnail";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 128px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_thumbnail') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_thumbnail') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail.style[domTransition]='left 0s, top 0s';
				if (me._thumbnail.ggCurrentLogicStatePosition == 0) {
					me._thumbnail.style.left='0px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 1) {
					me._thumbnail.style.left='32px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 2) {
					me._thumbnail.style.left='64px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 3) {
					me._thumbnail.style.left='96px';
					me._thumbnail.style.top='0px';
				}
				else if (me._thumbnail.ggCurrentLogicStatePosition == 4) {
					me._thumbnail.style.left='128px';
					me._thumbnail.style.top='0px';
				}
				else {
					me._thumbnail.style.left='128px';
					me._thumbnail.style.top='0px';
				}
			}
		}
		me._thumbnail.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail.style[domTransition]='left 0s, top 0s';
				if (me._thumbnail.ggCurrentLogicStateVisible == 0) {
					me._thumbnail.style.visibility=(Number(me._thumbnail.style.opacity)>0||!me._thumbnail.style.opacity)?'inherit':'hidden';
					me._thumbnail.ggVisible=true;
				}
				else {
					me._thumbnail.style.visibility="hidden";
					me._thumbnail.ggVisible=false;
				}
			}
		}
		me._thumbnail.onclick=function (e) {
			if (
				(
					((player.getViewerSize().width <= 450))
				)
			) {
				player.setVariableValue('vis_thumbnail_menu_mobile', !player.getVariableValue('vis_thumbnail_menu_mobile'));
			}
			if (
				(
					((player.getViewerSize().width > 450))
				)
			) {
				player.setVariableValue('vis_thumbnail_menu_show', !player.getVariableValue('vis_thumbnail_menu_show'));
			}
		}
		me._thumbnail.onmouseover=function (e) {
			me.elementMouseOver['thumbnail']=true;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail.onmouseout=function (e) {
			me.elementMouseOver['thumbnail']=false;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail.ontouchend=function (e) {
			me.elementMouseOver['thumbnail']=false;
			me._tt_thumbnail_open.logicBlock_visible();
		}
		me._thumbnail.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_show_button_show=document.createElement('div');
		els=me._thumbnail_show_button_show__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGZpbGw9Im5vbmUiIGQ9Ik0xNiwzLjUwMUM5LjEwNywzLjUwMSwzLjUsOS4xMDgsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4'+
			'OTtjNi44OTMsMCwxMi40OTktNS42MDcsMTIuNDk5LTEyLjQ5OVMyMi44OTMsMy41MDEsMTYsMy41MDF6IE0xNiwyNi4wNzljLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDc5UzEwLjQ0Miw1LjkyLDE2LDUuOTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNS41NTcsMCwxMC4wODEsNC41MjIsMTAuMDgxLDEwLjA4UzIxLjU1NywyNi4wNzksMTYsMjYuMDc5eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgZmlsbD0ibm9uZSIgZD0iTTExLjI3MSwxMy41MjFIOC44NzVjLTAuNzA3LDAtMS4yOCwwLjU3My0xLjI4LDEuMjh2Mi4zOTYmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjcwNywwLjU3MywxLjI4LDEuMjgsMS4yOGgyLjM5NmMwLjcwNywwLDEuMjgtMC41NzMsMS4yOC0xLjI4di0yLjM5NkMxMi41NTEsMTQuMDk1LDExLjk3OCwxMy41MjEsMTEuMjcxLDEzLjUyMXoiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGZpbGw9Im5vbmUiIGQ9Ik0xNy4xNTIsMTMuNTIxaC0yLjM5NmMtMC43MDcsMC0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTczLDEuMjc5LDEuMjgsMS4yNzloMi4zOTZjMC43MDcs'+
			'MCwxLjI3OS0wLjU3MiwxLjI3OS0xLjI3OXYtMi4zOTZDMTguNDMyLDE0LjA5NSwxNy44NTksMTMuNTIxLDE3LjE1MiwxMy41MjF6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBmaWxsPSJub25lIiBkPSJNMjMuMDM1LDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yODEsMC41NzMtMS4yODEsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTc0LDEuMjc5LDEuMjgxLDEuMjc5aDIuMzk2YzAuNzA3LDAsMS4yODEtMC41NzIsMS4yODEtMS4yNzl2LTIuMzk2QzI0LjMxNiwxNC4wOTUsMjMuNzQyLDEzLjUyMSwyMy'+
			'4wMzUsMTMuNTIxeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNiwzLjUwMUM5LjEwNywzLjUwMSwzLjUsOS4xMDgsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTljNi44OTMsMCwxMi40OTktNS42MDcsMTIuNDk5LTEyLjQ5OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O1MyMi44OTMsMy41MDEsMTYsMy41MDF6IE0xNiwyNi4wNzljLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDc5UzEwLjQ0Miw1LjkyLDE2LDUuOTJjNS41NTcsMCwxMC4wODEsNC41MjIsMTAuMDgxLDEwLjA4JiN4ZDsmI3hhOyYj'+
			'eDk7JiN4OTsmI3g5OyYjeDk7UzIxLjU1NywyNi4wNzksMTYsMjYuMDc5eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTEuMjcxLDEzLjUyMUg4Ljg3NWMtMC43MDcsMC0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5NmMwLDAuNzA3LDAuNTczLDEuMjgsMS4yOCwxLjI4aDIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzA3LDAsMS4yOC0wLjU3MywxLjI4LTEuMjh2LTIuMzk2QzEyLjU1MSwxNC4wOTUsMTEuOTc4LDEzLjUyMSwxMS4yNzEsMTMuNTIxeiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIi'+
			'BkPSJNMTcuMTUyLDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yOCwwLjU3My0xLjI4LDEuMjh2Mi4zOTZjMCwwLjcwNywwLjU3MywxLjI3OSwxLjI4LDEuMjc5aDIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzA3LDAsMS4yNzktMC41NzIsMS4yNzktMS4yNzl2LTIuMzk2QzE4LjQzMiwxNC4wOTUsMTcuODU5LDEzLjUyMSwxNy4xNTIsMTMuNTIxeiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjMuMDM1LDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yODEsMC41NzMtMS4yODEsMS4yOHYyLjM5NmMwLDAuNzA3LDAuNTc0LDEuMjc5'+
			'LDEuMjgxLDEuMjc5aDIuMzk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzA3LDAsMS4yODEtMC41NzIsMS4yODEtMS4yNzl2LTIuMzk2QzI0LjMxNiwxNC4wOTUsMjMuNzQyLDEzLjUyMSwyMy4wMzUsMTMuNTIxeiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xNiwzLjUwMUM5LjEwNywzLjUwMSwzLjUsOS4xMDgsMy41LDE2UzkuMTA3LDI4LjQ5OSwxNiwyOC40OTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNi44OTMsMCwxMi40OTktNS42MDcsMTIuNDk5LTEyLjQ5OVMyMi'+
			'44OTMsMy41MDEsMTYsMy41MDF6IE0xNiwyNi4wNzljLTUuNTU4LDAtMTAuMDgtNC41MjEtMTAuMDgtMTAuMDc5UzEwLjQ0Miw1LjkyLDE2LDUuOTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjNS41NTcsMCwxMC4wODEsNC41MjIsMTAuMDgxLDEwLjA4UzIxLjU1NywyNi4wNzksMTYsMjYuMDc5eiIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgZD0iTTExLjI3MSwxMy41MjFIOC44NzVjLTAuNzA3LDAtMS4yOCwwLjU3My0xLjI4LDEuMjh2Mi4zOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjcwNywwLjU3'+
			'MywxLjI4LDEuMjgsMS4yOGgyLjM5NmMwLjcwNywwLDEuMjgtMC41NzMsMS4yOC0xLjI4di0yLjM5NkMxMi41NTEsMTQuMDk1LDExLjk3OCwxMy41MjEsMTEuMjcxLDEzLjUyMXoiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xNy4xNTIsMTMuNTIxaC0yLjM5NmMtMC43MDcsMC0xLjI4LDAuNTczLTEuMjgsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTczLDEuMjc5LDEuMjgsMS4yNzloMi4zOTZjMC43MDcsMCwxLjI3OS0wLjU3MiwxLjI3OS0xLjI3OXYtMi4zOTZDMTguNDMyLD'+
			'E0LjA5NSwxNy44NTksMTMuNTIxLDE3LjE1MiwxMy41MjF6IiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBkPSJNMjMuMDM1LDEzLjUyMWgtMi4zOTZjLTAuNzA3LDAtMS4yODEsMC41NzMtMS4yODEsMS4yOHYyLjM5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzA3LDAuNTc0LDEuMjc5LDEuMjgxLDEuMjc5aDIuMzk2YzAuNzA3LDAsMS4yODEtMC41NzIsMS4yODEtMS4yNzl2LTIuMzk2QzI0LjMxNiwxNC4wOTUsMjMuNzQyLDEzLjUyMSwyMy4wMzUsMTMuNTIxeiIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgPC9n'+
			'PgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._thumbnail_show_button_show__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._thumbnail_show_button_show__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIH'+
			'k9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxnIGlkPSJMYXllcl8xXzFfIi8+CiA8L2c+CiA8ZyBpZD0iRWJlbmVfMV8xXyI+CiAgPGc+CiAgIDxnIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGZpbGw9Im5vbmUiIGQ9Ik0xNS45OTksMi4yNTFDOC40MTcsMi4yNTEsMi4yNSw4LjQxOSwyLjI1LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7czYuMTY3LDEzLjc0OSwx'+
			'My43NDksMTMuNzQ5YzcuNTgzLDAsMTMuNzQ5LTYuMTY4LDEzLjc0OS0xMy43NDlTMjMuNTgyLDIuMjUxLDE1Ljk5OSwyLjI1MXogTTE1Ljk5OSwyNy4wODcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDOS44ODYsMjcuMDg3LDQuOTExLDIyLjExMyw0LjkxMSwxNlM5Ljg4Niw0LjkxMiwxNS45OTksNC45MTJTMjcuMDg4LDkuODg3LDI3LjA4OCwxNlMyMi4xMTIsMjcuMDg3LDE1Ljk5OSwyNy4wODd6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBmaWxsPSJub25lIiBkPSJNMTAuNzk4LDEzLjI3M0g4LjE2MmMtMC43NzgsMC0xLjQwOCwwLjYzMS'+
			'0xLjQwOCwxLjQwOHYyLjYzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNzc3LDAuNjMsMS40MDgsMS40MDgsMS40MDhoMi42MzZjMC43NzcsMCwxLjQwOC0wLjYzMSwxLjQwOC0xLjQwOHYtMi42MzdDMTIuMjA2LDEzLjkwNCwxMS41NzUsMTMuMjczLDEwLjc5OCwxMy4yNzN6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBmaWxsPSJub25lIiBkPSJNMTcuMjY4LDEzLjI3M2gtMi42MzZjLTAuNzc3LDAtMS40MDgsMC42MzEtMS40MDgsMS40MDh2Mi42MzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjc3NywwLjYzMSwx'+
			'LjQwNywxLjQwOCwxLjQwN2gyLjYzNmMwLjc3NywwLDEuNDA3LTAuNjMsMS40MDctMS40MDd2LTIuNjM3QzE4LjY3NSwxMy45MDQsMTguMDQ1LDEzLjI3MywxNy4yNjgsMTMuMjczeiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzNDM0MzQyIgZmlsbD0ibm9uZSIgZD0iTTIzLjczOCwxMy4yNzNoLTIuNjM2Yy0wLjc3OCwwLTEuNDA5LDAuNjMxLTEuNDA5LDEuNDA4djIuNjM3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC43NzcsMC42MzEsMS40MDcsMS40MDksMS40MDdoMi42MzZjMC43NzgsMCwxLjQwOS0wLjYzLDEuNDA5LTEuNDA3di0yLjYzN0MyNS'+
			'4xNDcsMTMuOTA0LDI0LjUxNywxMy4yNzMsMjMuNzM4LDEzLjI3M3oiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTUuOTk5LDIuMjUxQzguNDE3LDIuMjUxLDIuMjUsOC40MTksMi4yNSwxNnM2LjE2NywxMy43NDksMTMuNzQ5LDEzLjc0OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2M3LjU4MywwLDEzLjc0OS02LjE2OCwxMy43NDktMTMuNzQ5UzIzLjU4MiwyLjI1MSwxNS45OTksMi4yNTF6IE0xNS45OTksMjcuMDg3QzkuODg2LDI3LjA4Nyw0LjkxMSwyMi4xMTMsNC45MTEsMTYmI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7JiN4OTtTOS44ODYsNC45MTIsMTUuOTk5LDQuOTEyUzI3LjA4OCw5Ljg4NywyNy4wODgsMTZTMjIuMTEyLDI3LjA4NywxNS45OTksMjcuMDg3eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTAuNzk4LDEzLjI3M0g4LjE2MmMtMC43NzgsMC0xLjQwOCwwLjYzMS0xLjQwOCwxLjQwOHYyLjYzN2MwLDAuNzc3LDAuNjMsMS40MDgsMS40MDgsMS40MDhoMi42MzYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC43NzcsMCwxLjQwOC0wLjYzMSwxLjQwOC0xLjQwOHYtMi42MzdDMTIuMjA2LDEzLjkwNCwxMS41NzUsMTMuMjczLDEwLjc5OC'+
			'wxMy4yNzN6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNy4yNjgsMTMuMjczaC0yLjYzNmMtMC43NzcsMC0xLjQwOCwwLjYzMS0xLjQwOCwxLjQwOHYyLjYzN2MwLDAuNzc3LDAuNjMxLDEuNDA3LDEuNDA4LDEuNDA3aDIuNjM2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzc3LDAsMS40MDctMC42MywxLjQwNy0xLjQwN3YtMi42MzdDMTguNjc1LDEzLjkwNCwxOC4wNDUsMTMuMjczLDE3LjI2OCwxMy4yNzN6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMy43MzgsMTMuMjczaC0yLjYzNmMt'+
			'MC43NzgsMC0xLjQwOSwwLjYzMS0xLjQwOSwxLjQwOHYyLjYzN2MwLDAuNzc3LDAuNjMxLDEuNDA3LDEuNDA5LDEuNDA3aDIuNjM2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuNzc4LDAsMS40MDktMC42MywxLjQwOS0xLjQwN3YtMi42MzdDMjUuMTQ3LDEzLjkwNCwyNC41MTcsMTMuMjczLDIzLjczOCwxMy4yNzN6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgZD0iTTE1Ljk5OSwyLjI1MUM4LjQxNywyLjI1MSwyLjI1LDguNDE5LDIuMjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OT'+
			'tzNi4xNjcsMTMuNzQ5LDEzLjc0OSwxMy43NDljNy41ODMsMCwxMy43NDktNi4xNjgsMTMuNzQ5LTEzLjc0OVMyMy41ODIsMi4yNTEsMTUuOTk5LDIuMjUxeiBNMTUuOTk5LDI3LjA4NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M5Ljg4NiwyNy4wODcsNC45MTEsMjIuMTEzLDQuOTExLDE2UzkuODg2LDQuOTEyLDE1Ljk5OSw0LjkxMlMyNy4wODgsOS44ODcsMjcuMDg4LDE2UzIyLjExMiwyNy4wODcsMTUuOTk5LDI3LjA4N3oiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xMC43OTgsMTMuMjczSDguMTYyYy0wLjc3'+
			'OCwwLTEuNDA4LDAuNjMxLTEuNDA4LDEuNDA4djIuNjM3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC43NzcsMC42MywxLjQwOCwxLjQwOCwxLjQwOGgyLjYzNmMwLjc3NywwLDEuNDA4LTAuNjMxLDEuNDA4LTEuNDA4di0yLjYzN0MxMi4yMDYsMTMuOTA0LDExLjU3NSwxMy4yNzMsMTAuNzk4LDEzLjI3M3oiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xNy4yNjgsMTMuMjczaC0yLjYzNmMtMC43NzcsMC0xLjQwOCwwLjYzMS0xLjQwOCwxLjQwOHYyLjYzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2'+
			'MwLDAuNzc3LDAuNjMxLDEuNDA3LDEuNDA4LDEuNDA3aDIuNjM2YzAuNzc3LDAsMS40MDctMC42MywxLjQwNy0xLjQwN3YtMi42MzdDMTguNjc1LDEzLjkwNCwxOC4wNDUsMTMuMjczLDE3LjI2OCwxMy4yNzN6IiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBkPSJNMjMuNzM4LDEzLjI3M2gtMi42MzZjLTAuNzc4LDAtMS40MDksMC42MzEtMS40MDksMS40MDh2Mi42MzcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjc3NywwLjYzMSwxLjQwNywxLjQwOSwxLjQwN2gyLjYzNmMwLjc3OCwwLDEuNDA5LTAuNjMsMS40MDkt'+
			'MS40MDd2LTIuNjM3QzI1LjE0NywxMy45MDQsMjQuNTE3LDEzLjI3MywyMy43MzgsMTMuMjczeiIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._thumbnail_show_button_show__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="thumbnail_show_button_show";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_show_button_show.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_show_button_show.onmouseover=function (e) {
			me._thumbnail_show_button_show__img.style.visibility='hidden';
			me._thumbnail_show_button_show__imgo.style.visibility='inherit';
		}
		me._thumbnail_show_button_show.onmouseout=function (e) {
			me._thumbnail_show_button_show__img.style.visibility='inherit';
			me._thumbnail_show_button_show__imgo.style.visibility='hidden';
		}
		me._thumbnail_show_button_show.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail.appendChild(me._thumbnail_show_button_show);
		el=me._tt_thumbnail_open=document.createElement('div');
		els=me._tt_thumbnail_open__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_thumbnail_open";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_thumbnail_open.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_thumbnail_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_thumbnail_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_thumbnail_open.style.top='-25px';
					me._tt_thumbnail_open.ggUpdatePosition(true);
				}
				else {
					me._tt_thumbnail_open.ggDx=0;
					me._tt_thumbnail_open.style.top='32px';
					me._tt_thumbnail_open.ggUpdatePosition(true);
				}
			}
		}
		me._tt_thumbnail_open.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['thumbnail'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_thumbnail_open.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStateVisible == 0) {
					me._tt_thumbnail_open.style.visibility=(Number(me._tt_thumbnail_open.style.opacity)>0||!me._tt_thumbnail_open.style.opacity)?'inherit':'hidden';
					me._tt_thumbnail_open.ggVisible=true;
				}
				else {
					me._tt_thumbnail_open.style.visibility="hidden";
					me._tt_thumbnail_open.ggVisible=false;
				}
			}
		}
		me._tt_thumbnail_open.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getVariableValue('vis_thumbnail_menu_show') == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateText = 1;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu_show') == false)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateText = 2;
			}
			else if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == false)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateText = 3;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_thumbnail_open.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_thumbnail_open.ggCurrentLogicStateText = newLogicStateText;
				me._tt_thumbnail_open.style[domTransition]='left 0s, top 0s';
				if (me._tt_thumbnail_open.ggCurrentLogicStateText == 0) {
					me._tt_thumbnail_open.ggText="\u9690\u85cf\u7f29\u7565\u56fe";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="\u9690\u85cf\u7f29\u7565\u56fe";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else if (me._tt_thumbnail_open.ggCurrentLogicStateText == 1) {
					me._tt_thumbnail_open.ggText="\u9690\u85cf\u7f29\u7565\u56fe";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="\u9690\u85cf\u7f29\u7565\u56fe";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else if (me._tt_thumbnail_open.ggCurrentLogicStateText == 2) {
					me._tt_thumbnail_open.ggText="\u7f29\u7565\u56fe";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="\u7f29\u7565\u56fe";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else if (me._tt_thumbnail_open.ggCurrentLogicStateText == 3) {
					me._tt_thumbnail_open.ggText="\u7f29\u7565\u56fe";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="\u7f29\u7565\u56fe";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
				else {
					me._tt_thumbnail_open.ggText="";
					me._tt_thumbnail_open__text.innerHTML=me._tt_thumbnail_open.ggText;
					if (me._tt_thumbnail_open.ggUpdateText) {
					me._tt_thumbnail_open.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumbnail_open.ggUpdatePosition) me._tt_thumbnail_open.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_thumbnail_open.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._thumbnail.appendChild(me._tt_thumbnail_open);
		me._controller_slider.appendChild(me._thumbnail);
		el=me._info=document.createElement('div');
		els=me._info__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE04Ljg1NCw4'+
			'Ljg1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS4zMTMsNy4wMj'+
			'IsMTguNzk1LDUuODkzLDE2LDUuODkybDAsMEMxMy4yMDUsNS44OTMsMTAuNjg2LDcuMDIyLDguODU0LDguODUzTDguODU0LDguODUzeiIvPgogIDwvZz4KICA8Zz4KICAgPHBhdGggZD0iTTE0Ljk2MywxMC4wNVY5LjUyMWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk3LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzYsMS4xOTYsMS4xOTZsMCwwdjAuNTI5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8'+
			'cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0wLjY2MS0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMi4yMjZjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDEuMDMxdjUuMzc5aC0xLjIwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNi'+
			'wxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsm'+
			'I3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE04Ljg1NCw4Ljg1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LT'+
			'QuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS4zMTMsNy4wMjIsMTguNzk1LDUuODkzLDE2LDUuODkybDAsMEMxMy4yMDUsNS44OTMsMTAuNjg2LDcuMDIyLDguODU0LDguODUzTDguODU0LDguODUzeiIvPgogIDwvZz4KICA8Zz4KICAgPHBhdGggZD0iTTE0Ljk2MywxMC4wNVY5LjUyMWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk3LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzYsMS4xOTYsMS4xOTZsMCwwdjAuNTI5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAs'+
			'MC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0wLjY2MS0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMi4yMjZjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMT'+
			'k2aDEuMDMxdjUuMzc5aC0xLjIwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._info__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._info__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEy'+
			'LjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwYzAuMDAxLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMGMxLjgzMiwxLjgzMSw0LjM1MiwyLjk2LDcuMTQ2LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAsNS4zMTQtMS4xMjksNy4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMz'+
			'E0LTIuOTYtNy4xNDdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNMTQuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2MS0wLjUzNiwxLjE5Ni0xLjE5NiwxLjE5NmwwLDBDMTUuNSwxMS4y'+
			'NDcsMTQuOTYzLDEwLjcxMSwxNC45NjMsMTAuMDVMMTQuOTYzLDEwLjA1eiIvPgogICA8Zz4KICAgIDxwYXRoIGQ9Ik0xOC41MzIsMjAuMzkxaC0xLjE3NnYtNi40NzNjMC0wLjAyMS0wLjAwNS0wLjA0Mi0wLjAwNi0wLjA2M2MwLTAuMDE0LDAuMDA0LTAuMDI2LDAuMDA0LTAuMDQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTAuNjYxLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7QzE5LjcyOSwyMC45MjYsMTkuMTkyLDIwLjM5MSwxOC41MzIsMjAuMzkxeiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdp'+
			'ZHRoPSIwLjIiPgogIDxnPgogICA8cGF0aCBkPSJNMy41LDE2QzMuNSw5LjA5Niw5LjA5NiwzLjUsMTYsMy41bDAsMGM2LjkwMywwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwMywzLjUsMTZMMy41LDE2eiBNOC44NTQsOC44NTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBjMC4wMDEsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMCwwYzEuOD'+
			'MyLDEuODMxLDQuMzUyLDIuOTYsNy4xNDYsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMCw1LjMxNC0xLjEyOSw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMiwyLjk1OS00LjM1MiwyLjk2LTcuMTQ2bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjEuMzEzLDcuMDIyLDE4Ljc5NSw1Ljg5MywxNiw1Ljg5MmwwLDBDMTMuMjA1LDUuODkzLDEwLjY4Niw3LjAyMiw4Ljg1NCw4Ljg1M0w4Ljg1NCw4Ljg1M3oiLz4KICA8L2c+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xNC45NjMsMTAu'+
			'MDVWOS41MjFjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ny0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM2LDEuMTk2LDEuMTk2bDAsMHYwLjUyOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYxLTAuNTM2LDEuMTk2LTEuMTk2LDEuMTk2bDAsMEMxNS41LDExLjI0NywxNC45NjMsMTAuNzExLDE0Ljk2MywxMC4wNUwxNC45NjMsMTAuMDV6Ii8+CiAgIDxnPgogICAgPHBhdGggZD0iTTE4LjUzMiwyMC4zOTFoLTEuMTc2di02LjQ3M2MwLTAuMDIxLTAuMDA1LTAuMDQyLTAuMDA2LTAuMDYzYzAtMC4wMTQsMC4wMDQtMC4wMjYsMC4wMDQtMC4wNCYjeGQ7JiN4YTsmI3g5OyYjeD'+
			'k7JiN4OTsmI3g5OyYjeDk7YzAtMC42NjEtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTIuMjI2Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgxLjAzMXY1LjM3OWgtMS4yMDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoNC43NzVjMC42NiwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMTkuNzI5LDIwLjkyNiwxOS4xOTIsMjAuMzkx'+
			'LDE4LjUzMiwyMC4zOTF6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._info__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 96px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_information') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_information') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_information') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_information') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info.style[domTransition]='left 0s, top 0s';
				if (me._info.ggCurrentLogicStatePosition == 0) {
					me._info.style.left='0px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 1) {
					me._info.style.left='32px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 2) {
					me._info.style.left='64px';
					me._info.style.top='0px';
				}
				else if (me._info.ggCurrentLogicStatePosition == 3) {
					me._info.style.left='96px';
					me._info.style.top='0px';
				}
				else {
					me._info.style.left='96px';
					me._info.style.top='0px';
				}
			}
		}
		me._info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_info') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._info.style[domTransition]='left 0s, top 0s';
				if (me._info.ggCurrentLogicStateVisible == 0) {
					me._info.style.visibility=(Number(me._info.style.opacity)>0||!me._info.style.opacity)?'inherit':'hidden';
					me._info.ggVisible=true;
				}
				else {
					me._info.style.visibility="hidden";
					me._info.ggVisible=false;
				}
			}
		}
		me._info.onclick=function (e) {
			player.setVariableValue('vis_userdata', true);
		}
		me._info.onmouseover=function (e) {
			me._info__img.style.visibility='hidden';
			me._info__imgo.style.visibility='inherit';
			me.elementMouseOver['info']=true;
			me._tt_userdata.logicBlock_visible();
		}
		me._info.onmouseout=function (e) {
			me._info__img.style.visibility='inherit';
			me._info__imgo.style.visibility='hidden';
			me.elementMouseOver['info']=false;
			me._tt_userdata.logicBlock_visible();
		}
		me._info.ontouchend=function (e) {
			me.elementMouseOver['info']=false;
			me._tt_userdata.logicBlock_visible();
		}
		me._info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_userdata=document.createElement('div');
		els=me._tt_userdata__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_userdata";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u5173\u4e8e";
		el.appendChild(els);
		me._tt_userdata.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_userdata.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_userdata.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_userdata.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_userdata.style[domTransition]='left 0s, top 0s';
				if (me._tt_userdata.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_userdata.style.top='-25px';
					me._tt_userdata.ggUpdatePosition(true);
				}
				else {
					me._tt_userdata.ggDx=0;
					me._tt_userdata.style.top='32px';
					me._tt_userdata.ggUpdatePosition(true);
				}
			}
		}
		me._tt_userdata.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['info'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_userdata.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_userdata.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_userdata.style[domTransition]='left 0s, top 0s';
				if (me._tt_userdata.ggCurrentLogicStateVisible == 0) {
					me._tt_userdata.style.visibility=(Number(me._tt_userdata.style.opacity)>0||!me._tt_userdata.style.opacity)?'inherit':'hidden';
					me._tt_userdata.ggVisible=true;
				}
				else {
					me._tt_userdata.style.visibility="hidden";
					me._tt_userdata.ggVisible=false;
				}
			}
		}
		me._tt_userdata.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._info.appendChild(me._tt_userdata);
		me._controller_slider.appendChild(me._info);
		el=me._autorotate_buttons=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="autorotate_buttons";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 64px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_buttons.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_buttons.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_autorotate') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_autorotate') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_autorotate') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._autorotate_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._autorotate_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._autorotate_buttons.style[domTransition]='left 0s, top 0s';
				if (me._autorotate_buttons.ggCurrentLogicStatePosition == 0) {
					me._autorotate_buttons.style.left='0px';
					me._autorotate_buttons.style.top='0px';
				}
				else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 1) {
					me._autorotate_buttons.style.left='32px';
					me._autorotate_buttons.style.top='0px';
				}
				else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 2) {
					me._autorotate_buttons.style.left='64px';
					me._autorotate_buttons.style.top='0px';
				}
				else {
					me._autorotate_buttons.style.left='64px';
					me._autorotate_buttons.style.top='0px';
				}
			}
		}
		me._autorotate_buttons.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_autorotate') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._autorotate_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._autorotate_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._autorotate_buttons.style[domTransition]='left 0s, top 0s';
				if (me._autorotate_buttons.ggCurrentLogicStateVisible == 0) {
					me._autorotate_buttons.style.visibility=(Number(me._autorotate_buttons.style.opacity)>0||!me._autorotate_buttons.style.opacity)?'inherit':'hidden';
					me._autorotate_buttons.ggVisible=true;
				}
				else {
					me._autorotate_buttons.style.visibility="hidden";
					me._autorotate_buttons.ggVisible=false;
				}
			}
		}
		me._autorotate_buttons.onclick=function (e) {
			player.setUseGyro(false);
			player.toggleAutorotate();
		}
		me._autorotate_buttons.onmouseover=function (e) {
			me.elementMouseOver['autorotate_buttons']=true;
			me._tt_rotate.logicBlock_visible();
		}
		me._autorotate_buttons.onmouseout=function (e) {
			me.elementMouseOver['autorotate_buttons']=false;
			me._tt_rotate.logicBlock_visible();
		}
		me._autorotate_buttons.ontouchend=function (e) {
			me.elementMouseOver['autorotate_buttons']=false;
			me._tt_rotate.logicBlock_visible();
		}
		me._autorotate_buttons.ggUpdatePosition=function (useTransition) {
		}
		el=me._autorotate_start=document.createElement('div');
		els=me._autorotate_start__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZjMC02LjkwNCw1LjU5Ni0xMi41LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUz'+
			'LDguODU0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMSwxLjgzMy0yLjk2LDQuMzUyLTIuOTYsNy4xNDdsMCwwYzAsMi43OTQsMS4xMjksNS4zMTQsMi45Niw3LjE0N2wwLDBjMS44MzIsMS44Myw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMywyLjk1OS00LjM1MywyLjk2LTcuMTQ3bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuODMzLTEuODMyLTQuMz'+
			'UzLTIuOTYtNy4xNDctMi45NmwwLDBDMTMuMjA1LDUuODk0LDEwLjY4Niw3LjAyMiw4Ljg1Myw4Ljg1NEw4Ljg1Myw4Ljg1NHoiLz4KICA8L2c+CiAgPHBhdGggZD0iTTE4LjA3LDIwLjAwMWMtMC4xNzQtMC42MzgsMC4yMDMtMS4yOTUsMC44NDEtMS40NjlsMCwwYzEuMTM0LTAuMzA2LDIuMDU1LTAuNzg5LDIuNjMzLTEuMzA1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41ODQtMC41MjYsMC43OTctMS4wMDgsMC43OTgtMS40NDRsMCwwYy0wLjAwMi0wLjMxLTAuMTAyLTAuNjE3LTAuMzU5LTAuOTdsMCwwYy0wLjI1Ni0wLjM1LTAuNjc4LTAuNzIxLTEuMjQ3LTEuMDQ1bDAsMCYjeGQ7'+
			'JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTEuMTM3LTAuNjU2LTIuODQtMS4xMS00LjczNS0xLjEwNmwwLDBjLTEuNDIyLTAuMDAxLTIuNzM1LDAuMjUtMy43ODMsMC42NTdsMCwwYy0xLjA1MSwwLjQwMi0xLjgxOSwwLjk2OS0yLjIwMSwxLjQ5NWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjI1NywwLjM1NC0wLjM1NiwwLjY2MS0wLjM1OCwwLjk3bDAsMGMwLjAwMSwwLjI4OCwwLjA4NywwLjU3MSwwLjMwNiwwLjg5NWwwLDBjMC4yMTcsMC4zMjEsMC41NzUsMC42NjYsMS4wNjUsMC45NzhsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2gwLjAwMWMwLjU1NywwLjM1NiwwLjcyLDEuMD'+
			'k2LDAuMzY0LDEuNjUybDAsMGMtMC4zNTUsMC41NTctMS4wOTUsMC43Mi0xLjY1MiwwLjM2NGwwLDBjLTAuNzA2LTAuNDUxLTEuMzEtMC45OTQtMS43NTUtMS42NDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC40NDQtMC42NDctMC43MjMtMS40MjMtMC43MjItMi4yNDNsMCwwYy0wLjAwMS0wLjg4MywwLjMyMS0xLjcxMiwwLjgyNy0yLjM5MmwwLDBjMC41MDctMC42ODQsMS4xODgtMS4yNDQsMS45ODMtMS43bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS41OTItMC45MDcsMy42NTctMS40MTksNS45MjUtMS40MjNsMCwwYzEuNywwLDMuMjg4LDAuMjkzLDQuNjQ2LDAuODE4'+
			'bDAsMGMxLjM1NSwwLjUyOSwyLjQ5OCwxLjI4MSwzLjI2MSwyLjMwNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNTA2LDAuNjgsMC44MjksMS41MDgsMC44MjYsMi4zOTJsMCwwYzAuMDAxLDEuMjg4LTAuNjY4LDIuNDEzLTEuNjAyLDMuMjMzbDAsMGMtMC45NDIsMC44MzItMi4xNzgsMS40MzgtMy41OTQsMS44MjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4xMDQsMC4wMjgtMC4yMTEsMC4wNDItMC4zMTQsMC4wNDJsMCwwQzE4LjY5NiwyMC44ODQsMTguMjE0LDIwLjUzMywxOC4wNywyMC4wMDFMMTguMDcsMjAuMDAxeiIvPgogIDxwYXRoIGQ9Ik0xNi4zOTYsMjMuNj'+
			'IxbC0zLjM3My0zLjAzOWMtMC4yNTEtMC4yMjYtMC4zOTYtMC41NTEtMC4zOTYtMC44ODlsMCwwYzAtMC4zMzcsMC4xNDYtMC42NjMsMC4zOTYtMC44ODkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDAsMGwzLjM3NC0zLjAzOWMwLjQ5MS0wLjQ0MiwxLjI0Ny0wLjQwMywxLjY4OSwwLjA4OGwwLDBjMC40NDIsMC40OTEsMC40MDIsMS4yNDctMC4wODgsMS42ODlsMCwwbC0yLjM4NiwyLjE1bDIuMzg2LDIuMTQ5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQ5LDAuNDQyLDAuNTMsMS4xOTksMC4wODgsMS42OWwwLDBjLTAuMjM2LDAuMjYyLTAuNTYyLDAuMzk1LTAuODksMC4zOTVsMCwwQzE2'+
			'LjkxMiwyMy45MjgsMTYuNjI1LDIzLjgyNiwxNi4zOTYsMjMuNjIxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0wxNi4zOTYsMjMuNjIxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjUsMTIuNS0xMi41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OT'+
			'ksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsOC44NTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuODMxLDEuODMzLTIuOTYsNC4zNTItMi45Niw3LjE0N2wwLDBjMCwyLjc5NCwxLjEyOSw1LjMxNCwyLjk2LDcuMTQ3bDAsMGMxLjgzMiwxLjgzLDQuMzUyLDIuOTYsNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMCw1LjMxNC0xLjEzLDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMzLDIuOTU5LTQuMzUzLDIuOTYtNy4xNDdsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5'+
			'OyYjeDk7JiN4OTsmI3g5O2MtMS44MzMtMS44MzItNC4zNTMtMi45Ni03LjE0Ny0yLjk2bDAsMEMxMy4yMDUsNS44OTQsMTAuNjg2LDcuMDIyLDguODUzLDguODU0TDguODUzLDguODU0eiIvPgogIDwvZz4KICA8cGF0aCBkPSJNMTguMDcsMjAuMDAxYy0wLjE3NC0wLjYzOCwwLjIwMy0xLjI5NSwwLjg0MS0xLjQ2OWwwLDBjMS4xMzQtMC4zMDYsMi4wNTUtMC43ODksMi42MzMtMS4zMDVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjU4NC0wLjUyNiwwLjc5Ny0xLjAwOCwwLjc5OC0xLjQ0NGwwLDBjLTAuMDAyLTAuMzEtMC4xMDItMC42MTctMC4zNTktMC45N2wwLDBjLTAuMjU2LTAuMz'+
			'UtMC42NzgtMC43MjEtMS4yNDctMS4wNDVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMS4xMzctMC42NTYtMi44NC0xLjExLTQuNzM1LTEuMTA2bDAsMGMtMS40MjItMC4wMDEtMi43MzUsMC4yNS0zLjc4MywwLjY1N2wwLDBjLTEuMDUxLDAuNDAyLTEuODE5LDAuOTY5LTIuMjAxLDEuNDk1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjU3LDAuMzU0LTAuMzU2LDAuNjYxLTAuMzU4LDAuOTdsMCwwYzAuMDAxLDAuMjg4LDAuMDg3LDAuNTcxLDAuMzA2LDAuODk1bDAsMGMwLjIxNywwLjMyMSwwLjU3NSwwLjY2NiwxLjA2NSwwLjk3OGwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5'+
			'OyYjeDk7aDAuMDAxYzAuNTU3LDAuMzU2LDAuNzIsMS4wOTYsMC4zNjQsMS42NTJsMCwwYy0wLjM1NSwwLjU1Ny0xLjA5NSwwLjcyLTEuNjUyLDAuMzY0bDAsMGMtMC43MDYtMC40NTEtMS4zMS0wLjk5NC0xLjc1NS0xLjY0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjQ0NC0wLjY0Ny0wLjcyMy0xLjQyMy0wLjcyMi0yLjI0M2wwLDBjLTAuMDAxLTAuODgzLDAuMzIxLTEuNzEyLDAuODI3LTIuMzkybDAsMGMwLjUwNy0wLjY4NCwxLjE4OC0xLjI0NCwxLjk4My0xLjdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjU5Mi0wLjkwNywzLjY1Ny0xLjQxOSw1LjkyNS0xLjQyM2'+
			'wwLDBjMS43LDAsMy4yODgsMC4yOTMsNC42NDYsMC44MThsMCwwYzEuMzU1LDAuNTI5LDIuNDk4LDEuMjgxLDMuMjYxLDIuMzA1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MDYsMC42OCwwLjgyOSwxLjUwOCwwLjgyNiwyLjM5MmwwLDBjMC4wMDEsMS4yODgtMC42NjgsMi40MTMtMS42MDIsMy4yMzNsMCwwYy0wLjk0MiwwLjgzMi0yLjE3OCwxLjQzOC0zLjU5NCwxLjgyNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjEwNCwwLjAyOC0wLjIxMSwwLjA0Mi0wLjMxNCwwLjA0MmwwLDBDMTguNjk2LDIwLjg4NCwxOC4yMTQsMjAuNTMzLDE4LjA3LDIwLjAwMUwxOC4wNywy'+
			'MC4wMDF6Ii8+CiAgPHBhdGggZD0iTTE2LjM5NiwyMy42MjFsLTMuMzczLTMuMDM5Yy0wLjI1MS0wLjIyNi0wLjM5Ni0wLjU1MS0wLjM5Ni0wLjg4OWwwLDBjMC0wLjMzNywwLjE0Ni0wLjY2MywwLjM5Ni0wLjg4OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsMCwwbDMuMzc0LTMuMDM5YzAuNDkxLTAuNDQyLDEuMjQ3LTAuNDAzLDEuNjg5LDAuMDg4bDAsMGMwLjQ0MiwwLjQ5MSwwLjQwMiwxLjI0Ny0wLjA4OCwxLjY4OWwwLDBsLTIuMzg2LDIuMTVsMi4zODYsMi4xNDkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNDksMC40NDIsMC41MywxLjE5OSwwLjA4OCwxLjY5bDAsMGMtMC4yMzYsMC'+
			'4yNjItMC41NjIsMC4zOTUtMC44OSwwLjM5NWwwLDBDMTYuOTEyLDIzLjkyOCwxNi42MjUsMjMuODI2LDE2LjM5NiwyMy42MjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7TDE2LjM5NiwyMy42MjF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._autorotate_start__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._autorotate_start__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjUsMTIuNS0xMi41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTkt'+
			'MTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsOC44NTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuODMxLDEuODMzLTIuOTYsNC4zNTItMi45Niw3LjE0N2wwLDBjMCwyLjc5NCwxLjEyOSw1LjMxNCwyLjk2LDcuMTQ3bDAsMGMxLjgzMiwxLjgzLDQuMzUyLDIuOTYsNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMCw1LjMxNC0xLjEzLDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMzLDIuOTU5LTQuMzUzLDIuOTYtNy4xNDdsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLj'+
			'k2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMS44MzMtMS44MzItNC4zNTMtMi45Ni03LjE0Ny0yLjk2bDAsMEMxMy4yMDUsNS44OTQsMTAuNjg2LDcuMDIyLDguODUzLDguODU0TDguODUzLDguODU0eiIvPgogIDwvZz4KICA8cGF0aCBkPSJNMTguMDcsMjAuMDAxYy0wLjE3NC0wLjYzOCwwLjIwMy0xLjI5NSwwLjg0MS0xLjQ2OWwwLDBjMS4xMzQtMC4zMDYsMi4wNTUtMC43ODksMi42MzMtMS4zMDVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjU4NC0wLjUyNiwwLjc5Ny0xLjAwOCwwLjc5OC0xLjQ0NGwwLDBjLTAuMDAyLTAuMzEtMC4xMDItMC42MTct'+
			'MC4zNTktMC45N2wwLDBjLTAuMjU2LTAuMzUtMC42NzgtMC43MjEtMS4yNDctMS4wNDVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMS4xMzctMC42NTYtMi44NC0xLjExLTQuNzM1LTEuMTA2bDAsMGMtMS40MjItMC4wMDEtMi43MzUsMC4yNS0zLjc4MywwLjY1N2wwLDBjLTEuMDUxLDAuNDAyLTEuODE5LDAuOTY5LTIuMjAxLDEuNDk1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMjU3LDAuMzU0LTAuMzU2LDAuNjYxLTAuMzU4LDAuOTdsMCwwYzAuMDAxLDAuMjg4LDAuMDg3LDAuNTcxLDAuMzA2LDAuODk1bDAsMGMwLjIxNywwLjMyMSwwLjU3NSwwLjY2NiwxLjA2NSwwLj'+
			'k3OGwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7aDAuMDAxYzAuNTU3LDAuMzU2LDAuNzIsMS4wOTYsMC4zNjQsMS42NTJsMCwwYy0wLjM1NSwwLjU1Ny0xLjA5NSwwLjcyLTEuNjUyLDAuMzY0bDAsMGMtMC43MDYtMC40NTEtMS4zMS0wLjk5NC0xLjc1NS0xLjY0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjQ0NC0wLjY0Ny0wLjcyMy0xLjQyMy0wLjcyMi0yLjI0M2wwLDBjLTAuMDAxLTAuODgzLDAuMzIxLTEuNzEyLDAuODI3LTIuMzkybDAsMGMwLjUwNy0wLjY4NCwxLjE4OC0xLjI0NCwxLjk4My0xLjdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjU5Mi0wLjkw'+
			'NywzLjY1Ny0xLjQxOSw1LjkyNS0xLjQyM2wwLDBjMS43LDAsMy4yODgsMC4yOTMsNC42NDYsMC44MThsMCwwYzEuMzU1LDAuNTI5LDIuNDk4LDEuMjgxLDMuMjYxLDIuMzA1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41MDYsMC42OCwwLjgyOSwxLjUwOCwwLjgyNiwyLjM5MmwwLDBjMC4wMDEsMS4yODgtMC42NjgsMi40MTMtMS42MDIsMy4yMzNsMCwwYy0wLjk0MiwwLjgzMi0yLjE3OCwxLjQzOC0zLjU5NCwxLjgyNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjEwNCwwLjAyOC0wLjIxMSwwLjA0Mi0wLjMxNCwwLjA0MmwwLDBDMTguNjk2LDIwLjg4NCwxOC4yMTQsMj'+
			'AuNTMzLDE4LjA3LDIwLjAwMUwxOC4wNywyMC4wMDF6Ii8+CiAgPHBhdGggZD0iTTE2LjM5NiwyMy42MjFsLTMuMzczLTMuMDM5Yy0wLjI1MS0wLjIyNi0wLjM5Ni0wLjU1MS0wLjM5Ni0wLjg4OWwwLDBjMC0wLjMzNywwLjE0Ni0wLjY2MywwLjM5Ni0wLjg4OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsMCwwbDMuMzc0LTMuMDM5YzAuNDkxLTAuNDQyLDEuMjQ3LTAuNDAzLDEuNjg5LDAuMDg4bDAsMGMwLjQ0MiwwLjQ5MSwwLjQwMiwxLjI0Ny0wLjA4OCwxLjY4OWwwLDBsLTIuMzg2LDIuMTVsMi4zODYsMi4xNDkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNDksMC40NDIsMC41MywxLjE5'+
			'OSwwLjA4OCwxLjY5bDAsMGMtMC4yMzYsMC4yNjItMC41NjIsMC4zOTUtMC44OSwwLjM5NWwwLDBDMTYuOTEyLDIzLjkyOCwxNi42MjUsMjMuODI2LDE2LjM5NiwyMy42MjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7TDE2LjM5NiwyMy42MjF6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZjMC02LjkwNCw1LjU5Ni0xMi41LDEyLjUtMTIuNWwwLD'+
			'BjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDguODU0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMSwxLjgzMy0yLjk2LDQuMzUyLTIuOTYsNy4xNDdsMCwwYzAsMi43OTQsMS4xMjksNS4zMTQsMi45Niw3LjE0N2wwLDBjMS44MzIsMS44Myw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAs'+
			'NS4zMTQtMS4xMyw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMywyLjk1OS00LjM1MywyLjk2LTcuMTQ3bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTEuODMzLTEuODMyLTQuMzUzLTIuOTYtNy4xNDctMi45NmwwLDBDMTMuMjA1LDUuODk0LDEwLjY4Niw3LjAyMiw4Ljg1Myw4Ljg1NEw4Ljg1Myw4Ljg1NHoiLz4KICA8L2c+CiAgPHBhdGggZD0iTTE4LjA3LDIwLjAwMWMtMC4xNzQtMC42MzgsMC4yMDMtMS4yOTUsMC44NDEtMS40NjlsMCwwYzEuMTM0LTAuMzA2LDIuMDU1LTAuNzg5LDIuNjMzLTEuMzA1bD'+
			'AsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC41ODQtMC41MjYsMC43OTctMS4wMDgsMC43OTgtMS40NDRsMCwwYy0wLjAwMi0wLjMxLTAuMTAyLTAuNjE3LTAuMzU5LTAuOTdsMCwwYy0wLjI1Ni0wLjM1LTAuNjc4LTAuNzIxLTEuMjQ3LTEuMDQ1bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTEuMTM3LTAuNjU2LTIuODQtMS4xMS00LjczNS0xLjEwNmwwLDBjLTEuNDIyLTAuMDAxLTIuNzM1LDAuMjUtMy43ODMsMC42NTdsMCwwYy0xLjA1MSwwLjQwMi0xLjgxOSwwLjk2OS0yLjIwMSwxLjQ5NWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjI1NywwLjM1NC0wLjM1Niww'+
			'LjY2MS0wLjM1OCwwLjk3bDAsMGMwLjAwMSwwLjI4OCwwLjA4NywwLjU3MSwwLjMwNiwwLjg5NWwwLDBjMC4yMTcsMC4zMjEsMC41NzUsMC42NjYsMS4wNjUsMC45NzhsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2gwLjAwMWMwLjU1NywwLjM1NiwwLjcyLDEuMDk2LDAuMzY0LDEuNjUybDAsMGMtMC4zNTUsMC41NTctMS4wOTUsMC43Mi0xLjY1MiwwLjM2NGwwLDBjLTAuNzA2LTAuNDUxLTEuMzEtMC45OTQtMS43NTUtMS42NDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC40NDQtMC42NDctMC43MjMtMS40MjMtMC43MjItMi4yNDNsMCwwYy0wLjAwMS0wLjg4MywwLjMyMS0xLj'+
			'cxMiwwLjgyNy0yLjM5MmwwLDBjMC41MDctMC42ODQsMS4xODgtMS4yNDQsMS45ODMtMS43bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS41OTItMC45MDcsMy42NTctMS40MTksNS45MjUtMS40MjNsMCwwYzEuNywwLDMuMjg4LDAuMjkzLDQuNjQ2LDAuODE4bDAsMGMxLjM1NSwwLjUyOSwyLjQ5OCwxLjI4MSwzLjI2MSwyLjMwNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNTA2LDAuNjgsMC44MjksMS41MDgsMC44MjYsMi4zOTJsMCwwYzAuMDAxLDEuMjg4LTAuNjY4LDIuNDEzLTEuNjAyLDMuMjMzbDAsMGMtMC45NDIsMC44MzItMi4xNzgsMS40MzgtMy41OTQsMS44MjVs'+
			'MCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4xMDQsMC4wMjgtMC4yMTEsMC4wNDItMC4zMTQsMC4wNDJsMCwwQzE4LjY5NiwyMC44ODQsMTguMjE0LDIwLjUzMywxOC4wNywyMC4wMDFMMTguMDcsMjAuMDAxeiIvPgogIDxwYXRoIGQ9Ik0xNi4zOTYsMjMuNjIxbC0zLjM3My0zLjAzOWMtMC4yNTEtMC4yMjYtMC4zOTYtMC41NTEtMC4zOTYtMC44ODlsMCwwYzAtMC4zMzcsMC4xNDYtMC42NjMsMC4zOTYtMC44ODkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDAsMGwzLjM3NC0zLjAzOWMwLjQ5MS0wLjQ0MiwxLjI0Ny0wLjQwMywxLjY4OSwwLjA4OGwwLDBjMC40NDIsMC40OTEsMC40MD'+
			'IsMS4yNDctMC4wODgsMS42ODlsMCwwbC0yLjM4NiwyLjE1bDIuMzg2LDIuMTQ5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQ5LDAuNDQyLDAuNTMsMS4xOTksMC4wODgsMS42OWwwLDBjLTAuMjM2LDAuMjYyLTAuNTYyLDAuMzk1LTAuODksMC4zOTVsMCwwQzE2LjkxMiwyMy45MjgsMTYuNjI1LDIzLjgyNiwxNi4zOTYsMjMuNjIxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0wxNi4zOTYsMjMuNjIxeiIvPgogPC9nPgo8L3N2Zz4K';
		me._autorotate_start__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="autorotate_start";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_start.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_start.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsAutorotating() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._autorotate_start.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._autorotate_start.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._autorotate_start.style[domTransition]='opacity 500ms ease 0ms';
				if (me._autorotate_start.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._autorotate_start.style.opacity == 0.0) { me._autorotate_start.style.visibility="hidden"; } }, 505);
					me._autorotate_start.style.opacity=0;
				}
				else {
					me._autorotate_start.style.visibility=me._autorotate_start.ggVisible?'inherit':'hidden';
					me._autorotate_start.style.opacity=1;
				}
			}
		}
		me._autorotate_start.onmouseover=function (e) {
			me._autorotate_start__img.style.visibility='hidden';
			me._autorotate_start__imgo.style.visibility='inherit';
		}
		me._autorotate_start.onmouseout=function (e) {
			me._autorotate_start__img.style.visibility='inherit';
			me._autorotate_start__imgo.style.visibility='hidden';
		}
		me._autorotate_start.ggUpdatePosition=function (useTransition) {
		}
		me._autorotate_buttons.appendChild(me._autorotate_start);
		el=me._autorotate_stop=document.createElement('div');
		els=me._autorotate_stop__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjUsMTIuNSwxMi41YzYuOTAzLDAsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI4LjQ5OCw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDdjLTEuODMzLDEuODMxLTQuMzUyLDIuOTU5LTcuMTQ2LDIuOTYx'+
			'Yy0yLjc5Ni0wLjAwMi01LjMxNS0xLjEzLTcuMTQ3LTIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtDNy4wMjEsMjEuMzE0LDUuODkzLDE4Ljc5NSw1Ljg5MiwxNmMwLjAwMS0yLjc5NSwxLjEzLTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTU5LDcuMTQ3LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTZjMS44MzEsMS44MzMsMi45Niw0LjM1MiwyLjk2LDcuMTQ3UzI0Ljk3OCwyMS4zMTQsMjMuMTQ2LDIzLjE0N3ogTTIzLjkwNywxMy4zOTImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43NjMtMS4wMjQtMS45MDYtMS43Nz'+
			'YtMy4yNjItMi4zMDVDMTkuMjg3LDEwLjU2MiwxNy43LDEwLjI3LDE2LDEwLjI2OWMtMi4yNjgsMC4wMDMtNC4zMzMsMC41MTYtNS45MjUsMS40MjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43OTUsMC40NTYtMS40NzcsMS4wMTYtMS45ODMsMS43Yy0wLjUwNSwwLjY4LTAuODI4LDEuNTA4LTAuODI2LDIuMzkyYy0wLjAwMiwwLjgxOSwwLjI3NiwxLjU5NSwwLjcyMiwyLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDQ1LDAuNjUxLDEuMDQ5LDEuMTk0LDEuNzU1LDEuNjQ2YzAuMTk5LDAuMTI4LDAuNDIzLDAuMTg4LDAuNjQzLDAuMTg4YzAuMzk1LDAsMC43ODEtMC4xOTUsMS4wMDktMC41NTMm'+
			'I3hkOyYjeGE7JiN4OTsmI3g5O2MwLjM1Ni0wLjU1NywwLjE5My0xLjI5Ni0wLjM2My0xLjY1MWwtMC4wMDEtMC4wMDFjLTAuNDktMC4zMTItMC44NDgtMC42NTUtMS4wNjUtMC45NzdjLTAuMjE4LTAuMzI0LTAuMzA0LTAuNjA4LTAuMzA2LTAuODk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4wMDItMC4zMSwwLjEwMi0wLjYxNywwLjM1OC0wLjk3MWMwLjM4MS0wLjUyNSwxLjE1LTEuMDkyLDIuMi0xLjQ5NWMxLjA0OC0wLjQwNiwyLjM2MS0wLjY1OCwzLjc4My0wLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuODk1LTAuMDAzLDMuNTk5LDAuNDUxLDQuNzM0LDEuMTA3YzAuNTY5LDAuMzI1LDAuOT'+
			'kyLDAuNjk2LDEuMjQ4LDEuMDQ1YzAuMjU4LDAuMzU0LDAuMzU2LDAuNjYxLDAuMzU4LDAuOTcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4wMDUsMC41MDMtMC4zMDUsMS4xMDUtMS4xMzUsMS43MTJjLTAuNTM2LDAuMzg3LTAuNjU2LDEuMTM1LTAuMjcxLDEuNjcxYzAuMzg3LDAuNTM1LDEuMTM1LDAuNjU2LDEuNjcxLDAuMjcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS4yMTItMC44NjcsMi4xMjMtMi4xMywyLjEyNy0zLjY1M0MyNC43MzUsMTQuOSwyNC40MTIsMTQuMDcyLDIzLjkwNywxMy4zOTJ6IE0xOS4zNjQsMTYuMTgyYy0wLjQ2OC0wLjQ2Ny0xLjIyNi0wLjQ2Ny0xLjY5MiwwJiN4ZDsmI3hh'+
			'OyYjeDk7JiN4OTtsLTEuNTU3LDEuNTU4bC0xLjU1OC0xLjU1OGMtMC40NjctMC40NjctMS4yMjQtMC40NjctMS42OTEsMGMtMC40NjcsMC40NjctMC40NjcsMS4yMjUsMCwxLjY5MmwxLjU1NywxLjU1N2wtMS41NTcsMS41NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjcsMC40NjgtMC40NjcsMS4yMjYsMCwxLjY5MmMwLjIzMywwLjIzMywwLjU0LDAuMzUxLDAuODQ2LDAuMzUxYzAuMzA3LDAsMC42MTItMC4xMTcsMC44NDYtMC4zNTFsMS41NTgtMS41NThsMS41NTcsMS41NTgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjIzMywwLjIzMywwLjU0LDAuMzUxLDAuODQ2LDAuMzUxYzAuMzA3LDAsMC'+
			'42MTItMC4xMTcsMC44NDctMC4zNTFjMC40NjctMC40NjcsMC40NjctMS4yMjUsMC0xLjY5MmwtMS41NTgtMS41NTdsMS41NTgtMS41NTcmI3hkOyYjeGE7JiN4OTsmI3g5O0MxOS44MzEsMTcuNDA2LDE5LjgzMSwxNi42NDgsMTkuMzY0LDE2LjE4MnoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTA0LDUuNTk2LDEyLjUsMTIuNSwxMi41YzYuOTAzLDAsMTIuNDk5LTUuNTk2LDEyLjUtMTIuNSYjeGQ7JiN4'+
			'YTsmI3g5OyYjeDk7QzI4LjQ5OCw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDdjLTEuODMzLDEuODMxLTQuMzUyLDIuOTU5LTcuMTQ2LDIuOTYxYy0yLjc5Ni0wLjAwMi01LjMxNS0xLjEzLTcuMTQ3LTIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtDNy4wMjEsMjEuMzE0LDUuODkzLDE4Ljc5NSw1Ljg5MiwxNmMwLjAwMS0yLjc5NSwxLjEzLTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTU5LDcuMTQ3LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTZjMS44MzEsMS44MzMsMi45Niw0LjM1MiwyLj'+
			'k2LDcuMTQ3UzI0Ljk3OCwyMS4zMTQsMjMuMTQ2LDIzLjE0N3ogTTIzLjkwNywxMy4zOTImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43NjMtMS4wMjQtMS45MDYtMS43NzYtMy4yNjItMi4zMDVDMTkuMjg3LDEwLjU2MiwxNy43LDEwLjI3LDE2LDEwLjI2OWMtMi4yNjgsMC4wMDMtNC4zMzMsMC41MTYtNS45MjUsMS40MjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43OTUsMC40NTYtMS40NzcsMS4wMTYtMS45ODMsMS43Yy0wLjUwNSwwLjY4LTAuODI4LDEuNTA4LTAuODI2LDIuMzkyYy0wLjAwMiwwLjgxOSwwLjI3NiwxLjU5NSwwLjcyMiwyLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDQ1LDAu'+
			'NjUxLDEuMDQ5LDEuMTk0LDEuNzU1LDEuNjQ2YzAuMTk5LDAuMTI4LDAuNDIzLDAuMTg4LDAuNjQzLDAuMTg4YzAuMzk1LDAsMC43ODEtMC4xOTUsMS4wMDktMC41NTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjM1Ni0wLjU1NywwLjE5My0xLjI5Ni0wLjM2My0xLjY1MWwtMC4wMDEtMC4wMDFjLTAuNDktMC4zMTItMC44NDgtMC42NTUtMS4wNjUtMC45NzdjLTAuMjE4LTAuMzI0LTAuMzA0LTAuNjA4LTAuMzA2LTAuODk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4wMDItMC4zMSwwLjEwMi0wLjYxNywwLjM1OC0wLjk3MWMwLjM4MS0wLjUyNSwxLjE1LTEuMDkyLDIuMi0xLjQ5NWMxLjA0OC0wLjQwNi'+
			'wyLjM2MS0wLjY1OCwzLjc4My0wLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuODk1LTAuMDAzLDMuNTk5LDAuNDUxLDQuNzM0LDEuMTA3YzAuNTY5LDAuMzI1LDAuOTkyLDAuNjk2LDEuMjQ4LDEuMDQ1YzAuMjU4LDAuMzU0LDAuMzU2LDAuNjYxLDAuMzU4LDAuOTcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4wMDUsMC41MDMtMC4zMDUsMS4xMDUtMS4xMzUsMS43MTJjLTAuNTM2LDAuMzg3LTAuNjU2LDEuMTM1LTAuMjcxLDEuNjcxYzAuMzg3LDAuNTM1LDEuMTM1LDAuNjU2LDEuNjcxLDAuMjcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS4yMTItMC44NjcsMi4xMjMtMi4xMywyLjEyNy0zLjY1M0My'+
			'NC43MzUsMTQuOSwyNC40MTIsMTQuMDcyLDIzLjkwNywxMy4zOTJ6IE0xOS4zNjQsMTYuMTgyYy0wLjQ2OC0wLjQ2Ny0xLjIyNi0wLjQ2Ny0xLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTEuNTU3LDEuNTU4bC0xLjU1OC0xLjU1OGMtMC40NjctMC40NjctMS4yMjQtMC40NjctMS42OTEsMGMtMC40NjcsMC40NjctMC40NjcsMS4yMjUsMCwxLjY5MmwxLjU1NywxLjU1N2wtMS41NTcsMS41NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjcsMC40NjgtMC40NjcsMS4yMjYsMCwxLjY5MmMwLjIzMywwLjIzMywwLjU0LDAuMzUxLDAuODQ2LDAuMzUxYzAuMzA3LDAsMC42MTItMC4xMTcsMC44ND'+
			'YtMC4zNTFsMS41NTgtMS41NThsMS41NTcsMS41NTgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjIzMywwLjIzMywwLjU0LDAuMzUxLDAuODQ2LDAuMzUxYzAuMzA3LDAsMC42MTItMC4xMTcsMC44NDctMC4zNTFjMC40NjctMC40NjcsMC40NjctMS4yMjUsMC0xLjY5MmwtMS41NTgtMS41NTdsMS41NTgtMS41NTcmI3hkOyYjeGE7JiN4OTsmI3g5O0MxOS44MzEsMTcuNDA2LDE5LjgzMSwxNi42NDgsMTkuMzY0LDE2LjE4MnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._autorotate_stop__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._autorotate_stop__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2YzAsNi45MDQsNS41OTYsMTIuNSwxMi41LDEyLjVjNi45MDMsMCwxMi40OTktNS41OTYsMTIuNS0xMi41JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjguNDk4LDkuMDk2LDIyLjkwMywzLjUs'+
			'MTYsMy41eiBNMjMuMTQ2LDIzLjE0N2MtMS44MzMsMS44MzEtNC4zNTIsMi45NTktNy4xNDYsMi45NjFjLTIuNzk2LTAuMDAyLTUuMzE1LTEuMTMtNy4xNDctMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5O0M3LjAyMSwyMS4zMTQsNS44OTMsMTguNzk1LDUuODkyLDE2YzAuMDAxLTIuNzk1LDEuMTMtNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45NTksNy4xNDctMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NmMxLjgzMSwxLjgzMywyLjk2LDQuMzUyLDIuOTYsNy4xNDdTMjQuOTc4LDIxLjMxNCwyMy4xNDYsMjMuMTQ3ei'+
			'BNMjMuOTA3LDEzLjM5MiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjc2My0xLjAyNC0xLjkwNi0xLjc3Ni0zLjI2Mi0yLjMwNUMxOS4yODcsMTAuNTYyLDE3LjcsMTAuMjcsMTYsMTAuMjY5Yy0yLjI2OCwwLjAwMy00LjMzMywwLjUxNi01LjkyNSwxLjQyNCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjc5NSwwLjQ1Ni0xLjQ3NywxLjAxNi0xLjk4MywxLjdjLTAuNTA1LDAuNjgtMC44MjgsMS41MDgtMC44MjYsMi4zOTJjLTAuMDAyLDAuODE5LDAuMjc2LDEuNTk1LDAuNzIyLDIuMjQzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NDUsMC42NTEsMS4wNDksMS4xOTQsMS43NTUsMS42NDZjMC4xOTksMC4x'+
			'MjgsMC40MjMsMC4xODgsMC42NDMsMC4xODhjMC4zOTUsMCwwLjc4MS0wLjE5NSwxLjAwOS0wLjU1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMzU2LTAuNTU3LDAuMTkzLTEuMjk2LTAuMzYzLTEuNjUxbC0wLjAwMS0wLjAwMWMtMC40OS0wLjMxMi0wLjg0OC0wLjY1NS0xLjA2NS0wLjk3N2MtMC4yMTgtMC4zMjQtMC4zMDQtMC42MDgtMC4zMDYtMC44OTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjAwMi0wLjMxLDAuMTAyLTAuNjE3LDAuMzU4LTAuOTcxYzAuMzgxLTAuNTI1LDEuMTUtMS4wOTIsMi4yLTEuNDk1YzEuMDQ4LTAuNDA2LDIuMzYxLTAuNjU4LDMuNzgzLTAuNjU3JiN4ZDsmI3hhOyYjeD'+
			'k7JiN4OTtjMS44OTUtMC4wMDMsMy41OTksMC40NTEsNC43MzQsMS4xMDdjMC41NjksMC4zMjUsMC45OTIsMC42OTYsMS4yNDgsMS4wNDVjMC4yNTgsMC4zNTQsMC4zNTYsMC42NjEsMC4zNTgsMC45NzEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjAwNSwwLjUwMy0wLjMwNSwxLjEwNS0xLjEzNSwxLjcxMmMtMC41MzYsMC4zODctMC42NTYsMS4xMzUtMC4yNzEsMS42NzFjMC4zODcsMC41MzUsMS4xMzUsMC42NTYsMS42NzEsMC4yNzEmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjIxMi0wLjg2NywyLjEyMy0yLjEzLDIuMTI3LTMuNjUzQzI0LjczNSwxNC45LDI0LjQxMiwxNC4wNzIsMjMuOTA3LDEzLjM5'+
			'MnogTTE5LjM2NCwxNi4xODJjLTAuNDY4LTAuNDY3LTEuMjI2LTAuNDY3LTEuNjkyLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMS41NTcsMS41NThsLTEuNTU4LTEuNTU4Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNC0wLjQ2Ny0xLjY5MSwwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkybDEuNTU3LDEuNTU3bC0xLjU1NywxLjU1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2OC0wLjQ2NywxLjIyNiwwLDEuNjkyYzAuMjMzLDAuMjMzLDAuNTQsMC4zNTEsMC44NDYsMC4zNTFjMC4zMDcsMCwwLjYxMi0wLjExNywwLjg0Ni0wLjM1MWwxLjU1OC0xLjU1OGwxLjU1NywxLjU1OCYjeGQ7Ji'+
			'N4YTsmI3g5OyYjeDk7YzAuMjMzLDAuMjMzLDAuNTQsMC4zNTEsMC44NDYsMC4zNTFjMC4zMDcsMCwwLjYxMi0wLjExNywwLjg0Ny0wLjM1MWMwLjQ2Ny0wLjQ2NywwLjQ2Ny0xLjIyNSwwLTEuNjkybC0xLjU1OC0xLjU1N2wxLjU1OC0xLjU1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE5LjgzMSwxNy40MDYsMTkuODMxLDE2LjY0OCwxOS4zNjQsMTYuMTgyeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIw'+
			'LjIiPgogIDxwYXRoIGQ9Ik0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwNCw1LjU5NiwxMi41LDEyLjUsMTIuNWM2LjkwMywwLDEyLjQ5OS01LjU5NiwxMi41LTEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOC40OTgsOS4wOTYsMjIuOTAzLDMuNSwxNiwzLjV6IE0yMy4xNDYsMjMuMTQ3Yy0xLjgzMywxLjgzMS00LjM1MiwyLjk1OS03LjE0NiwyLjk2MWMtMi43OTYtMC4wMDItNS4zMTUtMS4xMy03LjE0Ny0yLjk2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7QzcuMDIxLDIxLjMxNCw1Ljg5MywxOC43OTUsNS44OTIsMTZjMC4wMDEtMi43OTUsMS4xMy01LjMxNCwyLjk2MS03Lj'+
			'E0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk1OSw3LjE0Ny0yLjk2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NiwyLjk2YzEuODMxLDEuODMzLDIuOTYsNC4zNTIsMi45Niw3LjE0N1MyNC45NzgsMjEuMzE0LDIzLjE0NiwyMy4xNDd6IE0yMy45MDcsMTMuMzkyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNzYzLTEuMDI0LTEuOTA2LTEuNzc2LTMuMjYyLTIuMzA1QzE5LjI4NywxMC41NjIsMTcuNywxMC4yNywxNiwxMC4yNjljLTIuMjY4LDAuMDAzLTQuMzMzLDAuNTE2LTUuOTI1LDEuNDI0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNzk1LDAuNDU2LTEuNDc3'+
			'LDEuMDE2LTEuOTgzLDEuN2MtMC41MDUsMC42OC0wLjgyOCwxLjUwOC0wLjgyNiwyLjM5MmMtMC4wMDIsMC44MTksMC4yNzYsMS41OTUsMC43MjIsMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQ0NSwwLjY1MSwxLjA0OSwxLjE5NCwxLjc1NSwxLjY0NmMwLjE5OSwwLjEyOCwwLjQyMywwLjE4OCwwLjY0MywwLjE4OGMwLjM5NSwwLDAuNzgxLTAuMTk1LDEuMDA5LTAuNTUzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zNTYtMC41NTcsMC4xOTMtMS4yOTYtMC4zNjMtMS42NTFsLTAuMDAxLTAuMDAxYy0wLjQ5LTAuMzEyLTAuODQ4LTAuNjU1LTEuMDY1LTAuOTc3Yy0wLjIxOC0wLjMyNC0wLjMwNC'+
			'0wLjYwOC0wLjMwNi0wLjg5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDAyLTAuMzEsMC4xMDItMC42MTcsMC4zNTgtMC45NzFjMC4zODEtMC41MjUsMS4xNS0xLjA5MiwyLjItMS40OTVjMS4wNDgtMC40MDYsMi4zNjEtMC42NTgsMy43ODMtMC42NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjg5NS0wLjAwMywzLjU5OSwwLjQ1MSw0LjczNCwxLjEwN2MwLjU2OSwwLjMyNSwwLjk5MiwwLjY5NiwxLjI0OCwxLjA0NWMwLjI1OCwwLjM1NCwwLjM1NiwwLjY2MSwwLjM1OCwwLjk3MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDA1LDAuNTAzLTAuMzA1LDEuMTA1LTEuMTM1LDEuNzEyYy0wLjUzNiwwLjM4'+
			'Ny0wLjY1NiwxLjEzNS0wLjI3MSwxLjY3MWMwLjM4NywwLjUzNSwxLjEzNSwwLjY1NiwxLjY3MSwwLjI3MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuMjEyLTAuODY3LDIuMTIzLTIuMTMsMi4xMjctMy42NTNDMjQuNzM1LDE0LjksMjQuNDEyLDE0LjA3MiwyMy45MDcsMTMuMzkyeiBNMTkuMzY0LDE2LjE4MmMtMC40NjgtMC40NjctMS4yMjYtMC40NjctMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0xLjU1NywxLjU1OGwtMS41NTgtMS41NThjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDBjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJsMS41NTcsMS41NTdsLTEuNTU3LD'+
			'EuNTU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY4LTAuNDY3LDEuMjI2LDAsMS42OTJjMC4yMzMsMC4yMzMsMC41NCwwLjM1MSwwLjg0NiwwLjM1MWMwLjMwNywwLDAuNjEyLTAuMTE3LDAuODQ2LTAuMzUxbDEuNTU4LTEuNTU4bDEuNTU3LDEuNTU4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yMzMsMC4yMzMsMC41NCwwLjM1MSwwLjg0NiwwLjM1MWMwLjMwNywwLDAuNjEyLTAuMTE3LDAuODQ3LTAuMzUxYzAuNDY3LTAuNDY3LDAuNDY3LTEuMjI1LDAtMS42OTJsLTEuNTU4LTEuNTU3bDEuNTU4LTEuNTU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTkuODMxLDE3LjQwNiwxOS44MzEsMTYu'+
			'NjQ4LDE5LjM2NCwxNi4xODJ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._autorotate_stop__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="autorotate_stop";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._autorotate_stop.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._autorotate_stop.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsAutorotating() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._autorotate_stop.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._autorotate_stop.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._autorotate_stop.style[domTransition]='opacity 500ms ease 0ms';
				if (me._autorotate_stop.ggCurrentLogicStateAlpha == 0) {
					me._autorotate_stop.style.visibility=me._autorotate_stop.ggVisible?'inherit':'hidden';
					me._autorotate_stop.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._autorotate_stop.style.opacity == 0.0) { me._autorotate_stop.style.visibility="hidden"; } }, 505);
					me._autorotate_stop.style.opacity=0;
				}
			}
		}
		me._autorotate_stop.onmouseover=function (e) {
			me._autorotate_stop__img.style.visibility='hidden';
			me._autorotate_stop__imgo.style.visibility='inherit';
		}
		me._autorotate_stop.onmouseout=function (e) {
			me._autorotate_stop__img.style.visibility='inherit';
			me._autorotate_stop__imgo.style.visibility='hidden';
		}
		me._autorotate_stop.ggUpdatePosition=function (useTransition) {
		}
		me._autorotate_buttons.appendChild(me._autorotate_stop);
		el=me._tt_rotate=document.createElement('div');
		els=me._tt_rotate__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_rotate";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_rotate.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_rotate.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_rotate.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_rotate.style[domTransition]='left 0s, top 0s';
				if (me._tt_rotate.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_rotate.style.top='-25px';
					me._tt_rotate.ggUpdatePosition(true);
				}
				else {
					me._tt_rotate.ggDx=0;
					me._tt_rotate.style.top='32px';
					me._tt_rotate.ggUpdatePosition(true);
				}
			}
		}
		me._tt_rotate.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['autorotate_buttons'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_rotate.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_rotate.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_rotate.style[domTransition]='left 0s, top 0s';
				if (me._tt_rotate.ggCurrentLogicStateVisible == 0) {
					me._tt_rotate.style.visibility=(Number(me._tt_rotate.style.opacity)>0||!me._tt_rotate.style.opacity)?'inherit':'hidden';
					me._tt_rotate.ggVisible=true;
				}
				else {
					me._tt_rotate.style.visibility="hidden";
					me._tt_rotate.ggVisible=false;
				}
			}
		}
		me._tt_rotate.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getIsAutorotating() == true))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((player.getIsAutorotating() == false))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_rotate.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_rotate.ggCurrentLogicStateText = newLogicStateText;
				me._tt_rotate.style[domTransition]='left 0s, top 0s';
				if (me._tt_rotate.ggCurrentLogicStateText == 0) {
					me._tt_rotate.ggText="\u505c\u6b62\u65cb\u8f6c";
					me._tt_rotate__text.innerHTML=me._tt_rotate.ggText;
					if (me._tt_rotate.ggUpdateText) {
					me._tt_rotate.ggUpdateText=function() {
						var hs="\u505c\u6b62\u65cb\u8f6c";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_rotate.ggUpdatePosition) me._tt_rotate.ggUpdatePosition();
					}
				}
				else if (me._tt_rotate.ggCurrentLogicStateText == 1) {
					me._tt_rotate.ggText="\u81ea\u52a8\u65cb\u8f6c";
					me._tt_rotate__text.innerHTML=me._tt_rotate.ggText;
					if (me._tt_rotate.ggUpdateText) {
					me._tt_rotate.ggUpdateText=function() {
						var hs="\u81ea\u52a8\u65cb\u8f6c";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_rotate.ggUpdatePosition) me._tt_rotate.ggUpdatePosition();
					}
				}
				else {
					me._tt_rotate.ggText="";
					me._tt_rotate__text.innerHTML=me._tt_rotate.ggText;
					if (me._tt_rotate.ggUpdateText) {
					me._tt_rotate.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_rotate.ggUpdatePosition) me._tt_rotate.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_rotate.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._autorotate_buttons.appendChild(me._tt_rotate);
		me._controller_slider.appendChild(me._autorotate_buttons);
		el=me._zoomout=document.createElement('div');
		els=me._zoomout__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwz'+
			'LjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi'+
			'45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMjEuNzU4LDE0LjgwNEgxMC4yNDFjLTAuNjYsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NmMwLDAuNjYx'+
			'LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDExLjUxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NkMyMi45NTUsMTUuMzM5LDIyLjQxOSwxNC44MDQsMjEuNzU4LDE0LjgwNHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTEuODMyLD'+
			'EuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+Cjwvc3ZnPgo='+
			'';
		me._zoomout__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomout__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjEuNzU4LDE0LjgwNEgxMC4yNDFjLTAuNjYsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDExLjUxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwx'+
			'LjE5Ny0xLjE5NkMyMi45NTUsMTUuMzM5LDIyLjQxOSwxNC44MDQsMjEuNzU4LDE0LjgwNHogTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjVDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NkM3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LD'+
			'UuODkzLDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxYzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgt'+
			'MTYsLTE2KSIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTIxLjc1OCwxNC44MDRIMTAuMjQxYy0wLjY2LDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxMS41MTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZDMjIuOTU1LDE1LjMzOSwyMi40MTksMTQuODA0LDIxLjc1OCwxNC44MDR6IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMT'+
			'IuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41QzI4LjQ5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTZDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MWMyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxJiN4'+
			'ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LDIxLjMxNCwyMy4xNDYsMjMuMTQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._zoomout__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomout.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_zoom') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoomout.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoomout.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoomout.style[domTransition]='';
				if (me._zoomout.ggCurrentLogicStateVisible == 0) {
					me._zoomout.style.visibility=(Number(me._zoomout.style.opacity)>0||!me._zoomout.style.opacity)?'inherit':'hidden';
					me._zoomout.ggVisible=true;
				}
				else {
					me._zoomout.style.visibility="hidden";
					me._zoomout.ggVisible=false;
				}
			}
		}
		me._zoomout.onmouseover=function (e) {
			me._zoomout__img.style.visibility='hidden';
			me._zoomout__imgo.style.visibility='inherit';
			me.elementMouseOver['zoomout']=true;
			me._tt_zoomout.logicBlock_visible();
		}
		me._zoomout.onmouseout=function (e) {
			me._zoomout__img.style.visibility='inherit';
			me._zoomout__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomout']=false;
			me.elementMouseOver['zoomout']=false;
			me._tt_zoomout.logicBlock_visible();
		}
		me._zoomout.onmousedown=function (e) {
			me.elementMouseDown['zoomout']=true;
		}
		me._zoomout.onmouseup=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ontouchend=function (e) {
			me.elementMouseDown['zoomout']=false;
			me.elementMouseOver['zoomout']=false;
			me._tt_zoomout.logicBlock_visible();
		}
		me._zoomout.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomout=document.createElement('div');
		els=me._tt_zoomout__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomout";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u7f29\u5c0f";
		el.appendChild(els);
		me._tt_zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomout.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_zoomout.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_zoomout.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_zoomout.style[domTransition]='left 0s, top 0s';
				if (me._tt_zoomout.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_zoomout.style.top='-25px';
					me._tt_zoomout.ggUpdatePosition(true);
				}
				else {
					me._tt_zoomout.ggDx=0;
					me._tt_zoomout.style.top='32px';
					me._tt_zoomout.ggUpdatePosition(true);
				}
			}
		}
		me._tt_zoomout.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['zoomout'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_zoomout.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_zoomout.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_zoomout.style[domTransition]='left 0s, top 0s';
				if (me._tt_zoomout.ggCurrentLogicStateVisible == 0) {
					me._tt_zoomout.style.visibility=(Number(me._tt_zoomout.style.opacity)>0||!me._tt_zoomout.style.opacity)?'inherit':'hidden';
					me._tt_zoomout.ggVisible=true;
				}
				else {
					me._tt_zoomout.style.visibility="hidden";
					me._tt_zoomout.ggVisible=false;
				}
			}
		}
		me._tt_zoomout.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._zoomout.appendChild(me._tt_zoomout);
		me._controller_slider.appendChild(me._zoomout);
		el=me._zoomin=document.createElement('div');
		els=me._zoomin__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTIyLjA2MSwxNC44MDNoLTQuODY0VjkuOTM4YzAtMC42NjEtMC41MzYtMS4xOTctMS4xOTctMS4xOTdjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N3Y0Ljg2NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtIOS45MzhjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTdjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDQuODY2'+
			'djQuODY1YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtNC44NjVoNC44NjRjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NkMyMy4yNTcsMTUuMzM5LDIyLjcyMiwxNC44MDMsMjIuMDYxLDE0LjgwM3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xNiwzLjVDOS4wOTYsMy41LDMuNSw5LjA5NiwzLjUsMTZjMCw2LjkwMyw1LjU5NiwxMi40OTksMTIuNSwxMi41YzYuOTAzLTAuMDAxLDEyLjQ5OS01LjU5NywxMi41LTEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzI4Lj'+
			'Q5OSw5LjA5NiwyMi45MDMsMy41LDE2LDMuNXogTTIzLjE0NiwyMy4xNDZjLTEuODMyLDEuODMxLTQuMzUyLDIuOTYtNy4xNDYsMi45NnMtNS4zMTQtMS4xMjktNy4xNDYtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMjEuMzE0LDUuODk0LDE4Ljc5NSw1Ljg5MywxNmMwLjAwMS0yLjc5NSwxLjEyOS01LjMxNCwyLjk2MS03LjE0N2MxLjgzMy0xLjgzMSw0LjM1Mi0yLjk2LDcuMTQ2LTIuOTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLjAwMSw1LjMxMywxLjEzLDcuMTQ2LDIuOTYxYzEuODMyLDEuODMzLDIuOTYsNC4zNTIsMi45NjEsNy4xNDdDMjYuMTA2LDE4'+
			'Ljc5NSwyNC45NzksMjEuMzE0LDIzLjE0NiwyMy4xNDZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yMi4wNjEsMTQuODAzaC00Ljg2NFY5LjkzOGMwLTAuNjYxLTAuNTM2LTEuMTk3LTEuMTk3LTEuMTk3Yy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTd2NC44NjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7SDkuOTM4Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5Nmg0Ljg2NnY0Ljg2NWMwLDAuNj'+
			'YsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTQuODY1aDQuODY0YzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZDMjMuMjU3LDE1LjMzOSwyMi43MjIsMTQuODAzLDIyLjA2MSwxNC44MDN6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMTYsMy41QzkuMDk2LDMuNSwzLjUsOS4wOTYsMy41LDE2YzAsNi45MDMsNS41OTYsMTIuNDk5LDEyLjUsMTIuNWM2LjkwMy0wLjAwMSwxMi40OTktNS41OTcsMTIuNS0xMi41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MyOC40OTksOS4wOTYsMjIu'+
			'OTAzLDMuNSwxNiwzLjV6IE0yMy4xNDYsMjMuMTQ2Yy0xLjgzMiwxLjgzMS00LjM1MiwyLjk2LTcuMTQ2LDIuOTZzLTUuMzE0LTEuMTI5LTcuMTQ2LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDIxLjMxNCw1Ljg5NCwxOC43OTUsNS44OTMsMTZjMC4wMDEtMi43OTUsMS4xMjktNS4zMTQsMi45NjEtNy4xNDdjMS44MzMtMS44MzEsNC4zNTItMi45Niw3LjE0Ni0yLjk2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMC4wMDEsNS4zMTMsMS4xMyw3LjE0NiwyLjk2MWMxLjgzMiwxLjgzMywyLjk2LDQuMzUyLDIuOTYxLDcuMTQ3QzI2LjEwNiwxOC43OTUsMjQuOTc5LD'+
			'IxLjMxNCwyMy4xNDYsMjMuMTQ2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._zoomin__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomin__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjIuMDYxLDE0LjgwM2gtNC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3djQuODY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0g5LjkzOGMtMC42NjEsMC0x'+
			'LjE5NiwwLjUzNi0xLjE5NiwxLjE5N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTE2LDMuNUM5LjA5NiwzLjUsMy41LDkuMDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MD'+
			'MtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45NjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAuMDAxLDUuMzEzLDEu'+
			'MTMsNy4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMjIuMDYxLDE0LjgwM2gtNC44NjRWOS45MzhjMC0wLjY2MS0wLjUzNi0xLjE5Ny0xLjE5Ny0xLjE5N2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk3dj'+
			'QuODY1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0g5LjkzOGMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5N2MwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoNC44NjZ2NC44NjVjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di00Ljg2NWg0Ljg2NGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2QzIzLjI1NywxNS4zMzksMjIuNzIyLDE0LjgwMywyMi4wNjEsMTQuODAzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTE2LDMuNUM5LjA5NiwzLjUsMy41LDku'+
			'MDk2LDMuNSwxNmMwLDYuOTAzLDUuNTk2LDEyLjQ5OSwxMi41LDEyLjVjNi45MDMtMC4wMDEsMTIuNDk5LTUuNTk3LDEyLjUtMTIuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjguNDk5LDkuMDk2LDIyLjkwMywzLjUsMTYsMy41eiBNMjMuMTQ2LDIzLjE0NmMtMS44MzIsMS44MzEtNC4zNTIsMi45Ni03LjE0NiwyLjk2cy01LjMxNC0xLjEyOS03LjE0Ni0yLjk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwyMS4zMTQsNS44OTQsMTguNzk1LDUuODkzLDE2YzAuMDAxLTIuNzk1LDEuMTI5LTUuMzE0LDIuOTYxLTcuMTQ3YzEuODMzLTEuODMxLDQuMzUyLTIuOTYsNy4xNDYtMi45Nj'+
			'EmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAuMDAxLDUuMzEzLDEuMTMsNy4xNDYsMi45NjFjMS44MzIsMS44MzMsMi45Niw0LjM1MiwyLjk2MSw3LjE0N0MyNi4xMDYsMTguNzk1LDI0Ljk3OSwyMS4zMTQsMjMuMTQ2LDIzLjE0NnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomin__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomin.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_zoom') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoomin.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoomin.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoomin.style[domTransition]='';
				if (me._zoomin.ggCurrentLogicStateVisible == 0) {
					me._zoomin.style.visibility=(Number(me._zoomin.style.opacity)>0||!me._zoomin.style.opacity)?'inherit':'hidden';
					me._zoomin.ggVisible=true;
				}
				else {
					me._zoomin.style.visibility="hidden";
					me._zoomin.ggVisible=false;
				}
			}
		}
		me._zoomin.onmouseover=function (e) {
			me._zoomin__img.style.visibility='hidden';
			me._zoomin__imgo.style.visibility='inherit';
			me.elementMouseOver['zoomin']=true;
			me._tt_zoomin.logicBlock_visible();
		}
		me._zoomin.onmouseout=function (e) {
			me._zoomin__img.style.visibility='inherit';
			me._zoomin__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomin']=false;
			me.elementMouseOver['zoomin']=false;
			me._tt_zoomin.logicBlock_visible();
		}
		me._zoomin.onmousedown=function (e) {
			me.elementMouseDown['zoomin']=true;
		}
		me._zoomin.onmouseup=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ontouchend=function (e) {
			me.elementMouseDown['zoomin']=false;
			me.elementMouseOver['zoomin']=false;
			me._tt_zoomin.logicBlock_visible();
		}
		me._zoomin.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_zoomin=document.createElement('div');
		els=me._tt_zoomin__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_zoomin";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u653e\u5927";
		el.appendChild(els);
		me._tt_zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_zoomin.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_zoomin.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_zoomin.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_zoomin.style[domTransition]='left 0s, top 0s';
				if (me._tt_zoomin.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_zoomin.style.top='-25px';
					me._tt_zoomin.ggUpdatePosition(true);
				}
				else {
					me._tt_zoomin.ggDx=0;
					me._tt_zoomin.style.top='32px';
					me._tt_zoomin.ggUpdatePosition(true);
				}
			}
		}
		me._tt_zoomin.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['zoomin'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_zoomin.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_zoomin.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_zoomin.style[domTransition]='left 0s, top 0s';
				if (me._tt_zoomin.ggCurrentLogicStateVisible == 0) {
					me._tt_zoomin.style.visibility=(Number(me._tt_zoomin.style.opacity)>0||!me._tt_zoomin.style.opacity)?'inherit':'hidden';
					me._tt_zoomin.ggVisible=true;
				}
				else {
					me._tt_zoomin.style.visibility="hidden";
					me._tt_zoomin.ggVisible=false;
				}
			}
		}
		me._tt_zoomin.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._zoomin.appendChild(me._tt_zoomin);
		me._controller_slider.appendChild(me._zoomin);
		el=me._key_up=document.createElement('div');
		el.ggId="key_up";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_up.onmouseout=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.onmousedown=function (e) {
			me.elementMouseDown['key_up']=true;
		}
		me._key_up.onmouseup=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.ontouchend=function (e) {
			me.elementMouseDown['key_up']=false;
		}
		me._key_up.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_up);
		el=me._key_down=document.createElement('div');
		el.ggId="key_down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_down.onmouseout=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.onmousedown=function (e) {
			me.elementMouseDown['key_down']=true;
		}
		me._key_down.onmouseup=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.ontouchend=function (e) {
			me.elementMouseDown['key_down']=false;
		}
		me._key_down.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_down);
		el=me._key_left=document.createElement('div');
		el.ggId="key_left";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_left.onmouseout=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.onmousedown=function (e) {
			me.elementMouseDown['key_left']=true;
		}
		me._key_left.onmouseup=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.ontouchend=function (e) {
			me.elementMouseDown['key_left']=false;
		}
		me._key_left.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_left);
		el=me._key_right=document.createElement('div');
		el.ggId="key_right";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._key_right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._key_right.onmouseout=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.onmousedown=function (e) {
			me.elementMouseDown['key_right']=true;
		}
		me._key_right.onmouseup=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.ontouchend=function (e) {
			me.elementMouseDown['key_right']=false;
		}
		me._key_right.ggUpdatePosition=function (useTransition) {
		}
		me._controller_slider.appendChild(me._key_right);
		me._controller.appendChild(me._controller_slider);
		el=me._element_alpha_timer=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=1000;
		el.ggId="element_alpha_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._element_alpha_timer.ggIsActive=function() {
			return (me._element_alpha_timer.ggTimestamp + me._element_alpha_timer.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._element_alpha_timer.ggDeactivate=function () {
			player.setVariableValue('vis_timer', true);
		}
		me._element_alpha_timer.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._element_alpha_timer);
		me.divSkin.appendChild(me._controller);
		el=me._thumbnail_menu=document.createElement('div');
		els=me._thumbnail_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 89px;';
		hs+='left : 50%;';
		hs+='margin-left : -69.5px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 139px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
			me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth)) {
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
					me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
			me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
					me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._thumbnail_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._thumbnail_menu__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggDragInertiaY *= 0.65;
					me._thumbnail_menu.ggScrollByX(-me._thumbnail_menu.ggDragInertiaX);
					me._thumbnail_menu.ggScrollByY(-me._thumbnail_menu.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_menu.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._thumbnail_menu__content.ontouchend = null;
				me._thumbnail_menu__content.ontouchmove = null;
				me._thumbnail_menu__content.onpointerup = null;
				me._thumbnail_menu__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._thumbnail_menu__content.onpointerup = me._thumbnail_menu__content.ontouchend;
		}
			me._thumbnail_menu__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._thumbnail_menu.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._thumbnail_menu.ggDragLastY;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragInertiaY = diffY;
				me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._thumbnail_menu.ggScrollByX(-diffX);
				me._thumbnail_menu.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._thumbnail_menu__content.onpointermove = me._thumbnail_menu__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(255,255,255,0.392157); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(255,255,255,1); pointer-events: auto;');
		me._thumbnail_menu.ggScrollPosX = 0;
		me._thumbnail_menu.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._thumbnail_menu.ggScrollByXSmooth(20 * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='bottom : 65px;';
		hs+='height : 85px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 1;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail_menu.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._thumbnail_menu.style.bottom='-100px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
				else if (me._thumbnail_menu.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					me._thumbnail_menu.style.bottom='80px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
				else {
					me._thumbnail_menu.ggDx=0;
					me._thumbnail_menu.style.bottom='65px';
					me._thumbnail_menu.ggUpdatePosition(true);
				}
			}
		}
		me._thumbnail_menu.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_menu.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_menu.style.visibility=(Number(me._thumbnail_menu.style.opacity)>0||!me._thumbnail_menu.style.opacity)?'inherit':'hidden';
					me._thumbnail_menu.ggVisible=true;
				}
				else {
					me._thumbnail_menu.style.visibility="hidden";
					me._thumbnail_menu.ggVisible=false;
				}
			}
		}
		me._thumbnail_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_show') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getVariableValue('vis_timer') == true)) && 
				((player.getViewerSize().width > 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_menu.style.visibility=me._thumbnail_menu.ggVisible?'inherit':'hidden';
					me._thumbnail_menu.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_menu.style.opacity == 0.0) { me._thumbnail_menu.style.visibility="hidden"; } }, 505);
					me._thumbnail_menu.style.opacity=0;
				}
			}
		}
		me._thumbnail_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				var containerHeight = this.offsetHeight;
				if (this.ggHorScrollVisible) containerHeight -= 15;
				if (contentHeight < containerHeight) {
					this.ggContent.style.top = '50%';
					this.ggContent.style.marginTop = ((contentHeight/-2) - (this.ggHorScrollVisible ? (15/2) : 0))  + 'px';
				}
				else {
					this.ggContent.style.top = this.ggContentTopOffset + 'px';
					this.ggContent.style.marginTop = '0px';
				}
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu.ggHorScrollVisible = true;
				} else {
					me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu.ggHorScrollVisible = false;
				}
				if(me._thumbnail_menu.ggHorScrollVisible) {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight - 15;
					if (me._thumbnail_menu.ggVertScrollVisible) {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth - 15;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width - me._thumbnail_menu__horScrollBg.getBoundingClientRect().height;
					} else {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width;
					}
					me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
					me._thumbnail_menu.ggHPercentVisible = contentWidth != 0 ? me._thumbnail_menu.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
					me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.offsetWidth * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
					me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
					if (me._thumbnail_menu.ggHPercentVisible < 1.0) {
						me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight;
					me._thumbnail_menu.ggScrollPosX = 0;
					me._thumbnail_menu.ggScrollPosXPercent = 0.0;
				}
				if(horScrollWasVisible != me._thumbnail_menu.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu);
					me._thumbnail_menu.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.width=me._thumbnail_cloner.ggWidth + 'px';
				parameter.height=me._thumbnail_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
				}
			}
			me._thumbnail_cloner.callChildLogicBlocks_changenode();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_active();
			me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged();
			me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="thumbnail_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_cloner']=true;
		}
		me._thumbnail_cloner.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_cloner']=false;
		}
		me._thumbnail_cloner.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_cloner']=false;
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_cloner.ggNodeChange=function () {
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._thumbnail_menu);
		el=me._thumbnail_menu_mobile=document.createElement('div');
		els=me._thumbnail_menu_mobile__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 76.764px;';
		hs+='left : 50%;';
		hs+='margin-left : -59.49px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 118.98px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu_mobile.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu_mobile.ggHPercentVisible >= 1.0) return;
			me._thumbnail_menu_mobile.ggScrollPosX = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
			me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth);
			me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
			me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu_mobile.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu_mobile.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu_mobile.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu_mobile.ggScrollPosX >= me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth)) {
					me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.offsetWidth - me._thumbnail_menu_mobile__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu_mobile.ggScrollPosX <= 0)) {
					me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
			me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu_mobile.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu_mobile.ggVPercentVisible >= 1.0) return;
			me._thumbnail_menu_mobile.ggScrollPosY = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
			me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
			me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
			me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu_mobile.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu_mobile.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu_mobile.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu_mobile.ggScrollPosY >= me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu_mobile.ggScrollPosY <= 0)) {
					me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
			me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
			me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu_mobile.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu_mobile.ggHPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu_mobile.offsetWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu_mobile.offsetWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggHPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu_mobile.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu_mobile.offsetHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu_mobile.offsetHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu_mobile.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._thumbnail_menu_mobile.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._thumbnail_menu_mobile__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu_mobile.ggDragInertiaX *= 0.65;
					me._thumbnail_menu_mobile.ggDragInertiaY *= 0.65;
					me._thumbnail_menu_mobile.ggScrollByX(-me._thumbnail_menu_mobile.ggDragInertiaX);
					me._thumbnail_menu_mobile.ggScrollByY(-me._thumbnail_menu_mobile.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu_mobile.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_menu_mobile.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._thumbnail_menu_mobile__content.ontouchend = null;
				me._thumbnail_menu_mobile__content.ontouchmove = null;
				me._thumbnail_menu_mobile__content.onpointerup = null;
				me._thumbnail_menu_mobile__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._thumbnail_menu_mobile__content.onpointerup = me._thumbnail_menu_mobile__content.ontouchend;
		}
			me._thumbnail_menu_mobile__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._thumbnail_menu_mobile.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragInertiaX = diffX;
				me._thumbnail_menu_mobile.ggDragInertiaY = diffY;
				me._thumbnail_menu_mobile.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._thumbnail_menu_mobile.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._thumbnail_menu_mobile.ggScrollByX(-diffX);
				me._thumbnail_menu_mobile.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._thumbnail_menu_mobile__content.onpointermove = me._thumbnail_menu_mobile__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._thumbnail_menu_mobile__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(255,255,255,0.392157); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._thumbnail_menu_mobile__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(255,255,255,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._thumbnail_menu_mobile.ggScrollPosY = 0;
		me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu_mobile.ggDragInertiaY *= 0.65;
					me._thumbnail_menu_mobile.ggScrollByY(me._thumbnail_menu_mobile.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu_mobile.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragInertiaY = diffY;
				me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
				me._thumbnail_menu_mobile.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu_mobile.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu_mobile.ggDragInertiaY *= 0.65;
					me._thumbnail_menu_mobile.ggScrollByY(me._thumbnail_menu_mobile.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu_mobile.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._thumbnail_menu_mobile.ggDragLastY;
				me._thumbnail_menu_mobile.ggDragInertiaY = diffY;
				me._thumbnail_menu_mobile.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._thumbnail_menu_mobile.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
			if (e.offsetY < me._thumbnail_menu_mobile.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu_mobile__vertScrollBg.getBoundingClientRect();
			var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._thumbnail_menu_mobile.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._thumbnail_menu_mobile.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu_mobile__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu_mobile";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 90%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu_mobile.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu_mobile.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._thumbnail_menu_mobile.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._thumbnail_menu_mobile.style.top='1000px';
					me._thumbnail_menu_mobile.ggUpdatePosition(true);
				}
				else {
					me._thumbnail_menu_mobile.ggDx=0;
					me._thumbnail_menu_mobile.style.top='10px';
					me._thumbnail_menu_mobile.ggUpdatePosition(true);
				}
			}
		}
		me._thumbnail_menu_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_thumbnail') == true)) && 
				((player.getIsTour() == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnail_menu_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible == 0) {
					me._thumbnail_menu_mobile.style.visibility=(Number(me._thumbnail_menu_mobile.style.opacity)>0||!me._thumbnail_menu_mobile.style.opacity)?'inherit':'hidden';
					me._thumbnail_menu_mobile.ggVisible=true;
				}
				else {
					me._thumbnail_menu_mobile.style.visibility="hidden";
					me._thumbnail_menu_mobile.ggVisible=false;
				}
			}
		}
		me._thumbnail_menu_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getVariableValue('vis_timer') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu_mobile.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_menu_mobile.style.visibility=me._thumbnail_menu_mobile.ggVisible?'inherit':'hidden';
					me._thumbnail_menu_mobile.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_menu_mobile.style.opacity == 0.0) { me._thumbnail_menu_mobile.style.visibility="hidden"; } }, 505);
					me._thumbnail_menu_mobile.style.opacity=0;
				}
			}
		}
		me._thumbnail_menu_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if ((me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.offsetHeight - 15) || (!me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.offsetHeight)) {
					me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu_mobile.ggVertScrollVisible = true;
				} else {
					me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu_mobile.ggVertScrollVisible = false;
				}
				if(me._thumbnail_menu_mobile.ggVertScrollVisible) {
					me._thumbnail_menu_mobile.ggAvailableWidth = me._thumbnail_menu_mobile.offsetWidth - 15;
					if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
						me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.offsetHeight - 15;
						me._thumbnail_menu_mobile.ggAvailableHeightWithScale = me._thumbnail_menu_mobile.getBoundingClientRect().height - me._thumbnail_menu_mobile__vertScrollBg.getBoundingClientRect().width;
						me._thumbnail_menu_mobile__cornerBg.style.visibility = 'inherit';
					} else {
						me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.offsetHeight;
						me._thumbnail_menu_mobile.ggAvailableHeightWithScale = me._thumbnail_menu_mobile.getBoundingClientRect().height;
						me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
					}
					me._thumbnail_menu_mobile__vertScrollBg.style.height = me._thumbnail_menu_mobile.ggAvailableHeight + 'px';
					me._thumbnail_menu_mobile.ggVPercentVisible = contentHeight != 0 ? me._thumbnail_menu_mobile.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._thumbnail_menu_mobile.ggVPercentVisible > 1.0) me._thumbnail_menu_mobile.ggVPercentVisible = 1.0;
					me._thumbnail_menu_mobile.ggScrollHeight =  Math.round(me._thumbnail_menu_mobile__vertScrollBg.offsetHeight * me._thumbnail_menu_mobile.ggVPercentVisible);
					me._thumbnail_menu_mobile__vertScrollFg.style.height = me._thumbnail_menu_mobile.ggScrollHeight + 'px';
					me._thumbnail_menu_mobile.ggScrollPosY = me._thumbnail_menu_mobile.ggScrollPosYPercent * me._thumbnail_menu_mobile.ggAvailableHeight;
					me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.offsetHeight - me._thumbnail_menu_mobile__vertScrollFg.offsetHeight);
					me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
					if (me._thumbnail_menu_mobile.ggVPercentVisible < 1.0) {
						me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._thumbnail_menu_mobile.ggAvailableWidth = me._thumbnail_menu_mobile.offsetWidth;
					me._thumbnail_menu_mobile.ggScrollPosY = 0;
					me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
					me._thumbnail_menu_mobile__content.style.top = this.ggContentTopOffset + 'px';
					me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._thumbnail_menu_mobile.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu_mobile.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu_mobile);
					me._thumbnail_menu_mobile.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner_mobile=document.createElement('div');
		el.ggNumRepeat = 100;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_alpha();
					}
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function(){
			if(me._thumbnail_cloner_mobile.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
					if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
						me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner_mobile.ggUpdating == true) return;
			me._thumbnail_cloner_mobile.ggUpdating = true;
			var el=me._thumbnail_cloner_mobile;
			var curNumCols = 0;
			var parentWidth = me._thumbnail_cloner_mobile.parentNode.classList.contains('ggskin_subelement') ? (me._thumbnail_cloner_mobile.parentNode.parentNode.classList.contains('ggskin_scrollarea') ? me._thumbnail_cloner_mobile.parentNode.parentNode.ggAvailableWidth : me._thumbnail_cloner_mobile.parentNode.parentNode.clientWidth) : me._thumbnail_cloner_mobile.parentNode.clientWidth;
			if (parentWidth == 0) parentWidth = me._thumbnail_cloner_mobile.parentNode.parentNode.clientWidth;
			curNumCols = Math.floor(((parentWidth - me._thumbnail_cloner_mobile.offsetLeft) * me._thumbnail_cloner_mobile.ggNumRepeat / 100.0) / me._thumbnail_cloner_mobile.offsetWidth);
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner_mobile.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner_mobile.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner_mobile.ggWidth) + 'px';
				parameter.width=me._thumbnail_cloner_mobile.ggWidth + 'px';
				parameter.height=me._thumbnail_cloner_mobile.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_mobile_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_active();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_activehotspotchanged();
			me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
			me._thumbnail_cloner_mobile.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner_mobile.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner_mobile.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner_mobile.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="thumbnail_cloner_mobile";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 1.98px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 1.764px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner_mobile.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=true;
		}
		me._thumbnail_cloner_mobile.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=false;
		}
		me._thumbnail_cloner_mobile.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_cloner_mobile']=false;
		}
		me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner_mobile.childNodes.length; i++) {
				var child=me._thumbnail_cloner_mobile.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner_mobile.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner_mobile.ggUpdate();
		}
		me._thumbnail_cloner_mobile.ggNodeChange=function () {
			me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu_mobile__content.appendChild(me._thumbnail_cloner_mobile);
		me.divSkin.appendChild(me._thumbnail_menu_mobile);
		el=me._loading=document.createElement('div');
		el.ggId="loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 210px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_loader') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._loading.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._loading.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._loading.style[domTransition]='';
				if (me._loading.ggCurrentLogicStateVisible == 0) {
					me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
					me._loading.ggVisible=true;
				}
				else {
					me._loading.style.visibility="hidden";
					me._loading.ggVisible=false;
				}
			}
		}
		me._loading.onclick=function (e) {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		me._loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._loadingbg=document.createElement('div');
		el.ggId="loadingbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 60px;';
		hs+='left : 0px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loadingbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbg.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbg);
		el=me._loadingtext=document.createElement('div');
		els=me._loadingtext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loadingtext";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 16px;';
		hs+='position : absolute;';
		hs+='top : 13px;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loadingtext.ggUpdateText=function() {
			var hs="\u8f7d\u5165\u4e2d... "+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loadingtext.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loadingtext.ggUpdateText();
		});
		el.appendChild(els);
		me._loadingtext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingtext.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingtext);
		el=me._loadingbar=document.createElement('div');
		el.ggId="loadingbar";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #808080;';
		hs+='cursor : default;';
		hs+='height : 13px;';
		hs+='left : 14px;';
		hs+='position : absolute;';
		hs+='top : 36px;';
		hs+='visibility : inherit;';
		hs+='width : 182px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		me._loadingbar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbar.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbar);
		me.divSkin.appendChild(me._loading);
		el=me._web_page=document.createElement('div');
		els=me._web_page__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="web_page";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 90%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 90%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._web_page.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._web_page.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._web_page.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._web_page.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._web_page.style[domTransition]='';
				if (me._web_page.ggCurrentLogicStateVisible == 0) {
					me._web_page.style.visibility=(Number(me._web_page.style.opacity)>0||!me._web_page.style.opacity)?'inherit':'hidden';
					me._web_page.ggVisible=true;
				}
				else {
					me._web_page.style.visibility="hidden";
					me._web_page.ggVisible=false;
				}
			}
		}
		me._web_page.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._web_page);
		el=me._userdata=document.createElement('div');
		el.ggId="userdata";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 240px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._userdata.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._userdata.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._userdata.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._userdata.style[domTransition]='';
				if (me._userdata.ggCurrentLogicStateVisible == 0) {
					me._userdata.style.visibility=(Number(me._userdata.style.opacity)>0||!me._userdata.style.opacity)?'inherit':'hidden';
					me._userdata.ggVisible=true;
				}
				else {
					me._userdata.style.visibility="hidden";
					me._userdata.ggVisible=false;
				}
			}
		}
		me._userdata.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._userdatabg=document.createElement('div');
		el.ggId="userdatabg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 140px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 240px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdatabg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdatabg.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdatabg);
		el=me._userdata_title=document.createElement('div');
		els=me._userdata_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_title.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_title.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_title.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_title);
		el=me._userdata_description=document.createElement('div');
		els=me._userdata_description__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_description";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 30px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_description.ggUpdateText=function() {
			var hs=me.ggUserdata.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_description.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_description.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_description.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_description.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_description);
		el=me._userdata_author=document.createElement('div');
		els=me._userdata_author__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_author";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_author.ggUpdateText=function() {
			var hs=me.ggUserdata.author;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_author.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_author.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_author.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_author.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_author);
		el=me._userdata_datetime=document.createElement('div');
		els=me._userdata_datetime__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_datetime";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 70px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 23px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_datetime.ggUpdateText=function() {
			var hs=me.ggUserdata.datetime;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_datetime.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_datetime.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_datetime.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_datetime.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_datetime);
		el=me._userdata_copyright=document.createElement('div');
		els=me._userdata_copyright__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="userdata_copyright";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 110px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 23px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._userdata_copyright.ggUpdateText=function() {
			var hs="&#169; "+me.ggUserdata.copyright;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._userdata_copyright.ggUpdateText();
		player.addListener('changenode', function() {
			me._userdata_copyright.ggUpdateText();
		});
		el.appendChild(els);
		me._userdata_copyright.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_copyright.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_copyright);
		el=me._userdata_close=document.createElement('div');
		els=me._userdata_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTIsMTZsMy40NC0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI1LDAtMS42OTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjctMC40NjctMS4yMjUtMC40NjctMS42OTEsMC4wMDFMMTYsMTQuMzA4bC0zLjQ0MS0zLjQ0MWMtMC40NjctMC40NjctMS4yMjQt'+
			'MC40NjctMS42OTEsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjcsMC40NjctMC40NjcsMS4yMjQsMCwxLjY5TDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNiwwLDEuNjkyYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40MzksMy40MzljMC40NjgsMC40NjgsMS4yMjUsMC40NjgsMS42OTEsMC4wMDFDMjEuNTk5LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTQuODgyLTQuODgyLTEyLjc5Ni00Ljg4Mi0xNy'+
			'42NzgsMGMtNC44ODEsNC44ODEtNC44ODEsMTIuNzk1LDAsMTcuNjc4YzQuODgxLDQuODgsMTIuNzk2LDQuODgsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTYsMjkuNzIsMTIuMDQyLDI0LjgzOSw3LjE2MXogTTE2LDI2LjEwNmMtMi41ODktMC4wMDEtNS4xNy0wLjk4NS03LjE0Ni0yLjk2MVM1Ljg5NSwxOC41OSw1Ljg5NCwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMi41OTEsMC45ODQtNS4xNywyLjk2LTcuMTQ3QzEwLjgzLDYuODc4LDEzLjQwOSw1Ljg5NCwxNiw1Ljg5NGMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4'+
			'OTtjMS45NzYsMS45NzcsMi45NTcsNC41NTYsMi45Niw3LjE0N2MtMC4wMDEsMi41OTEtMC45ODUsNS4xNjktMi45Niw3LjE0OEMyMS4xNjksMjUuMTIyLDE4LjU5MSwyNi4xMDYsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLT'+
			'AuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4'+
			'Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OS'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._userdata_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._userdata_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgb3BhY2l0eT0iMC40Ij4KICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MywxNmwzLjQzOS0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEu'+
			'MjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxYy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTFjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwQzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTT'+
			'I0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OGM0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OUM2Ljg3OCwyMS4xNyw1Ljg5NSwxOC41OTEsNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYs'+
			'NC41NTYtMi45NTksNy4xNDgtMi45NmMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OEMyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMS4xMzIsMTkuNDM5TD'+
			'E3LjY5MywxNmwzLjQzOS0zLjQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjgtMC40NjcsMC40NjgtMS4yMjYsMC4wMDEtMS42OTNjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY4LTAuNDY4LTEuMjI1LTAuNDY3LTEuNjkzLDBjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwLjAwMWwzLjQ0'+
			'LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjEuNTk4LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxYy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzQuODgyLDQuODgxLDEyLjc5Niw0Ljg4MSwxNy42NzgsMEMyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OSYjeGQ7Ji'+
			'N4YTsmI3g5OyYjeDk7QzYuODc4LDIxLjE3LDUuODk1LDE4LjU5MSw1Ljg5NCwxNmMwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYsNC41NTYtMi45NTksNy4xNDgtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTljMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjE3LDI1LjEyMywxOC41OTEsMjYuMTA3LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4K'+
			'IDwvZz4KPC9zdmc+Cg==';
		me._userdata_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="userdata_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 2px;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_close.onclick=function (e) {
			player.setVariableValue('vis_userdata', false);
		}
		me._userdata_close.onmouseover=function (e) {
			me._userdata_close__img.style.visibility='hidden';
			me._userdata_close__imgo.style.visibility='inherit';
		}
		me._userdata_close.onmouseout=function (e) {
			me._userdata_close__img.style.visibility='inherit';
			me._userdata_close__imgo.style.visibility='hidden';
		}
		me._userdata_close.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_close);
		me.divSkin.appendChild(me._userdata);
		el=me._information=document.createElement('div');
		el.ggId="information";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 250px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_info_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._information.style[domTransition]='';
				if (me._information.ggCurrentLogicStateVisible == 0) {
					me._information.style.visibility=(Number(me._information.style.opacity)>0||!me._information.style.opacity)?'inherit':'hidden';
					me._information.ggVisible=true;
				}
				else {
					me._information.style.visibility="hidden";
					me._information.ggVisible=false;
				}
			}
		}
		me._information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._informationbg=document.createElement('div');
		el.ggId="informationbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 250px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._informationbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._informationbg.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._informationbg);
		el=me._info_text_body=document.createElement('div');
		els=me._info_text_body__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_text_body";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 193px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 45px;';
		hs+='visibility : inherit;';
		hs+='width : 276px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 276px;';
		hs+='height: 193px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		me._info_text_body.ggUpdateText=function() {
			var hs=player.hotspot.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_text_body.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_text_body.ggUpdateText();
		});
		el.appendChild(els);
		me._info_text_body.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_text_body.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_text_body);
		el=me._info_title=document.createElement('div');
		els=me._info_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 245px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 245px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._info_title.ggUpdateText=function() {
			var hs=player.hotspot.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._info_title.ggUpdateText();
		player.addListener('activehotspotchanged', function() {
			me._info_title.ggUpdateText();
		});
		el.appendChild(els);
		me._info_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_title.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_title);
		el=me._ht_info_close=document.createElement('div');
		els=me._ht_info_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgd2lkdGg9IjMycHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTIsMTZsMy40NC0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI1LDAtMS42OTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjctMC40NjctMS4yMjUtMC40NjctMS42OTEsMC4wMDFMMTYsMTQuMzA4bC0zLjQ0MS0zLjQ0MWMtMC40NjctMC40NjctMS4yMjQt'+
			'MC40NjctMS42OTEsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjcsMC40NjctMC40NjcsMS4yMjQsMCwxLjY5TDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNiwwLDEuNjkyYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40MzksMy40MzljMC40NjgsMC40NjgsMS4yMjUsMC40NjgsMS42OTEsMC4wMDFDMjEuNTk5LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTQuODgyLTQuODgyLTEyLjc5Ni00Ljg4Mi0xNy'+
			'42NzgsMGMtNC44ODEsNC44ODEtNC44ODEsMTIuNzk1LDAsMTcuNjc4YzQuODgxLDQuODgsMTIuNzk2LDQuODgsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTYsMjkuNzIsMTIuMDQyLDI0LjgzOSw3LjE2MXogTTE2LDI2LjEwNmMtMi41ODktMC4wMDEtNS4xNy0wLjk4NS03LjE0Ni0yLjk2MVM1Ljg5NSwxOC41OSw1Ljg5NCwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMi41OTEsMC45ODQtNS4xNywyLjk2LTcuMTQ3QzEwLjgzLDYuODc4LDEzLjQwOSw1Ljg5NCwxNiw1Ljg5NGMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4'+
			'OTtjMS45NzYsMS45NzcsMi45NTcsNC41NTYsMi45Niw3LjE0N2MtMC4wMDEsMi41OTEtMC45ODUsNS4xNjktMi45Niw3LjE0OEMyMS4xNjksMjUuMTIyLDE4LjU5MSwyNi4xMDYsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLT'+
			'AuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4'+
			'Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OS'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_info_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgd2lkdGg9IjMycHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgb3BhY2l0eT0iMC40Ij4KICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MywxNmwzLjQzOS0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEu'+
			'MjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxYy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTFjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwQzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTT'+
			'I0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OGM0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OUM2Ljg3OCwyMS4xNyw1Ljg5NSwxOC41OTEsNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYs'+
			'NC41NTYtMi45NTksNy4xNDgtMi45NmMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OEMyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMS4xMzIsMTkuNDM5TD'+
			'E3LjY5MywxNmwzLjQzOS0zLjQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjgtMC40NjcsMC40NjgtMS4yMjYsMC4wMDEtMS42OTNjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY4LTAuNDY4LTEuMjI1LTAuNDY3LTEuNjkzLDBjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwLjAwMWwzLjQ0'+
			'LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjEuNTk4LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxYy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzQuODgyLDQuODgxLDEyLjc5Niw0Ljg4MSwxNy42NzgsMEMyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OSYjeGQ7Ji'+
			'N4YTsmI3g5OyYjeDk7QzYuODc4LDIxLjE3LDUuODk1LDE4LjU5MSw1Ljg5NCwxNmMwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYsNC41NTYtMi45NTksNy4xNDgtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTljMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjE3LDI1LjEyMywxOC41OTEsMjYuMTA3LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4K'+
			'IDwvZz4KPC9zdmc+Cg==';
		me._ht_info_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 1px;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_info_close.onclick=function (e) {
			player.setVariableValue('vis_info_popup', false);
		}
		me._ht_info_close.onmouseover=function (e) {
			me._ht_info_close__img.style.visibility='hidden';
			me._ht_info_close__imgo.style.visibility='inherit';
		}
		me._ht_info_close.onmouseout=function (e) {
			me._ht_info_close__img.style.visibility='inherit';
			me._ht_info_close__imgo.style.visibility='hidden';
		}
		me._ht_info_close.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._ht_info_close);
		me.divSkin.appendChild(me._information);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup.style[domTransition]='';
				if (me._image_popup.ggCurrentLogicStateVisible == 0) {
					me._image_popup.style.visibility=(Number(me._image_popup.style.opacity)>0||!me._image_popup.style.opacity)?'inherit':'hidden';
					me._image_popup.ggVisible=true;
				}
				else {
					me._image_popup.style.visibility="hidden";
					me._image_popup.ggVisible=false;
				}
			}
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iNjQiPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZS'+
			'BjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC4xMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9'+
			'IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIGN4PSIxNiI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdG'+
			'UiIGR1cj0iMXMiIGF0dHJpYnV0ZU5hbWU9InIiIGJlZ2luPSIwLjM3NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJy'+
			'b3RhdGUoMjI1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNjI1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLj'+
			'IgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC43NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFt'+
			'ZT0iciIgYmVnaW49IjAuODc1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC41cyIvPgogPC9jaXJjbGU+Cjwvc3ZnPgo=';
		me._loading_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_popup.appendChild(me._loading_image);
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_image.style[domTransition]='';
				if (me._popup_image.ggCurrentLogicStateVisible == 0) {
					me._popup_image.style.visibility=(Number(me._popup_image.style.opacity)>0||!me._popup_image.style.opacity)?'inherit':'hidden';
					me._popup_image.ggSubElement.src=me._popup_image.ggText;
					me._popup_image.ggVisible=true;
				}
				else {
					me._popup_image.style.visibility="hidden";
					me._popup_image__img.src = '';
					me._popup_image.ggVisible=false;
				}
			}
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._video_popup_file=document.createElement('div');
		el.ggId="video_popup_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_file.style[domTransition]='';
				if (me._video_popup_file.ggCurrentLogicStateVisible == 0) {
					me._video_popup_file.style.visibility=(Number(me._video_popup_file.style.opacity)>0||!me._video_popup_file.style.opacity)?'inherit':'hidden';
					me._video_popup_file.ggVisible=true;
				}
				else {
					me._video_popup_file.style.visibility="hidden";
					me._video_popup_file.ggVisible=false;
				}
			}
		}
		me._video_popup_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_file=document.createElement('div');
		els=me._loading_video_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iNjQiPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZS'+
			'BjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC4xMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9'+
			'IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIGN4PSIxNiI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdG'+
			'UiIGR1cj0iMXMiIGF0dHJpYnV0ZU5hbWU9InIiIGJlZ2luPSIwLjM3NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJy'+
			'b3RhdGUoMjI1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNjI1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLj'+
			'IgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC43NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFt'+
			'ZT0iciIgYmVnaW49IjAuODc1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC41cyIvPgogPC9jaXJjbGU+Cjwvc3ZnPgo=';
		me._loading_video_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_file";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_file.appendChild(me._loading_video_file);
		el=me._popup_video_file=document.createElement('div');
		me._popup_video_file.seekbars = [];
		me._popup_video_file.seekbars.push('seekbar_file');
		me._popup_video_file.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_file.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_file.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_file.hasChildNodes()) {
				me._popup_video_file.removeChild(me._popup_video_file.lastChild);
			}
			if (me._popup_video_file__vid) {
				me._popup_video_file__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_file.ggVideoNotLoaded ==false && me._popup_video_file.ggDeactivate) { me._popup_video_file.ggDeactivate(); }
				me._popup_video_file.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_file');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_file.ggVideoNotLoaded = false;
			me._popup_video_file__vid=document.createElement('video');
			me._popup_video_file__vid.className='ggskin ggskin_video';
			me._popup_video_file__vid.setAttribute('width', '100%');
			me._popup_video_file__vid.setAttribute('height', '100%');
			me._popup_video_file__vid.setAttribute('controlsList', 'nodownload');
			me._popup_video_file__vid.setAttribute('oncontextmenu', 'return false;');
			me._popup_video_file__source=document.createElement('source');
			me._popup_video_file__source.setAttribute('src', media);
			me._popup_video_file__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_file__vid.setAttribute('style', ';');
			me._popup_video_file__vid.style.outline = 'none';
			me._popup_video_file__vid.appendChild(me._popup_video_file__source);
			me._popup_video_file.appendChild(me._popup_video_file__vid);
			var videoEl = player.registerVideoElement('popup_video_file', me._popup_video_file__vid);
			videoEl.autoplay = false;
			notifySeekbars();
			me._popup_video_file.ggVideoSource = media;
		}
		el.ggId="popup_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_file.ggIsActive=function() {
			if (me._popup_video_file__vid != null) {
				return (me._popup_video_file__vid.paused == false && me._popup_video_file__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_file.style[domTransition]='';
				if (me._popup_video_file.ggCurrentLogicStateVisible == 0) {
					me._popup_video_file.style.visibility=(Number(me._popup_video_file.style.opacity)>0||!me._popup_video_file.style.opacity)?'inherit':'hidden';
					if (me._popup_video_file.ggVideoNotLoaded) {
						me._popup_video_file.ggInitMedia(me._popup_video_file.ggVideoSource);
					}
					me._popup_video_file.ggVisible=true;
				}
				else {
					me._popup_video_file.style.visibility="hidden";
					me._popup_video_file.ggInitMedia('');
					me._popup_video_file.ggVisible=false;
				}
			}
		}
		me._popup_video_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_file.appendChild(me._popup_video_file);
		me.divSkin.appendChild(me._video_popup_file);
		el=me._video_popup_controls_file=document.createElement('div');
		el.ggId="video_popup_controls_file";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 10px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_controls_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_controls_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_controls_file.style[domTransition]='';
				if (me._video_popup_controls_file.ggCurrentLogicStateVisible == 0) {
					me._video_popup_controls_file.style.visibility=(Number(me._video_popup_controls_file.style.opacity)>0||!me._video_popup_controls_file.style.opacity)?'inherit':'hidden';
					me._video_popup_controls_file.ggVisible=true;
				}
				else {
					me._video_popup_controls_file.style.visibility="hidden";
					me._video_popup_controls_file.ggVisible=false;
				}
			}
		}
		me._video_popup_controls_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._ht_video_play_file=document.createElement('div');
		els=me._ht_video_play_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTExLjkzMiwyMi43OTdjLTAuMzctMC4yMTMtMC41OTgtMC42MDgtMC41OTgtMS4wMzVsMCwwVjEwLjIzOWMwLTAuNDI4LDAuMjI4LTAuODIyLDAuNTk4LTEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4zNy0wLjIxNCwwLjgyNi0wLjIxNCwxLjE5NiwwbDAsMGw5Ljk3OCw1Ljc2MWMwLjM3LDAuMjE0LDAuNTk5LDAuNjA4LDAuNTk5'+
			'LDEuMDM2bDAsMGMwLDAuNDI4LTAuMjI5LDAuODIyLTAuNTk5LDEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsLTkuOTc4LDUuNzYxYy0wLjE4NSwwLjEwNy0wLjM5MiwwLjE2MS0wLjU5OCwwLjE2MWwwLDBDMTIuMzI0LDIyLjk1OCwxMi4xMTcsMjIuOTA0LDExLjkzMiwyMi43OTdMMTEuOTMyLDIyLjc5N3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMy43MjcsMTkuNjg5TDIwLjExNiwxNmwtNi4zOS0zLjY4OVYxOS42ODlMMTMuNzI3LDE5LjY4OXoiLz4KICA8cGF0aCBkPSJNMy41LDE2TDMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjQ5OSwxMi41LTEyLjVsMCwwYzYuOTA0LD'+
			'AsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy01LjU5NiwxMi40OTgtMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTgsMy41MDEsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE01Ljg5MywxNmMwLDIuNzk1LDEuMTI5LDUuMzEzLDIuOTYxLDcuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wwLDBjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMGMyLjc5NCwwLDUuMzE0LTEuMTI5LDcuMTQ2LTIuOTZsMCwwYzEuODMyLTEuODMzLDIuOTYtNC4zNTIsMi45NjEtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsm'+
			'I3g5O2MtMC4wMDEtMi43OTUtMS4xMjktNS4zMTMtMi45NjEtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODcsNS44OTMsMTMuMjA1LDUuODkzLDE2TDUuODkzLDE2TDUuODkzLDE2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMTEuOTMyLDIyLjc5N2MtMC4zNy0wLjIxMy0wLjU5OC0wLjYwOC0wLjU5OC'+
			'0xLjAzNWwwLDBWMTAuMjM5YzAtMC40MjgsMC4yMjgtMC44MjIsMC41OTgtMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjM3LTAuMjE0LDAuODI2LTAuMjE0LDEuMTk2LDBsMCwwbDkuOTc4LDUuNzYxYzAuMzcsMC4yMTQsMC41OTksMC42MDgsMC41OTksMS4wMzZsMCwwYzAsMC40MjgtMC4yMjksMC44MjItMC41OTksMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtOS45NzgsNS43NjFjLTAuMTg1LDAuMTA3LTAuMzkyLDAuMTYxLTAuNTk4LDAuMTYxbDAsMEMxMi4zMjQsMjIuOTU4LDEyLjExNywyMi45MDQsMTEuOTMyLDIyLjc5N0wxMS45MzIsMjIuNzk3eiYj'+
			'eGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEzLjcyNywxOS42ODlMMjAuMTE2LDE2bC02LjM5LTMuNjg5VjE5LjY4OUwxMy43MjcsMTkuNjg5eiIvPgogIDxwYXRoIGQ9Ik0zLjUsMTZMMy41LDE2YzAtNi45MDQsNS41OTYtMTIuNDk5LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk2LDEyLjQ5OC0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OCwzLjUwMSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTUuODkzLDE2YzAsMi43OTUsMS4xMjksNS4zMTMsMi45NjEsNy4xNDYmI3hkOyYjeG'+
			'E7JiN4OTsmI3g5OyYjeDk7bDAsMGMxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwYzIuNzk0LDAsNS4zMTQtMS4xMjksNy4xNDYtMi45NmwwLDBjMS44MzItMS44MzMsMi45Ni00LjM1MiwyLjk2MS03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxMy0yLjk2MS03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Nyw1Ljg5MywxMy4yMDUsNS44OTMsMTZMNS44'+
			'OTMsMTZMNS44OTMsMTZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_play_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_play_file__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMTEuOTMyLDIyLjc5N2MtMC4zNy0wLjIxMy0wLjU5OC0wLjYwOC0wLjU5OC0xLjAzNWwwLDBWMTAuMjM5YzAtMC40MjgsMC4yMjgtMC44MjIsMC41OTgtMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjM3LTAuMjE0LDAuODI2'+
			'LTAuMjE0LDEuMTk2LDBsMCwwbDkuOTc4LDUuNzYxYzAuMzcsMC4yMTQsMC41OTksMC42MDgsMC41OTksMS4wMzZsMCwwYzAsMC40MjgtMC4yMjksMC44MjItMC41OTksMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtOS45NzgsNS43NjFjLTAuMTg1LDAuMTA3LTAuMzkyLDAuMTYxLTAuNTk4LDAuMTYxbDAsMEMxMi4zMjQsMjIuOTU4LDEyLjExNywyMi45MDQsMTEuOTMyLDIyLjc5N0wxMS45MzIsMjIuNzk3eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEzLjcyNywxOS42ODlMMjAuMTE2LDE2bC02LjM5LTMuNjg5VjE5LjY4OUwxMy43MjcsMTkuNjg5eiIvPgogIDxwYXRoIG'+
			'Q9Ik0zLjUsMTZMMy41LDE2YzAtNi45MDQsNS41OTYtMTIuNDk5LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk2LDEyLjQ5OC0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OCwzLjUwMSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTUuODkzLDE2YzAsMi43OTUsMS4xMjksNS4zMTMsMi45NjEsNy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDAsMGMxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwYzIuNzk0LDAsNS4zMTQtMS4xMjksNy4xNDYtMi45NmwwLDBj'+
			'MS44MzItMS44MzMsMi45Ni00LjM1MiwyLjk2MS03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxMy0yLjk2MS03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Nyw1Ljg5MywxMy4yMDUsNS44OTMsMTZMNS44OTMsMTZMNS44OTMsMTZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZS'+
			'gxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTExLjkzMiwyMi43OTdjLTAuMzctMC4yMTMtMC41OTgtMC42MDgtMC41OTgtMS4wMzVsMCwwVjEwLjIzOWMwLTAuNDI4LDAuMjI4LTAuODIyLDAuNTk4LTEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4zNy0wLjIxNCwwLjgyNi0wLjIxNCwxLjE5NiwwbDAsMGw5Ljk3OCw1Ljc2MWMwLjM3LDAuMjE0LDAuNTk5LDAuNjA4LDAuNTk5LDEuMDM2bDAsMGMwLDAuNDI4LTAuMjI5LDAuODIyLTAuNTk5LDEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7'+
			'JiN4OTtsLTkuOTc4LDUuNzYxYy0wLjE4NSwwLjEwNy0wLjM5MiwwLjE2MS0wLjU5OCwwLjE2MWwwLDBDMTIuMzI0LDIyLjk1OCwxMi4xMTcsMjIuOTA0LDExLjkzMiwyMi43OTdMMTEuOTMyLDIyLjc5N3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMy43MjcsMTkuNjg5TDIwLjExNiwxNmwtNi4zOS0zLjY4OVYxOS42ODlMMTMuNzI3LDE5LjY4OXoiLz4KICA8cGF0aCBkPSJNMy41LDE2TDMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjQ5OSwxMi41LTEyLjVsMCwwYzYuOTA0LDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy'+
			'01LjU5NiwxMi40OTgtMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTgsMy41MDEsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE01Ljg5MywxNmMwLDIuNzk1LDEuMTI5LDUuMzEzLDIuOTYxLDcuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wwLDBjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMGMyLjc5NCwwLDUuMzE0LTEuMTI5LDcuMTQ2LTIuOTZsMCwwYzEuODMyLTEuODMzLDIuOTYtNC4zNTIsMi45NjEtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEtMi43OTUtMS4xMjktNS4zMTMtMi45NjEtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUs'+
			'NS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODcsNS44OTMsMTMuMjA1LDUuODkzLDE2TDUuODkzLDE2TDUuODkzLDE2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_play_file__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_play_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_file.ggApiPlayer.playVideo();
					};
					if (me._popup_video_file.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_file.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_file","1");
			}
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
		}
		me._ht_video_play_file.onmouseover=function (e) {
			me._ht_video_play_file__img.style.visibility='hidden';
			me._ht_video_play_file__imgo.style.visibility='inherit';
		}
		me._ht_video_play_file.onmouseout=function (e) {
			me._ht_video_play_file__img.style.visibility='inherit';
			me._ht_video_play_file__imgo.style.visibility='hidden';
		}
		me._ht_video_play_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_play_file);
		el=me._ht_video_pause_file=document.createElement('div');
		els=me._ht_video_pause_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDIzLjE0NiYjeGQ7'+
			'JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44MzEtMS44MzIsMi45Ni00LjM1MiwyLjk2LTcuMTQ2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMEMyMS4zMTQsNy4wMjIsMTguNzk1LDUuODk0LDE2LDUuODkzbDAsMGMtMi43OTUsMC01LjMxNCwxLjEyOS03LjE0NywyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBoME'+
			'M1Ljg5NCwxOC43OTUsNy4wMjIsMjEuMzE0LDguODUzLDIzLjE0Nkw4Ljg1MywyMy4xNDZ6Ii8+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xMi40MzMsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2MSwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAsMHY4Ljk5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzEyLjk2OSwyMS42OTMsMTIuNDMzLDIxLjE1OCwxMi40MzMsMjAuNDk4TDEyLjQzMywyMC40OTh6Ii8+CiAgIDxwYXRoIGQ9Ik0xNy4xNzUsMjAuNDk4di04Ljk5NWMwLTAu'+
			'NjYxLDAuNTM1LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTcuNzEsMjEuNjkzLDE3LjE3NSwyMS4xNTgsMTcuMTc1LDIwLjQ5OEwxNy4xNzUsMjAuNDk4eiIvPgogIDwvZz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMGM2Lj'+
			'kwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDIzLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44MzEtMS44MzIsMi45Ni00LjM1MiwyLjk2LTcuMTQ2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC0yLjc5NS0xLjEyOS01LjMxNC0y'+
			'Ljk2LTcuMTQ3bDAsMEMyMS4zMTQsNy4wMjIsMTguNzk1LDUuODk0LDE2LDUuODkzbDAsMGMtMi43OTUsMC01LjMxNCwxLjEyOS03LjE0NywyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBoMEM1Ljg5NCwxOC43OTUsNy4wMjIsMjEuMzE0LDguODUzLDIzLjE0Nkw4Ljg1MywyMy4xNDZ6Ii8+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xMi40MzMsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2MSwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAsMHY4Ljk5NSYjeGQ7JiN4YT'+
			'smI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzEyLjk2OSwyMS42OTMsMTIuNDMzLDIxLjE1OCwxMi40MzMsMjAuNDk4TDEyLjQzMywyMC40OTh6Ii8+CiAgIDxwYXRoIGQ9Ik0xNy4xNzUsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM1LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTcuNzEsMjEuNjkzLDE3LjE3NSwyMS4xNTgsMTcuMTc1LDIwLjQ5OEwxNy4x'+
			'NzUsMjAuNDk4eiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_pause_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_pause_file__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMy41LDE2QzMuNSw5LjA5Niw5LjA5NiwzLjUwMSwxNiwzLjVsMCwwYzYuOTA0LDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAs'+
			'MEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsMjMuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTYxbDAsMGMyLjc5NC0wLjAwMSw1LjMxNC0xLjEzLDcuMTQ3LTIuOTYxbDAsMGMxLjgzMS0xLjgzMiwyLjk2LTQuMzUyLDIuOTYtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3'+
			'hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGgwQzUuODk0LDE4Ljc5NSw3LjAyMiwyMS4zMTQsOC44NTMsMjMuMTQ2TDguODUzLDIzLjE0NnoiLz4KICA8Zz4KICAgPHBhdGggZD0iTTEyLjQzMywyMC40OTh2LTguOTk1YzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTYtMS4xOTZsMCwwYzAuNjYxLDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTIuOTY5LDIxLjY5MywxMi40MzMsMjEuMTU4LDEyLjQzMywyMC40'+
			'OThMMTIuNDMzLDIwLjQ5OHoiLz4KICAgPHBhdGggZD0iTTE3LjE3NSwyMC40OTh2LTguOTk1YzAtMC42NjEsMC41MzUtMS4xOTYsMS4xOTYtMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNSwxLjE5NiwxLjE5NmwwLDB2OC45OTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2LTAuNTM2LDEuMTk1LTEuMTk2LDEuMTk1bDAsMEMxNy43MSwyMS42OTMsMTcuMTc1LDIxLjE1OCwxNy4xNzUsMjAuNDk4TDE3LjE3NSwyMC40OTh6Ii8+CiAgPC9nPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbG'+
			'UoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTA0LTUuNTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE04Ljg1MywyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMzLDEuODMxLDQuMzUyLDIuOTYsNy4xNDcsMi45NjFsMCwwYzIuNzk0'+
			'LTAuMDAxLDUuMzE0LTEuMTMsNy4xNDctMi45NjFsMCwwYzEuODMxLTEuODMyLDIuOTYtNC4zNTIsMi45Ni03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwaDBDNS44OTQsMTguNzk1LDcuMDIyLDIxLjMxNCw4Ljg1MywyMy4xNDZMOC44NTMsMjMuMTQ2eiIvPgogIDxnPgogIC'+
			'A8cGF0aCBkPSJNMTIuNDMzLDIwLjQ5OHYtOC45OTVjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ni0xLjE5NmwwLDBjMC42NjEsMCwxLjE5NiwwLjUzNSwxLjE5NiwxLjE5NmwwLDB2OC45OTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2LTAuNTM2LDEuMTk1LTEuMTk2LDEuMTk1bDAsMEMxMi45NjksMjEuNjkzLDEyLjQzMywyMS4xNTgsMTIuNDMzLDIwLjQ5OEwxMi40MzMsMjAuNDk4eiIvPgogICA8cGF0aCBkPSJNMTcuMTc1LDIwLjQ5OHYtOC45OTVjMC0wLjY2MSwwLjUzNS0xLjE5NiwxLjE5Ni0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAs'+
			'MHY4Ljk5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzE3LjcxLDIxLjY5MywxNy4xNzUsMjEuMTU4LDE3LjE3NSwyMC40OThMMTcuMTc1LDIwLjQ5OHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_pause_file__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_pause_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_file.ggApiPlayer.pauseVideo();
					};
					if (me._popup_video_file.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_file.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_file");
			}
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
		}
		me._ht_video_pause_file.onmouseover=function (e) {
			me._ht_video_pause_file__img.style.visibility='hidden';
			me._ht_video_pause_file__imgo.style.visibility='inherit';
		}
		me._ht_video_pause_file.onmouseout=function (e) {
			me._ht_video_pause_file__img.style.visibility='inherit';
			me._ht_video_pause_file__imgo.style.visibility='hidden';
		}
		me._ht_video_pause_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_pause_file);
		el=me._seekbar_file=document.createElement('div');
		me._seekbar_file__playhead=document.createElement('div');
		me._seekbar_file.mediaEl = null;
		el.ggId="seekbar_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 14px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 246px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_file.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_file__playhead.style.visibility = 'hidden';
				me._seekbar_file.style.background = '#ffffff';
				me._seekbar_file.ggConnected = false;
			}
			if (me._seekbar_file.mediaEl != null) {
				me._seekbar_file.mediaEl.removeEventListener('progress', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.removeEventListener('canplay', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.removeEventListener('timeupdate', me._seekbar_file.updatePlayback);
				if (me._seekbar_file.ggActivate) {
					me._seekbar_file.mediaEl.removeEventListener('play', me._seekbar_file.ggActivate);
				}
				if (me._seekbar_file.ggDeactivate) {
					me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggDeactivate);
					me._seekbar_file.mediaEl.removeEventListener('pause', me._seekbar_file.ggDeactivate);
				}
				if (me._seekbar_file.ggMediaEnded) {
					me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggMediaEnded);
				}
			}
			me._seekbar_file.mediaEl = player.getMediaObject('popup_video_file');
			if (me._seekbar_file.mediaEl != null) {
				me._seekbar_file__playhead.style.visibility = 'inherit';
				me._seekbar_file__playhead.style.left = '1px';
				me._seekbar_file.mediaEl.addEventListener('progress', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.addEventListener('canplay', me._seekbar_file.updatePlayback);
				me._seekbar_file.mediaEl.addEventListener('timeupdate', me._seekbar_file.updatePlayback);
				if (me._seekbar_file.ggActivate) {
					me._seekbar_file.mediaEl.addEventListener('play', me._seekbar_file.ggActivate);
				}
				if (me._seekbar_file.ggDeactivate) {
					me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggDeactivate);
					me._seekbar_file.mediaEl.addEventListener('pause', me._seekbar_file.ggDeactivate);
				}
				if (me._seekbar_file.ggMediaEnded) {
					me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggMediaEnded);
				}
			me._seekbar_file.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_file');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_file.updatePlayback = function() {
			if (!me._seekbar_file.ggConnected) return;
			if (me._seekbar_file.mediaEl != null) {
				if (me._seekbar_file.mediaEl.readyState) {
					var percent = me._seekbar_file.mediaEl.currentTime / me._seekbar_file.mediaEl.duration;
					var playheadpos = Math.round((me._seekbar_file.clientWidth - 2 * 8 + 1) * percent);
					playheadpos += 1;
					me._seekbar_file__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_file.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					for (var i = 0; i < me._seekbar_file.mediaEl.buffered.length; i++) {
						var rangeStart = Math.round((me._seekbar_file.mediaEl.buffered.start(i) / me._seekbar_file.mediaEl.duration) * 100.0);
						var rangeEnd = Math.ceil((me._seekbar_file.mediaEl.buffered.end(i) / me._seekbar_file.mediaEl.duration) * 100.0);
						if (rangeEnd > currPos) {
							if (rangeStart < currPos) {
								gradientString += ', #c0c0c0 ' + currPos + '%';
							} else {
								gradientString += ', #ffffff ' + currPos + '%, #ffffff ' + rangeStart + '%';
								gradientString += ', #c0c0c0 ' + rangeStart + '%';
							}
								gradientString += ', #c0c0c0 ' + rangeEnd + '%';
							currPos = rangeEnd;
						}
					}
					if (currPos < 100) {
						gradientString += ', #ffffff ' + currPos + '%';
					}
					gradientString += ')';
					me._seekbar_file.style.background = gradientString;
				}
			}
		}
		me._seekbar_file.appendChild(me._seekbar_file__playhead);
		hs+='background: #ffffff;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 14px;';
		hs_playhead += 'width: 14px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 1px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 7;';
		hs_playhead += cssPrefix + 'border-radius: 7px;';
		hs_playhead += 'background-color: rgba(255,255,255,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_file.setAttribute('style', hs);
		me._seekbar_file__playhead.setAttribute('style', hs_playhead);
		me._seekbar_file.ggIsActive=function() {
			if (me._seekbar_file.mediaEl != null) {
				return (me._seekbar_file.mediaEl.paused == false && me._seekbar_file.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_file.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
					me._seekbar_file.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_file.ggActivate=function () {
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
		}
		me._seekbar_file.ggDeactivate=function () {
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
		}
		me._seekbar_file.ggUpdatePosition=function (useTransition) {
		}
		me._seekbar_file.ggNodeChange=function () {
			me._seekbar_file.connectToMediaEl();
		}
		me._video_popup_controls_file.appendChild(me._seekbar_file);
		me.divSkin.appendChild(me._video_popup_controls_file);
		el=me._video_popup_url=document.createElement('div');
		el.ggId="video_popup_url";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_url.style[domTransition]='';
				if (me._video_popup_url.ggCurrentLogicStateVisible == 0) {
					me._video_popup_url.style.visibility=(Number(me._video_popup_url.style.opacity)>0||!me._video_popup_url.style.opacity)?'inherit':'hidden';
					me._video_popup_url.ggVisible=true;
				}
				else {
					me._video_popup_url.style.visibility="hidden";
					me._video_popup_url.ggVisible=false;
				}
			}
		}
		me._video_popup_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_url=document.createElement('div');
		els=me._loading_video_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iNjQiPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZS'+
			'BjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC4xMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9'+
			'IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIGN4PSIxNiI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdG'+
			'UiIGR1cj0iMXMiIGF0dHJpYnV0ZU5hbWU9InIiIGJlZ2luPSIwLjM3NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJy'+
			'b3RhdGUoMjI1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNjI1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLj'+
			'IgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC43NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFt'+
			'ZT0iciIgYmVnaW49IjAuODc1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC41cyIvPgogPC9jaXJjbGU+Cjwvc3ZnPgo=';
		me._loading_video_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_url";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_url.appendChild(me._loading_video_url);
		el=me._popup_video_url=document.createElement('div');
		me._popup_video_url.seekbars = [];
		me._popup_video_url.seekbars.push('seekbar_url');
		me._popup_video_url.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_url.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_url.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_url.hasChildNodes()) {
				me._popup_video_url.removeChild(me._popup_video_url.lastChild);
			}
			if (me._popup_video_url__vid) {
				me._popup_video_url__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_url.ggVideoNotLoaded ==false && me._popup_video_url.ggDeactivate) { me._popup_video_url.ggDeactivate(); }
				me._popup_video_url.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_url');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_url.ggVideoNotLoaded = false;
			me._popup_video_url__vid=document.createElement('video');
			me._popup_video_url__vid.className='ggskin ggskin_video';
			me._popup_video_url__vid.setAttribute('width', '100%');
			me._popup_video_url__vid.setAttribute('height', '100%');
			me._popup_video_url__vid.setAttribute('controlsList', 'nodownload');
			me._popup_video_url__vid.setAttribute('oncontextmenu', 'return false;');
			me._popup_video_url__source=document.createElement('source');
			me._popup_video_url__source.setAttribute('src', media);
			me._popup_video_url__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_url__vid.setAttribute('style', ';');
			me._popup_video_url__vid.style.outline = 'none';
			me._popup_video_url__vid.appendChild(me._popup_video_url__source);
			me._popup_video_url.appendChild(me._popup_video_url__vid);
			var videoEl = player.registerVideoElement('popup_video_url', me._popup_video_url__vid);
			videoEl.autoplay = false;
			notifySeekbars();
			me._popup_video_url.ggVideoSource = media;
		}
		el.ggId="popup_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_url.ggIsActive=function() {
			if (me._popup_video_url__vid != null) {
				return (me._popup_video_url__vid.paused == false && me._popup_video_url__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_url.style[domTransition]='';
				if (me._popup_video_url.ggCurrentLogicStateVisible == 0) {
					me._popup_video_url.style.visibility=(Number(me._popup_video_url.style.opacity)>0||!me._popup_video_url.style.opacity)?'inherit':'hidden';
					if (me._popup_video_url.ggVideoNotLoaded) {
						me._popup_video_url.ggInitMedia(me._popup_video_url.ggVideoSource);
					}
					me._popup_video_url.ggVisible=true;
				}
				else {
					me._popup_video_url.style.visibility="hidden";
					me._popup_video_url.ggInitMedia('');
					me._popup_video_url.ggVisible=false;
				}
			}
		}
		me._popup_video_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_url.appendChild(me._popup_video_url);
		me.divSkin.appendChild(me._video_popup_url);
		el=me._video_popup_controls_url=document.createElement('div');
		el.ggId="video_popup_controls_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 10px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_url') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_controls_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_controls_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_controls_url.style[domTransition]='';
				if (me._video_popup_controls_url.ggCurrentLogicStateVisible == 0) {
					me._video_popup_controls_url.style.visibility=(Number(me._video_popup_controls_url.style.opacity)>0||!me._video_popup_controls_url.style.opacity)?'inherit':'hidden';
					me._video_popup_controls_url.ggVisible=true;
				}
				else {
					me._video_popup_controls_url.style.visibility="hidden";
					me._video_popup_controls_url.ggVisible=false;
				}
			}
		}
		me._video_popup_controls_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._ht_video_play_url=document.createElement('div');
		els=me._ht_video_play_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTExLjkzMiwyMi43OTdjLTAuMzctMC4yMTMtMC41OTgtMC42MDgtMC41OTgtMS4wMzVsMCwwVjEwLjIzOWMwLTAuNDI4LDAuMjI4LTAuODIyLDAuNTk4LTEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4zNy0wLjIxNCwwLjgyNi0wLjIxNCwxLjE5NiwwbDAsMGw5Ljk3OCw1Ljc2MWMwLjM3LDAuMjE0LDAuNTk5LDAuNjA4LDAuNTk5'+
			'LDEuMDM2bDAsMGMwLDAuNDI4LTAuMjI5LDAuODIyLTAuNTk5LDEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsLTkuOTc4LDUuNzYxYy0wLjE4NSwwLjEwNy0wLjM5MiwwLjE2MS0wLjU5OCwwLjE2MWwwLDBDMTIuMzI0LDIyLjk1OCwxMi4xMTcsMjIuOTA0LDExLjkzMiwyMi43OTdMMTEuOTMyLDIyLjc5N3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMy43MjcsMTkuNjg5TDIwLjExNiwxNmwtNi4zOS0zLjY4OVYxOS42ODlMMTMuNzI3LDE5LjY4OXoiLz4KICA8cGF0aCBkPSJNMy41LDE2TDMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjQ5OSwxMi41LTEyLjVsMCwwYzYuOTA0LD'+
			'AsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy01LjU5NiwxMi40OTgtMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTgsMy41MDEsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE01Ljg5MywxNmMwLDIuNzk1LDEuMTI5LDUuMzEzLDIuOTYxLDcuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wwLDBjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMGMyLjc5NCwwLDUuMzE0LTEuMTI5LDcuMTQ2LTIuOTZsMCwwYzEuODMyLTEuODMzLDIuOTYtNC4zNTIsMi45NjEtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsm'+
			'I3g5O2MtMC4wMDEtMi43OTUtMS4xMjktNS4zMTMtMi45NjEtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODcsNS44OTMsMTMuMjA1LDUuODkzLDE2TDUuODkzLDE2TDUuODkzLDE2eiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMTEuOTMyLDIyLjc5N2MtMC4zNy0wLjIxMy0wLjU5OC0wLjYwOC0wLjU5OC'+
			'0xLjAzNWwwLDBWMTAuMjM5YzAtMC40MjgsMC4yMjgtMC44MjIsMC41OTgtMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjM3LTAuMjE0LDAuODI2LTAuMjE0LDEuMTk2LDBsMCwwbDkuOTc4LDUuNzYxYzAuMzcsMC4yMTQsMC41OTksMC42MDgsMC41OTksMS4wMzZsMCwwYzAsMC40MjgtMC4yMjksMC44MjItMC41OTksMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtOS45NzgsNS43NjFjLTAuMTg1LDAuMTA3LTAuMzkyLDAuMTYxLTAuNTk4LDAuMTYxbDAsMEMxMi4zMjQsMjIuOTU4LDEyLjExNywyMi45MDQsMTEuOTMyLDIyLjc5N0wxMS45MzIsMjIuNzk3eiYj'+
			'eGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEzLjcyNywxOS42ODlMMjAuMTE2LDE2bC02LjM5LTMuNjg5VjE5LjY4OUwxMy43MjcsMTkuNjg5eiIvPgogIDxwYXRoIGQ9Ik0zLjUsMTZMMy41LDE2YzAtNi45MDQsNS41OTYtMTIuNDk5LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk2LDEyLjQ5OC0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OCwzLjUwMSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTUuODkzLDE2YzAsMi43OTUsMS4xMjksNS4zMTMsMi45NjEsNy4xNDYmI3hkOyYjeG'+
			'E7JiN4OTsmI3g5OyYjeDk7bDAsMGMxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwYzIuNzk0LDAsNS4zMTQtMS4xMjksNy4xNDYtMi45NmwwLDBjMS44MzItMS44MzMsMi45Ni00LjM1MiwyLjk2MS03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxMy0yLjk2MS03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Nyw1Ljg5MywxMy4yMDUsNS44OTMsMTZMNS44'+
			'OTMsMTZMNS44OTMsMTZ6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_play_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_play_url__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMTEuOTMyLDIyLjc5N2MtMC4zNy0wLjIxMy0wLjU5OC0wLjYwOC0wLjU5OC0xLjAzNWwwLDBWMTAuMjM5YzAtMC40MjgsMC4yMjgtMC44MjIsMC41OTgtMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjM3LTAuMjE0LDAuODI2'+
			'LTAuMjE0LDEuMTk2LDBsMCwwbDkuOTc4LDUuNzYxYzAuMzcsMC4yMTQsMC41OTksMC42MDgsMC41OTksMS4wMzZsMCwwYzAsMC40MjgtMC4yMjksMC44MjItMC41OTksMS4wMzZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtOS45NzgsNS43NjFjLTAuMTg1LDAuMTA3LTAuMzkyLDAuMTYxLTAuNTk4LDAuMTYxbDAsMEMxMi4zMjQsMjIuOTU4LDEyLjExNywyMi45MDQsMTEuOTMyLDIyLjc5N0wxMS45MzIsMjIuNzk3eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEzLjcyNywxOS42ODlMMjAuMTE2LDE2bC02LjM5LTMuNjg5VjE5LjY4OUwxMy43MjcsMTkuNjg5eiIvPgogIDxwYXRoIG'+
			'Q9Ik0zLjUsMTZMMy41LDE2YzAtNi45MDQsNS41OTYtMTIuNDk5LDEyLjUtMTIuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk2LDEyLjQ5OC0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OCwzLjUwMSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTUuODkzLDE2YzAsMi43OTUsMS4xMjksNS4zMTMsMi45NjEsNy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDAsMGMxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTZsMCwwYzIuNzk0LDAsNS4zMTQtMS4xMjksNy4xNDYtMi45NmwwLDBj'+
			'MS44MzItMS44MzMsMi45Ni00LjM1MiwyLjk2MS03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxMy0yLjk2MS03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Nyw1Ljg5MywxMy4yMDUsNS44OTMsMTZMNS44OTMsMTZMNS44OTMsMTZ6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZS'+
			'gxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTExLjkzMiwyMi43OTdjLTAuMzctMC4yMTMtMC41OTgtMC42MDgtMC41OTgtMS4wMzVsMCwwVjEwLjIzOWMwLTAuNDI4LDAuMjI4LTAuODIyLDAuNTk4LTEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4zNy0wLjIxNCwwLjgyNi0wLjIxNCwxLjE5NiwwbDAsMGw5Ljk3OCw1Ljc2MWMwLjM3LDAuMjE0LDAuNTk5LDAuNjA4LDAuNTk5LDEuMDM2bDAsMGMwLDAuNDI4LTAuMjI5LDAuODIyLTAuNTk5LDEuMDM2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7'+
			'JiN4OTtsLTkuOTc4LDUuNzYxYy0wLjE4NSwwLjEwNy0wLjM5MiwwLjE2MS0wLjU5OCwwLjE2MWwwLDBDMTIuMzI0LDIyLjk1OCwxMi4xMTcsMjIuOTA0LDExLjkzMiwyMi43OTdMMTEuOTMyLDIyLjc5N3omI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMy43MjcsMTkuNjg5TDIwLjExNiwxNmwtNi4zOS0zLjY4OVYxOS42ODlMMTMuNzI3LDE5LjY4OXoiLz4KICA8cGF0aCBkPSJNMy41LDE2TDMuNSwxNmMwLTYuOTA0LDUuNTk2LTEyLjQ5OSwxMi41LTEyLjVsMCwwYzYuOTA0LDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy'+
			'01LjU5NiwxMi40OTgtMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTgsMy41MDEsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE01Ljg5MywxNmMwLDIuNzk1LDEuMTI5LDUuMzEzLDIuOTYxLDcuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wwLDBjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2bDAsMGMyLjc5NCwwLDUuMzE0LTEuMTI5LDcuMTQ2LTIuOTZsMCwwYzEuODMyLTEuODMzLDIuOTYtNC4zNTIsMi45NjEtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEtMi43OTUtMS4xMjktNS4zMTMtMi45NjEtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUs'+
			'NS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODcsNS44OTMsMTMuMjA1LDUuODkzLDE2TDUuODkzLDE2TDUuODkzLDE2eiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_play_url__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_play_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_url.ggApiPlayer.playVideo();
					};
					if (me._popup_video_url.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_url.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_url","1");
			}
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
		}
		me._ht_video_play_url.onmouseover=function (e) {
			me._ht_video_play_url__img.style.visibility='hidden';
			me._ht_video_play_url__imgo.style.visibility='inherit';
		}
		me._ht_video_play_url.onmouseout=function (e) {
			me._ht_video_play_url__img.style.visibility='inherit';
			me._ht_video_play_url__imgo.style.visibility='hidden';
		}
		me._ht_video_play_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_play_url);
		el=me._ht_video_pause_url=document.createElement('div');
		els=me._ht_video_pause_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMGM2LjkwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDIzLjE0NiYjeGQ7'+
			'JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44MzEtMS44MzIsMi45Ni00LjM1MiwyLjk2LTcuMTQ2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMEMyMS4zMTQsNy4wMjIsMTguNzk1LDUuODk0LDE2LDUuODkzbDAsMGMtMi43OTUsMC01LjMxNCwxLjEyOS03LjE0NywyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBoME'+
			'M1Ljg5NCwxOC43OTUsNy4wMjIsMjEuMzE0LDguODUzLDIzLjE0Nkw4Ljg1MywyMy4xNDZ6Ii8+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xMi40MzMsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2MSwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAsMHY4Ljk5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzEyLjk2OSwyMS42OTMsMTIuNDMzLDIxLjE1OCwxMi40MzMsMjAuNDk4TDEyLjQzMywyMC40OTh6Ii8+CiAgIDxwYXRoIGQ9Ik0xNy4xNzUsMjAuNDk4di04Ljk5NWMwLTAu'+
			'NjYxLDAuNTM1LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTcuNzEsMjEuNjkzLDE3LjE3NSwyMS4xNTgsMTcuMTc1LDIwLjQ5OEwxNy4xNzUsMjAuNDk4eiIvPgogIDwvZz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41MDEsMTYsMy41bDAsMGM2Lj'+
			'kwNCwwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDQtNS41OTYsMTIuNDk5LTEyLjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDQsMy41LDE2TDMuNSwxNnogTTguODUzLDIzLjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS44MzMsMS44MzEsNC4zNTIsMi45Niw3LjE0NywyLjk2MWwwLDBjMi43OTQtMC4wMDEsNS4zMTQtMS4xMyw3LjE0Ny0yLjk2MWwwLDBjMS44MzEtMS44MzIsMi45Ni00LjM1MiwyLjk2LTcuMTQ2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC0yLjc5NS0xLjEyOS01LjMxNC0y'+
			'Ljk2LTcuMTQ3bDAsMEMyMS4zMTQsNy4wMjIsMTguNzk1LDUuODk0LDE2LDUuODkzbDAsMGMtMi43OTUsMC01LjMxNCwxLjEyOS03LjE0NywyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBoMEM1Ljg5NCwxOC43OTUsNy4wMjIsMjEuMzE0LDguODUzLDIzLjE0Nkw4Ljg1MywyMy4xNDZ6Ii8+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xMi40MzMsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2MSwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAsMHY4Ljk5NSYjeGQ7JiN4YT'+
			'smI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzEyLjk2OSwyMS42OTMsMTIuNDMzLDIxLjE1OCwxMi40MzMsMjAuNDk4TDEyLjQzMywyMC40OTh6Ii8+CiAgIDxwYXRoIGQ9Ik0xNy4xNzUsMjAuNDk4di04Ljk5NWMwLTAuNjYxLDAuNTM1LTEuMTk2LDEuMTk2LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTcuNzEsMjEuNjkzLDE3LjE3NSwyMS4xNTgsMTcuMTc1LDIwLjQ5OEwxNy4x'+
			'NzUsMjAuNDk4eiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_pause_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_pause_url__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMy41LDE2QzMuNSw5LjA5Niw5LjA5NiwzLjUwMSwxNiwzLjVsMCwwYzYuOTA0LDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwNC01LjU5NiwxMi40OTktMTIuNSwxMi41bDAs'+
			'MEM5LjA5NiwyOC40OTksMy41LDIyLjkwNCwzLjUsMTZMMy41LDE2eiBNOC44NTMsMjMuMTQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjgzMywxLjgzMSw0LjM1MiwyLjk2LDcuMTQ3LDIuOTYxbDAsMGMyLjc5NC0wLjAwMSw1LjMxNC0xLjEzLDcuMTQ3LTIuOTYxbDAsMGMxLjgzMS0xLjgzMiwyLjk2LTQuMzUyLDIuOTYtNy4xNDZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLTIuNzk1LTEuMTI5LTUuMzE0LTIuOTYtNy4xNDdsMCwwQzIxLjMxNCw3LjAyMiwxOC43OTUsNS44OTQsMTYsNS44OTNsMCwwYy0yLjc5NSwwLTUuMzE0LDEuMTI5LTcuMTQ3LDIuOTZsMCwwJiN4ZDsmI3'+
			'hhOyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGgwQzUuODk0LDE4Ljc5NSw3LjAyMiwyMS4zMTQsOC44NTMsMjMuMTQ2TDguODUzLDIzLjE0NnoiLz4KICA8Zz4KICAgPHBhdGggZD0iTTEyLjQzMywyMC40OTh2LTguOTk1YzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTYtMS4xOTZsMCwwYzAuNjYxLDAsMS4xOTYsMC41MzUsMS4xOTYsMS4xOTZsMCwwdjguOTk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42Ni0wLjUzNiwxLjE5NS0xLjE5NiwxLjE5NWwwLDBDMTIuOTY5LDIxLjY5MywxMi40MzMsMjEuMTU4LDEyLjQzMywyMC40'+
			'OThMMTIuNDMzLDIwLjQ5OHoiLz4KICAgPHBhdGggZD0iTTE3LjE3NSwyMC40OTh2LTguOTk1YzAtMC42NjEsMC41MzUtMS4xOTYsMS4xOTYtMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNSwxLjE5NiwxLjE5NmwwLDB2OC45OTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2LTAuNTM2LDEuMTk1LTEuMTk2LDEuMTk1bDAsMEMxNy43MSwyMS42OTMsMTcuMTc1LDIxLjE1OCwxNy4xNzUsMjAuNDk4TDE3LjE3NSwyMC40OTh6Ii8+CiAgPC9nPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbG'+
			'UoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNTAxLDE2LDMuNWwwLDBjNi45MDQsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTA0LTUuNTk2LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTA0LDMuNSwxNkwzLjUsMTZ6IE04Ljg1MywyMy4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuODMzLDEuODMxLDQuMzUyLDIuOTYsNy4xNDcsMi45NjFsMCwwYzIuNzk0'+
			'LTAuMDAxLDUuMzE0LTEuMTMsNy4xNDctMi45NjFsMCwwYzEuODMxLTEuODMyLDIuOTYtNC4zNTIsMi45Ni03LjE0NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDBDMjEuMzE0LDcuMDIyLDE4Ljc5NSw1Ljg5NCwxNiw1Ljg5M2wwLDBjLTIuNzk1LDAtNS4zMTQsMS4xMjktNy4xNDcsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwaDBDNS44OTQsMTguNzk1LDcuMDIyLDIxLjMxNCw4Ljg1MywyMy4xNDZMOC44NTMsMjMuMTQ2eiIvPgogIDxnPgogIC'+
			'A8cGF0aCBkPSJNMTIuNDMzLDIwLjQ5OHYtOC45OTVjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ni0xLjE5NmwwLDBjMC42NjEsMCwxLjE5NiwwLjUzNSwxLjE5NiwxLjE5NmwwLDB2OC45OTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2LTAuNTM2LDEuMTk1LTEuMTk2LDEuMTk1bDAsMEMxMi45NjksMjEuNjkzLDEyLjQzMywyMS4xNTgsMTIuNDMzLDIwLjQ5OEwxMi40MzMsMjAuNDk4eiIvPgogICA8cGF0aCBkPSJNMTcuMTc1LDIwLjQ5OHYtOC45OTVjMC0wLjY2MSwwLjUzNS0xLjE5NiwxLjE5Ni0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM1LDEuMTk2LDEuMTk2bDAs'+
			'MHY4Ljk5NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYtMC41MzYsMS4xOTUtMS4xOTYsMS4xOTVsMCwwQzE3LjcxLDIxLjY5MywxNy4xNzUsMjEuMTU4LDE3LjE3NSwyMC40OThMMTcuMTc1LDIwLjQ5OHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_pause_url__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_pause_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_url.ggApiPlayer.pauseVideo();
					};
					if (me._popup_video_url.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_url.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_url");
			}
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
		}
		me._ht_video_pause_url.onmouseover=function (e) {
			me._ht_video_pause_url__img.style.visibility='hidden';
			me._ht_video_pause_url__imgo.style.visibility='inherit';
		}
		me._ht_video_pause_url.onmouseout=function (e) {
			me._ht_video_pause_url__img.style.visibility='inherit';
			me._ht_video_pause_url__imgo.style.visibility='hidden';
		}
		me._ht_video_pause_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_pause_url);
		el=me._seekbar_url=document.createElement('div');
		me._seekbar_url__playhead=document.createElement('div');
		me._seekbar_url.mediaEl = null;
		el.ggId="seekbar_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 14px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 246px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_url.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_url__playhead.style.visibility = 'hidden';
				me._seekbar_url.style.background = '#ffffff';
				me._seekbar_url.ggConnected = false;
			}
			if (me._seekbar_url.mediaEl != null) {
				me._seekbar_url.mediaEl.removeEventListener('progress', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.removeEventListener('canplay', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.removeEventListener('timeupdate', me._seekbar_url.updatePlayback);
				if (me._seekbar_url.ggActivate) {
					me._seekbar_url.mediaEl.removeEventListener('play', me._seekbar_url.ggActivate);
				}
				if (me._seekbar_url.ggDeactivate) {
					me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggDeactivate);
					me._seekbar_url.mediaEl.removeEventListener('pause', me._seekbar_url.ggDeactivate);
				}
				if (me._seekbar_url.ggMediaEnded) {
					me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggMediaEnded);
				}
			}
			me._seekbar_url.mediaEl = player.getMediaObject('popup_video_url');
			if (me._seekbar_url.mediaEl != null) {
				me._seekbar_url__playhead.style.visibility = 'inherit';
				me._seekbar_url__playhead.style.left = '1px';
				me._seekbar_url.mediaEl.addEventListener('progress', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.addEventListener('canplay', me._seekbar_url.updatePlayback);
				me._seekbar_url.mediaEl.addEventListener('timeupdate', me._seekbar_url.updatePlayback);
				if (me._seekbar_url.ggActivate) {
					me._seekbar_url.mediaEl.addEventListener('play', me._seekbar_url.ggActivate);
				}
				if (me._seekbar_url.ggDeactivate) {
					me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggDeactivate);
					me._seekbar_url.mediaEl.addEventListener('pause', me._seekbar_url.ggDeactivate);
				}
				if (me._seekbar_url.ggMediaEnded) {
					me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggMediaEnded);
				}
			me._seekbar_url.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_url');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_url.updatePlayback = function() {
			if (!me._seekbar_url.ggConnected) return;
			if (me._seekbar_url.mediaEl != null) {
				if (me._seekbar_url.mediaEl.readyState) {
					var percent = me._seekbar_url.mediaEl.currentTime / me._seekbar_url.mediaEl.duration;
					var playheadpos = Math.round((me._seekbar_url.clientWidth - 2 * 8 + 1) * percent);
					playheadpos += 1;
					me._seekbar_url__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_url.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					for (var i = 0; i < me._seekbar_url.mediaEl.buffered.length; i++) {
						var rangeStart = Math.round((me._seekbar_url.mediaEl.buffered.start(i) / me._seekbar_url.mediaEl.duration) * 100.0);
						var rangeEnd = Math.ceil((me._seekbar_url.mediaEl.buffered.end(i) / me._seekbar_url.mediaEl.duration) * 100.0);
						if (rangeEnd > currPos) {
							if (rangeStart < currPos) {
								gradientString += ', #c0c0c0 ' + currPos + '%';
							} else {
								gradientString += ', #ffffff ' + currPos + '%, #ffffff ' + rangeStart + '%';
								gradientString += ', #c0c0c0 ' + rangeStart + '%';
							}
								gradientString += ', #c0c0c0 ' + rangeEnd + '%';
							currPos = rangeEnd;
						}
					}
					if (currPos < 100) {
						gradientString += ', #ffffff ' + currPos + '%';
					}
					gradientString += ')';
					me._seekbar_url.style.background = gradientString;
				}
			}
		}
		me._seekbar_url.appendChild(me._seekbar_url__playhead);
		hs+='background: #ffffff;';
		hs+='border: 1px solid #ffffff;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 14px;';
		hs_playhead += 'width: 14px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 1px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 7;';
		hs_playhead += cssPrefix + 'border-radius: 7px;';
		hs_playhead += 'background-color: rgba(255,255,255,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_url.setAttribute('style', hs);
		me._seekbar_url__playhead.setAttribute('style', hs_playhead);
		me._seekbar_url.ggIsActive=function() {
			if (me._seekbar_url.mediaEl != null) {
				return (me._seekbar_url.mediaEl.paused == false && me._seekbar_url.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_url.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
					me._seekbar_url.mediaEl.currentTime = seekpos;
				}
			}
		}
		me._seekbar_url.ggActivate=function () {
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
		}
		me._seekbar_url.ggDeactivate=function () {
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
		}
		me._seekbar_url.ggUpdatePosition=function (useTransition) {
		}
		me._seekbar_url.ggNodeChange=function () {
			me._seekbar_url.connectToMediaEl();
		}
		me._video_popup_controls_url.appendChild(me._seekbar_url);
		me.divSkin.appendChild(me._video_popup_controls_url);
		el=me._video_popup_vimeo=document.createElement('div');
		el.ggId="video_popup_vimeo";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_vimeo.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_vimeo') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_vimeo.style[domTransition]='';
				if (me._video_popup_vimeo.ggCurrentLogicStateVisible == 0) {
					me._video_popup_vimeo.style.visibility=(Number(me._video_popup_vimeo.style.opacity)>0||!me._video_popup_vimeo.style.opacity)?'inherit':'hidden';
					me._video_popup_vimeo.ggVisible=true;
				}
				else {
					me._video_popup_vimeo.style.visibility="hidden";
					me._video_popup_vimeo.ggVisible=false;
				}
			}
		}
		me._video_popup_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_vimeo=document.createElement('div');
		els=me._loading_video_vimeo__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iNjQiPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZS'+
			'BjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC4xMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9'+
			'IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIGN4PSIxNiI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdG'+
			'UiIGR1cj0iMXMiIGF0dHJpYnV0ZU5hbWU9InIiIGJlZ2luPSIwLjM3NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJy'+
			'b3RhdGUoMjI1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNjI1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLj'+
			'IgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC43NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFt'+
			'ZT0iciIgYmVnaW49IjAuODc1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC41cyIvPgogPC9jaXJjbGU+Cjwvc3ZnPgo=';
		me._loading_video_vimeo__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_vimeo";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_vimeo.appendChild(me._loading_video_vimeo);
		el=me._popup_video_vimeo=document.createElement('div');
		me._popup_video_vimeo.seekbars = [];
		me._popup_video_vimeo.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_vimeo.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_vimeo.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_vimeo.hasChildNodes()) {
				me._popup_video_vimeo.removeChild(me._popup_video_vimeo.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_vimeo.ggVideoNotLoaded ==false && me._popup_video_vimeo.ggDeactivate) { me._popup_video_vimeo.ggDeactivate(); }
				me._popup_video_vimeo.ggVideoNotLoaded = true;
				return;
			}
			me._popup_video_vimeo.ggVideoNotLoaded = false;
			me._popup_video_vimeo__vid=document.createElement('iframe');
			me._popup_video_vimeo__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;loop=0&amp;rel=0';
			var ggVideoUrl = 'https://player.vimeo.com/video/' + media + ggVideoParams;
			me._popup_video_vimeo__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_vimeo__vid.setAttribute('width', '100%');
			me._popup_video_vimeo__vid.setAttribute('height', '100%');
			me._popup_video_vimeo__vid.setAttribute('allow', 'autoplay');
			me._popup_video_vimeo__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_vimeo__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_vimeo.appendChild(me._popup_video_vimeo__vid);
			me._popup_video_vimeo.ggVideoSource = media;
		}
		el.ggId="popup_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_vimeo') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_vimeo.style[domTransition]='';
				if (me._popup_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._popup_video_vimeo.style.visibility=(Number(me._popup_video_vimeo.style.opacity)>0||!me._popup_video_vimeo.style.opacity)?'inherit':'hidden';
					if (me._popup_video_vimeo.ggVideoNotLoaded) {
						me._popup_video_vimeo.ggInitMedia(me._popup_video_vimeo.ggVideoSource);
					}
					me._popup_video_vimeo.ggVisible=true;
				}
				else {
					me._popup_video_vimeo.style.visibility="hidden";
					me._popup_video_vimeo.ggInitMedia('');
					me._popup_video_vimeo.ggVisible=false;
				}
			}
		}
		me._popup_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_vimeo.appendChild(me._popup_video_vimeo);
		me.divSkin.appendChild(me._video_popup_vimeo);
		el=me._video_popup_youtube=document.createElement('div');
		el.ggId="video_popup_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_youtube') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_popup_youtube.style[domTransition]='';
				if (me._video_popup_youtube.ggCurrentLogicStateVisible == 0) {
					me._video_popup_youtube.style.visibility=(Number(me._video_popup_youtube.style.opacity)>0||!me._video_popup_youtube.style.opacity)?'inherit':'hidden';
					me._video_popup_youtube.ggVisible=true;
				}
				else {
					me._video_popup_youtube.style.visibility="hidden";
					me._video_popup_youtube.ggVisible=false;
				}
			}
		}
		me._video_popup_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._loading_video_youtube=document.createElement('div');
		els=me._loading_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iNjQiPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZS'+
			'BjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC4xMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9'+
			'IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuMjVzIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgY3k9IjMiIHI9IjAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSAxNiAxNikiIGN4PSIxNiI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzM7MDswIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdG'+
			'UiIGR1cj0iMXMiIGF0dHJpYnV0ZU5hbWU9InIiIGJlZ2luPSIwLjM3NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJy'+
			'b3RhdGUoMjI1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjAuNjI1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLj'+
			'IgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC43NXMiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSBjeT0iMyIgcj0iMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2Ij4KICA8YW5pbWF0ZSB2YWx1ZXM9IjA7MzswOzAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgYXR0cmlidXRlTmFt'+
			'ZT0iciIgYmVnaW49IjAuODc1cyIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiPgogIDxhbmltYXRlIHZhbHVlcz0iMDszOzA7MCIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iMC41cyIvPgogPC9jaXJjbGU+Cjwvc3ZnPgo=';
		me._loading_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_youtube.appendChild(me._loading_video_youtube);
		el=me._popup_video_youtube=document.createElement('div');
		me._popup_video_youtube.seekbars = [];
			me._popup_video_youtube.ggYoutubeApiReady = function() { me._popup_video_youtube.ggYoutubeApiLoaded = true;}
		me._popup_video_youtube.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_youtube.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_youtube.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_youtube.hasChildNodes()) {
				me._popup_video_youtube.removeChild(me._popup_video_youtube.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_youtube.ggVideoNotLoaded ==false && me._popup_video_youtube.ggDeactivate) { me._popup_video_youtube.ggDeactivate(); }
				me._popup_video_youtube.ggVideoNotLoaded = true;
				return;
			}
			me._popup_video_youtube.ggVideoNotLoaded = false;
			me._popup_video_youtube__vid=document.createElement('iframe');
			me._popup_video_youtube__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;controls=1&amp;loop=0&amp;enablejsapi=0&amp;rel=0';
			var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
			me._popup_video_youtube__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_youtube__vid.setAttribute('width', '100%');
			me._popup_video_youtube__vid.setAttribute('height', '100%');
			me._popup_video_youtube__vid.setAttribute('allow', 'autoplay');
			me._popup_video_youtube__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_youtube__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_youtube.appendChild(me._popup_video_youtube__vid);
			me._popup_video_youtube.ggVideoSource = media;
			if (me._popup_video_youtube.ggYoutubeApiLoaded && me._popup_video_youtube.ggYoutubeApiLoaded == true) {me._popup_video_youtube.ggYoutubeApiReady();}
		}
		el.ggId="popup_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_youtube') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video_youtube.style[domTransition]='';
				if (me._popup_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._popup_video_youtube.style.visibility=(Number(me._popup_video_youtube.style.opacity)>0||!me._popup_video_youtube.style.opacity)?'inherit':'hidden';
					if (me._popup_video_youtube.ggVideoNotLoaded) {
						me._popup_video_youtube.ggInitMedia(me._popup_video_youtube.ggVideoSource);
					}
					me._popup_video_youtube.ggVisible=true;
				}
				else {
					me._popup_video_youtube.style.visibility="hidden";
					me._popup_video_youtube.ggInitMedia('');
					me._popup_video_youtube.ggVisible=false;
				}
			}
		}
		me._popup_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_youtube.appendChild(me._popup_video_youtube);
		me.divSkin.appendChild(me._video_popup_youtube);
		el=me.__360image_gyro=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=4000;
		el.ggId="360image_gyro";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 86px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 116px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_gyro.ggIsActive=function() {
			return (me.__360image_gyro.ggTimestamp + me.__360image_gyro.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__360image_gyro.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getHasTouch() == true)) && 
				((player.getVariableValue('opt_gyro') == true)) && 
				((player.getVariableValue('vis_360image_once') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me.__360image_gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me.__360image_gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
				me.__360image_gyro.style[domTransition]='opacity 500ms ease 0ms';
				if (me.__360image_gyro.ggCurrentLogicStateVisible == 0) {
					me.__360image_gyro.style.visibility=(Number(me.__360image_gyro.style.opacity)>0||!me.__360image_gyro.style.opacity)?'inherit':'hidden';
					me.__360image_gyro.ggVisible=true;
				}
				else {
					me.__360image_gyro.style.visibility="hidden";
					me.__360image_gyro.ggVisible=false;
				}
			}
		}
		me.__360image_gyro.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.__360image_gyro.ggIsActive() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__360image_gyro.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__360image_gyro.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__360image_gyro.style[domTransition]='opacity 500ms ease 0ms';
				if (me.__360image_gyro.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me.__360image_gyro.style.opacity == 0.0) { me.__360image_gyro.style.visibility="hidden"; } }, 505);
					me.__360image_gyro.style.opacity=0;
				}
				else {
					me.__360image_gyro.style.visibility=me.__360image_gyro.ggVisible?'inherit':'hidden';
					me.__360image_gyro.style.opacity=1;
				}
			}
		}
		me.__360image_gyro.ggDeactivate=function () {
			player.setVariableValue('vis_360image_once', false);
		}
		me.__360image_gyro.ggCurrentLogicStateVisible = -1;
		me.__360image_gyro.ggCurrentLogicStateAlpha = -1;
		me.__360image_gyro.ggUpdateConditionTimer=function () {
			me.__360image_gyro.logicBlock_alpha();
		}
		me.__360image_gyro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me.__360image_timer=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=400;
		el.ggId="360image_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 38px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 25px;';
		hs+='visibility : inherit;';
		hs+='width : 52px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_timer.ggIsActive=function() {
			return (me.__360image_timer.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me.__360image_timer.ggTimestamp) / me.__360image_timer.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_timer.ggActivate=function () {
			player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
			player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
		}
		me.__360image_timer.ggUpdatePosition=function (useTransition) {
		}
		me.__360image_gyro.appendChild(me.__360image_timer);
		el=me.__360image_background=document.createElement('div');
		el.ggId="360image_background";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.509804);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 86px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 116px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image_background.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_background.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__360image_gyro.appendChild(me.__360image_background);
		el=me.__360image_text=document.createElement('div');
		els=me.__360image_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="360image_text";
		el.ggDx=0;
		el.ggDy=32;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 19px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 89px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 89px;';
		hs+='height: 19px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="\u4f7f\u7528\u9640\u87ba\u4eea";
		el.appendChild(els);
		me.__360image_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image_text.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__360image_gyro.appendChild(me.__360image_text);
		el=me.__360image=document.createElement('div');
		el.ggId="360image";
		el.ggDx=0;
		el.ggDy=-8;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 9px;';
		hs+='border-radius : 9px;';
		hs+='background : rgba(255,255,255,0.00392157);';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 58px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 33px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__360image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__360image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((player.getVariableValue('pos_360image') == 4))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me.__360image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me.__360image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me.__360image.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me.__360image.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 2) {
					this.ggDx = -32;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else if (me.__360image.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 32;
					this.ggDy = -8;
					me.__360image.ggUpdatePosition(true);
				}
				else {
					me.__360image.ggDx=0;
					me.__360image.ggDy=-8;
					me.__360image.ggUpdatePosition(true);
				}
			}
		}
		me.__360image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 4))
			)
			{
				newLogicStateScaling = 2;
			}
			else if (
				((player.getVariableValue('pos_360image') == 5))
			)
			{
				newLogicStateScaling = 3;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me.__360image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me.__360image.ggCurrentLogicStateScaling = newLogicStateScaling;
				me.__360image.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me.__360image.ggCurrentLogicStateScaling == 0) {
					me.__360image.ggParameter.sx = 0.7;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 1) {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 2) {
					me.__360image.ggParameter.sx = 0.7;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else if (me.__360image.ggCurrentLogicStateScaling == 3) {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
				else {
					me.__360image.ggParameter.sx = 1;
					me.__360image.ggParameter.sy = 1;
					me.__360image.style[domTransform]=parameterToTransform(me.__360image.ggParameter);
				}
			}
		}
		me.__360image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._phone1=document.createElement('div');
		el.ggId="phone1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 37px;';
		hs+='left : 3px;';
		hs+='position : absolute;';
		hs+='top : 9px;';
		hs+='visibility : inherit;';
		hs+='width : 26px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone1.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone1);
		el=me._phone2=document.createElement('div');
		el.ggId="phone2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 6px;';
		hs+='left : 14px;';
		hs+='position : absolute;';
		hs+='top : 49px;';
		hs+='visibility : inherit;';
		hs+='width : 6px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone2.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 2))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 3))
			)
			{
				newLogicStateScaling = 2;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._phone2.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._phone2.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._phone2.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me._phone2.ggCurrentLogicStateScaling == 0) {
					me._phone2.ggParameter.sx = 0.8;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else if (me._phone2.ggCurrentLogicStateScaling == 1) {
					me._phone2.ggParameter.sx = 1;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else if (me._phone2.ggCurrentLogicStateScaling == 2) {
					me._phone2.ggParameter.sx = 0.8;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
				else {
					me._phone2.ggParameter.sx = 1;
					me._phone2.ggParameter.sy = 1;
					me._phone2.style[domTransform]=parameterToTransform(me._phone2.ggParameter);
				}
			}
		}
		me._phone2.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone2);
		el=me._phone3=document.createElement('div');
		el.ggId="phone3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 1px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 1px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 8px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._phone3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._phone3.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('pos_360image') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getVariableValue('pos_360image') == 0))
			)
			{
				newLogicStateScaling = 2;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._phone3.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._phone3.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._phone3.style[domTransition]='' + cssPrefix + 'transform 1000ms ease 0ms';
				if (me._phone3.ggCurrentLogicStateScaling == 0) {
					me._phone3.ggParameter.sx = 0.8;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else if (me._phone3.ggCurrentLogicStateScaling == 1) {
					me._phone3.ggParameter.sx = 1;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else if (me._phone3.ggCurrentLogicStateScaling == 2) {
					me._phone3.ggParameter.sx = 0.8;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
				else {
					me._phone3.ggParameter.sx = 1;
					me._phone3.ggParameter.sy = 1;
					me._phone3.style[domTransform]=parameterToTransform(me._phone3.ggParameter);
				}
			}
		}
		me._phone3.ggUpdatePosition=function (useTransition) {
		}
		me.__360image.appendChild(me._phone3);
		me.__360image_gyro.appendChild(me.__360image);
		me.divSkin.appendChild(me.__360image_gyro);
		el=me._close=document.createElement('div');
		els=me._close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgd2lkdGg9IjMycHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTIsMTZsMy40NC0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI1LDAtMS42OTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjctMC40NjctMS4yMjUtMC40NjctMS42OTEsMC4wMDFMMTYsMTQuMzA4bC0zLjQ0MS0zLjQ0MWMtMC40NjctMC40NjctMS4yMjQt'+
			'MC40NjctMS42OTEsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40NjcsMC40NjctMC40NjcsMS4yMjQsMCwxLjY5TDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNiwwLDEuNjkyYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40MzksMy40MzljMC40NjgsMC40NjgsMS4yMjUsMC40NjgsMS42OTEsMC4wMDFDMjEuNTk5LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTQuODgyLTQuODgyLTEyLjc5Ni00Ljg4Mi0xNy'+
			'42NzgsMGMtNC44ODEsNC44ODEtNC44ODEsMTIuNzk1LDAsMTcuNjc4YzQuODgxLDQuODgsMTIuNzk2LDQuODgsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTYsMjkuNzIsMTIuMDQyLDI0LjgzOSw3LjE2MXogTTE2LDI2LjEwNmMtMi41ODktMC4wMDEtNS4xNy0wLjk4NS03LjE0Ni0yLjk2MVM1Ljg5NSwxOC41OSw1Ljg5NCwxNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMi41OTEsMC45ODQtNS4xNywyLjk2LTcuMTQ3QzEwLjgzLDYuODc4LDEzLjQwOSw1Ljg5NCwxNiw1Ljg5NGMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4'+
			'OTtjMS45NzYsMS45NzcsMi45NTcsNC41NTYsMi45Niw3LjE0N2MtMC4wMDEsMi41OTEtMC45ODUsNS4xNjktMi45Niw3LjE0OEMyMS4xNjksMjUuMTIyLDE4LjU5MSwyNi4xMDYsMTYsMjYuMTA2eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLT'+
			'AuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4'+
			'Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OS'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgd2lkdGg9IjMycHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGlkPSJMYXllcl8xIiB4bWw6c3BhY2'+
			'U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LDE2KSBzY2FsZSgxLjEpIHRyYW5zbGF0ZSgtMTYsLTE2KSIgb3BhY2l0eT0iMC40Ij4KICA8cGF0aCBzdHJva2U9IiMzQzNDM0MiIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MywxNmwzLjQzOS0zLjQ0YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEu'+
			'MjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxYy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTFjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDEmI3hkOyYjeGE7JiN4OTsmI3g5O2wzLjQ0LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwQzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTT'+
			'I0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OGM0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDAmI3hkOyYjeGE7JiN4OTsmI3g5O0MyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OUM2Ljg3OCwyMS4xNyw1Ljg5NSwxOC41OTEsNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYs'+
			'NC41NTYtMi45NTksNy4xNDgtMi45NmMyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OEMyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2Utd2lkdGg9IjEuNSIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMS4xMzIsMTkuNDM5TD'+
			'E3LjY5MywxNmwzLjQzOS0zLjQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjgtMC40NjcsMC40NjgtMS4yMjYsMC4wMDEtMS42OTNjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkyLDAuMDAxbC0zLjQ0LDMuNDRsLTMuNDQxLTMuNDQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY4LTAuNDY4LTEuMjI1LTAuNDY3LTEuNjkzLDBjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI1LDAsMS42OTJMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY2LTAuNDY3LDEuMjI0LDAsMS42OTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwLjAwMWwzLjQ0'+
			'LTMuNDRsMy40NCwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNCwwLjQ2NywxLjY5MSwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjEuNTk4LDIwLjY2NCwyMS42LDE5LjkwNywyMS4xMzIsMTkuNDM5eiBNMjQuODM5LDcuMTYxYy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuODgxLTQuODgxLDEyLjc5NiwwLDE3LjY3OCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzQuODgyLDQuODgxLDEyLjc5Niw0Ljg4MSwxNy42NzgsMEMyOS43MiwxOS45NTcsMjkuNzIxLDEyLjA0MywyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTksMC01LjE3MS0wLjk4NC03LjE0Ni0yLjk1OSYjeGQ7Ji'+
			'N4YTsmI3g5OyYjeDk7QzYuODc4LDIxLjE3LDUuODk1LDE4LjU5MSw1Ljg5NCwxNmMwLTIuNTkxLDAuOTgzLTUuMTcsMi45NTktNy4xNDdjMS45NzctMS45NzYsNC41NTYtMi45NTksNy4xNDgtMi45NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTljMS45NzUsMS45NzcsMi45NTcsNC41NTYsMi45NTksNy4xNDdjLTAuMDAxLDIuNTkyLTAuOTg0LDUuMTctMi45Niw3LjE0OCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjE3LDI1LjEyMywxOC41OTEsMjYuMTA3LDE2LDI2LjEwNnoiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4K'+
			'IDwvZz4KPC9zdmc+Cg==';
		me._close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._close.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._close.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._close.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._close.style[domTransition]='';
				if (me._close.ggCurrentLogicStateVisible == 0) {
					me._close.style.visibility=(Number(me._close.style.opacity)>0||!me._close.style.opacity)?'inherit':'hidden';
					me._close.ggVisible=true;
				}
				else {
					me._close.style.visibility="hidden";
					me._close.ggVisible=false;
				}
			}
		}
		me._close.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			player.setVariableValue('vis_info_popup', false);
			player.setVariableValue('vis_video_popup_file', false);
			player.setVariableValue('vis_video_popup_url', false);
			player.setVariableValue('vis_video_popup_vimeo', false);
			player.setVariableValue('vis_video_popup_youtube', false);
			if (
				(
					((player.getVariableValue('vis_website') == true)) && 
					((player.getVariableValue('opt_url') == true))
				)
			) {
				me._web_page.ggText="";
				me._web_page.ggTextDiv.innerHTML=me._web_page.ggText;
				if (me._web_page.ggUpdateText) {
					me._web_page.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._web_page.ggUpdatePosition) {
					me._web_page.ggUpdatePosition();
				}
				me._web_page.ggTextDiv.scrollTop = 0;
			}
			player.setVariableValue('vis_website', false);
		}
		me._close.onmouseover=function (e) {
			me._close__img.style.visibility='hidden';
			me._close__imgo.style.visibility='inherit';
		}
		me._close.onmouseout=function (e) {
			me._close__img.style.visibility='inherit';
			me._close__imgo.style.visibility='hidden';
		}
		me._close.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._close);
		el=me._do_not_modify_skin=document.createElement('div');
		el.ggId="do_not_modify_skin";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #404549;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._do_not_modify_skin.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._do_not_modify_skin.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._do_not_modify_skin_text=document.createElement('div');
		els=me._do_not_modify_skin_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="do_not_modify_skin_text";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 205px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 205px;';
		hs+='height: 60px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: normal;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=" Please use the skin <br\/> configuration button<br\/> to modify the skin.";
		el.appendChild(els);
		me._do_not_modify_skin_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._do_not_modify_skin_text.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._do_not_modify_skin.appendChild(me._do_not_modify_skin_text);
		el=me._config_button=document.createElement('div');
		els=me._config_button__img=document.createElement('img');
		els.className='ggskin ggskin_config_button';
		hs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QHSaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjYuMCI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMj'+
			'EtMDQtMjhUMTc6Mzc6NTkrMDg6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTI4VDE3OjM3OjU5KzA4OjAwIgogICB4bXA6Q3JlYXRvclRvb2w9IlBhbm8yVlIgNi4xLjkiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAAdACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcI'+
			'CQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiI'+
			'mKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBKKBR60AGPeijtSUAKKKSigBe1JRRQB//Z';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="config_button";
		el.ggDx=80;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 39px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._config_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._config_button.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._do_not_modify_skin.appendChild(me._config_button);
		me.divSkin.appendChild(me._do_not_modify_skin);
		me._popup_video_file.ggVideoSource = 'media/';
		me._popup_video_file.ggVideoNotLoaded = true;
		me._popup_video_url.ggVideoSource = '';
		me._popup_video_url.ggVideoNotLoaded = true;
		me._popup_video_vimeo.ggVideoSource = '';
		me._popup_video_vimeo.ggVideoNotLoaded = true;
		me._popup_video_youtube.ggVideoSource = '';
		me._popup_video_youtube.ggVideoNotLoaded = true;
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true))
				)
			) {
				me._thumbnail_cloner.ggText="";
				me._thumbnail_cloner.ggUpdate([]);
				skin.updateSize(skin.divSkin);
			}
			me._thumbnail_cloner.ggUpdate();
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true))
				)
			) {
				me._thumbnail_cloner_mobile.ggText="";
				me._thumbnail_cloner_mobile.ggUpdate([]);
				skin.updateSize(skin.divSkin);
			}
			me._thumbnail_cloner_mobile.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._thumbnail_menu.ggUpdatePosition();
			me._thumbnail_menu_mobile.ggUpdatePosition();
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		});
		player.addListener('beforechangenode', function() {
			if (
				(
					((player.getVariableValue('vis_loader') == true))
				)
			) {
				me._loading.style[domTransition]='none';
				me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
				me._loading.ggVisible=true;
			}
		});
		player.addListener('tilesrequested', function() {
			player.setVariableValue('vis_loader', false);
		});
		player.addListener('playerstatechanged', function() {
			player.setVariableValue('pos_controller', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_fullscreen') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			if (
				(
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
			}
			player.setVariableValue('pos_enter_vr', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true)) && 
					((player.hasVR() == true))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_fullscreen') == true)) && 
					((player.hasVR() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_enter_vr', player.getVariableValue('pos_enter_vr') + Number("1"));
			}
			player.setVariableValue('pos_fullscreen', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_gyro') == true)) && 
					((player.getGyroAvailable() == true)) && 
					((player.getOS() != 4))
				)
			) {
				player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
			}
			player.setVariableValue('pos_gyro', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_projection') == true)) && 
					((player.getGyroAvailable() == true))
				)
			) {
				player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
			}
			player.setVariableValue('pos_projection', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_thumbnail') == true)) && 
					((player.getIsTour() == true))
				)
			) {
				player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
			}
			player.setVariableValue('pos_thumbnail', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
			}
			if (
				(
					((player.getVariableValue('opt_info') == true))
				)
			) {
				player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
			}
			player.setVariableValue('pos_information', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("2"));
			}
			if (
				(
					((player.getVariableValue('opt_autorotate') == true))
				)
			) {
				player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("1"));
			}
			player.setVariableValue('pos_autorotate', Number("0"));
			if (
				(
					((player.getVariableValue('opt_zoom') == true))
				)
			) {
				player.setVariableValue('pos_autorotate', player.getVariableValue('pos_autorotate') + Number("2"));
			}
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_changenode = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_activehotspotchanged = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage && hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
					hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_activehotspotchanged = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage && hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
					hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_changenode = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_image && hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage && hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_configloaded = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_mouseover = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_hastouch = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_activehotspotchanged = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_image && hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage && hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
					hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_changenode = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_image && hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage && hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_configloaded = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_mouseover = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_hastouch = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_activehotspotchanged = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_image && hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage && hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
					hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_changenode = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image_image && hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image_customimage && hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_configloaded = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_mouseover = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_hastouch = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image_image && hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._ht_image_customimage && hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
					hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_changenode = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_image && hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_customimage && hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_configloaded = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_hastouch = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info_image && hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_customimage && hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
					hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hsimage && hotspotTemplates['ht_node'][i]._hsimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hsimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_customimage && hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_tooltip && hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_configloaded = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changevisitednodes = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_hastouch = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hsimage && hotspotTemplates['ht_node'][i]._hsimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hsimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_customimage && hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_tooltip && hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_changenode = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url_customimage && hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_configloaded = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_mouseover = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_hastouch = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_activehotspotchanged = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
				if (hotspotTemplates['ht_url'][i]._ht_url_customimage && hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
					hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me._hide_timer.ggLastIsActive!=me._hide_timer.ggIsActive()) {
			me._hide_timer.ggLastIsActive=me._hide_timer.ggIsActive();
			if (me._hide_timer.ggLastIsActive) {
				if (player.transitionsDisabled) {
					me._controller.style[domTransition]='none';
				} else {
					me._controller.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._controller.style.opacity='1';
				me._controller.style.visibility=me._controller.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._show_controller_button.style[domTransition]='none';
				} else {
					me._show_controller_button.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._show_controller_button.style.opacity='0';
				me._show_controller_button.style.visibility='hidden';
				player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
			} else {
				if (player.transitionsDisabled) {
					me._show_controller_button.style[domTransition]='none';
				} else {
					me._show_controller_button.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._show_controller_button.style.opacity='1';
				me._show_controller_button.style.visibility=me._show_controller_button.ggVisible?'inherit':'hidden';
				if (player.transitionsDisabled) {
					me._controller.style[domTransition]='none';
				} else {
					me._controller.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._controller.style.opacity='0';
				me._controller.style.visibility='hidden';
				player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
			}
		}
		if (me.elementMouseOver['controller']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		if (me.elementMouseDown['zoomout']) {
			player.changeFovLog(0.5,true);
		}
		if (me.elementMouseDown['zoomin']) {
			player.changeFovLog(-0.5,true);
		}
		if (me.elementMouseDown['key_up']) {
			player.changeTiltLog(0.5,true);
		}
		if (me.elementMouseDown['key_down']) {
			player.changeTiltLog(-0.5,true);
		}
		if (me.elementMouseDown['key_left']) {
			player.changePanLog(0.5,true);
		}
		if (me.elementMouseDown['key_right']) {
			player.changePanLog(-0.5,true);
		}
		if (me._element_alpha_timer.ggLastIsActive!=me._element_alpha_timer.ggIsActive()) {
			me._element_alpha_timer.ggLastIsActive=me._element_alpha_timer.ggIsActive();
			if (me._element_alpha_timer.ggLastIsActive) {
			} else {
				player.setVariableValue('vis_timer', true);
			}
		}
		if (me.elementMouseOver['thumbnail_cloner']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		if (me.elementMouseOver['thumbnail_cloner_mobile']) {
			if (
				(
					((player.getVariableValue('opt_autohide') == true))
				)
			) {
				me._hide_timer.ggTimeout=Number("5") * 1000.0;
				me._hide_timer.ggTimestamp=skin.ggCurrentTime;
			}
		}
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
		if (me.__360image_gyro.ggLastIsActive!=me.__360image_gyro.ggIsActive()) {
			me.__360image_gyro.ggLastIsActive=me.__360image_gyro.ggIsActive();
			if (me.__360image_gyro.ggLastIsActive) {
			} else {
				player.setVariableValue('vis_360image_once', false);
			}
		}
		me.__360image_gyro.ggUpdateConditionTimer();
		if (me.__360image_timer.ggLastIsActive!=me.__360image_timer.ggIsActive()) {
			me.__360image_timer.ggLastIsActive=me.__360image_timer.ggIsActive();
			if (me.__360image_timer.ggLastIsActive) {
				player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
				player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
			} else {
			}
		}
		if (!player.getLockedKeyboard()) {
			switch(me.skinKeyPressed) {
				case 37:
					player.changePanLog(0.5,true);
					break;
				case 38:
					player.changeTiltLog(0.5,true);
					break;
				case 39:
					player.changePanLog(-0.5,true);
					break;
				case 40:
					player.changeTiltLog(-0.5,true);
					break;
			}
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_video_youtube(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_youtube=document.createElement('div');
		el.ggId="ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube.style.visibility="hidden";
					me._ht_video_youtube.ggVisible=false;
				}
				else {
					me._ht_video_youtube.style.visibility=(Number(me._ht_video_youtube.style.opacity)>0||!me._ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_youtube.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_youtube.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_youtube.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_youtube.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_youtube.style.visibility=me._ht_video_youtube.ggVisible?'inherit':'hidden';
					me._ht_video_youtube.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_youtube.style.opacity == 0.0) { me._ht_video_youtube.style.visibility="hidden"; } }, 505);
					me._ht_video_youtube.style.opacity=0;
				}
			}
		}
		me._ht_video_youtube.onclick=function (e) {
			skin._popup_video_youtube.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_youtube', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_youtube']=true;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ontouchend=function (e) {
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
		}
		me._ht_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_youtube_image=document.createElement('div');
		els=me._ht_video_youtube_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43MjIsNy40Mzgs'+
			'MjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMzLjU2OCwxNC'+
			'40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLDI4LjE3OCwx'+
			'NS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0yLjY1NS0xLj'+
			'E4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTtj'+
			'MC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43Mj'+
			'IsNy40MzgsMjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMz'+
			'LjU2OCwxNC40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLD'+
			'I4LjE3OCwxNS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0y'+
			'LjY1NS0xLjE4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeD'+
			'k7JiN4OTtjMC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_youtube_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_youtube_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjguMTc4LDE1Ljc1OGMtMC4yLTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ2LDBsLTIuODM5LDEuNjM5di0yLjY1OWMwLTAuMTY5LTAuMDY4LTAuMzM1LTAuMTg4LTAuNDU2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuMjg2LTAuMTg5LTAuNDU2LTAu'+
			'MTg5aC0yLjA1NmMxLjA2LTAuOTM3LDEuNzI5LTIuMzA1LDEuNzI5LTMuODMxQzIzLjcyMiw3LjQzOCwyMS40MzQsNS4xNSwxOC42MSw1LjE1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTIuODI0LDAtNS4xMTIsMi4yODktNS4xMTIsNS4xMTJjMCwxLjUyNiwwLjY2OSwyLjg5NSwxLjcyOSwzLjgzMUgxMS43NmMwLjY0NC0wLjcwMiwxLjAzNy0xLjYzOCwxLjAzOC0yLjY2NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjE4LTEuNzY3LTMuOTQ2LTMuOTQ3LTMuOTQ3Yy0yLjE4LDAtMy45NDYsMS43NjctMy45NDcsMy45NDdjMCwxLjAyOCwwLjM5NCwxLjk2NCwxLjAzNywyLjY2Nkg0LjE0NCYjeG'+
			'Q7JiN4YTsmI3g5OyYjeDk7Yy0wLjE2OSwwLTAuMzM1LDAuMDY5LTAuNDU2LDAuMTg4QzMuNTY4LDE0LjQwMiwzLjUsMTQuNTY4LDMuNSwxNC43Mzd2MTEuNDY4YzAsMC4xNywwLjA2OCwwLjMzNiwwLjE4OCwwLjQ1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTIsMC4xMTksMC4yODYsMC4xODgsMC40NTYsMC4xODhoMTkuOTA1YzAuMTcsMCwwLjMzNi0wLjA2OCwwLjQ1Ni0wLjE4OGMwLjEyLTAuMTIxLDAuMTg4LTAuMjg3LDAuMTg4LTAuNDU3di0yLjY2bDIuODM5LDEuNjQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yLDAuMTE1LDAuNDQ1LDAuMTE1LDAuNjQ2LDBjMC4xOTktMC4xMTUsMC4zMjIt'+
			'MC4zMjgsMC4zMjItMC41NTl2LTguMzExQzI4LjUsMTYuMDg2LDI4LjM3NywxNS44NzMsMjguMTc4LDE1Ljc1OHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMTQuNzg4LDEwLjI2MmMwLjAwNC0yLjExMSwxLjcxMi0zLjgxOCwzLjgyMy0zLjgyMmMyLjExMSwwLjAwNCwzLjgxOSwxLjcxMSwzLjgyMywzLjgyMmMtMC4wMDQsMi4xMTEtMS43MTIsMy44MTktMy44MjMsMy44MjMmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNi41LDE0LjA4MSwxNC43OTIsMTIuMzczLDE0Ljc4OCwxMC4yNjJ6IE04Ljg1MSw4Ljc2OWMxLjQ2OCwwLjAwMywyLjY1NSwxLjE5LDIuNjU4LDIuNjU4Yy0wLjAwMiwxLjQ2OC0xLjE5LD'+
			'IuNjU1LTIuNjU4LDIuNjU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNDY3LTAuMDAyLTIuNjU1LTEuMTg5LTIuNjU3LTIuNjU3QzYuMTk2LDkuOTU5LDcuMzgzLDguNzcyLDguODUxLDguNzY5eiBNMjcuMjExLDIzLjUxbC0yLjg0LTEuNjM5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTk5LTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ1LDBzLTAuMzIyLDAuMzI4LTAuMzIyLDAuNTU5djMuMTMxSDQuNzg5VjE1LjM4MmgxOC42MTV2Mi40OTlIMTAuMTIyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMzU1LDAtMC42NDUsMC4yODktMC42NDUsMC42NDVjMCwwLjM1NywwLjI4OSwwLjY0NSwwLjY0NSwwLjY0'+
			'NUgyMy45OWMwLjA1NCwwLDAuMTA0LTAuMDA4LDAuMTUzLTAuMDImI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA3OS0wLjAxMiwwLjE1Ni0wLjAzNywwLjIyOC0wLjA3OGwyLjg0LTEuNjQxVjIzLjUxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yOC4xNzgsMTUuNzU4Yy0wLjItMC4xMTUtMC40NDUtMC4xMTUtMC42NDYsMGwtMi44MzksMS42Mzl2LTIuNjU5YzAtMC4xNj'+
			'ktMC4wNjgtMC4zMzUtMC4xODgtMC40NTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC4yODYtMC4xODktMC40NTYtMC4xODloLTIuMDU2YzEuMDYtMC45MzcsMS43MjktMi4zMDUsMS43MjktMy44MzFDMjMuNzIyLDcuNDM4LDIxLjQzNCw1LjE1LDE4LjYxLDUuMTUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMi44MjQsMC01LjExMiwyLjI4OS01LjExMiw1LjExMmMwLDEuNTI2LDAuNjY5LDIuODk1LDEuNzI5LDMuODMxSDExLjc2YzAuNjQ0LTAuNzAyLDEuMDM3LTEuNjM4LDEuMDM4LTIuNjY2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMDAxLTIuMTgtMS43NjctMy45NDYtMy45NDctMy45NDdjLTIuMTgs'+
			'MC0zLjk0NiwxLjc2Ny0zLjk0NywzLjk0N2MwLDEuMDI4LDAuMzk0LDEuOTY0LDEuMDM3LDIuNjY2SDQuMTQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTY5LDAtMC4zMzUsMC4wNjktMC40NTYsMC4xODhDMy41NjgsMTQuNDAyLDMuNSwxNC41NjgsMy41LDE0LjczN3YxMS40NjhjMCwwLjE3LDAuMDY4LDAuMzM2LDAuMTg4LDAuNDU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xMiwwLjExOSwwLjI4NiwwLjE4OCwwLjQ1NiwwLjE4OGgxOS45MDVjMC4xNywwLDAuMzM2LTAuMDY4LDAuNDU2LTAuMTg4YzAuMTItMC4xMjEsMC4xODgtMC4yODcsMC4xODgtMC40NTd2LTIuNjZsMi44MzksMS42NDEmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5O2MwLjIsMC4xMTUsMC40NDUsMC4xMTUsMC42NDYsMGMwLjE5OS0wLjExNSwwLjMyMi0wLjMyOCwwLjMyMi0wLjU1OXYtOC4zMTFDMjguNSwxNi4wODYsMjguMzc3LDE1Ljg3MywyOC4xNzgsMTUuNzU4eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xNC43ODgsMTAuMjYyYzAuMDA0LTIuMTExLDEuNzEyLTMuODE4LDMuODIzLTMuODIyYzIuMTExLDAuMDA0LDMuODE5LDEuNzExLDMuODIzLDMuODIyYy0wLjAwNCwyLjExMS0xLjcxMiwzLjgxOS0zLjgyMywzLjgyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE2LjUsMTQuMDgxLDE0Ljc5MiwxMi4zNzMsMTQuNzg4LDEwLjI2Mnog'+
			'TTguODUxLDguNzY5YzEuNDY4LDAuMDAzLDIuNjU1LDEuMTksMi42NTgsMi42NThjLTAuMDAyLDEuNDY4LTEuMTksMi42NTUtMi42NTgsMi42NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS40NjctMC4wMDItMi42NTUtMS4xODktMi42NTctMi42NTdDNi4xOTYsOS45NTksNy4zODMsOC43NzIsOC44NTEsOC43Njl6IE0yNy4yMTEsMjMuNTFsLTIuODQtMS42MzkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xOTktMC4xMTUtMC40NDUtMC4xMTUtMC42NDUsMHMtMC4zMjIsMC4zMjgtMC4zMjIsMC41NTl2My4xMzFINC43ODlWMTUuMzgyaDE4LjYxNXYyLjQ5OUgxMC4xMjImI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O2MtMC4zNTUsMC0wLjY0NSwwLjI4OS0wLjY0NSwwLjY0NWMwLDAuMzU3LDAuMjg5LDAuNjQ1LDAuNjQ1LDAuNjQ1SDIzLjk5YzAuMDU0LDAsMC4xMDQtMC4wMDgsMC4xNTMtMC4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDc5LTAuMDEyLDAuMTU2LTAuMDM3LDAuMjI4LTAuMDc4bDIuODQtMS42NDFWMjMuNTF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_youtube_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_youtube_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_youtube_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube_image.style[domTransition]='';
				if (me._ht_video_youtube_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube_image.style.visibility="hidden";
					me._ht_video_youtube_image.ggVisible=false;
				}
				else {
					me._ht_video_youtube_image.style.visibility=(Number(me._ht_video_youtube_image.style.opacity)>0||!me._ht_video_youtube_image.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube_image.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube_image.onmouseover=function (e) {
			me._ht_video_youtube_image__img.style.visibility='hidden';
			me._ht_video_youtube_image__imgo.style.visibility='inherit';
		}
		me._ht_video_youtube_image.onmouseout=function (e) {
			me._ht_video_youtube_image__img.style.visibility='inherit';
			me._ht_video_youtube_image__imgo.style.visibility='hidden';
		}
		me._ht_video_youtube_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_youtube.appendChild(me._ht_video_youtube_image);
		el=me._tt_ht_video_youtube=document.createElement('div');
		els=me._tt_ht_video_youtube__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_youtube";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_youtube.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_youtube.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_youtube.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_youtube.style.top='-47px';
					me._tt_ht_video_youtube.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_youtube.ggDx=0;
					me._tt_ht_video_youtube.style.top='24px';
					me._tt_ht_video_youtube.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_youtube'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_youtube.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_youtube.style.visibility=(Number(me._tt_ht_video_youtube.style.opacity)>0||!me._tt_ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_youtube.ggVisible=true;
				}
				else {
					me._tt_ht_video_youtube.style.visibility="hidden";
					me._tt_ht_video_youtube.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_youtube.appendChild(me._tt_ht_video_youtube);
		el=me._ht_video_youtube_customimage=document.createElement('div');
		els=me._ht_video_youtube_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_youtube_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_youtube_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_youtube_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_youtube_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_youtube_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_youtube_customimage.style[domTransition]='';
				if (me._ht_video_youtube_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_youtube_customimage.style.visibility="hidden";
					me._ht_video_youtube_customimage__img.src = '';
					me._ht_video_youtube_customimage.ggVisible=false;
				}
				else {
					me._ht_video_youtube_customimage.style.visibility=(Number(me._ht_video_youtube_customimage.style.opacity)>0||!me._ht_video_youtube_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_youtube_customimage.ggSubElement.src=me._ht_video_youtube_customimage.ggText;
					me._ht_video_youtube_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_youtube_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_youtube_customimage.clientWidth;
			var parentHeight = me._ht_video_youtube_customimage.clientHeight;
			var img = me._ht_video_youtube_customimage__img;
			var aspectRatioDiv = me._ht_video_youtube_customimage.clientWidth / me._ht_video_youtube_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_youtube.appendChild(me._ht_video_youtube_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_youtube;
	};
	function SkinHotspotClass_ht_video_vimeo(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_vimeo=document.createElement('div');
		el.ggId="ht_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo.style.visibility="hidden";
					me._ht_video_vimeo.ggVisible=false;
				}
				else {
					me._ht_video_vimeo.style.visibility=(Number(me._ht_video_vimeo.style.opacity)>0||!me._ht_video_vimeo.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_vimeo.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_vimeo.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_vimeo.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_vimeo.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_vimeo.style.visibility=me._ht_video_vimeo.ggVisible?'inherit':'hidden';
					me._ht_video_vimeo.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_vimeo.style.opacity == 0.0) { me._ht_video_vimeo.style.visibility="hidden"; } }, 505);
					me._ht_video_vimeo.style.opacity=0;
				}
			}
		}
		me._ht_video_vimeo.onclick=function (e) {
			skin._popup_video_vimeo.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_vimeo', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_vimeo']=true;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ontouchend=function (e) {
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
		}
		me._ht_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_vimeo_image=document.createElement('div');
		els=me._ht_video_vimeo_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43MjIsNy40Mzgs'+
			'MjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMzLjU2OCwxNC'+
			'40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLDI4LjE3OCwx'+
			'NS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0yLjY1NS0xLj'+
			'E4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTtj'+
			'MC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43Mj'+
			'IsNy40MzgsMjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMz'+
			'LjU2OCwxNC40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLD'+
			'I4LjE3OCwxNS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0y'+
			'LjY1NS0xLjE4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeD'+
			'k7JiN4OTtjMC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_vimeo_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_vimeo_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjguMTc4LDE1Ljc1OGMtMC4yLTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ2LDBsLTIuODM5LDEuNjM5di0yLjY1OWMwLTAuMTY5LTAuMDY4LTAuMzM1LTAuMTg4LTAuNDU2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuMjg2LTAuMTg5LTAuNDU2LTAu'+
			'MTg5aC0yLjA1NmMxLjA2LTAuOTM3LDEuNzI5LTIuMzA1LDEuNzI5LTMuODMxQzIzLjcyMiw3LjQzOCwyMS40MzQsNS4xNSwxOC42MSw1LjE1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTIuODI0LDAtNS4xMTIsMi4yODktNS4xMTIsNS4xMTJjMCwxLjUyNiwwLjY2OSwyLjg5NSwxLjcyOSwzLjgzMUgxMS43NmMwLjY0NC0wLjcwMiwxLjAzNy0xLjYzOCwxLjAzOC0yLjY2NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjE4LTEuNzY3LTMuOTQ2LTMuOTQ3LTMuOTQ3Yy0yLjE4LDAtMy45NDYsMS43NjctMy45NDcsMy45NDdjMCwxLjAyOCwwLjM5NCwxLjk2NCwxLjAzNywyLjY2Nkg0LjE0NCYjeG'+
			'Q7JiN4YTsmI3g5OyYjeDk7Yy0wLjE2OSwwLTAuMzM1LDAuMDY5LTAuNDU2LDAuMTg4QzMuNTY4LDE0LjQwMiwzLjUsMTQuNTY4LDMuNSwxNC43Mzd2MTEuNDY4YzAsMC4xNywwLjA2OCwwLjMzNiwwLjE4OCwwLjQ1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTIsMC4xMTksMC4yODYsMC4xODgsMC40NTYsMC4xODhoMTkuOTA1YzAuMTcsMCwwLjMzNi0wLjA2OCwwLjQ1Ni0wLjE4OGMwLjEyLTAuMTIxLDAuMTg4LTAuMjg3LDAuMTg4LTAuNDU3di0yLjY2bDIuODM5LDEuNjQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yLDAuMTE1LDAuNDQ1LDAuMTE1LDAuNjQ2LDBjMC4xOTktMC4xMTUsMC4zMjIt'+
			'MC4zMjgsMC4zMjItMC41NTl2LTguMzExQzI4LjUsMTYuMDg2LDI4LjM3NywxNS44NzMsMjguMTc4LDE1Ljc1OHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMTQuNzg4LDEwLjI2MmMwLjAwNC0yLjExMSwxLjcxMi0zLjgxOCwzLjgyMy0zLjgyMmMyLjExMSwwLjAwNCwzLjgxOSwxLjcxMSwzLjgyMywzLjgyMmMtMC4wMDQsMi4xMTEtMS43MTIsMy44MTktMy44MjMsMy44MjMmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNi41LDE0LjA4MSwxNC43OTIsMTIuMzczLDE0Ljc4OCwxMC4yNjJ6IE04Ljg1MSw4Ljc2OWMxLjQ2OCwwLjAwMywyLjY1NSwxLjE5LDIuNjU4LDIuNjU4Yy0wLjAwMiwxLjQ2OC0xLjE5LD'+
			'IuNjU1LTIuNjU4LDIuNjU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNDY3LTAuMDAyLTIuNjU1LTEuMTg5LTIuNjU3LTIuNjU3QzYuMTk2LDkuOTU5LDcuMzgzLDguNzcyLDguODUxLDguNzY5eiBNMjcuMjExLDIzLjUxbC0yLjg0LTEuNjM5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTk5LTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ1LDBzLTAuMzIyLDAuMzI4LTAuMzIyLDAuNTU5djMuMTMxSDQuNzg5VjE1LjM4MmgxOC42MTV2Mi40OTlIMTAuMTIyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMzU1LDAtMC42NDUsMC4yODktMC42NDUsMC42NDVjMCwwLjM1NywwLjI4OSwwLjY0NSwwLjY0NSwwLjY0'+
			'NUgyMy45OWMwLjA1NCwwLDAuMTA0LTAuMDA4LDAuMTUzLTAuMDImI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA3OS0wLjAxMiwwLjE1Ni0wLjAzNywwLjIyOC0wLjA3OGwyLjg0LTEuNjQxVjIzLjUxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yOC4xNzgsMTUuNzU4Yy0wLjItMC4xMTUtMC40NDUtMC4xMTUtMC42NDYsMGwtMi44MzksMS42Mzl2LTIuNjU5YzAtMC4xNj'+
			'ktMC4wNjgtMC4zMzUtMC4xODgtMC40NTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC4yODYtMC4xODktMC40NTYtMC4xODloLTIuMDU2YzEuMDYtMC45MzcsMS43MjktMi4zMDUsMS43MjktMy44MzFDMjMuNzIyLDcuNDM4LDIxLjQzNCw1LjE1LDE4LjYxLDUuMTUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMi44MjQsMC01LjExMiwyLjI4OS01LjExMiw1LjExMmMwLDEuNTI2LDAuNjY5LDIuODk1LDEuNzI5LDMuODMxSDExLjc2YzAuNjQ0LTAuNzAyLDEuMDM3LTEuNjM4LDEuMDM4LTIuNjY2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMDAxLTIuMTgtMS43NjctMy45NDYtMy45NDctMy45NDdjLTIuMTgs'+
			'MC0zLjk0NiwxLjc2Ny0zLjk0NywzLjk0N2MwLDEuMDI4LDAuMzk0LDEuOTY0LDEuMDM3LDIuNjY2SDQuMTQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTY5LDAtMC4zMzUsMC4wNjktMC40NTYsMC4xODhDMy41NjgsMTQuNDAyLDMuNSwxNC41NjgsMy41LDE0LjczN3YxMS40NjhjMCwwLjE3LDAuMDY4LDAuMzM2LDAuMTg4LDAuNDU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xMiwwLjExOSwwLjI4NiwwLjE4OCwwLjQ1NiwwLjE4OGgxOS45MDVjMC4xNywwLDAuMzM2LTAuMDY4LDAuNDU2LTAuMTg4YzAuMTItMC4xMjEsMC4xODgtMC4yODcsMC4xODgtMC40NTd2LTIuNjZsMi44MzksMS42NDEmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5O2MwLjIsMC4xMTUsMC40NDUsMC4xMTUsMC42NDYsMGMwLjE5OS0wLjExNSwwLjMyMi0wLjMyOCwwLjMyMi0wLjU1OXYtOC4zMTFDMjguNSwxNi4wODYsMjguMzc3LDE1Ljg3MywyOC4xNzgsMTUuNzU4eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xNC43ODgsMTAuMjYyYzAuMDA0LTIuMTExLDEuNzEyLTMuODE4LDMuODIzLTMuODIyYzIuMTExLDAuMDA0LDMuODE5LDEuNzExLDMuODIzLDMuODIyYy0wLjAwNCwyLjExMS0xLjcxMiwzLjgxOS0zLjgyMywzLjgyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE2LjUsMTQuMDgxLDE0Ljc5MiwxMi4zNzMsMTQuNzg4LDEwLjI2Mnog'+
			'TTguODUxLDguNzY5YzEuNDY4LDAuMDAzLDIuNjU1LDEuMTksMi42NTgsMi42NThjLTAuMDAyLDEuNDY4LTEuMTksMi42NTUtMi42NTgsMi42NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS40NjctMC4wMDItMi42NTUtMS4xODktMi42NTctMi42NTdDNi4xOTYsOS45NTksNy4zODMsOC43NzIsOC44NTEsOC43Njl6IE0yNy4yMTEsMjMuNTFsLTIuODQtMS42MzkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xOTktMC4xMTUtMC40NDUtMC4xMTUtMC42NDUsMHMtMC4zMjIsMC4zMjgtMC4zMjIsMC41NTl2My4xMzFINC43ODlWMTUuMzgyaDE4LjYxNXYyLjQ5OUgxMC4xMjImI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O2MtMC4zNTUsMC0wLjY0NSwwLjI4OS0wLjY0NSwwLjY0NWMwLDAuMzU3LDAuMjg5LDAuNjQ1LDAuNjQ1LDAuNjQ1SDIzLjk5YzAuMDU0LDAsMC4xMDQtMC4wMDgsMC4xNTMtMC4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDc5LTAuMDEyLDAuMTU2LTAuMDM3LDAuMjI4LTAuMDc4bDIuODQtMS42NDFWMjMuNTF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_vimeo_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_vimeo_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_vimeo_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo_image.style[domTransition]='';
				if (me._ht_video_vimeo_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo_image.style.visibility="hidden";
					me._ht_video_vimeo_image.ggVisible=false;
				}
				else {
					me._ht_video_vimeo_image.style.visibility=(Number(me._ht_video_vimeo_image.style.opacity)>0||!me._ht_video_vimeo_image.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo_image.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo_image.onmouseover=function (e) {
			me._ht_video_vimeo_image__img.style.visibility='hidden';
			me._ht_video_vimeo_image__imgo.style.visibility='inherit';
		}
		me._ht_video_vimeo_image.onmouseout=function (e) {
			me._ht_video_vimeo_image__img.style.visibility='inherit';
			me._ht_video_vimeo_image__imgo.style.visibility='hidden';
		}
		me._ht_video_vimeo_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_vimeo.appendChild(me._ht_video_vimeo_image);
		el=me._tt_ht_video_vimeo=document.createElement('div');
		els=me._tt_ht_video_vimeo__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_vimeo";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_vimeo.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_vimeo.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_vimeo.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_vimeo.style.top='-47px';
					me._tt_ht_video_vimeo.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_vimeo.ggDx=0;
					me._tt_ht_video_vimeo.style.top='24px';
					me._tt_ht_video_vimeo.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_vimeo'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_vimeo.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_vimeo.style.visibility=(Number(me._tt_ht_video_vimeo.style.opacity)>0||!me._tt_ht_video_vimeo.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_vimeo.ggVisible=true;
				}
				else {
					me._tt_ht_video_vimeo.style.visibility="hidden";
					me._tt_ht_video_vimeo.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_vimeo.appendChild(me._tt_ht_video_vimeo);
		el=me._ht_video_vimeo_customimage=document.createElement('div');
		els=me._ht_video_vimeo_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_vimeo_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_vimeo_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_vimeo_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_vimeo_customimage.style[domTransition]='';
				if (me._ht_video_vimeo_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_vimeo_customimage.style.visibility="hidden";
					me._ht_video_vimeo_customimage__img.src = '';
					me._ht_video_vimeo_customimage.ggVisible=false;
				}
				else {
					me._ht_video_vimeo_customimage.style.visibility=(Number(me._ht_video_vimeo_customimage.style.opacity)>0||!me._ht_video_vimeo_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_vimeo_customimage.ggSubElement.src=me._ht_video_vimeo_customimage.ggText;
					me._ht_video_vimeo_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_vimeo_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_vimeo_customimage.clientWidth;
			var parentHeight = me._ht_video_vimeo_customimage.clientHeight;
			var img = me._ht_video_vimeo_customimage__img;
			var aspectRatioDiv = me._ht_video_vimeo_customimage.clientWidth / me._ht_video_vimeo_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_vimeo.appendChild(me._ht_video_vimeo_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_vimeo;
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_url=document.createElement('div');
		el.ggId="ht_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_url.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url.style.visibility="hidden";
					me._ht_video_url.ggVisible=false;
				}
				else {
					me._ht_video_url.style.visibility=(Number(me._ht_video_url.style.opacity)>0||!me._ht_video_url.style.opacity)?'inherit':'hidden';
					me._ht_video_url.ggVisible=true;
				}
			}
		}
		me._ht_video_url.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_url.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url.style.visibility=me._ht_video_url.ggVisible?'inherit':'hidden';
					me._ht_video_url.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_url.style.opacity == 0.0) { me._ht_video_url.style.visibility="hidden"; } }, 505);
					me._ht_video_url.style.opacity=0;
				}
			}
		}
		me._ht_video_url.onclick=function (e) {
			skin._popup_video_url.ggInitMedia(me.hotspot.url);
			player.setVariableValue('vis_video_popup_url', true);
			if (skin._popup_video_url.ggApiPlayer) {
				if (skin._popup_video_url.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						skin._popup_video_url.ggApiPlayer.playVideo();
					};
					if (skin._popup_video_url.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (skin._popup_video_url.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (skin._popup_video_url.ggApiPlayerType == 'vimeo') {
					skin._popup_video_url.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_url","1");
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ontouchend=function (e) {
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
		}
		me._ht_video_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_url_image=document.createElement('div');
		els=me._ht_video_url_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43MjIsNy40Mzgs'+
			'MjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMzLjU2OCwxNC'+
			'40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLDI4LjE3OCwx'+
			'NS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0yLjY1NS0xLj'+
			'E4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTtj'+
			'MC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43Mj'+
			'IsNy40MzgsMjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMz'+
			'LjU2OCwxNC40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLD'+
			'I4LjE3OCwxNS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0y'+
			'LjY1NS0xLjE4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeD'+
			'k7JiN4OTtjMC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_url_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_url_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjguMTc4LDE1Ljc1OGMtMC4yLTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ2LDBsLTIuODM5LDEuNjM5di0yLjY1OWMwLTAuMTY5LTAuMDY4LTAuMzM1LTAuMTg4LTAuNDU2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuMjg2LTAuMTg5LTAuNDU2LTAu'+
			'MTg5aC0yLjA1NmMxLjA2LTAuOTM3LDEuNzI5LTIuMzA1LDEuNzI5LTMuODMxQzIzLjcyMiw3LjQzOCwyMS40MzQsNS4xNSwxOC42MSw1LjE1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTIuODI0LDAtNS4xMTIsMi4yODktNS4xMTIsNS4xMTJjMCwxLjUyNiwwLjY2OSwyLjg5NSwxLjcyOSwzLjgzMUgxMS43NmMwLjY0NC0wLjcwMiwxLjAzNy0xLjYzOCwxLjAzOC0yLjY2NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjE4LTEuNzY3LTMuOTQ2LTMuOTQ3LTMuOTQ3Yy0yLjE4LDAtMy45NDYsMS43NjctMy45NDcsMy45NDdjMCwxLjAyOCwwLjM5NCwxLjk2NCwxLjAzNywyLjY2Nkg0LjE0NCYjeG'+
			'Q7JiN4YTsmI3g5OyYjeDk7Yy0wLjE2OSwwLTAuMzM1LDAuMDY5LTAuNDU2LDAuMTg4QzMuNTY4LDE0LjQwMiwzLjUsMTQuNTY4LDMuNSwxNC43Mzd2MTEuNDY4YzAsMC4xNywwLjA2OCwwLjMzNiwwLjE4OCwwLjQ1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTIsMC4xMTksMC4yODYsMC4xODgsMC40NTYsMC4xODhoMTkuOTA1YzAuMTcsMCwwLjMzNi0wLjA2OCwwLjQ1Ni0wLjE4OGMwLjEyLTAuMTIxLDAuMTg4LTAuMjg3LDAuMTg4LTAuNDU3di0yLjY2bDIuODM5LDEuNjQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yLDAuMTE1LDAuNDQ1LDAuMTE1LDAuNjQ2LDBjMC4xOTktMC4xMTUsMC4zMjIt'+
			'MC4zMjgsMC4zMjItMC41NTl2LTguMzExQzI4LjUsMTYuMDg2LDI4LjM3NywxNS44NzMsMjguMTc4LDE1Ljc1OHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMTQuNzg4LDEwLjI2MmMwLjAwNC0yLjExMSwxLjcxMi0zLjgxOCwzLjgyMy0zLjgyMmMyLjExMSwwLjAwNCwzLjgxOSwxLjcxMSwzLjgyMywzLjgyMmMtMC4wMDQsMi4xMTEtMS43MTIsMy44MTktMy44MjMsMy44MjMmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNi41LDE0LjA4MSwxNC43OTIsMTIuMzczLDE0Ljc4OCwxMC4yNjJ6IE04Ljg1MSw4Ljc2OWMxLjQ2OCwwLjAwMywyLjY1NSwxLjE5LDIuNjU4LDIuNjU4Yy0wLjAwMiwxLjQ2OC0xLjE5LD'+
			'IuNjU1LTIuNjU4LDIuNjU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNDY3LTAuMDAyLTIuNjU1LTEuMTg5LTIuNjU3LTIuNjU3QzYuMTk2LDkuOTU5LDcuMzgzLDguNzcyLDguODUxLDguNzY5eiBNMjcuMjExLDIzLjUxbC0yLjg0LTEuNjM5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTk5LTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ1LDBzLTAuMzIyLDAuMzI4LTAuMzIyLDAuNTU5djMuMTMxSDQuNzg5VjE1LjM4MmgxOC42MTV2Mi40OTlIMTAuMTIyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMzU1LDAtMC42NDUsMC4yODktMC42NDUsMC42NDVjMCwwLjM1NywwLjI4OSwwLjY0NSwwLjY0NSwwLjY0'+
			'NUgyMy45OWMwLjA1NCwwLDAuMTA0LTAuMDA4LDAuMTUzLTAuMDImI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA3OS0wLjAxMiwwLjE1Ni0wLjAzNywwLjIyOC0wLjA3OGwyLjg0LTEuNjQxVjIzLjUxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yOC4xNzgsMTUuNzU4Yy0wLjItMC4xMTUtMC40NDUtMC4xMTUtMC42NDYsMGwtMi44MzksMS42Mzl2LTIuNjU5YzAtMC4xNj'+
			'ktMC4wNjgtMC4zMzUtMC4xODgtMC40NTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC4yODYtMC4xODktMC40NTYtMC4xODloLTIuMDU2YzEuMDYtMC45MzcsMS43MjktMi4zMDUsMS43MjktMy44MzFDMjMuNzIyLDcuNDM4LDIxLjQzNCw1LjE1LDE4LjYxLDUuMTUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMi44MjQsMC01LjExMiwyLjI4OS01LjExMiw1LjExMmMwLDEuNTI2LDAuNjY5LDIuODk1LDEuNzI5LDMuODMxSDExLjc2YzAuNjQ0LTAuNzAyLDEuMDM3LTEuNjM4LDEuMDM4LTIuNjY2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMDAxLTIuMTgtMS43NjctMy45NDYtMy45NDctMy45NDdjLTIuMTgs'+
			'MC0zLjk0NiwxLjc2Ny0zLjk0NywzLjk0N2MwLDEuMDI4LDAuMzk0LDEuOTY0LDEuMDM3LDIuNjY2SDQuMTQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTY5LDAtMC4zMzUsMC4wNjktMC40NTYsMC4xODhDMy41NjgsMTQuNDAyLDMuNSwxNC41NjgsMy41LDE0LjczN3YxMS40NjhjMCwwLjE3LDAuMDY4LDAuMzM2LDAuMTg4LDAuNDU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xMiwwLjExOSwwLjI4NiwwLjE4OCwwLjQ1NiwwLjE4OGgxOS45MDVjMC4xNywwLDAuMzM2LTAuMDY4LDAuNDU2LTAuMTg4YzAuMTItMC4xMjEsMC4xODgtMC4yODcsMC4xODgtMC40NTd2LTIuNjZsMi44MzksMS42NDEmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5O2MwLjIsMC4xMTUsMC40NDUsMC4xMTUsMC42NDYsMGMwLjE5OS0wLjExNSwwLjMyMi0wLjMyOCwwLjMyMi0wLjU1OXYtOC4zMTFDMjguNSwxNi4wODYsMjguMzc3LDE1Ljg3MywyOC4xNzgsMTUuNzU4eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xNC43ODgsMTAuMjYyYzAuMDA0LTIuMTExLDEuNzEyLTMuODE4LDMuODIzLTMuODIyYzIuMTExLDAuMDA0LDMuODE5LDEuNzExLDMuODIzLDMuODIyYy0wLjAwNCwyLjExMS0xLjcxMiwzLjgxOS0zLjgyMywzLjgyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE2LjUsMTQuMDgxLDE0Ljc5MiwxMi4zNzMsMTQuNzg4LDEwLjI2Mnog'+
			'TTguODUxLDguNzY5YzEuNDY4LDAuMDAzLDIuNjU1LDEuMTksMi42NTgsMi42NThjLTAuMDAyLDEuNDY4LTEuMTksMi42NTUtMi42NTgsMi42NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS40NjctMC4wMDItMi42NTUtMS4xODktMi42NTctMi42NTdDNi4xOTYsOS45NTksNy4zODMsOC43NzIsOC44NTEsOC43Njl6IE0yNy4yMTEsMjMuNTFsLTIuODQtMS42MzkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xOTktMC4xMTUtMC40NDUtMC4xMTUtMC42NDUsMHMtMC4zMjIsMC4zMjgtMC4zMjIsMC41NTl2My4xMzFINC43ODlWMTUuMzgyaDE4LjYxNXYyLjQ5OUgxMC4xMjImI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O2MtMC4zNTUsMC0wLjY0NSwwLjI4OS0wLjY0NSwwLjY0NWMwLDAuMzU3LDAuMjg5LDAuNjQ1LDAuNjQ1LDAuNjQ1SDIzLjk5YzAuMDU0LDAsMC4xMDQtMC4wMDgsMC4xNTMtMC4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDc5LTAuMDEyLDAuMTU2LTAuMDM3LDAuMjI4LTAuMDc4bDIuODQtMS42NDFWMjMuNTF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_url_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_url_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_url_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url_image.style[domTransition]='';
				if (me._ht_video_url_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url_image.style.visibility="hidden";
					me._ht_video_url_image.ggVisible=false;
				}
				else {
					me._ht_video_url_image.style.visibility=(Number(me._ht_video_url_image.style.opacity)>0||!me._ht_video_url_image.style.opacity)?'inherit':'hidden';
					me._ht_video_url_image.ggVisible=true;
				}
			}
		}
		me._ht_video_url_image.onmouseover=function (e) {
			me._ht_video_url_image__img.style.visibility='hidden';
			me._ht_video_url_image__imgo.style.visibility='inherit';
		}
		me._ht_video_url_image.onmouseout=function (e) {
			me._ht_video_url_image__img.style.visibility='inherit';
			me._ht_video_url_image__imgo.style.visibility='hidden';
		}
		me._ht_video_url_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_url.appendChild(me._ht_video_url_image);
		el=me._tt_ht_video_url=document.createElement('div');
		els=me._tt_ht_video_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_url.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_url.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_url.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_url.style.top='-47px';
					me._tt_ht_video_url.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_url.ggDx=0;
					me._tt_ht_video_url.style.top='24px';
					me._tt_ht_video_url.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_url'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_url.style.visibility=(Number(me._tt_ht_video_url.style.opacity)>0||!me._tt_ht_video_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_url.ggVisible=true;
				}
				else {
					me._tt_ht_video_url.style.visibility="hidden";
					me._tt_ht_video_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_url.appendChild(me._tt_ht_video_url);
		el=me._ht_video_url_customimage=document.createElement('div');
		els=me._ht_video_url_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_url_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_url_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_url_customimage.style[domTransition]='';
				if (me._ht_video_url_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_url_customimage.style.visibility="hidden";
					me._ht_video_url_customimage__img.src = '';
					me._ht_video_url_customimage.ggVisible=false;
				}
				else {
					me._ht_video_url_customimage.style.visibility=(Number(me._ht_video_url_customimage.style.opacity)>0||!me._ht_video_url_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_url_customimage.ggSubElement.src=me._ht_video_url_customimage.ggText;
					me._ht_video_url_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_url_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_url_customimage.clientWidth;
			var parentHeight = me._ht_video_url_customimage.clientHeight;
			var img = me._ht_video_url_customimage__img;
			var aspectRatioDiv = me._ht_video_url_customimage.clientWidth / me._ht_video_url_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_url.appendChild(me._ht_video_url_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_url;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_file=document.createElement('div');
		el.ggId="ht_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_file.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file.style.visibility="hidden";
					me._ht_video_file.ggVisible=false;
				}
				else {
					me._ht_video_file.style.visibility=(Number(me._ht_video_file.style.opacity)>0||!me._ht_video_file.style.opacity)?'inherit':'hidden';
					me._ht_video_file.ggVisible=true;
				}
			}
		}
		me._ht_video_file.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_video_file.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_video_file.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file.style.visibility=me._ht_video_file.ggVisible?'inherit':'hidden';
					me._ht_video_file.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_video_file.style.opacity == 0.0) { me._ht_video_file.style.visibility="hidden"; } }, 505);
					me._ht_video_file.style.opacity=0;
				}
			}
		}
		me._ht_video_file.onclick=function (e) {
			skin._popup_video_file.ggInitMedia(player.getBasePath()+""+me.hotspot.url);
			player.setVariableValue('vis_video_popup_file', true);
			if (skin._popup_video_file.ggApiPlayer) {
				if (skin._popup_video_file.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						skin._popup_video_file.ggApiPlayer.playVideo();
					};
					if (skin._popup_video_file.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (skin._popup_video_file.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (skin._popup_video_file.ggApiPlayerType == 'vimeo') {
					skin._popup_video_file.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_file","1");
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ontouchend=function (e) {
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
		}
		me._ht_video_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_file_image=document.createElement('div');
		els=me._ht_video_file_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43MjIsNy40Mzgs'+
			'MjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMzLjU2OCwxNC'+
			'40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLDI4LjE3OCwx'+
			'NS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0yLjY1NS0xLj'+
			'E4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTtj'+
			'MC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPHBhdGggZD0iTTI4LjE3OCwxNS43NThjLTAuMi0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NiwwbC0yLjgzOSwxLjYzOXYtMi42NTljMC0wLjE2OS0wLjA2OC0wLjMzNS0wLjE4OC0wLjQ1NiYjeGQ7JiN4YTsmI3g5OyYjeDk7cy0wLjI4Ni0wLjE4OS0wLjQ1Ni0wLjE4OWgtMi4wNTZjMS4wNi0wLjkzNywxLjcyOS0yLjMwNSwxLjcyOS0zLjgzMUMyMy43Mj'+
			'IsNy40MzgsMjEuNDM0LDUuMTUsMTguNjEsNS4xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0yLjgyNCwwLTUuMTEyLDIuMjg5LTUuMTEyLDUuMTEyYzAsMS41MjYsMC42NjksMi44OTUsMS43MjksMy44MzFIMTEuNzZjMC42NDQtMC43MDIsMS4wMzctMS42MzgsMS4wMzgtMi42NjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4wMDEtMi4xOC0xLjc2Ny0zLjk0Ni0zLjk0Ny0zLjk0N2MtMi4xOCwwLTMuOTQ2LDEuNzY3LTMuOTQ3LDMuOTQ3YzAsMS4wMjgsMC4zOTQsMS45NjQsMS4wMzcsMi42NjZINC4xNDQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xNjksMC0wLjMzNSwwLjA2OS0wLjQ1NiwwLjE4OEMz'+
			'LjU2OCwxNC40MDIsMy41LDE0LjU2OCwzLjUsMTQuNzM3djExLjQ2OGMwLDAuMTcsMC4wNjgsMC4zMzYsMC4xODgsMC40NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyLDAuMTE5LDAuMjg2LDAuMTg4LDAuNDU2LDAuMTg4aDE5LjkwNWMwLjE3LDAsMC4zMzYtMC4wNjgsMC40NTYtMC4xODhjMC4xMi0wLjEyMSwwLjE4OC0wLjI4NywwLjE4OC0wLjQ1N3YtMi42NmwyLjgzOSwxLjY0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjExNSwwLjQ0NSwwLjExNSwwLjY0NiwwYzAuMTk5LTAuMTE1LDAuMzIyLTAuMzI4LDAuMzIyLTAuNTU5di04LjMxMUMyOC41LDE2LjA4NiwyOC4zNzcsMTUuODczLD'+
			'I4LjE3OCwxNS43NTh6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTTE0Ljc4OCwxMC4yNjJjMC4wMDQtMi4xMTEsMS43MTItMy44MTgsMy44MjMtMy44MjJjMi4xMTEsMC4wMDQsMy44MTksMS43MTEsMy44MjMsMy44MjJjLTAuMDA0LDIuMTExLTEuNzEyLDMuODE5LTMuODIzLDMuODIzJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMTYuNSwxNC4wODEsMTQuNzkyLDEyLjM3MywxNC43ODgsMTAuMjYyeiBNOC44NTEsOC43NjljMS40NjgsMC4wMDMsMi42NTUsMS4xOSwyLjY1OCwyLjY1OGMtMC4wMDIsMS40NjgtMS4xOSwyLjY1NS0yLjY1OCwyLjY1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQ2Ny0wLjAwMi0y'+
			'LjY1NS0xLjE4OS0yLjY1Ny0yLjY1N0M2LjE5Niw5Ljk1OSw3LjM4Myw4Ljc3Miw4Ljg1MSw4Ljc2OXogTTI3LjIxMSwyMy41MWwtMi44NC0xLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjE5OS0wLjExNS0wLjQ0NS0wLjExNS0wLjY0NSwwcy0wLjMyMiwwLjMyOC0wLjMyMiwwLjU1OXYzLjEzMUg0Ljc4OVYxNS4zODJoMTguNjE1djIuNDk5SDEwLjEyMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjM1NSwwLTAuNjQ1LDAuMjg5LTAuNjQ1LDAuNjQ1YzAsMC4zNTcsMC4yODksMC42NDUsMC42NDUsMC42NDVIMjMuOTljMC4wNTQsMCwwLjEwNC0wLjAwOCwwLjE1My0wLjAyJiN4ZDsmI3hhOyYjeD'+
			'k7JiN4OTtjMC4wNzktMC4wMTIsMC4xNTYtMC4wMzcsMC4yMjgtMC4wNzhsMi44NC0xLjY0MVYyMy41MXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_file_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_file_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMjguMTc4LDE1Ljc1OGMtMC4yLTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ2LDBsLTIuODM5LDEuNjM5di0yLjY1OWMwLTAuMTY5LTAuMDY4LTAuMzM1LTAuMTg4LTAuNDU2JiN4ZDsmI3hhOyYjeDk7JiN4OTtzLTAuMjg2LTAuMTg5LTAuNDU2LTAu'+
			'MTg5aC0yLjA1NmMxLjA2LTAuOTM3LDEuNzI5LTIuMzA1LDEuNzI5LTMuODMxQzIzLjcyMiw3LjQzOCwyMS40MzQsNS4xNSwxOC42MSw1LjE1JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTIuODI0LDAtNS4xMTIsMi4yODktNS4xMTIsNS4xMTJjMCwxLjUyNiwwLjY2OSwyLjg5NSwxLjcyOSwzLjgzMUgxMS43NmMwLjY0NC0wLjcwMiwxLjAzNy0xLjYzOCwxLjAzOC0yLjY2NiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjAwMS0yLjE4LTEuNzY3LTMuOTQ2LTMuOTQ3LTMuOTQ3Yy0yLjE4LDAtMy45NDYsMS43NjctMy45NDcsMy45NDdjMCwxLjAyOCwwLjM5NCwxLjk2NCwxLjAzNywyLjY2Nkg0LjE0NCYjeG'+
			'Q7JiN4YTsmI3g5OyYjeDk7Yy0wLjE2OSwwLTAuMzM1LDAuMDY5LTAuNDU2LDAuMTg4QzMuNTY4LDE0LjQwMiwzLjUsMTQuNTY4LDMuNSwxNC43Mzd2MTEuNDY4YzAsMC4xNywwLjA2OCwwLjMzNiwwLjE4OCwwLjQ1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTIsMC4xMTksMC4yODYsMC4xODgsMC40NTYsMC4xODhoMTkuOTA1YzAuMTcsMCwwLjMzNi0wLjA2OCwwLjQ1Ni0wLjE4OGMwLjEyLTAuMTIxLDAuMTg4LTAuMjg3LDAuMTg4LTAuNDU3di0yLjY2bDIuODM5LDEuNjQxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4yLDAuMTE1LDAuNDQ1LDAuMTE1LDAuNjQ2LDBjMC4xOTktMC4xMTUsMC4zMjIt'+
			'MC4zMjgsMC4zMjItMC41NTl2LTguMzExQzI4LjUsMTYuMDg2LDI4LjM3NywxNS44NzMsMjguMTc4LDE1Ljc1OHomI3hkOyYjeGE7JiN4OTsmI3g5OyBNMTQuNzg4LDEwLjI2MmMwLjAwNC0yLjExMSwxLjcxMi0zLjgxOCwzLjgyMy0zLjgyMmMyLjExMSwwLjAwNCwzLjgxOSwxLjcxMSwzLjgyMywzLjgyMmMtMC4wMDQsMi4xMTEtMS43MTIsMy44MTktMy44MjMsMy44MjMmI3hkOyYjeGE7JiN4OTsmI3g5O0MxNi41LDE0LjA4MSwxNC43OTIsMTIuMzczLDE0Ljc4OCwxMC4yNjJ6IE04Ljg1MSw4Ljc2OWMxLjQ2OCwwLjAwMywyLjY1NSwxLjE5LDIuNjU4LDIuNjU4Yy0wLjAwMiwxLjQ2OC0xLjE5LD'+
			'IuNjU1LTIuNjU4LDIuNjU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuNDY3LTAuMDAyLTIuNjU1LTEuMTg5LTIuNjU3LTIuNjU3QzYuMTk2LDkuOTU5LDcuMzgzLDguNzcyLDguODUxLDguNzY5eiBNMjcuMjExLDIzLjUxbC0yLjg0LTEuNjM5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTk5LTAuMTE1LTAuNDQ1LTAuMTE1LTAuNjQ1LDBzLTAuMzIyLDAuMzI4LTAuMzIyLDAuNTU5djMuMTMxSDQuNzg5VjE1LjM4MmgxOC42MTV2Mi40OTlIMTAuMTIyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMzU1LDAtMC42NDUsMC4yODktMC42NDUsMC42NDVjMCwwLjM1NywwLjI4OSwwLjY0NSwwLjY0NSwwLjY0'+
			'NUgyMy45OWMwLjA1NCwwLDAuMTA0LTAuMDA4LDAuMTUzLTAuMDImI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjA3OS0wLjAxMiwwLjE1Ni0wLjAzNywwLjIyOC0wLjA3OGwyLjg0LTEuNjQxVjIzLjUxeiIvPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0yOC4xNzgsMTUuNzU4Yy0wLjItMC4xMTUtMC40NDUtMC4xMTUtMC42NDYsMGwtMi44MzksMS42Mzl2LTIuNjU5YzAtMC4xNj'+
			'ktMC4wNjgtMC4zMzUtMC4xODgtMC40NTYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC4yODYtMC4xODktMC40NTYtMC4xODloLTIuMDU2YzEuMDYtMC45MzcsMS43MjktMi4zMDUsMS43MjktMy44MzFDMjMuNzIyLDcuNDM4LDIxLjQzNCw1LjE1LDE4LjYxLDUuMTUmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMi44MjQsMC01LjExMiwyLjI4OS01LjExMiw1LjExMmMwLDEuNTI2LDAuNjY5LDIuODk1LDEuNzI5LDMuODMxSDExLjc2YzAuNjQ0LTAuNzAyLDEuMDM3LTEuNjM4LDEuMDM4LTIuNjY2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMDAxLTIuMTgtMS43NjctMy45NDYtMy45NDctMy45NDdjLTIuMTgs'+
			'MC0zLjk0NiwxLjc2Ny0zLjk0NywzLjk0N2MwLDEuMDI4LDAuMzk0LDEuOTY0LDEuMDM3LDIuNjY2SDQuMTQ0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTY5LDAtMC4zMzUsMC4wNjktMC40NTYsMC4xODhDMy41NjgsMTQuNDAyLDMuNSwxNC41NjgsMy41LDE0LjczN3YxMS40NjhjMCwwLjE3LDAuMDY4LDAuMzM2LDAuMTg4LDAuNDU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xMiwwLjExOSwwLjI4NiwwLjE4OCwwLjQ1NiwwLjE4OGgxOS45MDVjMC4xNywwLDAuMzM2LTAuMDY4LDAuNDU2LTAuMTg4YzAuMTItMC4xMjEsMC4xODgtMC4yODcsMC4xODgtMC40NTd2LTIuNjZsMi44MzksMS42NDEmI3'+
			'hkOyYjeGE7JiN4OTsmI3g5O2MwLjIsMC4xMTUsMC40NDUsMC4xMTUsMC42NDYsMGMwLjE5OS0wLjExNSwwLjMyMi0wLjMyOCwwLjMyMi0wLjU1OXYtOC4zMTFDMjguNSwxNi4wODYsMjguMzc3LDE1Ljg3MywyOC4xNzgsMTUuNzU4eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0xNC43ODgsMTAuMjYyYzAuMDA0LTIuMTExLDEuNzEyLTMuODE4LDMuODIzLTMuODIyYzIuMTExLDAuMDA0LDMuODE5LDEuNzExLDMuODIzLDMuODIyYy0wLjAwNCwyLjExMS0xLjcxMiwzLjgxOS0zLjgyMywzLjgyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7QzE2LjUsMTQuMDgxLDE0Ljc5MiwxMi4zNzMsMTQuNzg4LDEwLjI2Mnog'+
			'TTguODUxLDguNzY5YzEuNDY4LDAuMDAzLDIuNjU1LDEuMTksMi42NTgsMi42NThjLTAuMDAyLDEuNDY4LTEuMTksMi42NTUtMi42NTgsMi42NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS40NjctMC4wMDItMi42NTUtMS4xODktMi42NTctMi42NTdDNi4xOTYsOS45NTksNy4zODMsOC43NzIsOC44NTEsOC43Njl6IE0yNy4yMTEsMjMuNTFsLTIuODQtMS42MzkmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xOTktMC4xMTUtMC40NDUtMC4xMTUtMC42NDUsMHMtMC4zMjIsMC4zMjgtMC4zMjIsMC41NTl2My4xMzFINC43ODlWMTUuMzgyaDE4LjYxNXYyLjQ5OUgxMC4xMjImI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O2MtMC4zNTUsMC0wLjY0NSwwLjI4OS0wLjY0NSwwLjY0NWMwLDAuMzU3LDAuMjg5LDAuNjQ1LDAuNjQ1LDAuNjQ1SDIzLjk5YzAuMDU0LDAsMC4xMDQtMC4wMDgsMC4xNTMtMC4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMDc5LTAuMDEyLDAuMTU2LTAuMDM3LDAuMjI4LTAuMDc4bDIuODQtMS42NDFWMjMuNTF6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_file_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_file_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_file_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file_image.style[domTransition]='';
				if (me._ht_video_file_image.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file_image.style.visibility="hidden";
					me._ht_video_file_image.ggVisible=false;
				}
				else {
					me._ht_video_file_image.style.visibility=(Number(me._ht_video_file_image.style.opacity)>0||!me._ht_video_file_image.style.opacity)?'inherit':'hidden';
					me._ht_video_file_image.ggVisible=true;
				}
			}
		}
		me._ht_video_file_image.onmouseover=function (e) {
			me._ht_video_file_image__img.style.visibility='hidden';
			me._ht_video_file_image__imgo.style.visibility='inherit';
		}
		me._ht_video_file_image.onmouseout=function (e) {
			me._ht_video_file_image__img.style.visibility='inherit';
			me._ht_video_file_image__imgo.style.visibility='hidden';
		}
		me._ht_video_file_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_video_file.appendChild(me._ht_video_file_image);
		el=me._tt_ht_video_file=document.createElement('div');
		els=me._tt_ht_video_file__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_file";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_file.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_file.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_video_file.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_file.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_video_file.style.top='-47px';
					me._tt_ht_video_file.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_video_file.ggDx=0;
					me._tt_ht_video_file.style.top='24px';
					me._tt_ht_video_file.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_file.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_video_file.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_file.style.visibility=(Number(me._tt_ht_video_file.style.opacity)>0||!me._tt_ht_video_file.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_file.ggVisible=true;
				}
				else {
					me._tt_ht_video_file.style.visibility="hidden";
					me._tt_ht_video_file.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_file.appendChild(me._tt_ht_video_file);
		el=me._ht_video_file_customimage=document.createElement('div');
		els=me._ht_video_file_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_video_file_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_video_file_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_video_file_customimage.style[domTransition]='';
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_video_file_customimage.style.visibility="hidden";
					me._ht_video_file_customimage__img.src = '';
					me._ht_video_file_customimage.ggVisible=false;
				}
				else {
					me._ht_video_file_customimage.style.visibility=(Number(me._ht_video_file_customimage.style.opacity)>0||!me._ht_video_file_customimage.style.opacity)?'inherit':'hidden';
					me._ht_video_file_customimage.ggSubElement.src=me._ht_video_file_customimage.ggText;
					me._ht_video_file_customimage.ggVisible=true;
				}
			}
		}
		me._ht_video_file_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_video_file_customimage.clientWidth;
			var parentHeight = me._ht_video_file_customimage.clientHeight;
			var img = me._ht_video_file_customimage__img;
			var aspectRatioDiv = me._ht_video_file_customimage.clientWidth / me._ht_video_file_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_video_file.appendChild(me._ht_video_file_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_video_file;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_image.ggCurrentLogicStateVisible == 0) {
					me._ht_image.style.visibility="hidden";
					me._ht_image.ggVisible=false;
				}
				else {
					me._ht_image.style.visibility=(Number(me._ht_image.style.opacity)>0||!me._ht_image.style.opacity)?'inherit':'hidden';
					me._ht_image.ggVisible=true;
				}
			}
		}
		me._ht_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_image.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_image.ggCurrentLogicStateAlpha == 0) {
					me._ht_image.style.visibility=me._ht_image.ggVisible?'inherit':'hidden';
					me._ht_image.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_image.style.opacity == 0.0) { me._ht_image.style.visibility="hidden"; } }, 505);
					me._ht_image.style.opacity=0;
				}
			}
		}
		me._ht_image.onclick=function (e) {
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			player.setVariableValue('vis_image_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ontouchend=function (e) {
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_image=document.createElement('div');
		els=me._ht_image_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPHBhdGggZD0iTTEzLjcxMiwxMy40MDljMS4wMDUsMCwxLjgyLTAuODE1LDEuODItMS44MjFjMC0xLjAwNS0wLjgxNS0xLjgyMS0xLjgyLTEuODIxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEuMDA2LDAtMS44MjEsMC44MTUtMS44MjEsMS44MjFDMTEuODkyLDEyLjU5NCwxMi43MDcsMTMuNDA5LDEzLjcxMiwxMy40MDl6IE0yOC4zMDQsNy4zMTkmI3hkOyYjeGE7JiN4'+
			'OTsmI3g5O2MtMC4xMjUtMC4xMjUtMC4yOTctMC4xOTYtMC40NzMtMC4xOTZINC4xNjljLTAuMTc2LDAtMC4zNDksMC4wNzEtMC40NzQsMC4xOTZDMy41NzEsNy40NDQsMy41LDcuNjE3LDMuNSw3Ljc5M3YxNi40MTQmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLDAuMTc2LDAuMDcxLDAuMzQ4LDAuMTk2LDAuNDczYzAuMTI1LDAuMTI1LDAuMjk3LDAuMTk3LDAuNDczLDAuMTk3aDIzLjY2MmMwLjE3NiwwLDAuMzQ4LTAuMDcyLDAuNDczLTAuMTk3JiN4ZDsmI3hhOyYjeDk7JiN4OTtzMC4xOTYtMC4yOTcsMC4xOTYtMC40NzNWNy43OTNDMjguNSw3LjYxNywyOC40MjksNy40NDQsMjguMzA0LDcuMzE5ei'+
			'BNNC44MzksOC40NjJIMjcuMTZsMC4wMDEsNy4xODQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC41NTctMC4zNzgtMS4yOS0wLjg3NS0yLjA5NS0xLjQyMWMtMS4wMDEtMC42NzYtMi4yNTQtMC45ODYtMy41MDMtMC45ODljLTEuMjY2LDAuMDAyLTIuNTQsMC4zMjEtMy41NiwxLjAwOWwtMy41NzUsMi40MjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4zMjktMC4yMjMtMC44MTMtMC41NTItMS4zNTMtMC45MThjLTAuNTE0LTAuMzQ0LTEuMTI5LTAuNDY2LTEuNzc0LTAuNDY5Yy0xLjE1NiwwLjAwNC0yLjQ1NCwwLjQwNy0zLjU1OCwxLjE1bC0yLjkwNSwxLjk3MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Vjgu'+
			'NDYyeiBNNC44MzksMjMuNTM3di0zLjUxMmwzLjY1OC0yLjQ4MmMwLjg2Ny0wLjU5NCwxLjk3Mi0wLjkyMywyLjgwNS0wLjkxOWMwLjQ2Ni0wLjAwMiwwLjgzMSwwLjEwMywxLjAyMiwwLjIzOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMzMzLDAuMjI2LDAuNjQ1LDAuNDM3LDAuOTEzLDAuNjE5bC0zLjg2OSwyLjYyN2MtMC4zMDYsMC4yMDctMC4zODYsMC42MjMtMC4xNzksMC45M2MwLjEzLDAuMTg5LDAuMzQsMC4yOTMsMC41NTUsMC4yOTMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEyOSwwLDAuMjYtMC4wMzcsMC4zNzUtMC4xMTVsOC42MzgtNS44NjFjMC43MzQtMC41MDIsMS43Ny0wLjc4LDIuOD'+
			'A3LTAuNzc4YzEuMDIzLTAuMDAyLDIuMDM2LDAuMjY5LDIuNzUxLDAuNzU3JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMS4yNTgsMC44NTMsMi4zNDYsMS41OTEsMi44NDcsMS45MzF2Ni4yNzNINC44Mzl6Ii8+CiA8L2c+CiA8ZyBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIwLjIiPgogIDxwYXRoIGQ9Ik0xMy43MTIsMTMuNDA5YzEuMDA1LDAsMS44Mi0wLjgxNSwxLjgyLTEuODIxYzAtMS4wMDUtMC44MTUtMS44MjEtMS44Mi0xLjgyMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjAwNiwwLTEuODIxLDAuODE1LTEuODIxLDEuODIxQzEx'+
			'Ljg5MiwxMi41OTQsMTIuNzA3LDEzLjQwOSwxMy43MTIsMTMuNDA5eiBNMjguMzA0LDcuMzE5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMTI1LTAuMTI1LTAuMjk3LTAuMTk2LTAuNDczLTAuMTk2SDQuMTY5Yy0wLjE3NiwwLTAuMzQ5LDAuMDcxLTAuNDc0LDAuMTk2QzMuNTcxLDcuNDQ0LDMuNSw3LjYxNywzLjUsNy43OTN2MTYuNDE0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjE3NiwwLjA3MSwwLjM0OCwwLjE5NiwwLjQ3M2MwLjEyNSwwLjEyNSwwLjI5NywwLjE5NywwLjQ3MywwLjE5N2gyMy42NjJjMC4xNzYsMCwwLjM0OC0wLjA3MiwwLjQ3My0wLjE5NyYjeGQ7JiN4YTsmI3g5OyYjeDk7cz'+
			'AuMTk2LTAuMjk3LDAuMTk2LTAuNDczVjcuNzkzQzI4LjUsNy42MTcsMjguNDI5LDcuNDQ0LDI4LjMwNCw3LjMxOXogTTQuODM5LDguNDYySDI3LjE2bDAuMDAxLDcuMTg0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNTU3LTAuMzc4LTEuMjktMC44NzUtMi4wOTUtMS40MjFjLTEuMDAxLTAuNjc2LTIuMjU0LTAuOTg2LTMuNTAzLTAuOTg5Yy0xLjI2NiwwLjAwMi0yLjU0LDAuMzIxLTMuNTYsMS4wMDlsLTMuNTc1LDIuNDI2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMzI5LTAuMjIzLTAuODEzLTAuNTUyLTEuMzUzLTAuOTE4Yy0wLjUxNC0wLjM0NC0xLjEyOS0wLjQ2Ni0xLjc3NC0wLjQ2OWMtMS4x'+
			'NTYsMC4wMDQtMi40NTQsMC40MDctMy41NTgsMS4xNWwtMi45MDUsMS45NzEmI3hkOyYjeGE7JiN4OTsmI3g5O1Y4LjQ2MnogTTQuODM5LDIzLjUzN3YtMy41MTJsMy42NTgtMi40ODJjMC44NjctMC41OTQsMS45NzItMC45MjMsMi44MDUtMC45MTljMC40NjYtMC4wMDIsMC44MzEsMC4xMDMsMS4wMjIsMC4yMzgmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjMzMywwLjIyNiwwLjY0NSwwLjQzNywwLjkxMywwLjYxOWwtMy44NjksMi42MjdjLTAuMzA2LDAuMjA3LTAuMzg2LDAuNjIzLTAuMTc5LDAuOTNjMC4xMywwLjE4OSwwLjM0LDAuMjkzLDAuNTU1LDAuMjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC'+
			'4xMjksMCwwLjI2LTAuMDM3LDAuMzc1LTAuMTE1bDguNjM4LTUuODYxYzAuNzM0LTAuNTAyLDEuNzctMC43OCwyLjgwNy0wLjc3OGMxLjAyMy0wLjAwMiwyLjAzNiwwLjI2OSwyLjc1MSwwLjc1NyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuMjU4LDAuODUzLDIuMzQ2LDEuNTkxLDIuODQ3LDEuOTMxdjYuMjczSDQuODM5eiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_image_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_image_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJNMTMuNzEyLDEzLjQwOWMxLjAwNSwwLDEuODItMC44MTUsMS44Mi0xLjgyMWMwLTEuMDA1LTAuODE1LTEuODIxLTEuODItMS44MjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS4wMDYsMC0xLjgyMSwwLjgxNS0xLjgyMSwxLjgyMUMxMS44OTIsMTIu'+
			'NTk0LDEyLjcwNywxMy40MDksMTMuNzEyLDEzLjQwOXogTTI4LjMwNCw3LjMxOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjEyNS0wLjEyNS0wLjI5Ny0wLjE5Ni0wLjQ3My0wLjE5Nkg0LjE2OWMtMC4xNzYsMC0wLjM0OSwwLjA3MS0wLjQ3NCwwLjE5NkMzLjU3MSw3LjQ0NCwzLjUsNy42MTcsMy41LDcuNzkzdjE2LjQxNCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC4xNzYsMC4wNzEsMC4zNDgsMC4xOTYsMC40NzNjMC4xMjUsMC4xMjUsMC4yOTcsMC4xOTcsMC40NzMsMC4xOTdoMjMuNjYyYzAuMTc2LDAsMC4zNDgtMC4wNzIsMC40NzMtMC4xOTcmI3hkOyYjeGE7JiN4OTsmI3g5O3MwLjE5Ni0wLj'+
			'I5NywwLjE5Ni0wLjQ3M1Y3Ljc5M0MyOC41LDcuNjE3LDI4LjQyOSw3LjQ0NCwyOC4zMDQsNy4zMTl6IE00LjgzOSw4LjQ2MkgyNy4xNmwwLjAwMSw3LjE4NCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjU1Ny0wLjM3OC0xLjI5LTAuODc1LTIuMDk1LTEuNDIxYy0xLjAwMS0wLjY3Ni0yLjI1NC0wLjk4Ni0zLjUwMy0wLjk4OWMtMS4yNjYsMC4wMDItMi41NCwwLjMyMS0zLjU2LDEuMDA5bC0zLjU3NSwyLjQyNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMyOS0wLjIyMy0wLjgxMy0wLjU1Mi0xLjM1My0wLjkxOGMtMC41MTQtMC4zNDQtMS4xMjktMC40NjYtMS43NzQtMC40NjljLTEuMTU2LDAuMDA0'+
			'LTIuNDU0LDAuNDA3LTMuNTU4LDEuMTVsLTIuOTA1LDEuOTcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtWOC40NjJ6IE00LjgzOSwyMy41Mzd2LTMuNTEybDMuNjU4LTIuNDgyYzAuODY3LTAuNTk0LDEuOTcyLTAuOTIzLDIuODA1LTAuOTE5YzAuNDY2LTAuMDAyLDAuODMxLDAuMTAzLDEuMDIyLDAuMjM4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zMzMsMC4yMjYsMC42NDUsMC40MzcsMC45MTMsMC42MTlsLTMuODY5LDIuNjI3Yy0wLjMwNiwwLjIwNy0wLjM4NiwwLjYyMy0wLjE3OSwwLjkzYzAuMTMsMC4xODksMC4zNCwwLjI5MywwLjU1NSwwLjI5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTI5LDAsMC'+
			'4yNi0wLjAzNywwLjM3NS0wLjExNWw4LjYzOC01Ljg2MWMwLjczNC0wLjUwMiwxLjc3LTAuNzgsMi44MDctMC43NzhjMS4wMjMtMC4wMDIsMi4wMzYsMC4yNjksMi43NTEsMC43NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjI1OCwwLjg1MywyLjM0NiwxLjU5MSwyLjg0NywxLjkzMXY2LjI3M0g0LjgzOXoiLz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIj4KICA8cGF0aCBkPSJNMTMuNzEyLDEzLjQw'+
			'OWMxLjAwNSwwLDEuODItMC44MTUsMS44Mi0xLjgyMWMwLTEuMDA1LTAuODE1LTEuODIxLTEuODItMS44MjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS4wMDYsMC0xLjgyMSwwLjgxNS0xLjgyMSwxLjgyMUMxMS44OTIsMTIuNTk0LDEyLjcwNywxMy40MDksMTMuNzEyLDEzLjQwOXogTTI4LjMwNCw3LjMxOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjEyNS0wLjEyNS0wLjI5Ny0wLjE5Ni0wLjQ3My0wLjE5Nkg0LjE2OWMtMC4xNzYsMC0wLjM0OSwwLjA3MS0wLjQ3NCwwLjE5NkMzLjU3MSw3LjQ0NCwzLjUsNy42MTcsMy41LDcuNzkzdjE2LjQxNCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC4xNzYsMC'+
			'4wNzEsMC4zNDgsMC4xOTYsMC40NzNjMC4xMjUsMC4xMjUsMC4yOTcsMC4xOTcsMC40NzMsMC4xOTdoMjMuNjYyYzAuMTc2LDAsMC4zNDgtMC4wNzIsMC40NzMtMC4xOTcmI3hkOyYjeGE7JiN4OTsmI3g5O3MwLjE5Ni0wLjI5NywwLjE5Ni0wLjQ3M1Y3Ljc5M0MyOC41LDcuNjE3LDI4LjQyOSw3LjQ0NCwyOC4zMDQsNy4zMTl6IE00LjgzOSw4LjQ2MkgyNy4xNmwwLjAwMSw3LjE4NCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjU1Ny0wLjM3OC0xLjI5LTAuODc1LTIuMDk1LTEuNDIxYy0xLjAwMS0wLjY3Ni0yLjI1NC0wLjk4Ni0zLjUwMy0wLjk4OWMtMS4yNjYsMC4wMDItMi41NCwwLjMyMS0zLjU2'+
			'LDEuMDA5bC0zLjU3NSwyLjQyNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjMyOS0wLjIyMy0wLjgxMy0wLjU1Mi0xLjM1My0wLjkxOGMtMC41MTQtMC4zNDQtMS4xMjktMC40NjYtMS43NzQtMC40NjljLTEuMTU2LDAuMDA0LTIuNDU0LDAuNDA3LTMuNTU4LDEuMTVsLTIuOTA1LDEuOTcxJiN4ZDsmI3hhOyYjeDk7JiN4OTtWOC40NjJ6IE00LjgzOSwyMy41Mzd2LTMuNTEybDMuNjU4LTIuNDgyYzAuODY3LTAuNTk0LDEuOTcyLTAuOTIzLDIuODA1LTAuOTE5YzAuNDY2LTAuMDAyLDAuODMxLDAuMTAzLDEuMDIyLDAuMjM4JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zMzMsMC4yMjYsMC42NDUsMC40Mz'+
			'csMC45MTMsMC42MTlsLTMuODY5LDIuNjI3Yy0wLjMwNiwwLjIwNy0wLjM4NiwwLjYyMy0wLjE3OSwwLjkzYzAuMTMsMC4xODksMC4zNCwwLjI5MywwLjU1NSwwLjI5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMTI5LDAsMC4yNi0wLjAzNywwLjM3NS0wLjExNWw4LjYzOC01Ljg2MWMwLjczNC0wLjUwMiwxLjc3LTAuNzgsMi44MDctMC43NzhjMS4wMjMtMC4wMDIsMi4wMzYsMC4yNjksMi43NTEsMC43NTcmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjI1OCwwLjg1MywyLjM0NiwxLjU5MSwyLjg0NywxLjkzMXY2LjI3M0g0LjgzOXoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_image_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_image_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image_image.style[domTransition]='';
				if (me._ht_image_image.ggCurrentLogicStateVisible == 0) {
					me._ht_image_image.style.visibility="hidden";
					me._ht_image_image.ggVisible=false;
				}
				else {
					me._ht_image_image.style.visibility=(Number(me._ht_image_image.style.opacity)>0||!me._ht_image_image.style.opacity)?'inherit':'hidden';
					me._ht_image_image.ggVisible=true;
				}
			}
		}
		me._ht_image_image.onmouseover=function (e) {
			me._ht_image_image__img.style.visibility='hidden';
			me._ht_image_image__imgo.style.visibility='inherit';
		}
		me._ht_image_image.onmouseout=function (e) {
			me._ht_image_image__img.style.visibility='inherit';
			me._ht_image_image__imgo.style.visibility='hidden';
		}
		me._ht_image_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_image.appendChild(me._ht_image_image);
		el=me._tt_ht_image=document.createElement('div');
		els=me._tt_ht_image__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_image.style.top='-47px';
					me._tt_ht_image.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_image.ggDx=0;
					me._tt_ht_image.style.top='24px';
					me._tt_ht_image.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image.style.visibility=(Number(me._tt_ht_image.style.opacity)>0||!me._tt_ht_image.style.opacity)?'inherit':'hidden';
					me._tt_ht_image.ggVisible=true;
				}
				else {
					me._tt_ht_image.style.visibility="hidden";
					me._tt_ht_image.ggVisible=false;
				}
			}
		}
		me._tt_ht_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image.appendChild(me._tt_ht_image);
		el=me._ht_image_customimage=document.createElement('div');
		els=me._ht_image_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_image_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_image_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image_customimage.style[domTransition]='';
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_image_customimage.style.visibility="hidden";
					me._ht_image_customimage__img.src = '';
					me._ht_image_customimage.ggVisible=false;
				}
				else {
					me._ht_image_customimage.style.visibility=(Number(me._ht_image_customimage.style.opacity)>0||!me._ht_image_customimage.style.opacity)?'inherit':'hidden';
					me._ht_image_customimage.ggSubElement.src=me._ht_image_customimage.ggText;
					me._ht_image_customimage.ggVisible=true;
				}
			}
		}
		me._ht_image_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_image_customimage.clientWidth;
			var parentHeight = me._ht_image_customimage.clientHeight;
			var img = me._ht_image_customimage__img;
			var aspectRatioDiv = me._ht_image_customimage.clientWidth / me._ht_image_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_image.appendChild(me._ht_image_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_info.ggCurrentLogicStateVisible == 0) {
					me._ht_info.style.visibility="hidden";
					me._ht_info.ggVisible=false;
				}
				else {
					me._ht_info.style.visibility=(Number(me._ht_info.style.opacity)>0||!me._ht_info.style.opacity)?'inherit':'hidden';
					me._ht_info.ggVisible=true;
				}
			}
		}
		me._ht_info.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_info.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_info.ggCurrentLogicStateAlpha == 0) {
					me._ht_info.style.visibility=me._ht_info.ggVisible?'inherit':'hidden';
					me._ht_info.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_info.style.opacity == 0.0) { me._ht_info.style.visibility="hidden"; } }, 505);
					me._ht_info.style.opacity=0;
				}
			}
		}
		me._ht_info.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_info_image=document.createElement('div');
		els=me._ht_info_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE04Ljg1NCw4'+
			'Ljg1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LTQuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS4zMTMsNy4wMj'+
			'IsMTguNzk1LDUuODkzLDE2LDUuODkybDAsMEMxMy4yMDUsNS44OTMsMTAuNjg2LDcuMDIyLDguODU0LDguODUzTDguODU0LDguODUzeiIvPgogIDwvZz4KICA8Zz4KICAgPHBhdGggZD0iTTE0Ljk2MywxMC4wNVY5LjUyMWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk3LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzYsMS4xOTYsMS4xOTZsMCwwdjAuNTI5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8'+
			'cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0wLjY2MS0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMi4yMjZjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDEuMDMxdjUuMzc5aC0xLjIwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNi'+
			'wxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KIDxnIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjAuMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0zLjUsMTZDMy41LDkuMDk2LDkuMDk2LDMuNSwxNiwzLjVsMCwwYzYuOTAzLDAsMTIuNDk5LDUuNTk2LDEyLjUsMTIuNWwwLDAmI3hkOyYjeGE7JiN4OTsm'+
			'I3g5OyYjeDk7JiN4OTtjLTAuMDAxLDYuOTAzLTUuNTk3LDEyLjQ5OS0xMi41LDEyLjVsMCwwQzkuMDk2LDI4LjQ5OSwzLjUsMjIuOTAzLDMuNSwxNkwzLjUsMTZ6IE04Ljg1NCw4Ljg1MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0M3LjAyMiwxMC42ODYsNS44OTQsMTMuMjA1LDUuODkzLDE2bDAsMGMwLjAwMSwyLjc5NSwxLjEyOSw1LjMxNCwyLjk2MSw3LjE0NmwwLDBjMS44MzIsMS44MzEsNC4zNTIsMi45Niw3LjE0NiwyLjk2bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MyLjc5NSwwLDUuMzE0LTEuMTI5LDcuMTQ3LTIuOTZsMCwwYzEuODMxLTEuODMyLDIuOTU5LT'+
			'QuMzUyLDIuOTYtNy4xNDZsMCwwYy0wLjAwMS0yLjc5NS0xLjEyOS01LjMxNC0yLjk2LTcuMTQ3bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS4zMTMsNy4wMjIsMTguNzk1LDUuODkzLDE2LDUuODkybDAsMEMxMy4yMDUsNS44OTMsMTAuNjg2LDcuMDIyLDguODU0LDguODUzTDguODU0LDguODUzeiIvPgogIDwvZz4KICA8Zz4KICAgPHBhdGggZD0iTTE0Ljk2MywxMC4wNVY5LjUyMWMwLTAuNjYxLDAuNTM2LTEuMTk2LDEuMTk3LTEuMTk2bDAsMGMwLjY2LDAsMS4xOTYsMC41MzYsMS4xOTYsMS4xOTZsMCwwdjAuNTI5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAs'+
			'MC42NjEtMC41MzYsMS4xOTYtMS4xOTYsMS4xOTZsMCwwQzE1LjUsMTEuMjQ3LDE0Ljk2MywxMC43MTEsMTQuOTYzLDEwLjA1TDE0Ljk2MywxMC4wNXoiLz4KICAgPGc+CiAgICA8cGF0aCBkPSJNMTguNTMyLDIwLjM5MWgtMS4xNzZ2LTYuNDczYzAtMC4wMjEtMC4wMDUtMC4wNDItMC4wMDYtMC4wNjNjMC0wLjAxNCwwLjAwNC0wLjAyNiwwLjAwNC0wLjA0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC0wLjY2MS0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMi4yMjZjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMT'+
			'k2aDEuMDMxdjUuMzc5aC0xLjIwNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Nmg0Ljc3NWMwLjY2LDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MxOS43MjksMjAuOTI2LDE5LjE5MiwyMC4zOTEsMTguNTMyLDIwLjM5MXoiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_info_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+Cjxzdmcgd2lkdGg9IjMycHgiIHZlcnNpb249IjEuMSIgeD0iMHB4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkxheWVyXzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3'+
			'cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj4KIDxnIHN0cm9rZT0iIzNDM0MzQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIiBvcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8Zz4KICAgPHBhdGggZD0iTTMuNSwxNkMzLjUsOS4wOTYsOS4wOTYsMy41LDE2LDMuNWwwLDBjNi45MDMsMCwxMi40OTksNS41OTYsMTIuNSwxMi41bDAsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wMDEsNi45MDMtNS41OTcsMTIuNDk5LTEy'+
			'LjUsMTIuNWwwLDBDOS4wOTYsMjguNDk5LDMuNSwyMi45MDMsMy41LDE2TDMuNSwxNnogTTguODU0LDguODUzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzcuMDIyLDEwLjY4Niw1Ljg5NCwxMy4yMDUsNS44OTMsMTZsMCwwYzAuMDAxLDIuNzk1LDEuMTI5LDUuMzE0LDIuOTYxLDcuMTQ2bDAsMGMxLjgzMiwxLjgzMSw0LjM1MiwyLjk2LDcuMTQ2LDIuOTZsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzIuNzk1LDAsNS4zMTQtMS4xMjksNy4xNDctMi45NmwwLDBjMS44MzEtMS44MzIsMi45NTktNC4zNTIsMi45Ni03LjE0NmwwLDBjLTAuMDAxLTIuNzk1LTEuMTI5LTUuMz'+
			'E0LTIuOTYtNy4xNDdsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIxLjMxMyw3LjAyMiwxOC43OTUsNS44OTMsMTYsNS44OTJsMCwwQzEzLjIwNSw1Ljg5MywxMC42ODYsNy4wMjIsOC44NTQsOC44NTNMOC44NTQsOC44NTN6Ii8+CiAgPC9nPgogIDxnPgogICA8cGF0aCBkPSJNMTQuOTYzLDEwLjA1VjkuNTIxYzAtMC42NjEsMC41MzYtMS4xOTYsMS4xOTctMS4xOTZsMCwwYzAuNjYsMCwxLjE5NiwwLjUzNiwxLjE5NiwxLjE5NmwwLDB2MC41MjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwwLjY2MS0wLjUzNiwxLjE5Ni0xLjE5NiwxLjE5NmwwLDBDMTUuNSwxMS4y'+
			'NDcsMTQuOTYzLDEwLjcxMSwxNC45NjMsMTAuMDVMMTQuOTYzLDEwLjA1eiIvPgogICA8Zz4KICAgIDxwYXRoIGQ9Ik0xOC41MzIsMjAuMzkxaC0xLjE3NnYtNi40NzNjMC0wLjAyMS0wLjAwNS0wLjA0Mi0wLjAwNi0wLjA2M2MwLTAuMDE0LDAuMDA0LTAuMDI2LDAuMDA0LTAuMDQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTAuNjYxLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0yLjIyNmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMS4wMzF2NS4zNzloLTEuMjA3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2LDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDQuNzc1YzAuNjYsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyYjeDk7QzE5LjcyOSwyMC45MjYsMTkuMTkyLDIwLjM5MSwxOC41MzIsMjAuMzkxeiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgogPGcgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjZmZmZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiwxNikgc2NhbGUoMS4xKSB0cmFuc2xhdGUoLTE2LC0xNikiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlLXdp'+
			'ZHRoPSIwLjIiPgogIDxnPgogICA8cGF0aCBkPSJNMy41LDE2QzMuNSw5LjA5Niw5LjA5NiwzLjUsMTYsMy41bDAsMGM2LjkwMywwLDEyLjQ5OSw1LjU5NiwxMi41LDEyLjVsMCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjAwMSw2LjkwMy01LjU5NywxMi40OTktMTIuNSwxMi41bDAsMEM5LjA5NiwyOC40OTksMy41LDIyLjkwMywzLjUsMTZMMy41LDE2eiBNOC44NTQsOC44NTMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDNy4wMjIsMTAuNjg2LDUuODk0LDEzLjIwNSw1Ljg5MywxNmwwLDBjMC4wMDEsMi43OTUsMS4xMjksNS4zMTQsMi45NjEsNy4xNDZsMCwwYzEuOD'+
			'MyLDEuODMxLDQuMzUyLDIuOTYsNy4xNDYsMi45NmwwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMi43OTUsMCw1LjMxNC0xLjEyOSw3LjE0Ny0yLjk2bDAsMGMxLjgzMS0xLjgzMiwyLjk1OS00LjM1MiwyLjk2LTcuMTQ2bDAsMGMtMC4wMDEtMi43OTUtMS4xMjktNS4zMTQtMi45Ni03LjE0N2wwLDAmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjEuMzEzLDcuMDIyLDE4Ljc5NSw1Ljg5MywxNiw1Ljg5MmwwLDBDMTMuMjA1LDUuODkzLDEwLjY4Niw3LjAyMiw4Ljg1NCw4Ljg1M0w4Ljg1NCw4Ljg1M3oiLz4KICA8L2c+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0xNC45NjMsMTAu'+
			'MDVWOS41MjFjMC0wLjY2MSwwLjUzNi0xLjE5NiwxLjE5Ny0xLjE5NmwwLDBjMC42NiwwLDEuMTk2LDAuNTM2LDEuMTk2LDEuMTk2bDAsMHYwLjUyOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYxLTAuNTM2LDEuMTk2LTEuMTk2LDEuMTk2bDAsMEMxNS41LDExLjI0NywxNC45NjMsMTAuNzExLDE0Ljk2MywxMC4wNUwxNC45NjMsMTAuMDV6Ii8+CiAgIDxnPgogICAgPHBhdGggZD0iTTE4LjUzMiwyMC4zOTFoLTEuMTc2di02LjQ3M2MwLTAuMDIxLTAuMDA1LTAuMDQyLTAuMDA2LTAuMDYzYzAtMC4wMTQsMC4wMDQtMC4wMjYsMC4wMDQtMC4wNCYjeGQ7JiN4YTsmI3g5OyYjeD'+
			'k7JiN4OTsmI3g5OyYjeDk7YzAtMC42NjEtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTIuMjI2Yy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2YzAsMC42NiwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgxLjAzMXY1LjM3OWgtMS4yMDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoNC43NzVjMC42NiwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMTkuNzI5LDIwLjkyNiwxOS4xOTIsMjAuMzkx'+
			'LDE4LjUzMiwyMC4zOTF6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_info_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info_image.style[domTransition]='';
				if (me._ht_info_image.ggCurrentLogicStateVisible == 0) {
					me._ht_info_image.style.visibility="hidden";
					me._ht_info_image.ggVisible=false;
				}
				else {
					me._ht_info_image.style.visibility=(Number(me._ht_info_image.style.opacity)>0||!me._ht_info_image.style.opacity)?'inherit':'hidden';
					me._ht_info_image.ggVisible=true;
				}
			}
		}
		me._ht_info_image.onmouseover=function (e) {
			me._ht_info_image__img.style.visibility='hidden';
			me._ht_info_image__imgo.style.visibility='inherit';
		}
		me._ht_info_image.onmouseout=function (e) {
			me._ht_info_image__img.style.visibility='inherit';
			me._ht_info_image__imgo.style.visibility='hidden';
		}
		me._ht_info_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info.appendChild(me._ht_info_image);
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_information.style.top='-47px';
					me._tt_information.ggUpdatePosition(true);
				}
				else {
					me._tt_information.ggDx=0;
					me._tt_information.style.top='24px';
					me._tt_information.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStateVisible == 0) {
					me._tt_information.style.visibility=(Number(me._tt_information.style.opacity)>0||!me._tt_information.style.opacity)?'inherit':'hidden';
					me._tt_information.ggVisible=true;
				}
				else {
					me._tt_information.style.visibility="hidden";
					me._tt_information.ggVisible=false;
				}
			}
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info.appendChild(me._tt_information);
		el=me._ht_info_customimage=document.createElement('div');
		els=me._ht_info_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_info_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info_customimage.style[domTransition]='';
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_info_customimage.style.visibility="hidden";
					me._ht_info_customimage__img.src = '';
					me._ht_info_customimage.ggVisible=false;
				}
				else {
					me._ht_info_customimage.style.visibility=(Number(me._ht_info_customimage.style.opacity)>0||!me._ht_info_customimage.style.opacity)?'inherit':'hidden';
					me._ht_info_customimage.ggSubElement.src=me._ht_info_customimage.ggText;
					me._ht_info_customimage.ggVisible=true;
				}
			}
		}
		me._ht_info_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_info_customimage.clientWidth;
			var parentHeight = me._ht_info_customimage.clientHeight;
			var img = me._ht_info_customimage__img;
			var aspectRatioDiv = me._ht_info_customimage.clientWidth / me._ht_info_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info.appendChild(me._ht_info_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_info;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 100px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 140px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_node.ggCurrentLogicStateVisible == 0) {
					me._ht_node.style.visibility="hidden";
					me._ht_node.ggVisible=false;
				}
				else {
					me._ht_node.style.visibility=(Number(me._ht_node.style.opacity)>0||!me._ht_node.style.opacity)?'inherit':'hidden';
					me._ht_node.ggVisible=true;
				}
			}
		}
		me._ht_node.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_node.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_node.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_node.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_node.ggCurrentLogicStateAlpha == 0) {
					me._ht_node.style.visibility=me._ht_node.ggVisible?'inherit':'hidden';
					me._ht_node.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_node.style.opacity == 0.0) { me._ht_node.style.visibility="hidden"; } }, 505);
					me._ht_node.style.opacity=0;
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
			me._tt_ht_node.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._hsimage=document.createElement('div');
		els=me._hsimage__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE0LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgNDMzNjMpICAtLT4KPHN2ZyB3aWR0aD0iMzJweCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iTG'+
			'F5ZXJfMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeT0iMHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgaGVpZ2h0PSIzMnB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPgogPGcgb3BhY2l0eT0iMC40Ij4KICA8Zz4KICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBkPSJNMjYuNjA0LDE0LjEwM2gtMS45ODljLTAuNzM0LTMuMzUtMy4zNjgtNS45ODEtNi43MTYtNi43MTdWNS4zOTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMS4wNDgtMC44NDktMS44OTktMS44OTctMS44OTljLTEuMDQ5LDAtMS44OTcsMC44NTEtMS44OTcsMS44OTl2MS45'+
			'ODZjLTMuMzUyLDAuNzM1LTUuOTgzLDMuMzY5LTYuNzIsNi43MTdINS4zOTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzQuMzQ4LDE0LjEwMSwzLjUsMTQuOTUxLDMuNSwxNnMwLjg1MSwxLjg5NiwxLjg5OSwxLjg5NmgxLjk4NWMwLjczNSwzLjM1LDMuMzY4LDUuOTg0LDYuNzIsNi43MTl2MS45ODkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAsMS4wNDYsMC44NDgsMS44OTYsMS44OTcsMS44OTZjMS4wNDgsMCwxLjg5Ni0wLjg1MSwxLjg5Ni0xLjg5NnYtMS45ODljMy4zNTEtMC43MzYsNS45ODQtMy4zNjksNi43MTktNi43MTloMS45ODYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuMD'+
			'Q5LDAsMS44OTctMC44NDgsMS44OTctMS44OTZDMjguNTAxLDE0Ljk1MSwyNy42NTIsMTQuMTAzLDI2LjYwNCwxNC4xMDN6IE0xNiwyMS4wMjljLTIuNzc3LTAuMDA1LTUuMDIzLTIuMjUxLTUuMDMtNS4wMjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7di0wLjAwMWMwLTAuMDAxLDAtMC4wMDEsMC0wLjAwM2MwLjAwNi0yLjc3NywyLjI1My01LjAyMiw1LjAzLTUuMDI1YzIuNzc3LDAuMDA1LDUuMDI1LDIuMjUxLDUuMDI2LDUuMDI4aDAuMDAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MyMS4wMjUsMTguNzc4LDE4Ljc3NywyMS4wMjQsMTYsMjEuMDI5eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4K'+
			'ICA8L2c+CiAgPGNpcmNsZSBjeT0iMTYiIHI9IjIuMTA5IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSIxNi4wMDIiLz4KIDwvZz4KIDxnPgogIDxnPgogICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNi42MDQsMTQuMTAzaC0xLjk4OWMtMC43MzQtMy4zNS0zLjM2OC01Ljk4MS02LjcxNi02LjcxN1Y1LjM5OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC0xLjA0OC0wLjg0OS0xLjg5OS0xLjg5Ny0xLjg5OWMtMS4wNDksMC0xLjg5NywwLjg1MS0xLjg5NywxLjg5OXYxLjk4NmMtMy4zNTIsMC43MzUtNS45ODMsMy4zNjktNi43Miw2LjcxN0'+
			'g1LjM5OCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDNC4zNDgsMTQuMTAxLDMuNSwxNC45NTEsMy41LDE2czAuODUxLDEuODk2LDEuODk5LDEuODk2aDEuOTg1YzAuNzM1LDMuMzUsMy4zNjgsNS45ODQsNi43Miw2LjcxOXYxLjk4OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMCwxLjA0NiwwLjg0OCwxLjg5NiwxLjg5NywxLjg5NmMxLjA0OCwwLDEuODk2LTAuODUxLDEuODk2LTEuODk2di0xLjk4OWMzLjM1MS0wLjczNiw1Ljk4NC0zLjM2OSw2LjcxOS02LjcxOWgxLjk4NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4wNDksMCwxLjg5Ny0wLjg0OCwxLjg5Ny0xLjg5NkMyOC41MDEsMTQu'+
			'OTUxLDI3LjY1MiwxNC4xMDMsMjYuNjA0LDE0LjEwM3ogTTE2LDIxLjAyOWMtMi43NzctMC4wMDUtNS4wMjMtMi4yNTEtNS4wMy01LjAyNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTt2LTAuMDAxYzAtMC4wMDEsMC0wLjAwMSwwLTAuMDAzYzAuMDA2LTIuNzc3LDIuMjUzLTUuMDIyLDUuMDMtNS4wMjVjMi43NzcsMC4wMDUsNS4wMjUsMi4yNTEsNS4wMjYsNS4wMjhoMC4wMDImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzIxLjAyNSwxOC43NzgsMTguNzc3LDIxLjAyNCwxNiwyMS4wMjl6IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiAgPC9nPgogIDxjaXJjbGUgY3k9Ij'+
			'E2IiByPSIyLjEwOSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBjeD0iMTYuMDAyIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._hsimage__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hsimage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hsimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hsimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hsimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hsimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hsimage.style[domTransition]='';
				if (me._hsimage.ggCurrentLogicStateVisible == 0) {
					me._hsimage.style.visibility="hidden";
					me._hsimage.ggVisible=false;
				}
				else {
					me._hsimage.style.visibility=(Number(me._hsimage.style.opacity)>0||!me._hsimage.style.opacity)?'inherit':'hidden';
					me._hsimage.ggVisible=true;
				}
			}
		}
		me._hsimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._hsimage);
		el=me._hotspot_preview=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 103px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -130px;';
		hs+='visibility : hidden;';
		hs+='width : 153px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_hotspot_preview') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview.style[domTransition]='';
				if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview.style.visibility=(Number(me._hotspot_preview.style.opacity)>0||!me._hotspot_preview.style.opacity)?'inherit':'hidden';
					me._hotspot_preview.ggVisible=true;
				}
				else {
					me._hotspot_preview.style.visibility="hidden";
					me._hotspot_preview.ggVisible=false;
				}
			}
		}
		me._hotspot_preview.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._preview_picture_frame_=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggDx=0;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : rgba(255,255,255,0.784314);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 99px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 149px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._preview_picture_frame_);
		el=me._preview_nodeimage=document.createElement('div');
		els=me._preview_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._preview_nodeimage);
		el=me._ht_tooltip=document.createElement('div');
		els=me._ht_tooltip__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_tooltip";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 6px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 2px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 140px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._ht_tooltip.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_tooltip.style[domTransition]='';
				if (me._ht_tooltip.ggCurrentLogicStateVisible == 0) {
					me._ht_tooltip.style.visibility="hidden";
					me._ht_tooltip.ggVisible=false;
				}
				else {
					me._ht_tooltip.style.visibility=(Number(me._ht_tooltip.style.opacity)>0||!me._ht_tooltip.style.opacity)?'inherit':'hidden';
					me._ht_tooltip.ggVisible=true;
				}
			}
		}
		me._ht_tooltip.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hotspot_preview.appendChild(me._ht_tooltip);
		el=me._ht_checkmark_tick=document.createElement('div');
		els=me._ht_checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG'+
			'9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMzcyMiAtMjYwNiAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzcyMiAtMjYwNiAzMiAzMiI+CiA8'+
			'ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1'+
			'LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O00tMzY5NS40Nz'+
			'MtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4x'+
			'NDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBkPSImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Nn'+
			'YxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtj'+
			'LTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi'+
			'0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQi'+
			'IGZpbGw9Im5vbmUiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3'+
			'g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9Ik0tMzY5OS45Ni0yNTgzLjgzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2gtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni0wLjA4Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0Ljcx'+
			'OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwM2wtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 30px;';
		hs+='position : absolute;';
		hs+='right : 4px;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_checkmark_tick.ggElementNodeId()) == true)) || 
				((me._ht_checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_checkmark_tick.style[domTransition]='';
				if (me._ht_checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._ht_checkmark_tick.style.visibility=(Number(me._ht_checkmark_tick.style.opacity)>0||!me._ht_checkmark_tick.style.opacity)?'inherit':'hidden';
					me._ht_checkmark_tick.ggVisible=true;
				}
				else {
					me._ht_checkmark_tick.style.visibility="hidden";
					me._ht_checkmark_tick.ggVisible=false;
				}
			}
		}
		me._ht_checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._ht_checkmark_tick);
		me._ht_node.appendChild(me._hotspot_preview);
		el=me._tt_ht_node=document.createElement('div');
		els=me._tt_ht_node__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_node";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_node.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_node.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_node.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_node.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_node.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_node.style.top='-47px';
					me._tt_ht_node.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_node.ggDx=0;
					me._tt_ht_node.style.top='24px';
					me._tt_ht_node.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == false)) && 
				((player.getVariableValue('opt_hotspot_preview') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == true)) && 
				((player.getVariableValue('opt_hotspot_preview') == false))
			)
			{
				newLogicStateVisible = 1;
			}
			else if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((me.hotspot.title != "")) && 
				((player.getIsTour() == false)) && 
				((player.getVariableValue('opt_hotspot_preview') == true))
			)
			{
				newLogicStateVisible = 2;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_node.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_node.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else if (me._tt_ht_node.ggCurrentLogicStateVisible == 1) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else if (me._tt_ht_node.ggCurrentLogicStateVisible == 2) {
					me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
					me._tt_ht_node.ggVisible=true;
				}
				else {
					me._tt_ht_node.style.visibility="hidden";
					me._tt_ht_node.ggVisible=false;
				}
			}
		}
		me._tt_ht_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_node.appendChild(me._tt_ht_node);
		el=me._ht_node_customimage=document.createElement('div');
		els=me._ht_node_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_node_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_customimage.style[domTransition]='';
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_node_customimage.style.visibility="hidden";
					me._ht_node_customimage__img.src = '';
					me._ht_node_customimage.ggVisible=false;
				}
				else {
					me._ht_node_customimage.style.visibility=(Number(me._ht_node_customimage.style.opacity)>0||!me._ht_node_customimage.style.opacity)?'inherit':'hidden';
					me._ht_node_customimage.ggSubElement.src=me._ht_node_customimage.ggText;
					me._ht_node_customimage.ggVisible=true;
				}
			}
		}
		me._ht_node_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_node_customimage.clientWidth;
			var parentHeight = me._ht_node_customimage.clientHeight;
			var img = me._ht_node_customimage__img;
			var aspectRatioDiv = me._ht_node_customimage.clientWidth / me._ht_node_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_node.appendChild(me._ht_node_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_node;
	};
	function SkinHotspotClass_ht_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_url=document.createElement('div');
		el.ggId="ht_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_url.ggCurrentLogicStateVisible == 0) {
					me._ht_url.style.visibility="hidden";
					me._ht_url.ggVisible=false;
				}
				else {
					me._ht_url.style.visibility=(Number(me._ht_url.style.opacity)>0||!me._ht_url.style.opacity)?'inherit':'hidden';
					me._ht_url.ggVisible=true;
				}
			}
		}
		me._ht_url.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._ht_url.style[domTransition]='opacity 500ms ease 0ms';
				if (me._ht_url.ggCurrentLogicStateAlpha == 0) {
					me._ht_url.style.visibility=me._ht_url.ggVisible?'inherit':'hidden';
					me._ht_url.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._ht_url.style.opacity == 0.0) { me._ht_url.style.visibility="hidden"; } }, 505);
					me._ht_url.style.opacity=0;
				}
			}
		}
		me._ht_url.onclick=function (e) {
			if (
				(
					((player.getVariableValue('opt_url') == true)) && 
					((player.getHasTouch() == false))
				)
			) {
				skin._web_page.ggText="<iframe src=\""+me.hotspot.url+"\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
				skin._web_page.ggTextDiv.innerHTML=skin._web_page.ggText;
				if (skin._web_page.ggUpdateText) {
					skin._web_page.ggUpdateText=function() {
						var hs="<iframe src=\""+me.hotspot.url+"\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._web_page.ggUpdatePosition) {
					skin._web_page.ggUpdatePosition();
				}
				skin._web_page.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('opt_url') == true)) && 
					((player.getHasTouch() == false))
				)
			) {
				player.setVariableValue('vis_website', true);
			}
			if (
				(
					((player.getVariableValue('opt_url') == false)) || 
					((player.getHasTouch() == true))
				)
			) {
				player.openUrl(me.hotspot.url,me.hotspot.target);
			}
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_url']=true;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ontouchend=function (e) {
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
		}
		me._ht_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_image=document.createElement('div');
		els=me._ht_url_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG'+
			'9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgeG1sbnM6Z3JhcGg9Imh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIGlkPSJMYXllcl8xIi8+'+
			'CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxnIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBmaWxsPSJub25lIiBkPSJNMjguMDg0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAtNi40NzctNS4yNy0xMS43NDYtMTEuNzQ2LTExLjc0NkM5Ljg2MSw0LjI1NCw0LjU5Miw5LjUyMiw0LjU5MiwxNmMwLDYuNDMyLDUuMiwxMS42NywxMS42MTUsMTEuNzQxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAuMDM3LDAuMDA0LDAuMD'+
			'cyLDAuMDA2LDAuMTA3LDAuMDA2YzAuMDEyLDAsMC4wMjItMC4wMDIsMC4wMzItMC4wMDJDMjIuODE5LDI3Ljc0LDI4LjA4NCwyMi40NzMsMjguMDg0LDE2eiBNNS45OTMsMTYuNjg2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7aDMuMzA0YzAuMDU2LDEuNjU2LDAuMzA2LDMuMjA5LDAuNzE2LDQuNkg3LjQyQzYuNjA4LDE5LjkyLDYuMTAzLDE4LjM1OSw1Ljk5MywxNi42ODZ6IE0yNi42ODQsMTUuMzEyaC0zLjM1MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wNTUtMS42NTEtMC4zMDMtMy4yLTAuNzEyLTQuNTg2aDIuNjQ0QzI2LjA3LDEyLjA4NiwyNi41NzIsMTMuNjQ2'+
			'LDI2LjY4NCwxNS4zMTJ6IE0yMS45NTcsMTUuMzEyaC00LjkzMnYtNC41ODZoNC4xMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMS42MDcsMTIuMDk0LDIxLjg5NCwxMy42NTcsMjEuOTU3LDE1LjMxMnogTTE3LjAyNSw5LjM1MVY1LjcxOWMxLjQxOCwwLjM0MywyLjY4OSwxLjY5MiwzLjU4OSwzLjYzMkgxNy4wMjV6IE0xNS42NTEsNS43MDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTt2My42NDRoLTMuNjM1QzEyLjkyNCw3LjM5MSwxNC4yMTMsNi4wMzMsMTUuNjUxLDUuNzA3eiBNMTUuNjUxLDEwLjcyN3Y0LjU4NmgtNC45NzdjMC4wNjMtMS42NTYsMC4zNDctMy4yMTksMC'+
			'44LTQuNTg2SDE1LjY1MXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTsgTTkuMjk3LDE1LjMxMkg1Ljk5M2MwLjEwOC0xLjY2NiwwLjYxNC0zLjIyNiwxLjQyLTQuNTg2aDIuNTk4QzkuNjAyLDEyLjExMyw5LjM1MywxMy42NjEsOS4yOTcsMTUuMzEyeiBNMTAuNjc0LDE2LjY4Nmg0Ljk3NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O3Y0LjZoLTQuMTc0QzExLjAyMiwxOS45MTQsMTAuNzM3LDE4LjM0OCwxMC42NzQsMTYuNjg2eiBNMTUuNjUxLDIyLjY2djMuNjMzYy0xLjQzNS0wLjMyNC0yLjcyMi0xLjY3OC0zLjYzLTMuNjMzSDE1LjY1MXomI3hkOyYjeGE7JiN4OTsmI3g5OyYj'+
			'eDk7JiN4OTsgTTE3LjAyNSwyNi4yODFWMjIuNjZoMy41ODNDMTkuNzExLDI0LjU5NCwxOC40NCwyNS45MzksMTcuMDI1LDI2LjI4MXogTTE3LjAyNSwyMS4yODV2LTQuNmg0LjkzMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wNjMsMS42NjItMC4zNSwzLjIyOS0wLjgwNSw0LjZIMTcuMDI1eiBNMjMuMzMyLDE2LjY4NmgzLjM1MmMtMC4xMTEsMS42NzQtMC42MTcsMy4yMzQtMS40MjgsNC42aC0yLjYzOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MyMy4wMjcsMTkuODk1LDIzLjI3NywxOC4zNDIsMjMuMzMyLDE2LjY4NnogTTI0LjI4OSw5LjM1MWgtMi4xNDVjLTAuND'+
			'Q3LTEuMTAyLTEuMDAyLTIuMDY0LTEuNjQ1LTIuODQ4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIxLjk3Myw3LjE1MiwyMy4yNyw4LjEzMiwyNC4yODksOS4zNTF6IE0xMi4xMDMsNi41MzhjLTAuNjMsMC43NzYtMS4xNzcsMS43MjctMS42MTYsMi44MTNIOC4zODUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDOS4zOTEsOC4xNTIsMTAuNjU5LDcuMTg2LDEyLjEwMyw2LjUzOHogTTguMzk3LDIyLjY2aDIuMDk0YzAuNDM4LDEuMDgyLDAuOTgxLDIuMDI3LDEuNjA5LDIuODAxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzEwLjY2MiwyNC44MTQsOS4zOTgsMjMuODU0'+
			'LDguMzk3LDIyLjY2eiBNMjAuNTAyLDI1LjQ5NGMwLjYzOS0wLjc3OSwxLjE5Mi0xLjczOCwxLjYzOC0yLjgzNGgyLjE0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIzLjI2LDIzLjg3MywyMS45NywyNC44NSwyMC41MDIsMjUuNDk0eiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgPC9nPgogICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTYuMTk3LDI3Ljg0QzkuNzQ3LDI3Ljc3LDQuNDkyLDIyLjQ1OCw0LjQ5MiwxNmMwLTYuNTMyLDUuMzE0LTExLjg0NiwxMS44NDYtMTEuODQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2M2LjUzMiwwLDExLjg0Niw1LjMxNCwxMS44NDYsMTEuOD'+
			'Q2YzAsNi41MjctNS4zMSwxMS44NC0xMS44MzcsMTEuODQ0bC0wLjAzMiwwLjAwMkMxNi4yNzYsMjcuODQ2LDE2LjIzNywyNy44NDQsMTYuMTk3LDI3Ljg0eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEyLjE3OCwyMi43NmMwLjg5NCwxLjg1NywyLjA4MywzLjA1OSwzLjM3MywzLjQwNVYyMi43NkgxMi4xNzh6IE0xNy4xMjUsMjYuMTUxYzEuMjcxLTAuMzYyLDIuNDQ0LTEuNTU5LDMuMzI1LTMuMzkyaC0zLjMyNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtWMjYuMTUxeiBNMjIuMjA3LDIyLjc2Yy0wLjM4NSwwLjkzNS0wLjg0NiwxLjc2My0xLjM3MSwyLjQ3YzEuMjE5LTAuNTk3LDIuMzI1'+
			'LTEuNDQyLDMuMjI2LTIuNDdIMjIuMjA3eiBNOC42MTQsMjIuNzYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuODc4LDEuMDAyLDEuOTU4LDEuODM1LDMuMTUxLDIuNDMyYy0wLjUxNS0wLjY5OS0wLjk2NS0xLjUxNS0xLjM0Mi0yLjQzMkg4LjYxNHogTTYuMSwxNi43ODUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMTIxLDEuNTg2LDAuNTkzLDMuMDgyLDEuNDA2LDQuNDQ5bDIuMzc1LTAuMDQ3QzkuNDg4LDE5LjgxNiw5LjI2LDE4LjMzNyw5LjIsMTYuNzg1SDYuMXogTTI1LjI1NiwyMS4xODYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNzI4LTEuMzIsMS4xOTktMi44MTUsMS4zMi'+
			'00LjRoLTMuMTQ3Yy0wLjA1OSwxLjU1MS0wLjI4NiwzLjAyOS0wLjY3OSw0LjRIMjUuMjU2eiBNMjEuMDgsMjEuMTg2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQzOC0xLjM0NiwwLjcwNS0yLjg2MywwLjc3Mi00LjRoLTQuNzI4djQuNEgyMS4wOHogTTE1LjU1MSwyMS4xODZ2LTQuNGgtNC43NzNjMC4wNjcsMS41MzcsMC4zMzMsMy4wNTUsMC43NzEsNC40SDE1LjU1MXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0yNi41NzYsMTUuMjEyYy0wLjEyMS0xLjU2My0wLjYwNC0zLjA5NS0xLjM5OC00LjQzNWwtMi40MjUsMC4wNDdjMC4zOSwxLjM2MywwLjYxNywyLjgzOCwwLjY3Niw0LjM4'+
			'OEgyNi41NzZ6IE0yMS44NTMsMTUuMjEyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wNjctMS41MjktMC4zMzMtMy4wNDItMC43Ny00LjM4NmgtMy45NTh2NC4zODZIMjEuODUzeiBNMTUuNTUxLDE1LjIxMnYtNC4zODZoLTQuMDA1Yy0wLjQzNiwxLjM0LTAuNzAxLDIuODUzLTAuNzY4LDQuMzg2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0gxNS41NTF6IE05LjIsMTUuMjEyYzAuMDYtMS41NDcsMC4yODctMy4wMjEsMC42NzctNC4zODZINy40N2MtMC43ODEsMS4zMzUtMS4yNTMsMi44NDgtMS4zNyw0LjM4Nkg5LjJ6IE0yNC4wNzIsOS4yNTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy'+
			'0wLjg5OS0xLjAyOS0yLjAwOS0xLjg4LTMuMjM3LTIuNDgyYzAuNTI3LDAuNzA5LDAuOTksMS41NDIsMS4zNzcsMi40ODJIMjQuMDcyeiBNMjAuNDU2LDkuMjUxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC44ODItMS44MzgtMi4wNTgtMy4wMzktMy4zMzEtMy40MDJ2My40MDJIMjAuNDU2eiBNMTUuNTUxLDkuMjUxVjUuODM1Yy0xLjI5MiwwLjM0OC0yLjQ4MywxLjU1My0zLjM3NywzLjQxNkgxNS41NTF6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMTAuNDE5LDkuMjUxYzAuMzc4LTAuOTIxLDAuODMxLTEuNzQyLDEuMzQ5LTIuNDQ0Yy0xLjE5NywwLjU5Ny0yLjI4MSwxLjQzNC0zLjE2'+
			'NiwyLjQ0NEgxMC40MTl6IiBmaWxsLW9wYWNpdHk9IjEiLz4KICAgPHBhdGggZmlsbD0iIzFBMTcxQiIgZD0iTTE2LjMzOCw0LjI1NGM2LjQ3NywwLDExLjc0Niw1LjI2OSwxMS43NDYsMTEuNzQ2YzAsNi40NzMtNS4yNjUsMTEuNzQxLTExLjczNywxMS43NDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjAxLDAtMC4wMjEsMC4wMDItMC4wMzIsMC4wMDJjLTAuMDM1LDAtMC4wNy0wLjAwMi0wLjEwNy0wLjAwNkM5Ljc5MiwyNy42Nyw0LjU5MiwyMi40MzIsNC41OTIsMTYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzQuNTkyLDkuNTIyLDkuODYxLDQuMjU0LDE2LjMzOCw0LjI1NCBNMTIuMD'+
			'E2LDkuMzUxaDMuNjM1VjUuNzA3QzE0LjIxMyw2LjAzMywxMi45MjQsNy4zOTEsMTIuMDE2LDkuMzUxIE0xNy4wMjUsOS4zNTFoMy41ODkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjg5OS0xLjk0LTIuMTcxLTMuMjg5LTMuNTg5LTMuNjMyVjkuMzUxIE0yMi4xNDUsOS4zNTFoMi4xNDVjLTEuMDItMS4yMTktMi4zMTYtMi4xOTktMy43ODktMi44NDgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzIxLjE0Myw3LjI4NywyMS42OTcsOC4yNDksMjIuMTQ1LDkuMzUxIE04LjM4NSw5LjM1MWgyLjEwMWMwLjQzOS0xLjA4NiwwLjk4Ni0yLjAzNywxLjYxNi0yLjgxMyYjeGQ7JiN4YTsmI3g5OyYj'+
			'eDk7JiN4OTtDMTAuNjU5LDcuMTg2LDkuMzkxLDguMTUyLDguMzg1LDkuMzUxIE0yMy4zMzIsMTUuMzEyaDMuMzUyYy0wLjExMS0xLjY2Ni0wLjYxMy0zLjIyNi0xLjQyLTQuNTg2SDIyLjYyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MyMy4wMjksMTIuMTEzLDIzLjI3NywxMy42NjEsMjMuMzMyLDE1LjMxMiBNMTcuMDI1LDE1LjMxMmg0LjkzMmMtMC4wNjMtMS42NTYtMC4zNS0zLjIxOS0wLjgwMi00LjU4NmgtNC4xM1YxNS4zMTImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMC42NzQsMTUuMzEyaDQuOTc3di00LjU4NmgtNC4xNzdDMTEuMDIxLDEyLjA5NCwxMC43MzcsMTMuNjU3LDEwLj'+
			'Y3NCwxNS4zMTIgTTUuOTkzLDE1LjMxMmgzLjMwNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC4wNTYtMS42NTEsMC4zMDUtMy4yLDAuNzEzLTQuNTg2SDcuNDEzQzYuNjA3LDEyLjA4Niw2LjEwMSwxMy42NDYsNS45OTMsMTUuMzEyIE0yMi42MTcsMjEuMjg1aDIuNjM5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjgxMS0xLjM2NSwxLjMxNi0yLjkyNiwxLjQyOC00LjZoLTMuMzUyQzIzLjI3NywxOC4zNDIsMjMuMDI3LDE5Ljg5NSwyMi42MTcsMjEuMjg1IE0xNy4wMjUsMjEuMjg1aDQuMTI3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjQ1NS0xLjM3MSwwLjc0MS0yLjkzOCwwLjgw'+
			'NS00LjZoLTQuOTMyVjIxLjI4NSBNMTEuNDc3LDIxLjI4NWg0LjE3NHYtNC42aC00Ljk3N0MxMC43MzcsMTguMzQ4LDExLjAyMiwxOS45MTQsMTEuNDc3LDIxLjI4NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTcuNDIsMjEuMjg1aDIuNTkzYy0wLjQxLTEuMzkxLTAuNjYxLTIuOTQzLTAuNzE2LTQuNkg1Ljk5M0M2LjEwMywxOC4zNTksNi42MDgsMTkuOTIsNy40MiwyMS4yODUgTTIwLjUwMiwyNS40OTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNDY4LTAuNjQ1LDIuNzU4LTEuNjIxLDMuNzc3LTIuODM0aC0yLjE0QzIxLjY5NCwyMy43NTYsMjEuMTQxLDI0LjcxNSwyMC41MDIsMjUuND'+
			'k0IE0xNy4wMjUsMjYuMjgxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjQxNS0wLjM0MiwyLjY4Ni0xLjY4OCwzLjU4My0zLjYyMWgtMy41ODNWMjYuMjgxIE0xNS42NTEsMjYuMjkzVjIyLjY2aC0zLjYzQzEyLjkyOSwyNC42MTUsMTQuMjE2LDI1Ljk2OSwxNS42NTEsMjYuMjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMTIuMSwyNS40NjFjLTAuNjI3LTAuNzczLTEuMTcxLTEuNzE5LTEuNjA5LTIuODAxSDguMzk3QzkuMzk4LDIzLjg1NCwxMC42NjIsMjQuODE0LDEyLjEsMjUuNDYxIE0xNi4zMzgsNC4wNTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzkuNzUxLDQuMDU0LDQuMzky'+
			'LDkuNDEzLDQuMzkyLDE2YzAsNi41MTMsNS4yOTksMTEuODcsMTEuODEzLDExLjk0MWMwLjAyNSwwLjAwMywwLjA2NywwLjAwNiwwLjEwOSwwLjAwNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjNi42MTQtMC4wMDYsMTEuOTctNS4zNjQsMTEuOTctMTEuOTQ3QzI4LjI4NCw5LjQxMywyMi45MjUsNC4wNTQsMTYuMzM4LDQuMDU0TDE2LjMzOCw0LjA1NHogTTEyLjMzNCw5LjE1MSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC44NDItMS42OTQsMS45MzUtMi44MSwzLjExNy0zLjE4M3YzLjE4M0gxMi4zMzRMMTIuMzM0LDkuMTUxeiBNMTcuMjI2LDkuMTUxVjUuOTg0YzEuMTYzLDAuMzg3LDIuMj'+
			'M5LDEuNDk3LDMuMDcsMy4xNjdIMTcuMjI2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0wxNy4yMjYsOS4xNTF6IE0yMi4yNzgsOS4xNTFjLTAuMzI0LTAuNzc4LTAuNzAxLTEuNDgzLTEuMTI0LTIuMTA0YzEuMDA4LDAuNTQ1LDEuOTI0LDEuMjYsMi42OTQsMi4xMDRIMjIuMjc4TDIyLjI3OCw5LjE1MXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE04LjgyNiw5LjE1MWMwLjc1NC0wLjgyNCwxLjY0Ni0xLjUyNSwyLjYyMi0yLjA2MmMtMC40MTMsMC42MTItMC43NzksMS4zMDMtMS4wOTYsMi4wNjJIOC44MjZMOC44MjYsOS4xNTF6IE0yMi44ODYsMTAuOTI3JiN4ZDsmI3hhOyYjeDk7JiN4OTsm'+
			'I3g5O2gyLjI2NGMwLjczNCwxLjI3MiwxLjE4OCwyLjcxMywxLjMxOCw0LjE4NmgtMi45NDNDMjMuNDYyLDEzLjYzOSwyMy4yNDgsMTIuMjMyLDIyLjg4NiwxMC45MjdMMjIuODg2LDEwLjkyN3ogTTE3LjIyNiwxMC45MjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7aDMuNzg0YzAuNDExLDEuMjg4LDAuNjY1LDIuNzI4LDAuNzM4LDQuMTg2aC00LjUyMlYxMC45MjdMMTcuMjI2LDEwLjkyN3ogTTExLjYxOSwxMC45MjdoMy44MzJ2NC4xODZoLTQuNTY4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MxMC45NTYsMTMuNjUsMTEuMjA5LDEyLjIxLDExLjYxOSwxMC45MjdMMTEuNjE5LDEwLjkyN3ogTT'+
			'cuNTI3LDEwLjkyN2gyLjIxOGMtMC4zNjIsMS4zMDgtMC41NzgsMi43MTMtMC42NDEsNC4xODZINi4yMDgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzYuMzM2LDEzLjY0Niw2Ljc4OSwxMi4yMDUsNy41MjcsMTAuOTI3TDcuNTI3LDEwLjkyN3ogTTIzLjUyNCwxNi44ODZoMi45NDNjLTAuMTMsMS40OTEtMC41NzUsMi45MDMtMS4zMjYsNC4xOTloLTIuMjU5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MyMy4yNDcsMTkuNzcxLDIzLjQ2MiwxOC4zNjEsMjMuNTI0LDE2Ljg4NkwyMy41MjQsMTYuODg2eiBNMTcuMjI2LDE2Ljg4Nmg0LjUyMmMtMC4wNzMsMS40NjYtMC4zMjgsMi45MS0wLjc0MSw0'+
			'LjE5OWgtMy43ODEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7VjE2Ljg4NkwxNy4yMjYsMTYuODg2eiBNMTAuODgzLDE2Ljg4Nmg0LjU2OHY0LjE5OWgtMy44MjlDMTEuMjA5LDE5Ljc5NiwxMC45NTYsMTguMzUyLDEwLjg4MywxNi44ODZMMTAuODgzLDE2Ljg4NnomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE02LjIwOCwxNi44ODZoMi44OTZjMC4wNjMsMS40NzYsMC4yNzksMi44ODYsMC42NDQsNC4xOTlINy41MzRDNi43ODMsMTkuNzg5LDYuMzM3LDE4LjM3OCw2LjIwOCwxNi44ODZMNi4yMDgsMTYuODg2eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTIyLjI3MywyMi44NmgxLjU2NGMtMC'+
			'43NzEsMC44NDEtMS42ODQsMS41NTItMi42ODMsMi4wOTJDMjEuNTc2LDI0LjMzMywyMS45NTEsMjMuNjMzLDIyLjI3MywyMi44NkwyMi4yNzMsMjIuODZ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMTcuMjI2LDIyLjg2aDMuMDY0Yy0wLjgyOSwxLjY2NC0xLjkwMywyLjc3MS0zLjA2NCwzLjE1NVYyMi44NkwxNy4yMjYsMjIuODZ6IE0xMi4zMzksMjIuODZoMy4xMTJ2My4xNzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzE0LjI3MSwyNS42NiwxMy4xODEsMjQuNTQ5LDEyLjMzOSwyMi44NkwxMi4zMzksMjIuODZ6IE04LjgzOCwyMi44NmgxLjUxOGMwLjMxNCwwLjc1NSwwLjY3OSwxLjQ0'+
			'LDEuMDg4LDIuMDUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzEwLjQ3MywyNC4zNzQsOS41ODcsMjMuNjc4LDguODM4LDIyLjg2TDguODM4LDIyLjg2eiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_url_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_url_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG'+
			'9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgeG1sbnM6Z3JhcGg9Imh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIj4KIDxnIGlkPSJMYXllcl8xIi8+'+
			'CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxnIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBmaWxsPSJub25lIiBkPSJNMjkuMjU5LDE1Ljk5OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLTcuMTI1LTUuNzk2LTEyLjkyLTEyLjkyMS0xMi45MmMtNy4xMjQsMC0xMi45Miw1Ljc5NS0xMi45MiwxMi45MmMwLDcuMDc1LDUuNzIsMTIuODM4LDEyLjc3NywxMi45MTUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4wNCwwLjAwNC'+
			'wwLjA3OCwwLjAwNywwLjExNywwLjAwN2MwLjAxMywwLDAuMDI0LTAuMDAzLDAuMDM1LTAuMDAzQzIzLjQ2OCwyOC45MTQsMjkuMjU5LDIzLjEyLDI5LjI1OSwxNS45OTl6IE00Ljk1OSwxNi43NTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtoMy42MzRjMC4wNjIsMS44MjIsMC4zMzcsMy41MywwLjc4OCw1LjA2SDYuNTI4QzUuNjM2LDIwLjMxMiw1LjA4LDE4LjU5NSw0Ljk1OSwxNi43NTR6IE0yNy43MTksMTUuMjQzaC0zLjY4NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC4wNjEtMS44MTYtMC4zMzMtMy41Mi0wLjc4My01LjA0NGgyLjkwN0MyNy4wNDQsMTEuNjk1LDI3'+
			'LjU5NiwxMy40MTEsMjcuNzE5LDE1LjI0M3ogTTIyLjUyLDE1LjI0M2gtNS40MjV2LTUuMDQ0aDQuNTQzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIyLjEzNSwxMS43MDMsMjIuNDQ5LDEzLjQyMiwyMi41MiwxNS4yNDN6IE0xNy4wOTUsOC42ODZWNC42OWMxLjU2LDAuMzc4LDIuOTU4LDEuODYxLDMuOTQ3LDMuOTk1SDE3LjA5NXogTTE1LjU4Myw0LjY3OHY0LjAwOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2gtMy45OTlDMTIuNTgzLDYuNTI5LDE0LjAwMSw1LjAzNiwxNS41ODMsNC42Nzh6IE0xNS41ODMsMTAuMTk5djUuMDQ0aC01LjQ3NmMwLjA2OS0xLjgyMSwwLjM4Mi'+
			'0zLjU0LDAuODgtNS4wNDRIMTUuNTgzeiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5OyBNOC41OTMsMTUuMjQzSDQuOTU5YzAuMTE5LTEuODMyLDAuNjc1LTMuNTQ4LDEuNTYyLTUuMDQ0aDIuODU3QzguOTI5LDExLjcyNCw4LjY1NCwxMy40MjcsOC41OTMsMTUuMjQzeiBNMTAuMTA3LDE2Ljc1NGg1LjQ3NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O3Y1LjA2aC00LjU5MkMxMC40OTEsMjAuMzA2LDEwLjE3NywxOC41ODIsMTAuMTA3LDE2Ljc1NHogTTE1LjU4MywyMy4zMjZ2My45OTZjLTEuNTc4LTAuMzU2LTIuOTk1LTEuODQ2LTMuOTk0LTMuOTk2SDE1LjU4M3omI3hkOyYjeGE7'+
			'JiN4OTsmI3g5OyYjeDk7JiN4OTsgTTE3LjA5NSwyNy4zMXYtMy45ODNoMy45NDFDMjAuMDQ5LDI1LjQ1MywxOC42NTEsMjYuOTM0LDE3LjA5NSwyNy4zMXogTTE3LjA5NSwyMS44MTN2LTUuMDZoNS40MjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuMDcsMS44MjgtMC4zODUsMy41NTItMC44ODYsNS4wNkgxNy4wOTV6IE0yNC4wMzIsMTYuNzU0aDMuNjg3Yy0wLjEyMywxLjg0MS0wLjY3OSwzLjU1OC0xLjU3LDUuMDZoLTIuOTAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzIzLjY5NiwyMC4yODQsMjMuOTcyLDE4LjU3NiwyNC4wMzIsMTYuNzU0eiBNMjUuMDg1LDguNj'+
			'g2aC0yLjM1OWMtMC40OTItMS4yMTItMS4xMDMtMi4yNzEtMS44MDktMy4xMzMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjIuNTM2LDYuMjY3LDIzLjk2Myw3LjM0NSwyNS4wODUsOC42ODZ6IE0xMS42OCw1LjU5MmMtMC42OTMsMC44NTQtMS4yOTUsMS44OTktMS43NzgsMy4wOTRINy41OTEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDOC42OTYsNy4zNjcsMTAuMDkyLDYuMzA0LDExLjY4LDUuNTkyeiBNNy42MDQsMjMuMzI2aDIuMzAzYzAuNDgxLDEuMTksMS4wOCwyLjIyOSwxLjc3LDMuMDgxJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7QzEwLjA5NSwyNS42OTUs'+
			'OC43MDQsMjQuNjM5LDcuNjA0LDIzLjMyNnogTTIwLjkxOSwyNi40NDNjMC43MDItMC44NTcsMS4zMTItMS45MTIsMS44MDItMy4xMTdoMi4zNTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtDMjMuOTUyLDI0LjY2LDIyLjUzMywyNS43MzQsMjAuOTE5LDI2LjQ0M3oiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgIDwvZz4KICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE2LjE4NiwyOS4wMTRDOS4wOTQsMjguOTM3LDMuMzE4LDIzLjA5OCwzLjMxOCwxNS45OTljMC03LjE3OSw1Ljg0MS0xMy4wMiwxMy4wMi0xMy4wMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjNy4xOCwwLDEzLjAyMS'+
			'w1Ljg0MSwxMy4wMjEsMTMuMDJjMCw3LjE3NS01LjgzNiwxMy4wMTUtMTMuMDExLDEzLjAxOWwtMC4wMzUsMC4wMDNDMTYuMjcsMjkuMDIxLDE2LjIyOSwyOS4wMTgsMTYuMTg2LDI5LjAxNHomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xMS43NDcsMjMuNDI2YzAuOTg4LDIuMDYxLDIuMzA3LDMuMzkxLDMuNzM2LDMuNzY5di0zLjc2OUgxMS43NDd6IE0xNy4xOTQsMjcuMThjMS40MDktMC4zOTYsMi43MS0xLjcyMSwzLjY4NC0zLjc1NGgtMy42ODQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7VjI3LjE4eiBNMjIuNzg4LDIzLjQyNmMtMC40MywxLjA0NC0wLjk0NSwxLjk2OC0xLjUzNSwyLjc1'+
			'M2MxLjM2My0wLjY2LDIuNi0xLjYwNCwzLjYwNC0yLjc1M0gyMi43ODh6IE03LjgyMSwyMy40MjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuOTc3LDEuMTIsMi4xODQsMi4wNSwzLjUyLDIuNzEzYy0wLjU3OS0wLjc4LTEuMDgzLTEuNjktMS41MDItMi43MTNINy44MjF6IE01LjA2NiwxNi44NTRjMC4xMzEsMS43NSwwLjY1MSwzLjQsMS41NDgsNC45MDkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDIuNjM0LTAuMDQ3Yy0wLjQzNS0xLjUxMy0wLjY4Ny0zLjE0Ny0wLjc1Mi00Ljg2Mkg1LjA2NnogTTI2LjE0OCwyMS43MTRjMC44MTEtMS40NiwxLjMzLTMuMTEsMS40NjMtNC44NmgtMy40OD'+
			'ImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjA2NCwxLjcxNC0wLjMxNiwzLjM0Ny0wLjc1MSw0Ljg2SDI2LjE0OHogTTIxLjU2MiwyMS43MTRjMC40ODUtMS40ODMsMC43NzktMy4xNiwwLjg1NC00Ljg2aC01LjIyMXY0Ljg2SDIxLjU2MnomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0xNS40ODMsMjEuNzE0di00Ljg2aC01LjI3MWMwLjA3NCwxLjY5OCwwLjM2NywzLjM3NSwwLjg1Miw0Ljg2SDE1LjQ4M3ogTTI3LjYxMSwxNS4xNDNjLTAuMTMzLTEuNzI2LTAuNjY0LTMuNDE1LTEuNTQxLTQuODkzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtMi42ODgsMC4wNDZjMC40MzIsMS41MDMs'+
			'MC42ODMsMy4xMzIsMC43NDcsNC44NDZIMjcuNjExeiBNMjIuNDE1LDE1LjE0M2MtMC4wNzQtMS42ODktMC4zNjctMy4zNi0wLjg1LTQuODQ0aC00LjM3MXY0Ljg0NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtIMjIuNDE1eiBNMTUuNDgzLDE1LjE0M3YtNC44NDRIMTEuMDZjLTAuNDgyLDEuNDc5LTAuNzc0LDMuMTUtMC44NDgsNC44NDRIMTUuNDgzeiBNOC40OTYsMTUuMTQzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjA2NS0xLjcwOCwwLjMxNy0zLjMzNywwLjc0OS00Ljg0NEg2LjU3OGMtMC44NjMsMS40NzMtMS4zODQsMy4xNDUtMS41MTEsNC44NDRIOC40OTZ6IE0yNC44NjgsOC41OD'+
			'UmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0xLjAwMi0xLjE1MS0yLjI0Mi0yLjEtMy42MTYtMi43NjhjMC41OTIsMC43ODksMS4xMDksMS43MTgsMS41NDEsMi43NjhIMjQuODY4eiBNMjAuODg1LDguNTg1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC45NzYtMi4wMzktMi4yNzgtMy4zNjgtMy42OS0zLjc2NnYzLjc2NkgyMC44ODV6IE0xNS40ODMsOC41ODV2LTMuNzhjLTEuNDMzLDAuMzgtMi43NTMsMS43MTQtMy43NDEsMy43OEgxNS40ODN6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNOS44MzQsOC41ODVjMC40MjItMS4wMywwLjkyOS0xLjk0NCwxLjUxLTIuNzI1Yy0xLjMzOSww'+
			'LjY2Mi0yLjU1MSwxLjU5Ni0zLjUzNiwyLjcyNUg5LjgzNHoiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNMTYuMzM4LDMuMDc5YzcuMTI1LDAsMTIuOTIxLDUuNzk1LDEyLjkyMSwxMi45MmMwLDcuMTIxLTUuNzkxLDEyLjkxNS0xMi45MTEsMTIuOTE5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4wMTEsMC0wLjAyMiwwLjAwMy0wLjAzNSwwLjAwM2MtMC4wMzksMC0wLjA3Ny0wLjAwMy0wLjExNy0wLjAwN2MtNy4wNTgtMC4wNzctMTIuNzc3LTUuODQtMTIuNzc3LTEyLjkxNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMy40MTgsOC44NzQsOS4yMT'+
			'QsMy4wNzksMTYuMzM4LDMuMDc5IE0xMS41ODQsOC42ODZoMy45OTlWNC42NzhDMTQuMDAxLDUuMDM2LDEyLjU4Myw2LjUyOSwxMS41ODQsOC42ODYgTTE3LjA5NSw4LjY4NmgzLjk0NyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuOTg5LTIuMTM0LTIuMzg4LTMuNjE3LTMuOTQ3LTMuOTk1VjguNjg2IE0yMi43MjYsOC42ODZoMi4zNTljLTEuMTIyLTEuMzQxLTIuNTQ5LTIuNDE5LTQuMTY4LTMuMTMzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MyMS42MjMsNi40MTUsMjIuMjMzLDcuNDc0LDIyLjcyNiw4LjY4NiBNNy41OTEsOC42ODZoMi4zMTFjMC40ODMtMS4xOTQsMS4wODUtMi4yNCwx'+
			'Ljc3OC0zLjA5NCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMTAuMDkyLDYuMzA0LDguNjk2LDcuMzY3LDcuNTkxLDguNjg2IE0yNC4wMzIsMTUuMjQzaDMuNjg3Yy0wLjEyMy0xLjgzMi0wLjY3NS0zLjU0OC0xLjU2Mi01LjA0NGgtMi45MDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzIzLjY5OSwxMS43MjQsMjMuOTcyLDEzLjQyNywyNC4wMzIsMTUuMjQzIE0xNy4wOTUsMTUuMjQzaDUuNDI1Yy0wLjA3LTEuODIxLTAuMzg1LTMuNTQtMC44ODItNS4wNDRoLTQuNTQzVjE1LjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTEwLjEwNywxNS4yNDNoNS40NzZ2LTUuMDQ0aC00LjU5NkMxMC'+
			'40ODksMTEuNzAzLDEwLjE3NywxMy40MjIsMTAuMTA3LDE1LjI0MyBNNC45NTksMTUuMjQzaDMuNjM0JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjA2Mi0xLjgxNiwwLjMzNi0zLjUyLDAuNzg1LTUuMDQ0SDYuNTIxQzUuNjM0LDExLjY5NSw1LjA3OCwxMy40MTEsNC45NTksMTUuMjQzIE0yMy4yNDUsMjEuODEzaDIuOTAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjg5Mi0xLjUwMiwxLjQ0Ny0zLjIxOSwxLjU3LTUuMDZoLTMuNjg3QzIzLjk3MiwxOC41NzYsMjMuNjk2LDIwLjI4NCwyMy4yNDUsMjEuODEzIE0xNy4wOTUsMjEuODEzaDQuNTM5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5'+
			'O2MwLjUwMS0xLjUwOCwwLjgxNS0zLjIzMSwwLjg4Ni01LjA2aC01LjQyNVYyMS44MTMgTTEwLjk5MSwyMS44MTNoNC41OTJ2LTUuMDZoLTUuNDc2QzEwLjE3NywxOC41ODIsMTAuNDkxLDIwLjMwNiwxMC45OTEsMjEuODEzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNNi41MjgsMjEuODEzaDIuODUzYy0wLjQ1MS0xLjUyOS0wLjcyNy0zLjIzNy0wLjc4OC01LjA2SDQuOTU5QzUuMDgsMTguNTk1LDUuNjM2LDIwLjMxMiw2LjUyOCwyMS44MTMgTTIwLjkxOSwyNi40NDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNjE0LTAuNzA5LDMuMDMzLTEuNzgzLDQuMTU1LTMuMTE3aC0yLjM1NEMyMi'+
			'4yMywyNC41MzEsMjEuNjIxLDI1LjU4NiwyMC45MTksMjYuNDQzIE0xNy4wOTUsMjcuMzEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNTU3LTAuMzc2LDIuOTU0LTEuODU2LDMuOTQxLTMuOTgzaC0zLjk0MVYyNy4zMSBNMTUuNTgzLDI3LjMyMnYtMy45OTZoLTMuOTk0QzEyLjU4OCwyNS40NzcsMTQuMDA1LDI2Ljk2NiwxNS41ODMsMjcuMzIyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNMTEuNjc2LDI2LjQwN2MtMC42ODktMC44NTItMS4yODgtMS44OTEtMS43Ny0zLjA4MUg3LjYwNEM4LjcwNCwyNC42MzksMTAuMDk1LDI1LjY5NSwxMS42NzYsMjYuNDA3IE0xNi4zMzgsMi44NzkmI3hk'+
			'OyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy03LjIzNCwwLTEzLjEyLDUuODg2LTEzLjEyLDEzLjEyYzAsNy4xNTMsNS44MjEsMTMuMDM3LDEyLjk3NiwxMy4xMTVjMC4wMjksMC4wMDMsMC4wNzQsMC4wMDcsMC4xMTksMC4wMDcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzcuMjY1LTAuMDA3LDEzLjE0Ni01Ljg5MywxMy4xNDYtMTMuMTIyQzI5LjQ1OSw4Ljc2NSwyMy41NzMsMi44NzksMTYuMzM4LDIuODc5TDE2LjMzOCwyLjg3OXogTTExLjkwMSw4LjQ4NSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC45MzctMS44OTcsMi4xNTktMy4xNDIsMy40ODEtMy41NDd2My41NDdIMTEuOTAxTDExLjkwMS'+
			'w4LjQ4NXogTTE3LjI5NSw4LjQ4NVY0Ljk1NWMxLjMwMiwwLjQyMiwyLjUwNSwxLjY2LDMuNDMsMy41MzFIMTcuMjk1JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0wxNy4yOTUsOC40ODV6IE0yMi44NTksOC40ODVjLTAuMzY5LTAuODg4LTAuOC0xLjY4OC0xLjI4Ni0yLjM5MmMxLjE1MSwwLjYxMiwyLjE5NywxLjQyNiwzLjA3MiwyLjM5MkgyMi44NTlMMjIuODU5LDguNDg1eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTguMDMxLDguNDg1YzAuODU2LTAuOTQzLDEuODc1LTEuNzQxLDIuOTkxLTIuMzQ2Yy0wLjQ3NCwwLjY5My0wLjg5NSwxLjQ3OS0xLjI1NSwyLjM0Nkg4LjAzMUw4LjAzMSw4'+
			'LjQ4NXogTTIzLjUxNSwxMC4zOTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7aDIuNTI3YzAuODE2LDEuNDEsMS4zMTksMy4wMDksMS40NjEsNC42NDRoLTMuMjc4QzI0LjE1NiwxMy40MDUsMjMuOTE4LDExLjg0NiwyMy41MTUsMTAuMzk5TDIzLjUxNSwxMC4zOTl6IE0xNy4yOTUsMTAuMzk5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2g0LjE5N2MwLjQ1NywxLjQyNywwLjczOCwzLjAyNSwwLjgxOCw0LjY0NGgtNS4wMTZWMTAuMzk5TDE3LjI5NSwxMC4zOTl6IE0xMS4xMzIsMTAuMzk5aDQuMjV2NC42NDRoLTUuMDY2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MxMC4zOTYsMTMuNDIxLDEwLj'+
			'Y3NiwxMS44MjMsMTEuMTMyLDEwLjM5OUwxMS4xMzIsMTAuMzk5eiBNNi42MzUsMTAuMzk5aDIuNDc4Yy0wLjQwNCwxLjQ1LTAuNjQ0LDMuMDEtMC43MTIsNC42NDRINS4xNzQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzUuMzEyLDEzLjQxNSw1LjgxNSwxMS44MTYsNi42MzUsMTAuMzk5TDYuNjM1LDEwLjM5OXogTTI0LjIyNSwxNi45NTRoMy4yNzhjLTAuMTQyLDEuNjU2LTAuNjM1LDMuMjIzLTEuNDY5LDQuNjU5aC0yLjUyMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjMuOTE3LDIwLjE1NywyNC4xNTcsMTguNTkyLDI0LjIyNSwxNi45NTRMMjQuMjI1LDE2Ljk1NHogTTE3LjI5NSwxNi45'+
			'NTRoNS4wMTZjLTAuMDgsMS42MjktMC4zNjIsMy4yMzItMC44MjIsNC42NTloLTQuMTkzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O1YxNi45NTRMMTcuMjk1LDE2Ljk1NHogTTEwLjMxNiwxNi45NTRoNS4wNjZ2NC42NTloLTQuMjQ3QzEwLjY3NywyMC4xODUsMTAuMzk2LDE4LjU4MSwxMC4zMTYsMTYuOTU0TDEwLjMxNiwxNi45NTR6JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyBNNS4xNzUsMTYuOTU0SDguNGMwLjA2OSwxLjYzOSwwLjMwOSwzLjIwNCwwLjcxNSw0LjY1OUg2LjY0M0M1LjgwOCwyMC4xNzYsNS4zMTQsMTguNjEsNS4xNzUsMTYuOTU0TDUuMTc1LDE2Ljk1NHomI3hkOyYjeGE7Ji'+
			'N4OTsmI3g5OyYjeDk7IE0yMi44NTQsMjMuNTI2aDEuNzc5Yy0wLjg3NiwwLjk2Mi0xLjkxNywxLjc3MS0zLjA1OSwyLjM3N0MyMi4wNTksMjUuMjA0LDIyLjQ4NywyNC40MDgsMjIuODU0LDIzLjUyNkwyMi44NTQsMjMuNTI2eiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsgTTE3LjI5NSwyMy41MjZoMy40MjRjLTAuOTIzLDEuODY1LTIuMTI1LDMuMDk5LTMuNDI0LDMuNTJWMjMuNTI2TDE3LjI5NSwyMy41MjZ6IE0xMS45MDcsMjMuNTI2aDMuNDc2djMuNTM2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MxNC4wNjMsMjYuNjU4LDEyLjg0MywyNS40MTgsMTEuOTA3LDIzLjUyNkwxMS45MDcsMjMu'+
			'NTI2eiBNOC4wNDMsMjMuNTI2aDEuNzI5YzAuMzU3LDAuODYsMC43NzQsMS42NDIsMS4yNDcsMi4zMzImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7QzkuOTA1LDI1LjI1NCw4Ljg5MywyNC40NjEsOC4wNDMsMjMuNTI2TDguMDQzLDIzLjUyNnoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_url_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_url_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_image.style[domTransition]='';
				if (me._ht_url_image.ggCurrentLogicStateVisible == 0) {
					me._ht_url_image.style.visibility="hidden";
					me._ht_url_image.ggVisible=false;
				}
				else {
					me._ht_url_image.style.visibility=(Number(me._ht_url_image.style.opacity)>0||!me._ht_url_image.style.opacity)?'inherit':'hidden';
					me._ht_url_image.ggVisible=true;
				}
			}
		}
		me._ht_url_image.onmouseover=function (e) {
			me._ht_url_image__img.style.visibility='hidden';
			me._ht_url_image__imgo.style.visibility='inherit';
		}
		me._ht_url_image.onmouseout=function (e) {
			me._ht_url_image__img.style.visibility='inherit';
			me._ht_url_image__imgo.style.visibility='hidden';
		}
		me._ht_url_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_url.appendChild(me._ht_url_image);
		el=me._tt_ht_url=document.createElement('div');
		els=me._tt_ht_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_url.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_url.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_url.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_url.style.top='-47px';
					me._tt_ht_url.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_url.ggDx=0;
					me._tt_ht_url.style.top='24px';
					me._tt_ht_url.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_url'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_url.style[domTransition]='left 0s, top 0s';
				if (me._tt_ht_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_url.style.visibility=(Number(me._tt_ht_url.style.opacity)>0||!me._tt_ht_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_url.ggVisible=true;
				}
				else {
					me._tt_ht_url.style.visibility="hidden";
					me._tt_ht_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_url.appendChild(me._tt_ht_url);
		el=me._ht_url_customimage=document.createElement('div');
		els=me._ht_url_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_url_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_url_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_url_customimage.style[domTransition]='';
				if (me._ht_url_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_url_customimage.style.visibility="hidden";
					me._ht_url_customimage__img.src = '';
					me._ht_url_customimage.ggVisible=false;
				}
				else {
					me._ht_url_customimage.style.visibility=(Number(me._ht_url_customimage.style.opacity)>0||!me._ht_url_customimage.style.opacity)?'inherit':'hidden';
					me._ht_url_customimage.ggSubElement.src=me._ht_url_customimage.ggText;
					me._ht_url_customimage.ggVisible=true;
				}
			}
		}
		me._ht_url_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_url_customimage.clientWidth;
			var parentHeight = me._ht_url_customimage.clientHeight;
			var img = me._ht_url_customimage__img;
			var aspectRatioDiv = me._ht_url_customimage.clientWidth / me._ht_url_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_url.appendChild(me._ht_url_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_url;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_video_youtube') {
			hotspot.skinid = 'ht_video_youtube';
			hsinst = new SkinHotspotClass_ht_video_youtube(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_youtube_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_vimeo') {
			hotspot.skinid = 'ht_video_vimeo';
			hsinst = new SkinHotspotClass_ht_video_vimeo(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_url_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_url_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_url_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_url_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_url_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_file_changenode();;
			me.callChildLogicBlocksHotspot_ht_video_file_configloaded();;
			me.callChildLogicBlocksHotspot_ht_video_file_mouseover();;
			me.callChildLogicBlocksHotspot_ht_video_file_hastouch();;
			me.callChildLogicBlocksHotspot_ht_video_file_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_changenode();;
			me.callChildLogicBlocksHotspot_ht_image_configloaded();;
			me.callChildLogicBlocksHotspot_ht_image_mouseover();;
			me.callChildLogicBlocksHotspot_ht_image_hastouch();;
			me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_changenode();;
			me.callChildLogicBlocksHotspot_ht_info_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
			me.callChildLogicBlocksHotspot_ht_info_hastouch();;
			me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();;
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();;
			me.callChildLogicBlocksHotspot_ht_node_hastouch();;
			me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview();;
		} else
		{
			hotspot.skinid = 'ht_url';
			hsinst = new SkinHotspotClass_ht_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_url_changenode();;
			me.callChildLogicBlocksHotspot_ht_url_configloaded();;
			me.callChildLogicBlocksHotspot_ht_url_mouseover();;
			me.callChildLogicBlocksHotspot_ht_url_hastouch();;
			me.callChildLogicBlocksHotspot_ht_url_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website();;
			me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				hotspotTemplates['ht_video_youtube'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				hotspotTemplates['ht_video_vimeo'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				hotspotTemplates['ht_video_url'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				hotspotTemplates['ht_video_file'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				hotspotTemplates['ht_url'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage=document.createElement('div');
		els=me._thumbnail_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.64,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_nodeimage);
		el=me._thumbnail_active=document.createElement('div');
		el.ggId="thumbnail_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #d1d1d1;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active.style[domTransition]='border-color 0s';
				if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._thumbnail_active.style.borderColor="rgba(209,209,209,1)";
				}
			}
		}
		me._thumbnail_active.onclick=function (e) {
			if (
				(
					((me._thumbnail_active.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._thumbnail_active.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active']=true;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_title.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ggUpdatePosition=function (useTransition) {
		}
		el=me._checkmark_tick=document.createElement('div');
		els=me._checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG'+
			'9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMzcyMiAtMjYwNiAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzcyMiAtMjYwNiAzMiAzMiI+CiA8'+
			'ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1'+
			'LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O00tMzY5NS40Nz'+
			'MtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4x'+
			'NDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBkPSImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Nn'+
			'YxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtj'+
			'LTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi'+
			'0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQi'+
			'IGZpbGw9Im5vbmUiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3'+
			'g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9Ik0tMzY5OS45Ni0yNTgzLjgzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2gtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni0wLjA4Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0Ljcx'+
			'OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwM2wtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 24px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true)) || 
				((me._checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick.style.visibility=(Number(me._checkmark_tick.style.opacity)>0||!me._checkmark_tick.style.opacity)?'inherit':'hidden';
					me._checkmark_tick.ggVisible=true;
				}
				else {
					me._checkmark_tick.style.visibility="hidden";
					me._checkmark_tick.ggVisible=false;
				}
			}
		}
		me._checkmark_tick.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick.style.opacity == 0.0) { me._checkmark_tick.style.visibility="hidden"; } }, 505);
					me._checkmark_tick.style.opacity=0;
				}
				else {
					me._checkmark_tick.style.visibility=me._checkmark_tick.ggVisible?'inherit':'hidden';
					me._checkmark_tick.style.opacity=1;
				}
			}
		}
		me._checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._checkmark_tick);
		el=me._thumbnail_title=document.createElement('div');
		els=me._thumbnail_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_tooltip') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title.style.visibility=me._thumbnail_title.ggVisible?'inherit':'hidden';
					me._thumbnail_title.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title.style.opacity == 0.0) { me._thumbnail_title.style.visibility="hidden"; } }, 505);
					me._thumbnail_title.style.opacity=0;
				}
			}
		}
		me._thumbnail_title.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._thumbnail_title);
		me.__div.appendChild(me._thumbnail_active);
	};
	function SkinCloner_thumbnail_cloner_mobile_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage_mobile=document.createElement('div');
		els=me._thumbnail_nodeimage_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.64,sy:0.6 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage_mobile.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._thumbnail_nodeimage_mobile);
		el=me._thumbnail_active_mobile=document.createElement('div');
		el.ggId="thumbnail_active_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #d1d1d1;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active_mobile.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active_mobile.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active_mobile.style[domTransition]='border-color 0s';
				if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active_mobile.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active_mobile.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._thumbnail_active_mobile.style.borderColor="rgba(209,209,209,1)";
				}
			}
		}
		me._thumbnail_active_mobile.onclick=function (e) {
			if (
				(
					((me._thumbnail_active_mobile.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
			player.setVariableValue('vis_thumbnail_menu_mobile', false);
		}
		me._thumbnail_active_mobile.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=true;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=false;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active_mobile']=false;
			me._checkmark_tick_mobile.logicBlock_alpha();
			me._thumbnail_title_mobile.logicBlock_alpha();
			me._thumbnail_active_mobile.logicBlock_bordercolor();
		}
		me._thumbnail_active_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._checkmark_tick_mobile=document.createElement('div');
		els=me._checkmark_tick_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOng9Imh0dHA6Ly9ucy5hZG'+
			'9iZS5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIiB4bWw6c3BhY2U9InByZXNlcnZlIiB5PSIwcHgiIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSItMzcyMiAtMjYwNiAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzcyMiAtMjYwNiAzMiAzMiI+CiA8'+
			'ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1'+
			'LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiIG9wYWNpdHk9IjAuNCI+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9IiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O00tMzY5NS40Nz'+
			'MtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4x'+
			'NDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im5vcm1hbCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBkPSImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Nn'+
			'YxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgIDwvZz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtj'+
			'LTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIgZmlsbC1vcGFjaXR5PSIxIi8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi'+
			'0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiIGZpbGwtb3BhY2l0eT0iMSIvPgogICA8L2c+CiAgIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQi'+
			'IGZpbGw9Im5vbmUiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3'+
			'g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjAuMiIvPgogICAgPHBhdGggc3Ryb2tlPSIjMUExNzFCIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIGQ9Ik0tMzY5OS45Ni0yNTgzLjgzNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2gtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni0wLjA4Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0Ljcx'+
			'OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwM2wtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIwLjIiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._checkmark_tick_mobile__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick_mobile";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 24px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick_mobile.ggElementNodeId()) == true)) || 
				((me._checkmark_tick_mobile.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick_mobile.style.visibility=(Number(me._checkmark_tick_mobile.style.opacity)>0||!me._checkmark_tick_mobile.style.opacity)?'inherit':'hidden';
					me._checkmark_tick_mobile.ggVisible=true;
				}
				else {
					me._checkmark_tick_mobile.style.visibility="hidden";
					me._checkmark_tick_mobile.ggVisible=false;
				}
			}
		}
		me._checkmark_tick_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick_mobile.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick_mobile.style.opacity == 0.0) { me._checkmark_tick_mobile.style.visibility="hidden"; } }, 505);
					me._checkmark_tick_mobile.style.opacity=0;
				}
				else {
					me._checkmark_tick_mobile.style.visibility=me._checkmark_tick_mobile.ggVisible?'inherit':'hidden';
					me._checkmark_tick_mobile.style.opacity=1;
				}
			}
		}
		me._checkmark_tick_mobile.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active_mobile.appendChild(me._checkmark_tick_mobile);
		el=me._thumbnail_title_mobile=document.createElement('div');
		els=me._thumbnail_title_mobile__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title_mobile";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title_mobile.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active_mobile'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_tooltip') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title_mobile.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title_mobile.style.visibility=me._thumbnail_title_mobile.ggVisible?'inherit':'hidden';
					me._thumbnail_title_mobile.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title_mobile.style.opacity == 0.0) { me._thumbnail_title_mobile.style.visibility="hidden"; } }, 505);
					me._thumbnail_title_mobile.style.opacity=0;
				}
			}
		}
		me._thumbnail_title_mobile.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._thumbnail_active_mobile.appendChild(me._thumbnail_title_mobile);
		me.__div.appendChild(me._thumbnail_active_mobile);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._screentint.logicBlock_alpha();
	me._tt_thumbnail_open.logicBlock_text();
	me._thumbnail_menu.logicBlock_visible();
	me._thumbnail_menu.logicBlock_alpha();
	me._thumbnail_menu_mobile.logicBlock_visible();
	me._thumbnail_menu_mobile.logicBlock_alpha();
	me._loading_multires.logicBlock_visible();
	me._fullscreen.logicBlock_alpha();
	me._fullscreen_off.logicBlock_alpha();
	me._tt_fullscreen.logicBlock_text();
	me._show_controller_button.logicBlock_position();
	me._controller.logicBlock_position();
	me._controller.logicBlock_alpha();
	me._controller_slider.logicBlock_position();
	me._controller_slider.logicBlock_alpha();
	me._enter_vr.logicBlock_position();
	me._fullscreen_buttons.logicBlock_position();
	me._fullscreen_buttons.logicBlock_visible();
	me._gyro.logicBlock_position();
	me._gyro.logicBlock_visible();
	me._gyro_on.logicBlock_alpha();
	me._gyro_off.logicBlock_alpha();
	me._tt_gyro.logicBlock_text();
	me._projection_buttons.logicBlock_position();
	me._projection_buttons.logicBlock_visible();
	me._thumbnail.logicBlock_position();
	me._thumbnail.logicBlock_visible();
	me._info.logicBlock_position();
	me._info.logicBlock_visible();
	me._autorotate_buttons.logicBlock_position();
	me._autorotate_buttons.logicBlock_visible();
	me._autorotate_start.logicBlock_alpha();
	me._autorotate_stop.logicBlock_alpha();
	me._tt_rotate.logicBlock_text();
	me._zoomout.logicBlock_visible();
	me._zoomin.logicBlock_visible();
	me._thumbnail_menu.logicBlock_position();
	me._thumbnail_menu_mobile.logicBlock_position();
	me._loading.logicBlock_visible();
	me._web_page.logicBlock_visible();
	me._userdata.logicBlock_visible();
	me._information.logicBlock_visible();
	me._image_popup.logicBlock_visible();
	me._popup_image.logicBlock_visible();
	me._video_popup_file.logicBlock_visible();
	me._popup_video_file.logicBlock_visible();
	me._video_popup_controls_file.logicBlock_visible();
	me._video_popup_url.logicBlock_visible();
	me._popup_video_url.logicBlock_visible();
	me._video_popup_controls_url.logicBlock_visible();
	me._video_popup_vimeo.logicBlock_visible();
	me._popup_video_vimeo.logicBlock_visible();
	me._video_popup_youtube.logicBlock_visible();
	me._popup_video_youtube.logicBlock_visible();
	me.__360image_gyro.logicBlock_visible();
	me.__360image.logicBlock_position();
	me.__360image.logicBlock_scaling();
	me._phone2.logicBlock_scaling();
	me._phone3.logicBlock_scaling();
	me._close.logicBlock_visible();
	me._tt_show_controller.logicBlock_position();
	me._tt_enter_vr.logicBlock_position();
	me._tt_fullscreen.logicBlock_position();
	me._tt_gyro.logicBlock_position();
	me._tt_projection.logicBlock_position();
	me._tt_thumbnail_open.logicBlock_position();
	me._tt_userdata.logicBlock_position();
	me._tt_rotate.logicBlock_position();
	me._tt_zoomout.logicBlock_position();
	me._tt_zoomin.logicBlock_position();
	me._tt_projection.logicBlock_text();
	me._enter_vr.logicBlock_visible();
	player.addListener('sizechanged', function(args) { me._screentint.logicBlock_alpha();me._tt_thumbnail_open.logicBlock_text();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('tilesready', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('tilesrequested', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('fullscreenenter', function(args) { me._fullscreen.logicBlock_alpha();me._fullscreen_off.logicBlock_alpha();me._tt_fullscreen.logicBlock_text(); });
	player.addListener('fullscreenexit', function(args) { me._fullscreen.logicBlock_alpha();me._fullscreen_off.logicBlock_alpha();me._tt_fullscreen.logicBlock_text(); });
	player.addListener('changenode', function(args) { me._show_controller_button.logicBlock_position();me._loading_multires.logicBlock_visible();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._controller.logicBlock_alpha();me._controller_slider.logicBlock_position();me._controller_slider.logicBlock_alpha();me._enter_vr.logicBlock_position();me._fullscreen_buttons.logicBlock_position();me._fullscreen_buttons.logicBlock_visible();me._gyro.logicBlock_position();me._gyro.logicBlock_visible();me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha();me._tt_gyro.logicBlock_text();me._projection_buttons.logicBlock_position();me._projection_buttons.logicBlock_visible();me._thumbnail.logicBlock_position();me._thumbnail.logicBlock_visible();me._tt_thumbnail_open.logicBlock_text();me._info.logicBlock_position();me._info.logicBlock_visible();me._autorotate_buttons.logicBlock_position();me._autorotate_buttons.logicBlock_visible();me._autorotate_start.logicBlock_alpha();me._autorotate_stop.logicBlock_alpha();me._tt_rotate.logicBlock_text();me._zoomout.logicBlock_visible();me._zoomin.logicBlock_visible();me._thumbnail_menu.logicBlock_position();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_position();me._thumbnail_menu_mobile.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_alpha();me._loading.logicBlock_visible();me._web_page.logicBlock_visible();me._userdata.logicBlock_visible();me._information.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._video_popup_file.logicBlock_visible();me._popup_video_file.logicBlock_visible();me._video_popup_controls_file.logicBlock_visible();me._video_popup_url.logicBlock_visible();me._popup_video_url.logicBlock_visible();me._video_popup_controls_url.logicBlock_visible();me._video_popup_vimeo.logicBlock_visible();me._popup_video_vimeo.logicBlock_visible();me._video_popup_youtube.logicBlock_visible();me._popup_video_youtube.logicBlock_visible();me.__360image_gyro.logicBlock_visible();me.__360image.logicBlock_position();me.__360image.logicBlock_scaling();me._phone2.logicBlock_scaling();me._phone3.logicBlock_scaling();me._close.logicBlock_visible(); });
	player.addListener('configloaded', function(args) { me._tt_show_controller.logicBlock_position();me._tt_enter_vr.logicBlock_position();me._fullscreen_buttons.logicBlock_visible();me._tt_fullscreen.logicBlock_position();me._gyro.logicBlock_visible();me._tt_gyro.logicBlock_position();me._tt_projection.logicBlock_position();me._thumbnail.logicBlock_visible();me._tt_thumbnail_open.logicBlock_position();me._tt_userdata.logicBlock_position();me._tt_rotate.logicBlock_position();me._tt_zoomout.logicBlock_position();me._tt_zoomin.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_visible();me.__360image_gyro.logicBlock_visible(); });
	player.addListener('projectionchanged', function(args) { me._tt_projection.logicBlock_text(); });
	player.addListener('autorotatechanged', function(args) { me._autorotate_start.logicBlock_alpha();me._autorotate_stop.logicBlock_alpha();me._tt_rotate.logicBlock_text(); });
	player.addListener('gyroavailable', function(args) { me._gyro.logicBlock_visible(); });
	player.addListener('gyrochanged', function(args) { me._gyro_on.logicBlock_alpha();me._gyro_off.logicBlock_alpha();me._tt_gyro.logicBlock_text(); });
	player.addListener('vrchanged', function(args) { me._enter_vr.logicBlock_visible(); });
	player.addListener('hastouch', function(args) { me._tt_show_controller.logicBlock_position();me._tt_enter_vr.logicBlock_position();me._tt_fullscreen.logicBlock_position();me._tt_gyro.logicBlock_position();me._tt_projection.logicBlock_position();me._tt_thumbnail_open.logicBlock_position();me._tt_userdata.logicBlock_position();me._tt_rotate.logicBlock_position();me._tt_zoomout.logicBlock_position();me._tt_zoomin.logicBlock_position();me._thumbnail_menu.logicBlock_position();me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_vis_userdata', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._thumbnail_menu_mobile.logicBlock_position();me._userdata.logicBlock_visible(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._information.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_file', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_file.logicBlock_visible();me._popup_video_file.logicBlock_visible();me._video_popup_controls_file.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_url', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_url.logicBlock_visible();me._popup_video_url.logicBlock_visible();me._video_popup_controls_url.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_vimeo', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_vimeo.logicBlock_visible();me._popup_video_vimeo.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_video_popup_youtube', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._video_popup_youtube.logicBlock_visible();me._popup_video_youtube.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_website', function(args) { me._show_controller_button.logicBlock_position();me._screentint.logicBlock_alpha();me._controller.logicBlock_position();me._thumbnail_menu.logicBlock_position();me._web_page.logicBlock_visible();me._close.logicBlock_visible(); });
	player.addListener('varchanged_vis_timer', function(args) { me._controller.logicBlock_alpha();me._controller_slider.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_opt_loader_mulires', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('varchanged_vis_thumbnail_menu_mobile', function(args) { me._screentint.logicBlock_alpha();me._tt_thumbnail_open.logicBlock_text();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_vis_thumbnail_menu_auto_hide', function(args) { me._screentint.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha();me._thumbnail_menu_mobile.logicBlock_alpha(); });
	player.addListener('varchanged_opt_thumbnail', function(args) { me._thumbnail.logicBlock_visible();me._thumbnail_menu.logicBlock_visible();me._thumbnail_menu_mobile.logicBlock_visible(); });
	player.addListener('varchanged_vis_thumbnail_menu_show', function(args) { me._tt_thumbnail_open.logicBlock_text();me._thumbnail_menu.logicBlock_alpha(); });
	player.addListener('varchanged_opt_loader', function(args) { me._loading.logicBlock_visible(); });
	player.addListener('varchanged_opt_gyro', function(args) { me._gyro.logicBlock_visible();me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_vis_360image_once', function(args) { me.__360image_gyro.logicBlock_visible(); });
	player.addListener('varchanged_pos_controller', function(args) { me._controller_slider.logicBlock_position(); });
	player.addListener('varchanged_pos_360image', function(args) { me.__360image.logicBlock_position();me.__360image.logicBlock_scaling();me._phone2.logicBlock_scaling();me._phone3.logicBlock_scaling(); });
	player.addListener('varchanged_pos_enter_vr', function(args) { me._enter_vr.logicBlock_position(); });
	player.addListener('varchanged_pos_fullscreen', function(args) { me._fullscreen_buttons.logicBlock_position(); });
	player.addListener('varchanged_opt_fullscreen', function(args) { me._fullscreen_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_gyro', function(args) { me._gyro.logicBlock_position(); });
	player.addListener('varchanged_pos_projection', function(args) { me._projection_buttons.logicBlock_position(); });
	player.addListener('varchanged_opt_projection', function(args) { me._projection_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_thumbnail', function(args) { me._thumbnail.logicBlock_position(); });
	player.addListener('varchanged_opt_info', function(args) { me._info.logicBlock_visible(); });
	player.addListener('varchanged_pos_information', function(args) { me._info.logicBlock_position(); });
	player.addListener('varchanged_opt_autorotate', function(args) { me._autorotate_buttons.logicBlock_visible(); });
	player.addListener('varchanged_pos_autorotate', function(args) { me._autorotate_buttons.logicBlock_position(); });
	player.addListener('varchanged_opt_zoom', function(args) { me._zoomout.logicBlock_visible();me._zoomin.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changenode();me._thumbnail_cloner_mobile.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover();me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover();me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_active();me._thumbnail_cloner_mobile.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();me._thumbnail_cloner_mobile.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged();me._thumbnail_cloner_mobile.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('varchanged_opt_thumbnail_tooltip', function(args) { me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_changenode();me.callChildLogicBlocksHotspot_ht_video_vimeo_changenode();me.callChildLogicBlocksHotspot_ht_video_url_changenode();me.callChildLogicBlocksHotspot_ht_video_file_changenode();me.callChildLogicBlocksHotspot_ht_image_changenode();me.callChildLogicBlocksHotspot_ht_info_changenode();me.callChildLogicBlocksHotspot_ht_node_changenode();me.callChildLogicBlocksHotspot_ht_url_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();me.callChildLogicBlocksHotspot_ht_video_url_configloaded();me.callChildLogicBlocksHotspot_ht_video_file_configloaded();me.callChildLogicBlocksHotspot_ht_image_configloaded();me.callChildLogicBlocksHotspot_ht_info_configloaded();me.callChildLogicBlocksHotspot_ht_node_configloaded();me.callChildLogicBlocksHotspot_ht_url_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();me.callChildLogicBlocksHotspot_ht_video_url_mouseover();me.callChildLogicBlocksHotspot_ht_video_file_mouseover();me.callChildLogicBlocksHotspot_ht_image_mouseover();me.callChildLogicBlocksHotspot_ht_info_mouseover();me.callChildLogicBlocksHotspot_ht_node_mouseover();me.callChildLogicBlocksHotspot_ht_url_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_changevisitednodes(); });
	player.addListener('hastouch', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_hastouch();me.callChildLogicBlocksHotspot_ht_video_vimeo_hastouch();me.callChildLogicBlocksHotspot_ht_video_url_hastouch();me.callChildLogicBlocksHotspot_ht_video_file_hastouch();me.callChildLogicBlocksHotspot_ht_image_hastouch();me.callChildLogicBlocksHotspot_ht_info_hastouch();me.callChildLogicBlocksHotspot_ht_node_hastouch();me.callChildLogicBlocksHotspot_ht_url_hastouch(); });
	player.addListener('activehotspotchanged', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_video_vimeo_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_video_url_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_video_file_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_url_activehotspotchanged(); });
	player.addListener('varchanged_vis_userdata', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup(); });
	player.addListener('varchanged_vis_video_popup_file', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file(); });
	player.addListener('varchanged_vis_video_popup_url', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url(); });
	player.addListener('varchanged_vis_video_popup_vimeo', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo(); });
	player.addListener('varchanged_vis_video_popup_youtube', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube(); });
	player.addListener('varchanged_vis_website', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website(); });
	player.addListener('varchanged_vis_timer', function(args) { me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer(); });
	player.addListener('varchanged_opt_hotspot_preview', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	document.addEventListener('keydown', function(e) {
		var key = e.which || e.keyCode;
		me.skinKeyPressed = key;
	});
	document.addEventListener('keyup', function(e) {
		var key = e.which || e.keyCode;
		me.skinKeyPressed = 0;
	});
	me.skinTimerEvent();
};