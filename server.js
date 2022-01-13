const FastBootAppServer = require("fastboot-app-server");

const MY_GLOBAL = "MY GLOBAL";

let server = new FastBootAppServer({
  distPath: "ember-app/dist",
  gzip: true, // Optional - Enables gzip compression.
  host: "0.0.0.0", // Optional - Sets the host the server listens on.
  port: 4000, // Optional - Sets the port the server listens on (defaults to the PORT env var or 3000).
  workerCount: 1,

  beforeMiddleware(app) {
    app.use((req, res, next) => {
      // Setting TEST header to check if it will be duplicated in the response
      res.set("X-Request-Id", "TEST");

      next();
    });
  },
  buildSandboxGlobals(defaultGlobals) {
    // Optional - Make values available to the Ember app running in the FastBoot server, e.g. "MY_GLOBAL" will be available as "GLOBAL_VALUE"
    return Object.assign({}, defaultGlobals, { GLOBAL_VALUE: MY_GLOBAL });
  },
  chunkedResponse: true, // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
