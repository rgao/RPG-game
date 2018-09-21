$(document).ready(function() {

    document.getElementById("audio").play();

    $(".secretBtn").hide();
    $(".s-container").hide();
    $(".v-container").hide();

    var squirrels = {       
        "fox": {
            role: "none",
            health: 120,
            attack: 5,
            ctrattack: 10,
        },

        "gray": {
            role: "none",
            health: 100,
            attack: 4,
            ctrattack: 12,
        },

        "red": {
            role: "none",
            health: 90,
            attack: 3,
            ctrattack: 6,
        },

        "chipmunk": {
            role: "none",
            health: 75,
            attack: 4,
            ctrattack: 8,
        },
    };

    // no player chosen, no opponent chosen, and no victims yet
    var player = false;  
    var opponent = false;
    var victims = [];

    $(".character").on("click", function() {
        // generic annoucement message whenever there's an opponent
        if (opponent !== false) {
            $(".announcement").text("Triumph over the enemy rodent incursion to claim your stash of nuts!");
        }
        // retrieve id of clicked squirrel
        var this_rodent_name = $(this).attr("id")
        var this_rodent = squirrels[this_rodent_name];

        // if clicked squirrel is on standby and no squirrel is an opponent, move squirrel to opponent
        if (this_rodent.role === "standby" && opponent === false && player.health > 0) {
            this_rodent.role = "opponent";
            opponent = this_rodent;
            $(".main-event").append(this);
            $(this).addClass("col opponent");
            $("img", this).css("border", "4px solid orangered");
            $(".a-container").show();
            $(".announcement").text("Triumph over the enemy rodent incursion to claim your stash of nuts!");       
            
        // prevent having more than 1 opponent at once
        } else if (this_rodent.role === "standby" && opponent !== false && player.health > 0) {
            $(".announcement").text("Your opponent is in front of you! The other victims can wait.");

        // first click: choose character
        } else if (player === false) {
            // setting the player and its values
            this_rodent.role = "player";
            this_rodent.health = 100;
            this_rodent.attack = 5;
            player = this_rodent;
            $(this).addClass("player");
            $("img", this).css("border", "4px solid green");
            base_atk = player.attack;

            // changing others to standby and moving them to the standby area
            $(".s-container").show();
            $(".character").each(function() {
                var rodent = $(this).attr("id");
                $("p", this).text("Health: " + squirrels[rodent].health);
                if (rodent !== this_rodent_name) {
                    $(this).removeClass("col");
                    squirrels[rodent].role = "standby";
                    $(".standby").append(this);
                };
            });
            $(".announcement").text("Who should be your first victim?");
        };
    });


    $("#attackBtn").on("click", function() {

        document.getElementById("atk-audio").play();
        
        // the rodents battle and apply math to health/attack
        if (player.health > 0) {
            opponent.health -= player.attack;
            player.health -= opponent.ctrattack; 
            player.attack += base_atk;
            console.log(player)
            console.log(opponent)  

            // losing
            if (player.health <= 0) {
                document.getElementById("dying-audio").play();
                $("p", ".player").text("Health: 0");
                $(".r-container").show();
                $(".v-container").show();
                $(".a-container").hide();

                // for when both the player and opponent dies at the same time or when just the player dies
                if (opponent.health <= 0) {
                    $("p", ".opponent").text("Health: 0");
                    $(".announcement").text("DOUBLE KNOCKOUT! No one gets the stash!");
                    opponent = false;
                    document.getElementById("elephant").play();

                } else {
                    $("p", ".opponent").text("Health: " + opponent.health);
                    $(".announcement").text("Oh no! The enemy has claimed the Nut Stash!");
                    opponent = false;
                    $(".opponent").removeClass("opponent");
                    $(".player").removeClass("col");
                    $(".victims").append($(".player"));
                    document.getElementById("elephant").play();
                };
            
            // events when opponent defeated
            } else if (opponent.health <= 0) {
                document.getElementById("dying-audio").play();
                $(".v-container").show();
                $("p", ".player").text("Health: " + player.health);
                $("p", ".opponent").text("Health: 0");
                $(".victims").append($(".opponent"));
                victims.push(1);
                $(".a-container").hide();
                opponent = false;
                $(".opponent").removeClass("col opponent");

                // victory announcements
                if (victims.length === 3) {
                    document.getElementById("winning").play();
                    $(".announcement").text("Congratulations, You Win! The Nut Stash is Yours!");
                    $(".r-container").show();
                } else {
                    $(".announcement").text("Good job! Now select your next victim.");
                };
            } else {
                $("p", ".player").text("Health: " + player.health);
                $("p", ".opponent").text("Health: " + opponent.health);
            };
        };
    });

    $("#resetBtn").on("click", function() {

        squirrels = {       
            "fox": {
                role: "none",
                health: 120,
                attack: 7,
                ctrattack: 10,
            },
    
            "gray": {
                role: "none",
                health: 100,
                attack: 7,
                ctrattack: 12,
            },
    
            "red": {
                role: "none",
                health: 90,
                attack: 5,
                ctrattack: 6,
            },
    
            "chipmunk": {
                role: "none",
                health: 75,
                attack: 6,
                ctrattack: 8,
            },
        };
       
        player = false;
        victims = [];
        this_rodent_name = null;
        this_rodent = null;
        rodent = null;
        $(".r-container").hide();
        $(".s-container").hide();
        $(".v-container").hide();
        $(".character").each(function() {
            $(this).removeClass("player opponent");
            $(this).addClass("col");
            $("img", this).css("border", "4px solid gold");
            $(".main-event").prepend(this);
            $("p", this).empty();
        });
        $(".main-event").append($("#fox"));
        $(".main-event").append($("#gray"));
        $(".main-event").append($("#red"));
        $(".main-event").append($("#chipmunk"));
        $(".main-event").append($(".a-container"));
        $(".announcement").text("Select a Squirrel to Begin!");
    })
})