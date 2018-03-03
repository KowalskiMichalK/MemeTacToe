package com.michal.memetactoe.games;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getUserGames(Long userId) {
        return gameRepository.findGamesByUserId(userId);
    }

    public Game saveGame(Game game) {
        game.setDate(ZonedDateTime.now().format(DateTimeFormatter.RFC_1123_DATE_TIME));
        gameRepository.save(game);
        return game;
    }
}
