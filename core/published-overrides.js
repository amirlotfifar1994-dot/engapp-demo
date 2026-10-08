/* EngBook published-content final authority layer.
   Loaded after lesson runtime patches. Contains no Admin UI or operator API. */
(function(root){
  'use strict';
  const overrides=root.ENGBOOK_ADMIN_PUBLISHED_OVERRIDES||{};
  const applied=[];
  for(const [key,pack] of Object.entries(overrides)){
    const id=Number(key);if(!Number.isInteger(id)||!pack)continue;
    try{
      root.EngBookContent?.registerPack?.(pack,{replace:true});
      if(typeof CAT01!=='undefined'&&Array.isArray(CAT01.lessons)){
        const lesson=CAT01.lessons.find(x=>Number(x.id)===id);if(lesson&&Array.isArray(pack.hotspots))lesson.hotspots=JSON.parse(JSON.stringify(pack.hotspots));
      }
      if(typeof CAT02!=='undefined'&&Array.isArray(CAT02.lessons)){
        const lesson=CAT02.lessons.find(x=>Number(x.id)===id);if(lesson&&Array.isArray(pack.hotspots))lesson.hotspots=JSON.parse(JSON.stringify(pack.hotspots));
      }
      applied.push(id);
    }catch(e){console.error('Published override rejected',id,e);}
  }
  root.ENGBOOK_RUNTIME={...(root.ENGBOOK_RUNTIME||{}),publishedOverrideLayer:'v0.80-final-authority',publishedOverrideLessons:applied};
})(typeof window!=='undefined'?window:globalThis);
