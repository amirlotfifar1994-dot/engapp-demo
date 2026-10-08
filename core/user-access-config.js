/* EngApp v0.89 User Access / Commerce server-authoritative defaults.
   Paid bytes are protected by the backend; checkout remains fail-closed until provider pricing is configured. */
(function(root){
  'use strict';
  root.ENGBOOK_USER_ACCESS_CONFIG=Object.freeze({
    // Temporary product decision: every published lesson is open while the
    // course is being reviewed. Turn this off before introducing accounts or
    // paid lesson packs in a production deployment.
    freeMode:true,
    enforceLessonAccess:true,
    showSubscriptions:false,
    showPermanentLessonStore:false,
    permanentCheckoutEndpoint:'/api/v2/commerce/checkout',
    permanentBillingEndpoint:'/api/v2/commerce/permanent',
    requireCurrentSessionEntitlements:false,
    offlinePaidAccessMode:'time-limited-verified',
    offlineLicenseDays:7,
    productCatalogEndpoint:'/api/v2/commerce/permanent',
    subscriptionCheckoutEndpoint:'',
    billingPortalEndpoint:''
  });
  root.ENGBOOK_COMMERCIAL_CONFIG=Object.freeze({
    authEndpoint:'',checkoutEndpoint:'',billingEndpoint:'',syncEndpoint:'',analyticsEndpoint:'',crashEndpoint:'',dataEndpoint:'',flagsEndpoint:'',
    productCatalogEndpoint:'/api/v2/commerce/permanent',adminProductCatalogEndpoint:'',featurePolicyEndpoint:'',adminFeatureEndpoint:'',adminUsersEndpoint:'',
    permanentCheckoutEndpoint:'/api/v2/commerce/checkout',permanentBillingEndpoint:'/api/v2/commerce/permanent',fetchCredentials:'same-origin',headers:Object.freeze({}),allowLocalPlanOverride:false,allowLocalAdminPreview:false
  });
})(typeof window!=='undefined'?window:globalThis);
