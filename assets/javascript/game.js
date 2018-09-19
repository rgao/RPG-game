$(document).ready(function() {

    var squirrels = {
        
        "fox": {
            role: "none",
            health: 180,
            attack: 5,
            ctrattack: 15,
        },

        "gray": {
            role: "none",
            health: 150,
            attack: 4,
            ctrattack: 17,
        },

        "red": {
            role: "none",
            health: 120,
            attack: 3,
            ctrattack: 12,
        },

        "chipmunk": {
            role: "none",
            health: 100,
            attack: 3,
            ctrattack: 20,
        },
    };

    var player = false;  
    var opponent = false;
    var victims = [];

    $(".character").on("click", function() {

        // retrieve id of clicked squirrel
        var this_rodent_name = $(this).attr("id")
        var this_rodent = squirrels[this_rodent_name];

        // if clicked squirrel is the opponent, they battle
        if (this_rodent.role === "opponent") {
            if (player.health > 0) {
                opponent.health -= player.attack;
                player.health -= opponent.ctrattack;
                player.attack += base_atk;

                if (player.health <= 0) {
                    $(".announcement").text("Oh no! The enemy has claimed the Nut Stash!");
                    // add play again button
                
                // events when opponent defeated
                } else if (opponent.health <= 0) {
                    opponent = false;
                    $(this).remove();
                    victims.push(this_rodent_name);

                    // victory announcements
                    if (victims.length === 3) {
                        $(".announcement").text("Congratulations, You Win! The Nut Stash is Yours!");
                        // add play again button
                    } else {
                        $(".announcement").text("Good job! Now select your next victim.");
                    };
                };
            };
            console.log(player);
            console.log(opponent);

        // if clicked squirrel is on standby and no squirrel is an opponent, move squirrel to opponent
        } else if (this_rodent.role === "standby" && opponent === false) {
            this_rodent.role = "opponent";
            opponent = this_rodent;
            $(".opponent").append(this);
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
            base_atk = player.attack;

            // changing others to standby and moving them to the standby area
            $(".character").each(function() {
                var other_rodents = $(this).attr("id");
                if (other_rodents !== this_rodent_name) {
                    squirrels[other_rodents].role = "standby";
                    $(".standby").append(this);
                };
            });
            $(".announcement").text("Select another squirrel as your opponent!");
        };
    });
})