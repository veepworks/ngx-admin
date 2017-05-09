var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){if(f.get||f.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var c=0;return $jscomp.iteratorPrototype(function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(a,c){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var f=0,d={next:function(){if(f<a.length){var g=f++;return{value:c(g,a[g]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,c,f,d){if(c){f=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var g=a[d];g in f||(f[g]={});f=f[g]}a=a[a.length-1];d=f[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var c=a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function c(){this.batch_=null}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;c.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};c.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var f=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(a){f(a,0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var d=a[b];delete a[b];try{d()}catch(e){this.asyncThrow_(e)}}}this.batch_=null};c.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var d=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}};d.prototype.createResolveAndReject_=function(){function a(a){return function(e){d||(d=!0,a.call(b,e))}}var b=this,d=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};d.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.settleSameAsPromise_(a);else{var b;a:switch(typeof a){case "object":b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};d.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(k){this.reject_(k);return}"function"==
typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};d.prototype.reject_=function(a){this.settle_(2,a)};d.prototype.fulfill_=function(a){this.settle_(1,a)};d.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.onSettledCallbacks_=null}};var g=new c;d.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};d.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(e){d.reject(e)}};d.prototype.then=function(a,b){function k(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(l){h(l)}}:b}var e,h,c=new d(function(a,b){e=a;h=b});this.callWhenSettled_(k(a,e),
k(b,h));return c};d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.callWhenSettled_=function(a,b){function d(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?g.asyncExecute(d):this.onSettledCallbacks_.push(function(){g.asyncExecute(d)})};d.resolve=function(a){return a instanceof d?a:new d(function(b,d){b(a)})};d.reject=function(a){return new d(function(b,d){d(a)})};
d.race=function(a){return new d(function(b,k){for(var e=$jscomp.makeIterator(a),c=e.next();!c.done;c=e.next())d.resolve(c.value).callWhenSettled_(b,k)})};d.all=function(a){var b=$jscomp.makeIterator(a),c=b.next();return c.done?d.resolve([]):new d(function(a,k){function e(b){return function(d){h[b]=d;f--;0==f&&a(h)}}var h=[],f=0;do h.push(void 0),f++,d.resolve(c.value).callWhenSettled_(e(h.length-1),k),c=b.next();while(!c.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(d.$jscomp$new$AsyncExecutor=function(){return new c});
return d},"es6-impl","es3");var reckonPointApi=reckonPointApi||{};reckonPointApi.core=reckonPointApi.core||{};reckonPointApi.core.apiGatewayClientFactory={};
reckonPointApi.core.apiGatewayClientFactory.newClient=function(a,c){var f={},d=apiGateway.core.sigV4ClientFactory.newClient(c),g=apiGateway.core.simpleHttpClientFactory.newClient(a);f.makeRequest=function(a,b,c,e){void 0!==e&&""!==e&&null!==e&&(a.headers["x-api-key"]=e);if(void 0===a.body||""===a.body||null===a.body||0===Object.keys(a.body).length)a.body=void 0;a.headers=apiGateway.core.utils.mergeInto(a.headers,c.headers);a.queryParams=apiGateway.core.utils.mergeInto(a.queryParams,c.queryParams);
return"AWS_IAM"===b?Promise.resolve().then(function(){if(AWS.config.credentials&&AWS.config.credentials.getPromise)return AWS.config.credentials.getPromise()}).then(function(){d.accessKey=AWS.config.credentials.accessKeyId;d.secretKey=AWS.config.credentials.secretAccessKey;d.sessionToken=AWS.config.credentials.sessionToken;return d.makeRequest(a)}):g.makeRequest(a)};return f};reckonPointApi=reckonPointApi||{};reckonPointApi.cognito=reckonPointApi.cognito||{};
reckonPointApi.cognito.setCognitoIdentity=setCognitoIdentity;reckonPointApi.cognito.addProvider=addProvider;
function setCognitoIdentity(a,c){if(AWS&&AWS.config)return AWS.config.credentials=new AWS.CognitoIdentityCredentials({IdentityPoolId:a}),(new Promise(function(a,d){if(reckonPointApi.cognito.userPool){var c=reckonPointApi.cognito.userPool.getCurrentUser();c&&null!==c?c.getSession(function(c,b){c?d(c):a(b)}):d(Error("no cognito user"))}else d(Error("no user pool"))})).then(function(a){var d="cognito-idp."+AWS.config.region+".amazonaws.com/"+reckonPointApi.cognito.userPool.getUserPoolId();addProvider(d,
a.getIdToken().getJwtToken())}).catch(function(a){return AWS.config.credentials.getPromise()}).catch(function(f){console.log(JSON.stringify(f,null,2));f.code&&"ResourceNotFoundException"===f.code&&(AWS.config.credentials.clearCachedId(),c||setCognitoIdentity(a,!0))})}
function addProvider(a,c){return AWS&&AWS.config&&AWS.config.credentials?(AWS.config.credentials.params.Logins||(AWS.config.credentials.params.Logins={}),AWS.config.credentials.params.Logins[a]=c,AWS.config.credentials.getPromise().then(function(){return AWS.config.credentials.refreshPromise()})):Promise.resolve()}
function putLastAccess(){AWS.CognitoSyncManager&&AWS.config.credentials.getPromise().then(function(){(new AWS.CognitoSyncManager).openOrCreateDataset("audit",function(a,c){c.put("LastAccessDate",(new Date).toString(),function(){});c.put("LastAccessDevice",navigator.userAgent,function(){})})})}function sync(a){}reckonPointApi=reckonPointApi||{};reckonPointApi.cognito=reckonPointApi.cognito||{};
reckonPointApi.cognito.setUserPool=function(a,c){reckonPointApi.cognito.userPool=new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({UserPoolId:a,ClientId:c,Paranoia:8})};reckonPointApi.cognito.setCognitoUser=function(a,c){reckonPointApi.cognito.cognitoUser=new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({Username:a,Pool:c||reckonPointApi.cognito.userPool})};
reckonPointApi.cognito.getCognitoUser=function(){var a=reckonPointApi.cognito.userPool.getCurrentUser();return null!==a?a:reckonPointApi.cognito.cognitoUser?reckonPointApi.cognito.cognitoUser:null};reckonPointApi.cognito.signOut=function(){var a=reckonPointApi.cognito.getCognitoUser();a&&null!==a&&a.signOut()};
reckonPointApi.cognito.authenticate=function(a,c){return new Promise(function(f,d){if(a&&null!==a&&""!==a)if(c&&null!==c&&""!==c){reckonPointApi.cognito.setCognitoUser(a);var g=new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({Username:a,Password:c});reckonPointApi.cognito.cognitoUser.authenticateUser(g,{onSuccess:function(a){var b="cognito-idp."+AWS.config.region+".amazonaws.com/"+reckonPointApi.cognito.userPool.getUserPoolId();reckonPointApi.cognito.addProvider(b,a.getIdToken().getJwtToken()).then(function(){f({success:!0})}).catch(function(a){d(a)})},
onFailure:function(a){d(a)},mfaRequired:function(a){f({mfaRequired:!0});console.log(a)},newPasswordRequired:function(a,b){f({newPasswordRequired:!0})},customChallenge:function(){f({customChallenge:!0})}})}else d(Error("password not provided"));else d(Error("username not provided"))})};reckonPointApi=reckonPointApi||{};
reckonPointApi.newClient=function(a){void 0===a&&(a={url:"https://5a9cbij13g.execute-api.us-east-1.amazonaws.com/dev",identityPoolId:void 0,userPoolId:void 0,userPoolClientId:void 0,accessKey:void 0,secretKey:void 0,sessionToken:void 0,region:void 0,apiKey:void 0,authType:"AWS_IAM",defaultContentType:"application/json",defaultAcceptType:"application/json"});void 0===a.accessKey&&(a.accessKey="");void 0===a.secretKey&&(a.secretKey="");void 0===a.apiKey&&(a.apiKey="XAN1kwqgCP1j8RQHkDnkH5HFsRKAlz2m37v8cmbZ");
void 0===a.sessionToken&&(a.sessionToken="");void 0===a.region&&(a.region="us-east-1");void 0===a.defaultContentType&&(a.defaultContentType="application/json");void 0===a.defaultAcceptType&&(a.defaultAcceptType="application/json");void 0===a.url&&(a.url="https://5a9cbij13g.execute-api.us-east-1.amazonaws.com/dev");void 0===a.identityPoolId&&(a.identityPoolId="us-east-1:91b1408f-cb8d-4b6f-af3a-b973f8cb798b");void 0===a.userPoolId&&(a.userPoolId="us-east-1_lFZCBxtMS");void 0===a.userPoolClientId&&(a.userPoolClientId=
"6nun8mptq8ln94cffos76em03m");AWS&&AWS.config&&(AWS.config.region=a.region);reckonPointApi.cognito.setUserPool(a.userPoolId,a.userPoolClientId);reckonPointApi.cognito.setCognitoIdentity(a.identityPoolId);var c=a.url,f=/(^https?:\/\/[^\/]+)/g.exec(c)[1],d=c.substring(f.length),g=a.authType||"AWS_IAM",h=reckonPointApi.core.apiGatewayClientFactory.newClient({endpoint:f,defaultContentType:a.defaultContentType,defaultAcceptType:a.defaultAcceptType},{accessKey:a.accessKey,secretKey:a.secretKey,sessionToken:a.sessionToken,
serviceName:"execute-api",region:a.region,endpoint:f,defaultContentType:a.defaultContentType,defaultAcceptType:a.defaultAcceptType});return{anonymousGet:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"GET",path:d+uritemplate("/anonymous").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,
g,e,a.apiKey)},anonymousOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/anonymous").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},authenticatedGet:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,
[],["body"]);b={verb:"GET",path:d+uritemplate("/authenticated").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},authenticatedOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/authenticated").expand(apiGateway.core.utils.parseParametersToObject(b,
[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},authenticatedIdGet:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["id"],["body"]);b={verb:"GET",path:d+uritemplate("/authenticated/{id}").expand(apiGateway.core.utils.parseParametersToObject(b,["id"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,
[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},authenticatedIdOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["id"],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/authenticated/{id}").expand(apiGateway.core.utils.parseParametersToObject(b,["id"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesGet:function(b,c,e){void 0===
e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"GET",path:d+uritemplate("/devices").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesPost:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"POST",path:d+uritemplate("/devices").expand(apiGateway.core.utils.parseParametersToObject(b,
[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/devices").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,
[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdGet:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],["body"]);b={verb:"GET",path:d+uritemplate("/devices/{deviceId}").expand(apiGateway.core.utils.parseParametersToObject(b,["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdPut:function(b,
c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],["body"]);b={verb:"PUT",path:d+uritemplate("/devices/{deviceId}").expand(apiGateway.core.utils.parseParametersToObject(b,["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdDelete:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],
["body"]);b={verb:"DELETE",path:d+uritemplate("/devices/{deviceId}").expand(apiGateway.core.utils.parseParametersToObject(b,["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/devices/{deviceId}").expand(apiGateway.core.utils.parseParametersToObject(b,
["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdSensordataPost:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],["body"]);b={verb:"POST",path:d+uritemplate("/devices/{deviceId}/sensordata").expand(apiGateway.core.utils.parseParametersToObject(b,["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,
[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},devicesDeviceIdSensordataOptions:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,["deviceId"],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/devices/{deviceId}/sensordata").expand(apiGateway.core.utils.parseParametersToObject(b,["deviceId"])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,
[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},unauthenticatedGet:function(b,c,e){void 0===e&&(e={});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"GET",path:d+uritemplate("/unauthenticated").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)},unauthenticatedOptions:function(b,c,e){void 0===e&&(e=
{});apiGateway.core.utils.assertParametersDefined(b,[],["body"]);b={verb:"OPTIONS",path:d+uritemplate("/unauthenticated").expand(apiGateway.core.utils.parseParametersToObject(b,[])),headers:apiGateway.core.utils.parseParametersToObject(b,[]),queryParams:apiGateway.core.utils.parseParametersToObject(b,[]),body:c};return h.makeRequest(b,g,e,a.apiKey)}}};reckonPointApi=reckonPointApi||{};reckonPointApi.utils=reckonPointApi.utils||{};
reckonPointApi.utils.loadjsfile=function(a){return new Promise(function(c,f){var d=document.createElement("script");d.setAttribute("type","text/javascript");d.setAttribute("src",a);document.getElementsByTagName("head")[0].appendChild(d);d.onreadystatechange=function(){"loaded"!=d.readyState&&"complete"!=d.readyState||c()}})};