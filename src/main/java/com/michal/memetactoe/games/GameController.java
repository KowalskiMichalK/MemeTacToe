package com.michal.memetactoe.games;

import com.michal.memetactoe.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/user/games")
    public List<Game> getGames(Authentication authentication){
        User user = (User)authentication.getPrincipal();
        return gameService.getUserGames(user.getUserId());
    }

    @PostMapping("/user/games")
    public Game saveGame(@RequestBody Game game, Authentication authentication){
        Long loggedUserId = ((User)authentication.getPrincipal()).getUserId();
        game.setUserId(loggedUserId);
        return gameService.saveGame(game);
    }
}
