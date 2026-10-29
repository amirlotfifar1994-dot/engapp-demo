/* All-detail discovery without moving the underlying source anchors. */
(function(root){'use strict';
 function cluster(points,radius=38,selected=null){const groups=[];for(const p of points){const fixed=p.id===selected;let group=!fixed&&groups.find(g=>!g.fixed&&Math.hypot(g.x-p.x,g.y-p.y)<radius);if(!group){group={id:p.id,x:p.x,y:p.y,ids:[],fixed};groups.push(group);}group.ids.push(p.id);}return groups;}
 const api=Object.freeze({cluster});if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SceneSpeakPanoramaDensity=api;
})(typeof window!=='undefined'?window:globalThis);
