/* EngBook single source of build/runtime truth. */
(function(root){
  'use strict';
  root.ENGBOOK_BUILD_INFO=Object.freeze({
    version:'1.08',
    tag:'engapp-v1.08-dna-hardening-l07-card-gold',
    name:'EngApp DNA Hardening + Lesson 07 Card Gold',
    progressSchemaVersion:79,
    contentPackSchemaVersion:2,
    courseCatalogSchemaVersion:1,
    contentRevision:(root.ENGBOOK_CONTENT_REVISION||'engapp-v108-dna-hardening-l07-card-gold-final'),
    mappedCategories:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    readyCategories:[1,2],
    readyLessons:Array.from({length:60},(_,i)=>i+1),
    runtimeReadyLessons:Array.from({length:60},(_,i)=>i+1),
    truthFirstReadyLessons:Array.from({length:21},(_,i)=>i+1),
    adaptiveTaxonomyReadyLessons:Array.from({length:21},(_,i)=>i+1),
    humanReadingReadyLessons:Array.from({length:21},(_,i)=>i+1),
    levelAwareReadyLessons:Array.from({length:21},(_,i)=>i+1),
    memoryLayerReadyLessons:Array.from({length:21},(_,i)=>i+1),
    imaginationMemoryReadyLessons:Array.from({length:21},(_,i)=>i+1),
    goldReferenceReadyLessons:[1,2,3,4,5,6],
    cardLevelGoldReadyLessons:Array.from({length:21},(_,i)=>i+1),
    fullDnaReadyLessons:Array.from({length:21},(_,i)=>i+1),
    imageAuditReadyLessons:Array.from({length:21},(_,i)=>i+1),
    components:Object.freeze({app:'1.08',userPanel:'0.89',commercial:'1.3.2',admin:'1.03',api:'1.8.0',dbSchema:10,progressSchema:79,validator:'1.07',levelAwareLanguage:'1.03',memoryLayer:'1.03',imaginationMemory:'1.00',sceneIntelligence:'0.30'}),
    storage:Object.freeze({
      progressKey:'engapp_v79_progress',
      progressBackupKey:'engapp_v79_migration_backup',
      onboardKey:'engapp_v79_onboarded',
      commercialKey:'engbook_v82_commercial',
      purchaseKey:'engbook_v82_purchases',
      storeCatalogKey:'engbook_v82_store_catalog',
      adminFeatureKey:'engbook_v83_admin_feature_policy',
      privacyKey:'engbook_v87_privacy'
    })
  });
})(typeof window!=='undefined'?window:globalThis);
