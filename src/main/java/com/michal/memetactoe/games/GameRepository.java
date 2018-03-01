package com.michal.memetactoe.games;


import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GameRepository extends CrudRepository<Game, Long>{

    public List<Game> findGamesByUserId(Long UserId);
}
