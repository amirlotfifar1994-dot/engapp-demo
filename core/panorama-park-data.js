/* Category 01 · Lesson 03: explore the original panorama pixels through nested details. */
(function(root){
 'use strict';
 const levels=['A1','A2','B1','B2','C1'];
 const patterns={be:['subject + is / are + description','Use is for one thing and are for more than one.'],there:['there is / are + noun','Introduce something your listener can see.'],position:['place phrase + reference point','Name a nearby object to help your listener find the detail.'],with:['with + noun + detail','Add a visible feature to your description.'],action:['subject + be + verb-ing','Use the present continuous for an action happening now.']};
 function point(id,title,u,v,phrases,task,extra={}){
  const forms=Object.fromEntries(phrases.map((phrase,i)=>[levels[i],{text:phrase[0],phrase:phrase[1],pattern:patterns[phrase[2]][0],note:patterns[phrase[2]][1]}]));
  return {id,title,u,v,forms,task,boundary:'Describe only what the picture shows. It does not establish the people’s names, relationships, ages or plans.',...extra};
 }
 function detail(id,title,x,y,parentId,text,task,focusFov=46){
  const phrases=text.split('|').map(cell=>{const m=cell.match(/\{([^{}]+)~(\w+)\}/);if(!m||!patterns[m[2]])throw Error('Park language focus missing: '+id);return [cell.replace(m[0],m[1]),m[1],m[2]];});
  if(phrases.length!==levels.length)throw Error('Park detail requires five levels: '+id);
  return point(id,title,x/1774,y/887,phrases,task,{parentId,focusFov});
 }
 const kids=point('park-kids','Two children running',.30,.54,[
  ['The children are running.','are running','action'],['Two children are running together.','are running together','action'],['The boy and girl are running along the path.','along the path','position'],['The children run hand in hand, with the girl in a yellow dress.','with the girl in a yellow dress','with'],['The two children move along the curved path, with their joined hands linking the two figures.','with their joined hands','with']
 ],'Describe what the children are doing, then add one visible detail about their clothes.');
 const hand=point('park-joined-hands','Their joined hands',.335,.65,[
  ['Their hands are together.','are together','be'],['The children are holding hands.','holding hands','action'],['Their hands meet between them as they run.','between them','position'],['The children hold hands while running, with the boy in a blue shirt.','with the boy in a blue shirt','with'],['Their joined hands form a clear connection between the running children, with both arms extended toward the center.','with both arms extended','with']
 ],'Look closely at the hands. Which visible details show that the children are moving?',{parentId:kids.id});
 const playground=point('park-playground','Playground and slide',.89,.47,[['There is a playground.','a playground','there'],['The slide is near the trees.','near the trees','position'],['Children are playing beside the slide.','beside the slide','action'],['The playground stands beyond the lawn, with a slide and climbing frame.','with a slide and climbing frame','with'],['The playground fills the far side of the park, with a slide, climbing structure and swings.','with a slide, climbing structure and swings','with']],'Look around the play area. Name the equipment you can see.');
 const swings=point('park-swings','Children on the swings',.82,.50,[['Children are on the swings.','are on the swings','be'],['There are swings beside the slide.','swings beside the slide','there'],['The swings hang beside the climbing frame.','beside the climbing frame','position'],['Children sit on the swings, with chains above the seats.','with chains above the seats','with'],['The swing seats hang from a metal frame, with children seated beneath the horizontal bar.','with children seated','with']],'Describe the swings and the children you can see.',{parentId:playground.id});
 const slide=point('park-slide','Green playground slide',.92,.51,[['The slide is green.','is green','be'],['The slide is beside the swings.','beside the swings','position'],['The slide slopes down to the ground.','slopes down to the ground','action'],['The green slide curves downward, with the climbing frame above it.','with the climbing frame above it','with'],['The slide curves from the raised play structure, with its lower end close to the ground.','with its lower end','with']],'Trace the slide from the climbing frame down to the ground.',{parentId:playground.id});
 const benchWoman=point('park-bench-woman','Woman sitting on a bench',.97,.55,[['A woman is sitting.','is sitting','action'],['A woman is sitting on a bench.','on a bench','position'],['The woman sits near the playground.','near the playground','position'],['A woman rests on the bench, with the play area nearby.','with the play area nearby','with'],['A woman sits on a wooden bench beside the path, with the playground in the background.','with the playground in the background','with']],'Describe where the woman is sitting and what is behind her.');
 const strollerMan=point('park-man-stroller','Man with a stroller',.79,.50,[['A man is standing.','is standing','action'],['A man is standing beside a stroller.','beside a stroller','position'],['The man is holding the stroller handle.','holding the stroller handle','action'],['A man stands behind the stroller, with one hand on its handle.','with one hand on its handle','with'],['The man stands beside a dark stroller, with his hands near its handle.','with his hands near its handle','with']],'Describe the man’s position in relation to the stroller.');
 const lake=point('park-lake','Lake and water',.12,.45,[['The water is calm.','is calm','be'],['There is a lake in the park.','a lake','there'],['The lake lies beyond the flower beds.','beyond the flower beds','position'],['The lake reflects the trees, with a small bridge crossing the water.','with a small bridge','with'],['The lake curves around the far lawn, with trees and a low bridge reflected on its surface.','with trees and a low bridge','with']],'Look across the water. Name what is beside or beyond the lake.');
 const lawnGroup=point('park-lawn-group','People sitting on the grass',.53,.48,[['People are sitting.','are sitting','action'],['Some people are sitting on the grass.','on the grass','position'],['A small group sits together on the lawn.','together on the lawn','position'],['Several people sit on the grass, with open lawn around them.','with open lawn around them','with'],['A small group is seated on the lawn, with the broad park path in the foreground.','with the broad park path','with']],'Describe what the group is doing and where they are sitting.');
 const moreDetails=[
  detail('park-boy-shirt','Boy’s blue T-shirt',474,511,kids.id,'The shirt {is blue~be}.|The boy {is wearing a blue T-shirt~action}.|The blue shirt is {above his dark shorts~position}.|The boy has a blue T-shirt, {with short sleeves~with}.|The bright blue shirt stands out, {with dark shorts below it~with}.','Describe the shirt’s color and sleeves.'),
  detail('park-girl-dress','Girl’s yellow dress',598,552,kids.id,'The dress {is yellow~be}.|The girl {is wearing a yellow dress~action}.|The yellow dress is {beside the boy’s blue shirt~position}.|The yellow dress has a light pattern, {with its skirt spreading outward~with}.|The yellow fabric spreads around the girl’s legs, {with a pale pattern visible on it~with}.','Compare the two children’s clothes.'),
  detail('park-running-shoes','Running shoes',530,648,kids.id,'The shoes {are light and dark~be}.|The children {are wearing shoes~action}.|Their shoes are {above the paved path~position}.|The shoes are at different heights, {with some soles lifted off the path~with}.|The children’s feet occupy different positions, {with lifted shoes suggesting movement~with}.','Describe the visible feet without guessing their speed.'),
  detail('park-bridge','Low arched bridge',235,419,lake.id,'The bridge {is small~be}.|{There is a bridge~there} over the water.|The low bridge is {behind the lake~position}.|The bridge curves across the water, {with a dark opening underneath~with}.|A low arched bridge crosses the far water, {with its curved top visible against the trees~with}.','Trace the curved top and locate the opening beneath it.'),
  detail('park-water-birds','Birds on the water',273,453,lake.id,'The birds {are small~be}.|{There are birds~there} on the water.|Small birds are {in front of the far bank~position}.|The birds appear as small shapes, {with water around them~with}.|Several small birds are visible on the lake, {with their shapes contrasting against the lighter water~with}.','Locate the birds without guessing their species or number.'),
  detail('park-water-reflections','Reflections on the lake',339,458,lake.id,'The water {is reflective~be}.|{There are reflections~there} on the lake.|Reflections are visible {below the far trees~position}.|Light and dark patches cover the water, {with reflected trees along the bank~with}.|The lake carries broken reflections, {with darker tree shapes interrupting the lighter surface~with}.','Compare a tree with its reflection.'),
  detail('park-willow','Drooping lakeside tree',305,355,lake.id,'The tree {is green~be}.|The branches {are over the water~be}.|The branches hang {beside the bridge~position}.|The tree has drooping branches, {with long leaves near the lake~with}.|Long branches hang toward the lakeside, {with the tree’s shape reflected below~with}.','Describe the direction of the branches.'),
  detail('park-lake-border','Flowers beside the lake',341,483,lake.id,'The flowers {are beside the water~be}.|{There are flowers~there} along the lake.|The flowers grow {between the water and the lawn~position}.|A low flower border follows the lake, {with grass on the near side~with}.|A narrow planted border separates the lawn from the water, {with flowers tracing the shoreline~with}.','Use between and along to describe the border.'),
  detail('park-lawn-children','Children on the open lawn',834,457,null,'Children {are on the grass~be}.|Some children {are standing on the lawn~action}.|The children stand {behind the running pair~position}.|Several small figures stand on the lawn, {with the seated group to their right~with}.|Children occupy the middle distance, {with open grass separating them from the foreground path~with}.','Compare the standing children with the seated visitors.',58),
  detail('park-seated-visitors','Seated visitors',949,465,lawnGroup.id,'People {are sitting together~action}.|The visitors {are on the lawn~be}.|The seated people are {behind the open grass~position}.|The group is seated together, {with trees in the distance~with}.|Several visitors sit close to one another, {with a wide area of lawn around them~with}.','Describe their positions without assigning family roles.'),
  detail('park-picnic-blanket','Blue picnic blanket',946,477,lawnGroup.id,'The blanket {is blue~be}.|{There is a blue blanket~there} on the grass.|The blue blanket is {beneath the seated group~position}.|The group sits on a blanket, {with its blue edge visible~with}.|A strip of blue fabric is visible under the group, {with grass surrounding the picnic spot~with}.','Find the blue fabric and describe its position.'),
  detail('park-woman-table','Woman facing away at the table',1150,479,'park-family','A woman {is sitting~action}.|The woman {is sitting at the table~action}.|Her back is {toward the camera~position}.|The seated woman faces away, {with dark hair over her light shirt~with}.|The woman is viewed from behind at the picnic table, {with the tabletop and trees beyond her~with}.','Describe her posture and clothes; her face is not visible.'),
  detail('park-picnic-table','Wooden picnic table',1154,488,'park-family','The table {is wooden~be}.|{There is a picnic table~there} under the tree.|The table stands {beside the lawn~position}.|The picnic table has a broad top, {with benches along its sides~with}.|The wooden table occupies the shaded edge of the lawn, {with attached seating on either side~with}.','Name the tabletop and the seating below it.'),
  detail('park-table-bench','Bench at the picnic table',1139,513,'park-family','The bench {is long~be}.|The seat {is below the table~be}.|The wooden seat runs {along the side of the table~position}.|The bench stands on dark supports, {with the table above it~with}.|A long bench follows the edge of the picnic table, {with its supports visible near the ground~with}.','Explain how the bench is positioned relative to the table.'),
  detail('park-stroller-canopy','Stroller canopy',1394,462,strollerMan.id,'The cover {is dark~be}.|The stroller is dark, {with a curved cover~with}.|The canopy sits {above the stroller seat~position}.|The curved canopy covers the upper seat, {with the frame below it~with}.|The stroller has a curved upper cover, {with the interior partly concealed beneath it~with}.','Describe the cover without claiming that a baby is visible.'),
  detail('park-stroller-wheels','Stroller wheels',1394,511,strollerMan.id,'The wheels {are small~be}.|{There are wheels~there} under the stroller.|The wheels are {on the paved path~position}.|Small wheels support the stroller, {with dark frame bars above them~with}.|The lower stroller frame rests on small wheels, {with the paving visible beneath them~with}.','Locate the wheels and the surface they touch.'),
  detail('park-stroller-handle','Stroller handle',1378,444,strollerMan.id,'The handle {is dark~be}.|The handle {is near the man’s hands~be}.|The handle sits {behind the stroller cover~position}.|The man stands near the handle, {with the stroller in front of him~with}.|The handle rises behind the stroller, {with the man positioned close to it~with}.','Describe the relationship between the man, handle and stroller.'),
  detail('park-bench-slats','Wooden bench back',1691,491,benchWoman.id,'The bench {is wooden~be}.|The bench is wooden, {with horizontal slats~with}.|The backrest is {behind the woman~position}.|The bench has wooden slats, {with dark supports at its sides~with}.|Horizontal wooden slats form the backrest, {with dark side supports framing the seat~with}.','Describe the wood and supports.'),
  detail('park-bench-shoes','Woman’s white shoes',1630,527,benchWoman.id,'The shoes {are white~be}.|The woman {is wearing white shoes~action}.|Her shoes are {above the path~position}.|The light shoes contrast with dark trousers, {with the bench behind them~with}.|Her pale shoes are visible below the dark trousers, {with the paved path underneath~with}.','Compare the colors of her shoes and trousers.'),
  detail('park-play-tower','Raised play platform',1572,419,playground.id,'The platform {is high~be}.|{There is a play platform~there} above the ground.|The platform is {at the top of the slide~position}.|The wooden platform has upright posts, {with a roof above it~with}.|A raised play platform connects the equipment, {with upright posts supporting the roof~with}.','Describe what is above and below the platform.'),
  detail('park-play-roof','Green playground roof',1574,362,playground.id,'The roof {is green~be}.|The roof {is above the platform~be}.|The pointed roof sits {over the play tower~position}.|The roof slopes on several sides, {with a point at its top~with}.|A pointed green roof covers the raised tower, {with its sloping sides contrasting with the vertical posts~with}.','Describe the roof’s color and shape.'),
  detail('park-swing-frame','Swing frame',1476,407,swings.id,'The frame {is tall~be}.|The frame {is above the swings~be}.|A horizontal bar runs {over the swing seats~position}.|The swing frame has a long top bar, {with upright supports at its sides~with}.|The top bar spans the swing area, {with side supports holding it above the seats~with}.','Find the horizontal bar and its supports.'),
  detail('park-tulips','Red and yellow tulips',112,526,'park-flowers','The flowers {are colorful~be}.|{There are red and yellow flowers~there}.|The flowers grow {beside the near path~position}.|Upright flowers rise from green leaves, {with red and yellow petals~with}.|The near flower bed contains upright blooms, {with bright petals standing above narrow green leaves~with}.','Name two colors and describe the leaves.'),
  detail('park-tree-trunk','Large tree trunk',1251,416,'park-tree','The trunk {is thick~be}.|The trunk {is beside the table~be}.|The trunk rises {between the table and playground~position}.|The trunk splits into branches, {with shade around its base~with}.|The broad trunk rises beside the picnic area, {with major branches spreading into the canopy~with}.','Follow the trunk upward into its branches.'),
  detail('park-overhead-branches','Branches overhead',963,98,'park-tree','The leaves {are green~be}.|The branches {are above us~be}.|Leafy branches stretch {across the top of the scene~position}.|The branches cross the sky, {with sunlight between their leaves~with}.|An overhead network of branches frames the view, {with gaps of blue sky between the leaves~with}.','Describe the branches against the sky.',62),
  detail('park-lawn-shadows','Tree shadows on the grass',1151,641,'park-tree','The shadows {are dark~be}.|{There are shadows~there} on the grass.|The shadows fall {beneath the trees~position}.|Dark patches cross the grass, {with sunlight between them~with}.|Broad shadows interrupt the green lawn, {with scattered patches of sunlight around their edges~with}.','Compare a shaded patch with a sunlit patch.'),
  detail('park-path-edge','Curved edge of the path',704,673,'park-path','The edge {is curved~be}.|The path {is beside the grass~be}.|The curved edge runs {between the paving and lawn~position}.|The path bends beside the grass, {with a narrow edge between them~with}.|The paved curve separates the near path from the lawn, {with the grass following its outer edge~with}.','Trace the boundary between the paving and grass.'),
  detail('park-sky','Sky above the park',718,190,null,'The sky {is blue~be}.|{There are clouds~there} above the park.|The blue sky appears {between the treetops~position}.|Small white clouds cross the sky, {with leafy branches around them~with}.|Patches of blue sky are visible above the park, {with thin white clouds between the treetops~with}.','Describe the visible sky without guessing the temperature.',68),
  detail('park-city','Buildings beyond the trees',1443,352,null,'The building {is tall~be}.|{There are buildings~there} behind the trees.|A tall building rises {above the treetops~position}.|The distant tower stands behind the park, {with lower buildings to its left~with}.|A blue-gray tower rises beyond the canopy, {with shorter buildings partly hidden by the trees~with}.','Describe the skyline without guessing the buildings’ names or location.',26)
 ];
 const main={id:'park-lesson-03',title:'A Day at the Park · 360°',eyebrow:'CATEGORY 01 · LESSON 03',credit:'AI-generated learning scene; not a photograph.',categoryId:1,experimental:true,projection:'equirectangular',initialQuality:'high',image:{light:'assets/panoramas/park-lesson-03-wide.png',high:'assets/panoramas/park-lesson-03-wide.png',width:1774,height:887},alt:'A 360-degree spring park with children running, a lake, people sitting on the grass, a man with a stroller, swings, a slide and a woman on a bench facing away.',levels,initial:{yaw:-72,pitch:-3,fov:72},areas:['park-kids','park-path','park-flowers','park-lake','park-lawn-group','park-playground','park-family','park-man-stroller','park-bench-woman','park-tree'],hotspots:[
  kids,hand,
  point('park-path','Curved park path',.49,.84,[['The path is curved.','is curved','be'],['The path runs through the park.','through the park','position'],['The path curves around the lawn.','around the lawn','position'],['The paved path bends beside the grass, with flower beds along its edge.','with flower beds','with'],['The curved path guides the view through the park, with lawn and flower beds on either side.','on either side','with']],'Use around, beside and along to explain where the path goes.'),
  point('park-flowers','Colorful flower beds',.08,.57,[['The flowers are bright.','are bright','be'],['There are flowers beside the path.','beside the path','there'],['Red and yellow flowers grow along the path.','along the path','position'],['The flower bed borders the path, with several bright colors.','with several bright colors','with'],['Clusters of flowers line the curved path, with red, yellow and purple blooms among the green leaves.','with red, yellow and purple blooms','with']],'Name two colors and locate the flowers in the scene.'),
  playground,swings,slide,
  lake,lawnGroup,
  point('park-family','People at a picnic table',.68,.51,[['A person is sitting.','is sitting','action'],['Some people are sitting at a table.','at a table','position'],['Two people sit beside a picnic table.','beside a picnic table','position'],['People are resting in the shade, with a stroller nearby.','with a stroller nearby','with'],['A small group sits beneath the tree, with a picnic table and stroller close to the path.','with a picnic table and stroller','with']],'Describe the visible people and objects without guessing their relationships.'),strollerMan,benchWoman,
  point('park-tree','Large shade tree',.66,.20,[['The tree is tall.','is tall','be'],['The tree is above the table.','above the table','position'],['A wide tree shades the picnic area.','shades the picnic area','action'],['The branches spread over the lawn, with sunlight filtering through the leaves.','with sunlight filtering through the leaves','with'],['The broad canopy covers part of the lawn, with scattered sunlight reaching the picnic area below.','with scattered sunlight','with']],'Use above and below to describe the tree and the picnic area.')
 ],nextScene:'park-next',nextLabel:'Walk forward',previousScene:null};
 main.hotspots.push(...moreDetails);
 main.areas.push('park-lawn-children','park-sky','park-city');
 const anchors={
  'park-kids':[[527,548],[588,585]],'park-joined-hands':[[536,532],[595,570]],
  'park-boy-shirt':[[474,511],[515,532]],'park-girl-dress':[[598,552],[682,590]],'park-running-shoes':[[530,648],[580,740]],
  'park-path':[[408,725],[408,745]],'park-flowers':[[110,535],[110,580]],
  'park-playground':[[1580,431],[1587,430]],'park-swings':[[1477,452],[1493,450]],'park-slide':[[1617,452],[1627,453]],
  'park-bench-woman':[[1677,482],[1675,477]],'park-man-stroller':[[1358,443],[1407,443]],
  'park-lake':[[249,451],[255,455]],'park-lawn-group':[[951,467],[984,468]],'park-family':[[1149,480],[1205,481]],'park-tree':[[1242,347],[1288,345]],
  'park-bridge':[[235,419],[235,418]],'park-water-birds':[[273,453],[273,453]],'park-water-reflections':[[339,458],[339,458]],'park-willow':[[305,355],[305,355]],'park-lake-border':[[341,483],[341,483]],
  'park-lawn-children':[[834,457],[849,457]],'park-seated-visitors':[[949,465],[984,466]],'park-picnic-blanket':[[946,477],[984,477]],
  'park-woman-table':[[1150,479],[1205,481]],'park-picnic-table':[[1154,488],[1211,489]],'park-table-bench':[[1139,513],[1202,516]],
  'park-stroller-canopy':[[1394,462],[1438,462]],'park-stroller-wheels':[[1394,511],[1438,520]],'park-stroller-handle':[[1378,444],[1422,445]],
  'park-bench-slats':[[1691,491],[1692,488]],'park-bench-shoes':[[1630,527],[1630,514]],
  'park-play-tower':[[1572,419],[1580,416]],'park-play-roof':[[1574,362],[1580,362]],'park-swing-frame':[[1476,407],[1492,407]],
  'park-tulips':[[112,526],[112,580]],'park-tree-trunk':[[1251,416],[1298,416]],'park-overhead-branches':[[963,98],[963,98]],'park-lawn-shadows':[[1151,641],[1151,641]],'park-path-edge':[[704,673],[812,730]],'park-sky':[[718,190],[718,190]],'park-city':[[1443,352],[1443,352]]
 };
 for(const h of main.hotspots){const p=anchors[h.id][0];h.u=p[0]/1774;h.v=p[1]/887;h.focusFov=h.focusFov||(h.parentId?46:58);}
 main.reconstructions=[
  {id:'park-family',rect:[1025,381,270,180],width:1536,height:1024,focusFov:38,gain:[.86885,.87251,.84222],bias:[.07741,.05441,.04492]},
  {id:'park-man-stroller',rect:[1285,388,225,150],width:1536,height:1024,focusFov:32,gain:[.87617,.8545,.81992],bias:[.06582,.05984,.05614]},
  {id:'park-lake',rect:[70,315,330,220],width:1536,height:1024,focusFov:42,gain:[.83709,.81924,.84995],bias:[.11461,.10252,.08113]},
  {id:'park-lawn-group',rect:[890,414,150,100],width:1536,height:1024,focusFov:30,gain:[.83008,.83656,.7],bias:[.13259,.08717,.10631]},
  {id:'park-city',rect:[1358,302,155,95],width:1602,height:982,focusFov:26,gain:[.7,.70504,.79289],bias:[.27318,.24312,.16578]},
  {id:'park-lawn-children',rect:[740,402,150,112],width:1448,height:1086,focusFov:30,gain:[.77902,.77306,.7],bias:[.18933,.14683,.10604]}
 ].map(p=>({...p,image:`assets/panoramas/park-rebuilt-v1/${p.id}.png`,source:main.image.high,kind:'ai-reconstruction'}));
 main.reconstructions.push(...[
  {
    "id": "park-kids",
    "rect": [
      355,
      391,
      435,
      290
    ],
    "width": 1536,
    "height": 1024,
    "focusFov": 50,
    "gain": [
      0.87134,
      0.87766,
      0.84441
    ],
    "bias": [
      0.04308,
      0.03127,
      0.03452
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-kids.png"
  },
  {
    "id": "park-playground",
    "rect": [
      1400,
      330,
      360,
      240
    ],
    "width": 1536,
    "height": 1024,
    "focusFov": 48,
    "gain": [
      0.86705,
      0.87451,
      0.88465
    ],
    "bias": [
      0.07897,
      0.05907,
      0.047
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-playground.png"
  },
  {
    "id": "park-path",
    "rect": [
      209,
      547,
      600,
      340
    ],
    "width": 1666,
    "height": 944,
    "focusFov": 58,
    "gain": [
      0.88485,
      0.88316,
      0.87519
    ],
    "bias": [
      0.03639,
      0.02987,
      0.02972
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-path.png"
  },
  {
    "id": "park-flowers",
    "rect": [
      0,
      413,
      300,
      200
    ],
    "width": 1536,
    "height": 1024,
    "focusFov": 42,
    "gain": [
      0.77356,
      0.75023,
      0.78687
    ],
    "bias": [
      0.11965,
      0.10864,
      0.06913
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-flowers.png"
  },
  {
    "id": "park-tree",
    "rect": [
      1020,
      100,
      540,
      360
    ],
    "width": 1536,
    "height": 1024,
    "focusFov": 50,
    "gain": [
      0.86293,
      0.87003,
      0.88593
    ],
    "bias": [
      0.06784,
      0.05469,
      0.04745
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-tree.png",
    "paintBounds": [
      0,
      0,
      1,
      0.78
    ]
  },
  {
    "id": "park-sky",
    "rect": [
      480,
      80,
      600,
      400
    ],
    "width": 1536,
    "height": 1024,
    "focusFov": 68,
    "gain": [
      0.76643,
      0.84334,
      0.8656
    ],
    "bias": [
      0.12457,
      0.06256,
      0.06939
    ],
    "image": "assets/panoramas/park-rebuilt-v2/park-sky.png",
    "paintBounds": [
      0,
      0,
      1,
      0.82
    ]
  }
].map(p=>({...p,source:main.image.high,kind:'ai-reconstruction'})));
 main.reconstructions.push({"id":"park-lawn-shadows","rect":[850,487,600,400],"width":1536,"height":1024,"focusFov":42,"gain":[0.80804,0.75771,0.8953],"bias":[0.09118,0.10256,0.06162],"image":"assets/panoramas/park-rebuilt-v2/park-lawn-shadows.png","paintBounds":[0.02,0.2,0.98,1],"source":"assets/panoramas/park-lesson-03-wide.png","kind":"ai-reconstruction"});
 const parkIndex=new Map(main.hotspots.map(h=>[h.id,h]));
 const contains=(p,h)=>{const [x,y,w,hh]=p.rect,px=h.u*main.image.width,py=h.v*main.image.height,b=p.paintBounds||[0,0,1,1];return px>=x+w*b[0]&&px<=x+w*b[2]&&py>=y+hh*b[1]&&py<=y+hh*b[3];};
 for(const h of main.hotspots){let area=h;while(area.parentId)area=parkIndex.get(area.parentId);const photo=main.reconstructions.find(p=>p.id===area.id&&contains(p,h))||main.reconstructions.filter(p=>contains(p,h)).sort((a,b)=>a.rect[2]*a.rect[3]-b.rect[2]*b.rect[3])[0];if(photo){h.reconstructionId=photo.id;h.focusFov=Math.min(h.focusFov,photo.focusFov);}}
 main.experimental=false;
 main.hierarchyNavigation=true;
 main.forwardFocus='park-kids';
 main.nextScene=null;
 main.initial.pitch=-14;
 main.lesson={id:'park-360-03',number:3,categoryId:1,title:'A Day at the Park',
  goal:'Describe people, actions and positions around a park.',
  route:['park-kids','park-path','park-flowers','park-lake','park-lawn-children','park-lawn-group','park-family','park-man-stroller','park-playground','park-bench-woman','park-city','park-tree','park-sky'],
  speaking:['Describe one person and say where they are.','Compare two activities using two sentences.','Give a short tour: describe three places in the park.'],
  minFound:7};
 const mission=(id,...clues)=>({id,clues});
 main.missions=[
  mission('park-joined-hands','Find the hands that are together.','Find the hands the running children are holding.','Find where the children’s hands meet between them.','Locate the point connecting the two children as they run.','Locate the joined hands linking the two foreground figures.'),
  mission('park-bridge','Find the bridge.','Find the small bridge over the water.','Look for the low bridge beyond the lake.','Locate the arched bridge with a dark opening underneath.','Find the low arch spanning the water behind the near flower beds.'),
  mission('park-lawn-children','Find the children on the grass.','Find the standing children on the lawn.','Look for children standing behind the running pair.','Find the standing figures to the left of the seated visitors.','Locate the children separated from the foreground path by open lawn.'),
  mission('park-picnic-blanket','Find the blue blanket.','Find the blue blanket under the people.','Look for blue fabric beneath the seated group.','Find the visible edge of the blanket beneath the seated visitors.','Locate the blue fabric marking the group’s picnic spot on the lawn.'),
  mission('park-woman-table','Find the woman at the table.','Find the seated woman facing away.','Look for the woman with her back toward the camera.','Find the woman in a light shirt at the wooden picnic table.','Locate the seated figure whose back faces the viewer beneath the tree.'),
  mission('park-stroller-canopy','Find the stroller cover.','Find the curved cover on the stroller.','Look for the canopy above the stroller seat.','Find the curved cover in front of the man near the path.','Locate the canopy partly concealing the stroller’s interior.'),
  mission('park-slide','Find the green slide.','Find the slide beside the swings.','Look for the slide leading down from the play tower.','Locate the green slide curving toward the ground.','Find the sloping part of the play structure beneath its raised platform.'),
  mission('park-bench-woman','Find the woman on the bench.','Find the woman sitting near the playground.','Look for a woman sitting on a wooden bench beside the path.','Find the seated woman with the play area behind her.','Locate the bench occupant at the far edge of the playground.'),
  mission('park-city','Find the tall building.','Find the buildings behind the trees.','Look for a tower rising above the treetops.','Locate the distant tower with shorter buildings to its left.','Find the skyline partly concealed by the park canopy.'),
  mission('park-tulips','Find the colorful flowers.','Find red and yellow flowers near the path.','Look for upright blooms beside the near path.','Find bright petals rising above narrow green leaves.','Locate the near flower bed bordering the curved paved path.')
 ];
 main.learningRevision='park-learning-v2-20261028';
 main.detailBuilderModels={
  "park-joined-hands": "The children|are holding|hands.",
  "park-swings": "There are|swings|beside the slide.",
  "park-slide": "The slide|is|beside the swings.",
  "park-boy-shirt": "The boy|is wearing|a blue T-shirt.",
  "park-girl-dress": "The girl|is wearing|a yellow dress.",
  "park-running-shoes": "The children|are wearing|shoes.",
  "park-bridge": "There is|a bridge|over the water.",
  "park-water-birds": "There are|birds|on the water.",
  "park-water-reflections": "There are|reflections|on the lake.",
  "park-willow": "The branches|are|over the water.",
  "park-lake-border": "There are|flowers|along the lake.",
  "park-seated-visitors": "The visitors|are|on the lawn.",
  "park-picnic-blanket": "There is|a blue blanket|on the grass.",
  "park-woman-table": "The woman|is sitting|at the table.",
  "park-picnic-table": "There is|a picnic table|under the tree.",
  "park-table-bench": "The seat|is|below the table.",
  "park-stroller-canopy": "The stroller|is dark,|with a curved cover.",
  "park-stroller-wheels": "There are|wheels|under the stroller.",
  "park-stroller-handle": "The handle|is|near the man’s hands.",
  "park-bench-slats": "The bench|is wooden,|with horizontal slats.",
  "park-bench-shoes": "The woman|is wearing|white shoes.",
  "park-play-tower": "There is|a play platform|above the ground.",
  "park-play-roof": "The roof|is|above the platform.",
  "park-swing-frame": "The frame|is|above the swings.",
  "park-tulips": "There are|red and yellow flowers.",
  "park-tree-trunk": "The trunk|is|beside the table.",
  "park-overhead-branches": "The branches|are|above us.",
  "park-lawn-shadows": "There are|shadows|on the grass.",
  "park-path-edge": "The path|is|beside the grass."
};
 main.speakingByLevel={
  "A1": {
    "30": "Say two short sentences about the children. Name an action and a color you can see.",
    "60": "Describe one person and one object. Use short sentences with is, are or there is.",
    "90": "Describe three parts of the park in short sentences. Name people, actions and nearby objects."
  },
  "A2": {
    "30": "Describe one person, their clothes and what they are doing. Use details you can see.",
    "60": "Describe two people or groups. Say where they are and name one nearby object.",
    "90": "Give a short tour of three park areas. Link actions and places with and, then or next to."
  },
  "B1": {
    "30": "Connect a visible action to a clothing detail and a nearby reference point.",
    "60": "Compare two visible activities in different park areas. Explain where each happens.",
    "90": "Guide a listener from the path to two other areas. Use position phrases and clear links between details."
  },
  "B2": {
    "30": "Compare two visible details using precise position or contrast language. Keep claims tied to what is shown.",
    "60": "Explain how people and objects relate across two areas. If you suggest a possibility, label it with might or could.",
    "90": "Give a structured park tour with an opening, two comparisons and a closing observation. Separate any interpretation from visible facts."
  },
  "C1": {
    "30": "Give a concise, precise description connecting a foreground detail to its wider setting.",
    "60": "Compare foreground and background activities with varied phrasing. Distinguish directly visible evidence from any tentative interpretation.",
    "90": "Deliver a coherent guided description linking three areas, contrasting details and explaining spatial relationships. Mark uncertainty and avoid inventing identities or intentions."
  }
};
 const near={...main,id:'park-lesson-03-forward',title:'Closer to the Children · 360°',eyebrow:'LESSON 03 · MOVE FORWARD',reconstructions:[],image:{light:'assets/panoramas/park-lesson-03-forward.png',high:'assets/panoramas/park-lesson-03-forward.png',width:1774,height:887},alt:'A closer viewpoint along the same park path, with children running, swings, a slide and a woman on a bench.',initial:{yaw:-72,pitch:-3,fov:72},nextScene:null,nextLabel:'Return to the wide view',previousScene:'park',hotspots:[
  ...main.hotspots.map(({reconstructionId,...h})=>({...h,u:anchors[h.id][1][0]/1774,v:anchors[h.id][1][1]/887,focusFov:Math.max(h.focusFov,42)}))
 ]};
 near.forwardFocus=null;
 const granularRows=[{"id":"park-running-boy","title":"Running boy","photo":"park-kids","pixel":[425,455],"parentId":"park-kids","a1":"The boy is running.","chunks":"The boy|is running|in a blue T-shirt.","b1":"The boy runs beside the girl, with one hand joined to hers.","person":true},{"id":"park-boy-hair","title":"Boy’s short dark hair","photo":"park-kids","pixel":[445,177],"parentId":"park-running-boy","a1":"His hair is dark.","chunks":"The boy|has|short dark hair.","b1":"Short dark hair is visible above the boy’s face.","person":false},{"id":"park-boy-face","title":"Boy’s smiling face","photo":"park-kids","pixel":[485,244],"parentId":"park-running-boy","a1":"He is smiling.","chunks":"The boy|is smiling|toward the girl.","b1":"The boy’s turned face and smile are visible above his blue shirt.","person":false},{"id":"park-boy-shorts","title":"Boy’s dark shorts","photo":"park-kids","pixel":[407,603],"parentId":"park-running-boy","a1":"His shorts are dark.","chunks":"The boy|is wearing|dark shorts.","b1":"Dark shorts are visible below the boy’s blue shirt.","person":false},{"id":"park-boy-shoes","title":"Boy’s dark trainers","photo":"park-kids","pixel":[390,907],"parentId":"park-running-boy","a1":"His shoes are dark.","chunks":"The boy|is wearing|dark trainers.","b1":"The dark trainers have pale soles against the paved path.","person":false},{"id":"park-boy-free-hand","title":"Boy’s open free hand","photo":"park-kids","pixel":[211,503],"parentId":"park-running-boy","a1":"His hand is open.","chunks":"The boy|has|one open hand.","b1":"One hand hangs beside the boy, separate from the joined hands.","person":false},{"id":"park-boy-sleeve","title":"Boy’s short sleeve","photo":"park-kids","pixel":[528,355],"parentId":"park-boy-shirt","a1":"The sleeve is short.","chunks":"The blue sleeve|ends|above his elbow.","b1":"The short sleeve leaves the boy’s forearm uncovered.","person":false},{"id":"park-running-girl","title":"Running girl","photo":"park-kids","pixel":[845,508],"parentId":"park-kids","a1":"The girl is running.","chunks":"The girl|is running|in a yellow dress.","b1":"The girl runs beside the boy, with one hand joined to his.","person":true},{"id":"park-girl-hair","title":"Girl’s long dark hair","photo":"park-kids","pixel":[958,280],"parentId":"park-running-girl","a1":"Her hair is long.","chunks":"The girl|has|long dark hair.","b1":"Her long hair extends behind her head as she moves.","person":false},{"id":"park-girl-face","title":"Girl’s smiling face","photo":"park-kids","pixel":[854,251],"parentId":"park-running-girl","a1":"She is smiling.","chunks":"The girl|is smiling|toward the boy.","b1":"The girl’s face is turned toward the boy, with a visible smile.","person":false},{"id":"park-dress-pattern","title":"Pale pattern on the dress","photo":"park-kids","pixel":[881,415],"parentId":"park-girl-dress","a1":"The pattern is pale.","chunks":"The yellow dress|has|a pale flower pattern.","b1":"Small pale flower shapes are visible across the yellow fabric.","person":false},{"id":"park-dress-buttons","title":"Buttons on the dress","photo":"park-kids","pixel":[857,408],"parentId":"park-girl-dress","a1":"There are buttons.","chunks":"Small buttons|run|down the dress.","b1":"A line of small buttons is visible on the front of the dress.","person":false},{"id":"park-girl-shoes","title":"Girl’s white trainers","photo":"park-kids","pixel":[831,927],"parentId":"park-running-girl","a1":"Her shoes are white.","chunks":"The girl|is wearing|white trainers.","b1":"The white trainers stand out against the pale path.","person":false},{"id":"park-girl-bent-arm","title":"Girl’s bent free arm","photo":"park-kids","pixel":[946,437],"parentId":"park-running-girl","a1":"Her arm is bent.","chunks":"The girl|has|one bent arm.","b1":"Her free arm bends beside her body, away from the joined hands.","person":false},{"id":"park-man-hair","title":"Man’s short dark hair","photo":"park-man-stroller","pixel":[520,104],"parentId":"park-man-stroller","a1":"His hair is dark.","chunks":"The man|has|short dark hair.","b1":"Short dark hair is visible at the back and side of the man’s head.","person":false},{"id":"park-man-profile","title":"Side of the man’s face","photo":"park-man-stroller","pixel":[557,144],"parentId":"park-man-stroller","a1":"His face is turned.","chunks":"The man|is facing|toward the playground.","b1":"The side of the man’s face is visible; the front is not fully shown.","person":false},{"id":"park-man-shirt","title":"Man’s blue T-shirt","photo":"park-man-stroller","pixel":[488,304],"parentId":"park-man-stroller","a1":"The shirt is blue.","chunks":"The man|is wearing|a blue T-shirt.","b1":"The blue T-shirt covers his back and has short sleeves.","person":false},{"id":"park-man-shorts","title":"Man’s light shorts","photo":"park-man-stroller","pixel":[467,580],"parentId":"park-man-stroller","a1":"His shorts are light.","chunks":"The man|is wearing|light-colored shorts.","b1":"Light shorts are visible below the man’s blue shirt.","person":false},{"id":"park-man-shoes","title":"Man’s dark trainers","photo":"park-man-stroller","pixel":[512,904],"parentId":"park-man-stroller","a1":"His shoes are dark.","chunks":"The man|is wearing|dark trainers.","b1":"Dark trainers with pale soles rest on the paved path.","person":false},{"id":"park-man-hand","title":"Man’s hand on the handle","photo":"park-man-stroller","pixel":[611,425],"parentId":"park-man-stroller","a1":"His hand is on the handle.","chunks":"The man|has a hand|on the stroller handle.","b1":"One visible hand rests around the curved stroller handle.","person":false},{"id":"park-stroller-seat","title":"Stroller seat","photo":"park-man-stroller","pixel":[794,703],"parentId":"park-man-stroller","a1":"The seat is dark.","chunks":"The stroller|has|a dark seat.","b1":"The seat lies beneath the canopy, with no occupant clearly established.","person":false},{"id":"park-stroller-frame","title":"Sloping stroller frame","photo":"park-man-stroller","pixel":[754,762],"parentId":"park-man-stroller","a1":"The frame is dark.","chunks":"Dark bars|support|the stroller.","b1":"Sloping frame bars connect the seat area to the wheels.","person":false},{"id":"park-swing-boy","title":"Child in blue on a swing","photo":"park-man-stroller","pixel":[1212,464],"parentId":"park-swings","a1":"A child is sitting.","chunks":"A child in blue|is sitting|on a swing.","b1":"The child in blue is seated with hands beside the swing chains.","person":true},{"id":"park-swing-boy-shirt","title":"Swing child’s blue shirt","photo":"park-man-stroller","pixel":[1222,445],"parentId":"park-swing-boy","a1":"The shirt is blue.","chunks":"The child|is wearing|a blue shirt.","b1":"The blue shirt is visible above the child’s dark shorts.","person":false},{"id":"park-swing-boy-hands","title":"Hands beside the swing chains","photo":"park-man-stroller","pixel":[1209,401],"parentId":"park-swing-boy","a1":"The hands are raised.","chunks":"The child|is holding|the swing chains.","b1":"The child’s raised hands meet the chains on either side of the seat.","person":false},{"id":"park-swing-girl","title":"Child in purple on a swing","photo":"park-man-stroller","pixel":[1473,482],"parentId":"park-swings","a1":"A child is on a swing.","chunks":"A child in purple|is sitting|on a swing.","b1":"The child in purple sits on a separate swing beside the child in blue.","person":true},{"id":"park-swing-girl-shirt","title":"Swing child’s purple top","photo":"park-man-stroller","pixel":[1492,454],"parentId":"park-swing-girl","a1":"The top is purple.","chunks":"The child|is wearing|a purple top.","b1":"The purple top is visible above the swing seat.","person":false},{"id":"park-bench-woman-hair","title":"Seated woman’s dark hair","photo":"park-playground","pixel":[1212,487],"parentId":"park-bench-woman","a1":"Her hair is dark.","chunks":"The woman|has|long dark hair.","b1":"Her dark hair falls down the back of her light top.","person":false},{"id":"park-bench-woman-top","title":"Seated woman’s light top","photo":"park-playground","pixel":[1183,590],"parentId":"park-bench-woman","a1":"Her top is light.","chunks":"The woman|is wearing|a light long-sleeved top.","b1":"The light sleeves extend along her arms beside the bench.","person":false},{"id":"park-bench-woman-jeans","title":"Seated woman’s blue jeans","photo":"park-playground","pixel":[1065,697],"parentId":"park-bench-woman","a1":"Her jeans are blue.","chunks":"The woman|is wearing|blue jeans.","b1":"Blue jeans are visible between the light top and white shoes.","person":false},{"id":"park-bench-armrest","title":"Dark bench armrest","photo":"park-playground","pixel":[1251,666],"parentId":"park-bench-woman","a1":"The armrest is dark.","chunks":"A dark armrest|is|beside the woman.","b1":"The curved armrest borders the bench seat beside her arm.","person":false},{"id":"park-swing-seat","title":"Dark swing seat","photo":"park-playground","pixel":[254,574],"parentId":"park-swings","a1":"The seat is dark.","chunks":"The swing|has|a dark seat.","b1":"A dark seat hangs below the chains on the swing frame.","person":false},{"id":"park-swing-chains","title":"Hanging swing chains","photo":"park-playground","pixel":[336,422],"parentId":"park-swings","a1":"The chains hang down.","chunks":"Metal chains|hang|from the top bar.","b1":"Vertical chains connect the top bar to the swing seat.","person":false},{"id":"park-slide-bottom","title":"Curved end of the slide","photo":"park-playground","pixel":[996,579],"parentId":"park-slide","a1":"The end is curved.","chunks":"The green slide|curves|near the ground.","b1":"The lower end of the slide bends outward above the play surface.","person":false},{"id":"park-tower-posts","title":"Upright playground posts","photo":"park-playground","pixel":[659,442],"parentId":"park-play-tower","a1":"The posts are upright.","chunks":"Wooden posts|support|the play platform.","b1":"Upright posts frame the raised platform and its roof.","person":false},{"id":"park-play-surface","title":"Brown play surface","photo":"park-playground","pixel":[634,676],"parentId":"park-playground","a1":"The ground is brown.","chunks":"A brown surface|lies|under the equipment.","b1":"The brown play surface contrasts with the paving beside the bench.","person":false},{"id":"park-table-woman-hair","title":"Picnic visitor’s dark hair","photo":"park-family","pixel":[716,370],"parentId":"park-woman-table","a1":"Her hair is dark.","chunks":"The woman|has|long dark hair.","b1":"Dark hair is visible down her back; her face is not shown.","person":false},{"id":"park-table-woman-top","title":"Picnic visitor’s pale top","photo":"park-family","pixel":[710,558],"parentId":"park-woman-table","a1":"Her top is pale.","chunks":"The woman|is wearing|a pale short-sleeved top.","b1":"The pale top is seen from behind above her blue jeans.","person":false},{"id":"park-table-woman-jeans","title":"Picnic visitor’s blue jeans","photo":"park-family","pixel":[760,678],"parentId":"park-woman-table","a1":"Her jeans are blue.","chunks":"The woman|is wearing|blue jeans.","b1":"The blue jeans are visible above the bench and near her lower legs.","person":false},{"id":"park-table-woman-shoes","title":"Picnic visitor’s light shoes","photo":"park-family","pixel":[727,829],"parentId":"park-woman-table","a1":"Her shoes are light.","chunks":"The woman|is wearing|light-colored shoes.","b1":"Light shoes are visible beneath the wooden bench.","person":false},{"id":"park-table-woman-hand","title":"Hand resting on the table","photo":"park-family","pixel":[854,517],"parentId":"park-woman-table","a1":"Her hand is on the table.","chunks":"The woman|has a hand|on the tabletop.","b1":"One hand rests on the wooden tabletop beside the blue bottle.","person":false},{"id":"park-blue-bottle","title":"Blue bottle on the table","photo":"park-family","pixel":[927,467],"parentId":"park-picnic-table","a1":"The bottle is blue.","chunks":"A blue bottle|stands|on the table.","b1":"The upright blue bottle is beside the seated visitor’s hand.","person":false},{"id":"park-table-bag","title":"Light bag on the table","photo":"park-family","pixel":[588,487],"parentId":"park-picnic-table","a1":"There is a bag.","chunks":"A light-colored bag|rests|on the table.","b1":"The soft bag rests on the tabletop to the visitor’s left.","person":false},{"id":"park-table-supports","title":"Dark picnic-table supports","photo":"park-family","pixel":[1042,741],"parentId":"park-picnic-table","a1":"The supports are dark.","chunks":"Dark metal bars|support|the table.","b1":"The dark supports curve down from the wooden table toward the ground.","person":false},{"id":"park-tabletop-edge","title":"Thick wooden tabletop","photo":"park-family","pixel":[1123,537],"parentId":"park-picnic-table","a1":"The tabletop is wooden.","chunks":"The table|has|a thick wooden top.","b1":"The thick wooden edge runs along the side of the tabletop.","person":false},{"id":"park-lawn-blue-child","title":"Child in blue on the lawn","photo":"park-lawn-children","pixel":[508,584],"parentId":"park-lawn-children","a1":"A child is on the grass.","chunks":"A child in blue|is standing|on the grass.","b1":"The child in blue stands to the left of the other two children.","person":true},{"id":"park-lawn-blue-hair","title":"Blue-shirt child’s long hair","photo":"park-lawn-children","pixel":[535,478],"parentId":"park-lawn-blue-child","a1":"The hair is long.","chunks":"The child|has|long brown hair.","b1":"Long brown hair is visible above the blue shirt.","person":false},{"id":"park-lawn-blue-trousers","title":"Blue-shirt child’s dark trousers","photo":"park-lawn-children","pixel":[528,646],"parentId":"park-lawn-blue-child","a1":"The trousers are dark.","chunks":"The child|is wearing|dark trousers.","b1":"Dark trousers extend from the blue shirt to the shoes.","person":false},{"id":"park-lawn-blue-shoes","title":"Blue-shirt child’s trainers","photo":"park-lawn-children","pixel":[457,714],"parentId":"park-lawn-blue-child","a1":"The shoes have light soles.","chunks":"The child|is wearing|trainers with light soles.","b1":"The trainers rest at different angles on the grass.","person":false},{"id":"park-lawn-purple-child","title":"Child in a pale purple shirt","photo":"park-lawn-children","pixel":[909,553],"parentId":"park-lawn-children","a1":"A child is facing away.","chunks":"A child in pale purple|is facing away|on the lawn.","b1":"The child in pale purple is viewed from behind between the other children.","person":true},{"id":"park-lawn-ponytail","title":"Tied-back hair","photo":"park-lawn-children","pixel":[902,418],"parentId":"park-lawn-purple-child","a1":"The hair is tied back.","chunks":"The child|has|a ponytail.","b1":"The ponytail falls behind the head above the pale purple shirt.","person":false},{"id":"park-lawn-purple-shorts","title":"Dark shorts with a pink edge","photo":"park-lawn-children","pixel":[911,569],"parentId":"park-lawn-purple-child","a1":"The shorts are dark.","chunks":"The dark shorts|have|a pink edge.","b1":"A pink edge outlines the dark shorts below the pale purple shirt.","person":false},{"id":"park-lawn-red-child","title":"Child in a red top","photo":"park-lawn-children","pixel":[1272,514],"parentId":"park-lawn-children","a1":"The top is red.","chunks":"A child in red|is standing|on the grass.","b1":"The child in red stands to the right of the other children.","person":true},{"id":"park-lawn-red-hair","title":"Red-top child’s short hair","photo":"park-lawn-children","pixel":[1267,380],"parentId":"park-lawn-red-child","a1":"The hair is short.","chunks":"The child|has|short light-brown hair.","b1":"Short hair is visible above the red top at the back of the head.","person":false},{"id":"park-lawn-red-shorts","title":"Blue shorts below the red top","photo":"park-lawn-children","pixel":[1282,550],"parentId":"park-lawn-red-child","a1":"The shorts are blue.","chunks":"The child in red|is wearing|blue shorts.","b1":"Blue shorts are visible beneath the red sleeveless top.","person":false},{"id":"park-picnic-left-visitor","title":"Seated visitor in blue","photo":"park-lawn-group","pixel":[445,508],"parentId":"park-lawn-group","a1":"A visitor is sitting.","chunks":"A visitor in blue|is sitting|on the blanket.","b1":"The visitor in blue is seated on the left side of the blanket.","person":true},{"id":"park-picnic-left-hair","title":"Blue-shirt visitor’s tied hair","photo":"park-lawn-group","pixel":[408,398],"parentId":"park-picnic-left-visitor","a1":"The hair is tied back.","chunks":"The visitor|has|tied-back dark hair.","b1":"Dark hair is gathered at the back of the blue-shirt visitor’s head.","person":false},{"id":"park-picnic-left-jeans","title":"Blue-shirt visitor’s jeans","photo":"park-lawn-group","pixel":[466,603],"parentId":"park-picnic-left-visitor","a1":"The jeans are dark.","chunks":"The visitor in blue|is wearing|dark jeans.","b1":"The dark jeans are visible where the visitor sits on the blanket.","person":false},{"id":"park-picnic-child","title":"Child between the seated visitors","photo":"park-lawn-group","pixel":[671,541],"parentId":"park-lawn-group","a1":"A child is sitting.","chunks":"A child in red|is sitting|between two visitors.","b1":"The child’s red shirt is visible between the two larger seated figures.","person":true},{"id":"park-picnic-child-hair","title":"Seated child’s short hair","photo":"park-lawn-group","pixel":[670,465],"parentId":"park-picnic-child","a1":"The hair is short.","chunks":"The seated child|has|short brown hair.","b1":"Short brown hair is visible above the back of the red shirt.","person":false},{"id":"park-picnic-right-visitor","title":"Seated visitor in a pale top","photo":"park-lawn-group","pixel":[858,521],"parentId":"park-lawn-group","a1":"A visitor is facing away.","chunks":"A visitor in a pale top|is sitting|on the blanket.","b1":"The pale-top visitor sits to the right of the child, facing away.","person":true},{"id":"park-picnic-right-hair","title":"Pale-top visitor’s brown hair","photo":"park-lawn-group","pixel":[876,422],"parentId":"park-picnic-right-visitor","a1":"The hair is brown.","chunks":"The visitor|has|brown shoulder-length hair.","b1":"Brown hair falls to the shoulders above the pale top.","person":false},{"id":"park-picnic-right-jeans","title":"Pale-top visitor’s blue jeans","photo":"park-lawn-group","pixel":[827,621],"parentId":"park-picnic-right-visitor","a1":"The jeans are blue.","chunks":"The visitor in a pale top|is wearing|blue jeans.","b1":"Blue jeans are visible where the visitor is seated on the blanket.","person":false},{"id":"park-paving-joints","title":"Joints between paving sections","photo":"park-path","pixel":[943,472],"parentId":"park-path","a1":"There are lines in the paving.","chunks":"Dark joints|divide|the paving sections.","b1":"A dark joint curves across the pale paved surface.","person":false},{"id":"park-paving-texture","title":"Texture of the paved path","photo":"park-path","pixel":[809,729],"parentId":"park-path","a1":"The surface is textured.","chunks":"The path|has|a textured pale surface.","b1":"Small dark and light marks are visible across the paving.","person":false},{"id":"park-path-leaves","title":"Small leaves on the paving","photo":"park-path","pixel":[336,337],"parentId":"park-path","a1":"There are leaves on the path.","chunks":"Small fallen leaves|lie|on the paving.","b1":"Small scattered leaves rest on the path near its planted edge.","person":false},{"id":"park-path-shadows","title":"Leaf shadows across the path","photo":"park-path","pixel":[1164,730],"parentId":"park-path","a1":"The shadows are dark.","chunks":"Leaf shadows|cross|the pale path.","b1":"The shadows form dark shapes between sunlit areas of paving.","person":false},{"id":"park-grass-blades","title":"Grass beside the paving","photo":"park-path","pixel":[1385,212],"parentId":"park-path-edge","a1":"The grass is green.","chunks":"Green grass|grows|beside the path.","b1":"Blades of grass follow the curved edge of the paving.","person":false},{"id":"park-pink-petals","title":"Pink flower petals","photo":"park-flowers","pixel":[278,479],"parentId":"park-flowers","a1":"The petals are pink.","chunks":"Some flowers|have|bright pink petals.","b1":"Pink petals rise above the long green leaves near the path.","person":false},{"id":"park-yellow-petals","title":"Yellow flower petals","photo":"park-flowers","pixel":[838,499],"parentId":"park-flowers","a1":"The petals are yellow.","chunks":"Some flowers|have|yellow petals.","b1":"Yellow blooms stand among pink flowers and green leaves.","person":false},{"id":"park-flower-leaves","title":"Long green flower leaves","photo":"park-flowers","pixel":[763,790],"parentId":"park-flowers","a1":"The leaves are long.","chunks":"The flowers|have|long green leaves.","b1":"Long pointed leaves spread around the flower stems.","person":false},{"id":"park-flower-stems","title":"Upright flower stems","photo":"park-flowers","pixel":[578,640],"parentId":"park-flowers","a1":"The stems are upright.","chunks":"Green stems|hold|the flowers above the leaves.","b1":"Slender green stems support the bright blooms.","person":false},{"id":"park-planted-soil","title":"Soil beneath the flowers","photo":"park-flowers","pixel":[1350,878],"parentId":"park-flowers","a1":"The soil is brown.","chunks":"Brown soil|is visible|beneath the plants.","b1":"A strip of brown soil separates the planted bed from the path.","person":false},{"id":"park-flower-trunk-bark","title":"Rough bark beside the flowers","photo":"park-flowers","pixel":[177,199],"parentId":"park-flowers","a1":"The bark is rough.","chunks":"The tree trunk|has|rough dark bark.","b1":"Deep lines texture the bark above the nearby flowers.","person":false}];

 const granularIndex=new Map(main.hotspots.map(h=>[h.id,h]));
 main.detailBuilderModels={...main.detailBuilderModels};
 for(const spec of granularRows){
  const photo=main.reconstructions.find(p=>p.id===spec.photo),owner=granularIndex.get(spec.parentId);if(!photo||!owner)throw Error('Granular source missing: '+spec.id);
  const [x,y,w,h]=photo.rect,[px,py]=spec.pixel;const u=(x+px/photo.width*w)/main.image.width,v=(y+py/photo.height*h)/main.image.height;
  const sentence=spec.chunks.split('|').join(' '),texts=[spec.a1,sentence,spec.b1,sentence+' '+owner.forms.B1.text,spec.b1+' '+owner.forms.C1.text];
  const grammar=/^There (is|are)/.test(sentence)?patterns.there:/\b(is|are) (wearing|holding|running|sitting|standing|facing)/.test(sentence)?patterns.action:/\b(has|have)\b/.test(sentence)?['subject + has / have + visible feature','Use has or have to describe a visible feature.']:/\b(is|are)\b/.test(sentence)?patterns.be:['subject + verb + visible detail','Use the present simple to describe a visible arrangement.'];
  const forms=Object.fromEntries(levels.map((level,i)=>[level,{text:texts[i],phrase:texts[i].replace(/\.$/,''),pattern:grammar[0],note:grammar[1]}]));
  const target={id:spec.id,title:spec.title,u,v,parentId:spec.parentId,forms,task:'Listen, locate this detail, then describe it and one nearby feature.',boundary:'Describe visible reconstructed details only. Do not infer a hidden face, identity, exact age, relationship or intention.',focusFov:v>.85?26:Math.max(26,Math.min(40,photo.focusFov)),reconstructionId:photo.id,kind:spec.person?'person':'detail',anchorSource:{image:photo.image,pixel:spec.pixel}};
  if(granularIndex.has(target.id))throw Error('Duplicate granular target: '+target.id);granularIndex.set(target.id,target);main.hotspots.push(target);main.detailBuilderModels[target.id]=spec.chunks;
 }
 for(const [id,parentId] of [['park-boy-shirt','park-running-boy'],['park-girl-dress','park-running-girl']])granularIndex.get(id).parentId=parentId;
 main.learningRevision='park-granular-listening-v3-20261028';

 root.SceneSpeakPanoramaPark=main;root.SceneSpeakPanoramaParkNear=near;
 if(typeof module!=='undefined'&&module.exports)module.exports={main,near};
})(typeof window!=='undefined'?window:globalThis);
