require.config({
   baseUrl: "./",
   paths: {
      "q": "../node_modules/Q/q",
      "app": "../out/app"
   },
   shim: {
      "q": {
         exports: "Q"
      },
      "app": {
         exports: "app",
         deps: ["q"]
      }
   }
});

require(["app"], function ($app: any) {

   //$app.test();

});
/*
require(["q"], function ($Q: any) {

   //window.Q = $Q;

   require(["app"], function ($app: any) {

      $app.test();

   });
});*/