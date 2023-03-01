var host = 'localhost';

// Documents
const title = document.querySelector('#title');
const sendBtn = document.querySelector('#sendBtn');
const message = document.querySelector('#chatInput')
const newConversation = document.querySelector('#newConversation');  // To input callee number
const newParticipant = document.querySelector('#refer');  // To input callee number

const chatPanel = document.querySelector('#chatPanel');

// To-Do: uname and uid need to get from the index.html for security
var uname = 'john'; // set userID if exists 
var uid = '1234'

var callee = -1;  // current conversation partner

HashMap = function() {
    this.map = new Array();
};

HashMap.prototype = {
    put: function(key, value) {
        this.map[key] = value;
    },
    get: function(key) {
        return this.map[key];
    },
    getAll: function() {
        return this.map;
    },
    clear: function() {
        return this.map;
    },
    isEmpty: function() {
        return (this.map.size()==0);
    },
    remove: function(key) {
        delete this.map[key];
    },
    getKeys: function() {
        var keys = new Array();
        for(i in this.map) {
            keys.push(i);
        }
        return keys;
    }
};

// call log list
var maxListItems = 20;
var list = [];  
for (i=0;i<maxListItems;i++) {
    list.push(document.getElementById('callLog'+i));
}
var index = 0;    // # of call log lists

// message log list
var msglist = [];
var msglistparam = [];
var maxMsgItems = 50;
var msgIDX = new HashMap();

// eventbase: To-Do: it will replated to indexed eventbase
var msgHistory = new HashMap();


for (i=0;i<maxMsgItems;i++) {
    msglist.push(document.getElementById('msgLog'+i));

    // add listener        
    (function(index) {
        msglist[index].addEventListener("click", function() {
            console.log('click! index: '+index);

            console.log("index=",index+' readcount:', callLog[i].readCount + ' body:', callLog[i].msg.Body+ ' status:',callLog[i].status);
        })
    })(i);
}

members = loadProfiles();
memberSize = 0;

assignNewCallLog(callee);  // make a call log for callee



// initialize 
setConveration(callee);
updateChatWindow(callee);


function StartNewChat(participantList) {
    console.log('The earn participant list; '+participantList);

    callee = 'john';

    if(!msgHistory.get(callee)) {
        assignNewCallLog(callee);
    }
    
    setConveration(callee);
    updateChatWindow(callee);
}



// Listeners
message.addEventListener('keyup', function(e){
    if (e.keyCode == 13) {
        onSend(e);
    }
});

refreshChatWindow.addEventListener('click', function(){
    console.log('update chat window');
    updateChatWindow(callee);
});

sendBtn.addEventListener('click', onSend);

function onSend(e) {
    e.preventDefault();

    if(message.value != '') {
        var date = new Date();
        var timestamp = Math.floor(date.getTime()/1000);

        var From, Originaterd;
        
        From = uid;
        Originaterd = '';
            
        const chatmsg = {
            EvtType: "message",
            From: From,
            Originated: Originaterd,
            To: callee,
            MsgID: uuidv4(),
            Timestamp: timestamp,
            Body: message.value
        };

        const msgJSON = JSON.stringify(chatmsg);
    //    console.log(msgJSON);
    

        console.log('<-- sent: '+log.msg.MsgID+' To:'+log.msg.To + ' listIDX:', callLog.length-1+' ' + log.msg.Body);
        
        msgIDX.put(chatmsg.MsgID, callLog.length - 1)
               
        updateChatWindow(callee);
    }
    
    message.value = "";
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


(function() {
    window.addEventListener("focus", function() {
//        console.log("Back to front");

        if(msgHistory.get(callee))
            updateCallLogToDisplayed();
    })
})();



function addSentMessage(index,timestr,text,status) {
//    console.log("sent message:"+text+' status='+status + ' readcount=',readCount);

    msglist[index].innerHTML = 
        `<div class="chat-sender chat-sender--right"><h1>${timestr}</h1>${text}&nbsp;<h2 id="status${index}"></h2></div>`;   
       // To-Do In orter to manager that all characters are blank, inserted a blank but I will fix it later.
       
    msglistparam[index] = document.getElementById('status'+index);
    
    if(status==0) {
        msglistparam[index].textContent = '\u00A0';
    } 
    else if(status==1 || status==2) {
       if(readCount == 0)
            msglistparam[index].textContent = '\u00A0'; 
        else
            msglistparam[index].textContent = readCount; 
    }
}

function addReceivedMessage(index, sender, timestr, msg) {
//    console.log("add received message: "+msg);

    msglist[index].innerHTML =  
    `<div class="chat-receiver chat-receiver--left"><h1>${sender}</h1><h2>${timestr}</h2>${msg}&nbsp;</div>`;     

//    console.log(msglist[index].innerHTML);   
}

function addNotifyMessage(index, msg) {
    msglist[index].innerHTML =  
        `<div class="notification-text">${msg}</div>`;     
}
    
function updateChatWindow(from) {
    // clear chat window
    for (i=0;i<maxMsgItems;i++) {
        msglist[i].innerHTML = '';
    }

    callee = from;

    // load callLog
    callLog = msgHistory.get(from);

    // shows maxMsgItems messages based on arrived order    
    if(callLog.length < maxMsgItems) start = 0;
    else start = callLog.length - maxMsgItems;

    for(i=start;i<callLog.length;i++) {
    //    console.log("i: ",i + " start: ",start + ' i-start:' + (i-start));

        var date = new Date(callLog[i].msg.Timestamp * 1000);            
        var timestr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        if(callLog[i].logType == 1) { // send
        //    console.log('i= ',i,' Text: ',callLog[i].msg.Body,' readcount: ',callLog[i].readCount)
            addSentMessage(i-start,timestr,callLog[i].msg.Body,callLog[i].status,callLog[i].readCount);
        }
        else if(callLog[i].logType == 0)  {  // receive
            if(callLog[i].msg.From[0] == 'g')
                addReceivedMessage(i-start,members.get(callLog[i].msg.Originated),timestr,callLog[i].msg.Body);  
            else
                addReceivedMessage(i-start,members.get(callLog[i].msg.From),timestr,callLog[i].msg.Body);
        }
        else if(callLog[i].logType == 2) {  // notify
            addNotifyMessage(i-start, callLog[i].msg);
        }
    }

    chatPanel.scrollTop = chatPanel.scrollHeight;  // scroll needs to move bottom
}

