/* EngBook Course Catalog v0.34
   Course-level information architecture. Category metadata is independent
   from app availability: a category may be mapped in editorial planning while its
   interactive lesson packs are not yet onboarded into this build. */
(function(root){
  'use strict';
  const categories=[
    {id:1,title:'Home, Family & Relationships',shortTitle:'Home & Relationships',phase:'core',appStatus:'active',totalLessons:28,lessonStart:1,lessonEnd:28,scope:'People, relationships, caregiving, home environments, domestic routines, pet care, household tasks, celebrations, body language, and social interaction.',iconKey:'home'},
    {id:2,title:'Education, Study & Academic Life',shortTitle:'Education & Study',phase:'core',appStatus:'active',totalLessons:32,lessonStart:29,lessonEnd:60,scope:'Classrooms, early learning, remote study, presentations, feedback, school administration, lectures, libraries, parent–teacher communication, story time, assessment, and campus life.',iconKey:'study'},
    {id:3,title:'Everyday Services, Shopping & Food',shortTitle:'Services, Shopping & Food',phase:'core',appStatus:'active',totalLessons:39,lessonStart:61,lessonEnd:99,scope:'Banking, postal and delivery services, traditional and night markets, supermarkets, shopping malls, food service, salons, florists, tailoring, hardware and electronics shopping, laundry, checkout, returns, and everyday customer interactions.',iconKey:'shop'},
    {id:4,title:'Health, Fitness & Well-Being',shortTitle:'Health & Well-Being',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Clinical care, pharmacy, dental and eye care, rehabilitation, fitness, wellness, and preventive care.',iconKey:'health'},
    {id:5,title:'Travel, Tourism & Transportation',shortTitle:'Travel & Transportation',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Airport procedures, public transport, road travel, hotels, sightseeing, accessibility, and tourism.',iconKey:'travel'},
    {id:6,title:'Nature, Wildlife & Outdoor Exploration',shortTitle:'Nature & Wildlife',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Ecosystems, wildlife, marine life, landscapes, hiking, camping, and outdoor exploration.',iconKey:'nature'},
    {id:7,title:'Weather, Seasons, Climate & Natural Hazards',shortTitle:'Weather & Climate',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Everyday weather, seasons, storms, climate conditions, and natural hazards.',iconKey:'weather'},
    {id:8,title:'Science, Technology & Exploration',shortTitle:'Science & Technology',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Laboratory science, astronomy, technology, robotics, digital systems, field research, and exploration.',iconKey:'science'},
    {id:9,title:'Work, Careers, Industry & Skilled Trades',shortTitle:'Work & Skilled Trades',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Careers, office work, logistics, repair, manufacturing, agriculture, construction, and skilled workplace actions.',iconKey:'work'},
    {id:10,title:'Sports, Recreation, Arts & Entertainment',shortTitle:'Sports, Arts & Entertainment',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Sports, recreation, live performance, cinema, festivals, museums, galleries, and cultural visits.',iconKey:'arts'},
    {id:11,title:'Law, Crime & Public Safety',shortTitle:'Law & Public Safety',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Police services, investigation, courtroom procedure, firefighting, rescue, legal roles, and public safety.',iconKey:'safety'},
    {id:12,title:'Peace, Conflict & Humanitarian Life',shortTitle:'Peace & Humanitarian Life',phase:'core',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Peace, negotiation, conflict, displacement, humanitarian services, relief, recovery, and remembrance.',iconKey:'peace'},
    {id:13,title:'Communication, Media & Journalism',shortTitle:'Media & Journalism',phase:'expansion',appStatus:'catalog',totalLessons:25,lessonStart:382,lessonEnd:406,scope:'Broadcast, reporting, editorial workflow, radio, podcasts, press briefings, content creation, verification, accessibility, archives, and post-production.',iconKey:'media'},
    {id:14,title:'Business, Finance & Economics',shortTitle:'Business & Finance',phase:'expansion',appStatus:'catalog',totalLessons:25,lessonStart:407,lessonEnd:431,scope:'Business operations, finance, investment, entrepreneurship, accounting, insurance, contracts, trade, logistics, marketing, and market behavior.',iconKey:'business'},
    {id:15,title:'Government, Civic & Community Life',shortTitle:'Government & Community',phase:'expansion',appStatus:'catalog',totalLessons:25,lessonStart:432,lessonEnd:456,scope:'Government services, public participation, community programs, civic administration, public information, transit, and shared public spaces.',iconKey:'civic'},
    {id:16,title:'Architecture, Urban Life & Infrastructure',shortTitle:'Architecture & Infrastructure',phase:'expansion',appStatus:'catalog',totalLessons:25,lessonStart:457,lessonEnd:481,scope:'Urban form, architecture, public space, mobility networks, water systems, civic buildings, streetscapes, freight corridors, and infrastructure.',iconKey:'urban'},
    {id:17,title:'Environment, Sustainability & Energy',shortTitle:'Sustainability & Energy',phase:'expansion',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Human environmental impact, sustainability, waste, conservation, renewable energy, and environmental solutions.',iconKey:'eco'},
    {id:18,title:'History, Heritage & Archaeology',shortTitle:'History & Heritage',phase:'expansion',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Archaeology, historical sites, artifacts, archives, restoration, conservation, and heritage.',iconKey:'heritage'},
    {id:19,title:'Culture, Traditions & World Communities',shortTitle:'Culture & Traditions',phase:'expansion',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Traditions, cultural practices, ceremonies, clothing, crafts, community life, and world communities.',iconKey:'culture'},
    {id:20,title:'Agriculture, Food Production & Rural Systems',shortTitle:'Agriculture & Rural Systems',phase:'expansion',appStatus:'catalog',totalLessons:null,lessonStart:null,lessonEnd:null,scope:'Crop production, irrigation, livestock, greenhouse systems, machinery, processing, storage, supply chains, and rural production systems.',iconKey:'agriculture'}
  ];
  const byId=new Map(categories.map(c=>[c.id,Object.freeze({...c})]));
  const clone=v=>JSON.parse(JSON.stringify(v));
  root.ENGBOOK_COURSE_CATALOG=Object.freeze({
    schemaVersion:1,
    courseId:'engbook-visual-conversation',
    title:'EngBook Visual Conversation',
    mappedCategoryCount:20,
    activeCategoryId:1,
    categories:Object.freeze(categories.map(c=>Object.freeze({...c}))),
    getCategory(id){const c=byId.get(Number(id));return c?clone(c):null;},
    listCategories(){return categories.map(clone);}
  });
})(typeof window!=='undefined'?window:globalThis);
