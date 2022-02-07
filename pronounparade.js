const TWITCHUSER = "{{username}}"
const OAUTH_USER = "{{ouath}}"

const pronouns = ['He',
'Him',
'She',
'Her',
'Ae',
'Aer',
'Any',
'E',
'Em',
'Fae',
'Faer',
'It',
'Its',
'Other',
'Xe',
'Xem',
'Zie',
'Zim',
'Hir',
'Ve',
'Ver',
'Per',
'They',
'Them']

let pronouns_users = [];
let parade_flag = false;

String.prototype.convertToRGB = function() {
    if(this.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

function getRandID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createCanvasHTMLTag(canvasID) {
  return '<canvas class="canvas_style" id="' + canvasID + '" width="1920px" height="1080px"></canvas>';
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawPronoun(username, message, color="000000") {
  const canvasID = getRandID();
  $('#canvas_folder').append(createCanvasHTMLTag(canvasID));
  
  let colorRGB = color.convertToRGB();
  if ("{{colorDropdown}}" === "optionB") {
    const tempFontColor = "{{fontColor}}".replace('#', '');
    colorRGB = tempFontColor.convertToRGB();
  } else {
    colorRGB = color.convertToRGB();
  }
  let colorRGBString = "rgba(" + colorRGB[0] + "," + colorRGB[1] + "," + colorRGB[2] + ",";
  
  // Initial Positions
  let xPos = randomIntFromInterval(parseInt("{{xMin}}"),parseInt("{{xMax}}")); 
  let yPos = randomIntFromInterval(parseInt("{{yMin}}"),parseInt("{{yMax}}")); 
  let alpha_1 = 0.0;
  let alpha_2 = 1.0;
  
  if ((pronouns.some(v => message.toLowerCase().split(/\/| /).includes(v.toLowerCase()))) && (message.length<10 )) {
  // if a pronoun is detected
    if (!pronouns_users.some(v => username.toLowerCase().includes(v.toLowerCase()))) {
    // if user has not added their pronoun to the parade yet
      pronouns_users.push(username);
      
      function update() {
        let context_name = $('#' + canvasID)[0].getContext("2d");
        context_name.clearRect(0, 0, 1920, 1080);
        
        const alpha_change = parseFloat("{{nameFade}}");

        if (alpha_1 < 1) {
          context_name.fillStyle = colorRGBString + alpha_1 + ")";
          alpha_1 = alpha_1 + alpha_change;
        } else {
          context_name.fillStyle = colorRGBString + alpha_2 + ")";
          alpha_2 = alpha_2 - alpha_change;
        }

        context_name.font = "{{fontWeight}} {{fontSize}}pt {{fontName}}";
        context_name.shadowColor="{{shadowColor}}";
		context_name.shadowBlur="{{shadowBlur}}";
        context_name.fillText(message, xPos, yPos);

        yPos = yPos - "{{nameSpeed}}";    

        if (alpha_2 > 0) {
          requestAnimationFrame(update);
        } else {
          $('#' + canvasID).remove();
        }
      }
      update();
    }
  }
}


ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
  if( flags.broadcaster && command === "paradeon" ) {
    parade_flag = true;
  }
  if( flags.broadcaster && command === "paradeoff" ) {
    parade_flag = false;
  }
}

ComfyJS.onChat = (user, message, flags, self, extra ) => {
  if (parade_flag === true) {
      drawPronoun(user, message, extra.userColor.substring(1)); 
    }
}

ComfyJS.onReward = ( user, reward, cost, extra ) => {
  if ( reward.toLowerCase() === "{{redemptionName}}".toLowerCase()) {
    parade_flag = true;
    setTimeout( () => {
      parade_flag = false;
      pronouns_users = [];
    }, "{{paradeTime}}");
  }
}

ComfyJS.Init(TWITCHUSER, OAUTH_USER);
