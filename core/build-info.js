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
    mappedCategories:[1,21],
    readyCategories:[1,21],
    readyLessons:[5,2,10003,10004,10010],
    runtimeReadyLessons:[5,2,10003,10004,10010],
    truthFirstReadyLessons:[2,5],
    adaptiveTaxonomyReadyLessons:[2,5],
    humanReadingReadyLessons:[2,5],
    levelAwareReadyLessons:[2,5],
    memoryLayerReadyLessons:[2,5],
    imaginationMemoryReadyLessons:[2,5],
    goldReferenceReadyLessons:[2,5],
    cardLevelGoldReadyLessons:[2,5],
    fullDnaReadyLessons:[2,5],
    imageAuditReadyLessons:[2,5],
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
