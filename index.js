$(function() {

	// Display a bit on the LED display
	function setBit(bit, on) {
		if (on) {
            
			$("#bit" + bit).css("background-color", "Red");	
		}
		else{$("#bit" + bit).css("background-color", "LimeGreen");}
	}

// Display a byte on the LED display
function displayChar0(ch) {
    // console.log("Key: " + String.fromCharCode(ch) + "[" + ch + "]");
    setBit(7, (ch | 1) > 0)
    setBit(6, (ch | 1) > 0)
}
function displayChar1(ch) {
    setBit(5, (ch | 1) > 0)
    setBit(4, (ch | 1) > 0)
}
function displayChar2(ch){
    setBit(3, (ch & 0) > 0)
    setBit(2, (ch & 0) > 0)
}
function displayChar3(ch){
    setBit(1, (ch & 0) > 0)
    setBit(0, (ch & 0) > 0)
}

	// Clears the display back to grey
	function clearDisplay() {
		$(".bitbtn").css("background-color", "LightGray");		
	}

	// Animate the string into the LED display
	$("#go").click(function() {

         //accessing html tag for strength text
         const text = document.querySelector('.text');
         $('.text').css("padding", "20px") //applying padding during execution

         //functions to displaying text color with equivalent password strength
         function textColorWeak(){
             $(".text").css("color", "Red");
             text.textContent = "Your password is WEAK😑, try to make it complex and lengthy";
         }
         function textColorMidium(){
             $(".text").css("color", "Orange");
             text.textContent = "Your pasword is MIDIUM🙄, try adding symbol characters and increase its lenght";
         }
         function textColorStrong(){
             $(".text").css("color", "LimeGreen");
             text.textContent = "Your password is strong👌, add more characters to make it the strongest";
         }
         function textColorStrongest(){
            $(".text").css("color", "Green");
            text.textContent = "Your have the strongest 💪 password";
        }
        //incase password does not match order of the regExp
        function textColor(){
            $(".text").css("color", "Indigo");
            text.textContent = "try adding, letters numbers and symbols characters"
        }

        
		var pos = 0;
		var password = $("#keyboard").val();// getting typed input

		clearDisplay();//calling function to turn LEDs grey if they are showing colors

		if (password.length == 0) return;
		var interval = setInterval(function() {
			var ch = password.charCodeAt(pos);
			if (pos++ >= password.length) {
				clearInterval(interval);
				clearDisplay();
			}else{

                try {
                    //password not empty
                    if(password !== " "){ 
                        //declairing password strenght regExp
                        let regexWeak = /([a-zA-Z]*)/;
                        let regexMid = /\d*/;
                        let regexStrong = /.[!,@,#,&,%,^,&,*,?,_,~,-,(,)]/;
                            
                        let strength;
                            //testing for a strong password
                            if(password.length < 5 && (password.match(regexWeak) || password.match(regexMid) || password.match(regexStrong))) strength = 1;
                            if(password.length >= 8 && ((password.match(regexWeak) && password.match(regexMid)) || password.match(regexMid) && (password.match(regexStrong)) || password.match(regexWeak) && password.match(regexStrong)))strength = 2
                            if(password.length >=10 && password.match(regexWeak) && password.match(regexMid) && password.match(regexStrong)) strength = 3;
                            if(password.length >10 && password.match(regexWeak) && password.match(regexMid) && password.match(regexStrong)) strength = 4;
                            
                                //define the LED display using strength binding, using a timout make it animated
                                switch(strength){
                                    case 1:
                                        console.log('weak password');
                                        displayChar0(ch);
                                        textColorWeak();
                                        break;
                                    case 2:
                                        console.log('medium password');
                                        displayChar0(ch);
                                        setTimeout(function(){
                                        displayChar1(ch);
                                        textColorMidium();
                                        },10)
                                        break;
                                    case 3:
                                        console.log('strong password');
                                        displayChar0(ch);
                                        setTimeout(function(){
                                            displayChar1(ch);
                                            },10)
                                        setTimeout(function(){
                                        displayChar2(ch);
                                        textColorStrong();
                                        }, 10)
                                        break;
                                    case 4:
                                        displayChar0(ch);
                                        console.log('strongest password');
                                        setTimeout(function(){
                                            displayChar1(ch);
                                            },10)
                                        setTimeout(function(){
                                                displayChar2(ch);
                                                },10)
                                        setTimeout(function(){
                                            displayChar3(ch);
                                        textColorStrongest();
                                        },10)
                                        break;
                                    default:
                                        console.log('default');
                                        textColor();

                                }
                        }
                } catch (error) {
                    console.error(`error occured ${error}`);
                }

            }
           			
		}, 100)
	
		return false;
	});

})