# NodeJs Graceful Shutdown

The best practices to prevent unexpected application crashes, that maintains an open database connection and others unwanted events.

**The Code**
- [Find main file here](https://github.com/Ricardo-Costa/nodejs-graceful-shutdown/blob/8e9b0bda6d734abebc9307734209164bb9791162/src/index.js)

**Test Function**
- Start Application
  - `npm run start`
  - Or in Debug mode: `npm run start:debug`
- Press the keys ( Events should be launched )
  - `ctrl` + `c`
- Force crash by request ( Events should be launched )
  - `npm run crash`