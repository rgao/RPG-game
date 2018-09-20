$(document).ready(function() {

    $(".secretBtn").hide();

    var squirrels = {       
        "fox": {
            role: "none",
            health: 180,
            attack: 5,
            ctrattack: 55,
        },

        "gray": {
            role: "none",
            health: 150,
            attack: 4,
            ctrattack: 5,
        },

        "red": {
            role: "none",
            health: 120,
            attack: 3,
            ctrattack: 5,
        },

        "chipmunk": {
            role: "none",
            health: 100,
            attack: 3,
            ctrattack: 25,
        },
    };

    // var clone = Object.create(squirrels);

    // no player chosen, no opponent chosen, and no victims yet
    var player = false;  
    var opponent = false;
    var victims = [];

    $(".character").on("click", function() {

        // generic annoucement message whenever there's an opponent
        if (opponent !== false) {
            $(".announcement").text("Triump over the enemy rodent incursion to claim your stash of nuts!");
        }
        // retrieve id of clicked squirrel
        var this_rodent_name = $(this).attr("id")
        var this_rodent = squirrels[this_rodent_name];

        // if clicked squirrel is on standby and no squirrel is an opponent, move squirrel to opponent
        if (this_rodent.role === "standby" && opponent === false && player.health > 0) {
            this_rodent.role = "opponent";
            opponent = this_rodent;
            $(".main-event").append(this);
            $(this).addClass("opponent");
            $("#attackBtn").show();
            $(".announcement").text("Triump over the enemy rodent incursion to claim your stash of nuts!");       
            
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
            base_atk = player.attack;

            // changing others to standby and moving them to the standby area
            $(".character").each(function() {
                var rodent = $(this).attr("id");
                $("p", this).text("Health: " + squirrels[rodent].health);
                if (rodent !== this_rodent_name) {
                    squirrels[rodent].role = "standby";
                    $(".standby").append(this);
                };
            });
            $(".announcement").text("Who should be your first victim?");
        };
    });


    $("#attackBtn").on("click", function() {
        
        // $(".announcement").text("Triump over the enemy rodent incursion to claim your stash of nuts!");

        // the rodents battle and apply math to health/attack
        if (player.health > 0) {
            opponent.health -= player.attack;
            player.health -= opponent.ctrattack; 
            player.attack += base_atk;
            console.log(player)
            console.log(opponent)  

            // losing
            if (player.health <= 0) {
                $("p", ".player").text("Health: 0");
                $("#resetBtn").show();
                $("#attackBtn").hide();

                // for when both the player and opponent dies at the same time or when just the player dies
                if (opponent.health <= 0) {
                    $("p", ".opponent").text("Health: 0");
                    $(".announcement").text("DOUBLE KNOCKOUT! No one gets the stash!");
                    opponent = false;
                    $(".opponent").removeClass("opponent");
                } else {
                    $("p", ".opponent").text("Health: " + opponent.health);
                    $(".announcement").text("Oh no! The enemy has claimed the Nut Stash!");
                    opponent = false;
                    $(".opponent").removeClass("opponent");
                }
            
            // events when opponent defeated
            } else if (opponent.health <= 0) {
                $("p", ".player").text("Health: " + player.health);
                $("p", ".opponent").text("Health: 0");
                $(".victims").append($(".opponent"));
                victims.push(1);
                $("#attackBtn").hide();
                opponent = false;
                $(".opponent").removeClass("opponent");

                // victory announcements
                if (victims.length === 3) {
                    $(".announcement").text("Congratulations, You Win! The Nut Stash is Yours!");
                    $("#resetBtn").show();
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
                health: 180,
                attack: 5,
                ctrattack: 55,
            },
    
            "gray": {
                role: "none",
                health: 150,
                attack: 4,
                ctrattack: 5,
            },
    
            "red": {
                role: "none",
                health: 120,
                attack: 3,
                ctrattack: 5,
            },
    
            "chipmunk": {
                role: "none",
                health: 100,
                attack: 3,
                ctrattack: 5,
            },
        };
       
        // console.log(squirrels)
        player = false;
        victims = [];
        this_rodent_name = null;
        this_rodent = null;
        rodent = null;
        $("#resetBtn").hide();
        $(".character").each(function() {
            $(this).removeClass("player opponent");
            $(".main-event").prepend(this);
            $("p", this).empty();
        });
        $(".main-event").append($("#fox"));
        $(".main-event").append($("#gray"));
        $(".main-event").append($("#red"));
        $(".main-event").append($("#chipmunk"));
        $(".main-event").append($("#attackBtn"));
        $(".announcement").text("Select a Squirrel to Begin!");
    })
})