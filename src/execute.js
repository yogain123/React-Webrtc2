// replace these values with those generated in your TokBox Account
import OT from '@opentok/client';
var apiKey = "46365052";
var sessionId = "2_MX40NjM2NTA1Mn5-MTU2MzE4NTAzNTcxN35lQXYzUFFZZlcxSll5V0phQVVITFkzRGJ-fg";
var token = "5367ce015677ea5513fa3594cc935053477cfa99";

// (optional) add server code here
var SERVER_BASE_URL = 'https://webrtc-tokbox.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }