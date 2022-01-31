const assert = require('assert');
const requestTime = require('../middlewares/request-time')

describe('requestTime middleware',  function () {
    // Tests go here
    it('Should add a `requestTime` property to the `req` object', function (){
        const req = {};
        // call function
        requestTime(req, null, () => {})
        // make assertion
        assert.ok(req.requestTime)
        
    })
  });