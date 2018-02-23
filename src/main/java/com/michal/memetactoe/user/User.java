package com.michal.memetactoe.user;


import javax.persistence.*;

@Entity
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="userid")
    private Long userId;

    @Column(name = "username")

    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "userrole")
    private String userRole;

    @Column(name ="enabled")
    private int enabled;

    public User(){}

    public User(User user) {
        this.userId = user.userId;
        this.userName = user.userName;
        this.password = user.password;
        this.userRole = user.userRole;
        this.enabled = user.enabled;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getUserRole() {
        return userRole;
    }

    public int getEnabled() {
        return enabled;
    }
}
