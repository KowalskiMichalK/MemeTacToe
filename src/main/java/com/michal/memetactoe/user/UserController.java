package com.michal.memetactoe.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.Principal;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String getUserName(Principal principal){
        return principal.getName();
    }

    @PostMapping("/register")
    public void register(@RequestParam("username") String username, @RequestParam("password") String password)
            throws IOException {

        userService.registerUser(username, password);
    }
}
