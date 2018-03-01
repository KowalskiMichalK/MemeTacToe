package com.michal.memetactoe.games;


import javax.persistence.*;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="gameid")
    private Long gameId;

    @Column(name="userid")
    private Long userId;

    @Column(name="winner")
    private String winner;

    @Column(name="gametype")
    private String typeOfGame;

    @Column(name="date")
    private String date;

    public Game(){}

    public Game(Game game){
        this.gameId = game.gameId;
        this.userId = game.userId;
        this.winner = game.winner;
        this.typeOfGame = game.typeOfGame;
        this.date = game.date;
    }

    public Long getGameId() {
        return gameId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getWinner() {
        return winner;
    }

    public String getTypeOfGame() {
        return typeOfGame;
    }

    public String getDate() {
        return date;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public void setTypeOfGame(String typeOfGame) {
        this.typeOfGame = typeOfGame;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
