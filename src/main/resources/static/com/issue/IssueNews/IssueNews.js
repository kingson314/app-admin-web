define('Jztree',function(require, exports, module) {
/*
 * JQuery zTree core v3.5.16-beta.1
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-03-28
 */
(function(p){var G,H,I,J,K,L,r={},u={},v={},M={treeId:"",treeObj:null,view:{addDiyDom:null,autoCancelSelected:!0,dblClickExpand:!0,expandSpeed:"fast",fontCss:{},nameIsHTML:!1,selectedMulti:!0,showIcon:!0,showLine:!0,showTitle:!0,txtSelectedEnable:!1},data:{key:{children:"children",name:"name",title:"",url:"url"},simpleData:{enable:!1,idKey:"id",pIdKey:"pId",rootPId:null},keep:{parent:!1,leaf:!1}},async:{enable:!1,contentType:"application/x-www-form-urlencoded",type:"post",dataType:"text",url:"",autoParam:[],
otherParam:[],dataFilter:null},callback:{beforeAsync:null,beforeClick:null,beforeDblClick:null,beforeRightClick:null,beforeMouseDown:null,beforeMouseUp:null,beforeExpand:null,beforeCollapse:null,beforeRemove:null,onAsyncError:null,onAsyncSuccess:null,onNodeCreated:null,onClick:null,onDblClick:null,onRightClick:null,onMouseDown:null,onMouseUp:null,onExpand:null,onCollapse:null,onRemove:null}},w=[function(b){var a=b.treeObj,c=e.event;a.bind(c.NODECREATED,function(a,c,g){j.apply(b.callback.onNodeCreated,
[a,c,g])});a.bind(c.CLICK,function(a,c,g,l,h){j.apply(b.callback.onClick,[c,g,l,h])});a.bind(c.EXPAND,function(a,c,g){j.apply(b.callback.onExpand,[a,c,g])});a.bind(c.COLLAPSE,function(a,c,g){j.apply(b.callback.onCollapse,[a,c,g])});a.bind(c.ASYNC_SUCCESS,function(a,c,g,l){j.apply(b.callback.onAsyncSuccess,[a,c,g,l])});a.bind(c.ASYNC_ERROR,function(a,c,g,l,h,e){j.apply(b.callback.onAsyncError,[a,c,g,l,h,e])});a.bind(c.REMOVE,function(a,c,g){j.apply(b.callback.onRemove,[a,c,g])})}],x=[function(b){var a=
e.event;b.treeObj.unbind(a.NODECREATED).unbind(a.CLICK).unbind(a.EXPAND).unbind(a.COLLAPSE).unbind(a.ASYNC_SUCCESS).unbind(a.ASYNC_ERROR).unbind(a.REMOVE)}],y=[function(b){var a=h.getCache(b);a||(a={},h.setCache(b,a));a.nodes=[];a.doms=[]}],z=[function(b,a,c,d,f,g){if(c){var l=h.getRoot(b),e=b.data.key.children;c.level=a;c.tId=b.treeId+"_"+ ++l.zId;c.parentTId=d?d.tId:null;c.open=typeof c.open=="string"?j.eqs(c.open,"true"):!!c.open;c[e]&&c[e].length>0?(c.isParent=!0,c.zAsync=!0):(c.isParent=typeof c.isParent==
"string"?j.eqs(c.isParent,"true"):!!c.isParent,c.open=c.isParent&&!b.async.enable?c.open:!1,c.zAsync=!c.isParent);c.isFirstNode=f;c.isLastNode=g;c.getParentNode=function(){return h.getNodeCache(b,c.parentTId)};c.getPreNode=function(){return h.getPreNode(b,c)};c.getNextNode=function(){return h.getNextNode(b,c)};c.isAjaxing=!1;h.fixPIdKeyValue(b,c)}}],s=[function(b){var a=b.target,c=h.getSetting(b.data.treeId),d="",f=null,g="",l="",i=null,n=null,k=null;if(j.eqs(b.type,"mousedown"))l="mousedown";else if(j.eqs(b.type,
"mouseup"))l="mouseup";else if(j.eqs(b.type,"contextmenu"))l="contextmenu";else if(j.eqs(b.type,"click"))if(j.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+e.id.SWITCH)!==null)d=j.getNodeMainDom(a).id,g="switchNode";else{if(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}]))d=j.getNodeMainDom(k).id,g="clickNode"}else if(j.eqs(b.type,"dblclick")&&(l="dblclick",k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}])))d=j.getNodeMainDom(k).id,g="switchNode";if(l.length>0&&d.length==0&&
(k=j.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+e.id.A}])))d=j.getNodeMainDom(k).id;if(d.length>0)switch(f=h.getNodeCache(c,d),g){case "switchNode":f.isParent?j.eqs(b.type,"click")||j.eqs(b.type,"dblclick")&&j.apply(c.view.dblClickExpand,[c.treeId,f],c.view.dblClickExpand)?i=G:g="":g="";break;case "clickNode":i=H}switch(l){case "mousedown":n=I;break;case "mouseup":n=J;break;case "dblclick":n=K;break;case "contextmenu":n=L}return{stop:!1,node:f,nodeEventType:g,nodeEventCallback:i,treeEventType:l,
treeEventCallback:n}}],A=[function(b){var a=h.getRoot(b);a||(a={},h.setRoot(b,a));a[b.data.key.children]=[];a.expandTriggerFlag=!1;a.curSelectedList=[];a.noSelection=!0;a.createdNodes=[];a.zId=0;a._ver=(new Date).getTime()}],B=[],C=[],D=[],E=[],F=[],h={addNodeCache:function(b,a){h.getCache(b).nodes[h.getNodeCacheId(a.tId)]=a},getNodeCacheId:function(b){return b.substring(b.lastIndexOf("_")+1)},addAfterA:function(b){C.push(b)},addBeforeA:function(b){B.push(b)},addInnerAfterA:function(b){E.push(b)},
addInnerBeforeA:function(b){D.push(b)},addInitBind:function(b){w.push(b)},addInitUnBind:function(b){x.push(b)},addInitCache:function(b){y.push(b)},addInitNode:function(b){z.push(b)},addInitProxy:function(b,a){a?s.splice(0,0,b):s.push(b)},addInitRoot:function(b){A.push(b)},addNodesData:function(b,a,c){var d=b.data.key.children;a[d]||(a[d]=[]);if(a[d].length>0)a[d][a[d].length-1].isLastNode=!1,i.setNodeLineIcos(b,a[d][a[d].length-1]);a.isParent=!0;a[d]=a[d].concat(c)},addSelectedNode:function(b,a){var c=
h.getRoot(b);h.isSelectedNode(b,a)||c.curSelectedList.push(a)},addCreatedNode:function(b,a){(b.callback.onNodeCreated||b.view.addDiyDom)&&h.getRoot(b).createdNodes.push(a)},addZTreeTools:function(b){F.push(b)},exSetting:function(b){p.extend(!0,M,b)},fixPIdKeyValue:function(b,a){b.data.simpleData.enable&&(a[b.data.simpleData.pIdKey]=a.parentTId?a.getParentNode()[b.data.simpleData.idKey]:b.data.simpleData.rootPId)},getAfterA:function(b,a,c){for(var d=0,f=C.length;d<f;d++)C[d].apply(this,arguments)},
getBeforeA:function(b,a,c){for(var d=0,f=B.length;d<f;d++)B[d].apply(this,arguments)},getInnerAfterA:function(b,a,c){for(var d=0,f=E.length;d<f;d++)E[d].apply(this,arguments)},getInnerBeforeA:function(b,a,c){for(var d=0,f=D.length;d<f;d++)D[d].apply(this,arguments)},getCache:function(b){return v[b.treeId]},getNextNode:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?a.getParentNode():h.getRoot(b),f=0,g=d[c].length-1;f<=g;f++)if(d[c][f]===a)return f==g?null:d[c][f+1];return null},
getNodeByParam:function(b,a,c,d){if(!a||!c)return null;for(var f=b.data.key.children,g=0,l=a.length;g<l;g++){if(a[g][c]==d)return a[g];var e=h.getNodeByParam(b,a[g][f],c,d);if(e)return e}return null},getNodeCache:function(b,a){if(!a)return null;var c=v[b.treeId].nodes[h.getNodeCacheId(a)];return c?c:null},getNodeName:function(b,a){return""+a[b.data.key.name]},getNodeTitle:function(b,a){return""+a[b.data.key.title===""?b.data.key.name:b.data.key.title]},getNodes:function(b){return h.getRoot(b)[b.data.key.children]},
getNodesByParam:function(b,a,c,d){if(!a||!c)return[];for(var f=b.data.key.children,g=[],l=0,e=a.length;l<e;l++)a[l][c]==d&&g.push(a[l]),g=g.concat(h.getNodesByParam(b,a[l][f],c,d));return g},getNodesByParamFuzzy:function(b,a,c,d){if(!a||!c)return[];for(var f=b.data.key.children,g=[],d=d.toLowerCase(),l=0,e=a.length;l<e;l++)typeof a[l][c]=="string"&&a[l][c].toLowerCase().indexOf(d)>-1&&g.push(a[l]),g=g.concat(h.getNodesByParamFuzzy(b,a[l][f],c,d));return g},getNodesByFilter:function(b,a,c,d,f){if(!a)return d?
null:[];for(var g=b.data.key.children,e=d?null:[],i=0,n=a.length;i<n;i++){if(j.apply(c,[a[i],f],!1)){if(d)return a[i];e.push(a[i])}var k=h.getNodesByFilter(b,a[i][g],c,d,f);if(d&&k)return k;e=d?k:e.concat(k)}return e},getPreNode:function(b,a){if(!a)return null;for(var c=b.data.key.children,d=a.parentTId?a.getParentNode():h.getRoot(b),f=0,g=d[c].length;f<g;f++)if(d[c][f]===a)return f==0?null:d[c][f-1];return null},getRoot:function(b){return b?u[b.treeId]:null},getRoots:function(){return u},getSetting:function(b){return r[b]},
getSettings:function(){return r},getZTreeTools:function(b){return(b=this.getRoot(this.getSetting(b)))?b.treeTools:null},initCache:function(b){for(var a=0,c=y.length;a<c;a++)y[a].apply(this,arguments)},initNode:function(b,a,c,d,f,g){for(var e=0,h=z.length;e<h;e++)z[e].apply(this,arguments)},initRoot:function(b){for(var a=0,c=A.length;a<c;a++)A[a].apply(this,arguments)},isSelectedNode:function(b,a){for(var c=h.getRoot(b),d=0,f=c.curSelectedList.length;d<f;d++)if(a===c.curSelectedList[d])return!0;return!1},
removeNodeCache:function(b,a){var c=b.data.key.children;if(a[c])for(var d=0,f=a[c].length;d<f;d++)arguments.callee(b,a[c][d]);h.getCache(b).nodes[h.getNodeCacheId(a.tId)]=null},removeSelectedNode:function(b,a){for(var c=h.getRoot(b),d=0,f=c.curSelectedList.length;d<f;d++)if(a===c.curSelectedList[d]||!h.getNodeCache(b,c.curSelectedList[d].tId))c.curSelectedList.splice(d,1),d--,f--},setCache:function(b,a){v[b.treeId]=a},setRoot:function(b,a){u[b.treeId]=a},setZTreeTools:function(b,a){for(var c=0,d=
F.length;c<d;c++)F[c].apply(this,arguments)},transformToArrayFormat:function(b,a){if(!a)return[];var c=b.data.key.children,d=[];if(j.isArray(a))for(var f=0,g=a.length;f<g;f++)d.push(a[f]),a[f][c]&&(d=d.concat(h.transformToArrayFormat(b,a[f][c])));else d.push(a),a[c]&&(d=d.concat(h.transformToArrayFormat(b,a[c])));return d},transformTozTreeFormat:function(b,a){var c,d,f=b.data.simpleData.idKey,g=b.data.simpleData.pIdKey,e=b.data.key.children;if(!f||f==""||!a)return[];if(j.isArray(a)){var h=[],i=[];
for(c=0,d=a.length;c<d;c++)i[a[c][f]]=a[c];for(c=0,d=a.length;c<d;c++)i[a[c][g]]&&a[c][f]!=a[c][g]?(i[a[c][g]][e]||(i[a[c][g]][e]=[]),i[a[c][g]][e].push(a[c])):h.push(a[c]);return h}else return[a]}},m={bindEvent:function(b){for(var a=0,c=w.length;a<c;a++)w[a].apply(this,arguments)},unbindEvent:function(b){for(var a=0,c=x.length;a<c;a++)x[a].apply(this,arguments)},bindTree:function(b){var a={treeId:b.treeId},c=b.treeObj;b.view.txtSelectedEnable||c.bind("selectstart",function(a){a=a.originalEvent.srcElement.nodeName.toLowerCase();
return a==="input"||a==="textarea"}).css({"-moz-user-select":"-moz-none"});c.bind("click",a,m.proxy);c.bind("dblclick",a,m.proxy);c.bind("mouseover",a,m.proxy);c.bind("mouseout",a,m.proxy);c.bind("mousedown",a,m.proxy);c.bind("mouseup",a,m.proxy);c.bind("contextmenu",a,m.proxy)},unbindTree:function(b){b.treeObj.unbind("click",m.proxy).unbind("dblclick",m.proxy).unbind("mouseover",m.proxy).unbind("mouseout",m.proxy).unbind("mousedown",m.proxy).unbind("mouseup",m.proxy).unbind("contextmenu",m.proxy)},
doProxy:function(b){for(var a=[],c=0,d=s.length;c<d;c++){var f=s[c].apply(this,arguments);a.push(f);if(f.stop)break}return a},proxy:function(b){var a=h.getSetting(b.data.treeId);if(!j.uCanDo(a,b))return!0;for(var a=m.doProxy(b),c=!0,d=0,f=a.length;d<f;d++){var g=a[d];g.nodeEventCallback&&(c=g.nodeEventCallback.apply(g,[b,g.node])&&c);g.treeEventCallback&&(c=g.treeEventCallback.apply(g,[b,g.node])&&c)}return c}};G=function(b,a){var c=h.getSetting(b.data.treeId);if(a.open){if(j.apply(c.callback.beforeCollapse,
[c.treeId,a],!0)==!1)return!0}else if(j.apply(c.callback.beforeExpand,[c.treeId,a],!0)==!1)return!0;h.getRoot(c).expandTriggerFlag=!0;i.switchNode(c,a);return!0};H=function(b,a){var c=h.getSetting(b.data.treeId),d=c.view.autoCancelSelected&&(b.ctrlKey||b.metaKey)&&h.isSelectedNode(c,a)?0:c.view.autoCancelSelected&&(b.ctrlKey||b.metaKey)&&c.view.selectedMulti?2:1;if(j.apply(c.callback.beforeClick,[c.treeId,a,d],!0)==!1)return!0;d===0?i.cancelPreSelectedNode(c,a):i.selectNode(c,a,d===2);c.treeObj.trigger(e.event.CLICK,
[b,c.treeId,a,d]);return!0};I=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeMouseDown,[c.treeId,a],!0)&&j.apply(c.callback.onMouseDown,[b,c.treeId,a]);return!0};J=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeMouseUp,[c.treeId,a],!0)&&j.apply(c.callback.onMouseUp,[b,c.treeId,a]);return!0};K=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeDblClick,[c.treeId,a],!0)&&j.apply(c.callback.onDblClick,[b,c.treeId,a]);return!0};
L=function(b,a){var c=h.getSetting(b.data.treeId);j.apply(c.callback.beforeRightClick,[c.treeId,a],!0)&&j.apply(c.callback.onRightClick,[b,c.treeId,a]);return typeof c.callback.onRightClick!="function"};var j={apply:function(b,a,c){return typeof b=="function"?b.apply(N,a?a:[]):c},canAsync:function(b,a){var c=b.data.key.children;return b.async.enable&&a&&a.isParent&&!(a.zAsync||a[c]&&a[c].length>0)},clone:function(b){if(b===null)return null;var a=j.isArray(b)?[]:{},c;for(c in b)a[c]=b[c]instanceof
Date?new Date(b[c].getTime()):typeof b[c]==="object"?arguments.callee(b[c]):b[c];return a},eqs:function(b,a){return b.toLowerCase()===a.toLowerCase()},isArray:function(b){return Object.prototype.toString.apply(b)==="[object Array]"},$:function(b,a,c){a&&typeof a!="string"&&(c=a,a="");return typeof b=="string"?p(b,c?c.treeObj.get(0).ownerDocument:null):p("#"+b.tId+a,c?c.treeObj:null)},getMDom:function(b,a,c){if(!a)return null;for(;a&&a.id!==b.treeId;){for(var d=0,f=c.length;a.tagName&&d<f;d++)if(j.eqs(a.tagName,
c[d].tagName)&&a.getAttribute(c[d].attrName)!==null)return a;a=a.parentNode}return null},getNodeMainDom:function(b){return p(b).parent("li").get(0)||p(b).parentsUntil("li").parent().get(0)},isChildOrSelf:function(b,a){return p(b).closest("#"+a).length>0},uCanDo:function(){return!0}},i={addNodes:function(b,a,c,d){if(!b.data.keep.leaf||!a||a.isParent)if(j.isArray(c)||(c=[c]),b.data.simpleData.enable&&(c=h.transformTozTreeFormat(b,c)),a){var f=k(a,e.id.SWITCH,b),g=k(a,e.id.ICON,b),l=k(a,e.id.UL,b);if(!a.open)i.replaceSwitchClass(a,
f,e.folder.CLOSE),i.replaceIcoClass(a,g,e.folder.CLOSE),a.open=!1,l.css({display:"none"});h.addNodesData(b,a,c);i.createNodes(b,a.level+1,c,a);d||i.expandCollapseParentNode(b,a,!0)}else h.addNodesData(b,h.getRoot(b),c),i.createNodes(b,0,c,null)},appendNodes:function(b,a,c,d,f,g){if(!c)return[];for(var e=[],j=b.data.key.children,k=0,m=c.length;k<m;k++){var o=c[k];if(f){var t=(d?d:h.getRoot(b))[j].length==c.length&&k==0;h.initNode(b,a,o,d,t,k==c.length-1,g);h.addNodeCache(b,o)}t=[];o[j]&&o[j].length>
0&&(t=i.appendNodes(b,a+1,o[j],o,f,g&&o.open));g&&(i.makeDOMNodeMainBefore(e,b,o),i.makeDOMNodeLine(e,b,o),h.getBeforeA(b,o,e),i.makeDOMNodeNameBefore(e,b,o),h.getInnerBeforeA(b,o,e),i.makeDOMNodeIcon(e,b,o),h.getInnerAfterA(b,o,e),i.makeDOMNodeNameAfter(e,b,o),h.getAfterA(b,o,e),o.isParent&&o.open&&i.makeUlHtml(b,o,e,t.join("")),i.makeDOMNodeMainAfter(e,b,o),h.addCreatedNode(b,o))}return e},appendParentULDom:function(b,a){var c=[],d=k(a,b);!d.get(0)&&a.parentTId&&(i.appendParentULDom(b,a.getParentNode()),
d=k(a,b));var f=k(a,e.id.UL,b);f.get(0)&&f.remove();f=i.appendNodes(b,a.level+1,a[b.data.key.children],a,!1,!0);i.makeUlHtml(b,a,c,f.join(""));d.append(c.join(""))},asyncNode:function(b,a,c,d){var f,g;if(a&&!a.isParent)return j.apply(d),!1;else if(a&&a.isAjaxing)return!1;else if(j.apply(b.callback.beforeAsync,[b.treeId,a],!0)==!1)return j.apply(d),!1;if(a)a.isAjaxing=!0,k(a,e.id.ICON,b).attr({style:"","class":e.className.BUTTON+" "+e.className.ICO_LOADING});var l={};for(f=0,g=b.async.autoParam.length;a&&
f<g;f++){var q=b.async.autoParam[f].split("="),n=q;q.length>1&&(n=q[1],q=q[0]);l[n]=a[q]}if(j.isArray(b.async.otherParam))for(f=0,g=b.async.otherParam.length;f<g;f+=2)l[b.async.otherParam[f]]=b.async.otherParam[f+1];else for(var m in b.async.otherParam)l[m]=b.async.otherParam[m];var o=h.getRoot(b)._ver;p.ajax({contentType:b.async.contentType,type:b.async.type,url:j.apply(b.async.url,[b.treeId,a],b.async.url),data:l,dataType:b.async.dataType,success:function(f){if(o==h.getRoot(b)._ver){var g=[];try{g=
!f||f.length==0?[]:typeof f=="string"?eval("("+f+")"):f}catch(l){g=f}if(a)a.isAjaxing=null,a.zAsync=!0;i.setNodeLineIcos(b,a);g&&g!==""?(g=j.apply(b.async.dataFilter,[b.treeId,a,g],g),i.addNodes(b,a,g?j.clone(g):[],!!c)):i.addNodes(b,a,[],!!c);b.treeObj.trigger(e.event.ASYNC_SUCCESS,[b.treeId,a,f]);j.apply(d)}},error:function(c,d,f){if(o==h.getRoot(b)._ver){if(a)a.isAjaxing=null;i.setNodeLineIcos(b,a);b.treeObj.trigger(e.event.ASYNC_ERROR,[b.treeId,a,c,d,f])}}});return!0},cancelPreSelectedNode:function(b,
a){for(var c=h.getRoot(b).curSelectedList,d=c.length-1;d>=0;d--)if(!a||a===c[d])if(k(c[d],e.id.A,b).removeClass(e.node.CURSELECTED),a){h.removeSelectedNode(b,a);break}if(!a)h.getRoot(b).curSelectedList=[]},createNodeCallback:function(b){if(b.callback.onNodeCreated||b.view.addDiyDom)for(var a=h.getRoot(b);a.createdNodes.length>0;){var c=a.createdNodes.shift();j.apply(b.view.addDiyDom,[b.treeId,c]);b.callback.onNodeCreated&&b.treeObj.trigger(e.event.NODECREATED,[b.treeId,c])}},createNodes:function(b,
a,c,d){if(c&&c.length!=0){var f=h.getRoot(b),g=b.data.key.children,g=!d||d.open||!!k(d[g][0],b).get(0);f.createdNodes=[];a=i.appendNodes(b,a,c,d,!0,g);d?(d=k(d,e.id.UL,b),d.get(0)&&d.append(a.join(""))):b.treeObj.append(a.join(""));i.createNodeCallback(b)}},destroy:function(b){b&&(h.initCache(b),h.initRoot(b),m.unbindTree(b),m.unbindEvent(b),b.treeObj.empty(),delete r[b.treeId])},expandCollapseNode:function(b,a,c,d,f){var g=h.getRoot(b),l=b.data.key.children;if(a){if(g.expandTriggerFlag){var q=f,
f=function(){q&&q();a.open?b.treeObj.trigger(e.event.EXPAND,[b.treeId,a]):b.treeObj.trigger(e.event.COLLAPSE,[b.treeId,a])};g.expandTriggerFlag=!1}if(!a.open&&a.isParent&&(!k(a,e.id.UL,b).get(0)||a[l]&&a[l].length>0&&!k(a[l][0],b).get(0)))i.appendParentULDom(b,a),i.createNodeCallback(b);if(a.open==c)j.apply(f,[]);else{var c=k(a,e.id.UL,b),g=k(a,e.id.SWITCH,b),n=k(a,e.id.ICON,b);a.isParent?(a.open=!a.open,a.iconOpen&&a.iconClose&&n.attr("style",i.makeNodeIcoStyle(b,a)),a.open?(i.replaceSwitchClass(a,
g,e.folder.OPEN),i.replaceIcoClass(a,n,e.folder.OPEN),d==!1||b.view.expandSpeed==""?(c.show(),j.apply(f,[])):a[l]&&a[l].length>0?c.slideDown(b.view.expandSpeed,f):(c.show(),j.apply(f,[]))):(i.replaceSwitchClass(a,g,e.folder.CLOSE),i.replaceIcoClass(a,n,e.folder.CLOSE),d==!1||b.view.expandSpeed==""||!(a[l]&&a[l].length>0)?(c.hide(),j.apply(f,[])):c.slideUp(b.view.expandSpeed,f))):j.apply(f,[])}}else j.apply(f,[])},expandCollapseParentNode:function(b,a,c,d,f){a&&(a.parentTId?(i.expandCollapseNode(b,
a,c,d),a.parentTId&&i.expandCollapseParentNode(b,a.getParentNode(),c,d,f)):i.expandCollapseNode(b,a,c,d,f))},expandCollapseSonNode:function(b,a,c,d,f){var g=h.getRoot(b),e=b.data.key.children,g=a?a[e]:g[e],e=a?!1:d,j=h.getRoot(b).expandTriggerFlag;h.getRoot(b).expandTriggerFlag=!1;if(g)for(var k=0,m=g.length;k<m;k++)g[k]&&i.expandCollapseSonNode(b,g[k],c,e);h.getRoot(b).expandTriggerFlag=j;i.expandCollapseNode(b,a,c,d,f)},makeDOMNodeIcon:function(b,a,c){var d=h.getNodeName(a,c),d=a.view.nameIsHTML?
d:d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");b.push("<span id='",c.tId,e.id.ICON,"' title='' treeNode",e.id.ICON," class='",i.makeNodeIcoClass(a,c),"' style='",i.makeNodeIcoStyle(a,c),"'></span><span id='",c.tId,e.id.SPAN,"'>",d,"</span>")},makeDOMNodeLine:function(b,a,c){b.push("<span id='",c.tId,e.id.SWITCH,"' title='' class='",i.makeNodeLineClass(a,c),"' treeNode",e.id.SWITCH,"></span>")},makeDOMNodeMainAfter:function(b){b.push("</li>")},makeDOMNodeMainBefore:function(b,
a,c){b.push("<li id='",c.tId,"' class='",e.className.LEVEL,c.level,"' tabindex='0' hidefocus='true' treenode>")},makeDOMNodeNameAfter:function(b){b.push("</a>")},makeDOMNodeNameBefore:function(b,a,c){var d=h.getNodeTitle(a,c),f=i.makeNodeUrl(a,c),g=i.makeNodeFontCss(a,c),l=[],k;for(k in g)l.push(k,":",g[k],";");b.push("<a id='",c.tId,e.id.A,"' class='",e.className.LEVEL,c.level,"' treeNode",e.id.A,' onclick="',c.click||"",'" ',f!=null&&f.length>0?"href='"+f+"'":""," target='",i.makeNodeTarget(c),
"' style='",l.join(""),"'");j.apply(a.view.showTitle,[a.treeId,c],a.view.showTitle)&&d&&b.push("title='",d.replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"'");b.push(">")},makeNodeFontCss:function(b,a){var c=j.apply(b.view.fontCss,[b.treeId,a],b.view.fontCss);return c&&typeof c!="function"?c:{}},makeNodeIcoClass:function(b,a){var c=["ico"];a.isAjaxing||(c[0]=(a.iconSkin?a.iconSkin+"_":"")+c[0],a.isParent?c.push(a.open?e.folder.OPEN:e.folder.CLOSE):c.push(e.folder.DOCU));return e.className.BUTTON+
" "+c.join("_")},makeNodeIcoStyle:function(b,a){var c=[];if(!a.isAjaxing){var d=a.isParent&&a.iconOpen&&a.iconClose?a.open?a.iconOpen:a.iconClose:a.icon;d&&c.push("background:url(",d,") 0 0 no-repeat;");(b.view.showIcon==!1||!j.apply(b.view.showIcon,[b.treeId,a],!0))&&c.push("width:0px;height:0px;")}return c.join("")},makeNodeLineClass:function(b,a){var c=[];b.view.showLine?a.level==0&&a.isFirstNode&&a.isLastNode?c.push(e.line.ROOT):a.level==0&&a.isFirstNode?c.push(e.line.ROOTS):a.isLastNode?c.push(e.line.BOTTOM):
c.push(e.line.CENTER):c.push(e.line.NOLINE);a.isParent?c.push(a.open?e.folder.OPEN:e.folder.CLOSE):c.push(e.folder.DOCU);return i.makeNodeLineClassEx(a)+c.join("_")},makeNodeLineClassEx:function(b){return e.className.BUTTON+" "+e.className.LEVEL+b.level+" "+e.className.SWITCH+" "},makeNodeTarget:function(b){return b.target||"_blank"},makeNodeUrl:function(b,a){var c=b.data.key.url;return a[c]?a[c]:null},makeUlHtml:function(b,a,c,d){c.push("<ul id='",a.tId,e.id.UL,"' class='",e.className.LEVEL,a.level,
" ",i.makeUlLineClass(b,a),"' style='display:",a.open?"block":"none","'>");c.push(d);c.push("</ul>")},makeUlLineClass:function(b,a){return b.view.showLine&&!a.isLastNode?e.line.LINE:""},removeChildNodes:function(b,a){if(a){var c=b.data.key.children,d=a[c];if(d){for(var f=0,g=d.length;f<g;f++)h.removeNodeCache(b,d[f]);h.removeSelectedNode(b);delete a[c];b.data.keep.parent?k(a,e.id.UL,b).empty():(a.isParent=!1,a.open=!1,c=k(a,e.id.SWITCH,b),d=k(a,e.id.ICON,b),i.replaceSwitchClass(a,c,e.folder.DOCU),
i.replaceIcoClass(a,d,e.folder.DOCU),k(a,e.id.UL,b).remove())}}},setFirstNode:function(b,a){var c=b.data.key.children;if(a[c].length>0)a[c][0].isFirstNode=!0},setLastNode:function(b,a){var c=b.data.key.children,d=a[c].length;if(d>0)a[c][d-1].isLastNode=!0},removeNode:function(b,a){var c=h.getRoot(b),d=b.data.key.children,f=a.parentTId?a.getParentNode():c;a.isFirstNode=!1;a.isLastNode=!1;a.getPreNode=function(){return null};a.getNextNode=function(){return null};if(h.getNodeCache(b,a.tId)){k(a,b).remove();
h.removeNodeCache(b,a);h.removeSelectedNode(b,a);for(var g=0,l=f[d].length;g<l;g++)if(f[d][g].tId==a.tId){f[d].splice(g,1);break}i.setFirstNode(b,f);i.setLastNode(b,f);var j,g=f[d].length;if(!b.data.keep.parent&&g==0)f.isParent=!1,f.open=!1,g=k(f,e.id.UL,b),l=k(f,e.id.SWITCH,b),j=k(f,e.id.ICON,b),i.replaceSwitchClass(f,l,e.folder.DOCU),i.replaceIcoClass(f,j,e.folder.DOCU),g.css("display","none");else if(b.view.showLine&&g>0){var n=f[d][g-1],g=k(n,e.id.UL,b),l=k(n,e.id.SWITCH,b);j=k(n,e.id.ICON,b);
f==c?f[d].length==1?i.replaceSwitchClass(n,l,e.line.ROOT):(c=k(f[d][0],e.id.SWITCH,b),i.replaceSwitchClass(f[d][0],c,e.line.ROOTS),i.replaceSwitchClass(n,l,e.line.BOTTOM)):i.replaceSwitchClass(n,l,e.line.BOTTOM);g.removeClass(e.line.LINE)}}},replaceIcoClass:function(b,a,c){if(a&&!b.isAjaxing&&(b=a.attr("class"),b!=void 0)){b=b.split("_");switch(c){case e.folder.OPEN:case e.folder.CLOSE:case e.folder.DOCU:b[b.length-1]=c}a.attr("class",b.join("_"))}},replaceSwitchClass:function(b,a,c){if(a){var d=
a.attr("class");if(d!=void 0){d=d.split("_");switch(c){case e.line.ROOT:case e.line.ROOTS:case e.line.CENTER:case e.line.BOTTOM:case e.line.NOLINE:d[0]=i.makeNodeLineClassEx(b)+c;break;case e.folder.OPEN:case e.folder.CLOSE:case e.folder.DOCU:d[1]=c}a.attr("class",d.join("_"));c!==e.folder.DOCU?a.removeAttr("disabled"):a.attr("disabled","disabled")}}},selectNode:function(b,a,c){c||i.cancelPreSelectedNode(b);k(a,e.id.A,b).addClass(e.node.CURSELECTED);h.addSelectedNode(b,a)},setNodeFontCss:function(b,
a){var c=k(a,e.id.A,b),d=i.makeNodeFontCss(b,a);d&&c.css(d)},setNodeLineIcos:function(b,a){if(a){var c=k(a,e.id.SWITCH,b),d=k(a,e.id.UL,b),f=k(a,e.id.ICON,b),g=i.makeUlLineClass(b,a);g.length==0?d.removeClass(e.line.LINE):d.addClass(g);c.attr("class",i.makeNodeLineClass(b,a));a.isParent?c.removeAttr("disabled"):c.attr("disabled","disabled");f.removeAttr("style");f.attr("style",i.makeNodeIcoStyle(b,a));f.attr("class",i.makeNodeIcoClass(b,a))}},setNodeName:function(b,a){var c=h.getNodeTitle(b,a),d=
k(a,e.id.SPAN,b);d.empty();b.view.nameIsHTML?d.html(h.getNodeName(b,a)):d.text(h.getNodeName(b,a));j.apply(b.view.showTitle,[b.treeId,a],b.view.showTitle)&&k(a,e.id.A,b).attr("title",!c?"":c)},setNodeTarget:function(b,a){k(a,e.id.A,b).attr("target",i.makeNodeTarget(a))},setNodeUrl:function(b,a){var c=k(a,e.id.A,b),d=i.makeNodeUrl(b,a);d==null||d.length==0?c.removeAttr("href"):c.attr("href",d)},switchNode:function(b,a){a.open||!j.canAsync(b,a)?i.expandCollapseNode(b,a,!a.open):b.async.enable?i.asyncNode(b,
a)||i.expandCollapseNode(b,a,!a.open):a&&i.expandCollapseNode(b,a,!a.open)}};p.fn.zTree={consts:{className:{BUTTON:"button",LEVEL:"level",ICO_LOADING:"ico_loading",SWITCH:"switch"},event:{NODECREATED:"ztree_nodeCreated",CLICK:"ztree_click",EXPAND:"ztree_expand",COLLAPSE:"ztree_collapse",ASYNC_SUCCESS:"ztree_async_success",ASYNC_ERROR:"ztree_async_error",REMOVE:"ztree_remove"},id:{A:"_a",ICON:"_ico",SPAN:"_span",SWITCH:"_switch",UL:"_ul"},line:{ROOT:"root",ROOTS:"roots",CENTER:"center",BOTTOM:"bottom",
NOLINE:"noline",LINE:"line"},folder:{OPEN:"open",CLOSE:"close",DOCU:"docu"},node:{CURSELECTED:"curSelectedNode"}},_z:{tools:j,view:i,event:m,data:h},getZTreeObj:function(b){return(b=h.getZTreeTools(b))?b:null},destroy:function(b){if(b&&b.length>0)i.destroy(h.getSetting(b));else for(var a in r)i.destroy(r[a])},init:function(b,a,c){var d=j.clone(M);p.extend(!0,d,a);d.treeId=b.attr("id");d.treeObj=b;d.treeObj.empty();r[d.treeId]=d;if(typeof document.body.style.maxHeight==="undefined")d.view.expandSpeed=
"";h.initRoot(d);b=h.getRoot(d);a=d.data.key.children;c=c?j.clone(j.isArray(c)?c:[c]):[];b[a]=d.data.simpleData.enable?h.transformTozTreeFormat(d,c):c;h.initCache(d);m.unbindTree(d);m.bindTree(d);m.unbindEvent(d);m.bindEvent(d);c={setting:d,addNodes:function(a,b,c){function e(){i.addNodes(d,a,h,c==!0)}if(!b)return null;a||(a=null);if(a&&!a.isParent&&d.data.keep.leaf)return null;var h=j.clone(j.isArray(b)?b:[b]);j.canAsync(d,a)?i.asyncNode(d,a,c,e):e();return h},cancelSelectedNode:function(a){i.cancelPreSelectedNode(d,
a)},destroy:function(){i.destroy(d)},expandAll:function(a){a=!!a;i.expandCollapseSonNode(d,null,a,!0);return a},expandNode:function(a,b,c,e,n){if(!a||!a.isParent)return null;b!==!0&&b!==!1&&(b=!a.open);if((n=!!n)&&b&&j.apply(d.callback.beforeExpand,[d.treeId,a],!0)==!1)return null;else if(n&&!b&&j.apply(d.callback.beforeCollapse,[d.treeId,a],!0)==!1)return null;b&&a.parentTId&&i.expandCollapseParentNode(d,a.getParentNode(),b,!1);if(b===a.open&&!c)return null;h.getRoot(d).expandTriggerFlag=n;if(!j.canAsync(d,
a)&&c)i.expandCollapseSonNode(d,a,b,!0,function(){if(e!==!1)try{k(a,d).focus().blur()}catch(b){}});else if(a.open=!b,i.switchNode(this.setting,a),e!==!1)try{k(a,d).focus().blur()}catch(m){}return b},getNodes:function(){return h.getNodes(d)},getNodeByParam:function(a,b,c){return!a?null:h.getNodeByParam(d,c?c[d.data.key.children]:h.getNodes(d),a,b)},getNodeByTId:function(a){return h.getNodeCache(d,a)},getNodesByParam:function(a,b,c){return!a?null:h.getNodesByParam(d,c?c[d.data.key.children]:h.getNodes(d),
a,b)},getNodesByParamFuzzy:function(a,b,c){return!a?null:h.getNodesByParamFuzzy(d,c?c[d.data.key.children]:h.getNodes(d),a,b)},getNodesByFilter:function(a,b,c,e){b=!!b;return!a||typeof a!="function"?b?null:[]:h.getNodesByFilter(d,c?c[d.data.key.children]:h.getNodes(d),a,b,e)},getNodeIndex:function(a){if(!a)return null;for(var b=d.data.key.children,c=a.parentTId?a.getParentNode():h.getRoot(d),e=0,i=c[b].length;e<i;e++)if(c[b][e]==a)return e;return-1},getSelectedNodes:function(){for(var a=[],b=h.getRoot(d).curSelectedList,
c=0,e=b.length;c<e;c++)a.push(b[c]);return a},isSelectedNode:function(a){return h.isSelectedNode(d,a)},reAsyncChildNodes:function(a,b,c){if(this.setting.async.enable){var j=!a;j&&(a=h.getRoot(d));if(b=="refresh"){for(var b=this.setting.data.key.children,m=0,p=a[b]?a[b].length:0;m<p;m++)h.removeNodeCache(d,a[b][m]);h.removeSelectedNode(d);a[b]=[];j?this.setting.treeObj.empty():k(a,e.id.UL,d).empty()}i.asyncNode(this.setting,j?null:a,!!c)}},refresh:function(){this.setting.treeObj.empty();var a=h.getRoot(d),
b=a[d.data.key.children];h.initRoot(d);a[d.data.key.children]=b;h.initCache(d);i.createNodes(d,0,a[d.data.key.children])},removeChildNodes:function(a){if(!a)return null;var b=a[d.data.key.children];i.removeChildNodes(d,a);return b?b:null},removeNode:function(a,b){a&&(b=!!b,b&&j.apply(d.callback.beforeRemove,[d.treeId,a],!0)==!1||(i.removeNode(d,a),b&&this.setting.treeObj.trigger(e.event.REMOVE,[d.treeId,a])))},selectNode:function(a,b){if(a&&j.uCanDo(d)){b=d.view.selectedMulti&&b;if(a.parentTId)i.expandCollapseParentNode(d,
a.getParentNode(),!0,!1,function(){try{k(a,d).focus().blur()}catch(b){}});else try{k(a,d).focus().blur()}catch(c){}i.selectNode(d,a,b)}},transformTozTreeNodes:function(a){return h.transformTozTreeFormat(d,a)},transformToArray:function(a){return h.transformToArrayFormat(d,a)},updateNode:function(a){a&&k(a,d).get(0)&&j.uCanDo(d)&&(i.setNodeName(d,a),i.setNodeTarget(d,a),i.setNodeUrl(d,a),i.setNodeLineIcos(d,a),i.setNodeFontCss(d,a))}};b.treeTools=c;h.setZTreeTools(d,c);b[a]&&b[a].length>0?i.createNodes(d,
0,b[a]):d.async.enable&&d.async.url&&d.async.url!==""&&i.asyncNode(d);return c}};var N=p.fn.zTree,k=j.$,e=N.consts})(jQuery);
/*
 * JQuery zTree excheck v3.5.16-beta.1
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-03-28
 */
(function(m){var p,q,r,o={event:{CHECK:"ztree_check"},id:{CHECK:"_check"},checkbox:{STYLE:"checkbox",DEFAULT:"chk",DISABLED:"disable",FALSE:"false",TRUE:"true",FULL:"full",PART:"part",FOCUS:"focus"},radio:{STYLE:"radio",TYPE_ALL:"all",TYPE_LEVEL:"level"}},v={check:{enable:!1,autoCheckTrigger:!1,chkStyle:o.checkbox.STYLE,nocheckInherit:!1,chkDisabledInherit:!1,radioType:o.radio.TYPE_LEVEL,chkboxType:{Y:"ps",N:"ps"}},data:{key:{checked:"checked"}},callback:{beforeCheck:null,onCheck:null}};p=function(c,
a){if(a.chkDisabled===!0)return!1;var b=f.getSetting(c.data.treeId),d=b.data.key.checked;if(k.apply(b.callback.beforeCheck,[b.treeId,a],!0)==!1)return!0;a[d]=!a[d];e.checkNodeRelation(b,a);d=n(a,j.id.CHECK,b);e.setChkClass(b,d,a);e.repairParentChkClassWithSelf(b,a);b.treeObj.trigger(j.event.CHECK,[c,b.treeId,a]);return!0};q=function(c,a){if(a.chkDisabled===!0)return!1;var b=f.getSetting(c.data.treeId),d=n(a,j.id.CHECK,b);a.check_Focus=!0;e.setChkClass(b,d,a);return!0};r=function(c,a){if(a.chkDisabled===
!0)return!1;var b=f.getSetting(c.data.treeId),d=n(a,j.id.CHECK,b);a.check_Focus=!1;e.setChkClass(b,d,a);return!0};m.extend(!0,m.fn.zTree.consts,o);m.extend(!0,m.fn.zTree._z,{tools:{},view:{checkNodeRelation:function(c,a){var b,d,h,i=c.data.key.children,l=c.data.key.checked;b=j.radio;if(c.check.chkStyle==b.STYLE){var g=f.getRadioCheckedList(c);if(a[l])if(c.check.radioType==b.TYPE_ALL){for(d=g.length-1;d>=0;d--)b=g[d],b[l]&&b!=a&&(b[l]=!1,g.splice(d,1),e.setChkClass(c,n(b,j.id.CHECK,c),b),b.parentTId!=
a.parentTId&&e.repairParentChkClassWithSelf(c,b));g.push(a)}else{g=a.parentTId?a.getParentNode():f.getRoot(c);for(d=0,h=g[i].length;d<h;d++)b=g[i][d],b[l]&&b!=a&&(b[l]=!1,e.setChkClass(c,n(b,j.id.CHECK,c),b))}else if(c.check.radioType==b.TYPE_ALL)for(d=0,h=g.length;d<h;d++)if(a==g[d]){g.splice(d,1);break}}else a[l]&&(!a[i]||a[i].length==0||c.check.chkboxType.Y.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,a,!0),!a[l]&&(!a[i]||a[i].length==0||c.check.chkboxType.N.indexOf("s")>-1)&&e.setSonNodeCheckBox(c,
a,!1),a[l]&&c.check.chkboxType.Y.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!0),!a[l]&&c.check.chkboxType.N.indexOf("p")>-1&&e.setParentNodeCheckBox(c,a,!1)},makeChkClass:function(c,a){var b=c.data.key.checked,d=j.checkbox,h=j.radio,i="",i=a.chkDisabled===!0?d.DISABLED:a.halfCheck?d.PART:c.check.chkStyle==h.STYLE?a.check_Child_State<1?d.FULL:d.PART:a[b]?a.check_Child_State===2||a.check_Child_State===-1?d.FULL:d.PART:a.check_Child_State<1?d.FULL:d.PART,b=c.check.chkStyle+"_"+(a[b]?d.TRUE:d.FALSE)+
"_"+i,b=a.check_Focus&&a.chkDisabled!==!0?b+"_"+d.FOCUS:b;return j.className.BUTTON+" "+d.DEFAULT+" "+b},repairAllChk:function(c,a){if(c.check.enable&&c.check.chkStyle===j.checkbox.STYLE)for(var b=c.data.key.checked,d=c.data.key.children,h=f.getRoot(c),i=0,l=h[d].length;i<l;i++){var g=h[d][i];g.nocheck!==!0&&g.chkDisabled!==!0&&(g[b]=a);e.setSonNodeCheckBox(c,g,a)}},repairChkClass:function(c,a){if(a&&(f.makeChkFlag(c,a),a.nocheck!==!0)){var b=n(a,j.id.CHECK,c);e.setChkClass(c,b,a)}},repairParentChkClass:function(c,
a){if(a&&a.parentTId){var b=a.getParentNode();e.repairChkClass(c,b);e.repairParentChkClass(c,b)}},repairParentChkClassWithSelf:function(c,a){if(a){var b=c.data.key.children;a[b]&&a[b].length>0?e.repairParentChkClass(c,a[b][0]):e.repairParentChkClass(c,a)}},repairSonChkDisabled:function(c,a,b,d){if(a){var h=c.data.key.children;if(a.chkDisabled!=b)a.chkDisabled=b;e.repairChkClass(c,a);if(a[h]&&d)for(var i=0,l=a[h].length;i<l;i++)e.repairSonChkDisabled(c,a[h][i],b,d)}},repairParentChkDisabled:function(c,
a,b,d){if(a){if(a.chkDisabled!=b&&d)a.chkDisabled=b;e.repairChkClass(c,a);e.repairParentChkDisabled(c,a.getParentNode(),b,d)}},setChkClass:function(c,a,b){a&&(b.nocheck===!0?a.hide():a.show(),a.attr("class",e.makeChkClass(c,b)))},setParentNodeCheckBox:function(c,a,b,d){var h=c.data.key.children,i=c.data.key.checked,l=n(a,j.id.CHECK,c);d||(d=a);f.makeChkFlag(c,a);a.nocheck!==!0&&a.chkDisabled!==!0&&(a[i]=b,e.setChkClass(c,l,a),c.check.autoCheckTrigger&&a!=d&&c.treeObj.trigger(j.event.CHECK,[null,c.treeId,
a]));if(a.parentTId){l=!0;if(!b)for(var h=a.getParentNode()[h],g=0,k=h.length;g<k;g++)if(h[g].nocheck!==!0&&h[g].chkDisabled!==!0&&h[g][i]||(h[g].nocheck===!0||h[g].chkDisabled===!0)&&h[g].check_Child_State>0){l=!1;break}l&&e.setParentNodeCheckBox(c,a.getParentNode(),b,d)}},setSonNodeCheckBox:function(c,a,b,d){if(a){var h=c.data.key.children,i=c.data.key.checked,l=n(a,j.id.CHECK,c);d||(d=a);var g=!1;if(a[h])for(var k=0,m=a[h].length;k<m&&a.chkDisabled!==!0;k++){var o=a[h][k];e.setSonNodeCheckBox(c,
o,b,d);o.chkDisabled===!0&&(g=!0)}if(a!=f.getRoot(c)&&a.chkDisabled!==!0){g&&a.nocheck!==!0&&f.makeChkFlag(c,a);if(a.nocheck!==!0&&a.chkDisabled!==!0){if(a[i]=b,!g)a.check_Child_State=a[h]&&a[h].length>0?b?2:0:-1}else a.check_Child_State=-1;e.setChkClass(c,l,a);c.check.autoCheckTrigger&&a!=d&&a.nocheck!==!0&&a.chkDisabled!==!0&&c.treeObj.trigger(j.event.CHECK,[null,c.treeId,a])}}}},event:{},data:{getRadioCheckedList:function(c){for(var a=f.getRoot(c).radioCheckedList,b=0,d=a.length;b<d;b++)f.getNodeCache(c,
a[b].tId)||(a.splice(b,1),b--,d--);return a},getCheckStatus:function(c,a){if(!c.check.enable||a.nocheck||a.chkDisabled)return null;var b=c.data.key.checked;return{checked:a[b],half:a.halfCheck?a.halfCheck:c.check.chkStyle==j.radio.STYLE?a.check_Child_State===2:a[b]?a.check_Child_State>-1&&a.check_Child_State<2:a.check_Child_State>0}},getTreeCheckedNodes:function(c,a,b,d){if(!a)return[];for(var h=c.data.key.children,i=c.data.key.checked,e=b&&c.check.chkStyle==j.radio.STYLE&&c.check.radioType==j.radio.TYPE_ALL,
d=!d?[]:d,g=0,k=a.length;g<k;g++){if(a[g].nocheck!==!0&&a[g].chkDisabled!==!0&&a[g][i]==b&&(d.push(a[g]),e))break;f.getTreeCheckedNodes(c,a[g][h],b,d);if(e&&d.length>0)break}return d},getTreeChangeCheckedNodes:function(c,a,b){if(!a)return[];for(var d=c.data.key.children,h=c.data.key.checked,b=!b?[]:b,i=0,e=a.length;i<e;i++)a[i].nocheck!==!0&&a[i].chkDisabled!==!0&&a[i][h]!=a[i].checkedOld&&b.push(a[i]),f.getTreeChangeCheckedNodes(c,a[i][d],b);return b},makeChkFlag:function(c,a){if(a){var b=c.data.key.children,
d=c.data.key.checked,h=-1;if(a[b])for(var i=0,e=a[b].length;i<e;i++){var g=a[b][i],f=-1;if(c.check.chkStyle==j.radio.STYLE)if(f=g.nocheck===!0||g.chkDisabled===!0?g.check_Child_State:g.halfCheck===!0?2:g[d]?2:g.check_Child_State>0?2:0,f==2){h=2;break}else f==0&&(h=0);else if(c.check.chkStyle==j.checkbox.STYLE)if(f=g.nocheck===!0||g.chkDisabled===!0?g.check_Child_State:g.halfCheck===!0?1:g[d]?g.check_Child_State===-1||g.check_Child_State===2?2:1:g.check_Child_State>0?1:0,f===1){h=1;break}else if(f===
2&&h>-1&&i>0&&f!==h){h=1;break}else if(h===2&&f>-1&&f<2){h=1;break}else f>-1&&(h=f)}a.check_Child_State=h}}}});var m=m.fn.zTree,k=m._z.tools,j=m.consts,e=m._z.view,f=m._z.data,n=k.$;f.exSetting(v);f.addInitBind(function(c){c.treeObj.bind(j.event.CHECK,function(a,b,d,h){a.srcEvent=b;k.apply(c.callback.onCheck,[a,d,h])})});f.addInitUnBind(function(c){c.treeObj.unbind(j.event.CHECK)});f.addInitCache(function(){});f.addInitNode(function(c,a,b,d){if(b){a=c.data.key.checked;typeof b[a]=="string"&&(b[a]=
k.eqs(b[a],"true"));b[a]=!!b[a];b.checkedOld=b[a];if(typeof b.nocheck=="string")b.nocheck=k.eqs(b.nocheck,"true");b.nocheck=!!b.nocheck||c.check.nocheckInherit&&d&&!!d.nocheck;if(typeof b.chkDisabled=="string")b.chkDisabled=k.eqs(b.chkDisabled,"true");b.chkDisabled=!!b.chkDisabled||c.check.chkDisabledInherit&&d&&!!d.chkDisabled;if(typeof b.halfCheck=="string")b.halfCheck=k.eqs(b.halfCheck,"true");b.halfCheck=!!b.halfCheck;b.check_Child_State=-1;b.check_Focus=!1;b.getCheckStatus=function(){return f.getCheckStatus(c,
b)};c.check.chkStyle==j.radio.STYLE&&c.check.radioType==j.radio.TYPE_ALL&&b[a]&&f.getRoot(c).radioCheckedList.push(b)}});f.addInitProxy(function(c){var a=c.target,b=f.getSetting(c.data.treeId),d="",h=null,e="",l=null;if(k.eqs(c.type,"mouseover")){if(b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=k.getNodeMainDom(a).id,e="mouseoverCheck"}else if(k.eqs(c.type,"mouseout")){if(b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=
k.getNodeMainDom(a).id,e="mouseoutCheck"}else if(k.eqs(c.type,"click")&&b.check.enable&&k.eqs(a.tagName,"span")&&a.getAttribute("treeNode"+j.id.CHECK)!==null)d=k.getNodeMainDom(a).id,e="checkNode";if(d.length>0)switch(h=f.getNodeCache(b,d),e){case "checkNode":l=p;break;case "mouseoverCheck":l=q;break;case "mouseoutCheck":l=r}return{stop:e==="checkNode",node:h,nodeEventType:e,nodeEventCallback:l,treeEventType:"",treeEventCallback:null}},!0);f.addInitRoot(function(c){f.getRoot(c).radioCheckedList=[]});
f.addBeforeA(function(c,a,b){c.check.enable&&(f.makeChkFlag(c,a),b.push("<span ID='",a.tId,j.id.CHECK,"' class='",e.makeChkClass(c,a),"' treeNode",j.id.CHECK,a.nocheck===!0?" style='display:none;'":"","></span>"))});f.addZTreeTools(function(c,a){a.checkNode=function(a,b,c,f){var g=this.setting.data.key.checked;if(a.chkDisabled!==!0&&(b!==!0&&b!==!1&&(b=!a[g]),f=!!f,(a[g]!==b||c)&&!(f&&k.apply(this.setting.callback.beforeCheck,[this.setting.treeId,a],!0)==!1)&&k.uCanDo(this.setting)&&this.setting.check.enable&&
a.nocheck!==!0))a[g]=b,b=n(a,j.id.CHECK,this.setting),(c||this.setting.check.chkStyle===j.radio.STYLE)&&e.checkNodeRelation(this.setting,a),e.setChkClass(this.setting,b,a),e.repairParentChkClassWithSelf(this.setting,a),f&&this.setting.treeObj.trigger(j.event.CHECK,[null,this.setting.treeId,a])};a.checkAllNodes=function(a){e.repairAllChk(this.setting,!!a)};a.getCheckedNodes=function(a){var b=this.setting.data.key.children;return f.getTreeCheckedNodes(this.setting,f.getRoot(this.setting)[b],a!==!1)};
a.getChangeCheckedNodes=function(){var a=this.setting.data.key.children;return f.getTreeChangeCheckedNodes(this.setting,f.getRoot(this.setting)[a])};a.setChkDisabled=function(a,b,c,f){b=!!b;c=!!c;e.repairSonChkDisabled(this.setting,a,b,!!f);e.repairParentChkDisabled(this.setting,a.getParentNode(),b,c)};var b=a.updateNode;a.updateNode=function(c,f){b&&b.apply(a,arguments);if(c&&this.setting.check.enable&&n(c,this.setting).get(0)&&k.uCanDo(this.setting)){var i=n(c,j.id.CHECK,this.setting);(f==!0||this.setting.check.chkStyle===
j.radio.STYLE)&&e.checkNodeRelation(this.setting,c);e.setChkClass(this.setting,i,c);e.repairParentChkClassWithSelf(this.setting,c)}}});var s=e.createNodes;e.createNodes=function(c,a,b,d){s&&s.apply(e,arguments);b&&e.repairParentChkClassWithSelf(c,d)};var t=e.removeNode;e.removeNode=function(c,a){var b=a.getParentNode();t&&t.apply(e,arguments);a&&b&&(e.repairChkClass(c,b),e.repairParentChkClass(c,b))};var u=e.appendNodes;e.appendNodes=function(c,a,b,d,h,i){var j="";u&&(j=u.apply(e,arguments));d&&f.makeChkFlag(c,
d);return j}})(jQuery);
/*
 * JQuery zTree exedit v3.5.16-beta.1
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-03-28
 */
(function(w){var I={event:{DRAG:"ztree_drag",DROP:"ztree_drop",RENAME:"ztree_rename",DRAGMOVE:"ztree_dragmove"},id:{EDIT:"_edit",INPUT:"_input",REMOVE:"_remove"},move:{TYPE_INNER:"inner",TYPE_PREV:"prev",TYPE_NEXT:"next"},node:{CURSELECTED_EDIT:"curSelectedNode_Edit",TMPTARGET_TREE:"tmpTargetzTree",TMPTARGET_NODE:"tmpTargetNode"}},x={onHoverOverNode:function(b,a){var c=m.getSetting(b.data.treeId),d=m.getRoot(c);if(d.curHoverNode!=a)x.onHoverOutNode(b);d.curHoverNode=a;f.addHoverDom(c,a)},onHoverOutNode:function(b){var b=
m.getSetting(b.data.treeId),a=m.getRoot(b);if(a.curHoverNode&&!m.isSelectedNode(b,a.curHoverNode))f.removeTreeDom(b,a.curHoverNode),a.curHoverNode=null},onMousedownNode:function(b,a){function c(b){if(C.dragFlag==0&&Math.abs(N-b.clientX)<e.edit.drag.minMoveSize&&Math.abs(O-b.clientY)<e.edit.drag.minMoveSize)return!0;var a,c,n,k,i;i=e.data.key.children;M.css("cursor","pointer");if(C.dragFlag==0){if(g.apply(e.callback.beforeDrag,[e.treeId,l],!0)==!1)return r(b),!0;for(a=0,c=l.length;a<c;a++){if(a==0)C.dragNodeShowBefore=
[];n=l[a];n.isParent&&n.open?(f.expandCollapseNode(e,n,!n.open),C.dragNodeShowBefore[n.tId]=!0):C.dragNodeShowBefore[n.tId]=!1}C.dragFlag=1;t.showHoverDom=!1;g.showIfameMask(e,!0);n=!0;k=-1;if(l.length>1){var j=l[0].parentTId?l[0].getParentNode()[i]:m.getNodes(e);i=[];for(a=0,c=j.length;a<c;a++)if(C.dragNodeShowBefore[j[a].tId]!==void 0&&(n&&k>-1&&k+1!==a&&(n=!1),i.push(j[a]),k=a),l.length===i.length){l=i;break}}n&&(H=l[0].getPreNode(),R=l[l.length-1].getNextNode());D=o("<ul class='zTreeDragUL'></ul>",
e);for(a=0,c=l.length;a<c;a++)n=l[a],n.editNameFlag=!1,f.selectNode(e,n,a>0),f.removeTreeDom(e,n),a>e.edit.drag.maxShowNodeNum-1||(k=o("<li id='"+n.tId+"_tmp'></li>",e),k.append(o(n,d.id.A,e).clone()),k.css("padding","0"),k.children("#"+n.tId+d.id.A).removeClass(d.node.CURSELECTED),D.append(k),a==e.edit.drag.maxShowNodeNum-1&&(k=o("<li id='"+n.tId+"_moretmp'><a>  ...  </a></li>",e),D.append(k)));D.attr("id",l[0].tId+d.id.UL+"_tmp");D.addClass(e.treeObj.attr("class"));D.appendTo(M);B=o("<span class='tmpzTreeMove_arrow'></span>",
e);B.attr("id","zTreeMove_arrow_tmp");B.appendTo(M);e.treeObj.trigger(d.event.DRAG,[b,e.treeId,l])}if(C.dragFlag==1){s&&B.attr("id")==b.target.id&&u&&b.clientX+F.scrollLeft()+2>w("#"+u+d.id.A,s).offset().left?(n=w("#"+u+d.id.A,s),b.target=n.length>0?n.get(0):b.target):s&&(s.removeClass(d.node.TMPTARGET_TREE),u&&w("#"+u+d.id.A,s).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+"_"+I.move.TYPE_INNER));
u=s=null;J=!1;h=e;n=m.getSettings();for(var y in n)if(n[y].treeId&&n[y].edit.enable&&n[y].treeId!=e.treeId&&(b.target.id==n[y].treeId||w(b.target).parents("#"+n[y].treeId).length>0))J=!0,h=n[y];y=F.scrollTop();k=F.scrollLeft();i=h.treeObj.offset();a=h.treeObj.get(0).scrollHeight;n=h.treeObj.get(0).scrollWidth;c=b.clientY+y-i.top;var p=h.treeObj.height()+i.top-b.clientY-y,q=b.clientX+k-i.left,x=h.treeObj.width()+i.left-b.clientX-k;i=c<e.edit.drag.borderMax&&c>e.edit.drag.borderMin;var j=p<e.edit.drag.borderMax&&
p>e.edit.drag.borderMin,K=q<e.edit.drag.borderMax&&q>e.edit.drag.borderMin,G=x<e.edit.drag.borderMax&&x>e.edit.drag.borderMin,p=c>e.edit.drag.borderMin&&p>e.edit.drag.borderMin&&q>e.edit.drag.borderMin&&x>e.edit.drag.borderMin,q=i&&h.treeObj.scrollTop()<=0,x=j&&h.treeObj.scrollTop()+h.treeObj.height()+10>=a,P=K&&h.treeObj.scrollLeft()<=0,Q=G&&h.treeObj.scrollLeft()+h.treeObj.width()+10>=n;if(b.target&&g.isChildOrSelf(b.target,h.treeId)){for(var E=b.target;E&&E.tagName&&!g.eqs(E.tagName,"li")&&E.id!=
h.treeId;)E=E.parentNode;var S=!0;for(a=0,c=l.length;a<c;a++)if(n=l[a],E.id===n.tId){S=!1;break}else if(o(n,e).find("#"+E.id).length>0){S=!1;break}if(S&&b.target&&g.isChildOrSelf(b.target,E.id+d.id.A))s=w(E),u=E.id}n=l[0];if(p&&g.isChildOrSelf(b.target,h.treeId)){if(!s&&(b.target.id==h.treeId||q||x||P||Q)&&(J||!J&&n.parentTId))s=h.treeObj;i?h.treeObj.scrollTop(h.treeObj.scrollTop()-10):j&&h.treeObj.scrollTop(h.treeObj.scrollTop()+10);K?h.treeObj.scrollLeft(h.treeObj.scrollLeft()-10):G&&h.treeObj.scrollLeft(h.treeObj.scrollLeft()+
10);s&&s!=h.treeObj&&s.offset().left<h.treeObj.offset().left&&h.treeObj.scrollLeft(h.treeObj.scrollLeft()+s.offset().left-h.treeObj.offset().left)}D.css({top:b.clientY+y+3+"px",left:b.clientX+k+3+"px"});i=a=0;if(s&&s.attr("id")!=h.treeId){var z=u==null?null:m.getNodeCache(h,u);c=(b.ctrlKey||b.metaKey)&&e.edit.drag.isMove&&e.edit.drag.isCopy||!e.edit.drag.isMove&&e.edit.drag.isCopy;a=!!(H&&u===H.tId);i=!!(R&&u===R.tId);k=n.parentTId&&n.parentTId==u;n=(c||!i)&&g.apply(h.edit.drag.prev,[h.treeId,l,z],
!!h.edit.drag.prev);a=(c||!a)&&g.apply(h.edit.drag.next,[h.treeId,l,z],!!h.edit.drag.next);G=(c||!k)&&!(h.data.keep.leaf&&!z.isParent)&&g.apply(h.edit.drag.inner,[h.treeId,l,z],!!h.edit.drag.inner);if(!n&&!a&&!G){if(s=null,u="",v=d.move.TYPE_INNER,B.css({display:"none"}),window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null}else{c=w("#"+u+d.id.A,s);i=z.isLastNode?null:w("#"+z.getNextNode().tId+d.id.A,s.next());j=c.offset().top;k=c.offset().left;K=n?G?0.25:a?
0.5:1:-1;G=a?G?0.75:n?0.5:0:-1;y=(b.clientY+y-j)/c.height();(K==1||y<=K&&y>=-0.2)&&n?(a=1-B.width(),i=j-B.height()/2,v=d.move.TYPE_PREV):(G==0||y>=G&&y<=1.2)&&a?(a=1-B.width(),i=i==null||z.isParent&&z.open?j+c.height()-B.height()/2:i.offset().top-B.height()/2,v=d.move.TYPE_NEXT):(a=5-B.width(),i=j,v=d.move.TYPE_INNER);B.css({display:"block",top:i+"px",left:k+a+"px"});c.addClass(d.node.TMPTARGET_NODE+"_"+v);if(T!=u||U!=v)L=(new Date).getTime();if(z&&z.isParent&&v==d.move.TYPE_INNER&&(y=!0,window.zTreeMoveTimer&&
window.zTreeMoveTargetNodeTId!==z.tId?(clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null):window.zTreeMoveTimer&&window.zTreeMoveTargetNodeTId===z.tId&&(y=!1),y))window.zTreeMoveTimer=setTimeout(function(){v==d.move.TYPE_INNER&&z&&z.isParent&&!z.open&&(new Date).getTime()-L>h.edit.drag.autoOpenTime&&g.apply(h.callback.beforeDragOpen,[h.treeId,z],!0)&&(f.switchNode(h,z),h.edit.drag.autoExpandTrigger&&h.treeObj.trigger(d.event.EXPAND,[h.treeId,z]))},h.edit.drag.autoOpenTime+50),
window.zTreeMoveTargetNodeTId=z.tId}}else if(v=d.move.TYPE_INNER,s&&g.apply(h.edit.drag.inner,[h.treeId,l,null],!!h.edit.drag.inner)?s.addClass(d.node.TMPTARGET_TREE):s=null,B.css({display:"none"}),window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null;T=u;U=v;e.treeObj.trigger(d.event.DRAGMOVE,[b,e.treeId,l])}return!1}function r(b){if(window.zTreeMoveTimer)clearTimeout(window.zTreeMoveTimer),window.zTreeMoveTargetNodeTId=null;U=T=null;F.unbind("mousemove",c);
F.unbind("mouseup",r);F.unbind("selectstart",k);M.css("cursor","auto");s&&(s.removeClass(d.node.TMPTARGET_TREE),u&&w("#"+u+d.id.A,s).removeClass(d.node.TMPTARGET_NODE+"_"+d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE+"_"+I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE+"_"+I.move.TYPE_INNER));g.showIfameMask(e,!1);t.showHoverDom=!0;if(C.dragFlag!=0){C.dragFlag=0;var a,i,j;for(a=0,i=l.length;a<i;a++)j=l[a],j.isParent&&C.dragNodeShowBefore[j.tId]&&!j.open&&(f.expandCollapseNode(e,j,!j.open),
delete C.dragNodeShowBefore[j.tId]);D&&D.remove();B&&B.remove();var p=(b.ctrlKey||b.metaKey)&&e.edit.drag.isMove&&e.edit.drag.isCopy||!e.edit.drag.isMove&&e.edit.drag.isCopy;!p&&s&&u&&l[0].parentTId&&u==l[0].parentTId&&v==d.move.TYPE_INNER&&(s=null);if(s){var q=u==null?null:m.getNodeCache(h,u);if(g.apply(e.callback.beforeDrop,[h.treeId,l,q,v,p],!0)==!1)f.selectNodes(x,l);else{var A=p?g.clone(l):l;a=function(){if(J){if(!p)for(var a=0,c=l.length;a<c;a++)f.removeNode(e,l[a]);if(v==d.move.TYPE_INNER)f.addNodes(h,
q,A);else if(f.addNodes(h,q.getParentNode(),A),v==d.move.TYPE_PREV)for(a=0,c=A.length;a<c;a++)f.moveNode(h,q,A[a],v,!1);else for(a=-1,c=A.length-1;a<c;c--)f.moveNode(h,q,A[c],v,!1)}else if(p&&v==d.move.TYPE_INNER)f.addNodes(h,q,A);else if(p&&f.addNodes(h,q.getParentNode(),A),v!=d.move.TYPE_NEXT)for(a=0,c=A.length;a<c;a++)f.moveNode(h,q,A[a],v,!1);else for(a=-1,c=A.length-1;a<c;c--)f.moveNode(h,q,A[c],v,!1);f.selectNodes(h,A);o(A[0],e).focus().blur();e.treeObj.trigger(d.event.DROP,[b,h.treeId,A,q,
v,p])};v==d.move.TYPE_INNER&&g.canAsync(h,q)?f.asyncNode(h,q,!1,a):a()}}else f.selectNodes(x,l),e.treeObj.trigger(d.event.DROP,[b,e.treeId,l,null,null,null])}}function k(){return!1}var i,j,e=m.getSetting(b.data.treeId),C=m.getRoot(e),t=m.getRoots();if(b.button==2||!e.edit.enable||!e.edit.drag.isCopy&&!e.edit.drag.isMove)return!0;var p=b.target,q=m.getRoot(e).curSelectedList,l=[];if(m.isSelectedNode(e,a))for(i=0,j=q.length;i<j;i++){if(q[i].editNameFlag&&g.eqs(p.tagName,"input")&&p.getAttribute("treeNode"+
d.id.INPUT)!==null)return!0;l.push(q[i]);if(l[0].parentTId!==q[i].parentTId){l=[a];break}}else l=[a];f.editNodeBlur=!0;f.cancelCurEditNode(e);var F=w(e.treeObj.get(0).ownerDocument),M=w(e.treeObj.get(0).ownerDocument.body),D,B,s,J=!1,h=e,x=e,H,R,T=null,U=null,u=null,v=d.move.TYPE_INNER,N=b.clientX,O=b.clientY,L=(new Date).getTime();g.uCanDo(e)&&F.bind("mousemove",c);F.bind("mouseup",r);F.bind("selectstart",k);b.preventDefault&&b.preventDefault();return!0}};w.extend(!0,w.fn.zTree.consts,I);w.extend(!0,
w.fn.zTree._z,{tools:{getAbs:function(b){b=b.getBoundingClientRect();return[b.left+(document.body.scrollLeft+document.documentElement.scrollLeft),b.top+(document.body.scrollTop+document.documentElement.scrollTop)]},inputFocus:function(b){b.get(0)&&(b.focus(),g.setCursorPosition(b.get(0),b.val().length))},inputSelect:function(b){b.get(0)&&(b.focus(),b.select())},setCursorPosition:function(b,a){if(b.setSelectionRange)b.focus(),b.setSelectionRange(a,a);else if(b.createTextRange){var c=b.createTextRange();
c.collapse(!0);c.moveEnd("character",a);c.moveStart("character",a);c.select()}},showIfameMask:function(b,a){for(var c=m.getRoot(b);c.dragMaskList.length>0;)c.dragMaskList[0].remove(),c.dragMaskList.shift();if(a)for(var d=o("iframe",b),f=0,i=d.length;f<i;f++){var j=d.get(f),e=g.getAbs(j),j=o("<div id='zTreeMask_"+f+"' class='zTreeMask' style='top:"+e[1]+"px; left:"+e[0]+"px; width:"+j.offsetWidth+"px; height:"+j.offsetHeight+"px;'></div>",b);j.appendTo(o("body",b));c.dragMaskList.push(j)}}},view:{addEditBtn:function(b,
a){if(!(a.editNameFlag||o(a,d.id.EDIT,b).length>0)&&g.apply(b.edit.showRenameBtn,[b.treeId,a],b.edit.showRenameBtn)){var c=o(a,d.id.A,b),r="<span class='"+d.className.BUTTON+" edit' id='"+a.tId+d.id.EDIT+"' title='"+g.apply(b.edit.renameTitle,[b.treeId,a],b.edit.renameTitle)+"' treeNode"+d.id.EDIT+" style='display:none;'></span>";c.append(r);o(a,d.id.EDIT,b).bind("click",function(){if(!g.uCanDo(b)||g.apply(b.callback.beforeEditName,[b.treeId,a],!0)==!1)return!1;f.editNode(b,a);return!1}).show()}},
addRemoveBtn:function(b,a){if(!(a.editNameFlag||o(a,d.id.REMOVE,b).length>0)&&g.apply(b.edit.showRemoveBtn,[b.treeId,a],b.edit.showRemoveBtn)){var c=o(a,d.id.A,b),r="<span class='"+d.className.BUTTON+" remove' id='"+a.tId+d.id.REMOVE+"' title='"+g.apply(b.edit.removeTitle,[b.treeId,a],b.edit.removeTitle)+"' treeNode"+d.id.REMOVE+" style='display:none;'></span>";c.append(r);o(a,d.id.REMOVE,b).bind("click",function(){if(!g.uCanDo(b)||g.apply(b.callback.beforeRemove,[b.treeId,a],!0)==!1)return!1;f.removeNode(b,
a);b.treeObj.trigger(d.event.REMOVE,[b.treeId,a]);return!1}).bind("mousedown",function(){return!0}).show()}},addHoverDom:function(b,a){if(m.getRoots().showHoverDom)a.isHover=!0,b.edit.enable&&(f.addEditBtn(b,a),f.addRemoveBtn(b,a)),g.apply(b.view.addHoverDom,[b.treeId,a])},cancelCurEditNode:function(b,a,c){var r=m.getRoot(b),k=b.data.key.name,i=r.curEditNode;if(i){var j=r.curEditInput,a=a?a:c?i[k]:j.val();if(g.apply(b.callback.beforeRename,[b.treeId,i,a,c],!0)===!1)return!1;else i[k]=a,b.treeObj.trigger(d.event.RENAME,
[b.treeId,i,c]);o(i,d.id.A,b).removeClass(d.node.CURSELECTED_EDIT);j.unbind();f.setNodeName(b,i);i.editNameFlag=!1;r.curEditNode=null;r.curEditInput=null;f.selectNode(b,i,!1)}return r.noSelection=!0},editNode:function(b,a){var c=m.getRoot(b);f.editNodeBlur=!1;if(m.isSelectedNode(b,a)&&c.curEditNode==a&&a.editNameFlag)setTimeout(function(){g.inputFocus(c.curEditInput)},0);else{var r=b.data.key.name;a.editNameFlag=!0;f.removeTreeDom(b,a);f.cancelCurEditNode(b);f.selectNode(b,a,!1);o(a,d.id.SPAN,b).html("<input type=text class='rename' id='"+
a.tId+d.id.INPUT+"' treeNode"+d.id.INPUT+" >");var k=o(a,d.id.INPUT,b);k.attr("value",a[r]);b.edit.editNameSelectAll?g.inputSelect(k):g.inputFocus(k);k.bind("blur",function(){f.editNodeBlur||f.cancelCurEditNode(b)}).bind("keydown",function(a){a.keyCode=="13"?(f.editNodeBlur=!0,f.cancelCurEditNode(b)):a.keyCode=="27"&&f.cancelCurEditNode(b,null,!0)}).bind("click",function(){return!1}).bind("dblclick",function(){return!1});o(a,d.id.A,b).addClass(d.node.CURSELECTED_EDIT);c.curEditInput=k;c.noSelection=
!1;c.curEditNode=a}},moveNode:function(b,a,c,r,k,i){var j=m.getRoot(b),e=b.data.key.children;if(a!=c&&(!b.data.keep.leaf||!a||a.isParent||r!=d.move.TYPE_INNER)){var g=c.parentTId?c.getParentNode():j,t=a===null||a==j;t&&a===null&&(a=j);if(t)r=d.move.TYPE_INNER;j=a.parentTId?a.getParentNode():j;if(r!=d.move.TYPE_PREV&&r!=d.move.TYPE_NEXT)r=d.move.TYPE_INNER;if(r==d.move.TYPE_INNER)if(t)c.parentTId=null;else{if(!a.isParent)a.isParent=!0,a.open=!!a.open,f.setNodeLineIcos(b,a);c.parentTId=a.tId}var p;
t?p=t=b.treeObj:(!i&&r==d.move.TYPE_INNER?f.expandCollapseNode(b,a,!0,!1):i||f.expandCollapseNode(b,a.getParentNode(),!0,!1),t=o(a,b),p=o(a,d.id.UL,b),t.get(0)&&!p.get(0)&&(p=[],f.makeUlHtml(b,a,p,""),t.append(p.join(""))),p=o(a,d.id.UL,b));var q=o(c,b);q.get(0)?t.get(0)||q.remove():q=f.appendNodes(b,c.level,[c],null,!1,!0).join("");p.get(0)&&r==d.move.TYPE_INNER?p.append(q):t.get(0)&&r==d.move.TYPE_PREV?t.before(q):t.get(0)&&r==d.move.TYPE_NEXT&&t.after(q);var l=-1,w=0,x=null,t=null,D=c.level;if(c.isFirstNode){if(l=
0,g[e].length>1)x=g[e][1],x.isFirstNode=!0}else if(c.isLastNode)l=g[e].length-1,x=g[e][l-1],x.isLastNode=!0;else for(p=0,q=g[e].length;p<q;p++)if(g[e][p].tId==c.tId){l=p;break}l>=0&&g[e].splice(l,1);if(r!=d.move.TYPE_INNER)for(p=0,q=j[e].length;p<q;p++)j[e][p].tId==a.tId&&(w=p);if(r==d.move.TYPE_INNER){a[e]||(a[e]=[]);if(a[e].length>0)t=a[e][a[e].length-1],t.isLastNode=!1;a[e].splice(a[e].length,0,c);c.isLastNode=!0;c.isFirstNode=a[e].length==1}else a.isFirstNode&&r==d.move.TYPE_PREV?(j[e].splice(w,
0,c),t=a,t.isFirstNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!0,c.isLastNode=!1):a.isLastNode&&r==d.move.TYPE_NEXT?(j[e].splice(w+1,0,c),t=a,t.isLastNode=!1,c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!0):(r==d.move.TYPE_PREV?j[e].splice(w,0,c):j[e].splice(w+1,0,c),c.parentTId=a.parentTId,c.isFirstNode=!1,c.isLastNode=!1);m.fixPIdKeyValue(b,c);m.setSonNodeLevel(b,c.getParentNode(),c);f.setNodeLineIcos(b,c);f.repairNodeLevelClass(b,c,D);!b.data.keep.parent&&g[e].length<1?(g.isParent=!1,
g.open=!1,a=o(g,d.id.UL,b),r=o(g,d.id.SWITCH,b),e=o(g,d.id.ICON,b),f.replaceSwitchClass(g,r,d.folder.DOCU),f.replaceIcoClass(g,e,d.folder.DOCU),a.css("display","none")):x&&f.setNodeLineIcos(b,x);t&&f.setNodeLineIcos(b,t);b.check&&b.check.enable&&f.repairChkClass&&(f.repairChkClass(b,g),f.repairParentChkClassWithSelf(b,g),g!=c.parent&&f.repairParentChkClassWithSelf(b,c));i||f.expandCollapseParentNode(b,c.getParentNode(),!0,k)}},removeEditBtn:function(b,a){o(a,d.id.EDIT,b).unbind().remove()},removeRemoveBtn:function(b,
a){o(a,d.id.REMOVE,b).unbind().remove()},removeTreeDom:function(b,a){a.isHover=!1;f.removeEditBtn(b,a);f.removeRemoveBtn(b,a);g.apply(b.view.removeHoverDom,[b.treeId,a])},repairNodeLevelClass:function(b,a,c){if(c!==a.level){var f=o(a,b),g=o(a,d.id.A,b),b=o(a,d.id.UL,b),c=d.className.LEVEL+c,a=d.className.LEVEL+a.level;f.removeClass(c);f.addClass(a);g.removeClass(c);g.addClass(a);b.removeClass(c);b.addClass(a)}},selectNodes:function(b,a){for(var c=0,d=a.length;c<d;c++)f.selectNode(b,a[c],c>0)}},event:{},
data:{setSonNodeLevel:function(b,a,c){if(c){var d=b.data.key.children;c.level=a?a.level+1:0;if(c[d])for(var a=0,f=c[d].length;a<f;a++)c[d][a]&&m.setSonNodeLevel(b,c,c[d][a])}}}});var H=w.fn.zTree,g=H._z.tools,d=H.consts,f=H._z.view,m=H._z.data,o=g.$;m.exSetting({edit:{enable:!1,editNameSelectAll:!1,showRemoveBtn:!0,showRenameBtn:!0,removeTitle:"remove",renameTitle:"rename",drag:{autoExpandTrigger:!1,isCopy:!0,isMove:!0,prev:!0,next:!0,inner:!0,minMoveSize:5,borderMax:10,borderMin:-5,maxShowNodeNum:5,
autoOpenTime:500}},view:{addHoverDom:null,removeHoverDom:null},callback:{beforeDrag:null,beforeDragOpen:null,beforeDrop:null,beforeEditName:null,beforeRename:null,onDrag:null,onDragMove:null,onDrop:null,onRename:null}});m.addInitBind(function(b){var a=b.treeObj,c=d.event;a.bind(c.RENAME,function(a,c,d,f){g.apply(b.callback.onRename,[a,c,d,f])});a.bind(c.DRAG,function(a,c,d,f){g.apply(b.callback.onDrag,[c,d,f])});a.bind(c.DRAGMOVE,function(a,c,d,f){g.apply(b.callback.onDragMove,[c,d,f])});a.bind(c.DROP,
function(a,c,d,f,e,m,o){g.apply(b.callback.onDrop,[c,d,f,e,m,o])})});m.addInitUnBind(function(b){var b=b.treeObj,a=d.event;b.unbind(a.RENAME);b.unbind(a.DRAG);b.unbind(a.DRAGMOVE);b.unbind(a.DROP)});m.addInitCache(function(){});m.addInitNode(function(b,a,c){if(c)c.isHover=!1,c.editNameFlag=!1});m.addInitProxy(function(b){var a=b.target,c=m.getSetting(b.data.treeId),f=b.relatedTarget,k="",i=null,j="",e=null,o=null;if(g.eqs(b.type,"mouseover")){if(o=g.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+d.id.A}]))k=
g.getNodeMainDom(o).id,j="hoverOverNode"}else if(g.eqs(b.type,"mouseout"))o=g.getMDom(c,f,[{tagName:"a",attrName:"treeNode"+d.id.A}]),o||(k="remove",j="hoverOutNode");else if(g.eqs(b.type,"mousedown")&&(o=g.getMDom(c,a,[{tagName:"a",attrName:"treeNode"+d.id.A}])))k=g.getNodeMainDom(o).id,j="mousedownNode";if(k.length>0)switch(i=m.getNodeCache(c,k),j){case "mousedownNode":e=x.onMousedownNode;break;case "hoverOverNode":e=x.onHoverOverNode;break;case "hoverOutNode":e=x.onHoverOutNode}return{stop:!1,
node:i,nodeEventType:j,nodeEventCallback:e,treeEventType:"",treeEventCallback:null}});m.addInitRoot(function(b){var b=m.getRoot(b),a=m.getRoots();b.curEditNode=null;b.curEditInput=null;b.curHoverNode=null;b.dragFlag=0;b.dragNodeShowBefore=[];b.dragMaskList=[];a.showHoverDom=!0});m.addZTreeTools(function(b,a){a.cancelEditName=function(a){m.getRoot(this.setting).curEditNode&&f.cancelCurEditNode(this.setting,a?a:null,!0)};a.copyNode=function(a,b,k,i){if(!b)return null;if(a&&!a.isParent&&this.setting.data.keep.leaf&&
k===d.move.TYPE_INNER)return null;var j=this,e=g.clone(b);if(!a)a=null,k=d.move.TYPE_INNER;k==d.move.TYPE_INNER?(b=function(){f.addNodes(j.setting,a,[e],i)},g.canAsync(this.setting,a)?f.asyncNode(this.setting,a,i,b):b()):(f.addNodes(this.setting,a.parentNode,[e],i),f.moveNode(this.setting,a,e,k,!1,i));return e};a.editName=function(a){a&&a.tId&&a===m.getNodeCache(this.setting,a.tId)&&(a.parentTId&&f.expandCollapseParentNode(this.setting,a.getParentNode(),!0),f.editNode(this.setting,a))};a.moveNode=
function(a,b,k,i){function j(){f.moveNode(e.setting,a,b,k,!1,i)}if(!b)return b;if(a&&!a.isParent&&this.setting.data.keep.leaf&&k===d.move.TYPE_INNER)return null;else if(a&&(b.parentTId==a.tId&&k==d.move.TYPE_INNER||o(b,this.setting).find("#"+a.tId).length>0))return null;else a||(a=null);var e=this;g.canAsync(this.setting,a)&&k===d.move.TYPE_INNER?f.asyncNode(this.setting,a,i,j):j();return b};a.setEditable=function(a){this.setting.edit.enable=a;return this.refresh()}});var N=f.cancelPreSelectedNode;
f.cancelPreSelectedNode=function(b,a){for(var c=m.getRoot(b).curSelectedList,d=0,g=c.length;d<g;d++)if(!a||a===c[d])if(f.removeTreeDom(b,c[d]),a)break;N&&N.apply(f,arguments)};var O=f.createNodes;f.createNodes=function(b,a,c,d){O&&O.apply(f,arguments);c&&f.repairParentChkClassWithSelf&&f.repairParentChkClassWithSelf(b,d)};var V=f.makeNodeUrl;f.makeNodeUrl=function(b,a){return b.edit.enable?null:V.apply(f,arguments)};var L=f.removeNode;f.removeNode=function(b,a){var c=m.getRoot(b);if(c.curEditNode===
a)c.curEditNode=null;L&&L.apply(f,arguments)};var P=f.selectNode;f.selectNode=function(b,a,c){var d=m.getRoot(b);if(m.isSelectedNode(b,a)&&d.curEditNode==a&&a.editNameFlag)return!1;P&&P.apply(f,arguments);f.addHoverDom(b,a);return!0};var Q=g.uCanDo;g.uCanDo=function(b,a){var c=m.getRoot(b);if(a&&(g.eqs(a.type,"mouseover")||g.eqs(a.type,"mouseout")||g.eqs(a.type,"mousedown")||g.eqs(a.type,"mouseup")))return!0;if(c.curEditNode)f.editNodeBlur=!1,c.curEditInput.focus();return!c.curEditNode&&(Q?Q.apply(f,
arguments):!0)}})(jQuery);
});
define('Tip',function(require, exports, module) {
	/** * 模块外部依赖 ** */
	// require.async(("./css/tip.css");
	(function($) {
		$.fn.tip = function(options) {
			var defaults = {
				activation : "hover",
				keepAlive : false,
				maxWidth : "auto",
				edgeOffset : 3,
				defaultPosition : "bottom",
				delay : 10,
				fadeIn : 20,
				fadeOut : 20,
				attribute : "title",
				content : null,
				enter : function() {
				},
				exit : function() {
				}
			};
			var opts = $.extend(defaults, options);
			var tip_holder;
			if ($("#tip_holder").length <= 0) {
				tip_holder = $('<div id="tip_holder" style="max-width:'
						+ opts.maxWidth + ';"></div>');
				var tip_content = $('<div id="tip_content"></div>');
				var tip_arrow = $('<div id="tip_arrow"></div>');
				$("body").append(tip_holder.html(tip_content)
				.prepend(tip_arrow.html('<div id="tip_arrow_inner"></div>')));
			} else {
				tip_holder = $("#tip_holder");
				var tip_content = $("#tip_content");
				var tip_arrow = $("#tip_arrow");
			}
			tip_holder.mouseleave(function() {
				tip_holder.hide();
			});
			var org_elem = $(this);
			if (opts.content) {
				var org_title = opts.content;
			} else {
				var org_title = org_elem.attr(opts.attribute);
			}
			if (org_title != "") {
				if (!opts.content) {
					org_elem.removeAttr(opts.attribute); // remove original Attribute
				}
				var timeout = false;
				org_elem.hover(function() {
					deactive_tip();
				}, function() {
					deactive_tip();
				});
				org_elem.focus(function() {
					deactive_tip();
				}).blur(function() {
					deactive_tip();
				});
				org_elem.click(function() {
					deactive_tip();
				});

				tip_holder.on("show", function() {
					active_tip();
					return false;
				});

				tip_holder.on("hide", function() {
					deactive_tip();
					return false;
				});

				function active_tip() {
					opts.enter.call(this);
					tip_content.html(org_title);
					tip_holder.hide().removeAttr("class").css("margin", "0");
					tip_arrow.removeAttr("style");

					var top = parseInt(org_elem.offset()['top']);
					var left = parseInt(org_elem.offset()['left']);
					var org_width = parseInt(org_elem.outerWidth());
					var org_height = parseInt(org_elem.outerHeight());
					var tip_w = tip_holder.outerWidth();
					var tip_h = tip_holder.outerHeight();
					var w_compare = Math.round((org_width - tip_w) / 2);
					var h_compare = Math.round((org_height - tip_h) / 2);
					var marg_left = Math.round(left + w_compare);
					var marg_top = Math.round(top + org_height
							+ opts.edgeOffset);
					var t_class = "";
					var arrow_top = "";
					var arrow_left = Math.round(tip_w - 12) / 2;

					if (opts.defaultPosition == "bottom") {
						t_class = "_bottom";
					} else if (opts.defaultPosition == "top") {
						t_class = "_top";
					} else if (opts.defaultPosition == "left") {
						t_class = "_left";
					} else if (opts.defaultPosition == "right") {
						t_class = "_right";
					}

					var right_compare = (w_compare + left) < parseInt($(window)
							.scrollLeft());
					var left_compare = (tip_w + left) > parseInt($(window)
							.width());

					if ((right_compare && w_compare < 0)
							|| (t_class == "_right" && !left_compare)
							|| (t_class == "_left" && left < (tip_w
									+ opts.edgeOffset + 5))) {
						t_class = "_right";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left = -12;
						marg_left = Math.round(left + org_width
								+ opts.edgeOffset);
						marg_top = Math.round(top + h_compare);
					} else if ((left_compare && w_compare < 0)
							|| (t_class == "_left" && !right_compare)) {
						t_class = "_left";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left = Math.round(tip_w);
						marg_left = Math.round(left
								- (tip_w + opts.edgeOffset + 5));
						marg_top = Math.round(top + h_compare);
					}

					var top_compare = (top + org_height + opts.edgeOffset
							+ tip_h + 8) > parseInt($(window).height()
							+ $(window).scrollTop());
					var bottom_compare = ((top + org_height) - (opts.edgeOffset
							+ tip_h + 8)) < 0;

					if (top_compare || (t_class == "_bottom" && top_compare)
							|| (t_class == "_top" && !bottom_compare)) {
						if (t_class == "_top" || t_class == "_bottom") {
							t_class = "_top";
						} else {
							t_class = t_class + "_top";
						}
						arrow_top = tip_h;
						marg_top = Math.round(top
								- (tip_h + 5 + opts.edgeOffset));
					} else if (bottom_compare
							| (t_class == "_top" && bottom_compare)
							|| (t_class == "_bottom" && !top_compare)) {
						if (t_class == "_top" || t_class == "_bottom") {
							t_class = "_bottom";
						} else {
							t_class = t_class + "_bottom";
						}
						arrow_top = -12;
						marg_top = Math.round(top + org_height
								+ opts.edgeOffset);
					}

					if (t_class == "_right_top" || t_class == "_left_top") {
						marg_top = marg_top + 5;
					} else if (t_class == "_right_bottom"
							|| t_class == "_left_bottom") {
						marg_top = marg_top - 5;
					}
					if (t_class == "_left_top" || t_class == "_left_bottom") {
						marg_left = marg_left + 5;
					}
					tip_arrow.css({
						"margin-left" : arrow_left + "px",
						"margin-top" : arrow_top + "px"
					});
					tip_holder.css({
						"margin-left" : marg_left + "px",
						"margin-top" : marg_top + "px"
					}).attr("class", "tip" + t_class);

					if (timeout) {
						clearTimeout(timeout);
					}
					timeout = setTimeout(function() {
						tip_holder.stop(true, true).fadeIn(opts.fadeIn);
					}, opts.delay);
				}

				function deactive_tip() {
					opts.exit.call(this);
					if (timeout) {
						clearTimeout(timeout);
					}
					tip_holder.fadeOut(opts.fadeOut);
				}
			}
			return tip_holder;
		}
	})(jQuery);
});
define('Boolean',function(require, exports, module) {
	//	exports.isHtml=function (htmlStr) {
	//    var  reg = /<[^>]+>/g;
	//    return reg.test(htmlStr);
	//}
	/**
	 * 只能输入日期[yyyy-mm-dd]
	 */
	exports.isDate = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入日期时间[HH:mm:ss]
	 */
	exports.isTime = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d{2}[:]\d{2}[:]\d{2}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入日期时间[yyyy-mm-dd HH:mm:ss]
	 */
	exports.isDateTime = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d{4}[-]\d{2}[-]\d{2} \d{2}[:]\d{2}[:]\d{2}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 只能输入数字[0-9]
	 */
	exports.isDigits = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\d+$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配money
	 */
	exports.isMoney = function(str) {
		if (str == null || str == "") return false;
		str=str.replace(/[^\d\.-]/g, "");
		var result = str.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配Email地址
	 */
	exports.isEmail = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 判断数值类型，包括整数和浮点数
	 */
	exports.isNumber = function(str) {
		if (isDouble(str) || isInteger(str)) return true;
		return false;
	};
	/**
	 * 匹配phone
	 */
	var isPhone = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
		if (result == null) return false;
		return true;
	};
	exports.isPhone = isPhone;
	/**
	 * 匹配mobile
	 */
	var isMobile = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/);
		if (result == null) return false;
		return true;
	};
	exports.isMobile = isMobile;
	/**
	 * 联系电话(手机/电话皆可)验证
	 */
	exports.isTel = function(str) {
		if (isMobile(str) || isPhone(str)) return true;
		return false;
	};
	/**
	 * 匹配qq
	 */
	exports.isQq = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[1-9]\d{4,12}$/);
		if (result == null) return false;
		return true;
	};
	/**
	 * 匹配integer
	 */
	var isInteger = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[-\+]?\d+$/);
		if (result == null) return false;
		return true;
	};
	exports.isInteger = isInteger;
	/**
	 * 匹配double或float
	 */
	var isDouble = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[-\+]?\d+(\.\d+)?$/);
		if (result == null) return false;
		return true;
	};
	exports.isDouble = isDouble;
	/**
	 * 匹配邮政编码
	 */
	exports.isPostCode = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[0-9]{6}$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配URL
	 */
	exports.isUrl = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
	 */
	exports.isPwd = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 判断是否为合法字符(a-zA-Z0-9-_)
	 */
	exports.isChar = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[A-Za-z0-9_-]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配english
	 */
	exports.isEnglish = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[A-Za-z]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配身份证号码
	 */
	exports.isIdCardNo = function(num) {
		// if (isNaN(num)) {alert("输入的不是数字！"); return false;}
		var len = num.length,
			re;
		if (len == 15)
			re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
		else if (len == 18)
			re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);else {
			alert("输入的数字位数不对。"); return false;
		}
		var a = num.match(re);
		if (a != null) {
			if (len == 15) {
				var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
				var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
			} else {
				var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
				var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
			}
			if (!B) {
				alert("输入的身份证号 " + a[0] + " 里出生日期不对。"); return false;
			}
		}
		if (!re.test(num)) {
			alert("身份证最后一位只能是数字和字母。");return false;
		}
		return true;
	};

	/**
	 * 匹配汉字
	 */
	exports.isChinese = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[\u4e00-\u9fa5]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 匹配中文(包括汉字和字符)
	 */
	exports.isChineseChar = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[\u0391-\uFFE5]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 字符验证，只能包含中文、英文、数字、下划线等字符。
	 */
	exports.stringCheck = function(str) {
		if (str == null || str == "") return false;
		var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
		if (result == null) return false;
		return true;
	};

	/**
	 * 过滤中英文特殊字符，除英文"-_"字符外
	 */
	exports.stringFilter = function(str) {
		var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
		var rs = "";
		for (var i = 0; i < str.length; i++) {
			rs = rs + str.substr(i, 1).replace(pattern, '');
		}
		return rs;
	};

	/**
	 * 判断是否包含中英文特殊字符，除英文"-_"字符外
	 */
	exports.isContainsSpecialChar = function(str) {
		if (str == null || str == "") return false;
		var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
		return reg.test(str);
	};
});
define('Tree',['Component','Jztree'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');
	//require.async(("./css/tree.css");
	require('Jztree');
	/** * 模块私有数据 ** */
	var defaults = {
			id : "tree",
			cls : "",
			css : "",
			treeId: "",
			treeObj: null,
			nodeData:null,//静态数据
			async: {
				autoParam: [],
				//contentType: "application...",
				dataFilter: null,
				dataType : "json",
				enable : true,
				otherParam: [],
				type: "post",
				url: ""
			},			
			callback: {
				beforeAsync: null,
				beforeCheck: null,
				beforeClick: null,
				beforeCollapse: null,
				beforeDblClick: null,
				beforeDrag: null,
				beforeDragOpen: null,
				beforeDrop: null,
				beforeEditName: null,
				beforeExpand: null,
				beforeMouseDown: null,
				beforeMouseUp: null,
				beforeRemove: null,
				beforeRename: null,
				beforeRightClick: null,
				onAsyncError: null,
				onAsyncSuccess: null,
				onCheck: null,
				onClick: null,
				onCollapse: null,
				onDblClick: null,
				onDrag: null,
				onDragMove: null,
				onDrop: null,
				onExpand: null,
				onMouseDown: null,
				onMouseUp: null,
				onNodeCreated: null,
				onRemove: null,
				onRename: null,
				onRightClick: null
			},
			check: {
				autoCheckTrigger: false,
				chkboxType: {
					"Y": "ps",
					"N": "ps"
				},
				chkStyle: "checkbox",
				enable: false,
				nocheckInherit: false,
				chkDisabledInherit: false,
				radioType: "level"
			},
			data: {
				keep: {
					leaf: false,
					parent: false
				},
				key: {
					checked: "checked",
					children: "children",
					name: "name",
					title: "",
					url: "url"
				},
				simpleData: {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPId : "root"
				}
			},
			edit: {
				drag : {
					autoExpandTrigger : true,
					isCopy : true,
					isMove : true,
					prev : true,
					next : true,
					inner : true,
					borderMax : 10,
					borderMin : -5,
					minMoveSize : 5,
					maxShowNodeNum : 5,
					autoOpenTime : 500
				},
				editNameSelectAll : true,
				enable : true,
				removeTitle : "remove",
				renameTitle : "rename",
				showRemoveBtn : false,
				showRenameBtn : false
			},
			view: {
				addDiyDom: null,
				addHoverDom: null,
				autoCancelSelected: true,
				dblClickExpand: true,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: false,
				removeHoverDom: null,
				selectedMulti: true,
				showIcon: true,
				showLine: true,
				showTitle: true,
				txtSelectedEnable: false
			}
		};

	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.tree=$("<ul id='"+me.configs.id+"' class='ztree'></ul>");
			if(me.configs.nodeData){
				delete me.configs.async;
				$.fn.zTree.init(me.tree, me.configs,me.configs.nodeData);
			}else{
				$.fn.zTree.init(me.tree, me.configs);
			}
			var interval=setInterval(function(){
				if($("#"+me.configs.id).length>0){
					me.treeObj=me.getTree();
					clearInterval(interval);
				}
			},100);
		}
	};
	/** * 类定义 ** */
	var Tree = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Tree.prototype = {
		getTree:function(){
	 		return $.fn.zTree.getZTreeObj(this.configs.id);
		},
		refresh:function(){
			var nodes = this.treeObj.getNodes();
			for (var i = nodes.length - 1; i >= 0; i--) {
				this.treeObj.removeNode(nodes[i]);
			}
			this.treeObj.reAsyncChildNodes();
		},
		expandAll:function(flag){
			this.treeObj.expandAll(flag);
		},
		expandNode:function(node){
			this.treeObj.expandNode(node);
		},
		getSelectedNodes:function(){
			return this.treeObj.getSelectedNodes()
		},
		addNodes:function(parentNode,node){
			return this.treeObj.addNodes(parentNode,node);
		},
		editName:function(node){
			this.treeObj.editName(node);
		},
		removeNode:function(node){
			this.treeObj.removeNode(node);
		},
		getCheckedNodes:function(flag){
			return this.treeObj.getCheckedNodes(flag);
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Tree(configs);
	};

});

define('Mask',function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/mask.css");
	/** * 模块私有数据 ** */
	var  defaults = {
			id:"",
			loadingMsg:"is currently running"
	    };
	/** * 模块私有方法 ** */
	 var self={
	 	init:function(me){
	 		me.mask=$("<div></div>").addClass(me._className).appendTo($("body"));
	 		if(me.configs.loadingMsg){
	 			me.mask_loading=$('<div class="sea_mask_loading"></div>').insertAfter(me.mask);
	 		}
	 	}
	 };
	/** * 类定义 ** */
	var Mask = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_mask";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Mask.prototype = {
		hide:function(){
			 this.mask.hide();
			 this.mask_loading&&this.mask_loading.hide();
		}
	};
	
	/** * 输出类对象 ** */
	exports.show = function(configs,fun) {
		var mask=new Mask(configs);
		if(fun){
			 setTimeout(function(){
				 fun();
				 mask.hide();
			 },600);
		 }
		return mask;
	};
});

define('Jedate',function(require, exports, module) {
/**
 @Name : jeDate v3.4 日期控件
 @Author: chen guojun
 @Date: 2016-9-6
 @QQ群：516754269
 @官网：http://www.jayui.com/jedate/ 或 https://github.com/singod/jeDate
 */
;(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jeDate" ], factory);
   // } else if (typeof exports === "object") {
        //module.exports = factory(require("jeDate"));
    } else {
        root.jeDate = factory(root.jeDate);
    }
})(this, function(jeDate) {
    var jeDt = {}, doc = document, ymdMacth = /\w+|d+/g;
    var parseInt = function (n) { return window.parseInt(n, 10); };
    // (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) , (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio])
    var QD=function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();
    //判断类型
    jeDt.isType = function(obj, type) {
        type = type.replace(/\b(\w)|\s(\w)/g, function(m) {
            return m.toUpperCase();
        });
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
    //循环
    jeDt.each = function(obj, fn) {
        if (jeDt.isType(obj, "array")) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (fn.call(obj[i], i, obj[i]) === false) break;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (fn.call(obj[key], key, obj[key]) === false) break;
                }
            }
        }
    };
    //获取与设置自定义属性
    jeDt.attr = function(elem, key, val) {
        if (typeof key === "string" && typeof val === "undefined") {
            return elem.getAttribute(key);
        } else {
            elem.setAttribute(key, val);
        }
        return this;
    };
    jeDt.stopmp = function(e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
        return this;
    };
    //查询样式是否存在
    jeDt.hasClass = function(elem, cls) {
        elem = elem || {};
        return new RegExp("\\b" + cls + "\\b").test(elem.className);
    };
    //添加样式
    jeDt.addClass = function(elem, cls) {
        elem = elem || {};
        jeDt.hasClass(elem, cls) || (elem.className += " " + cls);
        elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
        return this;
    };
    //删除样式
    jeDt.removeClass = function(elem, cls) {
        elem = elem || {};
        if (jeDt.hasClass(elem, cls)) {
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
        }
        return this;
    };
    //获取样式
    jeDt.getStyle = function(elem, style) {
        var cssVal = document.defaultView ? window.getComputedStyle(elem, null)[style] : elem.currentStyle[style];
        return cssVal;
    }
    jeDt.isShow = function(elem, bool) {
        elem.style.display = bool != true ? "none" :"block";
    };
    //获取与设置HTML
    jeDt.html = function(elem, value) {
        if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
            elem.innerHTML = value;
        } else {
            return elem.innerHTML;
        }
        return this;
    };
    //获取与设置文本
    jeDt.text = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            document.all ? elem.innerText = value :elem.textContent = value;
        } else {
            var emText = document.all ? elem.innerText :elem.textContent;
            return jeDt.trim(emText);
        }
        return this;
    };
    //获取与设置value
    jeDt.val = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            elem.value = value;
        } else {
            return jeDt.trim(elem.value);
        }
        return this;
    };
    jeDt.bind = function(elObj, type, fn) {
        type = type.toLowerCase();
        var bindevent = function (elem) {
            elem.attachEvent ? elem.attachEvent("on" + type, function() {
                fn.call(elem, window.type);
            }) :elem.addEventListener(type, fn, false);
        }
        return elObj == document ? bindevent(document) :jeDt.each(elObj, function(i, elem) {
            bindevent(elem);
        });
    };
    jeDt.docScroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return doc.body[type] | doc.documentElement[type];
    };
    jeDt.winarea = function(type) {
        return doc.documentElement[type ? "clientWidth" :"clientHeight"];
    };
    //判断是否闰年
    jeDt.isLeap = function(y) {
        return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
    }
    //获取本月的总天数
    jeDt.getDaysNum = function(y, m) {
        var num = 31;
        switch (parseInt(m)) {
            case 2:
                num = jeDt.isLeap(y) ? 29 : 28; break;
            case 4: case 6: case 9: case 11:
            num = 30; break;
        }
        return num;
    }
    //获取月与年
    jeDt.getYM = function(y, m, n) {
        var nd = new Date(y, m - 1);
        nd.setMonth(m - 1 + n);
        return {
            y: nd.getFullYear(),
            m: nd.getMonth() + 1
        };
    }
    //获取上个月
    jeDt.getPrevMonth = function(y, m, n) {
        return  jeDt.getYM(y, m, 0 - (n || 1));
    }
    //获取下个月
    jeDt.getNextMonth = function(y, m, n) {
        return jeDt.getYM(y, m, n || 1);
    }
    //补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //判断是否为数字
    jeDt.IsNum = function(str){
        return (str!=null && str!="") ? !isNaN(str) : false;
    }
    //转换日期格式
    jeDt.parse = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var hmsCheck = jeDt.parseCheck(format, false).substring(0, 5) == "hh:mm", num = 2;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            var idx = hmsCheck ? ++num :ymd.index = ++ymd.index | 0;
            return jeDt.digit(ymd[idx]);
        });
    };
    jeDt.parseCheck = function(format, bool) {
        var ymdhms = [];
        format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join(bool == true ? "-" :":");
    };
    jeDt.checkFormat = function(format) {
        var ymdhms = [];
        format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join("-");
    };
    jeDt.parseMatch = function(str) {
        var timeArr = str.split(" ");
        return timeArr[0].match(ymdMacth);
    };
    //验证日期
    jeDt.checkDate = function (date) {
        var dateArr = date.match(ymdMacth);
        if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
        if (dateArr[1] > 12 || dateArr[1] < 1) return false;
        if (dateArr[2] < 1 || dateArr[2] > 31) return false;
        if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
        if (dateArr[1] == 2) {
            if (dateArr[2] > 29) return false;
            if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
        }
        return true;
    }
    jeDt.trim = function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    //初始化日期
    jeDt.nowDate = function(num, format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if(typeof num === "string"){
            var newDate = new Date(parseInt(num) * 1e3);
        }else{
            num = num | 0;
            var newDate = new Date(), todayTime = newDate.getTime() + 1000*60*60*24*num;
            newDate.setTime(todayTime);
        }
        var years = newDate.getFullYear(), months = newDate.getMonth() + 1, days = newDate.getDate(), hh = newDate.getHours(), mm = newDate.getMinutes(), ss = newDate.getSeconds();
        return jeDt.parse([ years, jeDt.digit(months), jeDt.digit(days) ], [ jeDt.digit(hh), jeDt.digit(mm), jeDt.digit(ss) ], format);
    };
    jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
    //判断元素类型
    jeDt.isValHtml = function(that) {
        return /textarea|input/.test(that.tagName.toLocaleLowerCase());
    };
    //节日
    jeDt.festival = function(md, n) {
        var str = "";
        switch (md) {
            case "1.1": str = "元旦"; break;
            case "2.14": str = "情人"; break;
            case "3.8": str = "妇女"; break;
            case "5.1": str = "劳动"; break;
            case "6.1": str = "儿童"; break;
            case "8.1": str = "建军"; break;
            case "9.10": str = "教师"; break;
            case "10.1": str = "国庆"; break;
            case "12.24": str = "平安"; break;
            case "12.25": str = "圣诞"; break;
            default: str = n; break;
        }
        return str;
    };
    var config = {
        skinCell:"jedateblue",
        initAddVal:[0],
        format:"YYYY-MM-DD hh:mm:ss", //日期格式
        minDate:"1900-01-01 00:00:00", //最小日期
        maxDate:"2099-12-31 23:59:59", //最大日期
        startMin:"", //清除日期后返回到预设的最小日期
        startMax:""  //清除日期后返回到预设的最大日期
    };
    jeDt.index = Math.floor(Math.random() * 9e3);
    jeDt.boxCell = "#jedatebox";
    jeDt.find = function(tagName){ return QD(jeDt.boxCell + " " +tagName); };
    jeDt.isBool = function(obj){  return (obj == undefined || obj == true ?  true : false); };
    jeDt.addDateTime = function(time,num,type,format){
        var ishhmm = jeDt.checkFormat(format).substring(0, 5) == "hh-mm" ? true :false;
        var nocharDate = ishhmm ? time.replace(/^(\d{2})(?=\d)/g,"$1,") : time.substr(0,4).replace(/^(\d{4})/g,"$1,") + time.substr(4).replace(/^(\d{2})(?=\d)/g,"$1,");
        var tarr = jeDt.IsNum(time) ? nocharDate.match(ymdMacth) : time.match(ymdMacth), date = new Date(),
            tm0 = parseInt(tarr[0]),  tm1 = tarr[1] == undefined ? date.getMonth() + 1 : parseInt(tarr[1]), tm2 = tarr[2] == undefined ? date.getDate() : parseInt(tarr[2]),
            tm3 = tarr[3] == undefined ? date.getHours() : parseInt(tarr[3]), tm4 = tarr[4] == undefined ? date.getMinutes() : parseInt(tarr[4]), tm5 = tarr[5] == undefined ? date.getMinutes() : parseInt(tarr[5]);
        var newDate = new Date(tm0,jeDt.digit(tm1)-1,(type == "DD" ? tm2 + num : tm2),(type == "hh" ? tm3 + num : tm3),(type == "mm" ? tm4 + num : tm4),jeDt.digit(tm5));
        return jeDt.parse([ newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate() ], [ newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ], format);
    }
    //初始化控件
    jeDt.initDate = function(opts) {
        var even = jeDt.event? jeDt.event: window.event, target, isinitVal = (opts.isinitVal == undefined || opts.isinitVal == false) ? false : true;
        //创建控件骨架外层
        var createDiv = function(disCell, self) {
            if (QD(self)[0]) return;
            jeDt.opts = opts, jeDt.format = opts.format || config.format, minTime = jeDt.opts.minDate || config.minDate, maxTime = jeDt.opts.maxDate || config.maxDate;
            jeDt.fixed = jeDt.isBool(opts.fixed);
            if(/\YYYY-MM-DD/.test(jeDt.checkFormat(jeDt.format))){
                jeDt.checkDate(minTime) ? jeDt.minDate = minTime : alert("最小日期不合法");
                jeDt.checkDate(maxTime) ? jeDt.maxDate = maxTime : alert("最大日期不合法");
            }else{
                jeDt.minDate = minTime, jeDt.maxDate = maxTime;
            }
            var dateDiv = doc.createElement("div"), zIndex = opts.zIndex == undefined ? 2099 : opts.zIndex;
            dateDiv.className = "jedatebox "+(jeDt.opts.skinCell || config.skinCell);
            dateDiv.id = jeDt.boxCell.replace(/\#/g,"");
            jeDt.attr(dateDiv, "author","chen guojun--www.jayui.com--version:"+jeDate.version+"");
            if(opts.isDisplay) jeDt.attr(dateDiv, "date", true);
            dateDiv.style.cssText = "z-index:" + zIndex + ";position:" + (jeDt.fixed == true ? "absolute" :"fixed") + ";display:block;";
            disCell.appendChild(dateDiv);
        }, initVals = function(elem) {
            var jeformat = opts.format || config.format, inaddVal = opts.initAddVal || config.initAddVal, num, type;
            if(inaddVal.length == 1){
                num = inaddVal[0], type = "DD";
            }else{
                num = inaddVal[0], type = inaddVal[1];
            }
            var nowDateVal = jeDt.nowDate(0, jeformat), jeaddDate = jeDt.addDateTime(nowDateVal, num, type, jeformat);
            (jeDt.val(elem) || jeDt.text(elem)) == "" ? jeDt.isValHtml(elem) ? jeDt.val(elem, jeaddDate) :jeDt.text(elem, jeaddDate) :jeDt.isValHtml(elem) ? jeDt.val(elem) : jeDt.text(elem);
        };
        //为开启初始化的时间设置值
        if (isinitVal) {
            jeDt.each(QD("body "+ opts.dateCell), function(i, elem) {
                initVals(elem);
            });
        }
        if (even) {
            jeDt.stopmp(even);
            createDiv(doc.body, jeDt.boxCell);
            jeDt.elemCell = typeof (opts.dateCell) == "string" ? QD(opts.dateCell)[0] : opts.dateCell;
            jeDt.setHtml();
        } else {
            jeDt.bind(QD(opts.dateCell), "click", function (ev) {
                jeDt.stopmp(ev);
                createDiv(doc.body, jeDt.boxCell);
                jeDt.elemCell = this;
                jeDt.setHtml();
            });
        };
    };
    //方位辨别
    jeDt.orien = function(obj, self, pos) {
        var tops, leris, ortop, orleri, rect = jeDt.fixed ? self.getBoundingClientRect() : obj.getBoundingClientRect();
        if(jeDt.fixed) {
            leris = rect.right + obj.offsetWidth / 1.5 >= jeDt.winarea(1) ? rect.right - obj.offsetWidth : rect.left + (pos ? 0 : jeDt.docScroll(1));
            tops = rect.bottom + obj.offsetHeight / 1 <= jeDt.winarea() ? rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight - 1 : jeDt.winarea() - obj.offsetHeight;
            ortop = Math.max(tops + (pos ? 0 :jeDt.docScroll()) + 1, 1) + "px", orleri = leris + "px";
        }else{
            ortop = "50%", orleri = "50%";
            obj.style.marginTop = -(rect.height / 2) + "px";
            obj.style.marginLeft = -(rect.width / 2) + "px";
        }
        obj.style.top = ortop;
        obj.style.left = orleri;
    };
    //关闭层
    jeDt.dateClose = function() {
        doc.body.removeChild(QD(jeDt.boxCell)[0]);
    };
    //布局控件骨架
    jeDt.setHtml = function(){
        var weekHtml = "", tmsArr = "", date = new Date(),  dateFormat = jeDt.checkFormat(jeDt.format),
            isYYMM = (dateFormat == "YYYY-MM" || dateFormat == "YYYY") ? true :false,  ishhmm = dateFormat.substring(0, 5) == "hh-mm" ? true :false;
        if ((jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "") {
            tmsArr = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
            jeDt.currDate = new Date(tmsArr[0], parseInt(tmsArr[1])-1, tmsArr[2], tmsArr[3], tmsArr[4], tmsArr[5]);
            jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
        } else {
            var initVal = jeDt.isValHtml(jeDt.elemCell) ? jeDt.val(jeDt.elemCell) : jeDt.text(jeDt.elemCell);
            //对获取到日期的进行替换
            var nocharDate = ishhmm ? initVal.replace(/^(\d{2})(?=\d)/g,"$1,") : initVal.substr(0,4).replace(/^(\d{4})/g,"$1,") + initVal.substr(4).replace(/^(\d{2})(?=\d)/g,"$1,");
            //判断是否为数字类型，并分割
            var inVals = jeDt.IsNum(initVal) ? nocharDate.match(ymdMacth) : initVal.match(ymdMacth);
            if(ishhmm){
                tmsArr = dateFormat == "hh-mm" ? [ inVals[0], inVals[1], date.getSeconds() ] :[ inVals[0], inVals[1], inVals[2] ];
                jeDt.currDate = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
            }else{
                tmsArr = [ inVals[0], inVals[1], inVals[2], inVals[3] == undefined ? date.getHours() : inVals[3], inVals[4] == undefined ? date.getMinutes() : inVals[4], inVals[5] == undefined ? date.getSeconds() :inVals[5] ];
                jeDt.currDate = new Date(tmsArr[0], parseInt(tmsArr[1])-1,  tmsArr[2], tmsArr[3], tmsArr[4], tmsArr[5]);
                jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
            }
        }
        jeDt.currMonth = tmsArr[1], jeDt.currDays = tmsArr[2];
        //控件HMTL模板
        var datetopStr = '<div class="jedatetop">' + (!isYYMM ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>') + "</div>";
        var dateymList = !isYYMM ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&lt;&lt;</span><span class="jedateymchri">&gt;&gt;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :(dateFormat == "YYYY" ? '<ul class="jedayy"></ul>' :　'<ul class="jedaym"></ul>');
        var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
        var bothmsStr = !isYYMM ? '<div class="botflex jedatehmsshde"><ul class="jedatehms"><li><input type="text" /></li><i>:</i><li><input type="text" /></li><i>:</i><li><input type="text" /></li></ul></div>' + '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">今天</span><span class="jedateclear">清空</span></div>' :(dateFormat == "YYYY" ? '<div class="botflex jedatebtn"><span class="jedateok" style="width:47.8%">确认</span><span class="jedateclear" style="width:47.8%">清空</span></div>' : '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">本月</span><span class="jedateclear">清空</span></div>');
        var datebotStr = '<div class="jedatebot">' + bothmsStr + "</div>";
        var datehmschoose = '<div class="jedateprophms ' + (ishhmm ? "jedatepropfix" :"jedateproppos") + '"><div class="jedatepropcon"><div class="jedatehmstitle">时间选择<div class="jedatehmsclose">&times;</div></div><div class="jedateproptext">小时</div><div class="jedateproptext">分钟</div><div class="jedateproptext">秒数</div><div class="jedatehmscon jedateprophours"></div><div class="jedatehmscon jedatepropminutes"></div><div class="jedatehmscon jedatepropseconds"></div></div></div>';
        var dateHtmStr = isYYMM ? datetopStr + dateymList + datebotStr :ishhmm ? datetopStr + datehmschoose + datebotStr :datetopStr + dateymList + dateriList + datehmschoose + datebotStr;
        jeDt.html(QD(jeDt.boxCell)[0], dateHtmStr);
        //是否显示清除按钮
        jeDt.isBool(jeDt.opts.isClear) ? "" : jeDt.isShow(jeDt.find(".jedatebot .jedateclear")[0], false);
        //是否显示今天按钮
        if(!isYYMM){
            jeDt.isBool(jeDt.opts.isToday) ? "" : jeDt.isShow(jeDt.find(".jedatebot .jedatetodaymonth")[0], false);
        };
        //判断是否有时分秒
        if(/\hh-mm/.test(dateFormat)){
            var isTimehms = function(bool) {
                if(jeDt.val(jeDt.elemCell) != "" || jeDt.text(jeDt.elemCell) != "") {
                    var hmsArrs = bool ? [ tmsArr[0], tmsArr[1], tmsArr[2] ] : [ tmsArr[3], tmsArr[4], tmsArr[5] ];
                }else{
                    var hmsArrs =  [ jeDt.currDate.getHours(), jeDt.currDate.getMinutes(), jeDt.currDate.getSeconds() ];
                }
                jeDt.each(jeDt.find(".jedatebot .jedatehms input"), function(i, cls) {
                    jeDt.val(cls, jeDt.digit(hmsArrs[i]));
                    jeDt.isBool(jeDt.opts.ishmsVal) ? "" : jeDt.attr(cls, "readOnly",'true');
                });
            };
            if(ishhmm){
                isTimehms(true);
                jeDt.text(jeDt.find(".jedateyear")[0], jeDt.currDate.getFullYear() + '年').text(jeDt.find(".jedatemonth")[0], jeDt.digit(jeDt.currDate.getMonth() + 1) + '月');
            }else{
                if(jeDt.isBool(jeDt.opts.isTime)){
                    isTimehms(false);
                }else{
                    jeDt.isShow(jeDt.find(".jedatebot .jedatehmsshde")[0], false);
                    jeDt.find(".jedatebot .jedatebtn")[0].style.width = "100%";
                }
            }
        }else{
            if (!isYYMM) jeDt.isShow(jeDt.find(".jedatebot .jedatehmsshde")[0], false);
            jeDt.find(".jedatebot .jedatebtn")[0].style.width = "100%";
        };
        //判断是否为年月类型
        if(/\YYYY-MM-DD/.test(dateFormat)){
            jeDt.each(jeDt.weeks, function(i, week) {
                weekHtml += '<li class="weeks" data-week="' + week + '">' + week + "</li>";
            });
            jeDt.each(jeDt.find(".jedaol"), function(i, elem) {
                jeDt.html(elem, weekHtml);
            });
            jeDt.createDaysHtml(jeDt.currDate.getFullYear(), jeDt.currDate.getMonth()+1);
            jeDt.chooseYM();
        };
        if(isYYMM){
            var monthCls = jeDt.find(".jedateym .jedateyearmonth")[0];
            if(dateFormat == "YYYY"){
                jeDt.attr(monthCls, "data-onyy",tmsArr[0]);
                jeDt.text(monthCls, tmsArr[0] + "年");
                jeDt.html(jeDt.find(".jedayy")[0], jeDt.onlyYear(tmsArr[0]));
            }else{
                jeDt.attr(monthCls, "data-onym",tmsArr[0]+"-"+jeDt.digit(tmsArr[1]));
                jeDt.text(monthCls, tmsArr[0] + "年" + parseInt(tmsArr[1]) + "月");
                jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(tmsArr[0], parseInt(tmsArr[1])));
            }
            jeDt.onlyYMevents(tmsArr);
        }
        jeDt.orien(QD(jeDt.boxCell)[0], jeDt.elemCell);
        setTimeout(function () {
            jeDt.opts.success && jeDt.opts.success(jeDt.elemCell);
        }, 2);
        jeDt.events(tmsArr);
    }
    //循环生成日历
    jeDt.createDaysHtml = function(ys, ms){
        var year = parseInt(ys), month = parseInt(ms), dateHtml = "",count = 0;
        var minArr = jeDt.minDate.match(ymdMacth), minNum = minArr[0] + minArr[1] + minArr[2],
            maxArr = jeDt.maxDate.match(ymdMacth), maxNum = maxArr[0] + maxArr[1] + maxArr[2];
        jeDt.html(jeDt.find(".jedaul")[0], ""); //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
        var firstWeek = new Date(year, month - 1, 1).getDay() || 7,
            daysNum = jeDt.getDaysNum(year, month), prevM = jeDt.getPrevMonth(year, month),
            prevDaysNum = jeDt.getDaysNum(year, prevM.m), nextM = jeDt.getNextMonth(year, month),
            currOne = jeDt.currDate.getFullYear() + "-" + jeDt.digit(jeDt.currDate.getMonth() + 1) + "-" + jeDt.digit(1),
            thisOne = year + "-" + jeDt.digit(month) + "-" + jeDt.digit(1);
        jeDt.attr(jeDt.find(".jedateyear")[0], "year", year), jeDt.text(jeDt.find(".jedateyear")[0], year + '年');
        jeDt.attr(jeDt.find(".jedatemonth")[0], "month", month), jeDt.text(jeDt.find(".jedatemonth")[0], month + '月');
        //设置时间标注
        var mark = function (my, mm, md) {
            var Marks = jeDt.opts.marks, contains = function(arr, obj) {
                var len = arr.length;
                while (len--) {
                    if (arr[len] === obj) return true;
                }
                return false;
            };
            return jeDt.isType(Marks, "array") && Marks.length > 0 && contains(Marks, my + "-" + jeDt.digit(mm) + "-" + jeDt.digit(md)) ? '<i class="marks"></i>' :"";
        }
        //是否显示节日
        var isfestival = function(fmd, fd) {
            return jeDt.opts.festival ? jeDt.festival(fmd, fd) : fd;
        };
        //判断是否在限制的日期之中
        var dateOfLimit = function(Y, M, D, isMonth){
            var thatNum = (Y + "-" + jeDt.digit(M) + "-" + jeDt.digit(D)).replace(/\-/g, '');
            if(isMonth){
                if (parseInt(thatNum) >= parseInt(minNum) && parseInt(thatNum) <= parseInt(maxNum)) return true;
            }else {
                if (parseInt(minNum) > parseInt(thatNum) || parseInt(maxNum) < parseInt(thatNum)) return true;
            }
        }
        //上一月剩余天数
        for (var p = prevDaysNum - firstWeek + 1; p <= prevDaysNum; p++, count++) {
            var pmark = mark(prevM.y,prevM.m,p), pCls = dateOfLimit(prevM.y, prevM.m, p, false) ? "disabled" : "other";
            dateHtml += '<li year="'+prevM.y+'" month="'+prevM.m+'" day="'+p+'" class='+pCls+'>'+(isfestival(prevM.m+"."+p,p) + pmark)+'</li>';
        }
        //本月的天数
        for(var b = 1; b <= daysNum; b++, count++){
            var bCls = "", bmark = mark(year,month,b),
                thisDate = (year + "-" + jeDt.digit(month) + "-" + jeDt.digit(b)); //本月当前日期
            if(dateOfLimit(year, month, b, true)){
                bCls = jeDt.ymdDate == thisDate ? "action" : (currOne != thisOne && thisOne == thisDate ? "action" : "")
            }else{
                bCls = "disabled";
            }
            dateHtml += '<li year="'+year+'" month="'+month+'" day="'+b+'" '+(bCls != "" ? "class="+bCls+"" : "")+'>'+(isfestival(month+"."+b,b) + bmark)+'</li>';
        }
        //下一月开始天数
        for(var n = 1, nlen = 42 - count; n <= nlen; n++){
            var nmark = mark(nextM.y,nextM.m,n), nCls = dateOfLimit(nextM.y, nextM.m, n, false) ? "disabled" : "other";
            dateHtml += '<li year="'+nextM.y+'" month="'+nextM.m+'" day="'+n+'" class='+nCls+'>'+(isfestival(nextM.m+"."+n,n) + nmark)+'</li>';
        }
        //把日期拼接起来并插入
        jeDt.html(jeDt.find(".jedaul")[0],dateHtml);
        jeDt.chooseDays();
    }
    //循环生成年月（YYYY-MM）
    jeDt.onlyYMStr = function(y, m) {
        var onlyYM = "";
        jeDt.each(jeDt.montharr, function(i, val) {
            var minArr = jeDt.parseMatch(jeDt.minDate), maxArr = jeDt.parseMatch(jeDt.maxDate),
                thisDate = new Date(y, jeDt.digit(val), "01"), minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]);
            if (thisDate < minTime || thisDate > maxTime) {
                onlyYM += "<li class='disabled' ym='" + y + "-" + jeDt.digit(val) + "'>" + y + "年" + jeDt.digit(val) + "月</li>";
            } else {
                onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' ym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            }
        });
        return onlyYM;
    };
    //循环生成年（YYYY）
    jeDt.onlyYear = function(YY) {
        var onlyStr = "";   jeDt.yearArr = new Array(15);
        jeDt.each(jeDt.yearArr, function(i) {
            var minArr = jeDt.parseMatch(jeDt.minDate), maxArr = jeDt.parseMatch(jeDt.maxDate),
                minY = minArr[0], maxY = maxArr[0], yyi = YY - 7 + i,
                getyear = jeDt.attr(jeDt.find(".jedateym .jedateyearmonth")[0], "data-onyy");
            if (yyi < minY || yyi > maxY) {
                onlyStr += "<li class='disabled' yy='" + yyi + "'>" + yyi + "年</li>";
            } else {
                onlyStr += "<li "+(getyear == yyi ? 'class="action"' : "")+" yy='" + yyi + "'>" + yyi + "年</li>";
            }
        });
        return onlyStr;
    };
    //生成定位时分秒
    jeDt.setStrhms = function() {
        var parseFormat = jeDt.format, hmsArr = [], hmsliCls = jeDt.find(".jedatehms li"),
            proptextCls = jeDt.find(".jedatepropcon .jedateproptext"), propconCls = jeDt.find(".jedatepropcon .jedatehmscon");
        var parsehms = function(str) {
            var ymdstr = str.match(ymdMacth).join("-"), timeArr = ymdstr == "YYYY-MM-DD-hh-mm" ? str.split(" ") : ymdstr,
                isHMtime = ymdstr == "YYYY-MM-DD-hh-mm" ? timeArr[1] :timeArr;
            return isHMtime.match(ymdMacth).join("-");
        };
        var parmathm = parsehms(parseFormat) == "hh-mm";
        if(parmathm){
            var hmsliWidth = jeDt.getStyle(hmsliCls[0],'width').replace(/\px|em|rem/g,''), hmsiW = jeDt.getStyle(jeDt.find(".jedatehms i")[0],'width').replace(/\px|em|rem/g,''),
                hmschoseW = jeDt.getStyle(proptextCls[0],'width').replace(/\px|em|rem/g,''), hmslival = Math.round(parseInt(hmsliWidth) + parseInt(hmsliWidth)/2 + parseInt(hmsiW)/2);
            hmsliCls[0].style.width = hmsliCls[1].style.width = hmslival + "px";
            proptextCls[0].style.width = proptextCls[1].style.width = propconCls[0].style.width = propconCls[1].style.width = Math.round(parseInt(hmschoseW) + parseInt(hmschoseW)/2 + 2) + "px";
        }
        //生成时分秒
        jeDt.each([ 24, 60, 60 ], function(i, len) {
            var hmsStr = "", hmsCls = "", inputCls = jeDt.find(".jedatehms input"), textem = jeDt.val(inputCls[i]);
            jeDt.attr(inputCls[i],"maxlength",2).attr(inputCls[i],"numval",len-1).attr(inputCls[i],"item",i);
            for (var h = 0; h < len; h++) {
                h = jeDt.digit(h);
                if (jeDt.opts.ishmsLimit) {
                    hmsCls = h < textem ? "disabled" :h == textem ? "action" :"";
                } else {
                    hmsCls = parmathm && i == 2 ? textem == h ? "disabled action" :"disabled" :textem == h ? "action" :"";
                    if(parmathm && i == 2){
                        var readCls = hmsliCls[2];
                        readCls.style.display = readCls.previousSibling.style.display = "none";
                        proptextCls[i].style.display = propconCls[i].style.display = "none";
                    }
                }
                hmsStr += '<p class="' + hmsCls + '">' + h + "</p>";
            }
            hmsArr.push(hmsStr);
        });
        return hmsArr;
    };
    //仅年月情况下的点击
    jeDt.onlyYMevents = function(tmsArr) {
        var ymVal, ymPre = jeDt.find(".jedateym .ymprev"), ymNext = jeDt.find(".jedateym .ymnext"), ony = parseInt(tmsArr[0]), onm = parseFloat(tmsArr[1]);
        jeDt.each([ ymPre, ymNext ], function(i, cls) {
            jeDt.bind(cls, "click", function(ev) {
                jeDt.stopmp(ev);
                if(jeDt.checkFormat(jeDt.format) == "YYYY"){
                    ymVal = cls == ymPre ? jeDt.attr(jeDt.find(".jedayy li")[0], "yy") : jeDt.attr(jeDt.find(".jedayy li")[jeDt.yearArr.length-1], "yy");
                    jeDt.html(jeDt.find(".jedayy")[0], jeDt.onlyYear(parseInt(ymVal)));
                }else{
                    ymVal = cls == ymPre ? ony -= 1 :ony += 1;
                    jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(ymVal, onm));
                }
                jeDt.ymPremNextEvents();
            });
        });
    };
    //选择日期
    jeDt.chooseDays = function() {
        jeDt.bind(jeDt.find(".jedaul li"), "click", function(ev) {
            var that = this, liTms = [], valcell = jeDt.elemCell;
            if (jeDt.hasClass(that, "disabled")) return;
            jeDt.stopmp(ev);
            jeDt.each(jeDt.find(".jedatehms input"), function(i, val) {
                liTms.push(jeDt.val(val));
            });
            var aty = parseInt(jeDt.attr(that, "year")), atm = parseFloat(jeDt.attr(that, "month")), atd = parseFloat(jeDt.attr(that, "day")),
                getDateVal = jeDt.parse([ aty, atm, atd ], [ liTms[0], liTms[1], liTms[2] ], jeDt.format);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, getDateVal) :jeDt.text(valcell, getDateVal);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun&&jeDt.opts.choosefun(jeDt.elemCell,getDateVal);
        });
    };
    //下拉选择年和月
    jeDt.chooseYM = function() {
        var jetopym = jeDt.find(".jedatetopym"), jedateyy = jeDt.find(".jedateyy"), jedatemm = jeDt.find(".jedatemm"), jedateyear = jeDt.find(".jedateyy .jedateyear"),
            jedatemonth = jeDt.find(".jedatemm .jedatemonth"), mchri = jeDt.find(".jedateymchri"), mchle = jeDt.find(".jedateymchle"),
            ishhmmss = jeDt.checkFormat(jeDt.format).substring(0, 5) == "hh-mm" ? true :false;
        //循环生成年
        function eachYears(YY) {
            var eachStr = "";
            jeDt.each(new Array(15), function(i) {
                if (i === 7) {
                    var getyear = jeDt.attr(jedateyear[0], "year");
                    eachStr += "<li " + (getyear == YY ? 'class="action"' :"") + ' yy="' + YY + '">' + YY + "年</li>";
                } else {
                    eachStr += '<li yy="' + (YY - 7 + i) + '">' + (YY - 7 + i) + "年</li>";
                }
            });
            return eachStr;
        }
        //循环生成月
        function eachYearMonth(YY, ymlen) {
            var ymStr = "";
            if (ymlen == 12) {
                jeDt.each(jeDt.montharr, function(i, val) {
                    var getmonth = jeDt.attr(jedatemonth[0], "month"), val = jeDt.digit(val);
                    ymStr += "<li " + (jeDt.digit(getmonth) == val ? 'class="action"' :"") + ' mm="' + val + '">' + val + "月</li>";
                });
                jeDt.each([ mchri, mchle ], function(c, cls) {
                    jeDt.isShow(cls[0], false);
                });
            } else {
                ymStr = eachYears(YY);
                jeDt.each([ mchri, mchle ], function(c, cls) {
                    jeDt.isShow(cls[0], true);
                });
            }
            jeDt.removeClass(jetopym[0], ymlen == 12 ? "jedatesety" :"jedatesetm").addClass(jetopym[0], ymlen == 12 ? "jedatesetm" :"jedatesety");
            jeDt.html(jeDt.find(".jedatetopym .ymdropul")[0], ymStr);
            jeDt.isShow(jetopym[0], true);
        }
        function clickLiYears(year) {
            jeDt.bind(jeDt.find(".ymdropul li"), "click", function(ev) {
                var Years = jeDt.attr(this, "yy"), Months = parseInt(jeDt.attr(jedatemonth[0], "month"));
                jeDt.attr(year, "year", Years);
                jeDt.html(year, Years + '年');
                jeDt.isShow(jetopym[0], false);
                jeDt.createDaysHtml(Years, Months);
            });
        }
        //下拉选择年
        !ishhmmss && jeDt.bind(jedateyy, "click", function() {
            var YMlen = parseInt(jeDt.attr(this, "ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "year"));
            eachYearMonth(yearAttr, YMlen);
            clickLiYears(jedateyear[0]);
        });
        //下拉选择月
        !ishhmmss && jeDt.bind(jedatemm, "click", function() {
            var YMlen = parseInt(jeDt.attr(this, "ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "year"));
            eachYearMonth(yearAttr, YMlen);
            jeDt.bind(jeDt.find(".ymdropul li"), "click", function(ev) {
                var Years = jeDt.attr(jedateyear[0], "year"), Months = parseInt(jeDt.attr(this, "mm"));
                jeDt.attr(jedatemonth[0], "month", Months);
                jeDt.html(jedatemonth[0], Months + '月');
                jeDt.isShow(jetopym[0], false);
                jeDt.createDaysHtml(Years, Months);
            });
        });
        //关闭下拉选择
        jeDt.bind(jeDt.find(".jedateymchok"), "click", function(ev) {
            jeDt.stopmp(ev);
            jeDt.isShow(jetopym[0], false);
        });
        var yearMch = parseInt(jeDt.attr(jedateyear[0], "year"));
        jeDt.each([ mchle, mchri ], function(d, cls) {
            jeDt.bind(cls, "click", function(ev) {
                jeDt.stopmp(ev);
                d == 0 ? yearMch -= 15 :yearMch += 15;
                var mchStr = eachYears(yearMch);
                jeDt.html(jeDt.find(".jedatetopym .ymdropul")[0], mchStr);
                clickLiYears(jedateyear[0]);
            });
        });
    };
    //年月情况下的事件绑定
    jeDt.ymPremNextEvents = function(){
        var newDate = new Date(), valcell = jeDt.elemCell, isYY = (jeDt.checkFormat(jeDt.format) == "YYYY"), ymCls = isYY ? jeDt.find(".jedayy li") : jeDt.find(".jedaym li");
        //选择年月
        jeDt.bind(ymCls, "click", function (ev) {
            var that = this;
            if (jeDt.hasClass(that, "disabled")) return;    //判断是否为禁选状态
            jeDt.stopmp(ev);
            var atYM =  isYY ? jeDt.attr(that, "yy").match(ymdMacth) : jeDt.attr(that, "ym").match(ymdMacth),
                getYMDate = isYY ? jeDt.parse([atYM[0], newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format) : jeDt.parse([atYM[0], atYM[1], 1], [0, 0, 0], jeDt.format);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, getYMDate) : jeDt.text(valcell, getYMDate);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell, getYMDate);
        });
    }
    //各种事件绑定
    jeDt.events = function(tmsArr) {
        var newDate = new Date(), yPre = jeDt.find(".yearprev"), yNext = jeDt.find(".yearnext"),
            mPre = jeDt.find(".monthprev"), mNext = jeDt.find(".monthnext"),
            jedateyear = jeDt.find(".jedateyear"), jedatemonth = jeDt.find(".jedatemonth"),
            isYYMM = (jeDt.checkFormat(jeDt.format) == "YYYY-MM" || jeDt.checkFormat(jeDt.format) == "YYYY") ? true :false,
            ishhmmss = jeDt.checkFormat(jeDt.format).substring(0, 5) == "hh-mm" ? true :false;
        if (!isYYMM) {
            //切换年
            !ishhmmss && jeDt.each([ yPre, yNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var year = parseInt(jeDt.attr(jedateyear[0], "year")), month = parseInt(jeDt.attr(jedatemonth[0], "month")),
                        pnYear = cls == yPre ? --year : ++year, PrevYM = jeDt.getPrevMonth(pnYear, month), NextYM = jeDt.getNextMonth(pnYear, month);
                    cls == yPre ? jeDt.createDaysHtml(PrevYM.y, month) : jeDt.createDaysHtml(NextYM.y, month);
                });
            });
            //切换月
            !ishhmmss && jeDt.each([ mPre, mNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var year = parseInt(jeDt.attr(jedateyear[0], "year")), month = parseInt(jeDt.attr(jedatemonth[0], "month")),
                        PrevYM = jeDt.getPrevMonth(year, month), NextYM = jeDt.getNextMonth(year, month);
                    cls == mPre ? jeDt.createDaysHtml(PrevYM.y, PrevYM.m) : jeDt.createDaysHtml(NextYM.y, NextYM.m);
                });
            });
            //时分秒事件绑定
            var hmsStr = jeDt.setStrhms(), hmsevents = function(hmsArr) {
                jeDt.each(hmsArr, function(i, hmsCls) {
                    if (jeDt.html(hmsCls[0]) == "") jeDt.html(hmsCls[0], hmsStr[i]);
                });
                if (ishhmmss) {
                    jeDt.isShow(jeDt.find(".jedatehmsclose")[0], false);
                    jeDt.isShow(jeDt.find(".jedatetodaymonth")[0], false);
                } else {
                    jeDt.isShow(jeDt.find(".jedateprophms")[0], true);
                }
                //计算当前时分秒的位置
                jeDt.each([ "hours", "minutes", "seconds" ], function(i, hms) {
                    var hmsCls = jeDt.find(".jedateprop" + hms), achmsCls = jeDt.find(".jedateprop"+hms+" .action");
                    hmsCls[0].scrollTop = achmsCls[0].offsetTop - 118;
                    var onhmsPCls = jeDt.find(".jedateprop" + hms + " p");
                    jeDt.bind(onhmsPCls, "click", function() {
                        var that = this;
                        if (jeDt.hasClass(that, "disabled")) return;
                        jeDt.each(onhmsPCls, function(j, cls) {
                            jeDt.removeClass(cls, "action");
                        })
                        jeDt.addClass(that, "action");
                        jeDt.val(jeDt.find(".jedatebot .jedatehms input")[i], jeDt.digit(jeDt.text(that)));
                        if (!ishhmmss) jeDt.isShow(jeDt.find(".jedateprophms")[0], false);
                    });
                });
            };
            var hs = jeDt.find(".jedateprophours"), ms = jeDt.find(".jedatepropminutes"), ss = jeDt.find(".jedatepropseconds");
            if (ishhmmss) {
                hmsevents([ hs, ms, ss ]);
            } else {
                jeDt.bind(jeDt.find(".jedatehms"), "click", function() {
                    if (jeDt.find(".jedateprophms")[0].style.display !== "block") hmsevents([ hs, ms, ss ]);
                    //关闭时分秒层
                    jeDt.bind(jeDt.find(".jedateprophms .jedatehmsclose"), "click", function() {
                        jeDt.isShow(jeDt.find(".jedateprophms")[0], false);
                    });
                });
            }
            //今天按钮设置日期时间
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function() {
                var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ],
                    gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], jeDt.format),
                    valcell = jeDt.elemCell;
                jeDt.createDaysHtml(toTime[0], toTime[1]);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, gettoDate) :jeDt.text(valcell, gettoDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,gettoDate);
                if (!isYYMM) jeDt.chooseDays();
            });
        }else{
            var valcell = jeDt.elemCell;
            jeDt.ymPremNextEvents();
            //本月按钮设置日期时间
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function(ev) {
                jeDt.stopmp(ev);
                var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() ],
                    YMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], jeDt.format);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, YMDate) :jeDt.text(valcell, YMDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,YMDate);
            });
        }
        //检查时间输入值，并对应到相应位置
        jeDt.bind(jeDt.find(".jedatehms input"), "keyup", function() {
            var that = this, thatval = that.value, hmsVal = parseInt(jeDt.attr(that, "numval")), thatitem = parseInt(jeDt.attr(that, "item"));
            jeDt.val(that, thatval.replace(/\D/g,""));
            //判断输入值是否大于所设值
            if(that.value > hmsVal){
                jeDt.val(that, hmsVal);
                alert("输入值不能大于"+hmsVal);
            }
            if(this.value == "") jeDt.val(that, "00");
            jeDt.each(jeDt.find(".jedatehmscon")[thatitem].childNodes,function(i,cls){
                jeDt.removeClass(cls,"action");
            })
            jeDt.addClass(jeDt.find(".jedatehmscon")[thatitem].childNodes[parseInt(that.value.replace(/^0/g,''))],"action");
            jeDt.each([ "hours", "minutes", "seconds" ], function(i, hms) {
                var hmsCls = jeDt.find(".jedateprop" + hms), achmsCls = jeDt.find(".jedateprop" + hms + " .action");
                hmsCls[0].scrollTop = achmsCls[0].offsetTop - 118;
            });
        });
        //清空按钮清空日期时间
        jeDt.bind(jeDt.find(".jedatebot .jedateclear"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, clearVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, "") :jeDt.text(valcell, "");
            jeDt.dateClose();
            if (clearVal != "") {
                if (jeDt.isBool(jeDt.opts.clearRestore)){
                    jeDt.opts.minDate = jeDt.opts.startMin || config.startMin;
                    jeDt.opts.maxDate = jeDt.opts.startMax || config.startMax;
                }
                if (jeDt.isType(jeDt.opts.clearfun, "function") || jeDt.opts.clearfun != null) jeDt.opts.clearfun(jeDt.elemCell,clearVal);
            }
        });
        //确认按钮设置日期时间
        jeDt.bind(jeDt.find(".jedatebot .jedateok"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, isValtext = (jeDt.val(valcell) || jeDt.text(valcell)) != "", isYYYY = jeDt.checkFormat(jeDt.format) == "YYYY", okVal = "",
            //获取时分秒的数组
                eachhmsem = function() {
                    var hmsArr = [];
                    jeDt.each(jeDt.find(".jedatehms input"), function(l, emval) {
                        hmsArr.push(jeDt.val(emval));
                    });
                    return hmsArr;
                };
            if (isValtext) {
                var btnokVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell), oktms = btnokVal.match(ymdMacth);
                if (!isYYMM) {
                    var okTimeArr = eachhmsem(), okTime = [ parseInt(jeDt.attr(jedateyear[0], "year")), parseInt(jeDt.attr(jedatemonth[0], "month")), oktms[2] ];
                    okVal = isValtext ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], jeDt.format) :"";
                    if(!ishhmmss)jeDt.createDaysHtml(okTime[0], okTime[1]);
                    jeDt.chooseDays();
                } else {
                    var ymactCls = isYYYY ? jeDt.find(".jedayy .action")[0] : jeDt.find(".jedaym .action")[0];
                    //判断是否为（YYYY或YYYY-MM）类型
                    if(isYYYY){
                        var okDate = ymactCls ? jeDt.attr(ymactCls, "yy").match(ymdMacth) : oktms;
                        okVal = jeDt.parse([parseInt(okDate[0]), newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format);
                    }else {
                        var jedYM = ymactCls ? jeDt.attr(ymactCls, "ym").match(ymdMacth) : oktms;
                        okVal = jeDt.parse([parseInt(jedYM[0]), parseInt(jedYM[1]), 1], [0, 0, 0], jeDt.format);
                    }
                }
            } else {
                var okArr = eachhmsem(), monthCls = jeDt.find(".jedateyearmonth")[0], okDate = "";
                if (ishhmmss) {
                    okVal = jeDt.parse([ tmsArr[0], tmsArr[1], tmsArr[2] ], [ okArr[0], okArr[1], okArr[2] ], jeDt.format);
                } else {
                    if(isYYMM){
                        okDate = jeDt.checkFormat(jeDt.format) == "YYYY" ? jeDt.attr(monthCls, "data-onyy").match(ymdMacth) : jeDt.attr(monthCls, "data-onym").match(ymdMacth);
                    }else{
                        okDate = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
                    }
                    okVal = isYYYY ? jeDt.parse([parseInt(okDate[0]), newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format) :
                        jeDt.parse([parseInt(okDate[0]), parseInt(okDate[1]), newDate.getDate()], [okArr[0], okArr[1], okArr[2]], jeDt.format);
                }
            }
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.okfun, "function") || jeDt.opts.okfun != null) jeDt.opts.okfun(jeDt.elemCell,okVal);
        });
        //点击空白处隐藏
        jeDt.bind(document, "mouseup", function(ev) {
            jeDt.stopmp(ev);
            var box = QD(jeDt.boxCell)[0];
            if (box && box.style.display !== "none")  doc.body.removeChild(box);
        });
        jeDt.bind(QD(jeDt.boxCell), "mouseup", function(ev) {
            jeDt.stopmp(ev);
        });
    }
    //核心部分
    var jeDate = function(options) {
        try {
            jeDt.event = window.event ? window.event :jeDate.caller.arguments[0];
        } catch (e) {}
        return new jeDt.initDate(options || {});
    };
    //版本
    jeDate.version = "3.4";
    //返回指定日期
    jeDate.now = function(num) {
        return jeDt.nowDate(num);
    };
    //为当前获取到的日期加减天数，这里只能控制到天数，不能控制时分秒加减
    jeDate.addDate = function(time,num,type) {
        num = num | 0;   type = type || "DD";
        return jeDt.addDateTime(time,num,type,jeDt.format);
    };
    return jeDate;
});
});
define('Input',['Component','Lang','Boolean','Dialog','Tip'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');
	var Lang = require('Lang');
	var Boolean = require('Boolean');
	var Dialog = require('Dialog');
	var Tip = require('Tip');
	/** * 模块私有数据 ** */
	/** * 类定义 ** */
	var Input = function(configs) {
		// 类的属性定义
		//this.configs = $.extend(true, {}, defaults, configs);
		//this._className="";
		// 初始化
		//this.init();
	};
	// 类公共方法
	Input.prototype = {
		//初始化函数
		init:function(){
			this.label = Component.createLabel(this.configs);
			this.tip = Component.createTip(this.configs);
			// 控件封装
			this._input.addClass(this._className);
			// 控件类名设置
			Component.addClass(this._input, this.configs);
			// 控件样式设置
			Component.css(this._input, this.configs);
			// 控件默认值
			Component.val(this._input, this.configs);
			// 控件的属性设置
			Component.attr(this._input, this.configs);
			// 控件的事件绑定
			Component.bind(this._input, this.configs);
		},
		//检查函数
		check:function(){
			this._input.removeClass("sea_input_warning");
			if(this.configs.isNull==false){
				if($.trim(this._input.val())==""){
					this._input.addClass("sea_input_warning");
					this._input.parent().tip({content:Global.getI18N(this.configs.nullWarning)||Lang.nullwarning}).trigger("show");
					return false;
				}
			}
			if($.trim(this._input.val())==""){
				return true;
			}
			try{
				if(this.configs.len && this.configs.len!=""){
					var len= Number(this.configs.len);
					if(this._input.val().length>len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.maxLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
				if(this.configs.maxLen && this.configs.maxLen!=""){
					var len= Number(this.configs.maxLen);
					if(this._input.val().length>len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.maxLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
				if(this.configs.minLen && this.configs.minLen!=""){
					var len= Number(this.configs.minLen);
					if(this._input.val().length<len){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.minLen+len).tip({}).trigger("show");
						return false;
					}
				}
				
			}catch(e){}
			
			if(this.configs.limit){
				if(this.configs.limit=="date"){
					if(Boolean.isDate(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.date+"[YYYY-MM-DD]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="time"){
					if(Boolean.isTime(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.date+"[HH:MM:SS]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="datetime"){
					if(Boolean.isDateTime(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().attr("title",Lang.datetime+"[YYYY-MM-DD HH:MM:SS]").tip({}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="digits"){
					if(Boolean.isDigits(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.digits}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="money"){
					if(Boolean.isMoney(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.money}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="email"){
					if(Boolean.isEmail(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.email}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="number"){
					if(Boolean.isNumber(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.number}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="phone"){
					if(Boolean.isPhone(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.phone}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="mobile"){
					if(Boolean.isMobile(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.mobile}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="tel"){
					if(Boolean.isTel(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.tel}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="qq"){
					if(Boolean.isQq(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.qq}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="integer"||this.configs.limit=="int"){
					if(Boolean.isInteger(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["int"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="double"||this.configs.limit=="float"){
					if(Boolean.isDouble(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["double"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="post"){
					if(Boolean.isPostCode(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.post}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="url"){
					if(Boolean.isUrl(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.url}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="password"){
					if(Boolean.isPwd(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.password}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="char"){
					if(Boolean.isChar(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang["char"]}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="en"){
					if(Boolean.isEnglish(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.en}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="cardno"){
					if(Boolean.isIdCardNo(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.cardno}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="cn"){
					if(Boolean.isChinese(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.cn}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="chinesechar"){
					if(Boolean.isChineseChar(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.chinesechar}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="stringcheck"){
					if(Boolean.stringCheck(this._input.val())==false){
						this._input.addClass("sea_input_warning");
						this._input.parent().tip({content:Lang.stringcheck}).trigger("show");
						return false;
					}
				}else if(this.configs.limit=="stringfilter"){
					if(Boolean.stringFilter(this._input.val())==false){
						this._input.parent().tip({content:Lang.stringfilter}).trigger("show");
						this._input.addClass("sea_input_warning");
						return false;
					}
				}else if(this.configs.limit=="specialchar"){
					if(Boolean.isContainsSpecialChar(this._input.val())==false){
						this._input.parent().tip({content:Lang.specialchar}).trigger("show");
						this._input.addClass("sea_input_warning");
						return false;
					}
				}
			}
			return true;
		},
		//白盒测试函数
		test:function(data){
			
		},
		//值获取或赋值函数
		val:function(data){
			if(data!=null&&data!=undefined){
				data=data[this.configs.id];
				this._input.val(data);
			}else{ 
				return this._input.val();
			}
		},
		//清空函数
		clear:function(){
			this._input.val("");
		},
		//设置焦点
		focus:function(){
			return Component.focus(this._input);
		},
		//显示 
		show:function(){
			return Component.show(this._input);
		},
		//隐藏
		hide:function(){
			return Component.hide(this._input);
		},
		//禁用
		disabled:function(){
			return Component.disable(this._input);
		},
		//启用
		enabled:function(){
			return Component.enabled(this._input);
		}
	};
	/** * 输出类对象 ** */
	exports.create = function() {
		return new Input();
	};
});

define('Toolbar',['Component','Select','Textfield','CfgDictionary','File','File'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/toolbar.css");
	var Component = require('Component'); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			css : {},
			attr : {},
			separatorWidth:null
//			,items:[{
//				id : "",
//				value : "",
//				cls : "",
//				css : {},
//				cssLi:{},
//				attr : {},
//				icon:null,
//				events : {
//					//click : null
//				}
//			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.toolbar=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.toolbar);
			$.each(me.configs.items,function(index,item){
				var li=$("<li></li>").css(item.cssLi||{}).appendTo(ul);
				if(item.type){
					switch (item.type.toLowerCase()) {
					case "select":
						_Component = require('Select').create(item);
						if (_Component.label) {
							 li.append(_Component.label);
						}
						li.append( _Component.select);
						break;
					case "textfield":
						_Component = require('Textfield').create(item);
						if (_Component.label) {
							 li.append(_Component.label);
						}
						if(item.icon){
							li.append( _Component.textfieldIcon);
						}else{
							li.append( _Component.textfield);
						}
						break;
					case "dic":
						_Component = require('CfgDictionary').create(item);
						if (_Component.label) {
							 li.append(_Component.label);
						}
						li.append( _Component.dic);
						break;
					case "file":
						if(!item.path)	item.path="uploads/import";
						item.showImg=false;
						_Component = require('File').create(item).file.css({"display":"inline"});
						_Component.find("input[type!=button]").removeAttr("style").css({"display":"none"});
						_Component.find("input[type=button]").removeAttr("style").css({"margin-left":"10px","padding":"0 20px","background":"transparent url(app/css/images/import.png) no-repeat left center"}).val(item.value);
						li.append( _Component);
						break;
					case "msgfile":
						if(!item.path)	item.path="uploads/import";
						item.showImg=false;
						_Component = require('File').create(item).file.css({"display":"inline"});
						_Component.find("input[type!=button]").removeAttr("style").css({"display":"none"});
						_Component.find("input[type=button]").removeAttr("style").css({"height":"40px","margin-left":"10px","border":"0","padding":"5px 15px 5px 15px","background":"transparent url(app/css/images/msgfile.png) no-repeat left center"}).val(item.value);
						li.append( _Component);
						break;
					default:
						break;
					}
				}else if(item.icon){
					li.append("<button class='sea_button' type='button'><span style='display:inline-block' class='"+item.icon+"'></span>"+Global.getI18N(item.value||"")+"</button>");
				}else{
					li.append("<button class='sea_button' type='button'>"+Global.getI18N(item.value||"")+"</button>");
				}
				if(me.configs.align=="0"||me.configs.align=="horizontal"){
					li.css("display","inline");
					if(me.configs.separatorWidth)li.css("margin-ight",me.configs.separatorWidth);
				}else{
					if(me.configs.separatorWidth)li.css("margin-bottom",me.configs.separatorWidth);
				}
				var buttons=li.find("button");
				// 控件类名设置
				Component.addClass(buttons, item);
				// 控件样式设置
				Component.css(buttons, item);
				// 控件的属性设置
				Component.attr(buttons, item);
				// 控件的事件绑定
				Component.bind(buttons, item);
			});
			// 控件类名设置
			Component.addClass(me.toolbar, me.configs);
			// 控件样式设置
			Component.css(me.toolbar, me.configs);
			// 控件的属性设置
			Component.attr(me.toolbar, me.configs);
		}
	};
	/** * 类定义 ** */
	var Toolbar = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_toolbar";
		//初始化
		self.init(this);
	};
	// 类公共方法
	Toolbar.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Toolbar(configs);
	};
});
define('Pager',['Lang','Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/pager.css");
	var Lang = require('Lang');
	var Component = require('Component');
	/** * 模块私有数据 ** */
	var defaults = {
		cls : "sea_pager",
		pagerMode:"normal",//simple
		pageSizeArr:[20,50,100,200,500,1000],
		pageNav:5,
		pageSize:20,
		pageIndex:1,
		total:0,
		css : {},
		attr : {	},
		select:function(pageIndex,pageSize){}
	};
	/** * 模块私有方法 ** */
	var self = {
		html :function template(){
			var html = [] ;
			html.push('<table  cellspacing="0" cellpadding="0">');
			html.push('<tr>');
			html.push('<td class="totalpage">'+Lang["total"]+'<span class="sea_totalpage"></span>'+Lang["page"]+'/<span class="sea_rowCount"></span>'+Lang["record"]+'</span> &nbsp;&nbsp;&nbsp;'+Lang["each.page"]+'</td>');
			html.push('<td class="pageSize"><select class="sea_pageSize"></select></td>');
			html.push('<td class="jump" style="display:none;">'+Lang["item"]+' &nbsp;&nbsp;&nbsp;'+Lang["jump"]+'&nbsp;<span><input type="text" class="sea_jump" style="width:30px;text-align:center" value=""/></span>&nbsp;页&nbsp;&nbsp;&nbsp;</td>');
			html.push('<td class="firstpage">');
			html.push('<a href="#" class="sea_grid_pager_btn sea_firstpage" sea_pageIndex="first"><i class="iconfont icon-fast-backward"></i></a>');
			html.push('<a href="#" class="sea_grid_pager_btn sea_prepage" sea_pageIndex="pre"><i class="iconfont icon-backward"></i></a>');
			html.push('</td>');
			html.push('<td class="navig"><span class="sea_grid_navig"></span></td>');
			html.push('<td  class="lastpage">');
			html.push('<a href="#" class="sea_grid_pager_btn sea_nextpage" sea_pageIndex="next"><i class="iconfont icon-forward"></i>&nbsp;</a>');
			html.push('<a href="#" class="sea_grid_pager_btn sea_lastpage" sea_pageIndex="last"><i class="iconfont icon-fast-forward"></i>&nbsp;</a>');
			html.push('</td>');
			html.push('</tr>');
			html.push('</table>');
			return html.join('') ;
	  	},
	  	reader:function(me,pageIndex,pageSize,total){
	  		var totalPage=total % pageSize == 0? (total / pageSize): (Math.floor(total / pageSize) + 1);

			me.pager.find(".sea_totalpage").html(totalPage) ;
			me.pager.find(".sea_rowCount").html(total) ;
			me.pager.find(".sea_jump").val(pageIndex) ;
			
	  		var pageNav=me.configs.pageNav;
	  		var pageIndex=pageIndex;
			var middle = Math.floor(pageNav / 2);
			var start = (pageIndex - middle);
			if(start<1)start=1;
			var end = Number(start) + Number(pageNav - 1) ;
			if(end>totalPage) end=totalPage;
			if (end - start < pageNav&& start > 0) {
				start = end - pageNav + 1;
			}
			var html = [] ;
			for (var i = start; i <= end; i++) {
				if (i <= 0) continue;
				var active = (i==pageIndex)?"sea_state_active":"sea_state_default" ;
				html.push('<a href="#" class="sea_grid_pager_btn '+active+'" sea_pageIndex="'+i+'"><span>'+i+'</span></a>');
			}
			me.pager.find(".sea_grid_navig").html(html.join("")) ;
			me.pager.find(".sea_firstpage,.sea_prepage").removeClass("sea_state_disabled");
			me.pager.find(".sea_nextpage,.sea_lastpage").removeClass("sea_state_disabled");
			if(pageIndex <= 1){
				me.pager.find(".sea_firstpage,.sea_prepage").addClass("sea_state_disabled") ;
			}
			if(pageIndex >= totalPage ){
				me.pager.find(".sea_nextpage,.sea_lastpage").addClass("sea_state_disabled") ;
			}
			if(me.configs.pagerMode=="simple"){
				me.pager.find("td:not(.navig)").hide();
			}
		},
	  	bindEvent:function(me){
	  		me.pager.find(".sea_jump").keydown(function(event){
				if(event.keyCode==13){
					var pageSize=me.pager.find(".sea_pageSize").val();
					var pageIndex=$(this).val();
					var total=me.configs.select(pageIndex ,pageSize);
					self.reader(me,pageIndex,pageSize,total);
				}
			}) ;
	  		me.pager.find(".sea_pageSize").change(function(){
	  			var total=me.configs.select(1,$(this).val()) ;
				var pageSize=me.pager.find(".sea_pageSize").val();
	  			self.reader(me,1,pageSize,total);
			}) ;
	  		me.pager.delegate("[sea_pageIndex]","click",function(event){
				if( $(this).hasClass("sea_state_disabled") ) return false ;
				var pageIndex = $(this).attr("sea_pageIndex");
				var pageSize=me.pager.find(".sea_pageSize").val();
				var curPageIndex=Number(me.pager.find(".sea_grid_navig .sea_state_active").attr("sea_pageIndex"));
				var totalPage=me.pager.find(".sea_totalpage").html() ;
				switch(pageIndex){
					case "pre"	: pageIndex = Math.max(curPageIndex - 1,1) ;break ;
					case "next": pageIndex = Math.min(curPageIndex + 1,totalPage) ; break ;
					case "last"	: pageIndex = totalPage ; break ;
					case "first": pageIndex = 1 ; break ;
					default:
						break ;
				}
				var total=me.configs.select(pageIndex ,pageSize);
				self.reader(me,pageIndex,pageSize,total);
				return false ;
			}) ;
	  	}
	};
	/** * 类定义 ** */
	var Pager = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this.pager=Component.attr($(self.html()),this.configs);
		var me=this;
		
		$(this.configs.pageSizeArr).each(function(){
			me.pager.find(".sea_pageSize").append("<option value='"+this+"' "+(this==me.configs.pageSize?"selected":"")+">"+this+"</option>") ;
		}) ;
		self.reader(this,this.configs.pageIndex,this.configs.pageSize,this.configs.total);
		self.bindEvent(this);
	};
	// 类公共方法
	Pager.prototype = {
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Pager(configs);
	};
});
define('Date',function(require, exports, module) {
	exports.getTimestamp=function(){
		return new Date().getTime();
	};
	exports.getTime=function (time) {
		var date ;
		if(time){
			date = new Date(time);
		}else{
			date = new Date();
		}
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hour= date.getHours() ;
	    var minute=date.getMinutes();
		var second=date.getSeconds();
		var  msecond=date.getMilliseconds() ;
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    if (hour <= 9) {
	        hour = "0" + hour;
	    }
	    if (minute <= 9) {
	        minute = "0" + minute;
	    }
	    if (second <= 9) {
	        second = "0" + second;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day+ " " +hour+ seperator2 + minute+ seperator2 +second + seperator2 +msecond ;
	    return curdate;
	};
	
	exports.getNow=function (time) {
		var date ;
		if(time){
			date = new Date(time);
		}else{
			date = new Date();
		}
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hour= date.getHours() ;
	    var minute=date.getMinutes();
	    var second=date.getSeconds();
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    if (hour <= 9) {
	        hour = "0" + hour;
	    }
	    if (minute <= 9) {
	        minute = "0" + minute;
	    }
	    if (second <= 9) {
	        second = "0" + second;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day+ " " +hour+ seperator2 + minute + seperator2 +second ;
	    return curdate;
	};
	exports.getYear=function(){
		return new Date().getFullYear();
	}
	exports.getWeek=function(){
		var today = new Date();
		var firstDay = new Date(today.getFullYear(),0, 1);
		var dayOfWeek = firstDay.getDay(); 
		var spendDay= 1;
		if (dayOfWeek !=0) {
			spendDay=7-dayOfWeek+1;
		}
		firstDay = new Date(today.getFullYear(),0, 1+spendDay);
		var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
		var result =Math.ceil(d/7);
		return result+1;
	}
	exports.getDate=function (seperator1){
		if(!seperator1&&seperator1!="")seperator1="-";
	    var date = new Date();
	    var year=date.getFullYear() ;
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
//	    var hour= date.getHours() ;
//	    var minute=date.getMinutes();
//	    var second=date.getSeconds();
	    if (month <= 9) {
	        month = "0" + month;
	    }
	    if (day <= 9) {
	        day = "0" + day;
	    }
	    var curdate = year+ seperator1 + month + seperator1 + day;
	    return curdate;
	};
	
	exports.getPreMonth=function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    };
	
	  /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */        
	exports.getNextMonth=function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
    
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    };
    var getXDate=function (year,weeks,weekDay){ 
    	// 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日 
    	// 因为计算机中的月份是从0开始的,所以有如下的构造方法 
    	var date = new Date(year,"0","1"); 
    	 
    	// 取得这个日期对象 date 的长整形时间 time 
    	var time = date.getTime(); 
    	 
    	// 将这个长整形时间加上第N周的时间偏移 
    	// 因为第一周就是当前周,所以有:weeks-1,以此类推 
    	// 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒) 
    	time+=(weeks-1)*7*24*3600000; 
    	 
    	// 为日期对象 date 重新设置成时间 time 
    	date.setTime(time); 
    	return getNextDate(date,weekDay); 
	};
	exports.getXDate=getXDate;
	
	var fix=function (num, length) {
		  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	};
	var getNextDate=function(nowDate,weekDay){ 
		// 0是星期日,1是星期一,... 
		weekDay%=7; 
		var day = nowDate.getDay(); 
		var time = nowDate.getTime(); 
		var sub = weekDay-day; 
		if(sub <= 0){ 
		sub += 7; 
		} 
		time+=sub*24*3600000; 
		nowDate.setTime(time); 
		return  nowDate.getFullYear() +"-"+fix((nowDate.getMonth()+ 1),2)+"-"+fix(nowDate.getDate(),2);
	};
	exports.getDateRange=function(_year,_week){ 
		var beginDate; 
		var endDate; 
		if(_year == null || _year == '' || _week == null || _week == ''){ 
		return ""; 
		} 
		_week=_week-1;
		beginDate = getXDate(_year,_week,5); 
		endDate = getXDate(_year,(_week - 0 + 1),4); 
		return [beginDate,endDate]; 
	}; 
	exports.getYear=function(){
		return new Date().getFullYear();
	};
});

define('Lang',function(require) {
	/** *只需要维护该对象** */
	var lang = {
		zh_CN : {
			"please.select":"请选择",
			"browse":"上传",
			//Business
			"fail.delete.publish":"不能删除已发布记录！",
			"fail.modify.publish":"不能修改已发布记录！",
			"fail.modify.audit":"不能修改已审核记录！",
			"fail.delete.audit":"不能删除已审核记录!",
			//Dialog
			"confirm":"<span class='iconfont icon-yes'></span>确定",
			"cancel":"<span style='transform:rotateY(180deg)' class='iconfont icon-return'></span>取消",
			"prompt":"<span class='iconfont icon-info'></span>&nbsp;提示",
			//Grid
			"refresh":"刷新",
			add:"录入",
			edit:"修改",
			view:"查看",
			"delete":"删除",
			"export":"导出",
			"copy":"拷贝",
			delSuccess:"删除成功!",
			delFail:"删除失败!",
			copySuccess:"拷贝成功!",
			copyFail:"拷贝失败!",
			select:"请选择一条记录!",
			ifDel:'是否删除?',
			//Paper
			"page":"页",
			"total":"共",
			"record":"条记录",
			"each.page":"每页",
			"item":"条",
			"jump":" 跳转",
			//Input
			nullwarning:"该字段不能为空！",
			maxLen:"输入字符长度不能超过:",
			minLen:"输入字符长度不能小于:",
			date:"请输入正确的日期格式",
			datetime:"请输入正确的时间格式",
			digits:"请输入正确的数字格式",
			money:"请输入正确的金钱格式",
			email:"请输入正确的邮箱格式",
			number:"请输入正确的数字格式",
			phone:"请输入正确的电话格式",
			mobile:"请输入正确的电话格式",
			tel:"请输入正确的电话格式",
			qq:"请输入正确的QQ格式",
			"int":"请输入正确的整型格式",
			"double":"请输入正确的双精度格式",
			post:"请输入正确的邮编格式",
			url:"请输入正确的URL格式",
			password:"请输入正确的密码格式",
			"char":"请输入正确的字符格式",
			en:"请输入正确的英文格式",
			cardno:"请输入正确的身份证格式",
			cn:"请输入正确的中文格式",
			chinesechar:"请输入正确的中文字符格式",
			stringcheck:"请输入只能包含中文、英文、数字、下划线等字符格式",
			stringfilter:"请输入中英文特殊字符，除英文'-_'字符格式",
			specialchar:"请输入中英文特殊字符，除英文'-_'字符格式"
		},
		en_US : {
			"please.select":"Please Select",
			"browse":"Browse",
			//Business
			"fail.delete.publish":"Can not delete recorded!",
			"fail.modify.publish":"Can not modify published records!",
			"fail.modify.audit":"Can not modify the audit record!",
			"fail.delete.audit":"Can not delete the audited records!",
			//Dialog
			"confirm":"<span class='iconfont icon-yes'></span>Confirm",
			"cancel":"<span style='transform:rotateY(180deg)' class='iconfont icon-return'></span>Cancel",
			"prompt":"<span class='iconfont icon-info'></span>&nbsp;Prompt",
			//Grid
			"refresh":"Refresh",
			"add":"Add",
			edit:"Edit",
			view:"View",
			"delete":"Delete",
			"export":"Export",
			"copy":"Copy",
			delSuccess:"Success Delete!",
			delFail:"Fail delete!",
			copySuccess:"Success Copy!",
			copyFail:"Fail delete!",
			select:"Please select a record!",
			ifDel:'Whether to delete?',
			//Paper
			"page":"Page",
			"total":"Total",
			"record":"Record",
			"each.page":"Per ",
			"item":"item",
			"jump":" Jump",
			//Input
			nullwarning:"The Field Cannot Be Empty!！",
			maxLen:"Input Character Length Cannot Exceed:" ,
			minLen:"Input Character Length Cannot Be Less Than:",
			date:"Please Enter The Correct Date Format",
			datetime:"lease Enter The Correct Time Format",
			digits:"Please Enter The Correct Digital Format",
			money:"Please Enter The Correct Money Format",
			email:"Please Enter The Correct Email Format",
			number:"Please Enter The Correct Number Format",
			phone:"Please Enter The Correct Phone Format",
			mobile:"Please Enter The Correct Mobile Format",
			tel:"Please Enter The Correct TEL Format",
			qq:"Please Enter The Correct QQ Format",
			"int":"Please Enter The Correct Integer Format",
			"double":"Please Enter The Correct Double Format",
			post:"Please Enter The Correct Post Format",
			url:"Please Enter The Correct URL Format",
			"char":"Please Enter The Correct Char Format",
			password:"Please Enter The Correct Password Format",
			en:"Please Enter The Correct English Format",
			cardno:"Please Enter The Correct CardNo Format",
			cn:"Please Enter The Correct Chinese Format",
			chinesechar:"Please Enter The Correct Chinese Char Format",
			stringcheck:"Please Input Can Only Oontain Chinese, English, Numbers, Underline And Other Character Format",
			stringfilter:"Please Input English Special Characters, In Addition To English'-_'Character Format",
			specialchar:"Please Input English Special Characters, In Addition To English'-_'Character Format"
		}
	};
	/** *** */
	return  lang[Session.langue];
});

define('JqueryForm',function(require, exports, module) {
	/*!
	 * jQuery Form Plugin
	 * version: 3.51.0-2014.06.20
	 * Requires jQuery v1.5 or later
	 * Copyright (c) 2014 M. Alsup
	 * Examples and documentation at: http://malsup.com/jquery/form/
	 * Project repository: https://github.com/malsup/form
	 * Dual licensed under the MIT and GPL licenses.
	 * https://github.com/malsup/form#copyright-and-license
	 */
	/*global ActiveXObject */

	// AMD support
	(function (factory) {
	    "use strict";
	    if (typeof define === 'function' && define.amd) {
	        // using AMD; register as anon module
	        define(['jquery'], factory);
	    } else {
	        // no AMD; invoke directly
	        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
	    }
	}

	(function($) {
	"use strict";

	/*
	    Usage Note:
	    -----------
	    Do not use both ajaxSubmit and ajaxForm on the same form.  These
	    functions are mutually exclusive.  Use ajaxSubmit if you want
	    to bind your own submit handler to the form.  For example,

	    $(document).ready(function() {
	        $('#myForm').on('submit', function(e) {
	            e.preventDefault(); // <-- important
	            $(this).ajaxSubmit({
	                target: '#output'
	            });
	        });
	    });

	    Use ajaxForm when you want the plugin to manage all the event binding
	    for you.  For example,

	    $(document).ready(function() {
	        $('#myForm').ajaxForm({
	            target: '#output'
	        });
	    });

	    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
	    form does not have to exist when you invoke ajaxForm:

	    $('#myForm').ajaxForm({
	        delegation: true,
	        target: '#output'
	    });

	    When using ajaxForm, the ajaxSubmit function will be invoked for you
	    at the appropriate time.
	*/

	/**
	 * Feature detection
	 */
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;

	var hasProp = !!$.fn.prop;

	// attr2 uses prop when it can but checks the return type for
	// an expected string.  this accounts for the case where a form 
	// contains inputs with names like "action" or "method"; in those
	// cases "prop" returns the element
	$.fn.attr2 = function() {
	    if ( ! hasProp ) {
	        return this.attr.apply(this, arguments);
	    }
	    var val = this.prop.apply(this, arguments);
	    if ( ( val && val.jquery ) || typeof val === 'string' ) {
	        return val;
	    }
	    return this.attr.apply(this, arguments);
	};

	/**
	 * ajaxSubmit() provides a mechanism for immediately submitting
	 * an HTML form using AJAX.
	 */
	$.fn.ajaxSubmit = function(options) {
	    /*jshint scripturl:true */

	    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	    if (!this.length) {
	        log('ajaxSubmit: skipping submit process - no element selected');
	        return this;
	    }

	    var method, action, url, $form = this;

	    if (typeof options == 'function') {
	        options = { success: options };
	    }
	    else if ( options === undefined ) {
	        options = {};
	    }

	    method = options.type || this.attr2('method');
	    action = options.url  || this.attr2('action');

	    url = (typeof action === 'string') ? $.trim(action) : '';
	    url = url || window.location.href || '';
	    if (url) {
	        // clean url (don't include hash vaue)
	        url = (url.match(/^([^#]+)/)||[])[1];
	    }

	    options = $.extend(true, {
	        url:  url,
	        success: $.ajaxSettings.success,
	        type: method || $.ajaxSettings.type,
	        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	    }, options);

	    // hook for manipulating the form data before it is extracted;
	    // convenient for use with rich editors like tinyMCE or FCKEditor
	    var veto = {};
	    this.trigger('form-pre-serialize', [this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
	        return this;
	    }

	    // provide opportunity to alter form data before it is serialized
	    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSerialize callback');
	        return this;
	    }

	    var traditional = options.traditional;
	    if ( traditional === undefined ) {
	        traditional = $.ajaxSettings.traditional;
	    }

	    var elements = [];
	    var qx, a = this.formToArray(options.semantic, elements);
	    if (options.data) {
	        options.extraData = options.data;
	        qx = $.param(options.data, traditional);
	    }

	    // give pre-submit callback an opportunity to abort the submit
	    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSubmit callback');
	        return this;
	    }

	    // fire vetoable 'validate' event
	    this.trigger('form-submit-validate', [a, this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
	        return this;
	    }

	    var q = $.param(a, traditional);
	    if (qx) {
	        q = ( q ? (q + '&' + qx) : qx );
	    }
	    if (options.type.toUpperCase() == 'GET') {
	        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
	        options.data = null;  // data is null for 'get'
	    }
	    else {
	        options.data = q; // data is the query string for 'post'
	    }

	    var callbacks = [];
	    if (options.resetForm) {
	        callbacks.push(function() { $form.resetForm(); });
	    }
	    if (options.clearForm) {
	        callbacks.push(function() { $form.clearForm(options.includeHidden); });
	    }

	    // perform a load on the target only if dataType is not provided
	    if (!options.dataType && options.target) {
	        var oldSuccess = options.success || function(){};
	        callbacks.push(function(data) {
	            var fn = options.replaceTarget ? 'replaceWith' : 'html';
	            $(options.target)[fn](data).each(oldSuccess, arguments);
	        });
	    }
	    else if (options.success) {
	        callbacks.push(options.success);
	    }

	    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
	        var context = options.context || this ;    // jQuery 1.4+ supports scope context
	        for (var i=0, max=callbacks.length; i < max; i++) {
	            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
	        }
	    };

	    if (options.error) {
	        var oldError = options.error;
	        options.error = function(xhr, status, error) {
	            var context = options.context || this;
	            oldError.apply(context, [xhr, status, error, $form]);
	        };
	    }

	     if (options.complete) {
	        var oldComplete = options.complete;
	        options.complete = function(xhr, status) {
	            var context = options.context || this;
	            oldComplete.apply(context, [xhr, status, $form]);
	        };
	    }

	    // are there files to upload?

	    // [value] (issue #113), also see comment:
	    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
	    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

	    var hasFileInputs = fileInputs.length > 0;
	    var mp = 'multipart/form-data';
	    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	    var fileAPI = feature.fileapi && feature.formdata;
	    log("fileAPI :" + fileAPI);
	    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

	    var jqxhr;

	    // options.iframe allows user to force iframe mode
	    // 06-NOV-09: now defaulting to iframe mode if file input is detected
	    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
	        // hack to fix Safari hang (thanks to Tim Molendijk for this)
	        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	        if (options.closeKeepAlive) {
	            $.get(options.closeKeepAlive, function() {
	                jqxhr = fileUploadIframe(a);
	            });
	        }
	        else {
	            jqxhr = fileUploadIframe(a);
	        }
	    }
	    else if ((hasFileInputs || multipart) && fileAPI) {
	        jqxhr = fileUploadXhr(a);
	    }
	    else {
	        jqxhr = $.ajax(options);
	    }

	    $form.removeData('jqxhr').data('jqxhr', jqxhr);

	    // clear element array
	    for (var k=0; k < elements.length; k++) {
	        elements[k] = null;
	    }

	    // fire 'notify' event
	    this.trigger('form-submit-notify', [this, options]);
	    return this;

	    // utility fn for deep serialization
	    function deepSerialize(extraData){
	        var serialized = $.param(extraData, options.traditional).split('&');
	        var len = serialized.length;
	        var result = [];
	        var i, part;
	        for (i=0; i < len; i++) {
	            // #252; undo param space replacement
	            serialized[i] = serialized[i].replace(/\+/g,' ');
	            part = serialized[i].split('=');
	            // #278; use array instead of object storage, favoring array serializations
	            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
	        }
	        return result;
	    }

	     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	    function fileUploadXhr(a) {
	        var formdata = new FormData();

	        for (var i=0; i < a.length; i++) {
	            formdata.append(a[i].name, a[i].value);
	        }

	        if (options.extraData) {
	            var serializedData = deepSerialize(options.extraData);
	            for (i=0; i < serializedData.length; i++) {
	                if (serializedData[i]) {
	                    formdata.append(serializedData[i][0], serializedData[i][1]);
	                }
	            }
	        }

	        options.data = null;

	        var s = $.extend(true, {}, $.ajaxSettings, options, {
	            contentType: false,
	            processData: false,
	            cache: false,
	            type: method || 'POST'
	        });

	        if (options.uploadProgress) {
	            // workaround because jqXHR does not expose upload property
	            s.xhr = function() {
	                var xhr = $.ajaxSettings.xhr();
	                if (xhr.upload) {
	                    xhr.upload.addEventListener('progress', function(event) {
	                        var percent = 0;
	                        var position = event.loaded || event.position; /*event.position is deprecated*/
	                        var total = event.total;
	                        if (event.lengthComputable) {
	                            percent = Math.ceil(position / total * 100);
	                        }
	                        options.uploadProgress(event, position, total, percent);
	                    }, false);
	                }
	                return xhr;
	            };
	        }

	        s.data = null;
	        var beforeSend = s.beforeSend;
	        s.beforeSend = function(xhr, o) {
	            //Send FormData() provided by user
	            if (options.formData) {
	                o.data = options.formData;
	            }
	            else {
	                o.data = formdata;
	            }
	            if(beforeSend) {
	                beforeSend.call(this, xhr, o);
	            }
	        };
	        return $.ajax(s);
	    }

	    // private function for handling file uploads (hat tip to YAHOO!)
	    function fileUploadIframe(a) {
	        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
	        var deferred = $.Deferred();

	        // #341
	        deferred.abort = function(status) {
	            xhr.abort(status);
	        };

	        if (a) {
	            // ensure that every serialized input is still enabled
	            for (i=0; i < elements.length; i++) {
	                el = $(elements[i]);
	                if ( hasProp ) {
	                    el.prop('disabled', false);
	                }
	                else {
	                    el.removeAttr('disabled');
	                }
	            }
	        }

	        s = $.extend(true, {}, $.ajaxSettings, options);
	        s.context = s.context || s;
	        id = 'jqFormIO' + (new Date().getTime());
	        if (s.iframeTarget) {
	            $io = $(s.iframeTarget);
	            n = $io.attr2('name');
	            if (!n) {
	                $io.attr2('name', id);
	            }
	            else {
	                id = n;
	            }
	        }
	        else {
	            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
	            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
	        }
	        io = $io[0];


	        xhr = { // mock object
	            aborted: 0,
	            responseText: null,
	            responseXML: null,
	            status: 0,
	            statusText: 'n/a',
	            getAllResponseHeaders: function() {},
	            getResponseHeader: function() {},
	            setRequestHeader: function() {},
	            abort: function(status) {
	                var e = (status === 'timeout' ? 'timeout' : 'aborted');
	                log('aborting upload... ' + e);
	                this.aborted = 1;

	                try { // #214, #257
	                    if (io.contentWindow.document.execCommand) {
	                        io.contentWindow.document.execCommand('Stop');
	                    }
	                }
	                catch(ignore) {}

	                $io.attr('src', s.iframeSrc); // abort op in progress
	                xhr.error = e;
	                if (s.error) {
	                    s.error.call(s.context, xhr, e, status);
	                }
	                if (g) {
	                    $.event.trigger("ajaxError", [xhr, s, e]);
	                }
	                if (s.complete) {
	                    s.complete.call(s.context, xhr, e);
	                }
	            }
	        };

	        g = s.global;
	        // trigger ajax global events so that activity/block indicators work like normal
	        if (g && 0 === $.active++) {
	            $.event.trigger("ajaxStart");
	        }
	        if (g) {
	            $.event.trigger("ajaxSend", [xhr, s]);
	        }

	        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
	            if (s.global) {
	                $.active--;
	            }
	            deferred.reject();
	            return deferred;
	        }
	        if (xhr.aborted) {
	            deferred.reject();
	            return deferred;
	        }

	        // add submitting element to data if we know it
	        sub = form.clk;
	        if (sub) {
	            n = sub.name;
	            if (n && !sub.disabled) {
	                s.extraData = s.extraData || {};
	                s.extraData[n] = sub.value;
	                if (sub.type == "image") {
	                    s.extraData[n+'.x'] = form.clk_x;
	                    s.extraData[n+'.y'] = form.clk_y;
	                }
	            }
	        }

	        var CLIENT_TIMEOUT_ABORT = 1;
	        var SERVER_ABORT = 2;
	                
	        function getDoc(frame) {
	            /* it looks like contentWindow or contentDocument do not
	             * carry the protocol property in ie8, when running under ssl
	             * frame.document is the only valid response document, since
	             * the protocol is know but not on the other two objects. strange?
	             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
	             */
	            
	            var doc = null;
	            
	            // IE8 cascading access check
	            try {
	                if (frame.contentWindow) {
	                    doc = frame.contentWindow.document;
	                }
	            } catch(err) {
	                // IE8 access denied under ssl & missing protocol
	                log('cannot get iframe.contentWindow document: ' + err);
	            }

	            if (doc) { // successful getting content
	                return doc;
	            }

	            try { // simply checking may throw in ie8 under ssl or mismatched protocol
	                doc = frame.contentDocument ? frame.contentDocument : frame.document;
	            } catch(err) {
	                // last attempt
	                log('cannot get iframe.contentDocument: ' + err);
	                doc = frame.document;
	            }
	            return doc;
	        }

	        // Rails CSRF hack (thanks to Yvan Barthelemy)
	        var csrf_token = $('meta[name=csrf-token]').attr('content');
	        var csrf_param = $('meta[name=csrf-param]').attr('content');
	        if (csrf_param && csrf_token) {
	            s.extraData = s.extraData || {};
	            s.extraData[csrf_param] = csrf_token;
	        }

	        // take a breath so that pending repaints get some cpu time before the upload starts
	        function doSubmit() {
	            // make sure form attrs are set
	            var t = $form.attr2('target'), 
	                a = $form.attr2('action'), 
	                mp = 'multipart/form-data',
	                et = $form.attr('enctype') || $form.attr('encoding') || mp;

	            // update form attrs in IE friendly way
	            form.setAttribute('target',id);
	            if (!method || /post/i.test(method) ) {
	                form.setAttribute('method', 'POST');
	            }
	            if (a != s.url) {
	                form.setAttribute('action', s.url);
	            }

	            // ie borks in some cases when setting encoding
	            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
	                $form.attr({
	                    encoding: 'multipart/form-data',
	                    enctype:  'multipart/form-data'
	                });
	            }

	            // support timout
	            if (s.timeout) {
	                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
	            }

	            // look for server aborts
	            function checkState() {
	                try {
	                    var state = getDoc(io).readyState;
	                    log('state = ' + state);
	                    if (state && state.toLowerCase() == 'uninitialized') {
	                        setTimeout(checkState,50);
	                    }
	                }
	                catch(e) {
	                    log('Server abort: ' , e, ' (', e.name, ')');
	                    cb(SERVER_ABORT);
	                    if (timeoutHandle) {
	                        clearTimeout(timeoutHandle);
	                    }
	                    timeoutHandle = undefined;
	                }
	            }

	            // add "extra" data to form if provided in options
	            var extraInputs = [];
	            try {
	                if (s.extraData) {
	                    for (var n in s.extraData) {
	                        if (s.extraData.hasOwnProperty(n)) {
	                           // if using the $.param format that allows for multiple values with the same name
	                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
	                                   .appendTo(form)[0]);
	                           } else {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
	                                   .appendTo(form)[0]);
	                           }
	                        }
	                    }
	                }

	                if (!s.iframeTarget) {
	                    // add iframe to doc and submit the form
	                    $io.appendTo('body');
	                }
	                if (io.attachEvent) {
	                    io.attachEvent('onload', cb);
	                }
	                else {
	                    io.addEventListener('load', cb, false);
	                }
	                setTimeout(checkState,15);

	                try {
	                    form.submit();
	                } catch(err) {
	                    // just in case form has element with name/id of 'submit'
	                    var submitFn = document.createElement('form').submit;
	                    submitFn.apply(form);
	                }
	            }
	            finally {
	                // reset attrs and remove "extra" input elements
	                form.setAttribute('action',a);
	                form.setAttribute('enctype', et); // #380
	                if(t) {
	                    form.setAttribute('target', t);
	                } else {
	                    $form.removeAttr('target');
	                }
	                $(extraInputs).remove();
	            }
	        }

	        if (s.forceSync) {
	            doSubmit();
	        }
	        else {
	            setTimeout(doSubmit, 10); // this lets dom updates render
	        }

	        var data, doc, domCheckCount = 50, callbackProcessed;

	        function cb(e) {
	            if (xhr.aborted || callbackProcessed) {
	                return;
	            }
	            
	            doc = getDoc(io);
	            if(!doc) {
	                log('cannot access response document');
	                e = SERVER_ABORT;
	            }
	            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
	                xhr.abort('timeout');
	                deferred.reject(xhr, 'timeout');
	                return;
	            }
	            else if (e == SERVER_ABORT && xhr) {
	                xhr.abort('server abort');
	                deferred.reject(xhr, 'error', 'server abort');
	                return;
	            }

	            if (!doc || doc.location.href == s.iframeSrc) {
	                // response not received yet
	                if (!timedOut) {
	                    return;
	                }
	            }
	            if (io.detachEvent) {
	                io.detachEvent('onload', cb);
	            }
	            else {
	                io.removeEventListener('load', cb, false);
	            }

	            var status = 'success', errMsg;
	            try {
	                if (timedOut) {
	                    throw 'timeout';
	                }

	                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
	                log('isXml='+isXml);
	                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
	                    if (--domCheckCount) {
	                        // in some browsers (Opera) the iframe DOM is not always traversable when
	                        // the onload callback fires, so we loop a bit to accommodate
	                        log('requeing onLoad callback, DOM not available');
	                        setTimeout(cb, 250);
	                        return;
	                    }
	                    // let this fall through because server response could be an empty document
	                    //log('Could not access iframe DOM after mutiple tries.');
	                    //throw 'DOMException: not available';
	                }

	                //log('response detected');
	                var docRoot = doc.body ? doc.body : doc.documentElement;
	                xhr.responseText = docRoot ? docRoot.innerHTML : null;
	                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
	                if (isXml) {
	                    s.dataType = 'xml';
	                }
	                xhr.getResponseHeader = function(header){
	                    var headers = {'content-type': s.dataType};
	                    return headers[header.toLowerCase()];
	                };
	                // support for XHR 'status' & 'statusText' emulation :
	                if (docRoot) {
	                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
	                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
	                }

	                var dt = (s.dataType || '').toLowerCase();
	                var scr = /(json|script|text)/.test(dt);
	                if (scr || s.textarea) {
	                    // see if user embedded response in textarea
	                    var ta = doc.getElementsByTagName('textarea')[0];
	                    if (ta) {
	                        xhr.responseText = ta.value;
	                        // support for XHR 'status' & 'statusText' emulation :
	                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
	                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
	                    }
	                    else if (scr) {
	                        // account for browsers injecting pre around json response
	                        var pre = doc.getElementsByTagName('pre')[0];
	                        var b = doc.getElementsByTagName('body')[0];
	                        if (pre) {
	                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
	                        }
	                        else if (b) {
	                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
	                        }
	                    }
	                }
	                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
	                    xhr.responseXML = toXml(xhr.responseText);
	                }

	                try {
	                    data = httpData(xhr, dt, s);
	                }
	                catch (err) {
	                    status = 'parsererror';
	                    xhr.error = errMsg = (err || status);
	                }
	            }
	            catch (err) {
	                log('error caught: ',err);
	                status = 'error';
	                xhr.error = errMsg = (err || status);
	            }

	            if (xhr.aborted) {
	                log('upload aborted');
	                status = null;
	            }

	            if (xhr.status) { // we've set xhr.status
	                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
	            }

	            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
	            if (status === 'success') {
	                if (s.success) {
	                    s.success.call(s.context, data, 'success', xhr);
	                }
	                deferred.resolve(xhr.responseText, 'success', xhr);
	                if (g) {
	                    $.event.trigger("ajaxSuccess", [xhr, s]);
	                }
	            }
	            else if (status) {
	                if (errMsg === undefined) {
	                    errMsg = xhr.statusText;
	                }
	                if (s.error) {
	                    s.error.call(s.context, xhr, status, errMsg);
	                }
	                deferred.reject(xhr, 'error', errMsg);
	                if (g) {
	                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
	                }
	            }

	            if (g) {
	                $.event.trigger("ajaxComplete", [xhr, s]);
	            }

	            if (g && ! --$.active) {
	                $.event.trigger("ajaxStop");
	            }

	            if (s.complete) {
	                s.complete.call(s.context, xhr, status);
	            }

	            callbackProcessed = true;
	            if (s.timeout) {
	                clearTimeout(timeoutHandle);
	            }

	            // clean up
	            setTimeout(function() {
	                if (!s.iframeTarget) {
	                    $io.remove();
	                }
	                else { //adding else to clean up existing iframe response.
	                    $io.attr('src', s.iframeSrc);
	                }
	                xhr.responseXML = null;
	            }, 100);
	        }

	        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
	            if (window.ActiveXObject) {
	                doc = new ActiveXObject('Microsoft.XMLDOM');
	                doc.async = 'false';
	                doc.loadXML(s);
	            }
	            else {
	                doc = (new DOMParser()).parseFromString(s, 'text/xml');
	            }
	            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
	        };
	        var parseJSON = $.parseJSON || function(s) {
	            /*jslint evil:true */
	            return window['eval']('(' + s + ')');
	        };

	        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

	            var ct = xhr.getResponseHeader('content-type') || '',
	                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
	                data = xml ? xhr.responseXML : xhr.responseText;

	            if (xml && data.documentElement.nodeName === 'parsererror') {
	                if ($.error) {
	                    $.error('parsererror');
	                }
	            }
	            if (s && s.dataFilter) {
	                data = s.dataFilter(data, type);
	            }
	            if (typeof data === 'string') {
	                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
	                    data = parseJSON(data);
	                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
	                    $.globalEval(data);
	                }
	            }
	            return data;
	        };

	        return deferred;
	    }
	};

	/**
	 * ajaxForm() provides a mechanism for fully automating form submission.
	 *
	 * The advantages of using this method instead of ajaxSubmit() are:
	 *
	 * 1: This method will include coordinates for <input type="image" /> elements (if the element
	 *    is used to submit the form).
	 * 2. This method will include the submit element's name/value data (for the element that was
	 *    used to submit the form).
	 * 3. This method binds the submit() method to the form for you.
	 *
	 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
	 * passes the options argument along after properly binding events for submit elements and
	 * the form itself.
	 */
	$.fn.ajaxForm = function(options) {
	    options = options || {};
	    options.delegation = options.delegation && $.isFunction($.fn.on);

	    // in jQuery 1.3+ we can fix mistakes with the ready state
	    if (!options.delegation && this.length === 0) {
	        var o = { s: this.selector, c: this.context };
	        if (!$.isReady && o.s) {
	            log('DOM not ready, queuing ajaxForm');
	            $(function() {
	                $(o.s,o.c).ajaxForm(options);
	            });
	            return this;
	        }
	        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
	        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
	        return this;
	    }

	    if ( options.delegation ) {
	        $(document)
	            .off('submit.form-plugin', this.selector, doAjaxSubmit)
	            .off('click.form-plugin', this.selector, captureSubmittingElement)
	            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
	            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
	        return this;
	    }

	    return this.ajaxFormUnbind()
	        .bind('submit.form-plugin', options, doAjaxSubmit)
	        .bind('click.form-plugin', options, captureSubmittingElement);
	};

	// private event handlers
	function doAjaxSubmit(e) {
	    /*jshint validthis:true */
	    var options = e.data;
	    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
	        e.preventDefault();
	        $(e.target).ajaxSubmit(options); // #365
	    }
	}

	function captureSubmittingElement(e) {
	    /*jshint validthis:true */
	    var target = e.target;
	    var $el = $(target);
	    if (!($el.is("[type=submit],[type=image]"))) {
	        // is this a child element of the submit el?  (ex: a span within a button)
	        var t = $el.closest('[type=submit]');
	        if (t.length === 0) {
	            return;
	        }
	        target = t[0];
	    }
	    var form = this;
	    form.clk = target;
	    if (target.type == 'image') {
	        if (e.offsetX !== undefined) {
	            form.clk_x = e.offsetX;
	            form.clk_y = e.offsetY;
	        } else if (typeof $.fn.offset == 'function') {
	            var offset = $el.offset();
	            form.clk_x = e.pageX - offset.left;
	            form.clk_y = e.pageY - offset.top;
	        } else {
	            form.clk_x = e.pageX - target.offsetLeft;
	            form.clk_y = e.pageY - target.offsetTop;
	        }
	    }
	    // clear form vars
	    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	}


	// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
	$.fn.ajaxFormUnbind = function() {
	    return this.unbind('submit.form-plugin click.form-plugin');
	};

	/**
	 * formToArray() gathers form element data into an array of objects that can
	 * be passed to any of the following ajax functions: $.get, $.post, or load.
	 * Each object in the array has both a 'name' and 'value' property.  An example of
	 * an array for a simple login form might be:
	 *
	 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
	 *
	 * It is this array that is passed to pre-submit callback functions provided to the
	 * ajaxSubmit() and ajaxForm() methods.
	 */
	$.fn.formToArray = function(semantic, elements) {
	    var a = [];
	    if (this.length === 0) {
	        return a;
	    }

	    var form = this[0];
	    var formId = this.attr('id');
	    var els = semantic ? form.getElementsByTagName('*') : form.elements;
	    var els2;

	    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
	        els = $(els).get();  // convert to standard array
	    }

	    // #386; account for inputs outside the form which use the 'form' attribute
	    if ( formId ) {
	        els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
	        if ( els2.length ) {
	            els = (els || []).concat(els2);
	        }
	    }

	    if (!els || !els.length) {
	        return a;
	    }

	    var i,j,n,v,el,max,jmax;
	    for(i=0, max=els.length; i < max; i++) {
	        el = els[i];
	        n = el.name;
	        if (!n || el.disabled) {
	            continue;
	        }

	        if (semantic && form.clk && el.type == "image") {
	            // handle image inputs on the fly when semantic == true
	            if(form.clk == el) {
	                a.push({name: n, value: $(el).val(), type: el.type });
	                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	            }
	            continue;
	        }

	        v = $.fieldValue(el, true);
	        if (v && v.constructor == Array) {
	            if (elements) {
	                elements.push(el);
	            }
	            for(j=0, jmax=v.length; j < jmax; j++) {
	                a.push({name: n, value: v[j]});
	            }
	        }
	        else if (feature.fileapi && el.type == 'file') {
	            if (elements) {
	                elements.push(el);
	            }
	            var files = el.files;
	            if (files.length) {
	                for (j=0; j < files.length; j++) {
	                    a.push({name: n, value: files[j], type: el.type});
	                }
	            }
	            else {
	                // #180
	                a.push({ name: n, value: '', type: el.type });
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            if (elements) {
	                elements.push(el);
	            }
	            a.push({name: n, value: v, type: el.type, required: el.required});
	        }
	    }

	    if (!semantic && form.clk) {
	        // input type=='image' are not found in elements array! handle it here
	        var $input = $(form.clk), input = $input[0];
	        n = input.name;
	        if (n && !input.disabled && input.type == 'image') {
	            a.push({name: n, value: $input.val()});
	            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	        }
	    }
	    return a;
	};

	/**
	 * Serializes form data into a 'submittable' string. This method will return a string
	 * in the format: name1=value1&amp;name2=value2
	 */
	$.fn.formSerialize = function(semantic) {
	    //hand off to jQuery.param for proper encoding
	    return $.param(this.formToArray(semantic));
	};

	/**
	 * Serializes all field elements in the jQuery object into a query string.
	 * This method will return a string in the format: name1=value1&amp;name2=value2
	 */
	$.fn.fieldSerialize = function(successful) {
	    var a = [];
	    this.each(function() {
	        var n = this.name;
	        if (!n) {
	            return;
	        }
	        var v = $.fieldValue(this, successful);
	        if (v && v.constructor == Array) {
	            for (var i=0,max=v.length; i < max; i++) {
	                a.push({name: n, value: v[i]});
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            a.push({name: this.name, value: v});
	        }
	    });
	    //hand off to jQuery.param for proper encoding
	    return $.param(a);
	};

	/**
	 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
	 *
	 *  <form><fieldset>
	 *      <input name="A" type="text" />
	 *      <input name="A" type="text" />
	 *      <input name="B" type="checkbox" value="B1" />
	 *      <input name="B" type="checkbox" value="B2"/>
	 *      <input name="C" type="radio" value="C1" />
	 *      <input name="C" type="radio" value="C2" />
	 *  </fieldset></form>
	 *
	 *  var v = $('input[type=text]').fieldValue();
	 *  // if no values are entered into the text inputs
	 *  v == ['','']
	 *  // if values entered into the text inputs are 'foo' and 'bar'
	 *  v == ['foo','bar']
	 *
	 *  var v = $('input[type=checkbox]').fieldValue();
	 *  // if neither checkbox is checked
	 *  v === undefined
	 *  // if both checkboxes are checked
	 *  v == ['B1', 'B2']
	 *
	 *  var v = $('input[type=radio]').fieldValue();
	 *  // if neither radio is checked
	 *  v === undefined
	 *  // if first radio is checked
	 *  v == ['C1']
	 *
	 * The successful argument controls whether or not the field element must be 'successful'
	 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
	 * The default value of the successful argument is true.  If this value is false the value(s)
	 * for each element is returned.
	 *
	 * Note: This method *always* returns an array.  If no valid value can be determined the
	 *    array will be empty, otherwise it will contain one or more values.
	 */
	$.fn.fieldValue = function(successful) {
	    for (var val=[], i=0, max=this.length; i < max; i++) {
	        var el = this[i];
	        var v = $.fieldValue(el, successful);
	        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
	            continue;
	        }
	        if (v.constructor == Array) {
	            $.merge(val, v);
	        }
	        else {
	            val.push(v);
	        }
	    }
	    return val;
	};

	/**
	 * Returns the value of the field element.
	 */
	$.fieldValue = function(el, successful) {
	    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	    if (successful === undefined) {
	        successful = true;
	    }

	    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
	        (t == 'checkbox' || t == 'radio') && !el.checked ||
	        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
	        tag == 'select' && el.selectedIndex == -1)) {
	            return null;
	    }

	    if (tag == 'select') {
	        var index = el.selectedIndex;
	        if (index < 0) {
	            return null;
	        }
	        var a = [], ops = el.options;
	        var one = (t == 'select-one');
	        var max = (one ? index+1 : ops.length);
	        for(var i=(one ? index : 0); i < max; i++) {
	            var op = ops[i];
	            if (op.selected) {
	                var v = op.value;
	                if (!v) { // extra pain for IE...
	                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
	                }
	                if (one) {
	                    return v;
	                }
	                a.push(v);
	            }
	        }
	        return a;
	    }
	    return $(el).val();
	};

	/**
	 * Clears the form data.  Takes the following actions on the form's input fields:
	 *  - input text fields will have their 'value' property set to the empty string
	 *  - select elements will have their 'selectedIndex' property set to -1
	 *  - checkbox and radio inputs will have their 'checked' property set to false
	 *  - inputs of type submit, button, reset, and hidden will *not* be effected
	 *  - button elements will *not* be effected
	 */
	$.fn.clearForm = function(includeHidden) {
	    return this.each(function() {
	        $('input,select,textarea', this).clearFields(includeHidden);
	    });
	};

	/**
	 * Clears the selected form elements.
	 */
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	    return this.each(function() {
	        var t = this.type, tag = this.tagName.toLowerCase();
	        if (re.test(t) || tag == 'textarea') {
	            this.value = '';
	        }
	        else if (t == 'checkbox' || t == 'radio') {
	            this.checked = false;
	        }
	        else if (tag == 'select') {
	            this.selectedIndex = -1;
	        }
	        else if (t == "file") {
	            if (/MSIE/.test(navigator.userAgent)) {
	                $(this).replaceWith($(this).clone(true));
	            } else {
	                $(this).val('');
	            }
	        }
	        else if (includeHidden) {
	            // includeHidden can be the value true, or it can be a selector string
	            // indicating a special test; for example:
	            //  $('#myForm').clearForm('.special:hidden')
	            // the above would clean hidden inputs that have the class of 'special'
	            if ( (includeHidden === true && /hidden/.test(t)) ||
	                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
	                this.value = '';
	            }
	        }
	    });
	};

	/**
	 * Resets the form data.  Causes all form elements to be reset to their original value.
	 */
	$.fn.resetForm = function() {
	    return this.each(function() {
	        // guard against an input with the name of 'reset'
	        // note that IE reports the reset function as an 'object'
	        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
	            this.reset();
	        }
	    });
	};

	/**
	 * Enables or disables any matching elements.
	 */
	$.fn.enable = function(b) {
	    if (b === undefined) {
	        b = true;
	    }
	    return this.each(function() {
	        this.disabled = !b;
	    });
	};

	/**
	 * Checks/unchecks any matching checkboxes or radio buttons and
	 * selects/deselects and matching option elements.
	 */
	$.fn.selected = function(select) {
	    if (select === undefined) {
	        select = true;
	    }
	    return this.each(function() {
	        var t = this.type;
	        if (t == 'checkbox' || t == 'radio') {
	            this.checked = select;
	        }
	        else if (this.tagName.toLowerCase() == 'option') {
	            var $sel = $(this).parent('select');
	            if (select && $sel[0] && $sel[0].type == 'select-one') {
	                // deselect all other options
	                $sel.find('option').selected(false);
	            }
	            this.selected = select;
	        }
	    });
	};

	// expose debug var
	$.fn.ajaxSubmit.debug = false;

	// helper fn for console logging
	function log() {
	    if (!$.fn.ajaxSubmit.debug) {
	        return;
	    }
	    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	    if (window.console && window.console.log) {
	        window.console.log(msg);
	    }
	    else if (window.opera && window.opera.postError) {
	        window.opera.postError(msg);
	    }
	}

	}));

});
define('CfgDictionary',['Lang','Select','Input'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
    var Lang = require('Lang');
    /** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		label:"",
		labelCss:{},
		labelAttr:{},
		value:"",
		isNull:true,
		cls:"",
		css:{},
		attr:{disabled:false,maxLen:0},
		url:null,
		options:[],
		params:{
//			app:"",
//			type:"",
//			subType:"",
//			value:"",
//			text:""
		},
		valueKey:"value",//value
		textKey:Session.langue,//text
        hasNullVal:true,
        nullValue:"",
        nullText:Lang["please.select"],
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var CfgDictionary = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.options=Global.DicList(this.configs.params["app"],this.configs.params["type"],this.configs.params["subType"],true);
		this.dic=this._input = require('Select').create(this.configs).select;
		this.init();
	};
	var Input=require('Input').create();
	CfgDictionary.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		reload:function(params,options){
			this.dic.empty();
            this.configs.hasNullVal&&this.dic.append("<option value='"+this.configs.nullValue+"'>"+this.configs.nullText+"</option>");
			var options=Global.DicList(params["app"],params["type"],params["subType"],true);
			var len=options.length;
			for(var i=0;i<len;i++){
				var item=options[i];
				this.dic.append("<option value='"+item[this.configs.valueKey]+"'>"+item[this.configs.textKey]+"</option>");
			}
		}
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new CfgDictionary(configs);
	};
});
define('SysDepartment',['BorderLayout','ViewLayout','Dialog','Grid','Ajax','Component','Array','Tree','Toolbar','String'],function(require, exports, module) {
	var BorderLayout=require('BorderLayout'); 
	var ViewLayout=require('ViewLayout'); 
	var Dialog=require('Dialog'); 
	var Grid=require('Grid'); 
	var Ajax=require('Ajax'); 
	var Component=require('Component'); 
	var Array=require('Array'); 
	var Tree=require('Tree'); 
	var Toolbar=require('Toolbar'); 		
	/***************变量定义***************/
	var _title='部门管理',_baseUrl = "SysUser/";
	var _baseUrlTree="SysDepartment/";
	var _currentId,_nodeId,_nodeName,_border,_grid,_dialog,_tree,_formEdit;
	var _params,_recoresAll=null;
	/***************函数定义***************/
	var cfgForm = {
		items: [[{
			id: "departmentId",
			_id: "departmentName",
			label: "部门名称",
			isNull:false,
			type: "select",
			url:"SysDepartment/options",
			hide:true
		},{}],[{
			id: "code",
			label: "工号",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "name",
			label: "用户名称",
			type: "textfield",
			maxLen: "100"
		},{
			id: "position",
			label: "职位",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "sex",
			label: "性别",
			maxLen: "1",
			type: "dic",
			isNull:false,
			params:{
				app:"system",
				type:"性别"
			}
		}],[{
			id: "tel",
			label: "手机号",
			type: "textfield",
			limit:"tel",
			maxLen: "20"
		},{
			id: "email",
			label: "邮箱地址",
			type: "textfield",
			limt:"email",
			maxLen: "100",
			width:150,
			align:"right"
		}],[{
			id: "entryDate",
			label: "入职日期",
			type: "date",
			format:"YYYY-MM-DD"
		},{
			id: "state",
			label: "状态",
			type: "dic",
			params:{
				app:"system",
				type:"状态"
			},
			hide:true
		}],[{
			id: "id",
			type: "hidden"
		},{
			id: "ord",
			type: "hidden"
		}]]
	};
	var getFormView = function(record) {
		cfgForm.record=record;
		return  ViewLayout.create(cfgForm);
	};
	var getGrid = function() {
		var cfgGrid = {
			url: _baseUrl+"listDepartmentUserByScene",
			pageSize:0,
			columns: [{
				id: "id",
				align: "center",
				width: 40,
				format:_params.selectType||"radio",
				forzen: true,
				click:function(obj){
					var idArr=(_params.id||"").split(",");
					var id=$(obj).val();
					if($(obj).is(':checked')){
						idArr.push(id);
					}else{
						for(var i=0;i<idArr.length;i++){
							if(idArr[i]==id){
								idArr.splice(i, 1);
								break;
							}
						}
					}
					_params.id=idArr.join(",")
				}
//			},{
//				id: "_op",
//				label: "操作",
//				align: "center",
//				width: 50,
//				buttons: ["view"],
//				forzen: true
			}],
			toolbar: {
				id:"toolbar",
				refresh : false,
				add:false,
				"delete":false, 
				onView: function(record, selected) {
					Component.onView(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId);
				},
				items:[{
					id:"name",
					type:"textfield",
					placeholder:"用户名称",
					width:"200px",
					cssLi:{
						"border-right":"0"
					}
				},{
					icon:"iconfont icon-search",
					click:function(){
						var String=require('String'); 
						var val=$("#toolbar #name").val();
						if(String.isBlank(val)==false){
							_grid.reload({"name":val});
						}
					}
				}]
			},
			loadSuccess:function(){
				if(!_recoresAll)_recoresAll=_grid.configs.records;
				_grid.setSelected((_params.id||"").split(","),_params.valueKey||"id");
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	var getTree = function() {
		var cfgTree = {
			async : {
				url : Ajax.getUrl(_baseUrlTree+"listTree")
			},
			callback : {
				beforeClick : function(treeId, treeNode, clickFlag) {
					var selectNode = _tree.getSelectedNodes()[0];
				},
				onClick : function(treeId, treeNode) {
					if(_dialog)_dialog.hide();
					var selectNode = _tree.getSelectedNodes()[0];
					_nodeId = selectNode.id;
					_nodeName = selectNode.name;
					_tree.expandNode(selectNode);
					_grid.reload({
						"departmentId":_nodeId
					});
					return;
				}
			}
		};
		_tree = Tree.create(cfgTree);
		return _tree;
	};
	var getTreeToolbar=function(){
		var cfgToolbar={
			id:"treeToolbar",
			items:[{
				icon: "iconfont icon-expand",
				value:"展开",
				click:function(){
					_tree.expandAll(true);
				}
			},{
				icon: "iconfont icon-shousuo",
				value:"收缩",
				click:function(){
					_tree.expandAll(false);
				}
//			},{
//				icon: "iconfont icon-refresh3",
//				value:"刷新",
//				click:function(){
//					_tree.refresh();
//				}
			}]
		};
		var toolbar=Toolbar.create(cfgToolbar);
		return toolbar.toolbar;
	};
	/***************函数调用***************/
	exports.showSelect=function (params,callback){
		_params=params;
		var dialog=Dialog.confirm({
			width:"80%",
			height:"100%",
			title:"部门用户选择",
			content:"",
			confirm:function(){
				var idArr=(_params.id||"").split(",");
				var _records=[];
				for(var i=0;i<idArr.length;i++){
					for(var j=0;j<_recoresAll.length;j++){
						if(idArr[i]==_recoresAll[j].id){
							_records.push(_recoresAll[j]);
							break;
						}
					}
				}
				if(_params.selectType=="radio"){
					_records=_grid.getSelectedRecord()
					callback(_records[0]||{});
				}else{
					callback(_records);
				}
				return true;
			}
		});
		_border = BorderLayout.create({
			parent:dialog.content.find("div"),
			west : {
				width : 229,
				north : {
					height : 36,
					item : getTreeToolbar()
				},
				center : {
					css : {
						"overflow" : "auto"
					},
					item :getTree().tree
				}
			},
			center: {
				item: getGrid()
			}
		});
	};
});
define('File',['Component','Lang','Date','Mask','Ajax','Img','Img'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var Component = require('Component');
	var Lang = require('Lang');
	var Date = require('Date');
	var Mask = require('Mask');
	var Ajax = require('Ajax');
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		label:"",
		labelCss:{},
		labelAttr:{},
//		value:"",
		isNull:true,
		auto:true,//选择文件后，马上上传
		showImg:true,
		multiple:false,
		downloadAll:false,
		isToolBar:false,
		importParams:null,//导入参数：{table:"patent_sale",columns:[name,..],ignoreRow:[]}
		path:"uploads/file",//上传路径，默认为“upload/当前日期/”
		cls:"",
		css:{},
		action:"upload/run",
		attr:{disabled:false,maxLen:0},
		onSuccess:function(rs){}
//		1.accept="application/msexcel"
//		2.accept="application/msword"
//		3.accept="application/pdf"
//		4.accept="application/poscript"
//		5.accept="application/rtf"
//		6.accept="application/x-zip-compressed"
//		7.accept="audio/basic"
//		8.accept="audio/x-aiff"
//		9.accept="audio/x-mpeg"
//		10.accept="audio/x-pn/realaudio"
//		11.accept="audio/x-waw"
//		12.accept="image/gif"
//		13.accept="image/jpeg"
//		14.accept="image/tiff"
//		15.accept="image/x-ms-bmp"
//		16.accept="image/x-photo-cd"
//		17.accept="image/x-png"
//		18.accept="image/x-portablebitmap"
//		19.accept="image/x-portable-greymap"
//		20.accept="image/x-portable-pixmap"
//		21.accept="image/x-rgb"
//		22.accept="text/html"
//		23.accept="text/plain"
//		24.accept="video/quicktime"
//		25.accept="video/x-mpeg2"
//		26.accept="video/x-msvideo"
	};
	/** * 类定义 ** */
	var File = function(configs) {
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.path=this.configs.path+"/"+Date.getDate("");
		this._className="sea_file";
		this.files=[];
		//初始化
		this.label = Component.createLabel(this.configs);
		var me=this;
		this.file=$('<form id=form'+this.configs.id+' style="position:relative;width:100%;text-align:left;" method="post" enctype="multipart/form-data"></form>')
		.attr("action",Session.basePath+me.configs.action)
		.addClass(me._className);
		this._input= $("<input class='sea_textfield' type='hidden' id='"+this.configs.id+"' name='"+this.configs.id+"' />").appendTo(this.file);
		this._button=$("<input type='button'value='"+(this.configs.value||Lang.browse)+"'/>")
		.css({
			"line-height":"15px",
			"text-align":"center",
			"padding":"5px 15px",
			"cursor": "pointer",
			"margin-right":"5px",
			"border":"1px solid #ccc"
		}).click(function(){
			me._file.click();
		});
		me._button.appendTo(me.file);
		if(me.configs.isToolBar==false){
			me.ul=$("<ul style='padding:3px 3px 5px 10px;line-height:20px;'></ul>").appendTo(me.file);
			var li=$("<li style='display:block;width:100%'></li>").appendTo(me.ul).append(me._button);
		}
		this._file=$("<input type='file' name='"+this.configs.id+"' style='display:none;position:absolute;top:0;left:0;width:88%;height:30px;line-height:30px;filter:alpha(opacity:0);opacity: 0;'/>")
		.appendTo(this.file).change(function(){
			 var mask=Mask.show(); 
			 setTimeout(function(){
				 var formData = new FormData($("#form"+me.configs.id)[0]);  
				 $.ajax({   
				   url: Session.basePath +me.configs.action,
			       type: 'post',
			       data: formData,
		    	   dataType : "json",
			       async: false,
			       cache: false,
			       contentType: false,
			       processData: false,
			       success: function(rs) {    
				 		var path=rs.data[me.configs.id];
			    		var pathVal=me._input.val();
		    			var pathArr=[];
		    			if(pathVal!=""){
		    				pathArr=pathVal.split(",");
		    			}
				 		if(me.configs.showImg==true){
					 		$.each(path,function(index,item){
					 			if($.trim(item)=="")return true;
					 			pathArr.push(item);
					 			var Img=require('Img');
						 		var _img=Img.create({src:me.getPath(item)}).img;
						 		$("<li style='display:block;width:100%'></li>")
				 				.appendTo(me.ul).append(_img)
				 				.append("<a class='deletefile'  path='"+item+"' style='margin-left:10px' href=#><i class='iconfont icon-remove'></i></a>");
					 		});
				 		}else{
				 			$.each(path,function(index,item){
				 				pathArr.push(item);
				 				var fileName=Ajax.getUrlParam(item,"attname")||column.label;
				 				$("<li style='display:block;width:100%'></li>")
				 				.appendTo(me.ul)
				 				.append("<a class='_file' style='color:blue'target=_blank href='"+(me.getPath(item))+"' download='"+fileName+"'>"
				 						+fileName+"</a> <a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='iconfont icon-remove'></i></a>");
					 		});
				 		}
				 		me._input.val(pathArr.join(","));
					    mask.hide();
				 		me.configs.onSuccess(rs);   
			    	   },
			       error: function(rs) {    
			    		 alert(JSON.stringify(rs));   
		    	   }  
				});
			 },100);
		});
		$("body").delegate(".sea_file .deletefile", "click", function() {
			var pathArr=me._input.val().split(",");
			var path=$(this).attr("path");
			$.each(pathArr,function(index,item){
				if(item==path){
					delete pathArr[index];
				}
			});
			me._input.val(pathArr.join(","));
			$(this).parent().remove();
		});
		if(this.configs.multiple)this._file.attr("multiple","multiple");
		if(this.configs.accept)this._file.attr("accept",this.configs.accept);
		this.file.append("<input id='_uploadPath' name='_uploadPath' type='hidden' value='"+this.configs.path+"' />");
		if(this.configs.importParams){
			this.file.append("<input id='_importParams' name='_importParams' type='hidden' value='"+JSON.stringify(this.configs.importParams)+"' />");
			Log.begTime=Date.getTimestamp();
			this.file.append("<input id='_log' name='_log' type='hidden' value='"+JSON.stringify(Log)+"' />");
		}
	};
	
	//类公共方法
	File.prototype={
		download:function(name, href) {
	      var a = document.createElement("a"), //创建a标签
		  e = document.createEvent("MouseEvents"); //创建鼠标事件对象
		  e.initEvent("click", false, false); //初始化事件对象
		  a.href = href; //设置下载地址
		  a.setAttribute("class","_download");
		  a.download = name; //设置下载文件名
		  a.dispatchEvent(e); //给指定的元素，执行事件click事件
		  a.remove();
	  	},
		getPath:function(path){
			if(path.indexOf("http")>=0){
				return path;
			}else{
				return Session.basePath+path;
			}
		},
		val:function(data){
			var path;
			var me=this;
			var pathArr=[];
			if(data!=null||data!=undefined){
				data=data[this.configs.id];
				if(this.configs.showImg==true){
					path=(data||"").split(",");
					me.file.find(".sea_img").remove();
			 		$.each(path,function(index,item){
						if($.trim(item)=="")return;
						pathArr.push(item);
			 			var Img=require('Img');
				 		var _img=Img.create({src:me.getPath(item)}).img;
				 		$("<li style='display:block;width:100%'></li>")
		 				.appendTo(me.ul).append(_img).append("<a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='iconfont icon-remove'></i></a>");
			 		});
				}else{
					if(data){
						path=data.split(",");
						$.each(path,function(index,item){
							if($.trim(item)=="")return;
			 				pathArr.push(item);
			 				var fileName=Ajax.getUrlParam(item,"attname")||column.label;
			 				$("<li style='display:block;width:100%'></li>")
			 				.appendTo(me.ul)
			 				.append("<a class='_file' style='color:blue'target=_blank href='"+me.getPath(item)+"' download='"+fileName+"'>"+fileName+"</a> <a class='deletefile' path='"+item+"' style='margin-left:10px' href=#><i class='iconfont icon-remove'></i></a>");
			 				me.files.push({"name":fileName,"href":me.getPath(item)});
				 		});
					}
				}
				me._input.val(pathArr.join(","));
			}else{ 
				return this._input.val();
			}
		},
		check:function(){
			return true;
		},
		clear:function(){
			this._input.val("");
		},
		//设置焦点
		focus:function(){
			return Component.focus(this._input);
		},
		//显示 
		show:function(){
			return Component.show(this._input);
		},
		//隐藏
		hide:function(){
			return Component.hide(this._input);
		},
		//禁用
		disabled:function(){
			return Component.disable(this._input);
		},
		//启用
		enabled:function(){
			return Component.enabled(this._input);
		}
	};
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new File(configs);
	};
});

define('Textfield',['Input'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		validator:'char',
		label:"",
		labelCss:{},
		labelAttr:{},
		value:"",
		isNull:true,
		nullWarning:null,
		subtype:"text",
		icon:null,
		iconCss:null,
		iconAlign:"right",
		cls:"",
		css:{},
//		attr:{disabled:false,maxLen:0},
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var Textfield = function(configs) {
		var me=this;
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_textfield";
		//初始化
		this.textfield=this._input= $("<input autocomplete='off' type='"+this.configs.subtype+"'/>");
		if(this.configs.icon){
			this.textfieldIcon=$("<div style='display: inline;position:relative;padding:0;text-align:left;'></div>").css("width",this.configs.width);
			this._input.css({"width":this.configs.width,"border-radius":"6px"});
			
			this._icon=$("<div class='"+this.configs.icon+"' style='width: 46px;height:2.1rem;line-height:2.1rem;border-radius: 0 6px 6px 0;color:#fff;cursor:pointer;margin:0;text-align:center;position:absolute;'></div>")
			.css(this.configs.iconCss||{
			})
			.click(function(){
				if(me.configs.readonly=="readonly"||me.configs.readonly==true||me.configs.disabled=="disabled"||me.configs.disabled==true)return;
				me.configs.click();
			});
			this.textfieldIcon.append(this._icon).append(this._input);
			if(this.configs.iconAlign=="left"){
				this._icon.css("left","0");
				this._input.css({"padding-left":"49px"});
			}else{
				this._icon.css("right","0");
				this._input.css({"padding-right":"49px"});
			}
		}
		this.init();
		if(this.configs.icon){
			this._input.unbind("click");
		}
		if(Session.isMini==false){
			if(this.configs.icon){
				var interval=setInterval(function(){
					if($("#"+me.configs.id).length){
						me.textfield.width(me.textfieldIcon.parent().width()-38);
						clearInterval(interval);
					}
				},100);
			}
		}
	};
	//类公共方法
	var Input=require('Input').create();
	Textfield.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new Textfield(configs);
	};
});

define('Textarea',['Input'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : "",
		rows:3,
		cols:20,
		isNull : true,
		cls : "",
		css : {},
		attr : {	},
		events : {
			//click : null,
			//change : null
		}
	};
	/** * 模块私有方法 ** */
	/** * 类定义 ** */
	var Textarea = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_textarea";
		//初始化
		this.textarea=this._input=$("<textarea></textarea>");
		this.init();
	};
	// 类公共方法
	var Input=require('Input').create();
	Textarea.prototype = $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Textarea(configs);
	};
});

define('Select',['Lang','Ajax','Input'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var Lang = require('Lang');
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",
		label:"",
		labelCss:{},
		labelAttr:{},
		value:"",
		isNull:true,

		cls:"",
		css:{},
//		attr:{disabled:false,maxLen:0},
		url:null,//返回[{value:"",text:""},{...}]
		params:{},//url时生效
		options:[],
		valueKey:"id",//value
		textKey:"name",//text
        hasNullVal:true,
		nullValue:"",
		nullText:Lang["please.select"],
		events:{
			click:null,
			change:null
		}
	};
	/** * 类定义 ** */
	var Select = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_select";
		//初始化
		this.select=this._input= $("<select></select>");
        this.configs.hasNullVal&&this.select.append("<option value='"+this.configs.nullValue+"'>"+this.configs.nullText+"</option>");
		if(this.configs.url){
			Ajax=require('Ajax');
			var me=this;
			Ajax.post(this.configs.url,this.configs.params,function(rs){
				var len=rs.data.length;
				for(var i=0;i<len;i++){
					var item=rs.data[i];
					me.select.append("<option value='"+item[me.configs.valueKey]+"'>"+item[me.configs.textKey]+"</option>");
				};
			},false);
		}else{
			var len=this.configs.options.length;
			if($.type(this.configs.options[0])=="object"){
				for(var i=0;i<len;i++){
					var item=this.configs.options[i];
					this.select.append("<option value='"+item[this.configs.valueKey]+"'>"+item[this.configs.textKey]+"</option>");
				}
			}else{
				for(var i=0;i<len;i++){
					var item=this.configs.options[i];
					this.select.append("<option value='"+item+"'>"+item+"</option>");
				}
			}
		}
		this.select.val(this.configs.value||"");
		this.init();
	};
	//类公共方法
	var Input=require('Input').create();
	Select.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new Select(configs);
	};
});
define('RadioGroup',['Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');
	
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			name:"",//必须有name
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			isNull:true,
			css : {},
			attr : {	},
			items:[{
//				id : "",
//				value : "",
//				checked:false,
//				cls : "",
//				css : {},
//				attr : {	},
//				events : {
//					click : null
//				}
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
		me.radioGroup=$("<div></div>").addClass(me._className);
		me.radios=[];
		me.label = Component.createLabel(me.configs);
		var ul=$("<ul></ul>").appendTo(me.radioGroup);
		$.each(me.configs.items,function(index,item){
			var li=$("<li ></li>").appendTo(ul);
			if(me.configs.align=="0"||me.configs.align=="horizontal"){
				li.css({"display":"inline","float":"left"});
			}
			item.labelCls="sea_radioLabel";
			item.id=me.configs.id+index;
			var checked="";
			if(item.value==me.configs.value){
				checked="checked";
			}
			var radio=$("<input id='"+item.id+"' type='radio' name='"+(me.configs.name||me.configs.id)+"' value='"+item.value+"' "+checked+"/>").appendTo(li);
			
			me.radios.push(radio);
			li.append("&nbsp;");
			var label=Component.createLabel(item).appendTo(li);
			// 控件类名设置
			Component.addClass(radio, item);
			// 控件样式设置
			Component.css(radio, item);
			// 控件的属性设置
			Component.attr(radio, item);
			// 控件默认值
			Component.val(radio, item);
			// 控件的事件绑定
			Component.bind(radio, item);
		});
		// 控件类名设置
		Component.addClass(me.radioGroup, me.configs);
		// 控件样式设置
		Component.css(me.radioGroup, me.configs);
		// 控件的属性设置
		Component.attr(me.radioGroup, me.configs);
		}
	};
	/** * 类定义 ** */
	var RadioGroup = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_radiogroup";
		//初始化
		self.init(this);
	};
	// 类公共方法
	RadioGroup.prototype = {
		val:function(data){
			if(data){
				data=data[this.configs.id];
				$.each(this.radios,function(index,item){
					item.removeAttr("checked");
					if(item.val()==data){
						item.click();
						item.attr("checked",true);
					}
				});
			}else{
				for(var i=0;i<this.radios.length;i++){
					if(this.radios[i].is(':checked')){
						return this.radios[i].val();
					}
				}
				return "";
			}
		},
		check:function(){
			if(this.configs.isNull==false){
				this.radioGroup.parent().removeClass("sea_input_warning");
				for(var i=0;i<this.radios.length;i++){
					if($(this.radios[i]).is(':checked')){
						return true;
					}
				}
				this.radioGroup.parent().addClass("sea_input_warning");
				this.radioGroup.parent().attr("title","该字段不能为空").tip({}).trigger("show");
				return false;
			}
			return true;
		},
		clear:function(){
			this.radioGroup.find("input[type=radio]").removeAttr("checked");
		},
		//设置焦点
		focus:function(){
			return Component.focus($(this.radios[0]));
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new RadioGroup(configs);
	};
});

define('Radio',['Input'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : "",
		name:"",//同名则为group
		cls : "",
		checked:false,
		css : {},
		attr : {	},
		events : {
			//click : null,
			//change : null
		}
	};
	/** * 模块私有方法 ** */
	/** * 类定义 ** */
	var Radio = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_radio";
		//初始化
		this.radio=this._input= $("<input type='radio'/>");
		this.configs.labelCls="sea_radioLabel";
		this.init();
	};
	//类公共方法
	var Input=require('Input').create();
	Radio.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		val:function(data){
			if(data){
				data=data[this.configs.id];
				if(data=="true"||data==true||data=="checked"){
					this._input.attr("checked",data);
					this._input.prop('checked',true);
				}else{
					this._input.removeAttr("checked");
				}
			}else{ 
				return this._input.is(':checked');
			}
		},
		//清空函数
		clear:function(){
			this._input.removeAttr("checked");
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Radio(configs);
	};
});

define('Link',['Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/link.css");
	var Component = require('Component'); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			separator:"&nbsp;",
			cls : "",
			css : {},
			attr : {	},
			items:[{
				id : "",
				label : "",
				imgCls:"",
				imgAlign:"left",
				cls : "",
				css : {},
				attr : {},
				events : {
					//click : null
				}
			}]
	};
		/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.link=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.link);
			var len=me.configs.items.length;
			$.each(me.configs.items,function(index,item){
				var	li=$("<li></li>").appendTo(ul); 
				var a=$("<a href='#'>"+Global.getI18N(item.label)+"</a>").appendTo(li);
				if(item.imgCls){
					if(item.imgAlign&&item.imgAlign=="left"){
						a.prepend("<span  class='"+item.imgCls+"'></span>");
					}else{
						a.append("<span  class='"+item.imgCls+"'></span>");
					}
				}
				// 控件类名设置
				Component.addClass(a, item);
				// 控件样式设置
				Component.css(a, item);
				// 控件的属性设置
				Component.attr(a, item);
				// 控件的事件绑定
				Component.bind(a, item);
				if(index<len-1){
					$("<li></li>").append(me.configs.separator).appendTo(ul);
				}
			});
			// 控件类名设置
			Component.addClass(me.link, me.configs);
			// 控件样式设置
			Component.css(me.link, me.configs);
			// 控件的属性设置
			Component.attr(me.link, me.configs);
		}
	}; 
	/** * 类定义 ** */
	var Link = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_link";
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Link.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Link(configs);
	};
});

define('Label',['Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');

	/** * 模块私有数据 ** */
	var ClassName="sea_label";
	var defaults = {
		id : "",
		label : "",
		isNull : true,
		cls : "",
		css : {},
		attr : {}
	};
	 
	/** * 类定义 ** */
	var Label = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		this.label=$("<label>"+Global.getI18N(this.configs.label)+"</label>").addClass(ClassName);
		if(this.configs.isNull==false || this.configs.isNull=="false"){
			this.label.append("<span style='color:red'>*</span>");
		}
		//控件类名设置
		Component.addClass(this.label,this.configs);
		//控件样式设置
		Component.css(this.label,this.configs);
		//控件属性设置
		Component.attr(this.label,this.configs);
	};
	// 类公共方法
	Label.prototype = {
		html:function(html){
			if(html){
				this.label.html(html);
			}else{
				return this.label.html();
			}
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Label(configs);
	};
});

define('Img',['Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');

	/** * 模块私有数据 ** */
	var ClassName="sea_img";
	var defaults = {
		id : "",
		src:"#",
		cls : "",
		css : {},
		attr : {}
	};
	 
	/** * 类定义 ** */
	var Img = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		this.img=$("<img src='"+this.configs.src+"'>").addClass(ClassName);
		//控件类名设置
		Component.addClass(this.img,this.configs);
		//控件样式设置
		Component.css(this.img,this.configs);
		//控件属性设置
		Component.attr(this.img,this.configs);
	};
	// 类公共方法
	Img.prototype = {
	 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Img(configs);
	};
});

define('Hidden',['Component','Input'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Component = require('Component');
	// require("./template.css");
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : ""
	};
 
	/** * 类定义 ** */
	var Hidden = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_hidden";
		//初始化
		this.hidden=this._input= $("<input type='hidden'/>");
		this.init();
	};
	//类公共方法
	var Input=require('Input').create();
	Hidden.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		//检查函数
		check:function(configs){
			return true;
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Hidden(configs);
	};
});

define('DateTime',['Jedate','Component','Lang','Input'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
	//require.async(("./jedate/skin/jedate.css");
	require('Jedate');
	var Component = require('Component');
	var Lang = require('Lang');
	/** * 模块私有数据 ** */
	//默认配置
	var defaults = {
		id:"",								  //统一使用id替换dateCell
		label:"",
		labelCss:{},
		labelAttr:{},
		limit:"date"
//		dateCell:"#id",                       //目标元素。由于jedate.js封装了一个轻量级的选择器，因此dateCell还允许你传入class、tag这种方式 '#id .class'
//		skinCell:"jedateblue",                //日期风格样式，默认蓝色
//		format:"YYYY-MM-DD hh:mm:ss",         //日期格式 （1、 YYYY-MM-DD hh:mm:ss 2、 YYYY-MM-DD hh:mm 3、 YYYY-MM-DD 4、 YYYY-MM 5、 YYYY 6、 hh:mm:ss 7、 hh:mm ）
//		minDate:"1900-01-01 00:00:00",        //最小日期
//		maxDate:"2099-12-31 23:59:59",        //最大日期
//		startMin:"",                          //清除日期后返回到预设的最小日期
//		startMax:"",                          //清除日期后返回到预设的最大日期
//		isinitVal:false,                      //是否初始化时间，默认不初始化时间
//		initAddVal:[0],                       //初始化时间，加减 天 时 分
//		isTime:true,                          //是否开启时间选择
//		ishmsLimit:false,                     //时分秒限制
//		ishmsVal:true,                        //是否限制时分秒输入框输入，默认可以直接输入时间
//		isClear:true,                         //是否显示清空
//		isToday:true,                         //是否显示今天或本月
//		clearRestore:true,                    //清空输入框，返回预设日期，输入框非空的情况下有效
//		festival:false,                       //是否显示节日
//		fixed:true,                           //是否静止定位，为true时定位在输入框，为false时居中定位
//		zIndex:2099,                          //弹出层的层级高度
//		marks:null,                           //给日期做标注
//		choosefun:function(elem, val) {},     //选中日期后的回调, elem当前输入框ID, val当前选择的值
//		clearfun:function(elem, val) {},      //清除日期后的回调, elem当前输入框ID, val当前选择的值
//		okfun:function(elem, val) {},         //点击确定后的回调, elem当前输入框ID, val当前选择的值
//		success:function(elem) {}             //层弹出后的成功回调方法, elem当前输入框ID
	};
	/** * 类定义 ** */
	var DateTime = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this.configs.dateCell="#"+this.configs.id;//统一使用id替换dateCell
		this._className="sea_datetime";
		//初始化
		this.label=Component.createLabel(this.configs);
		this.dateTime=this._input= $("<input type='text'/>")
						.attr("id",this.configs.id)
						.attr("placeholder",Lang["please.select"])
						.attr("value",this.configs.value||"");
        // 控件的属性设置
        Component.attr(this._input, this.configs);
		var me=this;
		var interval=setInterval(function(){
				if($(me.configs.dateCell).length>0){
					jeDate(me.configs);
					clearInterval(interval);
				}
			},100);
	};
	//类公共方法
	var Input=require('Input').create();
	DateTime.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
	});
	/*** 输出类对象 ***/
	exports.create = function(configs) {
		return new DateTime(configs);
	};
});

define('CheckGroup',['Component','Array'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/checkgroup.css");
	var Component = require('Component');
	var Array = require('Array');
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			css : {},
			cssLi:{},
			attr : {	},
			items:[{
				label:"",
				value:"",
				checked:false,
				html:"",
				cls : "",
				css : {},
				attr : {	},
				events : {
					//click : null
				}
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.checkGroup=$("<div></div>").addClass(me._className);
			me.checkboxs=[];
			me.label = Component.createLabel(me.configs);
			var ul=$("<ul></ul>").appendTo(me.checkGroup);
			$.each(me.configs.items,function(index,item){
				var li=$("<li></li>").css(me.configs.cssLi).appendTo(ul);
				if(me.configs.align=="0"||me.configs.align=="horizontal"){
					li.css("display","inline");
				}
				item.labelCls="sea_checkLabel";
				item.id=me.configs.id+index;
				var checkbox=$("<input  id='"+item.id+"' type='checkbox'/>").appendTo(li);
				if(item.checked){
					checkbox.attr("checked",item.checked);
				}
				me.checkboxs.push(checkbox);
				var label=Component.createLabel(item).appendTo(li);
				if(item.html)ul.append(item.html);
				// 控件类名设置
				Component.addClass(checkbox, item);
				// 控件样式设置
				Component.css(checkbox, item);
				// 控件的属性设置
				Component.attr(checkbox, item);
				// 控件默认值
				Component.val(checkbox, item);
				// 控件的事件绑定
				Component.bind(checkbox, item);
			});
			// 控件类名设置
			Component.addClass(me.checkGroup, me.configs);
			// 控件样式设置
			Component.css(me.checkGroup, me.configs);
			// 控件的属性设置
			Component.attr(me.checkGroup, me.configs);
		}
	};
	/** * 类定义 ** */
	var CheckGroup = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_checkgroup";
		//初始化
		self.init(this);
	};
	// 类公共方法
	CheckGroup.prototype = {
		 val:function(data){
			if(data){
				data=data[this.configs.id];
				$.each(this.checkboxs,function(index,item){
					if(Array.getIndex(data,item.val())>=0){
						item.attr("checked",true);
					}
				});
			}else{
				var rs=[];
				for(var i=0;i<this.checkboxs.length;i++){
					if(this.checkboxs[i].is(':checked')){
						rs.push(this.checkboxs[i].val());
					}
				}
				return rs.join("|");
			}
		},
		check:function(){
			if(this.configs.isNull==false){
				this.checkGroup.parent().removeClass("sea_input_warning");
				for(var i=0;i<this.checkboxs.length;i++){
					if($(this.checks[i]).is(':checked')){
						return true;
					}
				}
				this.checkGroup.parent().addClass("sea_input_warning");
				this.checkGroup.parent().attr("title","该字段不能为空").tip({}).trigger("show");
				return false;
			}
			return true;
		},
		clear:function(){
			this.checkGroup.find("input[type=checkbox]").removeAttr("checked");
		},
		//设置焦点
		focus:function(){
			return Component.focus($(this.checks[0]));
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new CheckGroup(configs);
	};
});

define('Checkbox',['Input'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	/** * 模块私有数据 ** */
	var defaults = {
			id : "",
			value : "",
			cls : "",
			checked:false,
			labelAlign:'right',
			showLabelWidth:true,//保留Label的宽度
			css : {},
			attr : {},
			events : {
				//click : null,
				//change : null
			}
	};
	/** * 模块私有方法 ** */
	/** * 类定义 ** */
	var Checkbox = function(configs) {
		 //类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_checkbox";
		//初始化
		this.configs.width="";
        this.checkbox=this._input= $("<input checked="+this.configs.checked+" type='checkbox'/>");
		this.configs.labelCls="sea_checkLabel";
		this.init();
	};	
	//类公共方法
	var Input=require('Input').create();
	Checkbox.prototype= $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		val:function(data){
			if(data){
				data=data[this.configs.id];
				if(data=="true"||data==true||data=="checked"){
					this._input.attr("checked",data);
					this._input.prop('checked',true);
				}else{
					this._input.removeAttr("checked");
				}
			}else{ 
				return this._input.is(':checked');
			}
		},
		//清空函数
		clear:function(){
			this._input.removeAttr("checked");
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Checkbox(configs);
	};
});

define('ButtonGroup',['Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/buttongroup.css");
	var Component = require('Component'); 
	/** * 模块私有数据 ** */
	var defaults = {
			id:"",
			align:"0",//横排：horizontal  或 0; 竖排：vertical 或 1
			cls : "",
			css : {},
			attr : {},
			separatorWidth:20,
			items:[{
				id : "",
				value : "",
				cls : "",
				css : {},
				attr : {},
				icon:null,
				img:null,
				events : {
					//click : null
				}
			}]
	};
	/** * 模块私有方法 ** */
	var self = {
		init : function(me) {
			me.buttonGroup=$("<div></div>").addClass(me._className);
			var ul=$("<ul></ul>").appendTo(me.buttonGroup);
			$.each(me.configs.items,function(index,item){
				var li;
				if(item.icon){
					li=$("<li></li>").append("<button type='button'><span class='"+item.icon+"'></span>"+Global.getI18N(item.value)+"</button>").appendTo(ul);
				}else if(item.img){
					li=$("<li></li>").append("<button type='button'>"+item.img+Global.getI18N(item.value)+"</button>").appendTo(ul);
				}else{
					li=$("<li></li>").append("<button type='button'>"+Global.getI18N(item.value)+"</button>").appendTo(ul);
				}
				if(me.configs.align=="0"||me.configs.align=="horizontal"){
					li.css("display","inline");
				}
				if(index<(me.configs.items.length-1)){
					li.css("margin-right",me.configs.separatorWidth);
				}
				var button=li.find("button");
				// 控件类名设置
				Component.addClass(button, item);
				// 控件样式设置
				Component.css(button, item);
				// 控件的属性设置
				Component.attr(button, item);
				// 控件的事件绑定
				Component.bind(li, item);
			});
			// 控件类名设置
			Component.addClass(me.buttonGroup, me.configs);
			// 控件样式设置
			Component.css(me.buttonGroup, me.configs);
			// 控件的属性设置
			Component.attr(me.buttonGroup, me.configs);
		}
	};
	/** * 类定义 ** */
	var ButtonGroup = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		// 初始化
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_buttongroup";
		//初始化
		self.init(this);
	};
	// 类公共方法
	ButtonGroup.prototype = {
		 
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new ButtonGroup(configs);
	};
});

define('Button',['Component','Input'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/button.css");
	var Component = require('Component'); 
	/** * 模块私有数据 ** */
	var defaults = {
		id : "",
		value : "",
		cls : "",
		css : {},
		attr : {	},
		icon:null,
		events : {
			//click : null
		}
	};
	/** * 类定义 ** */
	var Button = function(configs) {
		// 类的属性定义
		this.configs=$.extend(true,{},defaults,configs);
		this._className="sea_button";
		//初始化
		this._input =$("<button type='button'>"+Global.getI18N(this.configs.value)+"</button>").addClass(this._className);
		if(this.configs.icon){
			this._input.prepend("<span  class='"+this.configs.icon+"'></span>");
		}
		this.button=this._input;
		this.init();
	};
	// 类公共方法
	var Input=require('Input').create();
	Button.prototype =  $.extend({},Input,{
		/**多态：新增或覆盖父类方法**/
		//检查函数
		check:function(configs){
			return true;
		}
	});
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Button(configs);
	};
});

define('String',function(require, exports, module) {

	exports.checkPassword = function(str) {
		if (str.length < 6) {
			return -1;
		}
		if (/[a-zA-Z]+/.test(str) && /[0-9]+/.test(str) && /\W+\D+/.test(str)) {
			return 3;
		}
		if (/[a-zA-Z]+/.test(str) && /[0-9]+/.test(str)) {
			return 2;
		}
		if (/\[a-zA-Z]+/.test(str) && /\W+\D+/.test(str)) {
			return 2;
		}
		if (/[0-9]+/.test(str) && /\W+\D+/.test(str)) {
			return 2;
		}
		return -1;
	};
	
	exports.startWith = function(str, prefix) {
		return str.slice(0, prefix.length) === prefix;
	};

	exports.endsWith = function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};
	/*
	 * @Description: undefined字符串返回空，否则返回原字符串 @ param str @ return str @date
	 * 2015-12-31 @author:kfzx-fenggq
	 */
	exports.isNil = function(str) {
		if (str == undefined || str == null)
			str = '';
		return str;
	};

	/*
	 * @Description: undefined字符串返回then，否则返回原字符串 @ param str * @ return str
	 * @date 2015-12-31 @author:kfzx-fenggq
	 */
	exports.isNil = function(str, then) {
		if (str == undefined || str == null)
			str = then;
		return str;
	};


	/*
	 * @Description: 判断字符串是否为空 @ param str @ return boolean @date 2015-12-31
	 * @author:kfzx-fenggq
	 */
	exports.isBlank = function(str) {
		if ($.type(str) == 'boolean')
			return str;
		if (str === undefined || str === null || str === '')
			return true;
		return false;
	};
	exports.isEmptyObj = function(obj) {
		var key;
		for (key in obj)
			return !1;
		return !0
	}
	/*
	 * @Description:
	 * 使用参数替换指定字符串中的参数标志，字符串中的参数标识形如（数字1：对应的参数以分号隔开，第一个对应的参数标识0，后面的逐个加1 @ param
	 * str @ return String @date 2015-12-31 @author:kfzx-fenggq
	 */
	exports.strUseParam = function(str, params) {
		var replaceStr = "";
		var separator = ";";
		var paramArr = params.toString().split(separator);
		for (var i = 0; i < paramArr.length; i++) {
			replaceStr = new RegExp("\\[" + i + "\\]", "g");
			str = str.replace(replaceStr, paramArr);
		}
		return str;
	};
	/*
	 * @Description: 字符串的第一个字母大写 @ param str @ return String @date 2015-12-31
	 * @author:kfzx-fenggq
	 */
	exports.upperFirst = function(str) {
		if (str.length > 0) {
			str = str.substr(0, 1).toUpperCase() + str.substr(1);
		}
		return str;
	};

	exports.upper_ = function(str) {
		while (str.indexOf("_") >= 0) {
			var left = str.substr(0, str.indexOf("_"));
			var right = str.substr(str.indexOf("_") + 1);
			right = right.substr(0, 1).toUpperCase() + right.substr(1);
			str = left + right;
		}
		return str;
	};
	exports.upperTo_ = function(str) {
		var rs = "";
		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i);
			if (c > 'A' && c < 'Z') {
				rs += "_" + c.toLowerCase();
			} else {
				rs += c;
			}
		}
		return rs;
	};
	startWith = function(stirng, str) {
		var reg = new RegExp("^" + str);
		return reg.test(stirng);
	};
	exports.startWith=startWith;
	exports.endWith = function(stirng, str) {
		var reg = new RegExp(str + "$");
		return reg.test(stirng);
	};

	exports.UrlEncode = function(str) {
		var ret = "";
		var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
		var tt = "";
		for (var i = 0; i < str.length; i++) {
			var chr = str.charAt(i);
			var c = str2asc(chr);
			tt += chr + ":" + c + "n";
			if (parseInt("0x" + c) > 0x7f) {
				ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
			} else {
				if (chr == " ") {
					ret += "+";
				} else if (strSpecial.indexOf(chr) != -1) {
					ret += "%" + c.toString(16);
				} else {
					ret += chr;
				}
			}
		}
		return ret;
	};
	exports.UrlDecode = function(str) {
		var ret = "";
		for (var i = 0; i < str.length; i++) {
			var chr = str.charAt(i);
			if (chr == "+") {
				ret += " ";
			} else if (chr == "%") {
				var asc = str.substr(i + 1, i + 3);
				if (parseInt("0x" + asc) > 0x7f) {
					ret += asc2str(parseInt("0x" + asc + str.substr(i + 4, i + 6)));
					i += 5;
				} else {
					ret += asc2str(parseInt("0x" + asc));
					i += 2;
				}
			} else {
				ret += chr;
			}
		}
		return ret;
	};

	function str2asc(strstr) {
		return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
	};

	function asc2str(ascasc) {
		return String.fromCharCode(ascasc);
	};
	
	exports.delTag=function(str){
		var rs="";
		try{
			if(typeof str=='string'){
				rs=str.replace(/<[^>]+>/g,"");//去掉所有的html标记 
			}else{
				rs=str;
			}
		}catch(e){
			return "";
		}
		return rs;
	};
	exports.isUrl=function(url){
		if(startWith(url,"http:")||startWith(url,"https:"))
			return true;
		return false;
	};
});
define('Array',function(require, exports, module) {
	/**
	 * @Description: 获取数组字段的值，用于清单显示 
	 * @ param filedValue 
	 * @ param index 
	 * @ return 数组字段的值 
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	exports.getArrayFieldValue = function(arr, field) {
		var rs = "";
		for(var i=0;i<arr.length;i++){
			if(rs==""){
				rs=arr[i][field];
			}else{
				rs=rs+","+arr[i][field];
			}
		}
		return rs;
	};
	/**
	 * @Description: 获取字符串一维数组的索引 
	 * @ param arr 
	 * @ param item 
	 * @ return int @date
	 * 2015-12-31 @author:kfzx-fenggq
	 */
	exports.getIndex=function(arr, item)
	{
		var rs = -1;
		if (!arr || arr.length <= 0) {
			return rs;
		}
		for ( var i = 0; i < arr.length; i++) {
			if (arr[i] == item) {
				rs = i;
				break;
			}
		}
		return rs;
	};
	
	/**
	 * records=[{key:value,otherKey:otherValue}]
	 */
	exports.getRecordIndex=function(records,key,value){
		var index=-1;
		for(var i=0;i<records.length;i++){
			if(records[i][key]==value){
				index=i;
				break;
			}
		}
		return index;
	};
	
//	var arr = [
//		         {name:"小恭",age:11},
//		         {name:"小发",age:3},
//		         {name:"小喜",age:12},
//		         {name:"小财",age:40}
//	         ];
	//sortType=asc,desc
	exports.sort=function(arr,key,sortType){
		var compare = function(obj1,obj2){
		    var val1 = obj1[key];
		    var val2 = obj2[key];
			if("desc"==sortType){
				if(val1 < val2){
			       return 1;
			    }else if(val1 > val2){
			       return -1;
			    }else{
			       return 0;
			    }
			}else if("asc"==sortType){
				if(val1 > val2){
			       return 1;
			    }else if(val1 < val2){
			       return -1;
			    }else{
			       return 0;
			    }
			}
		}
		var sortArr = arr.sort(compare); 
		return sortArr;
	};
});

define('Component',['String'],function(require, exports, module) {
 	/***模块外部依赖***/ 
 	var String =require('String');
	/* @Description: focus
 	* @ param jq
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.focus=function(jq){
		var type=jq.attr("type");
		if(type&&type.indexOf("select")>=0){
			jq.focus();
		}else{
			try{
				var obj = jq.get(0);
				var txt;
				if(document.all)
					txt=obj.createTextRange();
				else
					txt=obj.createRange();
				txt.moveStart('character', obj.value.length);
				txt.collapse(true);
				txt.select();
			}catch(e){
				jq.focus();
			}
		}
		return jq;
	};
	/* @Description: 增加jQuery对象的类名
 	* @ param jq
 	* @ param configs 包含属性数组configs.cls
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var addClass=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if($.type(configs.cls)=="array"){
			for(var i=0;i<configs.cls.length;i++){
				jq.addClass(configs.cls);
			}
		}else{
			 if(!String.isBlank(configs.cls)){
				 jq.addClass(configs.cls);
			 }
		}
		 return jq;
	};
	exports.addClass=addClass;
	/* @Description: 增加jQuery对象的Css样式
 	* @ param jq
 	* @ param configs 包含属性数组configs.css
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var css=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if(configs.css){
			jq.css(configs.css);
		}
		 if(!String.isBlank(configs.width)){
		 	 jq.css("width",getSize(configs.width));
		 }
		 if(!String.isBlank(configs.height)){
		 	 jq.css("height",getSize(configs.height));
		 }
		 return jq;
	};
	exports.css=css;	
	exports.getStyle=function(configs,isGrid){
		var style=[];
		if(!configs)return style;
		if(configs.css){
			$.each(configs.css,function(key,val){
				style.push(key+":"+val);
			});
		}
		if(!String.isBlank(configs.align)){
			style.push("text-align:"+configs.align);
		}
		if(isGrid){
			if(!String.isBlank(configs.widthCol)){
				style.push("width:"+getSize(configs.widthCol));
			}else if(!String.isBlank(configs.width)){
				style.push("width:"+getSize(configs.width));
			}
		}else{
			if(!String.isBlank(configs.width)){
				style.push("width:"+getSize(configs.width));
			}
		}
		
		if(!String.isBlank(configs.height)){
			style.push("height:"+getSize(configs.height));
		}
		if(!String.isBlank(configs.display)){
			style.push("display:"+configs.display);
		}
		return " style='"+style.join(";")+"'";
	};
	/* @Description: 增加jQuery对象的属性
 	* @ param configs 包含属性数组configs.attr
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	var attr=function(jq,configs){
		if(!jq || !configs){
			return jq;
		}
		if(configs.attr){
			for(var key in configs.attr){
				var val=configs.attr[key];
				 jq.attr(key,val);
			}
		}
		 if(!String.isBlank(configs.id)){
		 	 jq.attr("id",configs.id);
		 }
		 if(!String.isBlank(configs.name)){
		 	 jq.attr("name",configs.name);
		 }
		 if (!String.isBlank(configs.title)) {
				jq.attr("title", configs.title);
			}
		 //textarea,input
		 if(!String.isBlank(configs.disabled)){
		 	 jq.attr("disabled",configs.disabled);
		 }
		 if(!String.isBlank(configs.readonly)){
		 	 jq.attr("readonly",configs.readonly);
		 }
		 //textarea
		 if(!String.isBlank(configs.rows)){
		 	 jq.attr("rows",configs.rows);
		 }
		 //textarea
		 if(!String.isBlank(configs.cols)){
		 	 jq.attr("cols",configs.cols);
		 }
		//input
		 if(!String.isBlank(configs.placeholder)){
		 	 jq.attr("placeholder",Global.getI18N(configs.placeholder));
		 }
		 //radio,check
		 if(!String.isBlank(configs.checked) ){
			 if(configs.checked==true || configs.checked=="true" || configs.checked=="checked"){
				 jq.attr("checked","checked");
			 }else{
				 jq.removeAttr("checked");
			 }
		 }
		 //table
		 if(!String.isBlank(configs.rowspan)){
		 	 jq.attr("rowspan",configs.rowspan);
		 }
		 if(!String.isBlank(configs.colspan)){
		 	 jq.attr("colspan",configs.colspan);
		 }
		//iframe,img..
		 if(!String.isBlank(configs.src)){
		 	 jq.attr("src",configs.src);
		 }
		if (!String.isBlank(configs.autocomplete)) {
			jq.attr("autocomplete", configs.autocomplete);
		}
		 return jq;
	};
	exports.attr=attr;
	/*@Description: jQuery对象设置默认值
 	* @ param jq=[],value=[]时，jq[i]=value[i];jq={},value=[]时，jq=value[0];jq={},value=“”时，jq=value
 	* @ param configs 包含属性数组configs.value[]
 	* @return jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.val=function(jq,configs){
		if($.type(jq)=="array"){
			for(var i=0;i<jq.length;i++){
				if(!String.isBlank(configs.value[i])){
					jq[i].val(configs.value[i]);
				}
			}
		}else{
			if($.type(configs.value)=="array"){
					if(!String.isBlank(configs.value[0])){
						jq.val(configs.value[0]);
					}
			}else{
				if(!String.isBlank(configs.value)){
					jq.val(configs.value);
				}
			}
		}
		return jq;
	};
	/*@Description: jQuery对象绑定事件
 	* @ param jq
 	* @ param configs 包含属性数组configs.cls
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.bind=function(jq,configs){
		 if (configs.events) {
		 	for (var key in configs.events) {
		 		var val=configs.events[key];
		 		if(val){
		 			jq.bind(key,val);
		 		}
		 	}
		 }
		 if(configs.click){
			 jq.bind("click",configs.click);
		 }
		 if(configs.change){
			 jq.bind("change",configs.change);
		 }
		 if(configs.blur){
			 jq.bind("blur",configs.blur);
		 }
		 if(configs.keydown){
			 jq.bind("keydown",configs.keydown);
		 }
		 if(configs.keyup){
			 jq.bind("keyup",configs.keyup);
		 }
		 if(configs.keypress){
			 jq.bind("keypress",configs.keypress);
		 }
		 if(configs.hover){
			 jq.bind("hover",configs.hover);
		 }
		 return jq;
	};
	
 
	/* @Description: 创建标签 
 	* @ param configs 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.createLabel=function(configs){
		if(!configs.label){
			return null;
		}
		var label=$("<label for='"+configs.id+"'>"+Global.getI18N(configs.label)+"</label>");
		if(configs.isNull==false || configs.isNull=="false"){
			label.append("<span class='nullTip' style='color:red'>*</span>");
		}
		var labelConfigs={};
		labelConfigs.cls=configs.labelCls||{}; 
		labelConfigs.css=configs.labelCss||{}; 
		labelConfigs.attr=configs.labelArr||{};
		//控件样式设置
		css(label,labelConfigs);
		//控件类设置
		addClass(label,labelConfigs);
		//控件属性设置
		attr(label,labelConfigs);
		return label;
	};
	
	/* @Description: 创建Input的旁注
 	* @ param configs 
	* @date 2017-01-06
	* @author:kfzx-fenggq
	*/
	exports.createTip=function(configs){
		if(!configs.tip){
			return null;
		}
		var label=$("<label class='sea_formLayout_tip' for='"+configs.id+"' style='color:#999;'>&nbsp;"+Global.getI18N(configs.tip)+"</label>");
		return label;
	};
	/* @Description: 隐藏
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.hide=function(jq){
		return jq.hide();
	};
	/* @Description: 显示
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.show=function(jq){
		return jq.show();
	};
	/* @Description: 禁用
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.disabled=function(jq){
		return jq.attr("disabled","disabled");
	};
	/* @Description: 启用
 	* @ param jq 
	* @date 2015-12-31
	* @author:kfzx-fenggq
	*/
	exports.enabled=function(jq){
		return jq.attr("disabled","");
	};
	var getSize=function(val,parentSize){
		if(parentSize){
			if((val+"").indexOf('%')>0){
				return 0.01*parentSize* parseFloat($.trim(val.replace("%","")));
			}else {
				return val;
			}
		}else{
			if((val+"").indexOf('%')>0){
				return val;
			}else {
				try{
					val=parseFloat(val);
				}catch(e){
					return val;
				}
				return val+'px';
			}
		}
	};
	exports.getSize=getSize;
	exports.hasScroll=function(el, direction){
		if(direction == "vertical") {
			return el.scrollHeight > el.clientHeight;
		}else if(direction == "horizontal") {
	        return el.scrollWidth > el.clientWidth;
	    }
	};
	
	exports.getNumber=function(val,defaultValue){
		if(val){
			try{
				val=Number(val);
				return val;
			}catch(e){
				if(defaultValue)return defaultValue;
			}
		}else{
			if(defaultValue)return defaultValue;
		}
		return 0;
	};
	exports.autoSizeTextarea=function(id){
		if($("textarea#"+id).length==0)return;
		var observe;
		if (window.attachEvent) {
		    observe = function (element, event, handler) {
		        element.attachEvent('on'+event, handler);
		    };
		}else {
		    observe = function (element, event, handler) {
		        element.addEventListener(event, handler, false);
		    };
		}
	    var text = document.getElementById(id);
	    function resize () {
	        text.style.height = 'auto';
	        text.style.height = text.scrollHeight+'px';
	    }
	    function delayedResize () {
	        window.setTimeout(resize, 0);
	    }
	    observe(text, 'change',  resize);
	    observe(text, 'cut',     delayedResize);
	    observe(text, 'paste',   delayedResize);
	    observe(text, 'drop',    delayedResize);
	    observe(text, 'keydown', delayedResize);
//	    text.focus();
//	    text.select();
	    resize();
	};
	exports.onAdd=function(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,callback,beforeNew){
		_formEdit=getFormEdit(record);
		_dialog=Dialog.edit({
			title:_title&&_title+"-录入",
			hasConfirm:false,
			hasCancel:false,
			items:[{
			    icon: "iconfont icon-icon_function_baocunbingxinzeng",
			    value: "保存并新增",
			    cls:"btn_saveNew",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						if(beforeNew)record=beforeNew(record);
						_formEdit=getFormEdit(record);
						_dialog.content.empty().append(_formEdit.formLayout);
						if(callback)callback(_formEdit);
					});
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "保存并退出",
			    cls:"btn_saveExit",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.hide();
					});
			    }
			},{
		    icon: "iconfont icon-return",
		    value: "返回",
		    cls:"btn_return",
		    click: function() {
			  _dialog.hide();
		    }
		  }],
			content: _formEdit.formLayout
		});
		if(callback)callback(_formEdit);
	};
	exports.onEdit=function(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,Array,_currentId,callback){
		_formEdit=getFormEdit(record);
		_currentId=record.id;
		_dialog=Dialog.edit({
			title:_title&&_title+"-编辑",
			hasConfirm:false,
			hasCancel:false,
			items:[{
				id:"btn_prev",
			    icon: "iconfont icon-step-backward",
			    cls:"btn_prev",
			    value: "上一条",
			    click: function() {
					var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
					if((curIndex-1)>=0){
						var record=_grid.configs.records[curIndex-1];
						_currentId=record.id;
						_formEdit.submit(_baseUrl,function(rs){
							if(rs.success==false){
								Dialog.alert(rs.msg);
								return false;
							}
							_grid.reload(_formQuery&&_formQuery.val());
							_dialog.content.empty();
							_formEdit=getFormEdit(record);
							_dialog.content.append(_formEdit.formLayout);
							if(callback)callback(_formEdit);
						});
					}else{
						$("#btn_prev").parent().tip({
							content: "<div style='font-size:14px'>已经是第一条了...</div>"
						}).trigger("show");
					}
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "保存并退出",
			    cls:"btn_saveExit",
			    click: function() {
					_formEdit.submit(_baseUrl,function(rs){
						Dialog.alert(rs.msg);
						if(rs.success==false){
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.hide();
					});
			    }
		  },{
			id:"btn_next",
		    icon: "iconfont icon-step-forward",
		    cls:"btn_next",
		    value: "下一条",
		    click: function() {
				var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
				if(_grid.configs.records.length>(curIndex+1)){
					var record=_grid.configs.records[curIndex+1];
					_currentId=record.id;
					_formEdit.submit(_baseUrl,function(rs){
						if(rs.success==false){
							Dialog.alert(rs.msg);
							return false;
						}
						_grid.reload(_formQuery&&_formQuery.val());
						_dialog.content.empty();
						_formEdit=getFormEdit(record);
						_dialog.content.append(_formEdit.formLayout);
						if(callback)callback(_formEdit);
					});
				}else{
					$("#btn_next").parent().tip({
						content: "<div style='font-size:14px'>已经是最后一条了...</div>"
					}).trigger("show");
				}
		    }
		  }],
			content: _formEdit.formLayout
		});
		if(callback)callback(_formEdit);
	};
	exports.onView=function(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId,callback){
		var _formView=getFormView(record);
		_currentId=record.id;
		_dialog=Dialog.edit({
			title:_title&&_title+"-查看",
			hasConfirm:false,
			hasCancel:false,
			items:[{
				id:"btn_prev",
			    icon: "iconfont icon-step-backward",
			    cls:"btn_prev",
			    value: "上一条",
			    click: function() {
					var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
					if((curIndex-1)>=0){
						var record=_grid.configs.records[curIndex-1];
						record=_grid.getViewData(record);
						_currentId=record.id;
						_dialog.content.empty();
						_formView=getFormView(record);
						_dialog.content.append(_formView.viewLayout);
						if(callback)callback(_formView);
					}else{
						$("#btn_prev").parent().tip({
							content: "<div style='font-size:14px'>已经是第一条了...</div>"
						}).trigger("show");
					}
			    }
			  },{
			    icon: "iconfont icon-icon_saved",
			    value: "退出",
			    cls:"btn_return",
			    click: function() {
					_dialog.hide();
			    }
		  },{
			id:"btn_next",
		    icon: "iconfont icon-step-forward",
		    value: "下一条",
		    cls:"btn_next",
		    click: function() {
				var curIndex=Array.getRecordIndex(_grid.configs.records,"id",_currentId);
				if(_grid.configs.records.length>(curIndex+1)){
					var record=_grid.configs.records[curIndex+1];
					record=_grid.getViewData(record);
					_currentId=record.id;
					_dialog.content.empty();
					_formView=getFormView(record);
					_dialog.content.append(_formView.viewLayout);
					if(callback)callback(_formView);
				}else{
					$("#btn_next").parent().tip({
						content: "<div style='font-size:14px'>已经是最后一条了...</div>"
					}).trigger("show");
				}
		    }
		  }],
			content: _formView.viewLayout
		});
		if(callback)callback(_formView);
	};
	
	exports.getCfgGrid=function(cfgGrid,cfgForm){
		var columns=[];
		if(!cfgGrid.columns){
			columns= [{
				id: "id",
				align: "center",
				width: 40,
				format: "checkbox",
				forzen: true
			},{
				id: "_op",
				label: "操作",
				align: "center",
				width: 100,
				buttons: ["view","edit","delete"],
				forzen: true
			}];
		}else{
			columns=cfgGrid.columns;
		}
		var rlen=cfgForm.items.length;
		for(var i=0;i<rlen;i++){
			var clen=cfgForm.items[i].length;
			for(var j=0;j<clen;j++){
				var item=cfgForm.items[i][j];
				if(!item.id)continue;
				if(item.type=="hidden"||item.isColumn==false)continue;
				columns.push(item);
			}
		}
		cfgGrid.columns=columns;
		return cfgGrid;
	};
	exports.getOrd = function(selectNode) {
		var preNode = selectNode.getPreNode();
		var nextNode = selectNode.getNextNode();
//		var preOrd = preNode ? preNode.ord : 0;
//		var nextOrd = nextNode ? nextNode.ord : (preOrd + 1);
//		var ord = (preOrd + nextOrd) * 0.5;
		if(preNode)return preNode.ord+1;
		if(nextNode)return nextNode.ord+1;
		return selectNode.ord;
	};
	
	exports.setVal=function(ids,record,parentSelector){
		var len=ids.length;
		for(var i=0;i<len;i++){
			var id=ids[i];
			$("#"+id,parentSelector).val(record[id]);
		}
	};
});
define('Ajax',function(require, exports, module) {
	exports.getPage=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return actionName+params;
	};
	exports.getLocal=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return Session.localPath+actionName+params;
	};
	/**
	 * @Description: 获取url
	 * @ param actionName
	 * @ return url
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	var getUrl=function(actionName,data){
		var params="";
		if(data)
		$.each(data,function(key,val){
			if(actionName.indexOf("?")>=0){
				params+="&";
			}else	if(params==""){
				params="?";
			}else{
				params+="&";
			}
			params+=key+"="+val;
		});
		return Session.basePath+actionName+params;
	};
	exports.getUrl=getUrl;
	/**
	 * @Description: ajax请求
	 * @ param url 
	 * @ param params
	 * @ param callback 
	 * @ return 
	 * @date 2015-12-31 
	 * @author:kfzx-fenggq
	 */
	exports.post = function(url, data, callback,async,dt) {
		Log.begTime=new Date().getTime();
		if(data){
			data._langue=Session.langue;
			data._log=JSON.stringify(Log);
			data._token=Session.token;
		}else{
			data={
				_langue:Session.langue,
				_log:JSON.stringify(Log),
				_token:Session.token
			};
		}
		$.ajax( {
			type : 'POST',
			url : getUrl(url),
			data : data,
			async : async||false,
			dataType : dt||"json",
			success : function(result) {
				if(callback){
					callback.call(window, result);
				}
			}
		});
	};
	
	exports.getParam = function(paramName) {
		var url = document.location.href;
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		for ( var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(paramName + "=");
			if (loc != -1) {
				return arrStr[i].replace(paramName + "=", "").replace("?", "");
			}
		}
		return "";
	};
	
	exports.getUrlParam = function(url,paramName) {
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		for ( var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(paramName + "=");
			if (loc != -1) {
				return arrStr[i].replace(paramName + "=", "").replace("?", "");
			}
		}
		return "";
	};
});
/**
 * 1.冻结列的width必须指定值，且为数字
 */
define('Grid',['Lang','String','Component','Ajax','Dialog','Array','Textfield','Select','CfgDictionary','ButtonGroup','Date','Pager','Toolbar'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	var Lang = require('Lang');
	var String = require('String');
	var Component = require('Component');
	var Ajax = require('Ajax');
	var Dialog = require('Dialog');
	var Array = require('Array');
	/** * 模块私有数据 ** */
	var defaults = {
		parent : null, // 父元素，默认为null
		id : "",
		cls : "",
		css : {},
		attr : {},
		card : "",
		indexColumn : true,
		showColumnSet:false,
		summaryRows:0,//统计记录行数
		pagerMode : "normal", //normal,simple
		pageSize : 20,
		url : "", //url优先
		params : {},
		paramsDelete : {},
		toolbar : {
			baseUrl : "",
			refresh : false,
			add : true,
			"delete" : true,
			"export" : false,
			"copy" : false,
			onAdd : function() {},
			onEdit : function(record, selected) {},
			onView : function(record, selected) {},
			onDelete : function(record, selected) {
				return true;
			},
			onExport : function(records, selected) {
				return true;
			},
			onCopy : function(records, selected) {
				return true;
			},
			afterLoad : function() {
				return true;
			},
			afterDelete : null,
			items : [] //其他工具栏按钮
		},
		loadSuccess : function() {}
	};
	/** * 模块私有方法 ** */
	var self = {
		html : function() {
			var html = [];
			html.push('<div class="sea_grid">');
			html.push('<div class="sea_grid_title"></div>');
			html.push('<div class="sea_grid_toolbar"></div>');
			html.push('<div class="sea_grid_forzen">');
			//1 head start
			html.push('<div class="sea_grid_head">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></tr></table>');
			html.push("</div>");
			//1head end
			//1body start
			html.push('<div class="sea_grid_body">');
			html.push("<div class='sea_grid_scroll_y'>");
			html.push('<table cellspacing="0" cellpadding="0"></table>');
			html.push("</div>");
			html.push("</div>");
			//summary
			html.push('<div style="display:none" class="sea_grid_summary">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push('</div>');
			//1body end
			html.push('<div class="sea_grid_normal">');
			//2head start
			html.push('<div class="sea_grid_head">');
			html.push('<div class="sea_grid_scroll_x">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push("</div>") ;
			//2head end
			//2body start
			html.push('<div class="sea_grid_body">');
			html.push('<table cellspacing="0" cellpadding="0"></table>');
			html.push("</div>");
			//summary
			html.push('<div style="display:none" class="sea_grid_summary">');
			html.push('<div class="sea_grid_scroll_x">');
			html.push('<table cellspacing="0" cellpadding="0"><tr class="sea_grid_tr"></table>');
			html.push("</div>") ;
			html.push("</div>") ;
			html.push('</div>');
			//2body end
			html.push('<div class="sea_grid_pager"></div>');
			html.push('<div class="sea_grid_mask"></div><div class="sea_grid_mask_loading"></div>');
			html.push('</div>');
			return html.join("");
		},
		load : function(me, params) {
			var _params = params || me.configs.params;
			//分页参数
			if (me.configs.pageSize > 0) {
				if (!_params.pageSize)
					_params.pageSize = me.configs.pageSize;
				if (!_params.pageIndex)
					_params.pageIndex = me.configs.pageIndex || 1;
			}
			if (me.configs.url) {
				Ajax.post(me.configs.url, _params, function(result) {
					if (result.success) {
						me.configs.records = result.data;
						me.total = result.total;
					}
					self.render(me);
					self.pager(me, _params);
					if (me.configs.loadSuccess) {
						me.configs.loadSuccess(result);
					}
					if (me.configs.loadError) {
						me.configs.loadError(result);
					}
				}, true);
			} else {
				me.total = me.configs.records.length;
				if(me.configs.pageSize>0)
					me.configs.records =me.configs.records.slice((_params.pageIndex - 1) * me.configs.pageSize, _params.pageIndex * me.configs.pageSize);
				self.render(me);
				self.pager(me, _params);
			}
		},
		getCell : function(record, column, isHead, rowIndex) {
			if (isHead) {
				if (column.format && column.format == "checkbox") {
					if (column.click)
						return "<input  type='checkbox' hasClick='true' id='" + column["id"] + "'/>";
					return "<input  type='checkbox' id='" + column["id"] + "'/>"; //<label class='sea_checkLabel' for='"+column["id"]+"'>"+(Global.getI18N(column["label"])||"")+"</label>
				} else {
					return Global.getI18N(column["label"]||"");
				}
			} else {
				var id = column["_id"]; //SysUser.js
				if (!id) {
					id = column["id"];
				}
				var columnNameArr = id.split("."); //兼容关联对象
				if (columnNameArr.length == 1) {
					val = record[columnNameArr[0]];
				} else {
					var relativeObj = record[columnNameArr[0]];
					if (relativeObj) {
						val = relativeObj[columnNameArr[1]];
					} else {
						val = "";
					}
				}
				if (val == undefined || val == null) {
					val = "";
				}
				var cell = {
					value : val,
					title : val
				};
				if (column.format) {
					if ($.type(column.format) == "string") {
						cell.title = "";
						if (column.format.toLowerCase() == "checkbox") {
							if (column.click) {
								var checkbox;
								if (record["_" + column["id"]] && record["_" + column["id"]] == val) {
									checkbox = $("<input type='checkbox' class='" + column["id"] + "' value='" + val + "' checked/>");
								} else {
									checkbox = $("<input type='checkbox' class='" + column["id"] + "' value='" + val + "'/>");
								}
								checkbox.click(function(e) {
									column.click(e.target, e);
								});
								cell.value = checkbox;
							} else {
								cell.value = "<input type='checkbox' class='" + column["id"] + "' value='" + val + "'/>";
							}
						} else if (column.format.toLowerCase() == "radio") {
							cell.value = "<input type='radio' class='" + column["id"] + "' value='" + val + "'/>"
						} else if (column.format.toLowerCase() == "textfield") {
							var Textfield=require('Textfield');
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var textfield=Textfield.create(configs);
							if(column.limit){
								textfield.textfield.blur(function(){
									return textfield.check();
								});
							}
							if(column.align)textfield.textfield.css({"text-align":column.align});
							cell.value = textfield.textfield.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "select") {
							var Select=require('Select');
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var select=Select.create(configs);
							if(column.limit){
								select.select.blur(function(){
									return select.check();
								});
							}
							if(column.align)select.select.css({"text-align":column.align});
							cell.value = select.select.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "dic") {
							var CfgDictionary=require('CfgDictionary');
							var configs=$.extend(true,{},column);
							configs.width="99%";
							var cfgDictionary=CfgDictionary.create(configs);
							if(column.limit){
								cfgDictionary.dic.blur(function(){
									return cfgDictionary.check();
								});
							}
							cell.value = cfgDictionary.dic.addClass(column["id"]).val(val);
						} else if (column.format.toLowerCase() == "buttongroup") {
							cell.value = require('ButtonGroup').create(column).buttonGroup;
						} else if (column.format.toLowerCase() == "link") {
							cell.value = "<a href='" + column.link + "''><span class='" + column.imgCls + "'></span>" + val + "</a>";
						} else if (column.format.toLowerCase() == "buttons") {
							var div=$("<span></span>")
							for(var i=0;i<column.items.length;i++){
								var item=column.items[i];
								div.append("&nbsp;&nbsp;&nbsp;").append($("<a href='#'>" + item.value + "</a>").prepend("<span class='" + item.icon + "'></span>").bind("click",{index:i},function(event){
									var idx= event.data.index;
									column.items[idx].click(record);
								}));
							}
							cell.value = div;
						} else if (column.format.toLowerCase() == "yyyy-mm-dd hh:mm:ss" ||column.format.toLowerCase() == "timestamp" || column.format.toLowerCase() == "datetime") {
							if(!String.isBlank(val)){
								var Date = require('Date');
								cell.value = Date.getNow(val);
								cell.title = cell.value;
							}
						} else if (column.format.toLowerCase() == "href") {
							cell.value = "<a target=_blank href='" + val + "''>" + val + "</a>";
						}
					} else if ($.type(column.format) == "function") {
						cell.value = column.format(val, record, rowIndex);
						cell.title = String.delTag(cell.value);
					} else if ($.type(column.format) == "object") {
						cell.value = column.format[val];
						cell.title = cell.value
					}
				} else if (column.type) {
					if (column.type == "user") {
						cell.value = record[column.name];
						cell.title = cell.value;
					}else if (column.type == "dicColumn") {
						cell.value = Global.DicJson(column.params["app"], column.params["type"], column.params["subType"],true,Session.langue)[val];
						cell.title = cell.value;
					}else if (column.type == "dic") {
						cell.value = Global.DicJson(column.params["app"], column.params["type"], column.params["subType"],true,Session.langue)[val];
						cell.title = cell.value;
					}else if (column.type == "file") {
						cell.title = "";
						var val=cell.value;
						cell.value="";
						if(!String.isBlank(val)){
							var path=val.split(",");
							$.each(path,function(index,item){
								var url=item;
								if(String.isBlank(url))return true;
								if(!String.isUrl(url)){
									url=Session.basePath+url;
									var fileName=Ajax.getUrlParam(url,"attname");
									cell.value+="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||column.label)+"'>"+fileName+"</a>&nbsp;";
								}else{
									var fileName=Ajax.getUrlParam(url,"attname");
									cell.value+="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||column.label)+"'>"+fileName+"</a>&nbsp;";
								}
							});
						}
					}	
				}
				return cell;
			}
		},
		getRow : function(me, el) {
			var index = el.rowIndex;
			return me.grid.find(".sea_grid_forzen .sea_grid_body table tr:eq(" + index + "),.sea_grid_normal  .sea_grid_body table tr:eq(" + index + ")");
		},
		bindEvent : function(me) {
			me.grid.find(".sea_grid_body table tr").hover(function() {
				self.getRow(me, this).addClass("sea_grid_hover") ;
			}, function() {
				self.getRow(me, this).removeClass("sea_grid_hover") ;
			}) ;
			me.grid.find(".sea_grid_normal>.sea_grid_body").scroll(function() {
				me.grid.find(".sea_grid_forzen>.sea_grid_body").scrollTop($(this).scrollTop()) ;
				me.grid.find(".sea_grid_normal>.sea_grid_head").scrollLeft($(this).scrollLeft()) ;
			});
			if(me.configs.summaryRows>0){
				me.grid.find(".sea_grid_normal>.sea_grid_summary").scroll(function() {
					me.grid.find(".sea_grid_normal>.sea_grid_head").scrollLeft($(this).scrollLeft()) ;
					me.grid.find(".sea_grid_normal>.sea_grid_body").scrollLeft($(this).scrollLeft()) ;
				});
			}
			me.grid.find(".sea_grid_head").delegate("input[type=checkbox]", "click", function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("id");
				var hasClick = $(this).attr("hasClick");
				if (hasClick) {
					if ($(this).is(':checked') == true) {
						me.grid.find(selector).not("input:checked").click();
					} else {
						me.grid.find(selector + ":checked").click();
					}
				}
				me.grid.find(selector).prop("checked", $(this).is(':checked'));
				if (me.configs.onCheckAll) me.configs.onCheckAll(this);
			});
			me.grid.delegate(".sea_grid_body input[type=radio]", 'click', function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("class");
				var selected = $(this).is(':checked');
				me.grid.find(selector).not(this).prop("checked", !selected);
				if (me.configs.onCheckAll) me.configs.onCheckAll(this);
			});
			me.grid.delegate(".sea_grid_body input[type=radio]", 'dblclick', function() {
				var selector = ".sea_grid_body" + " ." + $(this).attr("class");
				me.grid.find(selector).prop("checked", false);
			});
			if (me.configs.rowDblClick) {
				me.grid.delegate(".sea_grid_body tr", 'dblclick', function() {
					me.configs.rowDblClick(me.configs.records[this.rowIndex], this);
				}) ;
			}
			if (me.configs.rowClick) {
				me.grid.delegate(".sea_grid_body tr", 'click', function() {
					if(me.configs.rowClick(me.configs.records[this.rowIndex], this)==true){
						self.getRow(me, this).addClass("sea_grid_rowselected").siblings().removeClass("sea_grid_rowselected");	
					}
				}) ;
			}
			me.grid.find(".sort").unbind("click").click(function(){
				var a=$(this);
				a.parent().siblings().find(".sort-icon").removeClass("sort-asc").removeClass("sort-desc").removeClass("sort-none").addClass("sort-none");
				var field=a.attr("field");
				var sortType="";
				var sortIcon=a.find(".sort-icon");
				if(sortIcon.hasClass("sort-none")){
					sortIcon.removeClass("sort-none").addClass("sort-asc");
					sortType="asc";
				}else if(sortIcon.hasClass("sort-asc")){
					sortIcon.removeClass("sort-asc").addClass("sort-desc");
					sortType="desc";
				}else if(sortIcon.hasClass("sort-desc")){
					sortIcon.removeClass("sort-desc").addClass("sort-none");
					sortType="";
				}
				var url=me.configs.url;
				me.configs.url=null;
				if(sortType==""){
					self.load(me);
				}else{
					var records=me.configs.records;
					if(me.configs.summaryRows>0){
						var len=records.length;
						var lastRecord=records[len-1];
						var _records=records.slice(0,len-1);
						//排序_records
						_record=Array.sort(_records,field,sortType);
						_records.push(lastRecord);
						me.configs.records=_records;
					}
					self.load(me);
					me.configs.records=records;
				}
				me.configs.url=url;
			});
		},
		render : function(me) { //渲染主体
			me.grid_forzen_body.empty();
			me.grid_normal_body.empty();
			if(me.grid_normal_summary){
				me.grid_normal_summary.empty();
				me.grid_forzen_summary.empty();
			}
			var len = 0;
			if (me.configs.records) {
				len = me.configs.records.length-me.configs.summaryRows
			}
			var columnForzenCount = me.columnsForzen.length;
			var columnNormalCount = me.columnsNormal.length;
			for (var i = 0; i < len; i++) {
				var record = me.configs.records[i];
				var row_forzen = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_forzen_body);
				for (var j = 0; j < columnForzenCount; j++) {
					var column = me.columnsForzen[j];
					if(column.hide&&column.hide===true)continue;
					if (column["id"] == "_index") {
						row_forzen.append("<td class='sea_grid_td center'" + Component.getStyle(column,true) + " title='" + (i + 1) + "'>" + (i + 1) + "</td>");
					} else {
						var cell = self.getCell(record, column, false, i);
						self.getTd(me, record, column, cell).appendTo(row_forzen);
					}
				}
				var row_normal = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_normal_body).data("id", record["id"]);
				for (var j = 0; j < columnNormalCount; j++) {
					var column = me.columnsNormal[j];
					if(column.hide&&column.hide===true)continue;
					var cell = self.getCell(record, column, false, i);
					self.getTd(me, record, column, cell).appendTo(row_normal);
				}
			}
			//统计记录
			if(len>=0){
				for(var i=len;i<(len+me.configs.summaryRows);i++){
					var record = me.configs.records[i];
					var row_forzen = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_forzen_summary);
					row_forzen.append("<td colspan="+(columnForzenCount-1)+" class='sea_grid_td center'" + Component.getStyle(column,true) + ">合计</td>");
					var row_normal = $("<tr class='sea_grid_tr'></tr>").appendTo(me.grid_normal_summary).data("id", record["id"]);
					for (var j = 0; j < columnNormalCount; j++) {
						var _column = me.columnsNormal[j];
						var column=$.extend(true,{},_column);
						if(column.hide&&column.hide===true)continue;
						delete column.format;
						var cell = self.getCell(record, column, false, i);
						var td=self.getTd(me, record, column, cell).appendTo(row_normal);
						td.find("input").attr("readonly","readonly").css({"border":"0","cursor":"default"});
					}
				}
			}
			me.grid.find(".sea_grid_head table").find(" input[type=checkbox]").prop("checked", false);
			self.bindEvent(me);
			me.resize();
			me.setMask(false);
		},
		getTd : function(me, record, column, cell) {
			var td = $("<td class='sea_grid_td'" + Component.getStyle(column,true) + " title='" + cell.title + "'></td>");
			if (column.buttons) {
				if (Array.getIndex(column.buttons, "view") >= 0) {
					td.append(self.getViewLink(me, record, ""))//Lang.view
				}
				if (Array.getIndex(column.buttons, "edit") >= 0) {
					td.append(self.getEditLink(me, record, ""));//Lang.edit
				}
				if (Array.getIndex(column.buttons, "delete") >= 0) {
					td.append(self.getDeleteLink(me, record, ""));//Lang["delete"]
				}
			} 
			td.append(cell.value);
			return td;
		},
		pager : function(me, _params) {
			if (me.configs.pageSize > 0) {
				me.grid.find(".sea_pager").remove();
				var pager = require('Pager').create({
					pageNav : me.configs.pageNav || 5,
					pageSize : _params.pageSize,
					pageIndex : _params.pageIndex,
					pagerMode : me.configs.pagerMode,
					total : me.total,
					select : function(pageIndex, pageSize) {
						me.configs.params.pageIndex = pageIndex;
						me.configs.params.pageSize = pageSize || me.configs.pageSize;
						me.reload(me.configs.params) ;
						return me.total;
					}
				});
				me.grid.find(".sea_grid_pager").empty().append(pager.pager);
			} else {
				me.grid.find(".sea_grid_pager").remove();
			}
		},
		toolbar : function(me) { //创建工具栏
			me.toolbar = me.grid.find(".sea_grid_toolbar");
			if (!me.configs.toolbar.hide){
				
				if (me.configs.toolbar["export"]) {
					me.configs.toolbar.items.unshift({
						icon : "iconfont icon-export",
						id:"tb_export",
						value : Lang["export"],
						click : function() {
							var listTitle = [];
							for (var i = 0; i < me.configs.columns.length; i++) {
								var column = me.configs.columns[i];
								if (column["id"] == "id"||column["id"] == "_op"||column["id"] == "_index") continue;
								if(column.hide)continue;
								var _column = {};
								_column["id"] = column["id"];
								_column["label"] = Global.getI18N(column["label"]);
								_column["align"] = column["align"];
								_column["width"] = column["width"];
								_column["forzen"] = column["forzen"];
								listTitle.push(_column);
							}
							if(me.getSelected().length==0){
								me.selectAll();
							}
							var params = {
								sheetName : "Sheet1",
								listTitle : JSON.stringify(listTitle),
								listData : JSON.stringify(me.getExportData()) //一条一条查，效率慢，待优化
							};
							
							Ajax.post("export/excel", params, function(rs) {
								window.location.href = Session.basePath+rs.msg;
							});
							return false;
						}
					});
				}
				if (me.configs.toolbar["delete"]) {
					me.configs.toolbar.items.unshift({
						icon : "iconfont icon-remove1",
						id:"tb_delete",
						value : Lang["delete"],
						click : function() {
							var selected = me.getSelected();
							if (selected.length === 0) {
								Dialog.alert(Lang.select);
								return false;
							} else {
								if (me.configs.toolbar.onDelete(me.getRecord(selected[0]),selected)) {
									Dialog.confirm({
										content : Lang.ifDel,
										confirmValue : Lang.confirm,
										confirm : function() {
											var params = $.extend(true, {}, {
												"id" : selected
											}, me.configs.paramsDelete);
											Ajax.post(me.configs.toolbar.baseUrl + "delete", params, function(rs) {
												Dialog.alert(rs.msg);
											});
											if (me.configs.toolbar.afterDelete) {
												me.configs.toolbar.afterDelete();
											} else {
												me.reload();
											}
											return true;
										}
									});
								}
							}
							return false;
						}
					});
				}
				if (me.configs.toolbar.copy) {
					me.configs.toolbar.items.unshift({
						icon : "iconfont icon-copy",
						id:"tb_copy",
						value : Lang.copy,
						click : function() {
							var selected = me.getSelected();
							if (selected.length === 0) {
								Dialog.alert(Lang.select);
								return false;
							} else {
								var records = me.getSelectedRecord();
								if (me.configs.toolbar.onCopy(records, selected)) {
									Ajax.post(me.configs.toolbar.baseUrl + "copy", {
										"id" : selected
									}, function(rs) {
										Dialog.alert(rs.msg);
									});
								}
								me.reload();
								return true;
							}
							return false;
						}
					});
				}
				if (me.configs.toolbar.add) {
					me.configs.toolbar.items.unshift({
						icon : "iconfont icon-add2",
						id:"tb_add",
						value : Lang.add,
						click : function() {
							me.configs.toolbar.onAdd();
							return false;
						}
					});
				}
				if (me.configs.toolbar.refresh) {
					me.configs.toolbar.items.unshift({
						icon : "iconfont icon-Refresh",
						id:"tb_refresh",
						value : Lang.refresh,
						click : function() {
							me.reload();
							return false;
						}
					});
				}
				var tb = require('Toolbar').create(me.configs.toolbar);
				me.toolbar.append(tb.toolbar);
			} else {
				me.toolbar.remove();
			}
		},
		getViewLink : function(me, record, cellValue) {
			var a = $("<a style='padding:0 5px;'><i class='iconfont icon-view3'></i>" + cellValue + "</a>").click(function() {
				me.configs.toolbar.onView(me.getViewData(record), [ record["id"] ]);
			});
			return a;
		},
		getEditLink : function(me, record, cellValue) {
			var a = $("<a style='padding:0 5px;'><i class='iconfont icon-edit'></i>" + cellValue + "</a>").click(function() {
				me.configs.toolbar.onEdit(record, [ record["id"] ]);
			});
			return a;
		},
		getDeleteLink : function(me, record, cellValue) {
			var selected = me.getSelected();
			var a = $("<a style='padding:0 5px;'><i class='iconfont icon-remove'></i>" + cellValue + "</a>").click(function() {
				if (me.configs.toolbar.onDelete(record,selected)) {
					Dialog.confirm({
						content : Lang.ifDel,
						confirmValue : Lang.confirm,
						confirm : function() {
							var params = $.extend(true, {}, {
								"id" : [ record["id"] ]
							}, me.configs.paramsDelete);
							Ajax.post(me.configs.toolbar.baseUrl + "delete", params, function(rs) {
								Dialog.alert(rs.msg);
							});
							if (me.configs.toolbar.afterDelete) {
								me.configs.toolbar.afterDelete();
							} else {
								me.reload();
							}
							return true;
						}
					});
				}
			});
			return a;
		},
		getColumnsSet:function(me){
			var ul=$("<ul class='sea_grid_columnset' style='padding:5px;background-color:#f6f6f6;z-index:999;position:fixed;width:50%;border:1px solid #eaeaea;float:left;'></ul>");
			var len=me.columnsForzen.length;
			for(var i=0;i<len;i++){
				var item=me.columnsForzen[i];
				if(!item.label)continue;
				if(item.id=="_index")continue;
				var li=$("<li style='float:left;padding:0 3px;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").bind("click",{index:i},function(event){
					var idx= event.data.index+1;
					//冻结表
					if(me.grid_forzen_head.find("tr td:nth-child("+idx+")").css("display")=="none"){
						me.columnsForzen[idx-1].display="";
					}else{
						me.columnsForzen[idx-1].display="none";
					}
					me.grid_forzen_head.find("tr td:nth-child("+idx+")").toggle();
					me.grid_forzen_body.find("tr td:nth-child("+idx+")").toggle();
				}).appendTo(li);
			}
			var len=me.columnsNormal.length;
			for(var i=0;i<len;i++){
				var item=me.columnsNormal[i];
				if(!item.label)continue;
				var li=$("<li style='float:left;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").bind("click",{index:i},function(event){
					var idx= event.data.index+1;
					//非冻结表
					if(me.grid_normal_head.find("tr td:nth-child("+idx+")").css("display")=="none"){
						me.columnsNormal[idx-1].display="";
					}else{
						me.columnsNormal[idx-1].display="none";
					}
					me.grid_normal_head.find("tr td:nth-child("+idx+")").toggle();
					me.grid_normal_body.find("tr td:nth-child("+idx+")").toggle();
				}).appendTo(li);
			}
			return ul;
		}
	};
	/** * 类定义 ** */
	var Grid = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		if (String.endsWith(this.configs.url, "/")) {
			if (!this.configs.toolbar.baseUrl){
				this.configs.toolbar.baseUrl = this.configs.url;
			}
			this.configs.url = this.configs.url + "list";
		} else {
			if (this.configs.toolbar && !this.configs.toolbar.baseUrl)
				this.configs.toolbar.baseUrl = this.configs.url.substr(0, this.configs.url.indexOf("/") + 1);
		}
		this.total = 0; //总记录数
		this.grid = $(self.html());
		// 控件类名设置
		Component.addClass(this.grid, this.configs);
		// 控件样式设置
		Component.css(this.grid, this.configs);
		if (this.configs.parent) {
			if ($.type(this.configs.parent) == "string") {
				this.parent = $(this.configs.parent);
			} else {
				this.parent = this.configs.parent;
			}
			this.parent.append(this.grid);
		}
		// 初始化
		//标题
		if (this.configs.title) {
			this.title = this.grid.find(".sea_grid_title").html("<i class='iconfont icon-Settings'></i><span style='margin-left:3px'>" + Global.getI18N(this.configs.title) + "</span>");
		} else {
			this.grid.find(".sea_grid_title").remove();
		}
		//工具栏
		self.toolbar(this);
		if(this.configs.toolbar.hide){
			if (this.configs.title) {
				this.grid.find(".sea_grid_forzen").css("top", "5rem");
				this.grid.find(".sea_grid_normal").css("top", "5rem");
			} else {
				this.grid.find(".sea_grid_forzen").css("top", "0rem");
				this.grid.find(".sea_grid_normal").css("top", "0rem");
			}
		}else{
			if (this.configs.title) {
				this.grid.find(".sea_grid_forzen").css("top", "7.5rem");
				this.grid.find(".sea_grid_normal").css("top", "7.5rem");
				this.toolbar.css("top", "5rem");
			} else {
				this.grid.find(".sea_grid_forzen").css("top", "2.5rem");
				this.grid.find(".sea_grid_normal").css("top", "2.5rem");
				this.toolbar.css("top", "0rem");
			}
		}
		//冻结表
		this.grid_forzen_head = this.grid.find(".sea_grid_forzen>.sea_grid_head table");
		this.grid_forzen_body = this.grid.find(".sea_grid_forzen>.sea_grid_body table");
		
		//非冻结表
		this.grid_normal_head = this.grid.find(".sea_grid_normal>.sea_grid_head table");
		this.grid_normal_body = this.grid.find(".sea_grid_normal>.sea_grid_body table");
		if(this.configs.summaryRows>0){
			this.grid.find(".sea_grid_forzen>.sea_grid_summary").show();
			this.grid_forzen_summary = this.grid.find(".sea_grid_forzen>.sea_grid_summary table");
//			this.grid_normal_body.wrap('<div class="sea_grid_scroll_x"></div>');
			this.grid.find(".sea_grid_normal>.sea_grid_summary").show();
			this.grid_normal_summary= this.grid.find(".sea_grid_normal>.sea_grid_summary table");
			this.grid.find(".sea_grid_normal>.sea_grid_body").css("overflow-x","hidden");
		}
		//加载进度信息
		this.mask = this.grid.find(".sea_grid_mask");
		this.mask_loading = this.grid.find(".sea_grid_mask_loading");

		this.columnsForzen = []; //冻结列
		this.columnsNormal = []; //非冻结列
		var columnCount = this.configs.columns.length;
		if (this.configs.indexColumn) {
			this.columnsForzen.push({
				id : "_index",
				width : 30,
				label : "<span id='_columnset' class='iconfont' style='color:#999;cursor:pointer;'></span>"
			});
		}
		for (var i = 0; i < columnCount; i++) {
			var column = this.configs.columns[i];
			if (column["forzen"]) {
				this.columnsForzen.push(column);
			} else {
				this.columnsNormal.push(column);
			}
		}
		//创建冻结表表头
		this.columnForzenWidth = 0; //冻结表总宽度
		var columnForzenCount = this.columnsForzen.length;
		var grid_forzen_head_tr = this.grid_forzen_head.find("tr");
		for (var i = 0; i < columnForzenCount; i++) {
			var column = this.columnsForzen[i];
			if(column.hide&&column.hide===true)continue;
			column["width"] = Component.getNumber(column.width, 90);
			this.columnForzenWidth += column["width"];
			grid_forzen_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + ">" + self.getCell([], column, true) + "</td>");
		}
		this.grid_forzen_head.width(this.columnForzenWidth);
		this.grid_forzen_body.width(this.columnForzenWidth);
		this.grid_forzen_summary&&this.grid_forzen_summary.width(this.columnForzenWidth);
		this.grid.find(".sea_grid_normal").css("left", Component.getSize(this.columnForzenWidth));
		//创建非冻结表表头
		var columnsNormalCount = this.columnsNormal.length;
		var grid_normal_head_tr = this.grid_normal_head.find("tr");
		for (var i = 0; i < columnsNormalCount; i++) {
			var column = this.columnsNormal[i];
			if(column.hide&&column.hide===true)continue;
			if (!column.width)
				column["width"] = 90;
			if(column.sort){
				grid_normal_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + "><a class='sort' field='"+column.id+"' href='#'><span style='vertical-align: middle;display: inline-block;'>" + self.getCell([], column, true) + "</span><span class='sort-icon sort-none'>&nbsp;</span></a> </td>");
			}else{
				grid_normal_head_tr.append("<td class='sea_grid_th'" + Component.getStyle(column,true) + ">" + self.getCell([], column, true) + "</td>");
			}
		}
		self.load(this);
		var me = this;
		$(window).resize(function() {
			me.resize(me);
		});
		if(this.configs.showColumnSet){
			$("#_columnset",this.grid).addClass("iconfont").click(function(){
				$("#_columnset",this.grid).toggleClass("icon-list2"," icon-liebiao");
				if($(".sea_grid_columnset").length>0){
					$(".sea_grid_columnset").toggle();
					return false;
				}
				var ul=self.getColumnsSet(me).appendTo($("body")).css({
					"left":0,
					"bottom":$(this).offset().top+20
				});
				return false;
			});
		}
	};
	// 类公共方法
	Grid.prototype = {
		print:function(){
			var formEdit=$("#formEdit");
	    		$("body").empty().css({"overflow":"auto"}).append(formEdit).find(".iconfont,input[type=button]").hide();
            if (document.execCommand("print")) {
            		window.location.reload();
            }
		},
		clear : function() {
			this.grid_forzen_body.empty();
			this.grid_normal_body.empty();
			this.grid.find(".sea_grid_head table").find(" input[type=checkbox]").prop("checked", false);
		},
		disabled : function(flag) {
			if (flag) {
				this.mask.show();
			} else {
				this.mask.hide();
			}
		},
		setMask : function(isShow) {
			if (isShow) {
				this.mask.show();
				this.mask_loading.show()
			} else {
				this.mask.hide();
				this.mask_loading.hide();
			}
		},
		reload : function(params) {
			this.configs.params = $.extend(true, {}, this.configs.params, params);
			self.load(this, params);
		},
		getSelected : function(id) {
			var rs = [];
			id = id || "id";
			var  idsJq=this.grid.find("." + id + ":checked")
			$.each(idsJq, function(index, item) {
				rs.push($(item).val());
			});
			return rs;
		},
		setSelected : function(ids, id) {
			id = id || "id";
			if($.type(ids)!="array"){
				ids=[ids];
			}
			if(!id||id=="id"){
				id ="id";
				$.each(this.grid.find("." + id), function(index, item) {
					if (Array.getIndex(ids, $(item).val()) >= 0) {
						$(item).prop("checked", true);
					}
				});
			}else{
				var me=this;
				$.each(this.grid.find(".id"), function(index, item) {
					var idValue=$(item).val();
					var record=me.getRecord(idValue);
					if (Array.getIndex(ids,record[id]) >= 0) {
						$(item).prop("checked", true);
					}
				});
			}
		},
		selectAll : function(id) {
			id = id || "id";
			this.grid.find("." + id).prop("checked", true)
		},
		getSelectedData : function(id) { //获取html的值
			var me = this;
			var records = [];
			var ids = this.getSelected(id);
			$.each(ids, function(index, id) {
				Ajax.post(me.configs.toolbar.baseUrl + "get", {
					"id" : [ id ]
				}, function(rs) {
					if (rs.success === true) {
						var record = rs.data;
						$.each(me.configs.columns, function(index, column) {
							if (column.format || column.type) {
								var cell = self.getCell(record, column, false);
								record[column["id"]] = cell.value;
							}
						});
						records.push(record);
					}
				});
			});
			return records;
		},
		getExportData : function(id) { //获取html的值
			var records = [];
			var me = this;
			var ids = me.getSelected();
			for(var i=0;i<me.configs.records.length;i++){
				var record=$.extend(true, {}, me.configs.records[i]);
				if(Array.getIndex(ids,record.id)>=0){
					$.each(me.configs.columns, function(index, column) {
						if (column["id"] == "id") return true;
						if (column["id"] == "_op") return true;
						if (column.format || column.type) {
							var cell = self.getCell(record, column, false);
							record[column["id"]] = String.delTag(cell.value);
						}
					});
					records.push(record);
				}
			} 
			return records;
		},
		getViewData : function(record) {
			var me = this;
			var rs = $.extend(true, {}, record);
			$.each(me.configs.columns, function(index, column) {
				if (column["id"] == "id") return true;
				if (column.format || column.type) {
					if(column.type=="file"){
						rs[column["id"]] = record[column["id"]];
					}else{
						var cell = self.getCell(record, column, false);
						rs[column["id"]] = cell.value;
					}
				}
			});
			return rs;
		},
		getRecord:function(idValue,id){
			id = id || "id";
			var len=this.configs.records.length;
			for(var i=0;i<len;i++){
				var record=this.configs.records[i];
				if(record[id]==idValue)return record
			}
			return {};
		},
		setRecord:function(idValue,_record){
			var id = "id";
			var len=this.configs.records.length;
			for(var i=0;i<len;i++){
				var record=this.configs.records[i];
				if(record[id]==idValue)this.configs.records[i]=_record;
			}
		},
		getRecords:function(){
			return this.configs.records;
		},
		getSelectedRecord : function(id) { //获取记录的值
			var me = this;
			var records = [];
			var ids = this.getSelected(id);
			$.each(me.configs.records, function(index, record) {
				if(Array.getIndex(ids,record["id"])>=0){
					records.push(record);
				}
			});
			return records;
		},
		insertRow : function(record) {},
		updateRow : function(record) {},
		deleteRow : function(id) {},
		removeAll : function() {},
		resize : function() {
			var me = this;
			setTimeout(function() {
				var _height=me.grid.height() - me.grid_normal_head.height();
				if( me.grid.find(".sea_grid_title").length>0){
					_height-=me.grid.find(".sea_grid_title").height() 
				}
				if( me.grid.find(".sea_grid_toolbar").length>0){
					_height-=me.grid.find(".sea_grid_toolbar").height() 
				}
				if(me.grid.find(".sea_grid_pager").length>0){
					_height-=me.grid.find(".sea_grid_pager").height() 
				}
				var sea_grid_summary=me.grid.find(".sea_grid_summary");
				if(sea_grid_summary.css("display")!="none"){
					_height=_height-sea_grid_summary.height();
				}
				me.grid.find(".sea_grid_body").height(_height);
				
				var width = me.grid.parent().width() - me.columnForzenWidth;
				var el = me.grid.find(".sea_grid_normal>.sea_grid_body").get(0);
//				if (Component.hasScroll(el, "vertical")) {
//					var swidth = el.offsetWidth - el.scrollWidth;
//					me.grid.find(".sea_grid_scroll_x").css("padding-right", Component.getSize(swidth == 0 ? 17 : swidth));
//				} else {
//					me.grid.find(".sea_grid_scroll_x").css("padding-right", 0);
//				}
				me.grid.find(".sea_grid_normal>div").width(width);
				setTimeout(function(){
					var sea_grid_summary=me.grid.find(".sea_grid_summary");
					if(sea_grid_summary.css("display")!="none"){
						var el = me.grid.find(".sea_grid_normal>.sea_grid_summary").get(0);
						if (Component.hasScroll(el, "horizontal")) {
							var sheight = el.offsetHeight - el.scrollHeight;
							var gridbody=me.grid.find(".sea_grid_body");
							gridbody.height(gridbody.height()-sheight);
						}
					}
				},100);
				
			}, 100);
		},
		getRow : function(rowIndex) {
			return this.grid.find(".sea_grid_forzen .sea_grid_body table tr:eq(" + rowIndex + "),.sea_grid_normal  .sea_grid_body table tr:eq(" + rowIndex + ")");
		},
		getColumnsSet:function(){
			me=this;
			var ul=$("<ul class='sea_grid_columnset' style='line-height:30px;padding:5px;float:left;'></ul>");
			var len=me.columnsForzen.length;
			for(var i=0;i<len;i++){
				var item=me.columnsForzen[i];
				if(!item.label)continue;
				if(item.id=="_index")continue;
				if(item.id=="_op")continue;
				var li=$("<li style='float:left;padding:0 3px;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").appendTo(li);
			}
			var len=me.columnsNormal.length;
			for(var i=0;i<len;i++){
				var item=me.columnsNormal[i];
				if(!item.label)continue;
				var li=$("<li style='float:left;'></li>").appendTo(ul);
				var check=$("<input type='checkbox' checked id='"+item.id+"' colIndex="+i+">"+item.label+"</li>").appendTo(li);
			}
			return ul;
		}
	};
	/** * 输出类对象 ** */
	exports.create = function(configs) {
		return new Grid(configs);
	};
});
define('Dialog',['Lang','ButtonGroup','Component'],function(require, exports, module) {
	/** * 模块外部依赖 ** */ 
	//require.async(("./css/dialog.css");
	var Lang = require('Lang');
	var ButtonGroup = require('ButtonGroup'); 
	var Component = require('Component');
	/** * 模块私有数据 ** */
	var  defaults = {
			id:"",
			hasButtonGroup:true,
 			hasTitle:true,
 			hasMask:true,
 			hasConfirm:true,
 			hasCancel:true,
 			canMove:true,
 			hasClose:true,
			//autoHideTime:2000,
 			width: "400", 
 			height: "200",
 			css:{},
 			cssContent:{},
 			confirmValue: Lang.confirm,
 			confirm: function(){return true;}, //点击确定后回调函数
 			cancelValue:Lang.cancel,
 			cancel: function(){},  //点击取消后回调函数，默认关闭弹出框
 			title: Lang.prompt,  //标题内容，如果不设置，则连同关闭按钮（不论设置显示与否）都不显示标题
 			content: '',  //正文内容，可以为纯字符串，html标签字符串，以及URL地址，当content为URL地址时，将内嵌目标页面的iframe（未实现）。
 			items:null
	    };
	/** * 模块私有方法 ** */
	 var self={
	 	init:function(me){
	 		var indexMask=8;
	 		var dialogCount=$("."+me._className).length;
	 		me.dialog=$("<div></div>").addClass(me._className).css("z-index",(indexMask+dialogCount+3));
	 		Component.css(me.dialog,me.configs);
	 		if(!me.configs.title)me.configs.hasTitle=false;
	 		if(me.configs.hasTitle){
		 		me.title=$("<div><span class='"+me._className+"_title_icon'></span>"+Global.getI18N(me.configs.title)+"</div>").addClass(me._className+"_title").appendTo(me.dialog);
		 		if(me.configs.hasClose){
		 			me.title.append("<span class='"+me._className+"_title_btn "+"iconfont icon-remove1'></span>");
			 		me.title.find("."+me._className+"_title_btn").click(function(){
			 			me.hide();
			 		});
		 		}
		 		if(me.configs.canMove){
					me.title.mousedown(function(e){self.mousedown(me,me.title,e)})
									.mousemove(function(e){self.mousemove(me,me.title,e)})
									.mouseup(function(e){self.mouseup(me,me.title)});
		 		}
	 		}
	 		me.content=$("<div></div>").addClass(me._className+"_content").css(me.configs.cssContent).appendTo(me.dialog);
	 		Component.css(me.dialog,me.configs);
	 		if(me.configs.hasButtonGroup){
				var cfgBtnGroup = {
					cls:me._className+"_buttonGroup",
					items: []
				};
				if(me.configs.hasConfirm==true){
					cfgBtnGroup.items.push({
						cls:me._className+"_buttonGroup_confirm",
						value: me.configs.confirmValue,
					    click: function() {
					    	if(me.configs.confirm()==true)
					    	me.hide();
					    }
					  });
				}
				if(me.configs.hasCancel==true){
					cfgBtnGroup.items.push({
					  	cls:me._className+"_buttonGroup_cancel",
					    value: me.configs.cancelValue,
					    cls:"btn_return",
					    click: function() {
					    	me.configs.cancel();
					    	me.hide();
					    }
					  });
				}
				if(me.configs.items){
					cfgBtnGroup.items=cfgBtnGroup.items.concat(me.configs.items);
				}
				me.buttonGroup=ButtonGroup.create(cfgBtnGroup).buttonGroup.appendTo(me.dialog);	 		
	 		}
	 		var body=$("body").append(me.dialog);
	 		if(me.configs.hasMask){
	 			me.mask=$("<div></div>").addClass(me._className+"_mask").css("z-index",(indexMask+dialogCount+2)).appendTo(body).click(function(){me.isDowm = false; });
	 		}
//	 		if(me.configs.hasClose){
//		 		$(document).keyup(function(event){
//	 				if(event.keyCode === 27){
//	 					me.hide();
//	 				}
//	 			});
//	 		}
	 		var contentHeight=me.dialog.height();
	 		if(me.configs.hasTitle){
	 			contentHeight=contentHeight-64;
	 		}else{
	 			me.content.css("top","0");
	 		}
	 		if(me.configs.hasButtonGroup){
	 			contentHeight=contentHeight-64;
	 		}
	 		me.content.height(contentHeight);
	 		if($.type(me.configs.content)=="object"){
	 			me.content.css("line-height",Component.getSize(contentHeight)).append(me.configs.content);
	 		}else{
	 			me.content.css("display","table").append("<div>"+Global.getI18N(me.configs.content)+"</div>");
	 		}
	 		//重排
	 		me.dialog.css({
				  "margin-top":Component.getSize(-Math.round(me.dialog.height()/2)),
				  "margin-left":Component.getSize(-Math.round(me.dialog.width()/2))
	 		});
	 	},
	 	mousedown:function (me,obj, e) {  
	 		obj.css("cursor","move");
	 		var  offset=obj.offset();
	 		me.diffX=e.clientX-offset.left;
	 		me.diffY=e.clientY-offset.top;
            me.isDowm = true;  
        },
        mousemove:function (me,obj,e) {  
            if (me.isDowm) {  
            	var  offset=self.getMousePos(e);
            	me.dialog.css({
                	left:(offset.x-me.diffX+200)+"px",
                	top:	(offset.y-me.diffY+108)+"px"
                });
            }  
        },
        mouseup:function (me,obj) {  
            me.isDowm = false;  
        	obj.css("cursor","default");
        },
        getMousePos:function(event) { 
  	      var e = event || window.event; 
  	      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
  	      var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
  	      var x = e.pageX || e.clientX + scrollX; 
  	      var y = e.pageY || e.clientY + scrollY; 
  	      return { 'x': x, 'y': y }; 
  	    }
	 };
	/** * 类定义 ** */
	var Dialog = function(configs) {
		// 类的属性定义
		this.configs = $.extend(true, {}, defaults, configs);
		this._className="sea_dialog";
		this. isDowm = false; 
		this.diffX;
		this.diffY;  
		// 初始化
		self.init(this);
	};
	// 类公共方法
	Dialog.prototype = {
		view:function(){
			this.dialog.show();
			this.dialog.find("."+this._className+"_buttonGroup_cancel").hide();
			this.dialog.find("."+this._className+"_buttonGroup_confirm").parent().css("margin","0");
			if(this.configs.hasMask)this.mask.show();
		},
		alert:function(){
			this.view();
			var me=this;
			if(this.configs.autoHideTime){
				//me.mask.remove();
				this.dialog.fadeOut(this.configs.autoHideTime,function(){
					me.dialog.remove();
				});
				if(this.configs.hasMask){
					this.mask.fadeOut(this.configs.autoHideTime,function(){
						me.mask.remove();
					});
				}
			}
			return this;
		},
		confirm:function(){
			this.dialog.show();
			if(this.configs.hasMask)this.mask.show();
			return this;
		},		
		hide:function(){
			this.dialog.remove();
			if(this.configs.hasMask)this.mask.remove();
			return this;
		},
		//白盒测试函数
		test:function(data){
		}
	};
	/** * 输出类对象 ** */
	exports.alert = function(configs) {
		if($.type(configs)=="string"||$.type(configs)=="array"){
			configs={content:configs};
		}
		configs.hasCancel=false;
		return new Dialog(configs).alert();
	};
	
	exports.view = function(configs) {
		if(!configs.width){
			configs.width="100%";
		}
		if(!configs.height){
			configs.height="100%";
		}
		configs.canMove=false;
		return new Dialog(configs).view();
	};
	
	exports.confirm = function(configs) {
		return new Dialog(configs).confirm();
	};
	
	exports.edit = function(configs) {
		if(!configs.width){
			configs.width="100%";
		}
		if(!configs.height){
			configs.height="100%";
		}
		configs.canMove=false;
		return new Dialog(configs).confirm();
	};
});

define('ViewLayout',['String','Component','Ajax'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/viewLayout.css");
	var String = require('String');
	var Component = require('Component');
	var Ajax = require('Ajax');
	/** * 模块私有数据 ** */
	var ClassName="sea_viewLayout";
	// 默认配置
	var defaults = {
		parent: null,	// 父元素
		id: "",
		name: "",
		record:{},//视图记录集
		title: null,
		buttons: [],
		width: "100%",
		height: "100%",
		cls: "",
		css: {"margin":"0 auto"},
		attr: {},
		cssInner:{"padding":"0 10%"},
		cssTr:{},
		isSameLabelWidth:true,//在使用colspan后保持Label的宽度一样
		labelWidthPercent: 0.382,// 黄金分割线，必须为数字；fieldWidth=1-labelWidthPercent
		events: {
			click: null,
			change: null
		},
		items: [[{
			//			id: "",
			//			name: "",
			//			label: "",
			//			value: "",
			//			colspan: "",
			//			cssTr: "",
			//			cssTd: "",
			//			cls: "",
			//			css: "",
			//			attr: ""
			//			}
		}]]
	};
	/** * 模块私有方法 ** */
	var self = {
		// 初始化
		init: function(me) {
			// 控件封装
		  me.layout=me.viewLayout=$("<form></form>").addClass(ClassName);
		  if(me.configs.parent){
			  if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
			   }
			  me.parent.append(me.viewLayout)
		   }
		  	//控件类名设置
		    Component.addClass(me.viewLayout,me.configs);
		    //控件样式设置
			Component.css(me.viewLayout, me.configs);
			// 控件属性设置
			Component.attr(me.viewLayout, me.configs);

			if (me.configs.title) {
				$("<div></div>").addClass("sea_title").append(Global.getI18N(me.configs.title)).appendTo(me.viewLayout);
			}
			var table = $("<div></div>").addClass(ClassName + "_table").appendTo(me.viewLayout).css(me.configs.cssInner);
			var maxColCount = me.configs.items[0].length; // 潜规则1：以首行配置的列数为最大列数(包含hidden类型以及空对象)
			var colWidthInit = Math.floor(100 / maxColCount);
			var rowCount=me.configs.items.length;
			var clsGroup="";//当有title字段时，该title下直到下一个title出现前的字段为一个组，用于控制显藏
			for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
				var rowItems = me.configs.items[rowIndex];
				var colCount=rowItems.length;
				var tr = $("<div></div>").addClass(ClassName + "_tr").css(me.configs.cssTr).appendTo(table);
				if(clsGroup!="")tr.addClass(clsGroup);
				if(rowItems&&colCount>0 && rowItems[0].cssTr){
					tr.css(rowItems[0].cssTr)
				}
				for (var colIndex = 0; colIndex < colCount; colIndex++) {
					var item = rowItems[colIndex];
					if(item.type=="hr"){
						tr.remove();
						table.append("<hr>");
						continue;
					}
					if(item.type=="hidden"){
						continue;
					}
					if(item.hideView==true){
						continue;
					}
					if (!item.id) {
						continue;
					}
					if(item.colspan){
						colWidth=colWidthInit * item.colspan;
					}else{
						colWidth=colWidthInit;
					}
					if(item.type=="title"){
						_Component = $("<div>"+(item.html||"")+"</div>").addClass("sea_subtitle").css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append("<span class='sea_formLayout_subtitle_btn "+"iconfont icon-up'></span>");
						_Component.find(".sea_formLayout_subtitle_btn").bind("click",{index:rowIndex},function(event){
				 			$(this).toggleClass("icon-down icon-up");
				 			$("#"+me.configs.id+" .sea_formLayout_group"+event.data.index).toggle();
				 		});
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						tr.removeClass(clsGroup).css({"padding":0,"margin-bottom":"1px"});
						clsGroup="sea_formLayout_group"+rowIndex;
					}else if(item.type=="image"){
						var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
						self.appendLabel(tdLabel,Component.createLabel(item));
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val=me.configs.record[item.id];
						if(val==null || val==undefined){
							val=item.val;
						}
						if(String.isBlank(val)){
							self.appendFields(tdField,"");
						}else{
							var url=val;
							if(!String.isUrl(url)){
								url=Session.basePath+url;
							}
							
							var image="<img src='"+url+"'/>";
							self.appendFields(tdField,image);
						}
					}else if(item.type=="file"){
						var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
						self.appendLabel(tdLabel,Component.createLabel(item));
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val=me.configs.record[item.id];
						if(val==null || val==undefined){
							val=item.val;
						}
						if(String.isBlank(val)){
							self.appendFields(tdField,"");
						}else{
							var url=val;
							if(!String.isUrl(url)){
								url=Session.basePath+url;
							}
							var fileName=Ajax.getUrlParam(url,"attname");
							var a="<a style='color:blue'target=_blank href='"+url+"' download='"+(fileName||item.label)+"'>下载文件</a>";
							self.appendFields(tdField,a);
						}
					}else if(item.type=="div"){
						var _Component = $("<div></div>").addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append(item.html||"");
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
					}else{
						if(item.label){
							var tdLabel = $("<div></div>").addClass(ClassName + "_td").css("width",  self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
							self.appendLabel(tdLabel,Component.createLabel(item));
						}
						var tdField = $("<div></div>").addClass(ClassName + "_td").css("width", self.getFieldWidth(me,item,colWidthInit,colWidth)).appendTo(tr);
						var val;
						var columnNameArr=item.id.split(".");//兼容关联对象
						if(columnNameArr.length==1){
							val=me.configs.record[item.id];
						}else{
							var relativeObj=me.configs.record[columnNameArr[0]];
							if(relativeObj){
								val=relativeObj[columnNameArr[1]];
							}else{
								val="";
							}
						}
						if(val==null || val==undefined){
							val=item.val;
						}
						self.appendFields(tdField,val);
					}
				}
			}
		},
		appendLabel: function(td, label) {
			$("<div></div>").addClass(ClassName+"_label").append(label).appendTo(td);
		},
		appendFields: function(td, fields) {
			var formFields = $("<div></div>").addClass(ClassName+"_field");
			formFields.append(fields);
			td.append(formFields);
		},
		getLabelWidth:function(me,colWidthInit,colWidth){
			return (me.configs.isSameLabelWidth?colWidthInit:colWidth)* me.configs.labelWidthPercent + '%';
		},
		getFieldWidth:function(me,item,colWidthInit,colWidth){
			if(!item.label)return colWidth+ '%';
			return ((me.configs.isSameLabelWidth&&item.colspan>1)?(colWidthInit* (1 - me.configs.labelWidthPercent)+colWidthInit*(item.colspan-1)):(colWidth* (1 - me.configs.labelWidthPercent))) + '%';
		}
	};
	/** * 类定义 ** */
	var ViewLayout = function(configs) {
		this.configs = $.extend(true, {},defaults, configs);
		self.init(this);
	};
	// 类公共方法
	ViewLayout.prototype = {
		get: function(selector) {
			return this.viewLayout.find(selector)
		}
	};
	/** *输出类对象 ** */
	exports.create = function(configs) {
		return new ViewLayout(configs);
	};
});
define('FormLayout',['Component','Button','ButtonGroup','Checkbox','CheckGroup','DateTime','Hidden','Img','Label','Link','Radio','RadioGroup','Select','Textarea','Textfield','File','Hidden','SysDepartment','Textfield','CfgDictionary','Ajax','JqueryForm','Ajax'],function(require, exports, module) {
	/** * 模块外部依赖 ** */
	//require.async(("./css/formLayout.css");
	//var String = require("String");
	var Component = require('Component'); 
	/** * 模块私有数据 ** */
	var ClassName = "sea_formLayout";
	// 默认配置
	var defaults = {
		parent: null,// 父元素
		id: "",
		name: "",
		record:null,//视图记录集
		title: null,
		action:null,
		buttons: [],
		width: "100%",
		height: "100%",
		cls: "",
		css: {
//			"border": "0",
			"margin": "0 auto"
		},
		attr: {},
		cssInner: {
			"padding": "5px 10% 0 0"
		},
		cssTr:{},
		isSameLabelWidth:true,//在使用colspan后保持Label的宽度一样
		labelWidthPercent: 0.382,
		// 黄金分割线，必须为数字；fieldWidth=1-labelWidthPercent
		events: {
			click: null,
			change: null
		},
		items: [
			[{
				//			id: "",
				//			name: "",
				//			label: "",
				//			type: "",,
				//			tip: "",
				//			tipWdith: "30%",
				//			format: "",
				//			value: "",
				//			isNull: "",
				//			colspan: "",
				//			cssTr: "",
				//			cssTd: "",
				//			cls: "",
				//			css: "",
				//			attr: "",
				//			options: [{
				//				value: "",
				//				text: ""
				//			}],
				//			events: {
				//				click: null,
				//				change: null
				//			}
			}]
		],
		beforeRender: function() {

		},
		afterRender: function() {

		},
		beforeCheck:function(){
			return true;
		},
		afterCheck:function(){
			return true;
		}
	};
	/** * 模块私有方法 ** */
	var self = {
		// 初始化
		init: function(me) {
			// 控件封装
			me.layout=me.formLayout = $("<form autocomplete='off' ></form>").addClass(ClassName);
			if (me.configs.parent) {
				if ($.type(me.configs.parent) == "string") {
					me.parent = $(me.configs.parent);
				} else {
					me.parent = me.configs.parent;
				}
				me.parent.append(me.formLayout)
			}
			//控件类名设置
			Component.addClass(me.formLayout, me.configs);
			// 控件属性设置
			Component.attr(me.formLayout, me.configs);
			//控件样式设置
			Component.css(me.formLayout, me.configs);
			if (me.configs.title) {
				$("<div></div>").addClass("sea_title").append("<i class='iconfont icon-Settings'><i/><span style='margin-left:0.5rem'>"+Global.getI18N(me.configs.title)+"</span>").appendTo(me.formLayout);
			}
			var table = $("<div></div>").addClass(me.configs._clsTable).appendTo(me.formLayout).css(me.configs.cssInner);
			var maxColCount = me.configs.items[0].length; // 潜规则1：以首行配置的列数为最大列数(包含hidden类型以及空对象)
			var colWidthInit = Math.floor(100 / maxColCount);
			var rowCount = me.configs.items.length;
			var clsGroup="";//当有title字段时，该title下直到下一个title出现前的字段为一个组，用于控制显藏
			for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
				var rowItems = me.configs.items[rowIndex];
				var colCount = rowItems.length;
				var tr = $("<div></div>").addClass(me.configs._clsTr).css(me.configs.cssTr).appendTo(table);
				if(clsGroup!="")tr.addClass(clsGroup);
				if (rowItems && colCount > 0 && rowItems[0].cssTr) {
					tr.css(rowItems[0].cssTr)
				}
				for (var colIndex = 0; colIndex < colCount; colIndex++) {
					var item = rowItems[colIndex];
					if (item.colspan) {
						colWidth = colWidthInit * item.colspan;
					} else {
						colWidth = colWidthInit;
					}
					if (!item.type) {
						continue;
					}
					var labelWidthPercent=me.configs.labelWidthPercent;
					var _Component;
					if (!item.id || item.id == "") {
						item.id = Global.getSeq();
					}
					switch (item.type.toLowerCase()) {
					case "title":
						_Component = $("<div>"+(item.html||"")+"</div>").addClass("sea_subtitle").css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append("<span class='sea_formLayout_subtitle_btn "+"iconfont icon-up'></span>");
						_Component.find(".sea_formLayout_subtitle_btn").bind("click",{index:rowIndex},function(event){
				 			$(this).toggleClass("icon-down icon-up");
				 			$("#"+me.configs.id+" .sea_formLayout_group"+event.data.index).toggle();
				 		});
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						tr.removeClass(clsGroup).css({"padding":0,"margin-bottom":"1px"});
						clsGroup="sea_formLayout_group"+rowIndex;
						break;
					case "div":
						_Component = $("<div></div>").addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {});
						_Component.append(item.html||"");
						Component.addClass(_Component, item);
						Component.css(_Component, item);
						Component.attr(_Component, item);
						_Component.appendTo(tr);
						break;
					case "button":
						_Component = require('Button').create(item);
						$("<div></div>").append(_Component.button).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "buttongroup":
						_Component = require('ButtonGroup').create(item);
						$("<div></div>").append(_Component.buttonGroup).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "checkbox":
						_Component = require('Checkbox').create(item);
						if (_Component.label && _Component.configs.showLabelWidth==true) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.checkbox).append(_Component.label);
						break;
					case "checkgroup":
						_Component = require('CheckGroup').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).appendTo(tr);
						self.appendFields(tdField, _Component.checkGroup,_Component);
						break;
					case "color":
						break;
//					case "combobox":
//						_Component = require("ComboBox").create(item);
//						if (_Component.label) {
//							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
//							self.appendLabel(tdLabel, _Component.label);
//						}
//						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
//						self.appendFields(tdField, _Component.combobox,_Component);
//						break;
					case "date":
					case "time":
					case "datetime":
						_Component = require('DateTime').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}  
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).appendTo(tr);
						self.appendFields(tdField, _Component.dateTime.show(),_Component);
						break;
					case "hidden":
						_Component = require('Hidden').create(item);
						me.formLayout.append(_Component.hidden);
						break;
					case "img":
						_Component = require('Img').create(item);
						$("<div></div>").append(_Component.img).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "label":
						_Component = require('Label').create(item);
						$("<div></div>").append(_Component.label).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "link":
						_Component = require('Link').create(item);
						$("<div></div>").append(_Component.link).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
						break;
					case "radio":
						_Component = require('Radio').create(item);
						if (_Component.label &&  _Component.configs.showLabelWidth==true) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						tdField.append(_Component.radio).append(_Component.label);
						break;
					case "radiogroup":
						_Component = require('RadioGroup').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.radioGroup,_Component);
						break;
					case "select":
						_Component = require('Select').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.select,_Component);
						break;
					case "textarea":
						_Component = require('Textarea').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.textarea,_Component);
						break;
					case "textfield":
						_Component = require('Textfield').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						if(item.icon){
							self.appendFields(tdField, _Component.textfieldIcon,_Component);
						}else{
							self.appendFields(tdField, _Component.textfield,_Component);
						}
						break;
					case "file":
						 if(item.auto==false)	{//多个文件上传时，最好统一auto属性
							 this.isMultipartContent=true;
							 me.formLayout.attr({"method":"post","enctype":"multipart/form-data"});
						 } 
						_Component = require('File').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.file,_Component);
						break;
					case "user":
						var hiddenCom = require('Hidden').create({
							id:item.id,
							value:(me.configs.record||{})[item.id]
						});
						me._Components.push({
							id: item.id,
							"type": "hidden",
							"_Component": hiddenCom
						});
						item._id=item.id;
						item.id=item.name;
						item=$.extend(true,item,{
							icon:"iconfont icon-user2",
							iconCss:{
								"background-color":"#28B779"
							},
							css:{
								"height":"28px",
								"line-height":"28px",
								"text-align":"center"
							},
							click:function(){
								var id=$(this).attr("id");
								if($(this).attr("readonly")||$(this).attr("disabled"))return;
								var self=me.formLayout.find("#"+id);
								var _id=self.data("_id");
								var selectType=self.data("selectType");
								var name=self.data("name");
								var params={
									id:me.formLayout.find("#"+_id).val(),
									selectType:selectType
								};
								var SysDepartment=require('SysDepartment');
								if(selectType=="checkbox"){
									SysDepartment.showSelect(params,function(records){
										me.formLayout.find("#"+_id).val(Array.getArrayFieldValue(records,"id"));
										me.formLayout.find("#"+name).val(Array.getArrayFieldValue(records,"name"));
									});
								}else{
									SysDepartment.showSelect(params,function(record){
										me.formLayout.find("#"+_id).val(record.id);
										me.formLayout.find("#"+name).val(record.name);
									});
								}
							}
						});
						_Component = require('Textfield').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, item.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						if(item.icon){
							self.appendFields(tdField, _Component.textfieldIcon,_Component);
						}else{
							self.appendFields(tdField, _Component.textfield,_Component);
						}
						tdField.append(hiddenCom.hidden);
						me.formLayout.find("#"+item.id).data({
							 _id:item._id,
							 name:item.name,
							 selectType:item.selectType||"radio"
						 });
						break;
//					case "navbar":
//						if (item.obj) {
//							$("<div></div>").append(item.obj).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
//						} else {
//							_Component = require("Navbar").create(item);
//							$("<div></div>").append(_Component.navbar).addClass(me.configs._clsTd).css("width", colWidth + '%').css(item.cssTd || {}).appendTo(tr);
//						}
//						break;
					case "hr":
							tr.remove();
							var hr=$("<hr>");
							Component.css(hr, item);
							table.append(hr);
						break;
					case "ueditor":
						_Component = $("<div style='width:100%;'></div>").attr("id", item.id).appendTo($("body"));
						window.UEDITOR_CONFIG.initialFrameHeight=item.height||600;
						if(item.autoHeightEnabled)window.UEDITOR_CONFIG.autoHeightEnabled=item.autoHeightEnabled;
						if(item.toolbars)window.UEDITOR_CONFIG.toolbars=item.toolbars;
						if (item.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel,Component.createLabel(item));
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						try{
							UE.getEditor(item.id).destroy();
						}catch(e){}
						var ue=UE.getEditor(item.id);
						if(me.configs.record){
							ue.setContent(me.configs.record[item.id], false);
						}
						if(item.keydown){
							var keydown=item.keydown;
							ue.addListener("keydown",function(type,event){
								keydown(event);
							});
						}
						self.appendFields(tdField, _Component,_Component);
						break;
					case "dic":
						_Component = require('CfgDictionary').create(item);
						if (_Component.label) {
							var tdLabel = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getLabelWidth(me,colWidthInit,colWidth)).css(item.cssTd || {}).appendTo(tr);
							self.appendLabel(tdLabel, _Component.label);
						}
						var tdField = $("<div></div>").addClass(me.configs._clsTd).css("width", self.getFieldWidth(me,item,colWidthInit,colWidth) ).css(item.cssTd || {}).appendTo(tr);
						self.appendFields(tdField, _Component.dic,_Component);
						break;
					default:
						continue;
					}
					if(me.configs.record){
						_Component.val(me.configs.record);
					}
					me._Components.push({
						id: item.id,
						"type": item.type,
						"_Component": _Component
					});
				}
				if(tr.html()=="")tr.remove();
			}
		},
		appendLabel: function(td, label) {
			$("<div></div>").addClass(ClassName + "_label").append(label).appendTo(td);
		},
		appendFields: function(td, fields,_Component) {
			var formFields = $("<div></div>").addClass(ClassName + "_field");
			var fieldWidth="100%";
			if(_Component&&_Component.tip&&_Component.configs&&_Component.configs.tipWidth){
				formFields.append(_Component.tip);
				var _tipWidth=_Component.configs.tipWidth.replace("%","");
				fieldWidth=(100-_tipWidth)+"%";
			}
			if ($.type(fields) == "array") {
				var fieldCount = fields.length;
				for (var i = 0; i < fieldCount; i++) {
					formFields.prepend(fields[i].css("width",fieldWidth));
				}
			} else {
				formFields.prepend(fields.css("width",fieldWidth));
			}
			
			td.append(formFields);
		},
		getLabelWidth:function(me,colWidthInit,colWidth){
			return (me.configs.isSameLabelWidth?colWidthInit:colWidth)* me.configs.labelWidthPercent + '%';
		},
		getFieldWidth:function(me,item,colWidthInit,colWidth){
			if(!item.label)return colWidth+ '%';
			return ((me.configs.isSameLabelWidth&&item.colspan>1)?(colWidthInit* (1 - me.configs.labelWidthPercent)+colWidthInit*(item.colspan-1)):(colWidth* (1 - me.configs.labelWidthPercent))) + '%';
		}
	}; 
	/** * 类定义 ** */
	var FormLayout = function(configs) {
			this.configs = $.extend(true, {}, defaults, configs);
			this.configs._clsTable=ClassName + "_table";
			this.configs._clsTr=ClassName + "_tr";
			this.configs._clsTd=ClassName + "_td";
			this.isMultipartContent=false;//是否包含文件上传控件
			this._Components = [];
			this.configs.beforeRender();
			self.init(this);
			this.configs.afterRender();
		};

	// 类公共方法
	FormLayout.prototype = {
		submit:function(baseUrl,callback,params){
			if (!this.check()) {
				return false;
			}
			if(!params){
				params=this.val();
			}
			var action=baseUrl+(this.configs.action||"save");
			if(this.configs.action){
				var Ajax=require('Ajax');
				this.formLayout.attr({"action":Ajax.getUrl(action,params),"method":"POST"});
				this.formLayout.submit();
			}else if(this.isMultipartContent){
				this.formLayout.attr("action",Session.basePath+action);
				require('JqueryForm');
				this.formLayout.ajaxSubmit({
					async: false, 
					dataType : "json",
					data:params,
			        success: function (rs) {
						callback(rs);
			        }
			    });
			}else{
				var Ajax=require('Ajax');
	 			Ajax.post(action, params,function(rs) { 
	 				callback(rs);
 				});
			}
			return true;
		},
		get: function(selector) {
			return this.formLayout.find(selector)
		},
		focus: function(id) {
			this.get(id).focus();
		},
		//检查函数
		check: function() {
			if(this.configs.beforeCheck()==false) return false;
			for (var i = 0; i < this._Components.length; i++) {
				var item = this._Components[i];
				if (item._Component.check) {
					if (!item._Component.check()) {
						item._Component.focus();
						return false;
					}
				}
			}
			if(this.configs.afterCheck()==false) return false;
			return true;
		},
		getCom: function(id) {
			for(var i=0;i<this._Components.length;i++){
				if(this._Components[i].id==id){
					return this._Components[i]._Component;
				}
			}
		},
		//值获取或赋值函数
		val: function(data) {
			if (data) {
				for (var i = 0; i < this._Components.length; i++) {
					var item = this._Components[i];
					switch (item.type.toLowerCase()) {
					case "checkbox":
					case "checkgroup":
					case "color":
					case "combobox":	
					case "date":
					case "time":
					case "datetime":
					case "hidden":
					case "radio":
					case "radiogroup":
					case "textarea":
					case "textfield":
					case "file":	
					case "select":
					case "dic":
					case "user":
						item._Component.val(data);
						break;
					case "ueditor":
						UE.getEditor(item.id).setContent(data[item.id], false);
						break;
					default:
						continue;
					}
				}
				return this;
			} else {
				var data = {};
				for (var i = 0; i < this._Components.length; i++) {
					var item = this._Components[i];
					switch (item.type.toLowerCase()) {
					case "checkbox":
					case "checkgroup":
					case "color":
					case "combobox":
					case "date":
					case "time":
					case "datetime":
					case "hidden":
					case "radio":
					case "radiogroup":
					case "textarea":
					case "textfield":
						if(item._Component.configs.like){
							if(item._Component.val()!=""){
								data[item.id] = "%"+$.trim(item._Component.val())+"%";
							}else{
								data[item.id] = "";
							}
						}else{
							data[item.id] = item._Component.val();
						}
						break;
					case "file":	
					case "select":
					case "dic":
					case "user":
						data[item.id] = item._Component.val();
						break;
					case "ueditor":
						data[item.id] =UE.getEditor(item.id).getContent();
						break;
					default:
						continue;
					}
				}
				return data;
			}
		},
		//清空函数
		clear: function() {
			for (var i = 0; i < this._Components.length; i++) {
				var item = this._Components[i];
				switch (item.type.toLowerCase()) {
				case "checkbox":
				case "checkgroup":
				case "color":
				case "combobox":
				case "date":
				case "time":
				case "datetime":
				case "hidden":
				case "radio":
				case "radiogroup":
				case "textarea":
				case "textfield":
				case "file":	
				case "select":
				case "dic":
				case "user":
					item._Component.clear();
					break;
				case "ueditor":
					UE.getEditor(item.id).setContent("", false);
					break;
				default:
					continue;
				}
			}
		}
	};
	/** *输出类对象 ** */
	exports.create = function(configs) {
		return new FormLayout(configs);
	};
});
define('BorderLayout',['String','Component'],function(require, exports, module) {
	/*** 模块外部依赖 ***/
	var String = require('String');
	var Component = require('Component');

	/*** 模块私有数据 ***/
	var ClassName="sea_borderLayout";
	//默认配置
	var defaults = {
		parent: "body",// 父元素，默认为body
		id: "",
		width: "100%",
		height: "100%",
		cls: "",
		resize:true,
		css: {
			"position": "absolute",
			"margin":"0 auto",
			"padding":"0",
			"box-sizing": "border-box",
			"overflow": "hidden"
		},
		horizontally:false,//水平居中
		vertically:false,//垂直居中
		attr: {},
		events: {
			click: null,
			change: null
		},
		//高度，宽度单位必须为数字
		// north : {
		// height : 100,
		// north : {},
		// east : {},
		// south : {},
		// west : {},
		// center : {}
		// },
		// east : {
		// width : 100
		// },
		// south : {
		// height : 100
		// },
		// west : {
		// width : 100
		// },
		center: {}
	};
	/*** 模块化私有方法 ***/
	var self = {
		//初始化
		init: function(parent, configs) {
			Component.attr(parent, configs);
			Component.css(parent,configs);
			parent.addClass(configs.cls);
			var parentHeight = parent.height();
			var northHeight = configs.north && Component.getSize(configs.north.height,parentHeight)||0;
			var southHeight = configs.south && Component.getSize(configs.south.height,parentHeight)||0;
			var centerHeight = parentHeight - northHeight - southHeight;

			var parentWidth = parent.width();
			var westWidth = configs.west && Component.getSize(configs.west.width,parentWidth)||0;
			var eastWidth = configs.east && Component.getSize(configs.east.width,parentWidth)||0;
			var centerWidth = parentWidth - westWidth - eastWidth;

			var left=0,right=0,top=0,bottom=0;
			if(configs.horizontally==true){//水平居中
				 left=($(document).width()-parentWidth)*0.5;
				 right=left;
			}
			if(configs.vertically==true){//垂直居中
				top=($(document).height()-parentHeight)*0.5;
				bottom=top;
			}	
			var block = null;
			for (var key in configs) {
				if (!key) continue;
				var val = configs[key];
				switch (key.toLowerCase()) {
				case "north":
					block = $("<div></div>").css({
						"top": top,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "east":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"right": -right,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "south":
					block = $("<div></div>").css({
						"bottom": -bottom,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "west":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"left": left,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "center":
					block = $("<div></div>").css({
						"top": northHeight+top,
						"left": westWidth+left,
						"height": centerHeight,
						"width": centerWidth
					});
					break;
				default:
					break;
				}
				if (block) {
					val.id = ClassName + Global.getSeq();
					block.attr("id", val.id).css({
						"position": "absolute",
						"box-sizing": "border-box",
						"margin": "0"
					}).addClass(ClassName + "_" + key).appendTo(parent);
					Component.css(block,val);
					Component.attr(block,val);
					Component.addClass(block,val);
				}
				if (val) {
					if (val.north || val.east || val.south || val.east || val.center) {
						self.init(block, val);
					} else if(val.item) {
						block.append(val.item);
					}
				}
			}
		},
		//界面布局重置
		resize: function(parent, configs) {
			var parentHeight = parent.height();
			var northHeight = configs.north && Component.getSize(configs.north.height,parentHeight)||0;
			var southHeight = configs.south && Component.getSize(configs.south.height,parentHeight)||0;
			var centerHeight = parentHeight - northHeight - southHeight;

			var parentWidth = parent.width();
			var westWidth = configs.west && Component.getSize(configs.west.width,parentWidth)||0;
			var eastWidth = configs.east && Component.getSize(configs.east.width,parentWidth)||0;
			var centerWidth = parentWidth - westWidth - eastWidth;
			
			var left=0,right=0,top=0,bottom=0;
			if(configs.horizontally==true){//水平居中
				 left=($(document).width()-parentWidth)*0.5;
				 right=left;
			}
			if(configs.vertically==true){//垂直居中
				top=($(document).height()-parentHeight)*0.5;
				bottom=top;
			}	
			var block = null;
			for (var key in configs) {
				if (!key) continue;
				var val = configs[key];
				switch (key.toLowerCase()) {
				case "north":
					block = $("#" + val.id).css({
						"top": top,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "east":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"right": -right,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "south":
					block = $("#" + val.id).css({
						"bottom": -bottom,
						"left": left,
						"height": val.height,
						"width": parentWidth
					});
					break;
				case "west":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"left": left,
						"height": centerHeight,
						"width": val.width
					});
					break;
				case "center":
					block = $("#" + val.id).css({
						"top": northHeight+top,
						"left": westWidth+left,
						"height": centerHeight,
						"width": centerWidth
					});
					break;
				default:
					break;
				}
				if (val) {
					if (val.north || val.east || val.south || val.east || val.center) {
						self.resize(block, val);
					}
				}
			}
		}
	};
	/** * 类定义 ** */
	var BorderLayout = function(configs) {
		// 类属性定义
		this.configs = $.extend(true, {},defaults, configs);
		if ($.type(this.configs.parent) == "string") {
			this.parent = $(this.configs.parent);
		} else {
			this.parent = this.configs.parent;
		}
		self.init(this.parent, this.configs);
		var me = this;
		if(me.configs.resize==true){
			$(window).resize(function() {
				self.resize(me.parent, me.configs);
			});
		}
	};

	// 类公共方法
	BorderLayout.prototype = {
		getNorth: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "north":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getWest: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "west":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getSouth: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "south":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getEast: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "east":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		getCenter: function(configs) {
			var me=this;
			var block;
			if (!configs) configs = this.configs;
			for (var key in configs) {
				if (!key) continue;
				block = null;
				switch (key.toLowerCase()) {
				case "center":
					var val = configs[key];
					block = $("#" + val.id);
					if (val) {
						if (val.north) {
							block.getNorth = function() {
								return me.getNorth(val);
							};
						}
						if (val.west) {
							block.getWest = function() {
								return me.getWest(val);
							};
						}
						if (val.south) {
							block.getSouth = function() {
								return me.getSouth(val);
							};
						}
						if (val.east) {
							block.getEast = function() {
								return me.getEast(val);
							};
						}
						if (val.center) {
							block.getCenter = function() {
								return me.getCenter(val);
							};
						}
					}
					break;
				default:
					break;
				}
				if (block) {
					break;
				}
			}
			return block;
		},
		check: function(configs) {
			configs = $.extend(true, {},defaults, configs);
			var parent = null;
			if ($.type(configs.parent) == "string") {
				parent = $(this.configs.parent);
			} else {
				parent = this.configs.parent;
			}
			if (parent.length < 0) {
				alert("请配置正确的parent选择器");
				return false;
			}
			var rs = true;
			for (var key in configs) {
				if (!key) continue;
				switch (key.toLowerCase()) {
				case "north":
					if (String.isBlank(configs.north.height)) {
						alert("请配置：" + key + ".height");
						rs = false;
					}
					break;
				case "west":
					if (String.isBlank(configs.west.width)) {
						alert("请配置：" + key + ".width");
						rs = false;
					}
					break;
				case "south":
					if (String.isBlank(configs.south.height)) {
						alert("请配置：" + key + ".height");
						rs = false;
					}
					break;
				case "east":
					if (String.isBlank(configs.east.width)) {
						alert("请配置：" + key + ".width");
						rs = false;
					}
					break;

				default:
					break;
				}
				if (rs == false) {
					break;
				} else {
					var val = configs[key];
					if (val) {
						if (val.north || val.east || val.south || val.east || val.center) {
							rs = this.check(val);
						}
					}
				}
			}
		}
	};
		/** *输出类对象 ** */
		exports.create = function(configs) {
			return new BorderLayout(configs);
		};
	});
seajs.use(['BorderLayout', 'FormLayout', 'ViewLayout', 'Dialog', 'Grid', 'Ajax', 'Component', 'Array'],
function(BorderLayout, FormLayout, ViewLayout, Dialog, Grid, Ajax,Component,Array) {
	/***************变量定义***************/
	var _title='咨讯发布',_baseUrl = "IssueNews/";
	var _currentId,_grid,_dialog,_formQuery,_formEdit;
	/***************函数定义***************/
//	var getFormQuery = function() {
//		var cfgForm = {
//			id:"formQuery",
//			items: [[{
//				id: "type",
//				label: "类型",
//				type: "textfield",
////				params:{
////					app:"system",
////					type:"newsType"
////				},
////				isNull:false,
////				
////				change:function(){
////					if (_formQuery.check()) {
////						_grid.reload(_formQuery.val());
////					}
////				}
//			},{
//				type: "buttongroup",
//				items: [{
//					icon: "iconfont icon-search",
//					css:{"text-align":"left","padding-left":"20px"},
//					value: "查询",
//					click: function() {
//						if (_formQuery.check()) {
//							_grid.reload(_formQuery.val());
//						}
//					}
//				}]
//			}]]
//		};
//		_formQuery=FormLayout.create(cfgForm);
//		return _formQuery.formLayout;
//	};
	var cfgForm = {
		id: "formEdit",
		items: [[{
			id: "type",
			label: "类型",
			isNull:false,
			type: "dic",
			params:{
				app:"system",
				type:"newsType"
			}
		},{
			id: "subType",
			label: "子类型",
			type: "textfield",
			maxLen: "1000"
		}],[{
			id: "source",
			label: "来源",
			type: "textfield",
			maxLen: "1000"
		},{
			id: "mark",
			label: "标识",
			type: "textfield",
			limit: "char"
		}],[{
			id: "title",
			label: "标题",
			type: "textfield",
			isNull:false,
			maxLen: "1000",
			colspan:2
		},{}],[{
//////			id: "originalTitle",
//////			label: "原标题",
//////			type: "textfield",
//////			maxLen: "1000",
//////			colspan:2
//////		}],[{
//////			id: "subTitle",
//////			label: "副标题",
//////			type: "textfield",
//////			maxLen: "1000",
//////			colspan:2
		}],[{
			id: "summary",
			label: "摘要",
			type: "textarea",
			maxLen: "4000",
			colspan:2,
			hide:true
		}],[{
			id: "newsTime",
			label: "新闻时间",
			type: "date",
			format:"YYYY-MM-DD",
			limit:"date"
		},{
			id: "editor",
			label: "责任编辑",
			type: "textfield",
			maxLen: "100"
		}],[{
			id: "content",
			label: "内容",
			type: "ueditor",
			colspan:2,
			hide:true
		}],[{
			id: "coverUrl",
			label: "缩略图",
			type:"file",
			colspan:2,
			hide:true
		}],[{
			id: "contentUrl",
			label: "网址",
			type: "textfield",
			maxLen: "1000",
			colspan:2,
			hide:true
//		}],[{
//			id: "cntFavorite",
//			label: "收藏数",
//			type: "textfield",
//			maxLen: "10"
//		},{
//			id: "cntShare",
//			label: "分享数",
//			type: "textfield",
//			maxLen: "10"
//		}],[{
//			id: "cntClick",
//			label: "点击数",
//			type: "textfield",
//			maxLen: "10"
//		},{
//			id: "cntComment",
//			label: "评论数",
//			type: "textfield",
//			maxLen: "10"
		}],[{
			id: "id",
			type: "hidden"
		}]]
	};
	var getFormView = function(record) {
		cfgForm.record=record;
		return  ViewLayout.create(cfgForm);
	};
	var getFormEdit = function(record) {
		cfgForm.record=record;
		return FormLayout.create(cfgForm);
	};
	var getGrid = function() {
		var cfgGrid = {
			title:_title,
			url: _baseUrl,
			params:{
				type:"-1"
			},
			toolbar: {
				items:[{
//					icon: "iconfont icon-publish1",
//					value: "发布",
//					click: function() {
//						var selected =_grid.getSelected();
//						var params={
//							id: selected
//						};
//						Ajax.post(_baseUrl+"publish",params,function(rs) {
//							Dialog.alert(rs.msg);
//							_grid.reload(_formQuery.val());
//						});
//					}
//				},{
					id: "search-title",
					placeholder:"请输入标题",
					type: "textfield",
					width:"300",
					icon:"iconfont icon-find",
					iconCss:{
						"background-color":"#28B779"
					},
					cssLi:{
						"float":"right"
					},
					click:function(){
						_grid.reload({"title":$("#search-title").val(),"type":$("#search-type").val()});
					}
				},{
					id: "search-type",
					nullText:"请选择类型",
					type:"dic",
					params:{
						app:"system",
						type:"newsType"
					},
					width:"150",
					cssLi:{
						"float":"right",
						"margin-right":"10px"
					}
				}],
				onAdd: function(record, selected) {
//					if(_formQuery.check()==false){
//						Dialog.alert("请选择类型");
//						return;
//					}
//					record={
//						type:$("#formQuery #type").val()
//					};
					Component.onAdd(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog);
				},
				onEdit: function(record, selected) {
//					if(_formQuery.check()==false){
//						Dialog.alert("请选择类型");
//						return;
//					}
					Component.onEdit(_grid,_dialog,_formEdit,_formQuery,_title,_baseUrl,getFormEdit,record,Dialog,Array,_currentId);
				},
				onView: function(record, selected) {
//					if(_formQuery.check()==false){
//						Dialog.alert("请选择类型");
//						return;
//					}
					Component.onView(_grid,_dialog,_title,getFormView,record,Dialog,Array,_currentId);
				}
			}
		};
		_grid = Grid.create(Component.getCfgGrid(cfgGrid,cfgForm));
		return _grid.grid;
	};
	/***************函数调用***************/
	BorderLayout.create({
//		north: {
//			height: 60,
//			item: getFormQuery()
//		},
		center: {
			item: getGrid()
		}
	});
});
