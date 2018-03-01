package com.michal.memetactoe.games;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getUserGames(Long userId) {
        return gameRepository.findGamesByUserId(userId);
    }

    public void saveGame(Game game) {
        gameRepository.save(game);
    }
}
